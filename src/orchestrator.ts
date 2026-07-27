import { randomUUID } from "node:crypto";
import { sha256 } from "./canonical.js";
import { evaluatePolicy } from "./policy-engine.js";
import { assertTransition } from "./state-machine.js";
import type { ApprovalRecord, AuthorizationDecision, PaymentIntent, TreasuryPolicy } from "./types.js";

export interface CreateIntentInput extends Omit<PaymentIntent, "protocolVersion" | "intentId" | "createdAt" | "intentHash" | "state"> {}

export class Aifp4Orchestrator {
  private readonly intents = new Map<string, PaymentIntent>();
  private readonly idempotency = new Map<string, string>();
  private readonly approvals = new Map<string, ApprovalRecord[]>();

  createIntent(input: CreateIntentInput): PaymentIntent {
    const existingId = this.idempotency.get(input.idempotencyKey);
    if (existingId) return this.getIntent(existingId);

    const createdAt = new Date().toISOString();
    const intentId = `pi_${randomUUID().replaceAll("-", "")}`;
    const unsigned = { ...input, protocolVersion: "0.1" as const, intentId, createdAt };
    const intent: PaymentIntent = {
      ...unsigned,
      intentHash: sha256(unsigned),
      state: "DRAFT"
    };
    this.intents.set(intentId, intent);
    this.idempotency.set(input.idempotencyKey, intentId);
    return intent;
  }

  getIntent(intentId: string): PaymentIntent {
    const intent = this.intents.get(intentId);
    if (!intent) throw new Error("INTENT_NOT_FOUND");
    return structuredClone(intent);
  }

  transition(intentId: string, nextState: PaymentIntent["state"]): PaymentIntent {
    const current = this.getIntent(intentId);
    assertTransition(current.state, nextState);
    const updated = { ...current, state: nextState };
    this.intents.set(intentId, updated);
    return structuredClone(updated);
  }

  authorize(intentId: string, policy: TreasuryPolicy): AuthorizationDecision {
    const intent = this.getIntent(intentId);
    if (intent.state === "DRAFT") this.transition(intentId, "SUBMITTED");
    const decision = evaluatePolicy(this.getIntent(intentId), policy);
    const target = decision.decision === "AUTHORIZED"
      ? "AUTHORIZED"
      : decision.decision === "APPROVAL_REQUIRED" ? "APPROVAL_REQUIRED" : "DENIED";
    this.transition(intentId, target);
    return decision;
  }

  addApproval(record: ApprovalRecord): ApprovalRecord[] {
    const intent = this.getIntent(record.intentId);
    if (intent.state !== "APPROVAL_REQUIRED") throw new Error("APPROVAL_NOT_EXPECTED");
    if (record.intentHash !== intent.intentHash) throw new Error("APPROVAL_HASH_MISMATCH");
    if (Date.parse(record.expiresAt) <= Date.now()) throw new Error("APPROVAL_EXPIRED");
    const existing = this.approvals.get(record.intentId) ?? [];
    if (existing.some((item) => item.approverIdentityId === record.approverIdentityId)) {
      throw new Error("DUPLICATE_APPROVER");
    }
    const updated = [...existing, structuredClone(record)];
    this.approvals.set(record.intentId, updated);
    if (record.decision === "REJECT") this.transition(record.intentId, "REJECTED");
    return structuredClone(updated);
  }

  finalizeApprovals(intentId: string, requiredApprovals: number): PaymentIntent {
    const records = this.approvals.get(intentId) ?? [];
    if (records.some((record) => record.decision === "REJECT")) throw new Error("PAYMENT_REJECTED");
    const uniqueApprovals = new Set(records.filter((record) => record.decision === "APPROVE").map((record) => record.approverIdentityId));
    if (uniqueApprovals.size < requiredApprovals) throw new Error("APPROVALS_INSUFFICIENT");
    return this.transition(intentId, "AUTHORIZED");
  }
}

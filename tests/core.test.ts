import { describe, expect, it } from "vitest";
import { generateKeyPairSync } from "node:crypto";
import {
  Aifp4Orchestrator,
  evaluatePolicy,
  signTreasuryReceipt,
  verifyTreasuryReceipt,
  type PaymentIntent,
  type TreasuryPolicy,
  type TreasuryReceiptPayload
} from "../src/index.js";

const future = new Date(Date.now() + 60_000).toISOString();

const intent: PaymentIntent = {
  protocolVersion: "0.1",
  intentId: "pi_test",
  organizationId: "org_aifinpay",
  sourceEntityId: "ent_estonia",
  initiatingIdentityId: "agt_procurement",
  beneficiaryId: "ben_cloud",
  sourceCountry: "EE",
  destinationCountry: "DE",
  money: { amount: "1200.00", currency: "EUR" },
  purposeCode: "software",
  createdAt: new Date().toISOString(),
  expiresAt: future,
  idempotencyKey: "idem_1234567890123456",
  nonce: "nonce_1234567890123456",
  intentHash: "hash",
  state: "SUBMITTED"
};

const policy: TreasuryPolicy = {
  policyId: "pol_marketing",
  version: "1",
  organizationId: "org_aifinpay",
  allowedCountries: ["EE", "DE"],
  allowedCurrencies: ["EUR"],
  allowedPurposeCodes: ["software"],
  allowedBeneficiaries: ["ben_cloud"],
  perTransactionLimit: "5000.00",
  approvalThresholds: [{ above: "500.00", approvals: 1 }],
  requireKnownBeneficiary: true
};

describe("policy engine", () => {
  it("requires approval above threshold", () => {
    expect(evaluatePolicy(intent, policy)).toMatchObject({ decision: "APPROVAL_REQUIRED", requiredApprovals: 1 });
  });

  it("denies unknown beneficiary", () => {
    expect(evaluatePolicy({ ...intent, beneficiaryId: "ben_attacker" }, policy).reasons).toContain("BENEFICIARY_NOT_VERIFIED");
  });
});

describe("orchestrator", () => {
  it("returns the same intent for the same idempotency key", () => {
    const service = new Aifp4Orchestrator();
    const input = {
      organizationId: intent.organizationId,
      sourceEntityId: intent.sourceEntityId,
      initiatingIdentityId: intent.initiatingIdentityId,
      beneficiaryId: intent.beneficiaryId,
      sourceCountry: intent.sourceCountry,
      destinationCountry: intent.destinationCountry,
      money: intent.money,
      purposeCode: intent.purposeCode,
      expiresAt: future,
      idempotencyKey: intent.idempotencyKey,
      nonce: intent.nonce
    };
    expect(service.createIntent(input).intentId).toBe(service.createIntent(input).intentId);
  });
});

describe("treasury receipt", () => {
  it("signs and verifies an Ed25519 receipt", () => {
    const { privateKey, publicKey } = generateKeyPairSync("ed25519");
    const payload: TreasuryReceiptPayload = {
      protocolVersion: "0.1",
      receiptId: "rcp_test",
      intentId: "pi_test",
      intentHash: "abc",
      organizationId: "org_aifinpay",
      policyId: "pol_marketing",
      policyVersion: "1",
      approvalIds: ["apr_1"],
      routeQuoteId: "rte_1",
      partnerId: "ptn_1",
      partnerReference: "ref_1",
      money: { amount: "1200.00", currency: "EUR" },
      finalStatus: "SETTLED",
      issuedAt: new Date().toISOString(),
      keyId: "key_1"
    };
    const receipt = signTreasuryReceipt(payload, privateKey);
    expect(verifyTreasuryReceipt(receipt, publicKey)).toBe(true);
    receipt.payload.partnerReference = "tampered";
    expect(verifyTreasuryReceipt(receipt, publicKey)).toBe(false);
  });
});

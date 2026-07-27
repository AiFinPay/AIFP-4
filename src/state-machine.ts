import type { IntentState } from "./types.js";

const transitions: Record<IntentState, readonly IntentState[]> = {
  DRAFT: ["SUBMITTED", "CANCELLED"],
  SUBMITTED: ["DENIED", "APPROVAL_REQUIRED", "AUTHORIZED", "EXPIRED", "CANCELLED"],
  DENIED: [],
  APPROVAL_REQUIRED: ["AUTHORIZED", "REJECTED", "EXPIRED", "CANCELLED"],
  AUTHORIZED: ["QUOTING", "CANCELLED", "EXPIRED"],
  REJECTED: [],
  EXPIRED: [],
  QUOTING: ["ROUTE_SELECTED", "NO_ROUTE", "CANCELLED"],
  ROUTE_SELECTED: ["INSTRUCTION_SENT", "CANCELLED", "EXPIRED"],
  NO_ROUTE: [],
  INSTRUCTION_SENT: ["PARTNER_REVIEW", "FAILED"],
  PARTNER_REVIEW: ["COMPLIANCE_HOLD", "ACCEPTED", "FAILED"],
  COMPLIANCE_HOLD: ["PARTNER_REVIEW", "FAILED", "CANCELLED"],
  ACCEPTED: ["PROCESSING", "FAILED"],
  PROCESSING: ["SETTLED", "FAILED", "RETURNED"],
  SETTLED: ["RECONCILED", "RETURNED"],
  RECONCILED: ["RETURNED"],
  FAILED: [],
  RETURNED: [],
  CANCELLED: []
};

export function canTransition(from: IntentState, to: IntentState): boolean {
  return transitions[from].includes(to);
}

export function assertTransition(from: IntentState, to: IntentState): void {
  if (!canTransition(from, to)) {
    throw new Error(`INVALID_STATE_TRANSITION:${from}->${to}`);
  }
}

export function allowedTransitions(from: IntentState): readonly IntentState[] {
  return transitions[from];
}

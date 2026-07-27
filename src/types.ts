export type Decision = "AUTHORIZED" | "DENIED" | "APPROVAL_REQUIRED";

export type IntentState =
  | "DRAFT" | "SUBMITTED" | "DENIED" | "APPROVAL_REQUIRED" | "AUTHORIZED"
  | "REJECTED" | "EXPIRED" | "QUOTING" | "ROUTE_SELECTED" | "NO_ROUTE"
  | "INSTRUCTION_SENT" | "PARTNER_REVIEW" | "COMPLIANCE_HOLD" | "ACCEPTED"
  | "PROCESSING" | "SETTLED" | "RECONCILED" | "FAILED" | "RETURNED" | "CANCELLED";

export interface Money {
  amount: string;
  currency: string;
}

export interface PaymentIntent {
  protocolVersion: "0.1";
  intentId: string;
  organizationId: string;
  sourceEntityId: string;
  departmentId?: string;
  initiatingIdentityId: string;
  beneficiaryId: string;
  sourceCountry: string;
  destinationCountry: string;
  money: Money;
  purposeCode: string;
  createdAt: string;
  expiresAt: string;
  idempotencyKey: string;
  nonce: string;
  intentHash: string;
  state: IntentState;
}

export interface TreasuryPolicy {
  policyId: string;
  version: string;
  organizationId: string;
  allowedCountries: string[];
  allowedCurrencies: string[];
  allowedPurposeCodes: string[];
  allowedBeneficiaries?: string[];
  perTransactionLimit: string;
  approvalThresholds: Array<{ above: string; approvals: number }>;
  requireKnownBeneficiary: boolean;
}

export interface AuthorizationDecision {
  decision: Decision;
  reasons: string[];
  requiredApprovals: number;
  policyId: string;
  policyVersion: string;
}

export interface ApprovalRecord {
  approvalId: string;
  intentId: string;
  intentHash: string;
  approverIdentityId: string;
  decision: "APPROVE" | "REJECT";
  recordedAt: string;
  expiresAt: string;
}

export interface RouteQuote {
  routeQuoteId: string;
  partnerId: string;
  rail: string;
  source: Money;
  destination: Money;
  fees: Array<{ category: string; money: Money }>;
  estimatedSettlementSeconds: number;
  reversible: boolean;
  expiresAt: string;
}

export interface TreasuryReceiptPayload {
  protocolVersion: "0.1";
  receiptId: string;
  intentId: string;
  intentHash: string;
  organizationId: string;
  policyId: string;
  policyVersion: string;
  approvalIds: string[];
  routeQuoteId: string;
  partnerId: string;
  partnerReference: string;
  money: Money;
  finalStatus: "SETTLED" | "RECONCILED" | "FAILED" | "RETURNED" | "CANCELLED";
  issuedAt: string;
  keyId: string;
}

export interface SignedTreasuryReceipt {
  payload: TreasuryReceiptPayload;
  signature: string;
}

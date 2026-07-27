import type { AuthorizationDecision, PaymentIntent, TreasuryPolicy } from "./types.js";

function decimalToUnits(value: string, scale = 8): bigint {
  if (!/^\d+(\.\d+)?$/.test(value)) throw new Error(`Invalid decimal: ${value}`);
  const [whole, fraction = ""] = value.split(".");
  const normalized = `${whole}${fraction.padEnd(scale, "0").slice(0, scale)}`;
  return BigInt(normalized);
}

export function evaluatePolicy(intent: PaymentIntent, policy: TreasuryPolicy): AuthorizationDecision {
  const reasons: string[] = [];

  if (intent.organizationId !== policy.organizationId) reasons.push("ORGANIZATION_MISMATCH");
  if (!policy.allowedCountries.includes(intent.sourceCountry)) reasons.push("SOURCE_COUNTRY_DENIED");
  if (!policy.allowedCountries.includes(intent.destinationCountry)) reasons.push("DESTINATION_COUNTRY_DENIED");
  if (!policy.allowedCurrencies.includes(intent.money.currency)) reasons.push("CURRENCY_DENIED");
  if (!policy.allowedPurposeCodes.includes(intent.purposeCode)) reasons.push("PURPOSE_DENIED");
  if (decimalToUnits(intent.money.amount) > decimalToUnits(policy.perTransactionLimit)) reasons.push("PER_TRANSACTION_LIMIT_EXCEEDED");
  if (policy.requireKnownBeneficiary && !policy.allowedBeneficiaries?.includes(intent.beneficiaryId)) reasons.push("BENEFICIARY_NOT_VERIFIED");
  if (Date.parse(intent.expiresAt) <= Date.now()) reasons.push("INTENT_EXPIRED");

  if (reasons.length > 0) {
    return { decision: "DENIED", reasons, requiredApprovals: 0, policyId: policy.policyId, policyVersion: policy.version };
  }

  const amount = decimalToUnits(intent.money.amount);
  const requiredApprovals = policy.approvalThresholds
    .filter((threshold) => amount > decimalToUnits(threshold.above))
    .reduce((max, threshold) => Math.max(max, threshold.approvals), 0);

  return {
    decision: requiredApprovals > 0 ? "APPROVAL_REQUIRED" : "AUTHORIZED",
    reasons: requiredApprovals > 0 ? ["APPROVAL_THRESHOLD_TRIGGERED"] : ["POLICY_ALLOWED"],
    requiredApprovals,
    policyId: policy.policyId,
    policyVersion: policy.version
  };
}

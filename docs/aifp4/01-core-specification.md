# AIFP-4 Core Protocol Specification

**Version:** 0.1-draft  
**Status:** Draft Standard

The key words MUST, MUST NOT, REQUIRED, SHALL, SHALL NOT, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL are to be interpreted as normative requirements.

## 1. Scope

AIFP-4 defines interoperable messages and controls for organization-authorized fund movement by AI agents, enterprise software, and human operators. It covers internal allocation, intercompany transfer, partner settlement, cross-border orchestration, approval, route selection, execution status, receipt generation, and reconciliation.

## 2. Actors

- **Organization:** customer group using the protocol.
- **Legal Entity:** incorporated or otherwise recognized entity inside an organization.
- **Department/Cost Center:** internal budget scope.
- **Agent:** autonomous software identity bound through AIFP-3.
- **Human Operator:** authorized natural person acting for the organization.
- **Beneficiary:** intended recipient.
- **Protocol Operator:** service implementing AIFP-4 orchestration.
- **Execution Partner:** licensed or otherwise authorized provider that performs settlement.
- **Rail:** bank, payment network, wallet, blockchain, stablecoin, or local settlement system.

## 3. Identifiers

Implementations MUST use globally unique, opaque identifiers. Recommended prefixes:

- `org_` organization;
- `ent_` legal entity;
- `dept_` department;
- `agt_` agent;
- `ben_` beneficiary;
- `pi_` payment intent;
- `apr_` approval;
- `rte_` route quote;
- `ins_` settlement instruction;
- `rcp_` treasury receipt;
- `ptn_` partner.

Identifiers MUST NOT encode regulated personal data.

## 4. Payment Intent

A `PaymentIntent` MUST include:

- protocol and schema version;
- intent ID;
- organization and source legal entity;
- initiating identity;
- amount and currency or asset;
- beneficiary reference;
- transaction purpose code;
- requested execution date;
- creation and expiry timestamps;
- idempotency key;
- nonce;
- canonical request hash;
- signature or authenticated channel proof.

Optional fields MAY include invoice, purchase order, contract, tax, cost-center, project, metadata, preferred rail, and delivery constraints.

## 5. Authorization

The implementation MUST verify:

1. identity validity;
2. organization membership;
3. explicit authority for the action;
4. source account or budget scope;
5. current policy version;
6. transaction limits;
7. beneficiary status;
8. jurisdiction, currency, asset, rail, and purpose eligibility;
9. duplicate and replay controls;
10. active freeze controls.

The result MUST be `AUTHORIZED`, `DENIED`, or `APPROVAL_REQUIRED`, with machine-readable reason codes.

## 6. Approval

Approvals MUST bind to the immutable intent hash. An implementation MUST invalidate approvals after any material intent change. The approval record MUST contain approver identity, role, decision, timestamp, expiry, and signature evidence.

## 7. Route Quote

A route quote MUST disclose:

- partner and rail;
- source and destination country;
- source amount and currency;
- beneficiary amount and currency;
- exchange rate and markup;
- all known fees separated by category;
- estimated execution time;
- reversibility/return characteristics;
- quote expiry;
- compliance conditions;
- route eligibility evidence version.

## 8. Settlement Instruction

A settlement instruction MUST be created only after authorization and required approvals. It MUST include the intent hash, selected route quote, partner, execution parameters, callback endpoint identifier, idempotency key, expiry, and signature.

## 9. Partner response

An execution partner MUST return a unique reference and one of: `ACCEPTED`, `COMPLIANCE_HOLD`, `REJECTED`, `PROCESSING`, `SETTLED`, `FAILED`, or `RETURNED`.

Callbacks MUST be signed and replay-protected.

## 10. Treasury Receipt

The final receipt MUST cryptographically bind the original intent, identity, policy version, approvals, selected route, fees, FX, execution partner reference, final status, timestamps, and receipt signing key ID.

Receipts MUST be independently verifiable without trusting mutable dashboard data.

## 11. Reconciliation

Implementations MUST support matching between internal instruction, partner statement, and settlement-rail evidence. Mismatches MUST create an auditable exception and MUST NOT be silently corrected.

## 12. Error handling

Errors MUST include stable code, human-readable message, retryability, correlation ID, and remediation category. Sensitive internal or compliance details MUST NOT be exposed to unauthorized clients.

## 13. Versioning

Breaking changes require a new major protocol version. Schemas and partner capability manifests MUST be versioned. A transaction MUST remain interpretable under the versions recorded at execution time.

## 14. Conformance

A conformant implementation MUST pass published schema validation, state-transition, idempotency, signature, replay, policy, approval, partner callback, failure, and reconciliation test vectors.

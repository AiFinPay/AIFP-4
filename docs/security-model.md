# Security Model

## Security objective

An AI agent may initiate only the financial actions explicitly delegated to it. A compromised agent, user account, integration, partner, or internal service must not gain unrestricted access to organizational funds.

## Mandatory controls

### Identity and keys

- AIFP-3 Agent Passport for agent identity and organization binding.
- Short-lived, scoped access tokens.
- Organization signing keys stored in HSM, MPC, hardware wallet, or equivalent protected environment for production.
- Independent key rotation, revocation, and emergency freeze.
- Mutual TLS or equivalent authenticated channel for partner connections.

### Authorization

- Deny by default.
- RBAC plus attribute-based checks.
- Explicit source entity, department, budget, beneficiary, country, currency, purpose, asset, and rail scopes.
- Separation of duties between policy administration, initiation, approval, and execution.
- No self-approval when approval is required.

### Transaction integrity

Every mutable request uses:

- unique idempotency key;
- nonce;
- creation and expiry timestamps;
- canonical serialization;
- request hash;
- detached or embedded digital signature;
- immutable amount and beneficiary after approval begins.

A material change creates a new intent and invalidates prior approvals.

### Fraud and anomaly controls

- transaction and aggregate velocity limits;
- new-beneficiary cooling period;
- changed-bank-details hold;
- duplicate invoice detection;
- unusual country, time, amount, asset, or purpose detection;
- concentration limits;
- beneficiary reputation and allowlists;
- out-of-band verification for high-risk changes;
- delayed execution for high-value payments.

### Partner security

- signed capability manifests;
- signed webhooks with replay protection;
- IP and certificate restrictions where appropriate;
- partner-specific credentials and least privilege;
- circuit breaker and manual kill switch;
- independent reconciliation against partner and settlement-rail evidence.

## Threat scenarios

| Threat | Primary controls |
|---|---|
| Prompt injection tells an agent to pay an attacker | Purpose and beneficiary policy, known-beneficiary rule, approval threshold, agent tool isolation |
| Compromised agent credential | Short-lived token, scoped limits, velocity controls, revocation |
| Fake invoice | Contract/PO matching, duplicate detection, beneficiary verification, human approval |
| Beneficiary bank details changed | Reverification, cooling period, out-of-band confirmation |
| Replay or duplicate API call | Nonce, expiry, idempotency key, state-machine checks |
| Insider changes policy then pays | Separation of duties, policy-change delay, audit, independent approval |
| Partner sends forged success webhook | Signature verification and rail-level reconciliation |
| Router chooses an ineligible corridor | Signed capability manifest, jurisdiction policy, compliance eligibility checks |
| Cross-tenant data access | Tenant isolation, object-level authorization, encryption, audit |

## Receipt integrity

A Treasury Receipt must bind:

- protocol and schema version;
- intent ID and hash;
- organization and legal entity;
- initiating identity;
- policy ID and version;
- approvals and decision timestamps;
- selected route and partner;
- settlement reference;
- amount, currency, fees, and FX where applicable;
- final state;
- receipt signing key ID.

## Incident response

The system supports freeze at network, partner, organization, legal-entity, department, agent, beneficiary, account, currency, asset, and route level. Incident logs must preserve evidence while preventing further execution.

## Public repository boundary

This repository must contain no production keys, secrets, internal endpoints, real customer identifiers, regulated personal data, private partner credentials, or operational bypass procedures.

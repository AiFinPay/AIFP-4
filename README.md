# AIFP-4 Protocol

<p align="center"><strong>Global treasury messaging and settlement orchestration for autonomous organizations.</strong></p>

<p align="center"><strong>SWIFT-like financial coordination for AI agents, enterprises, departments, partners, and cross-border organizations.</strong></p>

> **Status:** Draft protocol specification. Not a bank, payment institution, money transmitter, custodian, or licensed settlement provider.

## What AIFP-4 is

AIFP-4 is an open protocol for autonomous treasury operations and inter-organization financial messaging. It lets authorized AI agents and enterprise systems create payment intents, allocate budgets, request approvals, select eligible settlement routes, execute through licensed partners, and produce cryptographically verifiable treasury records.

AIFP-4 is designed as a global protocol. Settlement in each jurisdiction is performed by a bank, payment institution, stablecoin infrastructure provider, licensed virtual-asset provider, or other authorized partner under a commercial and compliance agreement.

**AiFinPay provides the protocol and orchestration layer. Local partners provide regulated execution.**

## Core principles

- Global protocol, local licensing.
- Non-custodial by default.
- Deny-by-default authorization.
- Agent identity and authority through AIFP-3.
- Policy-as-code for every movement of funds.
- Human approval where corporate policy requires it.
- Multiple settlement rails: bank, PSP, stablecoin, wallet, local payment systems.
- Jurisdiction-aware routing.
- Tamper-evident receipts and complete auditability.
- ISO 20022-compatible mapping rather than a closed financial language.
- No autonomous agent may exceed its explicit mandate.

## Protocol scope

AIFP-4 covers:

1. Internal budget allocation between treasury, legal entities, departments, projects, and agents.
2. Intercompany and parent-subsidiary transfers.
3. Supplier, contractor, partner, royalty, marketplace, and revenue-share settlement.
4. Cross-border payment orchestration through licensed partners.
5. Multi-step approval workflows and separation of duties.
6. Route discovery, quote comparison, settlement instruction, status tracking, return, and reconciliation.
7. Signed treasury receipts and ERP/accounting integration.
8. Compliance holds, sanctions screening hooks, Travel Rule data handoff, and jurisdiction policy controls.

## AIFP protocol family

| Protocol | Responsibility |
|---|---|
| AIFP-1 | Monetization of AI traffic and paid access to websites, APIs, data, compute, and digital services |
| AIFP-2 | Agent payment execution and x402-style payment flows |
| AIFP-3 | Agent Passport: identity, organization binding, roles, permissions, and trust |
| **AIFP-4** | Corporate treasury, autonomous fund movement, inter-organization messaging, and global settlement orchestration |

## High-level architecture

```mermaid
flowchart LR
  Agent[AI Agent / ERP / Human] --> Intent[Payment Intent]
  Intent --> Identity[AIFP-3 Agent Passport]
  Identity --> Org[Organization Registry]
  Org --> Policy[Policy Engine]
  Policy --> Risk[Risk & Compliance Hooks]
  Risk --> Approval[Approval Graph]
  Approval --> Router[Jurisdiction-Aware Router]
  Router --> Partner[Licensed Local Partner]
  Partner --> Rail[Bank / PSP / Stablecoin / Local Rail]
  Rail --> Receipt[Signed Treasury Receipt]
  Receipt --> Ledger[Audit Ledger]
  Ledger --> ERP[ERP / Accounting / Treasury]
```

## Global partner model

AIFP-4 does not require AiFinPay to hold every financial license worldwide. The network is designed around licensed execution partners.

Each partner integration defines:

- licensed entity and permitted jurisdictions;
- supported source and destination countries;
- currencies and assets;
- customer and transaction eligibility;
- KYC, KYB, AML, sanctions, Travel Rule, and reporting responsibilities;
- settlement limits and cut-off times;
- safeguarding or custody model;
- FX and liquidity model;
- fees, reversals, disputes, and returns;
- API availability and service-level obligations;
- incident response and audit rights.

The router only selects a partner when the organization, agent, transaction purpose, countries, currency, amount, and beneficiary satisfy both corporate policy and partner eligibility.

## Core message types

| Message | Purpose |
|---|---|
| `AIFP4.PaymentIntent` | Request to move funds |
| `AIFP4.BudgetAllocation` | Allocate budget to an entity, department, project, or agent |
| `AIFP4.AuthorizationDecision` | Policy decision with reasons and limits |
| `AIFP4.ApprovalRequest` | Request one or more approvals |
| `AIFP4.ApprovalDecision` | Approve, reject, or request changes |
| `AIFP4.RouteQuote` | Eligible settlement route, cost, FX, timing, and conditions |
| `AIFP4.SettlementInstruction` | Instruction sent to a licensed execution partner |
| `AIFP4.SettlementStatus` | Accepted, pending, settled, failed, returned, or cancelled |
| `AIFP4.TreasuryReceipt` | Signed final record of decision and execution |
| `AIFP4.ComplianceHold` | Pause transaction pending review |
| `AIFP4.ReturnInstruction` | Return or reverse where the rail supports it |
| `AIFP4.ReconciliationReport` | Match instructions, partner statements, and internal ledger |

## Example policy

```yaml
organization_id: org_aifinpay
policy_version: 2026-07
scope:
  legal_entity_id: entity_estonia
  department_id: marketing
rules:
  allowed_purposes: [advertising, analytics, software]
  allowed_currencies: [EUR, USD, USDC]
  allowed_countries: [EE, UA, AE, US]
  per_transaction_limit: "5000.00"
  daily_limit: "15000.00"
  monthly_limit: "100000.00"
  approval:
    below_500: 0
    from_500_to_5000: 1
    above_5000: 2
  require_known_beneficiary: true
  deny_changed_bank_details_without_reverification: true
  high_value_delay_seconds: 3600
```

## Security baseline

- Strong tenant isolation.
- Ed25519 or approved enterprise signing profiles.
- Optional HSM/MPC-backed organization keys.
- Short-lived scoped credentials.
- Nonce, expiry, idempotency, and replay protection.
- Role-based and attribute-based authorization.
- Separation of initiation, approval, and execution.
- Recipient, country, currency, purpose, asset, and rail allowlists.
- Velocity, concentration, and anomaly controls.
- High-value delay and out-of-band approval.
- Immutable policy version recorded in each receipt.
- Emergency organization, entity, department, agent, route, and partner freeze.
- Signed partner callbacks and reconciliation.
- Audit logs exportable to SIEM, ERP, and accounting systems.

## Repository map

- [`docs/architecture.md`](docs/architecture.md) — protocol architecture and trust boundaries.
- [`docs/global-partner-network.md`](docs/global-partner-network.md) — global licensed partner model.
- [`docs/security-model.md`](docs/security-model.md) — security controls and threat model.
- [`docs/compliance-boundaries.md`](docs/compliance-boundaries.md) — allocation of regulatory responsibilities.
- [`docs/economics.md`](docs/economics.md) — tiered commercial model.
- [`docs/message-lifecycle.md`](docs/message-lifecycle.md) — transaction state machine.
- [`docs/aifp4/01-core-specification.md`](docs/aifp4/01-core-specification.md) — normative protocol specification.
- [`openapi/aifp-4.openapi.yaml`](openapi/aifp-4.openapi.yaml) — OpenAPI 3.1 contract.
- [`schemas/`](schemas/) — machine-readable JSON schemas.
- [`examples/`](examples/) — reference workflows.
- [`ROADMAP.md`](ROADMAP.md) — phased implementation plan.

## Commercial model

AIFP-4 supports volume-based tiers aligned with AiFinPay's enterprise model. Indicative pricing is documented as a framework, not a binding public offer:

- Tier 1: enterprise and network partners, approximately 0.3%-0.5% or negotiated basis-point/flat pricing.
- Tier 2: growth companies and multi-entity organizations, approximately 0.5%-0.8%.
- Tier 3: standard organizations and builders, approximately 0.8%-1.0%.

Large-value treasury transfers require caps, minimum fees, flat fees, or negotiated basis-point pricing. Third-party bank, FX, blockchain, compliance, and partner charges are separate.

## Legal and operational boundary

AIFP-4 is a technical and messaging protocol. The protocol specification does not grant financial permissions, replace legal advice, or make an unlicensed entity eligible to provide regulated services. Implementers must use licensed providers and comply with applicable law in every relevant jurisdiction.

## License

Code, schemas, examples, tests, and machine-readable specifications are licensed under Apache-2.0. Documentation and protocol prose are licensed under CC BY 4.0 unless a file states otherwise.

# Global Licensed Partner Network

## Model

AIFP-4 is global at the protocol layer and local at the regulated execution layer. AiFinPay signs commercial and technical agreements with partners that already hold the permissions required for their jurisdictions and services.

A partner can cover one country, a region, a currency corridor, a payment method, or a regulated function.

## Partner categories

- Banks and correspondent banks.
- Payment institutions and e-money institutions.
- Local instant-payment and clearing participants.
- Card issuers and acquiring providers.
- FX and liquidity providers.
- Stablecoin issuers and settlement infrastructure.
- Licensed virtual-asset service providers where applicable.
- KYC, KYB, AML, sanctions, fraud, Travel Rule, and transaction-monitoring providers.
- Treasury, ERP, accounting, and reconciliation platforms.

## Partner capability manifest

Every partner publishes a signed, versioned capability manifest containing:

```json
{
  "partner_id": "ptn_example_eu_01",
  "legal_entity": "Example Payments Europe OÜ",
  "license_references": ["local-regulator-reference"],
  "jurisdictions": ["EE", "LV", "LT"],
  "source_countries": ["EE", "LV", "LT"],
  "destination_countries": ["EE", "LV", "LT", "DE", "FR"],
  "currencies": ["EUR"],
  "rails": ["SEPA", "SEPA_INSTANT"],
  "customer_types": ["business"],
  "transaction_purposes": ["supplier_payment", "intercompany_transfer"],
  "minimum_amount": "1.00",
  "maximum_amount": "1000000.00",
  "compliance_features": ["KYB", "AML", "SANCTIONS", "TRANSACTION_MONITORING"],
  "data_residency": ["EU"],
  "status": "active"
}
```

The manifest is descriptive, not proof of licensing. AiFinPay must verify legal documentation before activation and periodically thereafter.

## Contractual responsibility matrix

The partner agreement must allocate:

- onboarding ownership;
- customer relationship ownership;
- safeguarding and custody;
- payment initiation and execution responsibility;
- AML and sanctions screening;
- suspicious activity reporting;
- Travel Rule collection and transmission;
- transaction monitoring;
- FX execution;
- chargebacks, disputes, reversals, and returns;
- complaints handling;
- regulatory reporting;
- data-controller and data-processor roles;
- audit access;
- incident notification;
- business continuity;
- subcontractor controls;
- termination and customer migration.

## Routing eligibility

A partner is eligible only when all conditions are true:

1. Partner status is active.
2. License and contract review are current.
3. Source and destination jurisdictions are supported.
4. Organization and beneficiary customer types are accepted.
5. Currency, asset, amount, and transaction purpose are supported.
6. Required KYC/KYB/compliance evidence is valid.
7. Data residency and transfer rules are satisfied.
8. Partner is healthy and within operational limits.
9. Corporate policy allows the partner and rail.

## No universal license claim

AIFP-4 must never claim that one AiFinPay agreement creates legal payment coverage in every country. Coverage is built corridor by corridor and partner by partner. The protocol can represent every country from day one, while production execution becomes active only where an eligible partner is contracted and technically certified.

## Partner certification

Before production activation:

- legal and license verification;
- security assessment;
- API and webhook conformance tests;
- sandbox transaction tests;
- failure and duplicate-message tests;
- settlement and reconciliation tests;
- incident-response exercise;
- data-protection review;
- business-continuity evidence;
- signed production readiness approval.

## Commercial structure

Possible structures include referral, reseller, white-label, infrastructure licensing, revenue share, per-transaction pricing, corridor pricing, and strategic network partnership. Commercial terms do not change the protocol security requirements.

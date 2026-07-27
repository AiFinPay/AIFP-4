# Compliance and Regulatory Boundaries

## Protocol position

AIFP-4 is software infrastructure and a financial messaging/orchestration protocol. It is not, by specification alone, a bank, custodian, payment institution, money transmitter, exchange, e-money issuer, or licensed virtual-asset provider.

## Responsibility model

### AiFinPay protocol operator

May provide:

- protocol standards and schemas;
- organization and agent authorization infrastructure;
- policy and approval orchestration;
- route discovery and partner connectivity;
- signed audit receipts;
- integration, monitoring, and reconciliation tooling.

AiFinPay must not represent that these functions remove licensing obligations where regulated execution, custody, exchange, transmission, acquiring, issuing, or safeguarding occurs.

### Licensed execution partner

Depending on contract and jurisdiction, the partner may own:

- customer onboarding and regulated account opening;
- KYC/KYB and beneficial-owner verification;
- AML, sanctions, PEP, and transaction monitoring;
- safeguarding or custody;
- payment execution;
- FX or asset conversion;
- Travel Rule duties;
- regulatory reporting;
- suspicious activity reporting;
- disputes, returns, and complaints.

### Customer organization

The customer remains responsible for:

- lawful transaction purpose;
- corporate authority and internal controls;
- tax, accounting, transfer-pricing, and documentation obligations;
- employee and agent delegation;
- accuracy of beneficiary and invoice data;
- use of the protocol within approved jurisdictions and contracts.

## Jurisdiction packs

AIFP-4 represents country-specific requirements as versioned jurisdiction packs. A pack can define mandatory fields, prohibited purposes, supported entity types, approval thresholds, retention rules, data residency, Travel Rule requirements, and partner eligibility.

Jurisdiction packs are configuration and implementation aids. They are not legal opinions and require review by qualified counsel and the relevant licensed partner.

## Data roles

Every deployment must document:

- data controller and processor roles;
- regulated-data owner;
- retention period;
- deletion and legal-hold rules;
- cross-border transfer mechanism;
- encryption and access controls;
- subprocessor list;
- breach notification procedure.

## Activation rule

A country or corridor may be shown as `specified`, `sandbox`, `partner_pending`, `limited`, or `production`. Production status requires active contractual, legal, technical, security, and operational approval.

## Required disclaimer

No public documentation should state that AIFP-4 is licensed worldwide. The correct claim is that the protocol is designed for global coverage through locally licensed partners, with production availability activated jurisdiction by jurisdiction.

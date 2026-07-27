# AIFP-4 Reference Workflows

These examples describe expected protocol behavior. They do not call production endpoints or contain real credentials.

## 1. Department budget

Treasury allocates a monthly budget to Marketing. An authorized agent can pay verified advertising and analytics suppliers within per-transaction, daily, and monthly limits.

## 2. Autonomous procurement

A procurement agent creates a Payment Intent linked to a purchase order. Policy requires a known beneficiary, contract match, duplicate-invoice check, and CFO approval above the configured threshold.

## 3. Intercompany transfer

A parent legal entity transfers funds to a subsidiary. The intent includes intercompany purpose, documentation references, currency, requested date, and required finance approvals. The router chooses an eligible licensed partner for the corridor.

## 4. Cross-border supplier payment

An organization requests route quotes. Each quote discloses partner, rail, FX, fees, delivery amount, timing, reversibility, and compliance conditions. The selected partner performs regulated execution.

## 5. Compliance hold

The partner returns `COMPLIANCE_HOLD`. AIFP-4 freezes execution state, records the event, exposes only authorized remediation information, and resumes only after a signed partner status update.

## 6. Emergency freeze

An administrator freezes one agent or beneficiary. New instructions are denied immediately. Previously accepted partner instructions are handled according to rail capability and partner contract; the system does not claim cancellation when settlement is already irrevocable.

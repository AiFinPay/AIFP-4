# Protocol Economics

## Pricing framework

AIFP-4 uses a volume-based commercial model. Smaller organizations pay a higher percentage; strategic and high-volume organizations receive lower negotiated pricing.

| Tier | Typical profile | Indicative protocol fee |
|---|---|---:|
| Tier 1 | Strategic networks, global enterprises, licensed partners | 0.3%-0.5% or negotiated basis-point/flat pricing |
| Tier 2 | Growth companies, multi-entity groups, agent fleets | 0.5%-0.8% |
| Tier 3 | Standard organizations and builders | 0.8%-1.0% |

These ranges are non-binding and exclude bank, PSP, FX, blockchain, compliance, liquidity, tax, and local partner costs.

## Large-value rule

Pure percentage pricing becomes commercially unsuitable for large treasury movements. Enterprise contracts should support:

- fee caps;
- minimum fees;
- fixed per-instruction fees;
- basis-point pricing;
- monthly platform licensing;
- corridor-specific pricing;
- partner revenue share;
- committed-volume discounts.

## Billable events

A commercial deployment may charge for:

- successfully settled transaction;
- active organization or legal entity;
- active authorized agent;
- policy and approval module;
- partner routing and corridor access;
- compliance or risk checks;
- reconciliation and reporting;
- dedicated deployment, SLA, and support.

## Fee transparency

Every `RouteQuote` must separately disclose:

- AIFP protocol fee;
- execution partner fee;
- settlement-rail fee;
- FX rate and markup;
- blockchain network fee where applicable;
- compliance or screening fee;
- expected amount delivered to beneficiary.

No hidden fee may be added after route acceptance unless the quote explicitly describes a variable external cost.

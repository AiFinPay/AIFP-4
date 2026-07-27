# Contributing

AIFP-4 is a draft financial protocol. Contributions must preserve security, interoperability, backward compatibility, and clear regulatory boundaries.

## Contribution types

- Protocol clarifications.
- New message schemas.
- Security and threat-model improvements.
- Partner capability and jurisdiction-pack proposals.
- OpenAPI and JSON Schema fixes.
- Conformance tests and test vectors.
- Reference SDKs and examples.

## Requirements

- Open an issue before a breaking protocol change.
- Never include secrets, production endpoints, private partner terms, real customer identifiers, or regulated personal data.
- Mark planned or incomplete functionality as draft, planned, reference implementation, or coming soon.
- Add tests for state transitions, signatures, idempotency, replay protection, and failure behavior.
- Update specification, schema, OpenAPI, examples, and changelog together when behavior changes.
- Use clear normative language in specifications.

## Review

Security-sensitive changes require security review. Changes affecting settlement, compliance boundaries, partner responsibilities, or jurisdiction claims require legal and operational review before release.

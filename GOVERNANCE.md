# AIFP-4 Governance

## Objective

Governance protects interoperability, security, neutrality, and stable implementation of the protocol.

## Change classes

- **Editorial:** wording and non-normative clarification.
- **Compatible:** optional field, new error code, new example, or non-breaking extension.
- **Normative:** behavior or requirement change within a major version.
- **Breaking:** incompatible schema, signature, lifecycle, or semantic change requiring a new major version.
- **Emergency security:** temporary or permanent mitigation required to protect users or partners.

## Proposal process

1. Open a public proposal describing problem, motivation, compatibility, security, compliance, and migration.
2. Publish machine-readable changes with examples and tests.
3. Obtain technical and security review.
4. Obtain legal/operational review when partner or jurisdiction responsibilities change.
5. Provide a public review period for normative changes.
6. Record the decision and release version.

## Maintainer duties

Maintainers must disclose conflicts, preserve version history, reject unsafe shortcuts, avoid unsupported global licensing claims, and keep public documentation separate from confidential implementation and partner material.

## Partner and enterprise profiles

Partners may implement private operational extensions, but a conformance claim requires support for the public mandatory core. Proprietary fields must use a namespaced extension object and must not change the meaning of standard fields.

# ValidFormats: existing TypeSpec checks

## 1. Conclusion and scope

The existing TypeSpec rules `no-format`, `known-encoding`, and `no-generic-numeric` provide overlapping authoring checks related to the Swagger linter rule [ValidFormats](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/valid-formats.md), but are not functionally equivalent to its format allowlist. This documentation-only proposal explains those boundaries without adding a rule or changing behavior. Whether supported TypeSpec numeric formats outside the Swagger allowlist should be restricted remains an open policy decision.

## 2. Actual coverage

A purposive five-project ARM pilot has completed. Fresh production `ValidFormats`-only Spectral replay reproduced all **111** retained Swagger occurrences, including exact document-and-JSON-path agreement. All five native no-emit compilations succeeded, with zero unsuppressed diagnostics for each of the three related rules.

| Project                         | Saved Swagger | Fresh replay | no-format | known-encoding | no-generic-numeric |
| ------------------------------- | ------------: | -----------: | --------: | -------------: | -----------------: |
| Consumption                     |            76 |           76 |         0 |              0 |                  0 |
| Cost Management                 |            19 |           19 |         0 |              0 |                  0 |
| Service Fabric Managed Clusters |            14 |           14 |         0 |              0 |                  0 |
| Cosmos DB                       |             2 |            2 |         0 |              0 |                  0 |
| API Management                  |             0 |            0 |         0 |              0 |                  0 |

These are separate diagnostic units, not a 111-to-zero coverage score. Source suppressions remain honored, and source is not projected to each saved API version. Suppressions explain many differences, but not all: unsuppressed decimal array elements and an inline decimal query parameter also fall outside the numeric rule's reporting shape.

The [machine-readable pilot summary](pilot-summary.json) and [validation receipt](pilot-validation.json) retain the measured outcomes. Detailed local reports, complete occurrence inventories, Swagger snapshots, source excerpts, pinned source links, exact commands and logs are under `coverage-reports\valid-formats`.

## 3. Function-level coverage

| Behavior                                     | Result                                            | Rationale                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unknown authored `@format`                   | Unsuppressed control verified                     | [`no-format`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/prevent-format.ts) warns on both unknown `fake` and recognized `uuid` decorators.                                                                                                                                                                                      |
| Unsupported encoding names                   | Related policy; control verified                  | [`known-encoding`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/known-encoding.ts) reports the custom encoding control; the real `duration-constant` source declarations carry suppressions.                                                                                                                                      |
| Generic numeric model properties             | Additional policy; control verified               | [`no-generic-numeric`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/no-generic-numeric.ts) reports a direct generic `integer` property, even though Swagger does not require a format.                                                                                                                                            |
| Decimal array / inline query parameter       | Independent reporting-shape boundary verified     | Cost Management's `RecommendationUsageDetails.charges: decimal[]` and Consumption's inline `previewMarkupPercentage: decimal` have no numeric suppression. Both shapes reproduce zero target warnings in an unsuppressed control; their saved Swagger contains rejected `decimal` formats.                                                                                                                        |
| Built-in numeric formats excluded by Swagger | Policy unresolved; controlled predicates verified | `int8`, `uint32`, and `decimal128` pass the three native controls. Swagger rejects the corresponding `int8`, `uint32`, and `decimal` schema-format controls. [AutoRest scalar emission](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-autorest/src/openapi.ts#L2727-L2786) supplies the source-level emission mapping; fresh emission was not assessed. |

## 4. Why diagnostic counts differ

The pilot demonstrates effective-result differences while the controls establish policy differences independently of source suppressions:

- **Suppressions matter:** relevant declarations carry 13 `no-format`, 16 `known-encoding`, and 93 `no-generic-numeric` source directives. These declaration counts are not diagnostic counts and are not version-aligned with the 111 Swagger occurrences.
- **TypeSpec checks more:** the controls verify warnings for recognized authored `uuid` and a generic `integer` property, while the corresponding Swagger format predicates accept `uuid` or an omitted format.
- **Swagger checks more:** the numeric-shape controls verify no native warning for `decimal[]` and inline decimal query parameters. Specific numeric types such as `int8`, `uint32`, and `decimal128` also pass the related native controls while their corresponding format vocabulary is Swagger-invalid.
- **Different acceptance and reporting:** [AutoRest's format allowlist](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-autorest/src/utils.ts#L155-L205) accepts additional values such as `decimal` and performs case-insensitive lookup. Swagger uses case-sensitive lookup and reports errors; the TypeSpec lint and AutoRest format diagnostics discussed here are warnings.

Recommendation: reuse the existing authoring checks and document the differences. Do not prohibit supported TypeSpec numeric types merely to match the Swagger list without a separate policy decision. A new decorator-only allowlist rule would overlap with `no-format` and would not address built-in scalar output differences. This recommendation is not an approved policy change or a completed migration.

## NOTES

- Related issue: [Azure/typespec-azure#5971](https://github.com/Azure/typespec-azure/issues/5971). The [issue analysis](https://github.com/Azure/typespec-azure/issues/5971#issuecomment-6647252945) links the Swagger documentation, implementation, and existing TypeSpec checks.
- Flow: `native-first`; singleton task `valid-formats-5971`. Disposition: documentation-only proposal reusing existing rules.
- Native base: canonical `Azure/typespec-azure:main` at `f578e3ad757c9e4ea827e7d20212e7c53c303f43`. Head branch: `feat/valid-formats-5971`; PR target: canonical `main`.
- Candidate: `1592d198b388e8612001bc4fa3e4f0b57b1663d7`; core: `f87a4e2d51c5cc0b3d995d4c7542578d55799804`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; pilot runtime: Node `v24.20.0`.
- Shared baseline: `swagger-arm-20261026-2cd3c5dd`, identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`. Full archive checksum, sealed identity, inventory and references were verified. Native injection was independently checked against 17 candidate package archives: 3,188 packed files matched installed bytes; the separately packed unused JSON-schema package was not installed or claimed as injected.
- Production Swagger ruleset: `@microsoft.azure/openapi-validator-rulesets@2.2.6`. Replay used the registered production rule and passed nine schema controls in each project. No new Swagger was generated.
- The three Azure Core checks are enabled in the existing ARM and data-plane presets. Their rule IDs, severity, suppression behavior, and activation are unchanged.
- Only the three authored rule documentation pages change in the native PR. No production code, tests, dependencies, or generated files change. Markdown-only changes are excluded by the repository's Chronus `changedFiles` configuration.
- The original review pause was respected before publication. The user subsequently authorized this five-project validation. Candidate closure build passed (24/24 packages); focused existing-rule tests passed (8 tests) on a serial rerun with a 60-second hook timeout after three initial 10-second parallel hook timeouts; the three changed documentation pages passed formatting.
- Setup failures remain in the local logs: an unrelated Python/debugpy TLS prepare failure, an initial pnpm-version mismatch, and stalled online npm TLS requests. Explicit offline installation using cached dependencies succeeded, and the original specs dependency manifests and lockfile were restored.
- **Limits:** five selected ARM projects only; source suppressions honored; saved README suppressions not applied; no globally aligned source/version correspondence, fresh emission, emitter `unknown-format`, full AutoRest validation, full-corpus run, or migration/release-readiness acceptance. Unassessed is not zero.
- Follow-up remains a policy decision about numeric-format compatibility and reporting shapes, not a requested production change.

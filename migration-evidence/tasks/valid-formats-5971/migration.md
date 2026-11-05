# ValidFormats: existing TypeSpec checks

## 1. Conclusion and scope

The existing TypeSpec rules `no-format`, `known-encoding`, and `no-generic-numeric` provide overlapping authoring checks related to the Swagger linter rule [ValidFormats](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/valid-formats.md), but are not functionally equivalent to its format allowlist. This documentation-only proposal explains those boundaries without adding a rule or changing behavior. Whether supported TypeSpec numeric formats outside the Swagger allowlist should be restricted remains an open policy decision.

## 2. Actual coverage

No project population has been evaluated for this proposal. Counts are individual diagnostics, not project counts.

| Count | Swagger linter | TypeSpec linter |
|---|---|---|
| Raw diagnostics | Unassessed | Unassessed |

No measured comparison is available. The source-level differences below are not observed corpus results; see [Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

| Behavior | Result | Rationale |
|---|---|---|
| Unknown authored `@format` | Source-mapped; execution unassessed | [`no-format`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/prevent-format.ts) warns on all authored format decorators, including recognized values. |
| Unsupported encoding names | Related policy; execution unassessed | [`known-encoding`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/known-encoding.ts) checks encoding names rather than OpenAPI format strings. |
| Generic numeric types | Additional TypeSpec policy; execution unassessed | [`no-generic-numeric`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/no-generic-numeric.ts) requires specific types even when the emitted schema satisfies the Swagger format check. |
| Built-in numeric formats excluded by Swagger | Output-parity gap; policy unresolved | [AutoRest scalar emission](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-autorest/src/openapi.ts#L2727-L2786) produces formats such as `int8`, `uint32`, and `decimal` that the [Swagger allowlist](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/schema-format.ts) excludes. These are not all prohibited by the three Azure Core rules. |

## 4. Why diagnostic counts differ

Actual diagnostic-count differences remain unassessed. Source inspection identifies these potential differences:

- **TypeSpec checks more:** `no-format` warns on recognized formats such as `uuid`; `no-generic-numeric` warns on generic types whose emitted schemas can pass `ValidFormats`.
- **Swagger checks more:** formats emitted for built-in types such as `int8`, `uint32`, and `decimal128` are outside its allowlist without being rejected by the three Azure Core checks above.
- **Different acceptance and reporting:** [AutoRest's format allowlist](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-autorest/src/utils.ts#L155-L205) accepts additional values such as `decimal` and performs case-insensitive lookup. Swagger uses case-sensitive lookup and reports errors; the TypeSpec lint and AutoRest format diagnostics discussed here are warnings.

Recommendation: reuse the existing authoring checks and document the differences. Do not prohibit supported TypeSpec numeric types merely to match the Swagger list without a separate policy decision. A new decorator-only allowlist rule would overlap with `no-format` and would not address built-in scalar output differences. This recommendation is not an approved policy change or a completed migration.

## NOTES

- Related issue: [Azure/typespec-azure#5971](https://github.com/Azure/typespec-azure/issues/5971). The [issue analysis](https://github.com/Azure/typespec-azure/issues/5971#issuecomment-6647252945) links the Swagger documentation, implementation, and existing TypeSpec checks.
- Flow: `native-first`; singleton task `valid-formats-5971`. Disposition: documentation-only proposal reusing existing rules.
- Native base: canonical `Azure/typespec-azure:main` at `f578e3ad757c9e4ea827e7d20212e7c53c303f43`. Head branch: `feat/valid-formats-5971`; PR target: canonical `main`.
- Source inspection uses the native base above and Swagger source `e1b8b207a196cf2fc288593efec22e6e38ab98d5`. No emitted artifacts or runtime behavior were validated.
- The three Azure Core checks are enabled in the existing ARM and data-plane presets. Their rule IDs, severity, suppression behavior, and activation are unchanged.
- Only the three authored rule documentation pages change in the native PR. No production code, tests, dependencies, or generated files change. Markdown-only changes are excluded by the repository's Chronus `changedFiles` configuration.
- **User-requested review pause:** no tests, builds, linters, formatters, documentation generation, or coverage runs were executed. Dependency installation, specs runtime setup, baseline selection, independent review, and development/release-readiness checkpoints remain deferred. This early draft is for user review, not a passed migration checkpoint or release-readiness claim.
- Suggested follow-up after review: decide the numeric-format policy, then authorize the appropriate documentation and validation steps. No validation result is being reused or claimed.

# RequestBodyNotAllowed

## 1. Conclusion and scope

The GET/DELETE predicate of `@azure-tools/typespec-azure-core/no-request-body` implements the intended data-plane policy beyond `Azure.Core.RpcOperation`. Full configured-population execution is complete; whole-rule equivalence remains undetermined.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-dataplane.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/request-body-not-allowed.md). Data-plane OpenAPI 2.0 warning; GET/DELETE operation parameters under `paths` are checked for `in: body`.

## 2. Actual coverage

**Assessed coverage:** the canonical local suite verifies both verbs on ordinary and RPC-derived operations, positive payloads and negative controls. The data-plane preset leaves the broader new rule disabled, preserving the existing enabled RPC rule. The [current pilot](../../validation/20261109-a9c4d8a/index.md) freshly compiles Key Vault Keys and Search data plane with zero target or ambient diagnostics. A separately documented selected-rule Spectral profile loads the installed production RequestBodyNotAllowed definition and reports zero findings on their frozen checked-in OAS2. Positive/negative/reference/selector controls pass.

This is selected-rule data-plane evidence, not coverage derived from the ARM-only shared baseline/analyzer, a saved data-plane baseline, or a full AutoRest production run. Source and selected Swagger populations are not version/reachability aligned; positive-case real-spec equivalence remains undetermined.

## 3. Function-level coverage

The [full data-plane pass](../../validation/full-20261110-a9c4d8a/index.md) compiled all 103 executable frozen preset projects, including eight outside conventional data-plane folders. Of these, 98 have assessed latest-version OAS2 comparisons; Foundry and four Key Vault Administration SDK-child configurations lack owned OAS2 and remain unassessed. All 2,364 retained Swagger/reference files passed post-run hashing. This remains a separate selected-rule Spectral profile, not a saved data-plane baseline or full AutoRest production execution.

Nine actual DELETE-body service operations are reported on both sides: six Purview DataMap and three Machine Learning RunHistory. Purview additionally has six native client-alias warnings, so raw counts are **15 native versus nine Swagger observations**. Actual compiler Operation/sourceOperation identities, HTTP service membership, exact verb/path and each Swagger body parameter establish the correspondences; equal counts alone are not used as evidence. [Purview investigation](../../validation/full-20261110-a9c4d8a/evidence/purview-gap-investigation.json), [RunHistory investigation](../../validation/full-20261110-a9c4d8a/evidence/run-history-positive-investigation.json). No real GET-body positive case was observed.

Explicit and resolved implicit GET/DELETE bodies report once; optional and empty-model bodies are not exempt. Bodyless and non-target-method controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Both use warning severity, but Swagger diagnoses selected parameter fields while TypeSpec diagnoses resolved operation bodies. The old RPC-specific rule remains available and can overlap if both are enabled. The historical two-project data-plane pilot had zero observations. The full pass has nine matching actual DELETE-body cases plus six Purview client aliases: raw native excess is six, Swagger excess is zero. Findings are not hidden or normalized; positive-case observations do not establish completeness for all possible source/Swagger representations.

## NOTES

The shared rule has one enablement/suppression ID for both verbs and audiences, not independent per-member controls. The user explicitly authorized full validation despite the pilot gaps on November 10, 2026. All 103 data-plane programs compiled; five Swagger comparisons remain unassessed. Search ARM scope warnings and Purview alias multiplicity remain unchanged; no full equivalence or release-readiness claim is made.

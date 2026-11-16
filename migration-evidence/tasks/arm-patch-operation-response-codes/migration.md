# PatchResponseCodes + LroPatch202 migration

## 1. Conclusion and scope

The TypeSpec rule `arm-patch-operation-response-codes` migrates Swagger linter
rules [PatchResponseCodes](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/patch-response-codes.md)
and [LroPatch202](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/lro-patch202.md).
**The migration is not fully equivalent:** TypeSpec classifies long-running
operations using Azure Core LRO metadata rather than Swagger extensions or
legacy AutoRest markers, and does not check LRO options/flag consistency.
Version-projected and full validator-engine equivalence remain unassessed.

## 2. Actual coverage

The candidate rule was explicitly enabled for 489 tracked ARM TypeSpec projects;
all compiled without final compiler errors. A rule-level replay assessed
checked-in Swagger associated with 488 of those projects. The remaining
[AzureResilienceManagement project](https://github.com/Azure/azure-rest-api-specs/tree/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/azureresiliencemanagement/resource-manager/Microsoft.AzureResilienceManagement/AzureResilienceManagement)
failed to compile in the saved baseline and produced no selected Swagger
output, so its Swagger comparison is unassessed; its current TypeSpec compile
had no rule diagnostic. Counts are individual diagnostics, not projects.

| Count                                                                     | Swagger linter | TypeSpec linter |
| ------------------------------------------------------------------------- | -------------: | --------------: |
| Reported diagnostics                                                      |            247 |             190 |
| Finding groups after excluding five known historical TypeSpec diagnostics |            185 |             185 |

Groups use project, exact PATCH route, and broad diagnostic category
(response-code set or `202` body). The TypeSpec compile is **unprojected**;
the five known historical diagnostics were manually separated, not
automatically projected. Swagger results are a rule-level replay, not a fresh
validator-engine run.

**Assessed coverage:** In the 488 compared projects, all 185 remaining TypeSpec
diagnostics and all 247 Swagger findings have a counterpart by that grouping:
32 synchronous response-code, 81 LRO response-code, and 72 `202`-body groups.
No Swagger-only or remaining TypeSpec-only groups were identified within this
scope. Grouping does not prove semantic equivalence or count distinct service
defects; comparable violation totals and coverage percentages remain
unassessed. See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

| Behavior                                                              | Result      | Rationale                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Synchronous PATCH requires exactly `200` and `default`.               | Implemented | [Rule](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts) and [fixtures](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/test/rules/arm-patch-response-codes.test.ts) include compliant and invalid responses.                                             |
| LRO PATCH requires `200`, `202`, and `default`, with no `202` body.   | Implemented | The same [rule](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts) and [fixtures](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/test/rules/arm-patch-response-codes.test.ts) cover both checks; LRO classification differs below.                        |
| LRO classification from an explicit extension or legacy marker alone. | Different   | The [TypeSpec rule](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts) uses `getLroMetadata`; its [fixtures](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/test/rules/arm-patch-response-codes.test.ts) exercise explicit flags without native metadata. |
| LRO options and explicit flag consistency.                            | Missing     | The TypeSpec rule does not perform the options/flag check in the [Swagger implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/patch-response-codes.ts).                                                                                                                                                                                                  |
| Per-version response behavior.                                        | Unassessed  | The [rule documentation](https://github.com/Azure/typespec-azure/blob/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd/packages/typespec-azure-resource-manager/src/rules/arm-patch-operation-response-codes.md) notes the unprojected inspection; five historical findings were reviewed manually.                                                                                                                                                                  |

## 4. Why diagnostic counts differ

For Swagger, `raw / grouped` means diagnostics / project-route-category groups;
the TypeSpec column counts diagnostics for the same check. These groups are
not proven equivalent violations. [Project inventory and route-level findings](full-validation.json)
contain the observations.

| Difference (with evidence)             | Swagger diagnostics (raw / grouped) | TypeSpec diagnostics for the same check | Recommended action and rationale                                                                                                          |
| -------------------------------------- | ----------------------------------: | --------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| LRO response-code findings             |                            143 / 81 |                                      81 | The Swagger linter emits 62 additional `LroPatch202` findings on routes already reported by `PatchResponseCodes`; retain both raw counts. |
| Five historical `202`-body diagnostics |    0 / 0 for the removed operations |                                       5 | Review the version-specific cases below; do not treat them as unmatched operations in the selected Swagger versions.                      |

The five historical cases are:

- CDN's [`KeyGroups.update`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cdn/resource-manager/Microsoft.Cdn/Cdn/KeyGroup.tsp#L46-L79),
  [`ProfileAgents.update`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cdn/resource-manager/Microsoft.Cdn/Cdn/ProfileAgent.tsp#L47-L80),
  [`WebAgents.update`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cdn/resource-manager/Microsoft.Cdn/Cdn/WebAgent.tsp#L44-L77),
  and [`KnowledgeSources.update`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/cdn/resource-manager/Microsoft.Cdn/Cdn/KnowledgeSource.tsp#L47-L80)
  belong to interfaces added in `2025-09-01-preview` and removed in
  `2025-12-01`; the compared Swagger version is `2026-10-01`.
- NetApp's [`NetAppAccounts.updatePrevious`](https://github.com/Azure/azure-rest-api-specs/blob/489ca9fba553863941a9e52c73bd0fd390a5d25b/specification/netapp/resource-manager/Microsoft.NetApp/NetApp/NetAppAccount.tsp#L1012-L1059)
  was removed in `2026-06-15-preview`, before the compared
  `2026-08-15-preview` version. The current `update` shares its route and has
  a corresponding `202`-body finding in both observations.

An earlier scan searched only inside each TypeSpec project directory and
missed Swagger outputs in parent service folders. Correcting it recovered
baseline-mapped files for 216 additional projects: all 33 diagnostics
previously described as lacking current Swagger now have matching
project/route/category findings. The one project without a baseline-selected
output remains unassessed on the Swagger side.

## NOTES

- Candidate: [`48cf299a78fc3ef05aaded57e2f78e5821e0f4bd`](https://github.com/Azure/typespec-azure/commit/48cf299a78fc3ef05aaded57e2f78e5821e0f4bd).
  Specs: [`489ca9fba553863941a9e52c73bd0fd390a5d25b`](https://github.com/Azure/azure-rest-api-specs/commit/489ca9fba553863941a9e52c73bd0fd390a5d25b).
  Saved Swagger baseline specs: [`939d1a81ec5159e61394cd8ca2589c2c0ce49ccd`](https://github.com/Azure/azure-rest-api-specs/commit/939d1a81ec5159e61394cd8ca2589c2c0ce49ccd);
  baseline identity: `f51dcc4346381627b705749bca251aad69f839db5c5d796524093f05a17ed742`.
- The replay exactly reproduced the saved baseline's 185 `PatchResponseCodes`
  and 62 `LroPatch202` findings. For current specs it evaluated 650
  project-file associations (649 distinct checked-in Swagger files), matched
  to the baseline's output paths and API versions, including parent folders.
  New paths or versions outside that inventory were not searched. The replay
  does not run reference resolution or suppression processing; no path-item,
  PATCH-operation, response-object, or `202`-response references were found in
  those files. This is not a fresh production validator-engine run.
- The initial 76 TypeSpec compiler-error projects were retried with compatible
  temporary package overlays; the final results contain no compiler errors.
  The runtime used TypeSpec compiler and HTTP `1.18.0`, REST `0.88.0`, and
  Azure Core/Resource Manager `0.74.0`. A complete runtime lock and
  fresh-checkout regeneration have not been published or verified.
- Focused PATCH and ruleset tests passed at `36dfe969c063dab62d049bb3c807cd71dc41ef05`;
  the later candidate changes only changelog files. Full local package
  lifecycle scripts were not rerun because Corepack could not fetch the
  pinned pnpm version due to a TLS error.
- [Full validation data](full-validation.json) SHA-256:
  `8c5b7c58051bc1566f0043e49140dc41d75c21be935d08b0d79b5796577dff0a`.
  Run `node verify-full-validation.mjs` beside it to reanalyze the saved
  observations; this does not rerun either linter.
- The rule is a warning, enabled in ARM's `all` ruleset and explicitly
  disabled in the curated `resource-manager` ruleset. Duplicate HTTP compiler
  diagnostics remain tracked in [Azure/typespec-azure#6084](https://github.com/Azure/typespec-azure/issues/6084).

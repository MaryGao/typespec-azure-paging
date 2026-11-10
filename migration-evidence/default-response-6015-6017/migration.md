# MissingDefaultResponse and RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the shared ARM fallback-response policy of [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) and [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **Full native validation assessed all 487 frozen projects without compile failures: all 178 historical legacy findings have one-to-one native witnesses. Native reports 486 findings, including 308 additional non-service source operations; raw counts are not equivalent.** The TypeSpec linter intentionally avoids the Spectral rule's response-key selector bug, which misses ordinary absent defaults.

The check requires a fallback response, not a particular payload or error marker. It covers concrete operations across HTTP methods, including HEAD. `MissingXmsErrorResponse` is not part of this migration.

## 2. Actual coverage

The initial five-project pilot and subsequent full 487-project run were each explicitly approved. Swagger counts are retained successful production observations from the sealed frozen baseline, not fresh execution. TypeSpec counts are fresh injected-candidate diagnostics. The same shared native count is compared independently to each Swagger member; it must not be summed twice. The original pilot results below remain unchanged.

| Project                             | MissingDefaultResponse | RequiredDefaultResponse |  Native | Legacy/native matched |
| ----------------------------------- | ---------------------: | ----------------------: | ------: | --------------------: |
| Site Recovery                       |                      0 |                     137 |     137 |                   137 |
| Application Insights Component APIs |                      0 |                      23 |      23 |                    23 |
| IoT Hub                             |                      0 |                       1 |       1 |                     1 |
| Deployments                         |                      0 |                       0 |       0 |                     0 |
| Storage                             |                      0 |                       0 |       0 |                     0 |
| **Total**                           |                  **0** |                 **161** | **161** |               **161** |

**Assessed coverage:** all 161 selected `RequiredDefaultResponse` findings map one-to-one to concrete native operations by route, verb, authored location and absent fallback. There are no legacy-only or native-only findings against that member in this sample. The 161 native-only findings against `MissingDefaultResponse` are corroborated false negatives of its selector, not unexplained coverage gaps. Both Swagger rules were demonstrably registered in each saved production execution. Nine injected artifact controls passed; all 15 installed package payloads match their archives byte-for-byte; all five project workers compiled successfully.

The [five-project report](validation/five-project/README.md) contains its original per-project inventories, exact TypeSpec/Swagger examples, receipts, hashes and limitations.

| Population                     | MissingDefaultResponse | RequiredDefaultResponse | Native | Bijectively matched legacy findings | Native-only non-service source |
| ------------------------------ | ---------------------: | ----------------------: | -----: | ----------------------------------: | -----------------------------: |
| Initial five-project pilot     |                      0 |                     161 |    161 |                                 161 |                              0 |
| Full 487-project frozen corpus |                      0 |                     178 |    486 |                                 178 |                            308 |

The [full report](validation/full/README.md) includes all 487 raw native receipts, 24 finding-project reports and individual operation correspondence. All 178 historical findings match concrete native operations by source location, route, verb and missing fallback, with zero Swagger-only or ambiguous findings. The 308 native-only findings across 17 other projects are all non-service SDK customization/compatibility declarations without saved Swagger route/verb counterparts: 304 in `client.tsp` and four in Key Vault's `back-compatible.tsp`. None belongs to the compiler's HTTP service operation set. Their absent fallback and exact source identities are corroborated; they are not 308 extra saved-wire defects or unexplained Spectral misses.

Both Swagger members were registered in all 649 successful retained production executions. All 15 installed candidate archives and all 487 worker package identities were verified after the official analyzer completed its full baseline/dataset integrity checks. Thirty-seven applicable portable controls passed; six fixtures requiring an unrelated unmerged rule were prospectively excluded. The nine target-specific pilot controls used the same unchanged archives.

Native mode is `target-only`, scope is `source`, and suppressions are retained. Default activation, fresh emission and selected-version projection are not assessed. Leave recommended-ruleset activation disabled while reviewing whether non-service SDK customization/compatibility operations belong in the rule's policy. No implementation or independent-reporting behavior was changed by validation.

The 27 new-rule cases, 72 existing-rule/package regressions and 17 ruleset checks are retained in [development evidence](development.md); focused semantic controls are not substitutes for full-corpus evidence.

## 3. Function-level coverage

| Behavior                                                                          | Result                                                  | Rationale                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing fallback on GET, PUT, PATCH, POST, DELETE, HEAD, or an empty response set | Verified in focused controls and selected real projects | Native HTTP metadata identifies absent `"*"` responses; 161 real missing defaults correspond to legacy findings. Injected GET/HEAD/empty controls discriminate violating behavior.                                         |
| Status-specific or ranged error is not a fallback                                 | Verified in focused controls                            | Marking an explicit or ranged status with `@error` does not replace the default. Numeric-error behavior also passes injected artifact control.                                                                             |
| Standard ARM template or custom default response                                  | Verified in controls; compliant real projects assessed  | Storage provides compliant standard ARM operations, and five Deployments HEAD operations have `204`, `404`, and default. Injected standard/custom defaults are accepted.                                                   |
| Combine the two Swagger names into one native rule                                | Implemented                                             | One TypeSpec rule, one public ID, and one warning per concrete operation lacking a default. Other rules report independently.                                                                                              |
| Independent existing ARM response-code or missing-error diagnostics               | Verified in focused integration controls                | Interaction checks require both diagnostics for PUT, synchronous/asynchronous POST, DELETE and both missing-error registration orders. The pilot explicitly enables only the target rule; existing rules remain unchanged. |
| Full frozen-corpus native execution                                               | Assessed: 487/487 projects                              | All 178 historical findings captured; 308 additional non-service source declarations retained rather than filtered away.                                                                                                   |
| Fresh emitted-output or selected-version projection equivalence                   | Unassessed                                              | Frozen-reference validation reuses historical Swagger and does not rerun emission or align source traversal to one emitted API version.                                                                                    |

## 4. Why diagnostic counts differ

The full-corpus differences are measured separately for each Swagger member:

| Difference (with evidence)                                                | Swagger diagnostics                                      | TypeSpec diagnostics for the same check | Recommended action and rationale                                                                                                                                      |
| ------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Spectral selector defect](members/MissingDefaultResponse/migration.md)   | 0 across 649 registered, completed production executions | 486                                     | Decompose the excess: 178 corroborated saved-wire false negatives plus 308 non-service source declarations. Do not label all 486 Spectral false negatives.            |
| [Legacy response-map check](members/RequiredDefaultResponse/migration.md) | 178                                                      | 486; 178 bijectively matched            | Zero Swagger-only; 308 native-only non-service declarations. Equal project counts in 470/487 projects, native-higher excess and total absolute difference 308.        |
| Non-service SDK customization/compatibility declarations                  | No matching emitted operations                           | 308                                     | Decide source scope before recommended activation; retain raw diagnostics and typed service-membership evidence.                                                      |
| Overlap with other enabled response rules                                 | Independently reported by Swagger rules                  | Independently reported by native rules  | Target-only runs do not measure duplicate volume. [Issue #6042](https://github.com/Azure/typespec-azure/issues/6042), under epic #6020, tracks the policy discussion. |

## NOTES

- Issues: fixes [#6017](https://github.com/Azure/typespec-azure/issues/6017) and [#6015](https://github.com/Azure/typespec-azure/issues/6015).
- Membership is frozen to `MissingDefaultResponse` and `RequiredDefaultResponse`; no third Swagger rule is included.
- Flow: native-first with the user's explicit staging override. Prepare the development PR without real-spec execution, then stop for manual review and approval.
- Candidate base: canonical `Azure/typespec-azure:main`, `3f6b4c0518ee1ca9da38571e6a4e7febc7ac0920`; core gitlink `8574d5453f7bf9a07dc09bd41edac579af71d94b`.
- Tested implementation commit: [`071afdea846ea0898e03a4d59f2c67bfa5a68266`](https://github.com/MaryGao/typespec-azure-paging/commit/071afdea846ea0898e03a4d59f2c67bfa5a68266). Cross-rule deduplication was removed and existing rules restored unchanged; the latest commit aligns Markdown example headings. The simplified source was rebuilt and the 99 focused ARM tests and root lint passed. Retained independent source review found no high-confidence bugs at this exact commit before packing.
- Original Swagger implementation identity: `Azure/azure-openapi-validator`, `e1b8b207a196cf2fc288593efec22e6e38ab98d5`. Both source rules have error severity and ARM applicability, without independent options.
- TypeSpec severity is warning, consistent with the owning package. The library `all` set includes the new rule; the central resource-manager preset explicitly disables it. Enablement and suppression share the one new public ID; other rules retain their own IDs and independent suppression behavior.
- Development publication: branch `feat/default-response-6015-6017`, personal fork `MaryGao/typespec-azure-paging`, targeting `Azure/typespec-azure:main`. PR title is the user's requested `Imple MissingDefaultResponse and RequiredDefaultResponse rules`.
- Draft PR: [Azure/typespec-azure#6038](https://github.com/Azure/typespec-azure/pull/6038), targeting `main`, at tested implementation head `071afdea846ea0898e03a4d59f2c67bfa5a68266`. GitHub recognizes both closing issue references. The user separately approved representative and full validation on 2026-11-10; both stages are assessed.
- Evidence publication: branch `migration-evidence/default-response-6015-6017` in the same verified personal fork, without a second PR.
- Reused baseline: `swagger-arm-20261026-2cd3c5dd`, identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`, metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`, frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. The full analyzer verified the complete 93,496-file inventory, copied/verified it and checked final dataset integrity without regenerating or rerunning Swagger.
- One report per project is saved under the new local `coverage-reports/default-response-6015-6017` folder and published under [validation/five-project](validation/five-project/README.md). Local artifact archives/runtime are retained; portable artifact recovery and full release readiness are not certified by this pilot.
- Full-population results are saved separately under [validation/full](validation/full/README.md); the five-project publication is unchanged. The source-only excess is a scope/rollout decision, not an approved change to the new rule.
- Review records distinguish the original [pilot review](validation/review.json) and [full-evidence review](validation/full/review.json). Neither certifies portable artifact recovery or release/merge readiness.

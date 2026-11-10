# MissingDefaultResponse and RequiredDefaultResponse migration

## 1. Conclusion and scope

The TypeSpec rule `@azure-tools/typespec-azure-resource-manager/missing-default-response` implements the shared ARM fallback-response policy of [MissingDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/missing-default-response.md) and [RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/required-default-response.md). **The approved five-project pilot is assessed: all 161 selected legacy findings match native findings, while the defective Spectral rule reports zero. Full-corpus equivalence remains unassessed.** The TypeSpec linter intentionally avoids the Spectral rule's response-key selector bug, which misses ordinary absent defaults.

The check requires a fallback response, not a particular payload or error marker. It covers concrete operations across HTTP methods, including HEAD. `MissingXmsErrorResponse` is not part of this migration.

## 2. Actual coverage

Five real projects were assessed after explicit user approval. Swagger counts are retained successful production observations from the sealed frozen baseline, not fresh execution. TypeSpec counts are fresh injected-candidate diagnostics. The same shared native count is compared independently to each Swagger member; it must not be summed twice.

| Project                             | MissingDefaultResponse | RequiredDefaultResponse |  Native | Legacy/native matched |
| ----------------------------------- | ---------------------: | ----------------------: | ------: | --------------------: |
| Site Recovery                       |                      0 |                     137 |     137 |                   137 |
| Application Insights Component APIs |                      0 |                      23 |      23 |                    23 |
| IoT Hub                             |                      0 |                       1 |       1 |                     1 |
| Deployments                         |                      0 |                       0 |       0 |                     0 |
| Storage                             |                      0 |                       0 |       0 |                     0 |
| **Total**                           |                  **0** |                 **161** | **161** |               **161** |

**Assessed coverage:** all 161 selected `RequiredDefaultResponse` findings map one-to-one to concrete native operations by route, verb, authored location and absent fallback. There are no legacy-only or native-only findings against that member in this sample. The 161 native-only findings against `MissingDefaultResponse` are corroborated false negatives of its selector, not unexplained coverage gaps. Both Swagger rules were demonstrably registered in each saved production execution. Nine injected artifact controls passed; all 15 installed package payloads match their archives byte-for-byte; all five project workers compiled successfully.

The [five-project report](validation/five-project/README.md) contains per-project inventories, exact TypeSpec/Swagger examples, receipts, hashes and limitations. Native mode is `target-only`, scope is `source`, and suppressions are retained. Default activation and selected-version projection are not assessed. Source and selected emitted-operation populations can differ despite exact diagnostic correspondence. Full-population validation remains gated by a separate approval.

The 27 new-rule cases, 72 existing-rule/package regressions and 17 ruleset checks are retained in [development evidence](development.md); focused semantic controls are not substitutes for full-corpus evidence.

## 3. Function-level coverage

| Behavior                                                                          | Result                                                  | Rationale                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing fallback on GET, PUT, PATCH, POST, DELETE, HEAD, or an empty response set | Verified in focused controls and selected real projects | Native HTTP metadata identifies absent `"*"` responses; 161 real missing defaults correspond to legacy findings. Injected GET/HEAD/empty controls discriminate violating behavior.                                         |
| Status-specific or ranged error is not a fallback                                 | Verified in focused controls                            | Marking an explicit or ranged status with `@error` does not replace the default. Numeric-error behavior also passes injected artifact control.                                                                             |
| Standard ARM template or custom default response                                  | Verified in controls; compliant real projects assessed  | Storage provides compliant standard ARM operations, and five Deployments HEAD operations have `204`, `404`, and default. Injected standard/custom defaults are accepted.                                                   |
| Combine the two Swagger names into one native rule                                | Implemented                                             | One TypeSpec rule, one public ID, and one warning per concrete operation lacking a default. Other rules report independently.                                                                                              |
| Independent existing ARM response-code or missing-error diagnostics               | Verified in focused integration controls                | Interaction checks require both diagnostics for PUT, synchronous/asynchronous POST, DELETE and both missing-error registration orders. The pilot explicitly enables only the target rule; existing rules remain unchanged. |
| Full emitted-output or production-count equivalence                               | Unassessed                                              | Representative approval has been consumed; full-population execution requires separate approval.                                                                                                                           |

## 4. Why diagnostic counts differ

The selected five-project differences are measured; full-corpus differences remain unassessed:

| Difference (with evidence)                                                | Swagger diagnostics                                 | TypeSpec diagnostics for the same check | Recommended action and rationale                                                                                       |
| ------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [Spectral selector defect](members/MissingDefaultResponse/migration.md)   | 0 observed in five registered production executions | 161                                     | Keep intended fallback policy. Native-higher excess and total absolute difference are 161; two projects agree at zero. |
| [Legacy response-map check](members/RequiredDefaultResponse/migration.md) | 161                                                 | 161, all individually matched           | No unexplained gap in this sample; five equal-count projects and zero excess in either direction.                      |
| Native source operations versus selected emitted API                      | Different operation populations in IoT Hub/Storage  | No extra target findings in the sample  | Preserve source/API-version boundaries; this is not full projection equivalence.                                       |
| Overlap with other enabled response rules                                 | Independently reported by Swagger rules             | Independently reported by native rules  | Pilot is target-only; preserve activation/suppression context rather than silently deduplicating.                      |

## NOTES

- Issues: fixes [#6017](https://github.com/Azure/typespec-azure/issues/6017) and [#6015](https://github.com/Azure/typespec-azure/issues/6015).
- Membership is frozen to `MissingDefaultResponse` and `RequiredDefaultResponse`; no third Swagger rule is included.
- Flow: native-first with the user's explicit staging override. Prepare the development PR without real-spec execution, then stop for manual review and approval.
- Candidate base: canonical `Azure/typespec-azure:main`, `3f6b4c0518ee1ca9da38571e6a4e7febc7ac0920`; core gitlink `8574d5453f7bf9a07dc09bd41edac579af71d94b`.
- Tested implementation commit: [`071afdea846ea0898e03a4d59f2c67bfa5a68266`](https://github.com/MaryGao/typespec-azure-paging/commit/071afdea846ea0898e03a4d59f2c67bfa5a68266). Cross-rule deduplication was removed and existing rules restored unchanged; the latest commit aligns Markdown example headings. The simplified source was rebuilt and the 99 focused ARM tests and root lint passed. Retained independent source review found no high-confidence bugs at this exact commit before packing.
- Original Swagger implementation identity: `Azure/azure-openapi-validator`, `e1b8b207a196cf2fc288593efec22e6e38ab98d5`. Both source rules have error severity and ARM applicability, without independent options.
- TypeSpec severity is warning, consistent with the owning package. The library `all` set includes the new rule; the central resource-manager preset explicitly disables it. Enablement and suppression share the one new public ID; other rules retain their own IDs and independent suppression behavior.
- Development publication: branch `feat/default-response-6015-6017`, personal fork `MaryGao/typespec-azure-paging`, targeting `Azure/typespec-azure:main`. PR title is the user's requested `Imple MissingDefaultResponse and RequiredDefaultResponse rules`.
- Draft PR: [Azure/typespec-azure#6038](https://github.com/Azure/typespec-azure/pull/6038), targeting `main`, at tested implementation head `071afdea846ea0898e03a4d59f2c67bfa5a68266`. GitHub recognizes both closing issue references. The user approved representative validation on 2026-11-10; results are now stopped for review before full validation.
- Evidence publication: branch `migration-evidence/default-response-6015-6017` in the same verified personal fork, without a second PR.
- Reused baseline: `swagger-arm-20261026-2cd3c5dd`, identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`, metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`, frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Its seal and selected inputs were verified without rerunning Swagger.
- One report per project is saved under the new local `coverage-reports/default-response-6015-6017` folder and published under [validation/five-project](validation/five-project/README.md). Local artifact archives/runtime are retained; portable artifact recovery and full release readiness are not certified by this pilot.
- Full-population validation has not run. Stop for user review and separate approval.
- The retained independent reviewer found no high-confidence evidence errors in this representative assessment; see the [scoped review record](validation/review.json). This is not a full-corpus or release-readiness review.

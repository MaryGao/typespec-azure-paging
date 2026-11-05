# ValidFormats: existing TypeSpec checks and numeric coverage fixes

## 1. Conclusion and scope

The existing TypeSpec rules `no-format`, `known-encoding`, and `no-generic-numeric` provide overlapping authoring checks related to the Swagger linter rule [ValidFormats](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/valid-formats.md), but are not functionally equivalent to its format allowlist. After the documentation-first review, the user authorized fixing the observed numeric reporting shapes: the existing `no-generic-numeric` rule now checks generic numeric array elements, dictionary values (including nested combinations of arrays and records), and inline operation parameters. No new rule is introduced. Whether supported specific TypeSpec numeric formats outside the Swagger allowlist should be restricted remains an open policy decision.

**The additional dictionary-value gap is now fixed:** after the [second five-project batch](batch-2.md) identified unreported `Record<decimal>` values in Commerce, the user authorized the fix and rerun. Commerce numeric warnings change **1 → 2**, and all **12** Swagger occurrences in that batch now have related native warnings.

**Full retained ARM validation is complete on the latest candidate:** all **487 projects / 649 Swagger files** were assessed without suppressions. All **123** saved Swagger findings were reproduced and have related native source-warning witnesses; **zero Swagger-only occurrences** remain. The **204 additional native warnings** are explained policy differences, not missed numeric reporting shapes. See [the full validation report](full-validation.md).

## 2. Actual coverage

A post-fix rerun of the first five-project ARM pilot has completed **without suppressions**: all authored-service `#suppress` directives were disabled in memory, and fresh production `ValidFormats`-only Spectral replay applied no README/AutoRest suppression filtering. All five native compilations succeeded. Swagger reproduced **111** findings; the three TypeSpec rules produced **13**, **16**, and **95** warnings respectively.

These historical first-batch measurements use candidate `952472b51b488486c0a41855cc8f3a22208613fe`, before the dictionary follow-up. Candidate `21f7aefe9c4399e4f51b28349ef02d4c64b1c5fc` was then rerun against the second batch, as reported in section 5, and subsequently against all 487 retained projects, including the first five, as reported in section 6. The original pilot receipts retain their original revision.

The original zero-count native comparison mistakenly honored source suppressions and did not answer the requested raw-violation comparison. It is superseded; its local receipts remain archived.

| Project                         | Saved Swagger | Fresh replay | no-format | known-encoding | no-generic-numeric |
| ------------------------------- | ------------: | -----------: | --------: | -------------: | -----------------: |
| Consumption                     |            76 |           76 |        11 |              0 |                 76 |
| Cost Management                 |            19 |           19 |         0 |              0 |                 19 |
| Service Fabric Managed Clusters |            14 |           14 |         0 |             14 |                  0 |
| Cosmos DB                       |             2 |            2 |         0 |              2 |                  0 |
| API Management                  |             0 |            0 |         2 |              0 |                  0 |

These are separate diagnostic units, not a combined equivalent-defect score. Per-occurrence inspection now finds **111 Swagger occurrences with related native source-warning witnesses**, **zero Swagger-only occurrences**, and **13 additional TypeSpec warnings**. Source witnesses are retained, but source is not globally projected to each selected API version.

- **Fixed Swagger-only shapes:** Consumption's inline `previewMarkupPercentage: decimal` query parameter and Cost Management's `RecommendationUsageDetails.charges: decimal[]` array items now have related numeric warnings. Consumption changes **75 → 76** and Cost Management **18 → 19**; the other three projects and all Swagger counts are unchanged. The standalone boundary fixture changes from zero warnings to exactly two numeric warnings.
- **TypeSpec-only:** 11 Consumption and two API Management authored `@format("uuid")` warnings. Each corresponding selected Swagger property retains accepted `format: uuid`, with no `ValidFormats` finding.

The [machine-readable pilot summary](pilot-summary.json) and [validation receipt](pilot-validation.json) retain the measured outcomes. Detailed local reports, complete occurrence inventories, Swagger snapshots, source excerpts, pinned source links, exact commands and logs are under `coverage-reports\valid-formats`. Post-fix raw receipts are under `after-fix\without-suppressions`; the previous raw comparison and its detailed reports remain under `without-suppressions` and `before-fix`.

## 3. Function-level coverage

| Behavior                                     | Result                                            | Rationale                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unknown authored `@format`                   | Unsuppressed control verified                     | [`no-format`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/prevent-format.ts) warns on both unknown `fake` and recognized `uuid` decorators.                                                                                                                                                                                      |
| Unsupported encoding names                   | Related policy; control verified                  | [`known-encoding`](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/rules/known-encoding.ts) reports the custom encoding control; the real `duration-constant` source declarations carry suppressions.                                                                                                                                      |
| Generic numeric model properties             | Additional policy; control verified               | [`no-generic-numeric`](https://github.com/Azure/typespec-azure/blob/952472b51b488486c0a41855cc8f3a22208613fe/packages/typespec-azure-core/src/rules/no-generic-numeric.ts) reports a direct generic `integer` property, even though Swagger does not require a format.                                                                                                                                            |
| Decimal array / inline query parameter       | Both observed reporting-shape gaps fixed          | Cost Management's `RecommendationUsageDetails.charges: decimal[]` and Consumption's inline `previewMarkupPercentage: decimal` now report. Nested arrays are supported with a cycle guard. Operation-spread regression coverage verifies no new duplicate warnings; allowed specific numeric types and scalar-extension behavior are preserved.                                                                    |
| Built-in numeric formats excluded by Swagger | Policy unresolved; controlled predicates verified | `int8`, `uint32`, and `decimal128` pass the three native controls. Swagger rejects the corresponding `int8`, `uint32`, and `decimal` schema-format controls. [AutoRest scalar emission](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-autorest/src/openapi.ts#L2727-L2786) supplies the source-level emission mapping; fresh emission was not assessed. |

## 4. Why diagnostic counts differ

The comparison now measures raw violations with suppressions disabled on both sides:

- **First-batch overlapping observations:** 95 numeric and 16 encoding Swagger occurrences have related native warnings at their authored source witnesses.
- **TypeSpec checks more:** 13 actual authored `uuid` warnings correspond to accepted Swagger UUID properties. Separately, a direct generic `integer` control warns even though Swagger does not require a format.
- **Potential Swagger-only policy differences remain:** the observed array, inline-parameter and dictionary-value gaps are now fixed. Separately, specific numeric types such as `int8`, `uint32`, and `decimal128` still pass the related native controls while their corresponding format vocabulary is Swagger-invalid. This separate compatibility policy was deliberately not changed.
- **Different acceptance and reporting:** [AutoRest's format allowlist](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-autorest/src/utils.ts#L155-L205) accepts additional values such as `decimal` and performs case-insensitive lookup. Swagger uses case-sensitive lookup and reports errors; the TypeSpec lint and AutoRest format diagnostics discussed here are warnings.

Recommendation: reuse the existing authoring checks, close the demonstrated numeric reporting-shape gaps, and document the remaining policy differences. Do not prohibit supported specific TypeSpec numeric types merely to match the Swagger list without a separate policy decision. A new decorator-only allowlist rule would overlap with `no-format` and would not address built-in scalar output differences. This pilot does not establish full migration equivalence or acceptance.

## 5. Second five-project batch

The user requested five previously untested projects selected for diverse source patterns. The initial comparison found a dictionary-value gap, and the user authorized fixing it and rerunning the same five projects. The final candidate was rebuilt, reinjected and byte-hash verified again. All authored-source suppressions were disabled, and no Swagger suppression filtering was applied.

| Project        | Swagger | no-format | known-encoding | no-generic-numeric | Swagger-only |
| -------------- | ------: | --------: | -------------: | -----------------: | -----------: |
| Commerce       |       2 |         0 |              0 |                  2 |            0 |
| Service Fabric |      10 |         0 |             10 |                  0 |            0 |
| Compute        |       0 |         0 |              0 |                  0 |            0 |
| Storage        |       0 |         0 |              0 |                  0 |            0 |
| Key Vault      |       0 |         0 |              0 |                  0 |            0 |

All **12** saved Swagger findings were reproduced at exactly the same document/JSON paths. All **12** now have related native source-warning witnesses, with **zero** Swagger-only and **zero** TypeSpec-only occurrences in this batch.

The previously unmatched occurrence is Commerce's [`MonetaryCommitment.TieredDiscount?: Record<decimal>`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/commerce/resource-manager/Microsoft.Commerce/Commerce/models.tsp#L356). Swagger rejects `/definitions/MonetaryCommitment/properties/TieredDiscount/additionalProperties/format`. The numeric rule now unwraps dictionary values as well as arrays, including nested combinations, with the existing cycle guard. Commerce numeric warnings change **1 → 2**, and the isolated suppression-free `Record<decimal>` control changes **0 → 1**. The other four projects and all Swagger counts are unchanged.

Commerce covers generic decimal pricing; Service Fabric covers custom duration encodings; Compute covers fixed-precision numerics and standard durations; Storage covers RFC7231 dates and fixed-precision thresholds; Key Vault covers base64url bytes and typed arrays. Specific numeric compatibility policy, scalar-extension behavior, rule IDs and severity are unchanged.

The [second-batch report](batch-2.md) and [portable validation receipt](batch-2-validation.json) retain the complete 12-occurrence inventory, exact schemas/source, raw native warnings, controls and source-pattern witnesses. Detailed post-fix local reports are under `coverage-reports\valid-formats\batch-2\after-dictionary-fix`. [Before-fix evidence](https://github.com/MaryGao/typespec-azure-paging/blob/18992e334abe771f9e4473b7d9cec63182b7a6e8/migration-evidence/tasks/valid-formats-5971/batch-2.md), local pre-fix reports and the first batch are preserved.

## 6. Full retained ARM validation

The user authorized the full frozen ARM corpus after both five-project comparisons and fixes. All **487 native compilations** and **487 production-rule replays** succeeded, covering **649 retained Swagger files**, with **zero unassessed project failures**. All authored-source suppressions were disabled in memory, and Swagger replay applied no README/AutoRest suppression filtering. Candidate code stayed at `21f7aefe9c4399e4f51b28349ef02d4c64b1c5fc`.

| Measurement                                      |    Result |
| ------------------------------------------------ | --------: |
| Saved / fresh Swagger `ValidFormats`             | 123 / 123 |
| TypeSpec `no-format`                             |       202 |
| TypeSpec `known-encoding`                        |        28 |
| TypeSpec `no-generic-numeric`                    |        97 |
| Swagger occurrences with related native warnings |       123 |
| Swagger-only occurrences                         |         0 |
| Additional native warnings                       |       204 |

These are per-compilation warning occurrences, not deduplicated defects or equivalent policies. All **202** additional format warnings ban authored `@format`/`@@format` applications whose values are accepted by the production Swagger rule: `uuid`, `duration`, and `password`. The remaining **two** warnings are AppService's unsupported authored `@encode("bytes")` on publishing-profile responses. The corresponding saved operations, `WebApps_ListPublishingProfileXmlWithSecrets` and its `Slot` variant, use response schema `{ "type": "file" }` with no format, outside `ValidFormats`' predicate. These are explained native-only checks, not new Swagger-only gaps.

The validation host initially mishandled UTF-8 BOM normalization in its source-integrity check. After correcting that host and adding a BOM control, the whole population was restarted fresh; raw service bytes and compiler-normalized source positions were verified independently. Network's replay then exhausted both its default 4 GiB heap and a bounded 12 GiB retry. Investigation established that Spectral eagerly expands references even though production `ValidFormats` declares `resolved: false`. Supported resolver options disabled this irrelevant dereferencing without changing the registered rule or function. All **630 previously successful Swagger files** were replayed with that resolver and produced **identical complete ValidFormats diagnostics**; Network's **19 files** then succeeded with zero findings. Original failed attempts and recovery commands remain in the receipts.

The [full report](full-validation.md), [487-project scorecard](full-validation-summary.json), [complete occurrence/disposition inventory](full-validation-findings.json), and [verification receipt](full-validation-receipt.json) retain the results. Detailed local reports for every project, exact schemas/source excerpts, raw outputs and commands are under `coverage-reports\valid-formats\full-validation`. Seventeen injected packages / 3,188 packed files matched installed bytes at start and end. Earlier pilot evidence is unchanged.

This closes the observed source-shape gaps in the retained ARM population, not every possible compatibility-policy difference. Specific numeric formats remain a separate decision. There was no fresh Swagger emission, data-plane corpus assessment, full AutoRest validation, emitter unknown-format assessment, or independent migration/release-readiness acceptance.

## NOTES

- Related issue: [Azure/typespec-azure#5971](https://github.com/Azure/typespec-azure/issues/5971). The [issue analysis](https://github.com/Azure/typespec-azure/issues/5971#issuecomment-6647252945) links the Swagger documentation, implementation, and existing TypeSpec checks.
- Flow: `native-first`; singleton task `valid-formats-5971`. Disposition: existing-rule numeric coverage fixes plus documentation; both five-project fix/rerun cycles and the authorized full 487-project ARM comparison completed.
- Native base: canonical `Azure/typespec-azure:main` at `f578e3ad757c9e4ea827e7d20212e7c53c303f43`. Head branch: `feat/valid-formats-5971`; PR target: canonical `main`.
- Latest candidate: `21f7aefe9c4399e4f51b28349ef02d4c64b1c5fc`; first-batch and pre-dictionary candidate: `952472b51b488486c0a41855cc8f3a22208613fe`; original documentation candidate: `1592d198b388e8612001bc4fa3e4f0b57b1663d7`; core: `f87a4e2d51c5cc0b3d995d4c7542578d55799804`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; pilot runtime: Node `v24.20.0`.
- Shared baseline: `swagger-arm-20261026-2cd3c5dd`, identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`. Full archive checksum, sealed identity, inventory and references were verified. Native injection was independently checked against 17 candidate package archives: 3,188 packed files matched installed bytes; the separately packed unused JSON-schema package was not installed or claimed as injected.
- Production Swagger ruleset: `@microsoft.azure/openapi-validator-rulesets@2.2.6`. Replay used the registered production rule and passed nine schema controls in each project. No new Swagger was generated.
- The suppression-disable control verifies the same explicitly suppressed fixture produces 0/0/0 normally and 2/1/1 after directives are disabled. The in-memory host disables all authored-source suppressions, preserves character offsets and line breaks, and checks unchanged on-disk hashes. Package libraries in `node_modules` remain outside the authored-service transformation. The production Swagger function has no suppression predicate; its hash and explicit no-filtering policy are retained in the receipts.
- The three Azure Core checks are enabled in the existing ARM and data-plane presets. Their rule IDs, severity, suppression behavior, and activation are unchanged.
- The native PR changes the numeric rule, its regression tests, a Chronus fix description, and the three related authored rule documentation pages. No dependency, lockfile, generated source, or core-submodule change is committed.
- The original review pause was respected before publication. The user subsequently authorized both five-project batches, the numeric coverage fixes and their reruns. Latest checks passed: Azure Core build; 14 focused tests across three rule files (serial worker, 60-second hook timeout); full repository format and lint. Regression coverage includes all generic numeric array/record values, nested records, mixed array/record combinations, inline query parameters, allowed specific numerics, recursive collections and operation-spread duplicate prevention.
- Setup failures remain in the local logs: an unrelated Python/debugpy TLS prepare failure, an initial pnpm-version mismatch, and stalled online npm TLS requests. Explicit offline installation using cached dependencies succeeded, and the original specs dependency manifests and lockfile were restored.
- **Limits:** the full retained 487-project ARM population was assessed under the latest candidate; both historical pilots retain their separately recorded revisions. All authored-source suppressions were disabled and no Swagger suppression filtering applied. No data-plane corpus coverage, globally projected source/version equivalence, fresh emission, emitter `unknown-format`, full AutoRest validation or migration/release-readiness acceptance is claimed. Unassessed is not zero.
- All three observed reporting shapes (arrays, inline parameters and dictionary values) are covered by the existing rule. Numeric-format compatibility remains a separate policy decision; the 13 extra UUID decorator warnings in the first batch are intentional existing TypeSpec policy, not numeric coverage gaps.

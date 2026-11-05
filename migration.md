# DefaultInEnum migration

## 1. Conclusion and scope

The proposed TypeSpec linter rule `@azure-tools/typespec-azure-core/default-in-enum` addresses [DefaultInEnum](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/default-in-enum.md) for extensible string and numeric enums. **No DefaultInEnum violations were observed on either side across the full frozen ARM population: 487/487 fresh TypeSpec assessments succeeded with zero raw/source findings and zero ambient diagnostics; verified historical Swagger validation also recorded zero findings.** The analyzer completed successfully, including final input/artifact/dataset integrity verification, at `2026-11-05T03:59:05.170Z`. Matching zero findings do not establish equivalence or release readiness.

The compiler owns closed-default assignability; this independently configurable rule fills the extensible-union gap. It reuses the existing helper for eligibility and enumerates declared values without losing nested members that reuse names. Explicit nullable null defaults remain an intentional difference from Swagger enum-array membership.

## 2. Actual coverage

After the initial five-project pilot, the author explicitly authorized full validation. The full-validation candidate `dd233ce884c25ed54074ad6feaa770ee567c4f5e` was assessed across all 487 frozen ARM projects at specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`, with no project filter or limit.

| Full-population observation | Result |
| --- | ---: |
| Successful fresh TypeSpec assessments | 487 / 487 |
| Failed/unassessed projects | 0 |
| TypeSpec raw / source target findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Verified saved Swagger target findings | 0 |
| Saved primary Swagger documents | 649 |
| Verified historical raw/stderr logs | 1,298 |
| Primary enum/default sites | 749: 747 string, 2 numeric |
| Static enum/default membership violations | 0 |

Native execution explicitly enabled the target in `target-only`, source scope, retaining authored source suppressions. The worker's original `success` status is preserved; ordinary project default activation is not assessed by the corpus run. Every project's detailed report and native receipt is linked from the [full-validation index](full-regression/index.md). [Machine summary](full-regression/summary.json) and [coverage](full-regression/coverage.json) record the observations. **Final post-run integrity verification passed; the published [manifest](full-regression/manifest.json) records `complete`.**

All 1,298 historical raw/stderr logs were hash-checked. Every primary document has production-mode validation evidence, active error-severity selection of `DefaultInEnum`, and successful Spectral completion without a target finding. The absent rule-results shard alone was not treated as proof of zero. Swagger results are reused historical executions: no new Swagger generation or Spectral execution occurred. The 749-site static inventory is separate evidence, not fresh Spectral findings or a one-to-one inventory of native properties.

No rule-specific `DefaultInEnum`/`default-in-enum` references were found in tracked specification Markdown, YAML, or authored TypeSpec sources at the frozen revision; see the [suppression search receipt](full-regression/preflight/suppression-search.json). The baseline execution policy records no README suppressions. The authored suppression control is synthetic, not a real suppressed project example; broader exclusions are not inferred absent solely from the text search.

The earlier five-project pilot remains separately retained at candidate `2f052caee34c4ba271e56a3e9754524b6d9216e1`:

| Project | Saved Swagger findings | Fresh TypeSpec raw / source | Static primary Swagger enum/default sites |
| --- | ---: | --- | ---: |
| Advisor | 0 | 0 / 0 | 0 |
| Compute | 0 | 0 / 0 | 0 |
| KeyVault | 0 | 0 / 0 | 1 |
| Network | 0 | 0 / 0 | 10 |
| Storage | 0 | 0 / 0 | 6 |

See the [original pilot index](five-project-pilot/index.md) and its unchanged evidence. The final full run freshly includes those five projects; the pilot is not added to the 487-project denominator.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Reject an undeclared string default | Focused tests and injected invalid-string control passed | The implementation checks all declared values; the injected control emits exactly one target diagnostic. |
| Reject an undeclared numeric default, including zero and negative values | Focused tests and injected invalid-number control passed | Canonical numeric metadata is used where exposed; see the pinned compiler precision limitation below. |
| Accept a declared value, including empty strings and zero | Focused tests and injected compliant control passed | Membership uses values, not truthiness or variant names. Real projects also contain compliant string defaults. |
| Include nested union and enum members | Focused tests and injected collision control passed | Existing `getUnionAsEnum` owns eligibility; value enumeration preserves colliding member names in nested unions/enums. Four new regressions cover this correction. |
| Check operation parameter defaults | Focused test passed | Parameters are compiler model properties. |
| Omitted defaults and non-enum-like types | Focused tests passed | Plain scalar defaults and unions without declared members are outside policy. |
| Invalid defaults on closed enums/literal unions | Compiler-owned; no new closed-invalid pilot control | Existing `relation.isValueOfType` rejects them. Valid closed defaults pass the native fixture. |
| Null defaults | Intentional difference; focused and injected compliant controls passed | Explicit nullable null is accepted natively, unlike strict Swagger enum-array membership. |
| Authored suppression | Injected suppression control passed | Same installed runtime emits zero target findings with the authored suppression. |
| Preset activation | Rulesets suite and actual injected activation controls passed | Library `all` produces the expected target finding; both recommended presets produce none before explicit comparison activation. Corpus default activation remains unassessed. |
| Authored documentation examples | All five snippets passed with expected diagnostics | Incorrect/correct generic and ARM examples plus suppression were compiled using an explicit import/provider wrapper. |

## 4. Why diagnostic counts differ

There are no observed target-rule diagnostic differences in the full 487-project population. Its 749 saved enum/default sites are compliant; no real violating default was observed. Matching zeros therefore do not demonstrate detection completeness. Deliberately violating string/numeric fixtures provide detection evidence; compliant fixtures and the real population provide separate non-regression evidence.

Source analysis identifies boundaries that must be retained during later comparison:

- The Swagger linter reports an error for each selected schema object with an enum array and a default outside it. The TypeSpec linter reports a warning on an authored property or operation parameter.
- Invalid closed-type defaults are compiler errors rather than new linter findings.
- Explicit null defaults are accepted by the proposed TypeSpec rule when the union includes null. This differs from strict enum-array membership and requires explicit review rather than an equivalence claim.
- The TypeSpec rule operates on native enum-like union metadata, not on emitted schemas or `$ref` resolution. Unsupported or heterogeneous unions are not reconstructed to imitate OpenAPI output.
- Neither inactive-preset runs nor compiler-rejected programs may be counted as successful enabled-rule equivalence evidence.
- Native source traversal is not a selected-version emitted projection. Network also imports three compliant defaults from `Network/Common`, outside the selected root's source filter; raw native findings are zero as well. Per-project reports retain exact Swagger paths and source corroboration without equating property-name matches to proven correspondence.

## NOTES

### Request and publication

- Issue: [Azure/typespec-azure#5972](https://github.com/Azure/typespec-azure/issues/5972), `DefaultInEnum`. Issue #5971, `ValidFormats`, is not part of this task and its existing work was not modified.
- Flow: `native-first`, following the requested skill from `feature/lintdiff-migration-new`, with the user's explicit early-review override.
- Initial canonical base: `Azure/typespec-azure:main`, frozen at `f578e3ad757c9e4ea827e7d20212e7c53c303f43`.
- Native head: `Azure/typespec-azure:feat/default-in-enum-5972`; the PR targets `main`.
- Implementation PR: [Azure/typespec-azure#5973](https://github.com/Azure/typespec-azure/pull/5973). Initial review head was `5d8b20e69bf9e37d49bd3ff50db6a09125992be1`; pilot candidate was `2f052caee34c4ba271e56a3e9754524b6d9216e1`; full-population candidate is `dd233ce884c25ed54074ad6feaa770ee567c4f5e`.
- Post-validation main sync: merge commit `b3593dfdb8fc2147a7183bf42dea12c9a24381ae` merges `main` at `3e96b05ca`, preserving both DefaultInEnum and incoming private-endpoint opt-in regressions in the shared rulesets test. Focused DefaultInEnum tests passed 21/21, rulesets tests passed 15/15, ARM/rulesets builds passed, and affected formatting/lint passed. The sealed 487-project corpus run remains pinned to `dd233ce884c25ed54074ad6feaa770ee567c4f5e`; it was not rerun on this merge.
- Evidence head: `MaryGao/typespec-azure-paging:migration-evidence/default-in-enum-5972`. This is a separate verified personal fork of the canonical repository.
- Status: all full-population native workers and final analyzer integrity verification completed successfully. Independent local source review accepted the corrected implementation and reviewed the qualified evidence claims. No GitHub development/release review loops or integration labels were run/added; no release acceptance is claimed.
- Initial implementation and main-sync commits used `[skip ci]` during early review. Subsequent CI-only commit `7bff59d96fa8aadf64f67117b9c18ad36dc2f966` has no skip directive and started the normal GitHub Actions workflows; their results are being monitored. Required CI acceptance is not inferred from local results.

### Source-of-truth intake

- Swagger source snapshot: `Azure/azure-openapi-validator@e1b8b207a196cf2fc288593efec22e6e38ab98d5`.
- [Implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/default-in-enum.ts).
- [Tests](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/test/default-in-enum.test.ts).
- [Registration](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-common.ts): common ruleset, error severity, OpenAPI 2, unresolved selection `$..[?(@object() && @.enum)]`. Documentation specifies ARM and data-plane applicability. There is no rule-specific option or RPaaS-only selector.
- The implementation ignores missing defaults and non-array enum values, then uses JavaScript `includes` for membership. Its expression `!defaultValue === null` does not exclude null; a present null default is still membership-checked.
- TypeSpec package ownership: Azure Core, because the policy applies to both ARM and data-plane and needs only compiler metadata.
- Existing coverage: compiler assignability handles closed enums and closed literal unions. `no-enum` and `no-closed-literal-union` provide authoring guidance, but neither checks defaults against known values in an extensible enum.
- [Pinned compiler default checking](https://github.com/microsoft/typespec/blob/f87a4e2d51c5cc0b3d995d4c7542578d55799804/packages/compiler/src/core/checker.ts#L7039-L7058).
- [Existing compiler property-default tests](https://github.com/microsoft/typespec/blob/f87a4e2d51c5cc0b3d995d4c7542578d55799804/packages/compiler/test/checker/model.test.ts#L65-L184).
- [Existing native union-enum helper](https://github.com/Azure/typespec-azure/blob/f578e3ad757c9e4ea827e7d20212e7c53c303f43/packages/typespec-azure-core/src/helpers/union-enums.ts).

### Contract and authored regressions

The public ID is `@azure-tools/typespec-azure-core/default-in-enum`, warning severity, with no options. It inspects model properties with defaults whose types are recognized extensible string or numeric enums. It reports one warning per visited violating property. It does not infer HTTP reachability or parse emitted OpenAPI, source text, or references.

The [canonical behavior suite](https://github.com/Azure/typespec-azure/blob/dd233ce884c25ed54074ad6feaa770ee567c4f5e/packages/typespec-azure-core/test/rules/default-in-enum.test.ts) now has 21 passing cases, including four added member-name collision regressions. It covers violating/compliant strings and numbers; empty strings and zero; signed and fractional values; variant labels versus values; nested unions and string/numeric enums; exposed large numeric metadata; operation parameters; omitted defaults; valid closed types; scalar defaults; and nullable null. The complete Core suite passed 513 tests with two skips (not passing evidence).

The [rulesets suite](https://github.com/Azure/typespec-azure/blob/dd233ce884c25ed54074ad6feaa770ee567c4f5e/packages/typespec-azure-rulesets/test/validate-rules-defined.test.ts) passed 14/14 cases, including explicit nonactivation in both recommended presets.

The authored rule documentation includes generic examples, a standard `ArmResourceRead` incorrect/correct pair, impact, suppression guidance, and migration provenance. All five actual snippets compiled with expected diagnostics. Core/rulesets documentation generation passed; the generated Core README and linter reference are committed, not hand-edited.

### Runtime and retained evidence

The candidate's compiler gitlink is `f87a4e2d51c5cc0b3d995d4c7542578d55799804`. A compatible closure was built and packed: six Azure libraries and nine compiler/core libraries. Every one of 2,867 packed files matched installed bytes across all 15 archives. All non-manifest packed payloads also matched the final source/build checkout, including licenses inherited from workspace roots. pnpm-rewritten package manifests are excluded only from that latter source comparison. See [final runtime identities](full-regression/preflight/runtime-identity.json), [source/payload verification](full-regression/preflight/source-payload.json), and per-worker resolved entrypoints.

The shared Swagger baseline is `swagger-arm-20261026-2cd3c5dd`, metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`, content identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`. The supported full analyzer verified/copied the complete 93,496-file inventory before native execution and passed final post-run input/artifact/dataset integrity verification. Tooling is recovered at immutable commit `52eeec48b136f97addc10d90dcba4457a04f83a7`, with analyzer/worker/dataset source hashes matching the retained snapshot.

Node was 26.5.0; candidate/core pnpm 11.10.0; specs pnpm 12.6.0; installation used `https://packagefeedproxy.microsoft.io/npm/`. Complete Core/rulesets suites and builds, root engineering type-check, root/type-aware lint, root format check, Chronus verification, and documentation generation passed. Thirteen final rule/documentation/activation controls passed. The portable injected suite passed 37 applicable tests; six fixtures requiring an unrelated absent migration rule were explicitly non-applicable, not passes.

The [full report and receipts](full-regression/index.md) retain detailed reports for all 487 projects, historical log hashes/excerpts and every primary schema site, final controls, exact inputs, runtime hashes, and saved build/root-check/pack/install/portable-control logs. Full-suite command-agent stdout was not saved; actual exit codes/counts remain in its transcript and the check receipt. Complete historical raw logs and the full copied baseline dataset remain local/in the sealed baseline and are omitted from the compact published subset.

Local requested reports are at `C:\Users\marygao\project\coverage-reports\default-in-enum`; the complete run is under `full-regression\index.md`, alongside the original five-project pilot.

### Failures and recovery

The first numeric test attempted to distinguish known `9007199254740993` from nonmember `9007199254740992`. It failed because the pinned compiler interns numeric literal types using a JavaScript-number key ([checker.ts](https://github.com/microsoft/typespec/blob/f87a4e2d51c5cc0b3d995d4c7542578d55799804/packages/compiler/src/core/checker.ts#L8648-L8686)), merging those values before linting. The corrected regression uses distinguishable nonmember `9007199254740994` and retains the valid large-number case. This is a test correction, not a production-rule workaround or a guarantee of universal arbitrary-precision distinction.

The first injected control worker succeeded with one expected diagnostic, but the session runner misread worker status `success` as requiring `assessed`. It stopped before real projects. The harness classification was corrected, original evidence retained, and all four controls passed before the five real runs. A historical-log verification assertion also initially assumed one document per execution; Compute legitimately validates a common-types dependency too. The verifier now requires actual selected-document validation and successful completion without imposing that false cardinality.

The original compiler submodule initialization failed on Windows long paths. After enabling local long-path support, the partial checkout was preserved in an ignored evidence-artifact directory and the submodule was initialized normally at its pin. No reset, force checkout, or destructive cleanup was used; no submodule change is part of the PR.

The full-validation source review identified name-key collisions in `flattenedMembers` that could discard valid nested values. The final rule retains helper eligibility but enumerates all declared values. Four new regressions cover nested/local, two nested-union, two included-enum, and numeric collisions. An initial misplaced generator caused test/build errors; it was moved to module scope before the clean final commit. Independent review accepted both fixes.

Missing declared validation prerequisites (bundle-uploader, feeds/compiler links, and Vite types) were restored without manifest changes, after which engineering type-check and root lint passed. Locally CRLF-formatted Chronus files were normalized to the repository's existing LF policy and verification passed. Tooling dependencies were restored after a missing-vitest failure. Initial helper license-resolution errors were retained and corrected by verifying inherited root-license bytes rather than excluding them.

### Outstanding gates

Fresh-checkout portable recovery verification, required live GitHub CI, and independent GitHub development/release-readiness review checkpoints remain outstanding. Final analyzer integrity sealing, local source review, and the checks listed above have completed; no monorepo-wide test suite or data-plane corpus was claimed. No Swagger regeneration occurred. The PR is based on and targets `main`; matching zero findings do not establish equivalence or release readiness.

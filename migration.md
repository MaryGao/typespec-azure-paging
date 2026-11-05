# DefaultInEnum migration

## 1. Conclusion and scope

The proposed TypeSpec linter rule `@azure-tools/typespec-azure-core/default-in-enum` addresses [DefaultInEnum](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/default-in-enum.md) for extensible string and numeric enums. **The authorized five-project ARM pilot completed: 5/5 native assessments, zero target findings, four passing injected controls, and zero target findings in verified saved production Swagger logs. Equivalence and release readiness are not established.** The compiler owns closed-default assignability; this independently configurable rule fills the extensible-union gap using the existing helper. Explicit nullable null defaults remain an intentional difference from Swagger enum-array membership.

## 2. Actual coverage

The author first requested a PR before validation, then explicitly authorized five real projects. The sample is Advisor, Compute, KeyVault, Network, and Storage at frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. This is not a statistical sample, full regression, or data-plane coverage.

| Project | Saved Swagger findings | Fresh TypeSpec raw / source | Static primary Swagger enum/default sites |
| --- | ---: | --- | ---: |
| Advisor | 0 | 0 / 0 | 0 |
| Compute | 0 | 0 / 0 | 0 |
| KeyVault | 0 | 0 / 0 | 1 |
| Network | 0 | 0 / 0 | 10 |
| Storage | 0 | 0 / 0 | 6 |

All five workers exited successfully without ambient diagnostics. Native execution used explicit target activation, `target-only`, source scope, and retained source suppressions; default activation was not assessed. The worker's original `success` status is preserved separately from the report's `assessed` classification.

All 46 selected historical raw/stderr files were checked against the sealed baseline inventory. Each JSONL log shows production mode, active error-severity selection of `DefaultInEnum`, actual selected-document validation, and successful Spectral return, with no target finding. The absent rule-results shard alone was not treated as proof of zero. No fresh Swagger generation or Spectral execution occurred. The separate static inventory covers 17 compliant string sites in 23 primary Swagger documents; historical executions also validate dependencies.

See the [detailed index](five-project-pilot/index.md), [exact selection](five-project-pilot/selection.json), [native execution receipt](five-project-pilot/evidence/execution.json), [historical verification](five-project-pilot/evidence/historical-validation.json), and five linked per-project reports.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Reject an undeclared string default | Focused tests and injected invalid-string control passed | The implementation compares against flattened declared values; the injected control emits exactly one target diagnostic. |
| Reject an undeclared numeric default, including zero and negative values | Focused tests and injected invalid-number control passed | Canonical numeric metadata is used where exposed; see the pinned compiler precision limitation below. |
| Accept a declared value, including empty strings and zero | Focused tests and injected compliant control passed | Membership uses values, not truthiness or variant names. Real projects also contain compliant string defaults. |
| Include nested union and enum members | Focused tests passed | Existing `getUnionAsEnum` owns flattening; string and numeric enum inclusion is covered. |
| Check operation parameter defaults | Focused test passed | Parameters are compiler model properties. |
| Omitted defaults and non-enum-like types | Focused tests passed | Plain scalar defaults and unions without declared members are outside policy. |
| Invalid defaults on closed enums/literal unions | Compiler-owned; no new closed-invalid pilot control | Existing `relation.isValueOfType` rejects them. Valid closed defaults pass the native fixture. |
| Null defaults | Intentional difference; focused and injected compliant controls passed | Explicit nullable null is accepted natively, unlike strict Swagger enum-array membership. |
| Authored suppression | Injected suppression control passed | Same installed runtime emits zero target findings with the authored suppression. |
| Preset activation | Rulesets suite passed; production activation unassessed | Both central presets explicitly disable the rule. Library `all` execution was not separately exercised. |

## 4. Why diagnostic counts differ

There are no observed target-rule diagnostic differences in the five projects. Matching zeros do not demonstrate detection completeness: Advisor and Compute have no primary enum/default sites; the other three contain only compliant string sites. Violating and numeric behavior is established by focused tests and injected controls, not by these real-project counts.

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
- Canonical base: `Azure/typespec-azure:main`, frozen at `f578e3ad757c9e4ea827e7d20212e7c53c303f43`.
- Native head: `Azure/typespec-azure:feat/default-in-enum-5972`; the PR targets `main`.
- Implementation PR: [Azure/typespec-azure#5973](https://github.com/Azure/typespec-azure/pull/5973), still draft. Initial review head was `5d8b20e69bf9e37d49bd3ff50db6a09125992be1`; tested candidate is `2f052caee34c4ba271e56a3e9754524b6d9216e1`.
- Evidence head: `MaryGao/typespec-azure-paging:migration-evidence/default-in-enum-5972`. This is a separate verified personal fork of the canonical repository.
- Status: five-project validation completed after explicit authorization; not development-accepted or release-ready. No full-population analysis, independent review loops, or integration labels were run/added.
- Commit messages include `[skip ci]` to request that GitHub Actions defer push/PR validation during this initial review. Required checks remain outstanding.

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

The [canonical behavior suite](https://github.com/Azure/typespec-azure/blob/2f052caee34c4ba271e56a3e9754524b6d9216e1/packages/typespec-azure-core/test/rules/default-in-enum.test.ts) passed 17/17 cases. It covers violating/compliant strings and numbers; empty strings and zero; signed and fractional values; variant labels versus values; nested unions and string/numeric enums; exposed large numeric metadata; operation parameters; omitted defaults; valid closed types; scalar defaults; and nullable null.

The [rulesets suite](https://github.com/Azure/typespec-azure/blob/2f052caee34c4ba271e56a3e9754524b6d9216e1/packages/typespec-azure-rulesets/test/validate-rules-defined.test.ts) passed 14/14 cases, including explicit nonactivation in both recommended presets.

The authored rule documentation includes generic type examples, a standard `ArmResourceRead` incorrect/correct pair, impact, suppression guidance, and migration provenance. Example compilation and generated references are deferred; generated files were not hand-edited.

### Runtime and retained evidence

The candidate's compiler gitlink is `f87a4e2d51c5cc0b3d995d4c7542578d55799804`. A compatible closure was built and packed: six Azure libraries and nine compiler/core libraries. Injection into an isolated frozen specs worktree completed successfully. Every one of 2,867 packed files matched installed bytes across all 15 archives, with zero mismatches; [runtime identities and archive hashes](five-project-pilot/evidence/runtime-identity.json) and per-worker resolved entrypoints are retained.

The shared Swagger baseline is `swagger-arm-20261026-2cd3c5dd`, metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`, content identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`. This pilot verified its identity and selected inputs/logs, not its entire full-population inventory.

Node was 26.5.0; candidate/core pnpm 11.10.0; specs pnpm 12.6.0; installation used `https://packagefeedproxy.microsoft.io/npm/`. Compatible closure builds, rule rebuild, scoped formatting, and affected-package scoped lint completed. Build, pack, install, focused-test logs, worker, orchestration helpers, control sources/configuration, raw native receipts, and historical log hashes/line-numbered excerpts are retained under [five-project-pilot](five-project-pilot/index.md). Complete historical logs remain locally and in the sealed baseline; they are omitted from this compact published subset.

Local requested reports are at `C:\Users\marygao\project\coverage-reports\default-in-enum`, including `index.md` and one detailed report per project.

### Failures and recovery

The first numeric test attempted to distinguish known `9007199254740993` from nonmember `9007199254740992`. It failed because the pinned compiler interns numeric literal types using a JavaScript-number key ([checker.ts](https://github.com/microsoft/typespec/blob/f87a4e2d51c5cc0b3d995d4c7542578d55799804/packages/compiler/src/core/checker.ts#L8648-L8686)), merging those values before linting. The corrected regression uses distinguishable nonmember `9007199254740994` and retains the valid large-number case. This is a test correction, not a production-rule workaround or a guarantee of universal arbitrary-precision distinction.

The first injected control worker succeeded with one expected diagnostic, but the session runner misread worker status `success` as requiring `assessed`. It stopped before real projects. The harness classification was corrected, original evidence retained, and all four controls passed before the five real runs. A historical-log verification assertion also initially assumed one document per execution; Compute legitimately validates a common-types dependency too. The verifier now requires actual selected-document validation and successful completion without imposing that false cardinality.

The original compiler submodule initialization failed on Windows long paths. After enabling local long-path support, the partial checkout was preserved in an ignored evidence-artifact directory and the submodule was initialized normally at its pin. No reset, force checkout, or destructive cleanup was used; no submodule change is part of the PR.

### Outstanding gates

Full affected-package suites, root/type-aware lint and required CI/Chronus checks, separate library `all` activation execution, actual documentation-snippet compilation and generated references, full frozen-population coverage, recovery verification, and independent semantic/release-readiness reviews remain outstanding. No full corpus or Swagger regeneration was authorized or executed. The PR remains a draft.

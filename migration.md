# DefaultInEnum migration

## 1. Conclusion and scope

The proposed TypeSpec linter rule `@azure-tools/typespec-azure-core/default-in-enum` addresses [DefaultInEnum](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/default-in-enum.md) for extensible string and numeric enums. **Equivalence remains undetermined: validation and independent reviews are intentionally paused for the author's initial PR review.** The compiler already checks default assignability for closed enums and literal unions. The proposed rule fills the extensible-union gap without repeating compiler errors. It intentionally accepts an explicit nullable union's null default, unlike the Swagger linter's enum-array membership predicate.

## 2. Actual coverage

No project population has been evaluated for this candidate. No fixture, package, example, integration, or coverage commands have been run.

| Count | Swagger linter | TypeSpec linter |
| --- | --- | --- |
| Raw individual diagnostics | Unassessed | Unassessed |

These are not zero-finding results. Runtime behavior and diagnostic correspondence remain unassessed; see [Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Reject an undeclared string default | Proposed; unassessed | The [implementation](https://github.com/Azure/typespec-azure/blob/feat/default-in-enum-5972/packages/typespec-azure-core/src/rules/default-in-enum.ts) compares a property default against the existing helper's flattened enum values. |
| Reject an undeclared numeric default, including zero and negative values | Proposed; unassessed | Numeric defaults are compared with exact numeric literal metadata rather than rounded JavaScript numbers. |
| Accept a declared value, including empty strings and zero | Proposed; unassessed | Membership uses values, not truthiness or variant names. |
| Include nested union and enum members | Proposed; unassessed | The existing `getUnionAsEnum` helper owns discovery and flattening. No new union traversal is introduced. |
| Check operation parameter defaults | Proposed; unassessed | Parameters are model properties in the compiler's semantic graph. |
| Omitted defaults and properties without enum-like types | Proposed; unassessed | No default is required; ordinary scalar defaults and unions without declared enum values are outside the policy. |
| Invalid defaults on closed enums and closed literal unions | Compiler-prevented in source analysis; candidate execution unassessed | The pinned compiler checks property defaults with `relation.isValueOfType`; its existing tests include a default outside a closed literal union. |
| Null defaults | Intentional policy difference; unassessed | An explicitly nullable union may default to null. The Swagger linter checks membership in the enum array regardless of nullability. |
| Preset activation | Proposed; unassessed | Registration is additive. Both central Azure presets explicitly disable the new rule; the library's automatic `all` membership is unchanged. |

## 4. Why diagnostic counts differ

No candidate diagnostics have been collected, so no observed count differences or matching-count claims are available.

Source analysis identifies boundaries that must be retained during later comparison:

- The Swagger linter reports an error for each selected schema object with an enum array and a default outside it. The TypeSpec linter reports a warning on an authored property or operation parameter.
- Invalid closed-type defaults are compiler errors rather than new linter findings.
- Explicit null defaults are accepted by the proposed TypeSpec rule when the union includes null. This differs from strict enum-array membership and requires explicit review rather than an equivalence claim.
- The TypeSpec rule operates on native enum-like union metadata, not on emitted schemas or `$ref` resolution. Unsupported or heterogeneous unions are not reconstructed to imitate OpenAPI output.
- Neither inactive-preset runs nor compiler-rejected programs may be counted as successful enabled-rule equivalence evidence.

## NOTES

### Request and publication

- Issue: [Azure/typespec-azure#5972](https://github.com/Azure/typespec-azure/issues/5972), `DefaultInEnum`. Issue #5971, `ValidFormats`, is not part of this task and its existing work was not modified.
- Flow: `native-first`, following the requested skill from `feature/lintdiff-migration-new`, with the user's explicit early-review override.
- Canonical base: `Azure/typespec-azure:main`, frozen at `f578e3ad757c9e4ea827e7d20212e7c53c303f43`.
- Native head: `Azure/typespec-azure:feat/default-in-enum-5972`; the PR targets `main`.
- Evidence head: `MaryGao/typespec-azure-paging:migration-evidence/default-in-enum-5972`. This is a separate verified personal fork of the canonical repository.
- Status: draft for initial human review, not development-accepted or release-ready. No validation, automated review loops, integration labels, or full-population analysis were requested or executed.
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

The [canonical behavior suite](https://github.com/Azure/typespec-azure/blob/feat/default-in-enum-5972/packages/typespec-azure-core/test/rules/default-in-enum.test.ts) is authored but not executed. It contains violating/compliant controls for string and numeric defaults; empty strings and zero; signed and fractional numbers; variant labels versus values; nested unions and string/numeric enum inclusion; large numeric precision; operation parameters; missing defaults; closed types; ordinary scalar defaults; and nullable null defaults.

The [rulesets suite](https://github.com/Azure/typespec-azure/blob/feat/default-in-enum-5972/packages/typespec-azure-rulesets/test/validate-rules-defined.test.ts) has an unexecuted regression asserting the new rule remains disabled in both recommended presets.

The authored rule documentation includes generic type examples, a standard `ArmResourceRead` incorrect/correct pair, impact, suppression guidance, and migration provenance. Example compilation and generated references are deferred; generated files were not hand-edited.

### Deferred gates

All required gates remain pending until the author approves validation:

- Resolve local dependency/setup readiness, then build the affected package closure using the repository-pinned tools.
- Run the focused behavior suite, affected package tests/build/lint, and central rulesets tests/build.
- Verify library `all` activation separately from recommended-preset nonactivation.
- Compile the actual documentation snippets and regenerate rule references and the package rule listing.
- Run repository formatting/lint, Chronus checks, and required integration checks.
- Complete independent semantic and release-readiness reviews and their separate GitHub checkpoints.
- Discover and pin the shared Swagger baseline before specs setup, then perform artifact controls, full frozen-population native coverage, bidirectional gap investigation, and recovery verification. No Swagger baseline was regenerated, and no specs runtime or coverage artifact was provisioned during this paused phase.

The first attempt to initialize the native checkout's compiler submodule encountered Windows long-path checkout failures. Enabling long-path support locally did not complete that partial checkout because Git then reported files that would be overwritten. No reset, force checkout, or cleanup was used. The pinned compiler source was inspected through immutable Git objects; the partial compiler checkout and dependency readiness must be resolved before validation. The submodule change is not part of the PR.

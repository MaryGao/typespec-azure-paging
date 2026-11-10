# GET and DELETE request-body migration

## 1. Conclusion and scope

**Full validation completed: all 590 source programs compiled successfully (487 ARM, 103 data plane); 585 Swagger comparisons were assessed. Nine real DELETE-body wire violations were detected on both sides: six Purview DataMap and three Machine Learning RunHistory. Ten Search ARM client-only warnings and six additional Purview client-alias warnings remain visible. Five data-plane configurations lack owned OAS2 comparisons and are explicitly unassessed.**

The user explicitly authorized full validation despite the pilot gaps on November 10, 2026. [Full reports, structured results and replay evidence](validation/full-20261110-a9c4d8a/index.md) supersede the pilot-only status below. PR #5986 was merged at `b13279f628a267cc793af82a38ba4dbbafbc7d3e`; validation remains pinned to the approved head `a9c4d8a1db1bad607cd21d856421c6b1b712d746`. No production rule, specification or suppression was changed during validation.

The TypeSpec linter rule is `@azure-tools/typespec-azure-core/no-request-body`. At the user's request, it replaces the unmerged ARM-only GET implementation in [PR #5986](https://github.com/Azure/typespec-azure/pull/5986), rather than introducing a second PR or dependent branch. The PR continues to target canonical `main`.

The grouped Swagger linter policies are:

- [GetMustNotHaveRequestBody](members/GetMustNotHaveRequestBody/migration.md), issue [#5983](https://github.com/Azure/typespec-azure/issues/5983), ARM GET.
- [DeleteMustNotHaveRequestBody](members/DeleteMustNotHaveRequestBody/migration.md), issue [#5982](https://github.com/Azure/typespec-azure/issues/5982), ARM DELETE.
- [RequestBodyNotAllowed](members/RequestBodyNotAllowed/migration.md), data-plane GET and DELETE.

These policies have one coherent native responsibility: GET and DELETE operations must not carry a request body. They share one enablement and suppression control, with no verb-specific configuration. The user explicitly approved this consolidation and updating the existing PR on November 9, 2026.

Implementation source: [`6c6b3fd4d70dc70fd5c3693e45d9c84e3eeb4999`](https://github.com/Azure/typespec-azure/commit/6c6b3fd4d70dc70fd5c3693e45d9c84e3eeb4999). The documentation-only follow-up applies [review feedback](https://github.com/Azure/typespec-azure/pull/5986#discussion_r4481070153) without changing rule logic or activation. The existing PR head before consolidation was `8e7e450110e02da67c61609ac130f586d2a12846`; its prior commits and merge from canonical `main` are retained. The compiler gitlink remains `837b5a769414f853fd22eeed0a123c953425b1d8`.

The implementation uses resolved HTTP metadata, emits one warning per offending concrete operation, and does not depend on an emitter or SDK metadata. Absent and `void` bodies are allowed. Other HTTP verbs are unchanged. The existing released `rpc-operation-request-body` implementation and preset enablement remain unchanged; enabling both rules can produce overlapping warnings.

The Core library's compiler-provided `all` set includes the new rule. Both central `data-plane` and `resource-manager` presets explicitly leave it disabled.

## 2. Actual coverage

| Measurement for this revision | Swagger linter                                                                               | TypeSpec linter                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Assessed real-spec projects   | All 487 saved ARM production runs; 98 separate data-plane selected-rule Spectral comparisons | All 590 configured source programs compiled                                                      |
| Real-spec findings            | ARM: zero; data plane: nine DELETE-body observations                                         | ARM: ten Search warnings; data plane: 15 warnings (nine service operations, six Purview aliases) |
| Full-population equivalence   | Undetermined: five unsupported comparisons and profile/version limitations                   | Undetermined: source-scope and alias multiplicity differences retained                           |
| Focused development checks    | Source implementation inspected; no new Swagger execution                                    | 62 tests passed in four focused files                                                            |

**Assessed coverage:** focused TypeSpec evidence establishes the shared GET/DELETE predicate across explicit, implicit, optional, empty-model, primitive, body-root, and multipart request bodies, including RPC-derived and standard ARM operations. Bodyless and non-target-verb controls pass. The four shortened documentation excerpts compile with test-only imports and `Widget` declarations, producing exactly `2 / 2 / 0 / 0` target warnings and no ambient diagnostics. The two incorrect categories precede the two correct categories. This is local behavior and activation evidence, not measured Swagger/TypeSpec real-spec parity.

The user first authorized representative validation, followed by full validation without another approval **only if there are no gaps**, then explicitly overrode that condition with "go full validation." The [historical five-project reports](validation/20261109-a9c4d8a/index.md) use the same candidate and frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Advisor ARM, Compute ARM, Key Vault Keys data plane, and Search data plane have zero target findings. Search ARM has ten native-only warnings. All five compile without ambient diagnostics.

The complete ARM analyzer finalized successfully with all 487 projects assessable and every preserved baseline input checked. Data-plane discovery includes eight executable preset projects outside conventional data-plane folders, independently found in the complete frozen Git tree. All 103 source programs compile; 98 have selected latest-version OAS2 comparisons. Foundry is OAS3-only; four Key Vault Administration SDK-child configurations have no owned standalone OAS2. These five are not counted as clean comparisons. All 2,364 retained data-plane Swagger/reference files passed post-run SHA256 verification. All 15 candidate package payloads match source/build and the installed runtime after execution; 37 applicable portable controls passed, with six unrelated unregistered-rule fixtures explicitly excluded before execution.

ARM comparisons reuse the immutable shared Swagger baseline with verified selected source/Swagger/production-log inputs; fresh selected-rule Spectral execution corroborates the saved zero observations. Data-plane comparisons use a separately documented selected-rule Spectral profile over frozen checked-in OAS2, not the ARM-only official analyzer, a saved data-plane baseline, or full production AutoRest execution. This pilot is not a filtered full-population analyzer run or a version-aligned equivalence claim.

All 15 candidate artifacts match their source/build and installed runtime. Injected native activation/GET/DELETE/compliance/suppression controls and production Spectral selector controls pass. [Runtime archives and checksums](validation/20261109-a9c4d8a/evidence/runtime-asset.json) are retained for replay. Prior [ARM-only GET coverage](../get-must-not-have-request-body-5983/migration.md) remains historical and is not substituted for this run.

### Gap analysis and decision

Existing TypeSpec `rpc-operation-request-body` covers only operations derived from `Azure.Core.RpcOperation`; ordinary GET/DELETE operations and ARM templates require the broader rule. Keeping separate unmerged ARM GET/DELETE implementations would duplicate that cross-service policy. The chosen Core rule closes the native predicate gap without changing the released RPC rule's behavior.

Source-only client customizations remain included, as in the original PR. The known source-versus-emitted-service boundary is tracked in [#5993](https://github.com/Azure/typespec-azure/issues/5993), not silently resolved by this consolidation. The [current semantic investigation](validation/20261109-a9c4d8a/evidence/search-arm/gap-investigation.json) maps every native warning through actual Go/C#/JavaScript SDK override identities to an original service operation and exact saved Swagger verb/path. Original service metadata and reference-resolved Swagger parameters are bodyless in all ten cases. These are explained scope differences, not ten demonstrated on-wire bodies; raw findings are preserved. No production change, suppression, count normalization, real-spec equivalence, or release-readiness conclusion is claimed.

## 3. Function-level coverage

| Behavior                                                                                       | Result                                         | Evidence and limits                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Select GET and DELETE by HTTP verb                                                             | Verified locally                               | Both verbs exercise the same canonical suite; inferred-verb and other-verb controls pass.                                                                                                                                                                    |
| Reject explicit, optional, empty-model, primitive, body-root, implicit, and multipart payloads | Verified locally                               | Both GET and DELETE cases report one warning at the authored operation.                                                                                                                                                                                      |
| Allow no payload, `void`, metadata-only, ignored, and non-request-visible parameters           | Verified locally                               | Canonical compliant controls pass for both verbs.                                                                                                                                                                                                            |
| Handle generic template customization without duplicate reports                                | Verified locally                               | Concrete operations derived from a generic template report once.                                                                                                                                                                                             |
| Cover RPC-derived operations                                                                   | Verified locally                               | New rule reports both verbs; the unchanged existing RPC suite also passes.                                                                                                                                                                                   |
| Cover ARM templates                                                                            | Verified locally                               | `ArmResourceRead`, `ArmResourceDeleteSync`, and `ArmResourceDeleteWithoutOkAsync` with additional body parameters report; bodyless read/delete templates pass.                                                                                               |
| Register through the published package surface                                                 | Verified locally                               | ARM integration obtains the rule from Core's public `$linter`; actual compiler library-all activation produces two target warnings.                                                                                                                          |
| Preserve central preset defaults                                                               | Verified locally                               | Both central presets produce zero new-rule warnings; existing RPC enablement is preserved. Preset controls have 12 unrelated warnings each, not a clean-preset claim.                                                                                        |
| Exclude client-only helpers or evaluate selected-version emission                              | Not implemented                                | Preserves prior source-operation policy; #5993 remains open.                                                                                                                                                                                                 |
| Correspond to real Swagger findings                                                            | Full population assessed; limitations retained | Nine actual DELETE-body service operations match exact Swagger body findings. Search adds ten client-only scope warnings; Purview adds six aliases of its six actual violations. Five comparisons remain unassessed; whole-rule equivalence is undetermined. |

Canonical behavior suite: [`no-request-body.test.ts`](https://github.com/Azure/typespec-azure/blob/6c6b3fd4d70dc70fd5c3693e45d9c84e3eeb4999/packages/typespec-azure-core/test/rules/no-request-body.test.ts). ARM template integration remains in the ARM package to avoid a Core-to-ARM dependency.

The documentation now uses one standard Incorrect/Correct heading pair with data-plane and ARM subcategories. Excerpts omit imports, provider declarations, and resource scaffolding; ARM examples retain `ReadParameters`, `DeleteParameters`, their body members, and the template customization that creates the violation. This presentation-only change does not invalidate the unchanged rule's behavior checks.

## 4. Why diagnostic counts differ

The full ARM population has zero Swagger target observations and ten native Search warnings: six GET and four DELETE. Data plane has nine Swagger DELETE observations and 15 native DELETE warnings. Raw per-project native excess is ten ARM plus six data-plane warnings; Swagger excess is zero in both audiences. No opposing gaps are cancelled, no ARM/data-plane policies are double-counted, and no global actionable-defect normalization is asserted. Relative differences against zero Swagger counts are undefined.

Purview has six actual body-bearing DELETE service operations, each also declared as a client alias. Compiler `sourceOperation` object identity, declared HTTP service membership, exact resolved verb/path and each frozen Swagger body parameter prove that its 12 native warnings describe six service violations plus six aliases. RunHistory has three actual DELETE-body service operations with exact one-to-one Swagger correspondences, established semantically rather than from equal counts alone. [Purview correspondence](validation/full-20261110-a9c4d8a/evidence/purview-gap-investigation.json), [RunHistory correspondence](validation/full-20261110-a9c4d8a/evidence/run-history-positive-investigation.json). The earlier interim status mentioning Purview alone was not a final corpus total.

The Search warnings arise because HTTP metadata interprets SDK customization request-options wrappers as implicit bodies outside the declared service. Every corresponding real service operation is bodyless. The six GET cases preserve the prior scope difference; consolidation additionally exposes four DELETE cases. The native source scope and selected-version Swagger population remain different.

The documentation follow-up only reorders and shortens excerpts. Their local warning sequence changes from `2 / 0 / 2 / 0` to `2 / 2 / 0 / 0` because examples are grouped by incorrect/correct outcome, not because diagnostic behavior changed.

The Swagger linter ARM rules report errors per selected body parameter; data-plane `RequestBodyNotAllowed` reports warnings. The TypeSpec linter reports one warning per operation with a resolved non-void request body. Severity, diagnostic identity, suppression syntax, and target locations therefore differ even when the underlying policy agrees.

The DELETE Swagger selector only traverses `paths`; the GET ARM selector also traverses `x-ms-paths`. The data-plane selector traverses GET/DELETE parameters under `paths`. Path-item-level parameters are not selected by these operation-level selectors. Native HTTP resolution does not copy these representation-specific blind spots. Invalid source shapes, version differences, unsupported emissions, and compilation failures must not be counted as assessed clean projects.

Source-only customization operations and both new/legacy RPC warnings must remain visible and attributed. Later comparisons must align audience, API versions, suppressions, and actual evaluated operations, and must not double-count the ARM policies alongside the data-plane policy as if they were independent findings on the same population.

## NOTES

### Development evidence

- Final focused run: **62 passed in four files**; [saved output](checks/focused-tests.log).
- Affected dependency-closure build: **21 tasks passed**.
- Core, ARM, and rulesets package suites: **1,397 passed, two skipped, one unrelated 10-second timeout** in ARM common-types registration. An isolated rerun of that file passed all 19 tests. The initial combined run is not described as an entirely green run.
- Affected-package type-aware lint passed. Repository `pnpm lint` passed after restoring the missing playground dependencies with the existing frozen lockfile. Neither the lockfile nor compiler gitlink changed.
- Repository `pnpm format` and `pnpm format:check` passed.
- Core and ARM documentation regeneration completed, with pre-existing missing-documentation warnings for unrelated APIs/diagnostics.
- [Example/activation results](checks/examples-and-activation.json) and [reproduction script](checks/check-examples.mjs) retain the eight local compilation checks, refreshed for the shortened excerpts. Imports and the assumed `Widget` definitions exist only in the verification script, not a shared setup block in the documentation. Invoke the script with the worktree root and an output JSON path using the repository's mise-managed Node.
- Independent read-only semantic review of the complete consolidation found no significant issues.

Representative commands:

```powershell
mise exec -- pnpm exec vitest run --config vitest.config.fast.ts packages\typespec-azure-core\test\rules\no-request-body.test.ts packages\typespec-azure-core\test\rules\rpc-operation-request-body.test.ts packages\typespec-azure-resource-manager\test\rules\no-request-body.test.ts packages\typespec-azure-rulesets\test\validate-rules-defined.test.ts
mise exec -- pnpm run-all --filter=@azure-tools/typespec-azure-rulesets --filter=@typespec/prettier-plugin-typespec build --output-logs=errors-only
mise exec -- pnpm --filter @azure-tools/typespec-azure-core --filter @azure-tools/typespec-azure-resource-manager regen-docs
mise exec -- pnpm format
mise exec -- pnpm lint
mise exec -- pnpm format:check
```

### Validation status and remaining limitations

1. Representative and explicitly authorized full validation are complete: [590 project reports and structured evidence](validation/full-20261110-a9c4d8a/index.md).
2. The client-customization scope difference tracked in #5993 and Purview alias multiplicity remain unchanged. Full validation does not imply these design decisions were resolved.
3. Five OAS2 comparisons are unassessed. Source and selected-version Swagger are not aligned, and data plane uses a separate selected-rule Spectral profile rather than full AutoRest production execution. No whole-rule equivalence or release-readiness claim follows.

The latest focused rerun had **61 passed and one existing 10-second ARM integration timeout**. An isolated retry of that file passed all four cases without increasing its timeout. The original combined run is not described as entirely green. The current build closure succeeded in all 23 tasks. These current logs are retained with the pilot; the earlier development evidence above remains historical.

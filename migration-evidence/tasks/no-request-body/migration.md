# GET and DELETE request-body migration

## 1. Conclusion and scope

**The shared Azure Core implementation is ready for manual PR review. Real-spec coverage for this revision has not been assessed.**

The TypeSpec linter rule is `@azure-tools/typespec-azure-core/no-request-body`. At the user's request, it replaces the unmerged ARM-only GET implementation in [PR #5986](https://github.com/Azure/typespec-azure/pull/5986), rather than introducing a second PR or dependent branch. The PR continues to target canonical `main`.

The grouped Swagger linter policies are:

- [GetMustNotHaveRequestBody](members/GetMustNotHaveRequestBody/migration.md), issue [#5983](https://github.com/Azure/typespec-azure/issues/5983), ARM GET.
- [DeleteMustNotHaveRequestBody](members/DeleteMustNotHaveRequestBody/migration.md), issue [#5982](https://github.com/Azure/typespec-azure/issues/5982), ARM DELETE.
- [RequestBodyNotAllowed](members/RequestBodyNotAllowed/migration.md), data-plane GET and DELETE.

These policies have one coherent native responsibility: GET and DELETE operations must not carry a request body. They share one enablement and suppression control, with no verb-specific configuration. The user explicitly approved this consolidation and updating the existing PR on November 9, 2026.

Source: [`6c6b3fd4d70dc70fd5c3693e45d9c84e3eeb4999`](https://github.com/Azure/typespec-azure/commit/6c6b3fd4d70dc70fd5c3693e45d9c84e3eeb4999). The existing PR head before consolidation was `8e7e450110e02da67c61609ac130f586d2a12846`; its prior commits and merge from canonical `main` are retained. The compiler gitlink remains `837b5a769414f853fd22eeed0a123c953425b1d8`.

The implementation uses resolved HTTP metadata, emits one warning per offending concrete operation, and does not depend on an emitter or SDK metadata. Absent and `void` bodies are allowed. Other HTTP verbs are unchanged. The existing released `rpc-operation-request-body` implementation and preset enablement remain unchanged; enabling both rules can produce overlapping warnings.

The Core library's compiler-provided `all` set includes the new rule. Both central `data-plane` and `resource-manager` presets explicitly leave it disabled.

## 2. Actual coverage

| Measurement for this revision | Swagger linter                                            | TypeSpec linter                       |
| ----------------------------- | --------------------------------------------------------- | ------------------------------------- |
| Assessed real-spec projects   | Not run                                                   | Not run                               |
| Real-spec findings            | Not assessed                                              | Not assessed                          |
| Full-population equivalence   | Not assessed                                              | Not assessed                          |
| Focused development checks    | Source implementation inspected; no new Swagger execution | 62 tests passed in four focused files |

**Assessed coverage:** focused TypeSpec evidence establishes the shared GET/DELETE predicate across explicit, implicit, optional, empty-model, primitive, body-root, and multipart request bodies, including RPC-derived and standard ARM operations. Bodyless and non-target-verb controls pass. Four complete authored documentation examples compile with exactly `2 / 0 / 2 / 0` target warnings and no ambient diagnostics. This is local behavior and activation evidence, not measured Swagger/TypeSpec real-spec parity.

Real-spec validation was deliberately deferred by the user. Prior [ARM-only GET coverage](../get-must-not-have-request-body-5983/migration.md) applies to an older implementation and runtime; its project counts and conclusions do not certify this new Core rule, DELETE behavior, or data-plane coverage.

### Gap analysis and decision

Existing TypeSpec `rpc-operation-request-body` covers only operations derived from `Azure.Core.RpcOperation`; ordinary GET/DELETE operations and ARM templates require the broader rule. Keeping separate unmerged ARM GET/DELETE implementations would duplicate that cross-service policy. The chosen Core rule closes the native predicate gap without changing the released RPC rule's behavior.

Source-only client customizations remain included, as in the original PR. The known source-versus-emitted-service boundary is tracked in [#5993](https://github.com/Azure/typespec-azure/issues/5993), not silently resolved by this consolidation. No real-spec equivalence or release-readiness conclusion is supported yet.

## 3. Function-level coverage

| Behavior                                                                                       | Result           | Evidence and limits                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Select GET and DELETE by HTTP verb                                                             | Verified locally | Both verbs exercise the same canonical suite; inferred-verb and other-verb controls pass.                                                                             |
| Reject explicit, optional, empty-model, primitive, body-root, implicit, and multipart payloads | Verified locally | Both GET and DELETE cases report one warning at the authored operation.                                                                                               |
| Allow no payload, `void`, metadata-only, ignored, and non-request-visible parameters           | Verified locally | Canonical compliant controls pass for both verbs.                                                                                                                     |
| Handle generic template customization without duplicate reports                                | Verified locally | Concrete operations derived from a generic template report once.                                                                                                      |
| Cover RPC-derived operations                                                                   | Verified locally | New rule reports both verbs; the unchanged existing RPC suite also passes.                                                                                            |
| Cover ARM templates                                                                            | Verified locally | `ArmResourceRead`, `ArmResourceDeleteSync`, and `ArmResourceDeleteWithoutOkAsync` with additional body parameters report; bodyless read/delete templates pass.        |
| Register through the published package surface                                                 | Verified locally | ARM integration obtains the rule from Core's public `$linter`; actual compiler library-all activation produces two target warnings.                                   |
| Preserve central preset defaults                                                               | Verified locally | Both central presets produce zero new-rule warnings; existing RPC enablement is preserved. Preset controls have 12 unrelated warnings each, not a clean-preset claim. |
| Exclude client-only helpers or evaluate selected-version emission                              | Not implemented  | Preserves prior source-operation policy; #5993 remains open.                                                                                                          |
| Correspond to real Swagger findings                                                            | Not assessed     | Five-project and full-spec validations require separate user approvals.                                                                                               |

Canonical behavior suite: [`no-request-body.test.ts`](https://github.com/Azure/typespec-azure/blob/6c6b3fd4d70dc70fd5c3693e45d9c84e3eeb4999/packages/typespec-azure-core/test/rules/no-request-body.test.ts). ARM template integration remains in the ARM package to avoid a Core-to-ARM dependency.

## 4. Why diagnostic counts differ

There is no current-project comparison population, so no current count difference can be calculated.

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
- [Example/activation results](checks/examples-and-activation.json) and [reproduction script](checks/check-examples.mjs) retain the eight local compilation checks. Invoke the script with the worktree root and an output JSON path using the repository's mise-managed Node.
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

### Required remaining gates

1. User manually reviews the updated PR and approves representative validation.
2. Validate Swagger and TypeSpec on five representative projects covering ARM and data-plane authoring. Follow the existing `comp-reports` format, save a new rule-specific folder under the user's `coverage-reports`, and summarize gaps and behavioral differences.
3. Stop for user review. Run all specs only after separate approval.

No new real-spec Swagger or TypeSpec execution, specs checkout preparation, full-corpus run, artifact replay, or real-spec parity claim was made during this PR update.

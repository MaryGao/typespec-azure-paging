# PageableRequires200Response migration

## 1. Conclusion and scope

The proposed TypeSpec linter `@azure-tools/typespec-azure-core/pageable-requires-200-response` migrates Swagger linter [`PageableRequires200Response`](https://github.com/Azure/azure-openapi-validator/blob/main/docs/pageable-requires200-response.md). **Equivalence remains undetermined: this is an unvalidated implementation draft, paused for author review.** It requires an HTTP 200 response on `@list` operations with next-link paging metadata across ARM and data-plane APIs and HTTP verbs. Legacy `x-ms-pageable` operations without a native next-link counterpart remain outside its scope.

## 2. Actual coverage

No projects have been assessed for this draft. No builds, tests, lint, formatting checks, example compilation, artifact validation, corpus comparisons, or independent reviews have been run. Counts are not measured, not zero findings.

| Count | Swagger linter | TypeSpec linter |
| --- | --- | --- |
| Reported diagnostics | Not evaluated | Not evaluated |

Coverage and gaps remain unassessed. See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

The canonical test suite has been prepared but not executed.

| Behavior | Result |
| --- | --- |
| GET and POST next-link paging with only HTTP 201 | Expected warning; not run |
| Implicit HTTP 200, explicit HTTP 200, and HTTP 200 with additional success codes | Expected acceptance; not run |
| Default response or `2XX` range without an explicit HTTP 200 | Expected warning; not run |
| Operation without `@list`, or list without next-link paging | Expected exclusion; not run |
| Concrete operations derived from operation/interface templates | Expected one warning on the concrete operation; not run |
| Standard ARM and data-plane documentation examples | Prepared; not compiled |
| Library `all` activation and standard preset nonactivation | Registration prepared; not verified |

## 4. Why diagnostic counts differ

No diagnostic counts are available, so neither equality nor a difference is established. The proposed TypeSpec linter uses warning severity rather than the Swagger linter's error severity, is disabled in both standard Azure presets, and intentionally follows the AutoRest emitter's native next-link paging scope. These differences require explicit treatment during the later comparison.

## NOTES

- Issue: [Azure/typespec-azure#5957](https://github.com/Azure/typespec-azure/issues/5957).
- Source rule: [implementation](https://github.com/Azure/azure-openapi-validator/blob/main/packages/rulesets/src/spectral/az-common.ts#L295-L307), [documentation](https://github.com/Azure/azure-openapi-validator/blob/main/docs/pageable-requires200-response.md), and [tests](https://github.com/Azure/azure-openapi-validator/blob/main/packages/rulesets/src/spectral/test/pageable-requires200-response.test.ts).
- Native owner: Azure Core, because the policy is shared across ARM and data-plane APIs. Reuse `isList` and `getPagingOperation` from `@typespec/compiler`, and `getHttpOperation` from `@typespec/http`; no ARM dependency is introduced.
- Existing coverage: ARM `use-standard-response-codes` already requires HTTP 200 on GET operations in services but does not close the pageable POST gap. ARM `list-response-envelope` inspects existing HTTP 200 responses without requiring their presence. The new rule can overlap with the ARM GET rule when both are enabled.
- Starting point: implementation and focused test scenarios from closed [PR #5846](https://github.com/Azure/typespec-azure/pull/5846), adapted to canonical `main` for this new task. Its historical validation and evidence do not certify this draft.
- Default activation: register the rule in Azure Core, retain automatic library `all` membership, and explicitly disable it in standard data-plane and resource-manager presets.
- User-authorized checkpoint: publish an explicitly unvalidated draft PR so the author can review it; do not start validation until the author says okay. This overrides the skill's normal validation-before-publication sequence for this checkpoint only. The migration is not complete or release-ready.
- CI: the preparation commit uses `[skip ci]` to avoid starting push/pull-request validation before approval. Do not request automated reviews yet.
- Deferred preparation: dependency/submodule readiness, shared-baseline selection, isolated specs setup, and validation/review capability checks remain pending. No dependency installation or artifact preparation was performed.
- Deferred generated content: regenerate Azure Core README and website linter references with the package's `regen-docs` script after approval; generated files were not manually patched.
- Deferred validation: focused rule tests; affected package builds, lint, and tests; ruleset registration/activation tests; generated-doc and example checks; formatting and Chronus checks; immutable candidate and injected controls; shared-baseline full-population analysis; and independent development/release-readiness reviews under the referenced skill.
- Resume details and exact local ownership are recorded in [task.json](./task.json).

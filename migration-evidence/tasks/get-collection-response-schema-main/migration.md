# GetCollectionResponseSchema migration

## 1. Conclusion and scope

Extend `@azure-tools/typespec-azure-resource-manager/arm-resource-operation-response` for [GetCollectionResponseSchema](https://github.com/Azure/azure-openapi-validator/blob/18a7944e7fc3155e8ef1498665465ed5f455f54a/docs/get-collection-response-schema.md), rather than introducing another rule. Equivalence remains **undetermined**: this is an explicitly unvalidated initial draft. The proposed collection check compares actual HTTP 200 response models from paired individual and collection GETs, including hand-authored ARM routes, instead of assuming that the registered resource is the GET response.

Existing lifecycle checks remain. Missing or non-array `value` properties remain owned by `list-response-envelope`. Historical Swagger collection backtracking, ambiguous GET pairs, singleton/extension paths, and real-spec correspondence still require investigation; this draft does not claim complete migration.

## 2. Actual coverage

No project population has been assessed for this candidate. All projects are unassessed; there are no measured diagnostic totals.

| Count | Swagger linter | TypeSpec linter |
| --- | --- | --- |
| Raw individual findings | Not measured | Not measured |

No prior PR's results are reused. [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) remains unassessed until the comparison is run.

## 3. Function-level coverage

The following describes proposed implementation and authored regressions, not executed results.

| Behavior | Draft implementation and pending evidence |
| --- | --- |
| Compare LIST items with the actual individual GET response | HTTP 200 body metadata; regressions distinguish GET summary/LIST summary from GET summary/LIST registered resource. |
| Non-resource and scalar items | Named model identity comparison; mismatches are reported on the collection operation. |
| Wrapped responses and inherited `value` | HTTP body extraction and inherited property lookup; regressions authored. |
| Multiple response-body variants | Union traversal; one collection diagnostic per operation. |
| Hand-authored ARM routes | Pair resolved HTTP GET paths within each ARM service. |
| Different scopes and parent parameter names | Compare resource tails after the last `/providers/`, normalize parameter names and trailing slash; regression authored. |
| Non-ARM services, POST, unrelated providers, non-200 responses | Excluded from the additional comparison; controls authored. |
| No corresponding GET | No additional schema assumption; retain existing registered-list fallback. |
| Existing PUT/GET/PATCH checks | Existing implementation and tests retained; execution pending. |
| Missing or non-array `value` | Delegated to `list-response-envelope`; combined-rule behavior unassessed. |
| Singleton, extension, shared-route and versioned cases | Unassessed; require focused investigation before equivalence is claimed. |
| Swagger schema-reference backtracking and selection anomalies | Not reproduced; intended native policy versus historical representation behavior remains to be assessed. |

## 4. Why diagnostic counts differ

Unassessed: neither linter has been executed for this candidate, so there are no observed count differences or accepted parity exceptions. Any future comparison must distinguish envelope diagnostics from this rule's item-schema diagnostics and preserve project-level directional differences.

## NOTES

- Flow: `native-first`; singleton task `get-collection-response-schema-main`.
- Fresh implementation base: `Azure/typespec-azure:main`, commit `ef4b930980a3937ac1ca6ce244b2c98cd64c71eb`. No dependency on an existing migration PR, source branch, or uncommitted work.
- Core gitlink: `05b9bad7c57b9b58e8fb5390f9bab081a1a9ac31`.
- Swagger source: [GetCollectionResponseSchema.ts](https://github.com/Azure/azure-openapi-validator/blob/18a7944e7fc3155e8ef1498665465ed5f455f54a/packages/rulesets/src/native/legacyRules/GetCollectionResponseSchema.ts), registration `R4019`, ARM, composed, error; [ArmHelper](https://github.com/Azure/azure-openapi-validator/blob/18a7944e7fc3155e8ef1498665465ed5f455f54a/packages/rulesets/src/native/utilities/arm-helper.ts) discovers pairs and compares item definition names.
- Destination is the existing Resource Manager rule: ARM response consistency is its existing responsibility. Its public ID, warning severity, registration, enablement and suppression identity are unchanged. No new rule or ruleset entry is introduced.
- Implementation branch: `MaryGao/typespec-azure-paging:feat/get-collection-response-schema`; PR target: `Azure/typespec-azure:main`.
- Evidence branch: `MaryGao/typespec-azure-paging:migration-evidence/get-collection-response-schema-main`. This report is draft planning/status, not a coverage receipt.
- The user explicitly requested the draft PR before any validation and waived pre-commit formatting/linting for the initial commit only. All formatting, lint, build, tests, documentation generation/example compilation, real-spec integration, full coverage, independent local review and development/release-readiness review gates are deferred. No pass or migration-completion claim is made.
- Dependency installation, specs runtime setup, shared-baseline selection/integrity checks, candidate packing and fresh-checkout replay have not been performed. Existing results cannot certify this candidate. Select and pin the shared Swagger baseline before specs setup; do not rerun Swagger without separate authorization.
- Next validation scope: focused `arm-resource-operations.test.ts` plus envelope interactions, affected ARM build/package tests/lint, required repository format/lint, documentation generation and example compilation, then immutable candidate controls, full frozen-population comparison and both independent review checkpoints.

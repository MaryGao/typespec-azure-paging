# list-response-envelope: all declared list operations

## 1. Conclusion and scope

The TypeSpec linter `@azure-tools/typespec-azure-resource-manager/list-response-envelope`
retains its existing public name and response-envelope policy. Unlike the Swagger
linter [GetCollectionOnlyHasValueAndNextLink](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-collection-only-has-value-and-next-link.md),
which infers collection GET APIs from URL paths, it checks declared list
operations, including lists not associated with ARM resources and POST lists.
A list does not need continuation-link metadata to be checked. Unmarked operations
are not inferred to be lists from their paths. Production equivalence remains
**undetermined**: real-spec validation was explicitly excluded by the requester.
This is a draft, not completed migration or release-readiness acceptance.

## 2. Actual coverage

No production specs were evaluated. No Swagger or TypeSpec corpus diagnostic
totals were collected; the entries below are not zero findings.

| Count                      | Swagger linter | TypeSpec linter |
| -------------------------- | -------------- | --------------- |
| Raw production diagnostics | Not evaluated  | Not evaluated   |

No production count correspondence can be claimed. See
[Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

| Behavior                                                                    | Result                               |
| --------------------------------------------------------------------------- | ------------------------------------ |
| Compiler `@list` GET/POST operations, including non-resource lists          | Covered                              |
| REST `@listsResource` operations without `@list` or ARM metadata            | Covered by violating/compliant tests |
| ARM list operations without `@list` or resource lifecycle operations        | Covered                              |
| Lists without a next-link marker                                            | Checked                              |
| Unmarked collection-shaped GETs and paging properties alone                 | Not inferred to be lists             |
| Uninstantiated operation/interface templates and library declarations       | Skipped                              |
| Instantiated list interfaces and overlapping list markers                   | Checked without duplicate reports    |
| `value` array and exactly `value` / `nextLink` on eligible response models  | Covered by violating/compliant tests |
| Inherited properties and models without own properties                      | Covered                              |
| Multiple lists/resources, subscription scope and nested namespaces          | Covered                              |
| Existing array, record, file, multipart and non-200 response exclusions     | Preserved                            |
| Production prevalence, API-version comparisons and packed-package injection | Not evaluated                        |

The canonical envelope suite contains 38 cases. Operation callbacks identify
lists using compiler `isList`, REST `isListOperation` or ARM list-operation
metadata. They do not use URL-path inspection or require `@nextLink`. Project
interface ownership is used when excluding library declarations so inherited
list operations remain eligible.

## 4. Why diagnostic counts differ

Production differences are unassessed, not accepted or explained count gaps.
Code inspection establishes intentional applicability differences: the Swagger
linter's [registration](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts)
selects GET/200 schema properties using path suffix exclusions, and its
[implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts)
counts provider-relative path segments. The TypeSpec linter instead follows
semantic list declarations, including non-resource and POST lists. Conversely,
an unmarked collection-shaped GET is outside its scope. Focused tests establish
those boundaries but do not measure production impact or prove diagnostic-count
equivalence.

## NOTES

- Publication scope: only the envelope-rule rewrite, canonical tests,
  documentation, generated description rows and Chronus fix entry. Separate
  schema-rule workspace changes are excluded.
- The requester broadened the initial resource-only scope to all declared lists.
  The earlier restriction against compiler `isList` is superseded by that
  requirement. No path inference or continuation-link applicability gate was
  reintroduced.
- Native base: `Azure/typespec-azure:main` at
  `471dffac285f90e0bf892ac80a37a0a21cf8879b`.
- Native candidate:
  [7e59ff8ce26f06d0c6048454491a259f6be692ce](https://github.com/Azure/typespec-azure/commit/7e59ff8ce26f06d0c6048454491a259f6be692ce).
  Candidate core gitlink: `a43d2ca6f2ddd4c1a1d05f2e63cd4c8a40a71b76`.
- Local validation on 2026-11-04: **116 tests passed** across the envelope,
  list-operation-missing-pageable and resource-resolution suites. Two additional
  temporary checks compiled the actual documented incorrect/correct snippets
  with this rule enabled, asserting one warning and no warning respectively.
  The temporary check file was removed afterward. ARM package `tsc --noEmit`,
  changed-file type-aware lint, syntax lint and formatting passed.
- Those checks used the existing dependency closure at base
  `ef4b930980a3937ac1ca6ce244b2c98cd64c71eb`, core
  `05b9bad7c57b9b58e8fb5390f9bab081a1a9ac31`, Node.js 24.20.0 and Vitest 5.0.5.
  The changed rule source, canonical suite and rule documentation were verified
  byte-identical between that tested workspace and the isolated candidate.
- Reproduction with repository-managed tools: from the ARM package, run
  `pnpm exec vitest run test/rules/list-response-envelope.test.ts test/rules/list-operation-missing-pageable.test.ts test/resource-resolution.test.ts`
  and `pnpm exec tsc -p tsconfig.build.json --noEmit`; run changed-file
  `oxlint --type-aware --deny-warnings` and Prettier from the repository root.
- The isolated candidate's latest-main dependency closure was **not** built or
  tested: dependencies were absent and the pinned pnpm bootstrap failed.
  Existing-closure checks are not a latest-main artifact-validation result.
  Node.js 24 was the available fallback, not the pinned Node.js 26.
- Independent local semantic review of the expanded list scope found no
  significant issues. It did not certify the newer dependency closure.
- Severity remains warning; public registration, ruleset activation and
  suppression identity are unchanged. The array-valued `value` check already
  belonged to this existing rule and is not a new independent rule migration.
- No real-spec validation, production baseline creation, packed-package
  injection, recovery replay, GitHub review/fix loop or separate release-readiness
  checkpoint was performed. Full workflow acceptance is incomplete.

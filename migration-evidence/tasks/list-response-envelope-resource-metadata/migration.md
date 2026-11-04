# list-response-envelope: ARM resource metadata

## 1. Conclusion and scope

The TypeSpec linter `@azure-tools/typespec-azure-resource-manager/list-response-envelope`
retains its existing public name and response-envelope policy. Unlike the Swagger
linter [GetCollectionOnlyHasValueAndNextLink](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-collection-only-has-value-and-next-link.md),
which infers collection GET APIs from URL paths, it selects operations from
`resolveArmResources(program).resources[].operations.lists`. Resources without
resolved list operations and unassociated operations are skipped, regardless of
their paths or paging decorators. Production equivalence remains **undetermined**:
real-spec validation was explicitly excluded by the requester. This is a draft,
not completed migration or release-readiness acceptance.

## 2. Actual coverage

No production specs were evaluated. No Swagger or TypeSpec corpus diagnostic
totals were collected; the entries below are not zero findings.

| Count                      | Swagger linter | TypeSpec linter |
| -------------------------- | -------------- | --------------- |
| Raw production diagnostics | Not evaluated  | Not evaluated   |

No production count correspondence can be claimed. See
[Why diagnostic counts differ](#4-why-diagnostic-counts-differ).

## 3. Function-level coverage

| Behavior                                                                    | Result                                     |
| --------------------------------------------------------------------------- | ------------------------------------------ |
| ARM resource list membership, including lists without `@list`               | Covered by focused tests                   |
| Resource list segments ending in `operations` or `default`                  | Checked without rule-local path exclusions |
| Unassociated collection-shaped GETs and paged GET/POST operations           | Intentionally skipped                      |
| Resources without list operations; services without ARM resources           | Skipped                                    |
| `value` array and exactly `value` / `nextLink` on eligible response models  | Covered by violating/compliant tests       |
| Inherited envelope properties, including models without own properties      | Covered                                    |
| Multiple lists, subscription scope, nested namespaces, multiple resources   | Covered                                    |
| Existing array, record, file, multipart and non-200 response exclusions     | Preserved by focused tests                 |
| Production prevalence, API-version comparisons and packed-package injection | Not evaluated                              |

The changed canonical envelope suite contains 30 cases. Tests cover standard
paged templates, legacy single-page templates and directly registered resource
list operations. The rule no longer depends on `isList`, paging resolution or
URL-path inspection to select operations.

## 4. Why diagnostic counts differ

Production differences are unassessed, not accepted or explained count gaps.
Code inspection establishes intentional applicability differences: the Swagger
linter's [registration](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts)
selects GET/200 schema properties using path suffix exclusions, and its
[implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/get-collection-only-has-value-and-next-link.ts)
counts provider-relative path segments. The TypeSpec linter instead follows ARM
resource list associations. Focused tests establish those boundaries but do not
measure production impact or prove diagnostic-count equivalence.

## NOTES

- Publication scope: only the envelope-rule rewrite, its canonical tests,
  documentation and Chronus fix entry. Separate schema-rule workspace changes
  are excluded.
- Native base: `Azure/typespec-azure:main` at
  `471dffac285f90e0bf892ac80a37a0a21cf8879b`.
- Native candidate:
  [4de1df8832101c04922db7b12540f7e5aedb9378](https://github.com/Azure/typespec-azure/commit/4de1df8832101c04922db7b12540f7e5aedb9378).
  Candidate core gitlink: `a43d2ca6f2ddd4c1a1d05f2e63cd4c8a40a71b76`.
- Local validation on 2026-11-04: 108 tests passed across the canonical envelope,
  list-operation-missing-pageable and resource-resolution suites; ARM package
  `tsc --noEmit` and changed-file type-aware lint passed. Those checks used the
  existing dependency closure at base
  `ef4b930980a3937ac1ca6ce244b2c98cd64c71eb`, core
  `05b9bad7c57b9b58e8fb5390f9bab081a1a9ac31`, Node.js 24.20.0 and Vitest 5.0.5.
  The three changed rule/source/test documents were verified byte-identical
  between that tested workspace and the isolated candidate.
- Reproduction with repository-managed tools: from the ARM package, run
  `pnpm exec vitest run test/rules/list-response-envelope.test.ts test/rules/list-operation-missing-pageable.test.ts test/resource-resolution.test.ts`
  and `pnpm exec tsc -p tsconfig.build.json --noEmit`; run changed-file
  `oxlint --type-aware --deny-warnings` and Prettier from the repository root.
- The isolated candidate's changed files were formatted and syntax-linted with
  existing repository tools. Its latest-main dependency closure was **not**
  built/tested: dependencies were absent and the pinned pnpm bootstrap failed.
  Earlier passing checks must not be read as a latest-main artifact-validation
  result. Node.js 24 was the available fallback, not the pinned Node.js 26.
- Independent local semantic review found no significant issues. It did not run
  tests or real specs and did not certify the newer dependency closure.
- Severity remains warning; public rule registration, ruleset activation and
  suppression identity are unchanged. The array-valued `value` check already
  belonged to this existing rule and is not a new independent rule migration.
- No real-spec validation, production baseline creation, packed-package
  injection, recovery replay, GitHub review/fix loop or separate release-readiness
  checkpoint was performed. Full workflow acceptance is incomplete.

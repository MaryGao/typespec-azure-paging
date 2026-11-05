# Native TypeSpec coverage analysis

Validators: `GetMustNotHaveRequestBody`
Native rules: `@azure-tools/typespec-azure-resource-manager/no-get-request-body`
Scope: `source`; partial: false.

**This is observed coverage, not an automatic equivalence decision.**
Primary counting unit: sum of raw member validator occurrences versus aligned native diagnostics, counted once.
Member-native attribution is unavailable. Test every member's semantics, including members with no observations.
Cross-validator overlap is not normalized. Equal source locations do not establish one actionable grouped violation.
JSON paths and source locations are different identity domains. One-sided projects and outliers require investigation.
Source diagnostics include all declared versions; Swagger uses the latest emitted API version.

| Measure | Value |
| --- | ---: |
| Selected / assessable projects | 487 / 487 |
| Unassessed projects | 0 |
| Validator / native / overlap projects | 0 / 1 / 0 |
| Observed validator-project coverage | N/A |
| Validator raw / file-independent paths | 0 / 0 |
| Native raw / aligned / source targets | 6 / 6 / 6 |
| Native findings under project defaults | not assessed |
| Validator excess / native excess | 0 / 6 |
| Raw validator excess / raw native excess (primary) | 0 / 6 |

## Member observations (not member-native coverage)

- GetMustNotHaveRequestBody: 0 raw observations; completeness not determined.

## One-sided projects

- Native only: `specification/search/resource-manager/Microsoft.Search/Search`

## Unassessed projects


## Diagnostic outliers

| Project | Validator raw | Native aligned | Raw difference | Validator paths | Native targets | Location difference |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| specification/search/resource-manager/Microsoft.Search/Search | 0 | 6 | -6 | 0 | 6 | -6 |

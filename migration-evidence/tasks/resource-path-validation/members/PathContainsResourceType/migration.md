# PathContainsResourceType migration

## 1. Scope

The Swagger linter [PathContainsResourceType](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/arm-path-validation.ts#L48-L55) maps to the TypeSpec linter `@azure-tools/typespec-azure-resource-manager/resource-path-validation`.

## 2. Coverage

No projects have been assessed.

| Count                | Swagger linter | TypeSpec linter |
| -------------------- | -------------- | --------------- |
| Reported diagnostics | Not assessed   | Not assessed    |

**Analysis:** Source and fixture analysis cannot establish real-spec correspondence or coverage. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ).

## 3. Why diagnostic counts differ

| Difference (with evidence)        | Swagger diagnostics | TypeSpec diagnostics for the same check | analysis                                                                  |
| --------------------------------- | ------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| GET, PUT, PATCH, and DELETE paths | Not assessed        | Not assessed                            | The compared project population and emitted paths have not been assessed. |

## 4. Function-level coverage

[Focused TypeSpec tests](https://github.com/Azure/typespec-azure/blob/f0c007f3f2ffa53db901177c2f2869542cf45ac3/packages/typespec-azure-resource-manager/test/rules/resource-path-validation.test.ts).

| Behavior                                     | Result                                              | analysis                                                                                                                           |
| -------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Provider namespace and resource type segment | Focused tests passed; real-spec coverage unassessed | Swagger matches a word-character resource segment after a dotted provider namespace; it does not enforce plural or lowerCamelCase. |
| Existing TypeSpec coverage                   | Partial                                             | Registered ARM resources require a segment; `use-resource-path-for-put` covers some malformed PUT paths, not all selected verbs.   |

## NOTES

- **Validation:** The representative and full-spec comparisons await separate user approvals.

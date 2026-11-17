# PathForTrackedResourceTypes migration

## 1. Scope

The Swagger linter [PathForTrackedResourceTypes](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/path-for-tracked-resource-types.ts) maps to the TypeSpec linter `@azure-tools/typespec-azure-resource-manager/resource-path-validation`.

## 2. Coverage

No projects have been assessed.

| Count                | Swagger linter | TypeSpec linter |
| -------------------- | -------------- | --------------- |
| Reported diagnostics | Not assessed   | Not assessed    |

**Analysis:** Source and fixture analysis cannot establish real-spec correspondence or coverage. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ).

## 3. Why diagnostic counts differ

| Difference (with evidence)   | Swagger diagnostics | TypeSpec diagnostics for the same check | analysis                                                                                          |
| ---------------------------- | ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Location-bearing GET and PUT | Not assessed        | Not assessed                            | Payload projection, response selection, and emitted paths have not been compared across projects. |

## 4. Function-level coverage

[Focused TypeSpec tests](https://github.com/Azure/typespec-azure/blob/f0c007f3f2ffa53db901177c2f2869542cf45ac3/packages/typespec-azure-resource-manager/test/rules/resource-path-validation.test.ts).

| Behavior                                            | Result                                               | analysis                                                                                                                                                          |
| --------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location-bearing PUT body or first 2xx GET response | Focused tests passed; real-spec coverage unassessed  | Swagger checks direct or inherited `location`, not ARM tracked-resource identity. TypeSpec currently inspects single-model payloads and numeric success statuses. |
| Resource-group scope and nested path                | Focused tests passed; real-spec coverage unassessed  | Swagger applies scope and nested-pattern predicates to the identified paths.                                                                                      |
| GET without a 2xx response                          | Deliberate difference; real-spec coverage unassessed | The Swagger handler can discard a preceding PUT diagnostic. The TypeSpec linter checks the PUT independently.                                                     |
| Existing TypeSpec coverage                          | Partial                                              | ARM resource-group scope is the template default, but custom routes and location-bearing non-tracked models can be authored.                                      |

## NOTES

- **Validation:** The representative and full-spec comparisons await separate user approvals.

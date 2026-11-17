# Resource path validation migration

## 1. Scope

The TypeSpec linter `@azure-tools/typespec-azure-resource-manager/resource-path-validation` combines the Swagger linters [PathContainsResourceType](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/arm-path-validation.ts#L48-L55), [PathForNestedResource](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/arm-path-validation.ts#L58-L72), and [PathForTrackedResourceTypes](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/path-for-tracked-resource-types.ts).

## 2. Coverage

No projects have been assessed. Representative and full-spec validation are deferred pending the user's separate approvals.

| Count                | Swagger linter | TypeSpec linter |
| -------------------- | -------------- | --------------- |
| Reported diagnostics | Not assessed   | Not assessed    |

**Analysis:** Source analysis and focused tests do not establish real-spec coverage or equivalence. Diagnostic counts, suppressions, API-version alignment, and source-to-emission correspondence remain unassessed. See [Why diagnostic counts differ](#3-why-diagnostic-counts-differ).

## 3. Why diagnostic counts differ

| Difference (with evidence)                                                                                                                                                                        | Swagger diagnostics | TypeSpec diagnostics for the same check | analysis                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Resource type](members/PathContainsResourceType/migration.md), [nested paths](members/PathForNestedResource/migration.md), and [tracked paths](members/PathForTrackedResourceTypes/migration.md) | Not assessed        | Not assessed                            | The project population and comparable diagnostic occurrences have not yet been measured. |

## 4. Function-level coverage

| Behavior                      | Result                                              | analysis                                                                                                                                          |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resource type path            | Focused tests passed; real-spec coverage unassessed | The Swagger predicate and existing TypeSpec coverage are described in the [member note](members/PathContainsResourceType/migration.md).           |
| Nested resource path          | Focused tests passed; real-spec coverage unassessed | The Swagger invalid-pattern checks and existing TypeSpec coverage are described in the [member note](members/PathForNestedResource/migration.md). |
| Location-bearing GET/PUT path | Focused tests passed; real-spec coverage unassessed | Swagger's payload-based check and its comparison limits are described in the [member note](members/PathForTrackedResourceTypes/migration.md).     |

## NOTES

- **Inputs:** Swagger source is pinned at `e1b8b207a196cf2fc288593efec22e6e38ab98d5`. The selected real-spec inputs and compatible Swagger observations have not yet been verified.
- **Validation:** Focused development checks are recorded in [evidence details](evidence-details.md). Real-spec validation was not run during PR preparation. The five-project comparison and full-spec run require separate user approvals.

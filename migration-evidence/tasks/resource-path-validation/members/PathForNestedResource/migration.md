# PathForNestedResource migration

## 1. Scope

The Swagger linter [PathForNestedResource](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/arm-path-validation.ts#L58-L72) maps to `@azure-tools/typespec-azure-resource-manager/resource-path-validation`.

The TypeSpec rule identifies a nested ARM resource from its resolved `resource.parent` relationship. It validates that the child path ends with the child resource type and name; parent parameter names do not need to match textually.

## 2. Coverage

The full run assessed all 56 approved suitable TypeSpec projects against 57 selected Swagger documents at candidate `bb9e0d61171c966fecdb803cf095819f7cbd1327`. See the [overall validation report](../../migration.md#2-coverage) and [per-case evidence](../../gap-evidence.md).

| Metric                        | Count |
| ----------------------------- | ----: |
| Swagger diagnostic instances  |     1 |
| TypeSpec diagnostic instances |     1 |
| Matched route/rule pairs      |     0 |
| Swagger-only pairs            |     1 |
| TypeSpec-only pairs           |     1 |

The Swagger-only finding is a false positive for a named singleton. The TypeSpec-only finding is a Load Testing route added after the selected Swagger version; its fixed child name lacks resolved singleton metadata. Seven previous placeholder-name diagnostics were eliminated by the parent-concept change.

## 3. Function-level coverage

| Behavior                       | Result                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Nested-resource identification | Uses the resolved ARM parent relationship (`resource.parent !== undefined`).                                                         |
| Child path shape               | Validates the trailing child resource-type/name pair, including declared singleton names.                                            |
| Parent placeholder spelling    | Different parameter names at corresponding parent positions are accepted; seven previous TypeSpec-only findings no longer reproduce. |
| Named singleton                | TypeSpec accepts the declared singleton name; Swagger flags one valid Recovery Services singleton.                                   |
| Version mismatch               | One Load Testing route is not present in the selected Swagger version and still lacks singleton metadata in TypeSpec.                |

This comparison does not imply parity across unselected API versions. The complete [nested-path findings and resolved regression routes](../../gap-evidence.md#api-version-mismatch-cases) include source links and counts.

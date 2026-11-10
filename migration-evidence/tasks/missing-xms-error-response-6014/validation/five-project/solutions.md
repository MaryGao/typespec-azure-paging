# Solutions: MissingXmsErrorResponse comparison

## 1. Scope

Project: `specification/solutions/resource-manager/Microsoft.Solutions/Solutions`; saved Swagger API `2023-12-01-preview`. Candidate `74e56a0f144190769180d5dbb27179db8b448c9c`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Assessed: **Swagger 4; TypeSpec 5; matched 4; Swagger-only 0; TypeSpec-only 1**. This compares verified historical production Swagger results with fresh, explicitly enabled native source-scope lint. No fresh Swagger run or selected-version projection was performed. Source suppressions remain honored; default activation is not assessed.

Evidence: [native receipt](evidence/solutions/native.json), [saved responses](evidence/solutions/saved-responses.json), [operation correspondence](evidence/solutions/correspondence.json), [saved production provenance](evidence/solutions/saved-validator-provenance.json), [run](evidence/execution.json).

## 2. Difference inventory

Four unmarked GET 404 findings match by route, verb, status and source operation:

| Swagger operation | Native location |
| --- | --- |
| `Applications_Get` | `Application.tsp:59` |
| `ApplicationDefinitions_Get` | `ApplicationDefinition.tsp:60` |
| `JitRequests_Get` | `JitRequestDefinition.tsp:51` |
| `Applications_GetById` | `routes.tsp:35` |

One native-only finding: `ApplicationDefinitionOpsById.getById`, `ApplicationDefinition.tsp:96`, GET 404.

## 3. Detailed differences

The extra operation uses the route:

```text
/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}?disambiguation_dummy
```

Its unmarked 404 exists in the saved Swagger under `x-ms-paths` as `ApplicationDefinitions_GetById`. The legacy selector only visits `paths`, so it never examines this response. Native lint reads the operation's HTTP response metadata independently of emitter placement and reports it.

This is a demonstrated legacy selector gap, not missing native coverage. No source rule change is needed to reproduce a JSON-selector limitation. Swagger errors versus native warnings and their diagnostic locations remain intentional differences.

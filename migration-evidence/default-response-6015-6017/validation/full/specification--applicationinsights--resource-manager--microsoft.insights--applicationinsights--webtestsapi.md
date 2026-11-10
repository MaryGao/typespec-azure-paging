# ApplicationInsights/WebTestsApi: full default-response comparison

## 1. Scope

Project: `specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi`; saved Swagger API `2022-06-15`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 7 | 7 | 1.000 |
| RequiredDefaultResponse | 7 | 7 | 0 | 0.000 |

7 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 0 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`WebTest.tsp:46`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L46) | `WebTestsApi.WebTests.get` | GET | `WebTests_Get` |
| [`WebTest.tsp:52`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L52) | `WebTestsApi.WebTests.createOrUpdate` | PUT | `WebTests_CreateOrUpdate` |
| [`WebTest.tsp:62`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L62) | `WebTestsApi.WebTests.updateTags` | PATCH | `WebTests_UpdateTags` |
| [`WebTest.tsp:71`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L71) | `WebTestsApi.WebTests.delete` | DELETE | `WebTests_Delete` |
| [`WebTest.tsp:76`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L76) | `WebTestsApi.WebTests.listByResourceGroup` | GET | `WebTests_ListByResourceGroup` |
| [`WebTest.tsp:85`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L85) | `WebTestsApi.WebTests.list` | GET | `WebTests_List` |
| [`routes.tsp:27`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/routes.tsp#L27) | `WebTestsApi.WebTestsOperationGroup.listByComponent` | GET | `WebTests_ListByComponent` |

## 3. Detailed differences

The zero-versus-7 MissingDefaultResponse difference comprises 7 confirmed response-key-selector false negatives on saved wire operations and 0 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/WebTest.tsp#L46):

```typespec
/**
   * Get a specific Application Insights web test definition.
   */
  get is ArmResourceRead<WebTest, Error = never>
```

The corresponding `GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}` saved response map has no default:

```json
{
  "200": {
    "description": "Azure operation completed successfully.",
    "schema": {
      "$ref": "#/definitions/WebTest"
    }
  }
}
```

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-24.json), [concrete operation correspondence](evidence/correspondence/specification--applicationinsights--resource-manager--Microsoft.Insights--ApplicationInsights--WebTestsApi.json), [historical production registration/completion](evidence/full-validator-provenance.json).

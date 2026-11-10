# ApplicationInsights/AnalyticsItems: full default-response comparison

## 1. Scope

Project: `specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/AnalyticsItems`; saved Swagger API `2015-05-01`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 4 | 4 | 1.000 |
| RequiredDefaultResponse | 4 | 4 | 0 | 0.000 |

4 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 0 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`routes.tsp:20`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/AnalyticsItems/routes.tsp#L20) | `AnalyticsItems.AnalyticsItemsOperationGroup.list` | GET | `AnalyticsItems_List` |
| [`routes.tsp:61`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/AnalyticsItems/routes.tsp#L61) | `AnalyticsItems.AnalyticsItemsOperationGroup.get` | GET | `AnalyticsItems_Get` |
| [`routes.tsp:95`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/AnalyticsItems/routes.tsp#L95) | `AnalyticsItems.AnalyticsItemsOperationGroup.put` | PUT | `AnalyticsItems_Put` |
| [`routes.tsp:129`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/AnalyticsItems/routes.tsp#L129) | `AnalyticsItems.AnalyticsItemsOperationGroup.delete` | DELETE | `AnalyticsItems_Delete` |

## 3. Detailed differences

The zero-versus-4 MissingDefaultResponse difference comprises 4 confirmed response-key-selector false negatives on saved wire operations and 0 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/AnalyticsItems/routes.tsp#L20):

```typespec
/**
   * Gets a list of Analytics Items defined within an Application Insights component.
   */
  @route("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/{scopePath}")
  @get
  list(
    ...ApiVersionParameter,
    ...SubscriptionIdParameter,
    ...ResourceGroupParameter,

    /**
     * The name of the Application Insights component resource.
     */
    @path
    resourceName: string,

    /**
     * Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component.
     */
    @path
    scopePath: ItemScopePath,

    /**
     * Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component.
     */
    @query("scope")
    scope?: ItemScope = ItemScope.shared,

    /**
     * Enum indicating the type of the Analytics item.
     */
    @query("type")
    type?: ItemTypeParameter = ItemTypeParameter.none,

    /**
     * Flag indicating whether or not to return the content of each applicable item. If false, only return the item information.
     */
    @query("includeContent")
    includeContent?: boolean,
  ): ArmResponse<ApplicationInsightsComponentAnalyticsItem[]>
```

The corresponding `GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/{scopePath}` saved response map has no default:

```json
{
  "200": {
    "description": "Azure operation completed successfully.",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/ApplicationInsightsComponentAnalyticsItem"
      }
    }
  }
}
```

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-16.json), [concrete operation correspondence](evidence/correspondence/specification--applicationinsights--resource-manager--Microsoft.Insights--ApplicationInsights--AnalyticsItems.json), [historical production registration/completion](evidence/full-validator-provenance.json).

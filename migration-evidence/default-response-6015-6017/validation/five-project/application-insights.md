# Application Insights Component APIs: default-response comparison

## 1. Scope

Project: `specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs`; saved Swagger API `2015-05-01`.

Native candidate: `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core: `8574d5453f7bf9a07dc09bd41edac579af71d94b`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. This is one project in the approved five-project pilot, not full-repository validation.

**Assessed:** 23 legacy/native matched findings; 0 legacy-only and 0 native-only findings for `RequiredDefaultResponse`. Separately, `MissingDefaultResponse` has 23 native-only findings caused by the confirmed selector defect.

Historical Swagger execution is reused from sealed baseline `swagger-arm-20261026-2cd3c5dd`; Swagger was not regenerated or rerun. Fresh native execution uses `target-only`, `scope: source`, explicitly enabling only the new rule. Existing rule diagnostics are not added to its count; source suppressions remain in effect. Default activation and selected-version projection are not assessed. The source and saved Swagger are not assumed version-aligned merely because their findings match.

Population: 27 concrete authored source operations (27 service operations), versus 27 saved emitted operations. These populations can differ even when diagnostic correspondence is exact.

Execution evidence: [selection](selection.json), [baseline verification](evidence/baseline-verification.json), [native receipt](evidence/application-insights/native.json), [saved member findings](evidence/application-insights/saved-findings.json), [successful historical production logs](evidence/application-insights/saved-validator-provenance.json), [operation correspondence](evidence/application-insights/correspondence.json), [tested Swagger](evidence/application-insights/tested-swagger-1.json).

## 2. Difference inventory

Counts are diagnostics, not project counts. `N` is the same shared native execution for each member comparison; do not sum it twice.

| Swagger member          | Saved Swagger S | Fresh native N | N - S | Absolute difference | Absolute difference / max(S,N) |
| ----------------------- | --------------: | -------------: | ----: | ------------------: | -----------------------------: |
| MissingDefaultResponse  |               0 |             23 |    23 |                  23 |                          1.000 |
| RequiredDefaultResponse |              23 |             23 |     0 |                   0 |                          0.000 |

| Concrete operation / TypeSpec source                                                                                                                                                                                                                                                         | HTTP method | Saved Swagger operation                   | Native statuses | RequiredDefaultResponse | MissingDefaultResponse | TypeSpec |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- | --------------- | ----------------------- | ---------------------- | -------- |
| [`ComponentAPIs.AnnotationsOperationGroup.delete`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L80)                       | DELETE      | `Annotations_Delete`                      | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.APIKeysOperationGroup.list`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L131)                            | GET         | `APIKeys_List`                            | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.APIKeysOperationGroup.create`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L148)                          | POST        | `APIKeys_Create`                          | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.APIKeysOperationGroup.delete`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L168)                          | DELETE      | `APIKeys_Delete`                          | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.APIKeysOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L191)                             | GET         | `APIKeys_Get`                             | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ExportConfigurationsOperationGroup.list`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L218)               | GET         | `ExportConfigurations_List`               | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ExportConfigurationsOperationGroup.create`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L240)             | POST        | `ExportConfigurations_Create`             | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ExportConfigurationsOperationGroup.delete`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L262)             | DELETE      | `ExportConfigurations_Delete`             | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ExportConfigurationsOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L285)                | GET         | `ExportConfigurations_Get`                | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ExportConfigurationsOperationGroup.update`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L308)             | PUT         | `ExportConfigurations_Update`             | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ComponentCurrentBillingFeaturesOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L342)     | GET         | `ComponentCurrentBillingFeatures_Get`     | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ComponentCurrentBillingFeaturesOperationGroup.update`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L361)  | PUT         | `ComponentCurrentBillingFeatures_Update`  | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ComponentQuotaStatusOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L385)                | GET         | `ComponentQuotaStatus_Get`                | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ComponentFeatureCapabilitiesOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L408)        | GET         | `ComponentFeatureCapabilities_Get`        | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ComponentAvailableFeaturesOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L431)          | GET         | `ComponentAvailableFeatures_Get`          | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ProactiveDetectionConfigurationsOperationGroup.list`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L453)   | GET         | `ProactiveDetectionConfigurations_List`   | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ProactiveDetectionConfigurationsOperationGroup.get`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L475)    | GET         | `ProactiveDetectionConfigurations_Get`    | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.ProactiveDetectionConfigurationsOperationGroup.update`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L501) | PUT         | `ProactiveDetectionConfigurations_Update` | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.WorkItemConfigurationsOperationGroup.create`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L555)           | POST        | `WorkItemConfigurations_Create`           | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.WorkItemConfigurationsOperationGroup.getDefault`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L576)       | GET         | `WorkItemConfigurations_GetDefault`       | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.WorkItemConfigurationsOperationGroup.delete`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L592)           | DELETE      | `WorkItemConfigurations_Delete`           | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.WorkItemConfigurationsOperationGroup.getItem`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L615)          | GET         | `WorkItemConfigurations_GetItem`          | `200`           | Reported                | Not reported           | Reported |
| [`ComponentAPIs.WorkItemConfigurationsOperationGroup.updateItem`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L639)       | PATCH       | `WorkItemConfigurations_UpdateItem`       | `200`           | Reported                | Not reported           | Reported |

## 3. Detailed differences

### Case: absent fallback, independently detected by the legacy and native checks

**RequiredDefaultResponse:** 23 matched findings, with no Swagger-only or native-only findings. The audit verifies the route, HTTP verb, concrete authored operation, absent native `"*"` status, and missing saved Swagger `default`. Every native finding maps to exactly one selected historical finding.

**MissingDefaultResponse:** 23 native-only findings. The saved production logs prove that this Spectral rule was selected and completed, yet it emitted none. Its response-key selector tests nonempty status-key strings rather than the response map. This is an intentional correction of a Swagger false negative, not an unexplained TypeSpec gap.

#### TypeSpec code

Representative exact authored declaration: [`routes.tsp:80`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L80). The surrounding imports/interface are not reproduced.

```typespec
/**
   * Delete an Annotation of an Application Insights component.
   */
  @route("/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}")
  @delete
  delete(
    ...ApiVersionParameter,
    ...ResourceGroupParameter,
    ...SubscriptionIdParameter,

    /**
     * The name of the Application Insights component resource.
     */
    @path
    resourceName: string,

    /**
     * The unique annotation ID. This is unique within a Application Insights component.
     */
    @path
    annotationId: string,
  ): OkResponse | never
```

Resolved native statuses: `200`. No `"*"` fallback is present.

#### Swagger code

Representative exact response map for `Annotations_Delete`, DELETE `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}`, from the [tested Swagger](evidence/application-insights/tested-swagger-1.json). JSON pointer: `/paths/~1subscriptions~1{subscriptionId}~1resourceGroups~1{resourceGroupName}~1providers~1Microsoft.Insights~1components~1{resourceName}~1Annotations~1{annotationId}/delete/responses`.

```json
{
  "200": {
    "description": "The request has succeeded."
  }
}
```

The map has no `default` key. The legacy predicate reports it; the Spectral key-selector defect misses it. This report does not propose modifying the service specification.

## 4. Coverage gaps and disposition

- **RequiredDefaultResponse:** no coverage gap observed in this project. Correspondence is operation-based, not inferred from equal totals. Source-only versus selected-API populations, compiler-prevented malformed responses, and default activation remain separate boundaries.
- **MissingDefaultResponse:** the native rule detects 23 missing fallbacks that the selected Swagger implementation misses. Keep the intended native policy; do not reproduce the selector defect.
- **Independent rules:** overlapping PUT/POST/DELETE or missing-error rules may report additional diagnostics when enabled. No cross-rule deduplication is applied.
- **Recommendation:** retain the current shared rule. This pilot alone does not authorize or certify full-corpus validation.

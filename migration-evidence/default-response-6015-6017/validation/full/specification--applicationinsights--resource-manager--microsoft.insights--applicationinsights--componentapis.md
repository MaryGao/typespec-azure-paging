# ApplicationInsights/ComponentAPIs: full default-response comparison

## 1. Scope

Project: `specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs`; saved Swagger API `2015-05-01`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 23 | 23 | 1.000 |
| RequiredDefaultResponse | 23 | 23 | 0 | 0.000 |

23 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 0 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`routes.tsp:80`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L80) | `ComponentAPIs.AnnotationsOperationGroup.delete` | DELETE | `Annotations_Delete` |
| [`routes.tsp:131`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L131) | `ComponentAPIs.APIKeysOperationGroup.list` | GET | `APIKeys_List` |
| [`routes.tsp:148`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L148) | `ComponentAPIs.APIKeysOperationGroup.create` | POST | `APIKeys_Create` |
| [`routes.tsp:168`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L168) | `ComponentAPIs.APIKeysOperationGroup.delete` | DELETE | `APIKeys_Delete` |
| [`routes.tsp:191`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L191) | `ComponentAPIs.APIKeysOperationGroup.get` | GET | `APIKeys_Get` |
| [`routes.tsp:218`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L218) | `ComponentAPIs.ExportConfigurationsOperationGroup.list` | GET | `ExportConfigurations_List` |
| [`routes.tsp:240`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L240) | `ComponentAPIs.ExportConfigurationsOperationGroup.create` | POST | `ExportConfigurations_Create` |
| [`routes.tsp:262`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L262) | `ComponentAPIs.ExportConfigurationsOperationGroup.delete` | DELETE | `ExportConfigurations_Delete` |
| [`routes.tsp:285`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L285) | `ComponentAPIs.ExportConfigurationsOperationGroup.get` | GET | `ExportConfigurations_Get` |
| [`routes.tsp:308`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L308) | `ComponentAPIs.ExportConfigurationsOperationGroup.update` | PUT | `ExportConfigurations_Update` |
| [`routes.tsp:342`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L342) | `ComponentAPIs.ComponentCurrentBillingFeaturesOperationGroup.get` | GET | `ComponentCurrentBillingFeatures_Get` |
| [`routes.tsp:361`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L361) | `ComponentAPIs.ComponentCurrentBillingFeaturesOperationGroup.update` | PUT | `ComponentCurrentBillingFeatures_Update` |
| [`routes.tsp:385`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L385) | `ComponentAPIs.ComponentQuotaStatusOperationGroup.get` | GET | `ComponentQuotaStatus_Get` |
| [`routes.tsp:408`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L408) | `ComponentAPIs.ComponentFeatureCapabilitiesOperationGroup.get` | GET | `ComponentFeatureCapabilities_Get` |
| [`routes.tsp:431`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L431) | `ComponentAPIs.ComponentAvailableFeaturesOperationGroup.get` | GET | `ComponentAvailableFeatures_Get` |
| [`routes.tsp:453`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L453) | `ComponentAPIs.ProactiveDetectionConfigurationsOperationGroup.list` | GET | `ProactiveDetectionConfigurations_List` |
| [`routes.tsp:475`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L475) | `ComponentAPIs.ProactiveDetectionConfigurationsOperationGroup.get` | GET | `ProactiveDetectionConfigurations_Get` |
| [`routes.tsp:501`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L501) | `ComponentAPIs.ProactiveDetectionConfigurationsOperationGroup.update` | PUT | `ProactiveDetectionConfigurations_Update` |
| [`routes.tsp:555`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L555) | `ComponentAPIs.WorkItemConfigurationsOperationGroup.create` | POST | `WorkItemConfigurations_Create` |
| [`routes.tsp:576`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L576) | `ComponentAPIs.WorkItemConfigurationsOperationGroup.getDefault` | GET | `WorkItemConfigurations_GetDefault` |
| [`routes.tsp:592`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L592) | `ComponentAPIs.WorkItemConfigurationsOperationGroup.delete` | DELETE | `WorkItemConfigurations_Delete` |
| [`routes.tsp:615`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L615) | `ComponentAPIs.WorkItemConfigurationsOperationGroup.getItem` | GET | `WorkItemConfigurations_GetItem` |
| [`routes.tsp:639`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L639) | `ComponentAPIs.WorkItemConfigurationsOperationGroup.updateItem` | PATCH | `WorkItemConfigurations_UpdateItem` |

## 3. Detailed differences

The zero-versus-23 MissingDefaultResponse difference comprises 23 confirmed response-key-selector false negatives on saved wire operations and 0 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentAPIs/routes.tsp#L80):

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

The corresponding `DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}` saved response map has no default:

```json
{
  "200": {
    "description": "The request has succeeded."
  }
}
```

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-17.json), [concrete operation correspondence](evidence/correspondence/specification--applicationinsights--resource-manager--Microsoft.Insights--ApplicationInsights--ComponentAPIs.json), [historical production registration/completion](evidence/full-validator-provenance.json).

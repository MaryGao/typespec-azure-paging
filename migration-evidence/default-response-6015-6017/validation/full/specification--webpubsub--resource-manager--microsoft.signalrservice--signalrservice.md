# Microsoft.SignalRService/SignalRService: full default-response comparison

## 1. Scope

Project: `specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService`; saved Swagger API `2025-12-01-preview`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 9 | 9 | 1.000 |
| RequiredDefaultResponse | 0 | 9 | 9 | 1.000 |

0 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 9 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`client.tsp:268`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L268) | `.WebPubSubHubsGetCustomized` | GET | No saved operation; non-service source |
| [`client.tsp:295`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L295) | `.WebPubSubHubsCreateOrUpdateCustomized` | POST | No saved operation; non-service source |
| [`client.tsp:325`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L325) | `.WebPubSubHubsDeleteCustomized` | GET | No saved operation; non-service source |
| [`client.tsp:352`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L352) | `.PrivateEndpointConnectionsGetCustomized` | GET | No saved operation; non-service source |
| [`client.tsp:379`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L379) | `.PrivateEndpointConnectionsUpdateCustomized` | POST | No saved operation; non-service source |
| [`client.tsp:409`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L409) | `.PrivateEndpointConnectionsDeleteCustomized` | GET | No saved operation; non-service source |
| [`client.tsp:436`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L436) | `.WebPubSubSharedPrivateLinkResourcesGetCustomized` | GET | No saved operation; non-service source |
| [`client.tsp:463`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L463) | `.WebPubSubSharedPrivateLinkResourcesCreateOrUpdateCustomized` | POST | No saved operation; non-service source |
| [`client.tsp:493`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L493) | `.WebPubSubSharedPrivateLinkResourcesDeleteCustomized` | GET | No saved operation; non-service source |

## 3. Detailed differences

The zero-versus-9 MissingDefaultResponse difference comprises 0 confirmed response-key-selector false negatives on saved wire operations and 9 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/client.tsp#L268):

```typespec
#suppress "@azure-tools/typespec-azure-core/casing-style" "customization"
#suppress "@azure-tools/typespec-azure-resource-manager/use-operation-decorator" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-api-version" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-interface" "customization"
#suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
op WebPubSubHubsGetCustomized(
  ...Azure.ResourceManager.ProviderNamespace<WebPubSubHub>,
  ...Azure.ResourceManager.CommonTypes.ApiVersionParameter,
  ...Azure.ResourceManager.CommonTypes.SubscriptionIdParameter,

  #suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
  @path
  hubName: string,

  ...Azure.ResourceManager.CommonTypes.ResourceGroupNameParameter,

  #suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
  @path
  resourceName: string,
): WebPubSubHub;
```

This operation is not in the compiler's HTTP service operation set, and no saved Swagger operation matches its derived route/verb. Its response metadata lacks a default. It is a non-service SDK customization/compatibility declaration, not a missing fallback on a saved wire operation. Derived HTTP metadata is not evidence that the operation was emitted.

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-482.json), [concrete operation correspondence](evidence/correspondence/specification--webpubsub--resource-manager--Microsoft.SignalRService--SignalRService.json), [historical production registration/completion](evidence/full-validator-provenance.json).

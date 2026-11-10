# Microsoft.ServiceLinker/ServiceLinker: full default-response comparison

## 1. Scope

Project: `specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker`; saved Swagger API `2024-07-01-preview`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 12 | 12 | 1.000 |
| RequiredDefaultResponse | 0 | 12 | 12 | 1.000 |

0 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 12 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`client.tsp:192`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L192) | `.dryrunResourcesGetDryrun` | POST | No saved operation; non-service source |
| [`client.tsp:213`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L213) | `.dryrunResourcesCreateDryrun` | POST | No saved operation; non-service source |
| [`client.tsp:236`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L236) | `.dryrunResourcesUpdateDryrun` | POST | No saved operation; non-service source |
| [`client.tsp:259`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L259) | `.dryrunResourcesDeleteDryrun` | POST | No saved operation; non-service source |
| [`client.tsp:280`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L280) | `.dryrunResourcesListDryrun` | POST | No saved operation; non-service source |
| [`client.tsp:33`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L33) | `.linkerResourcesGet` | POST | No saved operation; non-service source |
| [`client.tsp:54`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L54) | `.linkerResourcesCreateOrUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:77`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L77) | `.linkerResourcesUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:100`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L100) | `.linkerResourcesDelete` | POST | No saved operation; non-service source |
| [`client.tsp:121`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L121) | `.linkerResourcesList` | POST | No saved operation; non-service source |
| [`client.tsp:140`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L140) | `.linkerResourcesValidate` | POST | No saved operation; non-service source |
| [`client.tsp:163`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L163) | `.linkerResourcesGenerateConfigurations` | POST | No saved operation; non-service source |

## 3. Detailed differences

The zero-versus-12 MissingDefaultResponse difference comprises 0 confirmed response-key-selector false negatives on saved wire operations and 12 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/servicelinker/resource-manager/Microsoft.ServiceLinker/ServiceLinker/client.tsp#L192):

```typespec
#suppress "@azure-tools/typespec-azure-core/documentation-required" "customization"
#suppress "@azure-tools/typespec-azure-resource-manager/use-operation-decorator" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-api-version" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-interface" "customization"
op dryrunResourcesGetDryrun(
  ...ApiVersionParameter,

  #suppress "@azure-tools/typespec-azure-core/documentation-required" "customization"
  @clientLocation(dryrunResourcesGetDryrun, "java,python,go,javascript")
  @typeChangedFrom(Azure.ResourceManager.CommonTypes.Versions.v4, string)
  subscriptionId: Azure.Core.uuid,

  ...ResourceGroupParameter,
  ...Azure.ResourceManager.Legacy.Provider,
  ...LocationParameter,
  #suppress "@azure-tools/typespec-azure-core/documentation-required" "customization"
  dryrunName: string,
): DryrunResource;
```

This operation is not in the compiler's HTTP service operation set, and no saved Swagger operation matches its derived route/verb. Its response metadata lacks a default. It is a non-service SDK customization/compatibility declaration, not a missing fallback on a saved wire operation. Derived HTTP metadata is not evidence that the operation was emitted.

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-459.json), [concrete operation correspondence](evidence/correspondence/specification--servicelinker--resource-manager--Microsoft.ServiceLinker--ServiceLinker.json), [historical production registration/completion](evidence/full-validator-provenance.json).

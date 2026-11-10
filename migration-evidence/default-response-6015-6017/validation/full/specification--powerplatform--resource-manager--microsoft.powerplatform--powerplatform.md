# Microsoft.PowerPlatform/PowerPlatform: full default-response comparison

## 1. Scope

Project: `specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform`; saved Swagger API `2020-10-30-preview`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 7 | 7 | 1.000 |
| RequiredDefaultResponse | 0 | 7 | 7 | 1.000 |

0 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 7 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`client.tsp:113`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L113) | `.accountsGet` | GET | No saved operation; non-service source |
| [`client.tsp:65`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L65) | `.accountsCreateOrUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:133`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L133) | `.accountsUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:93`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L93) | `.accountsDelete` | GET | No saved operation; non-service source |
| [`client.tsp:187`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L187) | `.enterpriseGet` | GET | No saved operation; non-service source |
| [`client.tsp:159`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L159) | `.enterpriseCreateOrUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:207`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L207) | `.enterpriseUpdate` | POST | No saved operation; non-service source |

## 3. Detailed differences

The zero-versus-7 MissingDefaultResponse difference comprises 0 confirmed response-key-selector false negatives on saved wire operations and 7 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/powerplatform/resource-manager/Microsoft.PowerPlatform/PowerPlatform/client.tsp#L113):

```typespec
#suppress "@azure-tools/typespec-azure-resource-manager/no-response-body" "customization"
#suppress "@azure-tools/typespec-azure-resource-manager/use-operation-decorator" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-api-version" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-interface" "customization"
#suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
op accountsGet(
  /**
   * Name of the account.
   */
  @path
  accountName: string,

  ...SubscriptionIdParameter,
  ...ResourceGroupParameter,
  ...ApiVersionParameter,
  ...Azure.ResourceManager.Legacy.Provider,
): ArmResponse<Account>;
```

This operation is not in the compiler's HTTP service operation set, and no saved Swagger operation matches its derived route/verb. Its response metadata lacks a default. It is a non-service SDK customization/compatibility declaration, not a missing fallback on a saved wire operation. Derived HTTP metadata is not evidence that the operation was emitted.

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-377.json), [concrete operation correspondence](evidence/correspondence/specification--powerplatform--resource-manager--Microsoft.PowerPlatform--PowerPlatform.json), [historical production registration/completion](evidence/full-validator-provenance.json).

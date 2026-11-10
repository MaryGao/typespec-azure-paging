# Microsoft.Devices/IoTHub: full default-response comparison

## 1. Scope

Project: `specification/iothub/resource-manager/Microsoft.Devices/IoTHub`; saved Swagger API `2026-10-01-preview`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 1 | 1 | 1.000 |
| RequiredDefaultResponse | 1 | 1 | 0 | 0.000 |

1 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 0 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`IotHubDescription.tsp:99`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/iothub/resource-manager/Microsoft.Devices/IoTHub/IotHubDescription.tsp#L99) | `Microsoft.Devices.IotHubDescriptions.update` | PATCH | `IotHubResource_Update` |

## 3. Detailed differences

The zero-versus-1 MissingDefaultResponse difference comprises 1 confirmed response-key-selector false negatives on saved wire operations and 0 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/iothub/resource-manager/Microsoft.Devices/IoTHub/IotHubDescription.tsp#L99):

```typespec
/**
   * Update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method
   */
  #suppress "@azure-tools/typespec-azure-core/invalid-final-state" "Final-state-via location is retained to match the published LRO behavior of this tags update operation."
  @summary("Update an existing IoT Hubs tags.")
  @tag("PATCH")
  @patch(#{ implicitOptionality: false })
  @Azure.Core.useFinalStateVia("location")
  update is ArmCustomPatchAsync<
    IotHubDescription,
    PatchModel = TagsResource,
    Response = ArmResponse<IotHubDescription> &
      ArmCombinedLroHeaders<FinalResult = IotHubDescription> &
      Azure.Core.Foundations.RetryAfterHeader,
    Error = never
  >
```

The corresponding `PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}` saved response map has no default:

```json
{
  "200": {
    "description": "The request has succeeded.",
    "schema": {
      "$ref": "#/definitions/IotHubDescription"
    },
    "headers": {
      "Azure-AsyncOperation": {
        "type": "string",
        "format": "uri",
        "description": "A link to the status monitor"
      },
      "Location": {
        "type": "string",
        "description": "The Location header contains the URL where the status of the long running operation can be checked."
      },
      "Retry-After": {
        "type": "integer",
        "format": "int32",
        "description": "The Retry-After header can indicate how long the client should wait before polling the operation status."
      }
    }
  }
}
```

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-277.json), [concrete operation correspondence](evidence/correspondence/specification--iothub--resource-manager--Microsoft.Devices--IoTHub.json), [historical production registration/completion](evidence/full-validator-provenance.json).

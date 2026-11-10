# IoT Hub: default-response comparison

## 1. Scope

Project: `specification/iothub/resource-manager/Microsoft.Devices/IoTHub`; saved Swagger API `2026-10-01-preview`.

Native candidate: `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core: `8574d5453f7bf9a07dc09bd41edac579af71d94b`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. This is one project in the approved five-project pilot, not full-repository validation.

**Assessed:** 1 legacy/native matched findings; 0 legacy-only and 0 native-only findings for `RequiredDefaultResponse`. Separately, `MissingDefaultResponse` has 1 native-only findings caused by the confirmed selector defect.

Historical Swagger execution is reused from sealed baseline `swagger-arm-20261026-2cd3c5dd`; Swagger was not regenerated or rerun. Fresh native execution uses `target-only`, `scope: source`, explicitly enabling only the new rule. Existing rule diagnostics are not added to its count; source suppressions remain in effect. Default activation and selected-version projection are not assessed. The source and saved Swagger are not assumed version-aligned merely because their findings match.

Population: 40 concrete authored source operations (37 service operations), versus 38 saved emitted operations. These populations can differ even when diagnostic correspondence is exact.

Execution evidence: [selection](selection.json), [baseline verification](evidence/baseline-verification.json), [native receipt](evidence/iot-hub/native.json), [saved member findings](evidence/iot-hub/saved-findings.json), [successful historical production logs](evidence/iot-hub/saved-validator-provenance.json), [operation correspondence](evidence/iot-hub/correspondence.json), [tested Swagger](evidence/iot-hub/tested-swagger-1.json).

## 2. Difference inventory

Counts are diagnostics, not project counts. `N` is the same shared native execution for each member comparison; do not sum it twice.

| Swagger member          | Saved Swagger S | Fresh native N | N - S | Absolute difference | Absolute difference / max(S,N) |
| ----------------------- | --------------: | -------------: | ----: | ------------------: | -----------------------------: |
| MissingDefaultResponse  |               0 |              1 |     1 |                   1 |                          1.000 |
| RequiredDefaultResponse |               1 |              1 |     0 |                   0 |                          0.000 |

| Concrete operation / TypeSpec source                                                                                                                                                                                                  | HTTP method | Saved Swagger operation | Native statuses | RequiredDefaultResponse | MissingDefaultResponse | TypeSpec |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------- | --------------- | ----------------------- | ---------------------- | -------- |
| [`Microsoft.Devices.IotHubDescriptions.update`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/iothub/resource-manager/Microsoft.Devices/IoTHub/IotHubDescription.tsp#L99) | PATCH       | `IotHubResource_Update` | `200`           | Reported                | Not reported           | Reported |

## 3. Detailed differences

### Case: absent fallback, independently detected by the legacy and native checks

**RequiredDefaultResponse:** 1 matched findings, with no Swagger-only or native-only findings. The audit verifies the route, HTTP verb, concrete authored operation, absent native `"*"` status, and missing saved Swagger `default`. Every native finding maps to exactly one selected historical finding.

**MissingDefaultResponse:** 1 native-only findings. The saved production logs prove that this Spectral rule was selected and completed, yet it emitted none. Its response-key selector tests nonempty status-key strings rather than the response map. This is an intentional correction of a Swagger false negative, not an unexplained TypeSpec gap.

#### TypeSpec code

Representative exact authored declaration: [`IotHubDescription.tsp:99`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/iothub/resource-manager/Microsoft.Devices/IoTHub/IotHubDescription.tsp#L99). The surrounding imports/interface are not reproduced.

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

Resolved native statuses: `200`. No `"*"` fallback is present.

#### Swagger code

Representative exact response map for `IotHubResource_Update`, PATCH `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}`, from the [tested Swagger](evidence/iot-hub/tested-swagger-1.json). JSON pointer: `/paths/~1subscriptions~1{subscriptionId}~1resourceGroups~1{resourceGroupName}~1providers~1Microsoft.Devices~1IotHubs~1{resourceName}/patch/responses`.

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

The map has no `default` key. The legacy predicate reports it; the Spectral key-selector defect misses it. This report does not propose modifying the service specification.

## 4. Coverage gaps and disposition

- **RequiredDefaultResponse:** no coverage gap observed in this project. Correspondence is operation-based, not inferred from equal totals. Source-only versus selected-API populations, compiler-prevented malformed responses, and default activation remain separate boundaries.
- **MissingDefaultResponse:** the native rule detects 1 missing fallbacks that the selected Swagger implementation misses. Keep the intended native policy; do not reproduce the selector defect.
- **Independent rules:** overlapping PUT/POST/DELETE or missing-error rules may report additional diagnostics when enabled. No cross-rule deduplication is applied.
- **Recommendation:** retain the current shared rule. This pilot alone does not authorize or certify full-corpus validation.

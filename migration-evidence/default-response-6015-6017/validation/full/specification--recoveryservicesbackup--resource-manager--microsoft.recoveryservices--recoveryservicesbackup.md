# Microsoft.RecoveryServices/RecoveryServicesBackup: full default-response comparison

## 1. Scope

Project: `specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup`; saved Swagger API `2026-10-01`.

This project is assessed as part of the complete 487-project frozen corpus. Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core `8574d5453f7bf9a07dc09bd41edac579af71d94b`; specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Fresh native execution is target-only, source scope, with authored suppressions retained. Saved production Swagger execution is reused; no Swagger regeneration or fresh Swagger validation occurred.

## 2. Difference inventory

| Swagger member | Saved Swagger S | Fresh native N | N - S | Absolute difference / max(S,N) |
| --- | ---: | ---: | ---: | ---: |
| MissingDefaultResponse | 0 | 56 | 56 | 1.000 |
| RequiredDefaultResponse | 0 | 56 | 56 | 1.000 |

0 findings match one-to-one by concrete authored location, HTTP route/verb and a saved response map without a default. There are 56 additional native-only non-service source findings, zero Swagger-only findings and zero ambiguous witnesses against RequiredDefaultResponse. The same shared native findings are compared independently to both members, not counted twice.

| TypeSpec source | Concrete operation | HTTP method | Saved Swagger operation |
| --- | --- | --- | --- |
| [`client.tsp:660`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L660) | `.backupResourceStorageConfigsNonCRRGet` | GET | No saved operation; non-service source |
| [`client.tsp:717`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L717) | `.backupResourceStorageConfigsNonCRRUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:687`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L687) | `.backupResourceStorageConfigsNonCRRPatch` | POST | No saved operation; non-service source |
| [`client.tsp:747`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L747) | `.backupResourceStorageConfigsNonCRRBmsPrepareDataMove` | POST | No saved operation; non-service source |
| [`client.tsp:777`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L777) | `.backupResourceStorageConfigsNonCRRBmsTriggerDataMove` | POST | No saved operation; non-service source |
| [`client.tsp:474`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L474) | `.bmsPrepareDataMoveOperationResultGet` | GET | No saved operation; non-service source |
| [`client.tsp:1121`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1121) | `.backupResourceConfigOperationStatusesGetOperationStatus` | GET | No saved operation; non-service source |
| [`client.tsp:1878`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1878) | `.protectionIntentResourcesGet` | GET | No saved operation; non-service source |
| [`client.tsp:1815`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1815) | `.protectionIntentResourcesCreateOrUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:1848`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1848) | `.protectionIntentResourcesDelete` | GET | No saved operation; non-service source |
| [`client.tsp:807`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L807) | `.backupResourceVaultConfigsGet` | GET | No saved operation; non-service source |
| [`client.tsp:833`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L833) | `.backupResourceVaultConfigsPut` | POST | No saved operation; non-service source |
| [`client.tsp:865`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L865) | `.backupResourceVaultConfigsUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:603`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L603) | `.backupResourceEncryptionConfigsGet` | GET | No saved operation; non-service source |
| [`client.tsp:629`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L629) | `.backupResourceEncryptionConfigsUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:1350`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1350) | `.privateEndpointConnectionResourcesGet` | GET | No saved operation; non-service source |
| [`client.tsp:1376`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1376) | `.privateEndpointConnectionResourcesPut` | POST | No saved operation; non-service source |
| [`client.tsp:1407`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1407) | `.privateEndpointConnectionResourcesDelete` | GET | No saved operation; non-service source |
| [`client.tsp:1434`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1434) | `.privateEndpointOperationStatusesGetOperationStatus` | GET | No saved operation; non-service source |
| [`client.tsp:1617`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1617) | `.protectedItemsGet` | POST | No saved operation; non-service source |
| [`client.tsp:1543`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1543) | `.protectedItemsCreateOrUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:1583`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1583) | `.protectedItemsDelete` | GET | No saved operation; non-service source |
| [`client.tsp:936`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L936) | `.backupsTrigger` | POST | No saved operation; non-service source |
| [`client.tsp:1083`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1083) | `.recoveryPointsRecommendedForMoveList` | POST | No saved operation; non-service source |
| [`client.tsp:1504`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1504) | `.protectedItemOperationStatusesGet` | GET | No saved operation; non-service source |
| [`client.tsp:1465`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1465) | `.protectedItemOperationResultsGet` | GET | No saved operation; non-service source |
| [`client.tsp:1719`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1719) | `.protectionContainersGet` | GET | No saved operation; non-service source |
| [`client.tsp:1686`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1686) | `.protectionContainersRegister` | POST | No saved operation; non-service source |
| [`client.tsp:1784`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1784) | `.protectionContainersUnregister` | GET | No saved operation; non-service source |
| [`client.tsp:1749`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1749) | `.protectionContainersInquire` | POST | No saved operation; non-service source |
| [`client.tsp:898`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L898) | `.backupWorkloadItemsList` | POST | No saved operation; non-service source |
| [`client.tsp:1651`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1651) | `.protectionContainerOperationResultsGet` | GET | No saved operation; non-service source |
| [`client.tsp:970`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L970) | `.recoveryPointsGet` | GET | No saved operation; non-service source |
| [`client.tsp:1004`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1004) | `.recoveryPointsList` | POST | No saved operation; non-service source |
| [`client.tsp:1041`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1041) | `.recoveryPointsMoveRecoveryPoint` | POST | No saved operation; non-service source |
| [`client.tsp:2159`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2159) | `.restoresTrigger` | POST | No saved operation; non-service source |
| [`client.tsp:1183`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1183) | `.itemLevelRecoveryConnectionsProvision` | POST | No saved operation; non-service source |
| [`client.tsp:1224`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1224) | `.itemLevelRecoveryConnectionsRevoke` | POST | No saved operation; non-service source |
| [`client.tsp:1909`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1909) | `.protectionPoliciesGet` | GET | No saved operation; non-service source |
| [`client.tsp:1935`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1935) | `.protectionPoliciesCreateOrUpdate` | POST | No saved operation; non-service source |
| [`client.tsp:1967`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1967) | `.protectionPoliciesDelete` | GET | No saved operation; non-service source |
| [`client.tsp:578`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L578) | `.backupPoliciesList` | POST | No saved operation; non-service source |
| [`client.tsp:1994`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1994) | `.protectionPolicyOperationResultsGet` | GET | No saved operation; non-service source |
| [`client.tsp:2200`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2200) | `.protectionPolicyOperationStatusesGet` | GET | No saved operation; non-service source |
| [`client.tsp:1296`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1296) | `.jobDetailsGet` | GET | No saved operation; non-service source |
| [`client.tsp:555`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L555) | `.backupJobsList` | POST | No saved operation; non-service source |
| [`client.tsp:1266`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1266) | `.jobCancellationsTrigger` | POST | No saved operation; non-service source |
| [`client.tsp:1319`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1319) | `.jobOperationResultsGet` | GET | No saved operation; non-service source |
| [`client.tsp:1152`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L1152) | `.exportJobsOperationResultsGet` | GET | No saved operation; non-service source |
| [`client.tsp:505`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L505) | `.backupEnginesGet` | POST | No saved operation; non-service source |
| [`client.tsp:532`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L532) | `.backupEnginesList` | POST | No saved operation; non-service source |
| [`client.tsp:2074`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2074) | `.resourceGuardProxyGet` | GET | No saved operation; non-service source |
| [`client.tsp:2100`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2100) | `.resourceGuardProxyPut` | POST | No saved operation; non-service source |
| [`client.tsp:2048`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2048) | `.resourceGuardProxyDelete` | GET | No saved operation; non-service source |
| [`client.tsp:2129`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2129) | `.resourceGuardProxyUnlockDelete` | POST | No saved operation; non-service source |
| [`client.tsp:2025`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L2025) | `.resourceGuardProxiesGet` | GET | No saved operation; non-service source |

## 3. Detailed differences

The zero-versus-56 MissingDefaultResponse difference comprises 0 confirmed response-key-selector false negatives on saved wire operations and 56 source-only non-service operations outside the saved Swagger population. Do not label source-only declarations as Swagger false negatives. Both historical rules were registered and their production validators completed successfully.

Example [authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/RecoveryServicesBackup/client.tsp#L660):

```typespec
#suppress "@azure-tools/typespec-azure-resource-manager/use-operation-decorator" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-api-version" "FIXME: review suppression and update justification"
#suppress "@azure-tools/typespec-azure-resource-manager/use-interface" "customization"
#suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
#suppress "@azure-tools/typespec-azure-core/casing-style" "override"
op backupResourceStorageConfigsNonCRRGet(
  ...ApiVersionParameter,
  ...SubscriptionIdParameter,
  ...Azure.ResourceManager.ProviderNamespace<BackupResourceConfigResource>,

  #suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
  @path
  vaultName: string,

  ...ResourceGroupParameter,

  #suppress "@azure-tools/typespec-azure-core/documentation-required" "override"
  @path
  backupstorageconfig: string,
): BackupResourceConfigResource;
```

This operation is not in the compiler's HTTP service operation set, and no saved Swagger operation matches its derived route/verb. Its response metadata lacks a default. It is a non-service SDK customization/compatibility declaration, not a missing fallback on a saved wire operation. Derived HTTP metadata is not evidence that the operation was emitted.

The complete correspondence retains every source signature, service-membership result, derived HTTP response status and any HTTP route-resolution diagnostics for non-service declarations. Default activation remains unassessed; these results do not quantify overlap with other enabled rules.

Evidence: [native receipt](evidence/native/native-389.json), [concrete operation correspondence](evidence/correspondence/specification--recoveryservicesbackup--resource-manager--Microsoft.RecoveryServices--RecoveryServicesBackup.json), [historical production registration/completion](evidence/full-validator-provenance.json).

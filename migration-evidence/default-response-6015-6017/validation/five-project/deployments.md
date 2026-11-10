# Deployments: default-response comparison

## 1. Scope

Project: `specification/resources/resource-manager/Microsoft.Resources/deployments`; saved Swagger API `2026-06-01`.

Native candidate: `071afdea846ea0898e03a4d59f2c67bfa5a68266`; core: `8574d5453f7bf9a07dc09bd41edac579af71d94b`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. This is one project in the approved five-project pilot, not full-repository validation.

**Assessed:** 0 legacy/native matched findings; 0 legacy-only and 0 native-only findings for `RequiredDefaultResponse`. Separately, `MissingDefaultResponse` has 0 native-only findings caused by the confirmed selector defect.

Historical Swagger execution is reused from sealed baseline `swagger-arm-20261026-2cd3c5dd`; Swagger was not regenerated or rerun. Fresh native execution uses `target-only`, `scope: source`, explicitly enabling only the new rule. Existing rule diagnostics are not added to its count; source suppressions remain in effect. Default activation and selected-version projection are not assessed. The source and saved Swagger are not assumed version-aligned merely because their findings match.

Population: 55 concrete authored source operations (55 service operations), versus 55 saved emitted operations. These populations can differ even when diagnostic correspondence is exact.

Execution evidence: [selection](selection.json), [baseline verification](evidence/baseline-verification.json), [native receipt](evidence/deployments/native.json), [saved member findings](evidence/deployments/saved-findings.json), [successful historical production logs](evidence/deployments/saved-validator-provenance.json), [operation correspondence](evidence/deployments/correspondence.json), [tested Swagger](evidence/deployments/tested-swagger-1.json).

## 2. Difference inventory

Counts are diagnostics, not project counts. `N` is the same shared native execution for each member comparison; do not sum it twice.

| Swagger member          | Saved Swagger S | Fresh native N | N - S | Absolute difference | Absolute difference / max(S,N) |
| ----------------------- | --------------: | -------------: | ----: | ------------------: | -----------------------------: |
| MissingDefaultResponse  |               0 |              0 |     0 |                   0 |                          0.000 |
| RequiredDefaultResponse |               0 |              0 |     0 |                   0 |                          0.000 |

No differing operations. Both Swagger member counts and the fresh native count are zero.

## 3. Detailed differences

### Compliant controls

No differing findings were observed. Saved Swagger and fresh native metadata both contain a fallback for all assessed service-operation controls below.

| Authored operation                                                                                                                                                                                                                                                                               | Native statuses | Default present |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | --------------- |
| [`Microsoft.Resources.Deployments.checkExistenceAtScope`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/resources/resource-manager/Microsoft.Resources/deployments/DeploymentExtended.tsp#L74)                                       | `204, 404, "*"` | Yes             |
| [`Microsoft.Resources.DeploymentsExtendedTenant.checkExistenceAtTenantScope`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/resources/resource-manager/Microsoft.Resources/deployments/DeploymentExtended.tsp#L253)                  | `204, 404, "*"` | Yes             |
| [`Microsoft.Resources.DeploymentExtendedManagementGroup.checkExistenceAtManagementGroupScope`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/resources/resource-manager/Microsoft.Resources/deployments/DeploymentExtended.tsp#L451) | `204, 404, "*"` | Yes             |
| [`Microsoft.Resources.DeploymentExtendedSubscriptionGroup.checkExistenceAtSubscriptionScope`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/resources/resource-manager/Microsoft.Resources/deployments/DeploymentExtended.tsp#L643)  | `204, 404, "*"` | Yes             |
| [`Microsoft.Resources.DeploymentExtendedOperationGroup.checkExistence`](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/resources/resource-manager/Microsoft.Resources/deployments/DeploymentExtended.tsp#L839)                        | `204, 404, "*"` | Yes             |

Deployments supplies five HEAD operations with `204`, `404`, and default responses. They produce no missing-default warnings. A separate injected HEAD control without a fallback does produce one warning; this rule has no HEAD exemption.

A zero result from the buggy Spectral rule alone does not prove compliance. Here, compliance is supported independently by the saved response maps and fresh native status metadata.

## 4. Coverage gaps and disposition

- **RequiredDefaultResponse:** no coverage gap observed in this project. Correspondence is operation-based, not inferred from equal totals. Source-only versus selected-API populations, compiler-prevented malformed responses, and default activation remain separate boundaries.
- **MissingDefaultResponse:** no differing findings in this project; zero/zero does not establish equivalence to the defective Swagger selector. The violating projects and injected controls distinguish the implementations.
- **Independent rules:** overlapping PUT/POST/DELETE or missing-error rules may report additional diagnostics when enabled. No cross-rule deduplication is applied.
- **Recommendation:** retain the current shared rule. This pilot alone does not authorize or certify full-corpus validation.

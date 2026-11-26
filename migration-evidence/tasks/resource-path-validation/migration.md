# Resource path validation migration

## 1. Scope

The opt-in TypeSpec rule `@azure-tools/typespec-azure-resource-manager/resource-path-validation` covers five Swagger rules: `PathContainsResourceType`, `PathForNestedResource`, `PathForTrackedResourceTypes`, `PathResourceProviderNamePascalCase`, and `PathResourceProviderMatchNamespace`.

This report records the **latest completed full suitable-service validation**, not a final resolution of every gap. The comparison uses TypeSpec Azure candidate `0e9615c43f864c0c63d278e00cf3bdffe9ec21bd`, TypeSpec core `123e997958ced3b632caa0a4486e306d1487ca82`, and [azure-rest-api-specs `1775cd6359369f2e5092d08ada94b4b4c1b8acba`](https://github.com/Azure/azure-rest-api-specs/tree/1775cd6359369f2e5092d08ada94b4b4c1b8acba).

**Revision caveat:** The candidate includes a committed parent-scope fix that was not on the PR head when this report was prepared. A subsequent local inherited-operation fix passed its focused regression test but was not included in this full run. Neither change is reflected in the counts below for the PR's earlier head.

## 2. Coverage

The run assessed all **56 TypeSpec projects** on the [pinned suitable-service list](https://github.com/markcowl/azure-rest-api-specs/blob/30a602e9e17f834fb9de6c3f500dbc1a5f2447cb/documentation/typespec-arm-resource-data/Report_20261106/provisioning-validation-services.md#services-suitable-for-validation). It compared unprojected TypeSpec source with **57 selected Swagger documents**: the latest stable API version for each project, or the latest preview for four projects without stable Swagger. Eight projects had findings.

| Metric | Result |
| --- | ---: |
| Swagger diagnostic instances | 102 |
| Distinct Swagger route/rule pairs | 102 |
| TypeSpec diagnostic instances | 109 |
| Matched route/rule pairs | 97 |
| Swagger-only route/rule pairs | 5 |
| TypeSpec-only route/rule pairs | 12 |

| Swagger rule | Swagger route/rule pairs | TypeSpec diagnostics | Matched pairs |
| --- | ---: | ---: | ---: |
| PathContainsResourceType | 0 | 0 | 0 |
| PathForNestedResource | 1 | 8 | 0 |
| PathForTrackedResourceTypes | 3 | 0 | 0 |
| PathResourceProviderNamePascalCase | 98 | 101 | 97 |
| PathResourceProviderMatchNamespace | 0 | 0 | 0 |

Matching uses the literal route and corresponding rule category; it does not establish operation-level or API-version equivalence. Diagnostic instances and distinct pairs are different measures. No findings in this population do not prove complete coverage.

### Projects with findings

| Project | Selected Swagger version | Swagger pairs | TypeSpec diagnostics | Matched | Swagger-only | TypeSpec-only |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Attestation | 2021-06-01 | 1 | 0 | 0 | 1 | 0 |
| Load Testing | 2022-12-01 | 0 | 1 | 0 | 0 | 1 |
| Machine Learning | 2026-09-01 | 0 | 3 | 0 | 0 | 3 |
| MySQL | 2024-12-30 | 46 | 48 | 46 | 0 | 2 |
| PostgreSQL | 2026-10-01 | 52 | 53 | 51 | 1 | 2 |
| Recovery Services | 2026-11-01 | 1 | 0 | 0 | 1 | 0 |
| Redis | 2024-11-01 | 0 | 4 | 0 | 0 | 4 |
| Resource Health | 2026-07-01 | 2 | 0 | 0 | 2 | 0 |

The remaining 48 listed projects had no findings for these five checks in this run.

## 3. Why diagnostic counts differ

The completed run found **5 Swagger-only** and **12 TypeSpec-only** route/rule pairs across the five checks.

### Overall gap categories

- **API-version mismatches:** Seven TypeSpec-only pairs result from validating unprojected TypeSpec source against selected Swagger versions. These are tracked by [#5875](https://github.com/Azure/typespec-azure/issues/5875).

| Swagger rule | Service | TypeSpec-only route(s) | Selected Swagger | TypeSpec source/version difference | Count |
| --- | --- | --- | --- | --- | ---: |
| PathResourceProviderNamePascalCase | MySQL | `.../fabricMirroringSettings/{fabricMirroringSettingsName}`; `.../fabricMirroringSettings` | `2024-12-30` | Fabric Mirroring routes added in `2025-12-01-preview`, after the selected Swagger version | 2 |
| PathResourceProviderNamePascalCase | PostgreSQL | `.../dbAgents`; `.../dbAgents/Default` | `2026-10-01` | `dbAgents` routes added in `2026-07-01` and removed in the selected version | 2 |
| PathForNestedResource | Machine Learning | `.../inferencePools/{poolName}/endpoints/{endpointName}`; `.../inferencePools/{poolName}/groups/{groupName}` | `2026-09-01` | Inference operations are absent from selected stable Swagger and reintroduced in a preview version; these routes also have parent-placeholder differences | 2 |
| PathForNestedResource | Load Testing | `.../limits/maxMonthlyVirtualUserHours` | `2022-12-01` | Route added in `2024-12-01-preview`; its literal name also lacks singleton metadata ([model](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/loadtestservice/resource-manager/Microsoft.LoadTestService/loadtesting/models.tsp#L212-L225)) | 1 |

- **Rule behavior on shared routes (10 pairs):** 5 Swagger-only and 5 TypeSpec-only, detailed by rule below.

### PathContainsResourceType

**Result:** 0 Swagger findings, 0 TypeSpec diagnostics, and no unmatched pairs. No findings in this population do not establish parity.

### PathForNestedResource

**Result:** 1 Swagger pair, 8 TypeSpec diagnostics, 0 matched pairs; 1 Swagger-only and 8 TypeSpec-only pairs (3 of the latter are counted under API-version mismatch).

| Case | Swagger-only | TypeSpec-only | Analysis |
| --- | ---: | ---: | --- |
| Recovery Services singleton | 1 | 0 | Swagger rejects the literal name in `/vaults/{vaultName}/extendedInformation/vaultExtendedInfo`; TypeSpec resolves an explicitly declared [`@singleton("vaultExtendedInfo")`](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/RecoveryServices/VaultExtendedInfoResource.tsp#L16-L26) under `Vault` and accepts that name. This is a metadata-aware divergence if named singletons are valid. |
| Redis and Machine Learning placeholder names | 0 | 5 | Four Redis paths and the Machine Learning Feature path use different placeholder names from their resolved parents. Literal prefix comparison produces probable TypeSpec false positives despite equivalent parameter positions. |

An earlier candidate produced one additional TypeSpec-only Resource Health nested-path warning. The parent-scope fix in `0e9615c43` removed it; no native route/rule pairs were added in that before/after comparison.

### PathForTrackedResourceTypes

**Result:** 3 Swagger pairs, 0 TypeSpec diagnostics, 0 matched pairs; 3 Swagger-only and 0 TypeSpec-only pairs.

| Case | Swagger-only | TypeSpec-only | Analysis |
| --- | ---: | ---: | --- |
| Attestation default provider | 1 | 0 | Swagger flags the [GET](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/attestation/resource-manager/Microsoft.Attestation/Attestation/routes.tsp#L31-L40) because its response inherits `location`. TypeSpec identifies it as a provider action returning a tracked model, not a tracked-resource lifecycle GET. This is a semantic difference; the intended policy for such actions needs confirmation. |
| Resource Health availability statuses | 2 | 0 | Swagger sees `location` in the proxy response schema and flags two extension-status GET paths. TypeSpec does not classify these operations as tracked-resource lifecycle paths. These appear to be Swagger overclassifications; confirm the intended policy. |

### PathResourceProviderNamePascalCase

**Result:** 98 Swagger pairs, 101 TypeSpec diagnostics, 97 matched pairs; 1 Swagger-only and 4 TypeSpec-only pairs (all 4 counted under API-version mismatch).

| Case | Swagger-only | TypeSpec-only | Analysis |
| --- | ---: | ---: | --- |
| PostgreSQL `/providers/Microsoft.DBforPostgreSQL/operations` | 1 | 0 | The [service interface](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/PostgreSql/main.tsp#L74-L78) inherits `list` from an ARM library interface. The validated candidate filters the operation by its library namespace, so the warning is omitted. A local follow-up addresses this and passes a focused regression, but has not had a full rerun. |

### PathResourceProviderMatchNamespace

**Result:** 0 Swagger findings, 0 TypeSpec diagnostics, and no unmatched pairs. No findings in this population do not establish parity.

## 4. Function-level coverage

| Behavior | Result in completed run | Interpretation |
| --- | --- | --- |
| Resource type path | 0 Swagger / 0 TypeSpec | No observed findings; this is not proof of equivalence. |
| Nested resource path | 1 Swagger / 8 TypeSpec | See [overall gap categories](#overall-gap-categories) and [shared-route cases](#pathfornestedresource). |
| Tracked-resource scope | 3 Swagger / 0 TypeSpec | Swagger's response-location heuristic and TypeSpec's lifecycle metadata differ. |
| Provider PascalCase | 98 Swagger / 101 TypeSpec; 97 matched pairs | See [overall gap categories](#overall-gap-categories) and the [inherited-operation gap](#pathresourceprovidernamedpascalcase). |
| Provider namespace match | 0 Swagger / 0 TypeSpec | No observed findings; this is not proof of equivalence. |

## 5. Method and limitations

- The native rule was explicitly enabled; authored TypeSpec suppressions were retained. Swagger README suppressions were not applied.
- Swagger used OpenAPI validator 2.2.4, rulesets 2.2.6, validator core 1.0.7 and AutoRest launcher 3.8.0. The exact AutoRest core selected at runtime was not independently recorded.
- The full rerun compiled all 56 TypeSpec projects against the candidate and reused the prior Swagger results at the same specs revision after checking cached receipts, selected rules, and input/output hashes.
- This is one selected API version per suitable project, not all historical versions or the entire specs repository. Unprojected source versus selected Swagger and differing suppression policies limit parity conclusions.
- The earlier member notes and [evidence details](evidence-details.md) describe preliminary source analysis and focused checks; they do not contain this later full-run data.

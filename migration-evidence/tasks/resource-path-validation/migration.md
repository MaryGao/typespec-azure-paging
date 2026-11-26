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

| Gap | Swagger rule(s) | Affected services and routes | Swagger-only | TypeSpec-only | Cause / status |
| --- | --- | --- | ---: | ---: | --- |
| API-version mismatch | [Provider casing](#pathresourceprovidernamedpascalcase), [nested paths](#pathfornestedresource) | MySQL Fabric Mirroring (2), PostgreSQL `dbAgents` (2), Machine Learning inference (2), Load Testing limit (1) | 0 | 7 | Unprojected TypeSpec includes routes absent from the selected Swagger versions. Tracked in [#5875](https://github.com/Azure/typespec-azure/issues/5875). |
| Inherited operation skipped | [Provider casing](#pathresourceprovidernamedpascalcase) | PostgreSQL `/providers/Microsoft.DBforPostgreSQL/operations` | 1 | 0 | The candidate filters the [inherited `list` operation](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/PostgreSql/main.tsp#L74-L78) by its library namespace. The local fix passed a focused regression; no full rerun yet. |
| Named singleton | [Nested paths](#pathfornestedresource) | Recovery Services `/vaults/{vaultName}/extendedInformation/vaultExtendedInfo` | 1 | 0 | Swagger rejects the literal name; TypeSpec accepts the declared [`@singleton("vaultExtendedInfo")`](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/RecoveryServices/VaultExtendedInfoResource.tsp#L16-L26). |
| Parent placeholder names | [Nested paths](#pathfornestedresource) | Redis child routes (4), Machine Learning Feature (1) | 0 | 5 | TypeSpec compares parent prefixes literally and flags equivalent parameter positions with different names. Likely TypeSpec false positives. |
| Tracked-resource classification | [Tracked scope](#pathfortrackedresourcetypes) | [Attestation default provider](https://github.com/Azure/azure-rest-api-specs/blob/1775cd6359369f2e5092d08ada94b4b4c1b8acba/specification/attestation/resource-manager/Microsoft.Attestation/Attestation/routes.tsp#L31-L40) (1), Resource Health availability statuses (2) | 3 | 0 | Swagger flags responses with `location`; TypeSpec checks tracked-resource lifecycle paths. Attestation is a provider action; Resource Health returns a proxy model. Policy confirmation pending. |
| **Total** | | | **5** | **12** | |

### PathContainsResourceType

**Result:** 0 Swagger findings, 0 TypeSpec diagnostics, and no unmatched pairs. No findings in this population do not establish parity.

### PathForNestedResource

**Result:** 1 Swagger pair, 8 TypeSpec diagnostics, 0 matched pairs; 1 Swagger-only and 8 TypeSpec-only pairs (3 of the latter are counted under API-version mismatch).

An earlier candidate produced one additional TypeSpec-only Resource Health nested-path warning. The parent-scope fix in `0e9615c43` removed it; no native route/rule pairs were added in that before/after comparison.

### PathForTrackedResourceTypes

**Result:** 3 Swagger pairs, 0 TypeSpec diagnostics, 0 matched pairs; 3 Swagger-only and 0 TypeSpec-only pairs.

### PathResourceProviderNamePascalCase

**Result:** 98 Swagger pairs, 101 TypeSpec diagnostics, 97 matched pairs; 1 Swagger-only and 4 TypeSpec-only pairs (all 4 counted under API-version mismatch).

### PathResourceProviderMatchNamespace

**Result:** 0 Swagger findings, 0 TypeSpec diagnostics, and no unmatched pairs. No findings in this population do not establish parity.

## 4. Function-level coverage

| Behavior | Result in completed run | Interpretation |
| --- | --- | --- |
| Resource type path | 0 Swagger / 0 TypeSpec | No observed findings; this is not proof of equivalence. |
| Nested resource path | 1 Swagger / 8 TypeSpec | API-version, singleton, and parent-placeholder differences. |
| Tracked-resource scope | 3 Swagger / 0 TypeSpec | Swagger's response-location heuristic and TypeSpec's lifecycle metadata differ. |
| Provider PascalCase | 98 Swagger / 101 TypeSpec; 97 matched pairs | API-version mismatch and one skipped inherited operation. |
| Provider namespace match | 0 Swagger / 0 TypeSpec | No observed findings; this is not proof of equivalence. |

## 5. Method and limitations

- The native rule was explicitly enabled; authored TypeSpec suppressions were retained. Swagger README suppressions were not applied.
- Swagger used OpenAPI validator 2.2.4, rulesets 2.2.6, validator core 1.0.7 and AutoRest launcher 3.8.0. The exact AutoRest core selected at runtime was not independently recorded.
- The full rerun compiled all 56 TypeSpec projects against the candidate and reused the prior Swagger results at the same specs revision after checking cached receipts, selected rules, and input/output hashes.
- This is one selected API version per suitable project, not all historical versions or the entire specs repository. Unprojected source versus selected Swagger and differing suppression policies limit parity conclusions.
- The earlier member notes and [evidence details](evidence-details.md) describe preliminary source analysis and focused checks; they do not contain this later full-run data.

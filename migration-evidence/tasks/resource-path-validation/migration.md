# Resource path validation migration

## 1. Scope

The opt-in TypeSpec rule `@azure-tools/typespec-azure-resource-manager/resource-path-validation` in [PR #6163](https://github.com/Azure/typespec-azure/pull/6163) covers five Swagger rules: `PathContainsResourceType`, `PathForNestedResource`, `PathForTrackedResourceTypes`, `PathResourceProviderNamePascalCase`, and `PathResourceProviderMatchNamespace`.

This report records the **latest completed full suitable-service validation**, not a final resolution of every gap. The comparison uses TypeSpec Azure candidate `c96618b96d4de6901f87a69529025617c5e180fe`, TypeSpec core `123e997958ced3b632caa0a4486e306d1487ca82`, and [azure-rest-api-specs `1775cd6359369f2e5092d08ada94b4b4c1b8acba`](https://github.com/Azure/azure-rest-api-specs/tree/1775cd6359369f2e5092d08ada94b4b4c1b8acba).

**Revision caveat:** Both fixes are committed and included in this full run, but have not been pushed to the PR. These results apply to candidate `c96618b96`, not the PR's earlier head.

## 2. Coverage

The run assessed all **56 TypeSpec projects** on the [pinned suitable-service list](https://github.com/markcowl/azure-rest-api-specs/blob/30a602e9e17f834fb9de6c3f500dbc1a5f2447cb/documentation/typespec-arm-resource-data/Report_20261106/provisioning-validation-services.md#services-suitable-for-validation). It compared unprojected TypeSpec source with **57 selected Swagger documents**: the latest stable API version for each project, or the latest preview for four projects without stable Swagger. Eight projects had findings.

| Metric | Result |
| --- | ---: |
| Swagger diagnostic instances | 102 |
| Distinct Swagger route/rule pairs | 102 |
| TypeSpec diagnostic instances | 110 |
| Matched route/rule pairs | 98 |
| Swagger-only route/rule pairs | 4 |
| TypeSpec-only route/rule pairs | 12 |

| Swagger rule | Swagger route/rule pairs | TypeSpec diagnostics | Matched pairs |
| --- | ---: | ---: | ---: |
| PathContainsResourceType | 0 | 0 | 0 |
| PathForNestedResource | 1 | 8 | 0 |
| PathForTrackedResourceTypes | 3 | 0 | 0 |
| PathResourceProviderNamePascalCase | 98 | 102 | 98 |
| PathResourceProviderMatchNamespace | 0 | 0 | 0 |

All 56 approved projects were assessed; none failed or were omitted. PostgreSQL's inherited-operation bug is resolved: the rerun added exactly one native route/rule pair and removed none. The 16 mismatches include one Swagger false positive for a named singleton. Other rule-behavior conclusions remain provisional. Matching uses literal route plus rule category, not operation-level or API-version equivalence.

### Projects with findings

| Project | Selected Swagger version | Swagger pairs | TypeSpec diagnostics | Matched | Swagger-only | TypeSpec-only |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Attestation | 2021-06-01 | 1 | 0 | 0 | 1 | 0 |
| Load Testing | 2022-12-01 | 0 | 1 | 0 | 0 | 1 |
| Machine Learning | 2026-09-01 | 0 | 3 | 0 | 0 | 3 |
| MySQL | 2024-12-30 | 46 | 48 | 46 | 0 | 2 |
| PostgreSQL | 2026-10-01 | 52 | 54 | 52 | 0 | 2 |
| Recovery Services | 2026-11-01 | 1 | 0 | 0 | 1 | 0 |
| Redis | 2024-11-01 | 0 | 4 | 0 | 0 | 4 |
| Resource Health | 2026-07-01 | 2 | 0 | 0 | 2 | 0 |

The remaining 48 listed projects had no findings for these five checks in this run.

## 3. Why diagnostic counts differ

The completed run found **4 Swagger-only** and **12 TypeSpec-only** route/rule pairs across the five checks.

### Overall gap categories

| Gap case | Analysis |
| --- | --- |
| [API-version mismatch (7 TypeSpec-only)](gap-evidence.md#api-version-mismatch-cases) | TypeSpec checks routes absent from the selected Swagger versions. Tracked in [#5875](https://github.com/Azure/typespec-azure/issues/5875). |
| [Named singleton (1 Swagger-only)](gap-evidence.md#named-singleton) | Swagger false positive: it flags the fixed name required by this Recovery Services singleton. TypeSpec correctly accepts it. |
| [Parent placeholder names (5 TypeSpec-only)](gap-evidence.md#parent-placeholder-names) | TypeSpec treats different placeholder names in the same position as a mismatch, likely producing false positives. |
| [Tracked-resource classification (3 Swagger-only)](gap-evidence.md#tracked-resource-classification) | Swagger uses response `location`; TypeSpec checks tracked-resource lifecycle paths. |

See the [gap evidence report](gap-evidence.md) for affected routes, counts, and source links.

**Reconciliation (Swagger minus TypeSpec):** `102 - 110 = -8 = -7 + 1 - 5 + 3`. The counting remainder is zero; this does not resolve the provisional policy conclusions. The [inherited-operation bug](gap-evidence.md#inherited-operation-skipped) is now matched and is excluded from the remaining gap counts.

### PathContainsResourceType

**Result:** 0 Swagger findings, 0 TypeSpec diagnostics, and no unmatched pairs. No findings in this population do not establish parity.

### PathForNestedResource

**Result:** 1 Swagger pair, 8 TypeSpec diagnostics, 0 matched pairs; 1 Swagger-only and 8 TypeSpec-only pairs (3 of the latter are counted under API-version mismatch).

An earlier candidate produced one additional TypeSpec-only Resource Health nested-path warning. The parent-scope fix in `0e9615c43` removed it; no native route/rule pairs were added in that before/after comparison.

### PathForTrackedResourceTypes

**Result:** 3 Swagger pairs, 0 TypeSpec diagnostics, 0 matched pairs; 3 Swagger-only and 0 TypeSpec-only pairs.

### PathResourceProviderNamePascalCase

**Result:** 98 Swagger pairs, 102 TypeSpec diagnostics, 98 matched pairs; 0 Swagger-only and 4 TypeSpec-only pairs (all 4 counted under API-version mismatch). The inherited-operation fix was confirmed in the full rerun.

### PathResourceProviderMatchNamespace

**Result:** 0 Swagger findings, 0 TypeSpec diagnostics, and no unmatched pairs. No findings in this population do not establish parity.

## 4. Function-level coverage

| Behavior | Result in completed run | Interpretation |
| --- | --- | --- |
| Resource type path | 0 Swagger / 0 TypeSpec | No observed findings; this is not proof of equivalence. |
| Nested resource path | 1 Swagger / 8 TypeSpec | One Swagger false positive for a named singleton; TypeSpec-only findings involve API versions and parent placeholder names. |
| Tracked-resource scope | 3 Swagger / 0 TypeSpec | Swagger's response-location heuristic and TypeSpec's lifecycle metadata differ. |
| Provider PascalCase | 98 Swagger / 102 TypeSpec; 98 matched pairs | Only API-version mismatches remain; the inherited-operation bug is resolved. |
| Provider namespace match | 0 Swagger / 0 TypeSpec | No observed findings; this is not proof of equivalence. |

## 5. Method and limitations

- The native rule was explicitly enabled; authored TypeSpec suppressions were retained. Swagger README suppressions were not applied.
- Swagger used OpenAPI validator 2.2.4, rulesets 2.2.6, validator core 1.0.7 and AutoRest launcher 3.8.0. The exact AutoRest core selected at runtime was not independently recorded.
- The full rerun compiled all 56 TypeSpec projects against the candidate and reused the prior Swagger results at the same specs revision after checking cached receipts, selected rules, and input/output hashes.
- [Published validation receipt summaries](validation-receipts.json) retain all target-rule findings, per-project counts, selected Swagger inputs, versions, and hashes. Machine-specific runtime paths are omitted.
- This is one selected API version per suitable project, not all historical versions or the entire specs repository. Unprojected source versus selected Swagger and differing suppression policies limit parity conclusions.
- The earlier member notes and [evidence details](evidence-details.md) describe preliminary source analysis and focused checks; they do not contain this later full-run data.

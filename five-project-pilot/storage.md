# Storage: DefaultInEnum comparison

## Scope

Project: `specification/storage/resource-manager/Microsoft.Storage/Storage`; saved API version `2026-09-01`. Thirty-two authored `.tsp` files, 1,092 retained project inputs, one primary saved Swagger document. Candidate `2f052caee34c4ba271e56a3e9754524b6d9216e1`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution explicitly enables the target rule in `target-only` source scope and retains source suppressions. Saved Swagger evidence is historical production execution, not fresh generation.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native worker | Success, exit 0 |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Primary Swagger enum/default sites / static violations | 6 / 0 |
| Attributable diagnostic differences | None observed |

## Detailed cases

Saved file: `swagger/stable/2026-09-01/openapi.json`; paths below are under `$.definitions`.

| Schema/property path | Default | Declared enum | Corroborating `models.tsp` line |
| --- | --- | --- | ---: |
| `Encryption.properties.keySource` | `"Microsoft.Storage"` | Microsoft.Storage, Microsoft.Keyvault | 3344 |
| `NetworkRuleSet.properties.bypass` | `"AzureServices"` | None, Logging, Metrics, AzureServices | 3472 |
| `NetworkRuleSet.properties.defaultAction` | `"Allow"` | Allow, Deny | 3500 |
| `SasPolicy.properties.expirationAction` | `"Log"` | Log, Block | 3292 |
| `StorageConnectorProperties.properties.state` | `"Active"` | Active, Inactive | 6508 |
| `StorageConnectorPropertiesUpdate.properties.state` | `"Active"` | Active, Inactive | 6562 |

All six defaults satisfy literal membership. Source declarations use named members: ``KeySource.`Microsoft.Storage` ``, `Bypass.AzureServices`, `DefaultAction.Allow`, `ExpirationAction.Log`, and `StorageConnectorState.Active`. `KeySource` is an extensible string union at `models.tsp:421`; these are useful real compliant examples, not deliberately violating cases.

The two `state` rows are distinct schema/property sites, not deduplicated because their value and property name match. The source lines corroborate the examples but are not an automated proof of selected-version semantic correspondence.

## Historical execution and evidence

The saved JSONL log shows production mode, active `DefaultInEnum` error severity for TypeSpec-generated documents, actual selected-document validation, and successful Spectral return. Both raw/stderr files were checked against the sealed baseline inventory. No target diagnostic was present.

[Worker input](evidence/storage/input.json) | [Native receipt](evidence/storage/native.json) | [Worker log](evidence/storage/worker.log) | [Exact saved enum/default values and schema hash](evidence/storage/saved-enum-defaults.json) | [Source hashes](evidence/storage/source-files.json) | [Historical log hashes, line-numbered excerpts, and source corroboration](evidence/storage/historical-validation.json)

No differing target findings require attribution; no real numeric or violating site is demonstrated. [Shared runtime verification, injected controls, intentional policy differences, and remaining gates](index.md). Matching zero findings do not establish equivalence, default activation, or release readiness.

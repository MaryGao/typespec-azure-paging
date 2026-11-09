# specification/storage/resource-manager/Microsoft.Storage/Storage: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-09-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/6 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["definitions","Encryption","properties","keySource"]` | `["Microsoft.Storage","Microsoft.Keyvault"]` | `"Microsoft.Storage"` |
| `openapi.json` | `["definitions","NetworkRuleSet","properties","bypass"]` | `["None","Logging","Metrics","AzureServices"]` | `"AzureServices"` |
| `openapi.json` | `["definitions","NetworkRuleSet","properties","defaultAction"]` | `["Allow","Deny"]` | `"Allow"` |
| `openapi.json` | `["definitions","SasPolicy","properties","expirationAction"]` | `["Log","Block"]` | `"Log"` |
| `openapi.json` | `["definitions","StorageConnectorProperties","properties","state"]` | `["Active","Inactive"]` | `"Active"` |
| `openapi.json` | `["definitions","StorageConnectorPropertiesUpdate","properties","state"]` | `["Active","Inactive"]` | `"Active"` |

[Native receipt](../native-469.json) | [Worker input](../native-469.input.json) | [Worker log](../native-469.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

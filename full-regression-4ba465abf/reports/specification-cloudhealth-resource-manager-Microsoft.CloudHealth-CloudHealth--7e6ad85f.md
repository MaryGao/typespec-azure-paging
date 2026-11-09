# specification/cloudhealth/resource-manager/Microsoft.CloudHealth/CloudHealth: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-11-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/9 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `cloudhealth.json` | `["definitions","AzureResourceHealthSignal","properties","enabled"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `cloudhealth.json` | `["definitions","AzureResourceSignal","properties","refreshInterval"]` | `["PT1M","PT5M","PT10M","PT15M","PT30M","PT1H","PT2H"]` | `"PT1M"` |
| `cloudhealth.json` | `["definitions","DependenciesSignalGroupV2","properties","aggregationType"]` | `["WorstOf","BestOf","MinHealthy","MaxNotHealthy"]` | `"WorstOf"` |
| `cloudhealth.json` | `["definitions","DiscoveryRuleProperties","properties","addResourceHealthSignal"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `cloudhealth.json` | `["definitions","EntityProperties","properties","impact"]` | `["Standard","Limited","Suppressed"]` | `"Standard"` |
| `cloudhealth.json` | `["definitions","LogAnalyticsSignal","properties","refreshInterval"]` | `["PT1M","PT5M","PT10M","PT15M","PT30M","PT1H","PT2H"]` | `"PT1M"` |
| `cloudhealth.json` | `["definitions","PrometheusMetricsSignal","properties","refreshInterval"]` | `["PT1M","PT5M","PT10M","PT15M","PT30M","PT1H","PT2H"]` | `"PT1M"` |
| `cloudhealth.json` | `["definitions","SignalAggregationGroup","properties","aggregationType"]` | `["WorstOf","BestOf","MinHealthy","MaxNotHealthy"]` | `"WorstOf"` |
| `cloudhealth.json` | `["definitions","SignalDefinitionProperties","properties","refreshInterval"]` | `["PT1M","PT5M","PT10M","PT15M","PT30M","PT1H","PT2H"]` | `"PT1M"` |

[Native receipt](../native-173.json) | [Worker input](../native-173.input.json) | [Worker log](../native-173.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

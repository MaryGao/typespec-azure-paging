# specification/dashboard/resource-manager/Microsoft.Dashboard/Dashboard: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2025-09-01-preview`.

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
| `grafana.json` | `["definitions","ManagedGrafanaProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaProperties","properties","zoneRedundancy"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaProperties","properties","apiKey"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaProperties","properties","deterministicOutboundIP"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaPropertiesUpdateParameters","properties","zoneRedundancy"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaPropertiesUpdateParameters","properties","apiKey"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaPropertiesUpdateParameters","properties","deterministicOutboundIP"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `grafana.json` | `["definitions","ManagedGrafanaPropertiesUpdateParameters","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `grafana.json` | `["definitions","MarketplaceTrialQuota","properties","availablePromotion"]` | `["None","FreeTrial"]` | `"None"` |

[Native receipt](../native-206.json) | [Worker input](../native-206.input.json) | [Worker log](../native-206.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

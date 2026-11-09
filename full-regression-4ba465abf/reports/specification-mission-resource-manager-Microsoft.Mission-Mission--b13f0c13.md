# specification/mission/resource-manager/Microsoft.Mission/Mission: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-04-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/8 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["definitions","CommunityProperties","properties","firewallSku"]` | `["Basic","Standard","Premium"]` | `"Standard"` |
| `openapi.json` | `["definitions","EnclaveDefaultSettingsModel","properties","diagnosticDestination"]` | `["CommunityOnly","EnclaveOnly","Both"]` | `"EnclaveOnly"` |
| `openapi.json` | `["definitions","MaintenanceModeConfigurationModel","properties","mode"]` | `["On","CanNotDelete","Off","General","Advanced"]` | `"Off"` |
| `openapi.json` | `["definitions","MaintenanceModeConfigurationModel","properties","justification"]` | `["Networking","Governance","Off"]` | `"Off"` |
| `openapi.json` | `["definitions","MonitoringDestination","properties","destinationType"]` | `["CommunityWorkspace","EnclaveWorkspace","CustomWorkspace"]` | `"EnclaveWorkspace"` |
| `openapi.json` | `["definitions","RequestMetadata","properties","approvalStatus"]` | `["Approved","Rejected","Pending","Deleted","Expired"]` | `"Pending"` |
| `openapi.json` | `["definitions","VirtualEnclaveProperties","properties","workloadResourceVisibility"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","VirtualEnclaveProperties","properties","rbacInheritance"]` | `["Enabled","Disabled"]` | `"Disabled"` |

[Native receipt](../native-326.json) | [Worker input](../native-326.input.json) | [Worker log](../native-326.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

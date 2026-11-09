# specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/DeviceRegistry: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-11-02-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/12 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `deviceregistry.json` | `["definitions","Authentication","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` |
| `deviceregistry.json` | `["definitions","AuthenticationUpdate","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` |
| `deviceregistry.json` | `["definitions","DataPoint","properties","observabilityMode"]` | `["None","Counter","Gauge","Histogram","Log"]` | `"None"` |
| `deviceregistry.json` | `["definitions","Event","properties","observabilityMode"]` | `["None","Log"]` | `"None"` |
| `deviceregistry.json` | `["definitions","HostAuthentication","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` |
| `deviceregistry.json` | `["definitions","HostAuthenticationUpdate","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` |
| `deviceregistry.json` | `["definitions","ManagementAction","properties","actionType"]` | `["Call","Read","Write"]` | `"Call"` |
| `deviceregistry.json` | `["definitions","MqttDestinationConfiguration","properties","retain"]` | `["Keep","Never"]` | `"Never"` |
| `deviceregistry.json` | `["definitions","MqttDestinationConfiguration","properties","qos"]` | `["Qos0","Qos1"]` | `"Qos1"` |
| `deviceregistry.json` | `["definitions","NamespaceDiscoveredManagementAction","properties","actionType"]` | `["Call","Read","Write"]` | `"Call"` |
| `deviceregistry.json` | `["definitions","Topic","properties","retain"]` | `["Keep","Never"]` | `"Never"` |
| `deviceregistry.json` | `["definitions","TopicUpdate","properties","retain"]` | `["Keep","Never"]` | `"Never"` |

[Native receipt](../native-221.json) | [Worker input](../native-221.input.json) | [Worker log](../native-221.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

# specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/DeviceRegistry: DefaultInEnum

## Scope

Saved API version: `2026-11-02-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 12 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `deviceregistry.json` | `["definitions","Authentication","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` | Compliant |
| `deviceregistry.json` | `["definitions","AuthenticationUpdate","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` | Compliant |
| `deviceregistry.json` | `["definitions","DataPoint","properties","observabilityMode"]` | `["None","Counter","Gauge","Histogram","Log"]` | `"None"` | Compliant |
| `deviceregistry.json` | `["definitions","Event","properties","observabilityMode"]` | `["None","Log"]` | `"None"` | Compliant |
| `deviceregistry.json` | `["definitions","HostAuthentication","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` | Compliant |
| `deviceregistry.json` | `["definitions","HostAuthenticationUpdate","properties","method"]` | `["Anonymous","Certificate","UsernamePassword"]` | `"Certificate"` | Compliant |
| `deviceregistry.json` | `["definitions","ManagementAction","properties","actionType"]` | `["Call","Read","Write"]` | `"Call"` | Compliant |
| `deviceregistry.json` | `["definitions","MqttDestinationConfiguration","properties","retain"]` | `["Keep","Never"]` | `"Never"` | Compliant |
| `deviceregistry.json` | `["definitions","MqttDestinationConfiguration","properties","qos"]` | `["Qos0","Qos1"]` | `"Qos1"` | Compliant |
| `deviceregistry.json` | `["definitions","NamespaceDiscoveredManagementAction","properties","actionType"]` | `["Call","Read","Write"]` | `"Call"` | Compliant |
| `deviceregistry.json` | `["definitions","Topic","properties","retain"]` | `["Keep","Never"]` | `"Never"` | Compliant |
| `deviceregistry.json` | `["definitions","TopicUpdate","properties","retain"]` | `["Keep","Never"]` | `"Never"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-221.json) | [Exact worker input](../native-221.input.json) | [Worker log](../native-221.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

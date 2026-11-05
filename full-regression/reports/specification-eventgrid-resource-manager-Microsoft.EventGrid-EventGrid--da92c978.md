# specification/eventgrid/resource-manager/Microsoft.EventGrid/EventGrid: DefaultInEnum

## Scope

Saved API version: `2026-06-15-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 18 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `EventGrid.json` | `["definitions","ClientProperties","properties","state"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `EventGrid.json` | `["definitions","DomainProperties","properties","inputSchema"]` | `["EventGridSchema","CustomEventSchema","CloudEventSchemaV1_0"]` | `"EventGridSchema"` | Compliant |
| `EventGrid.json` | `["definitions","DomainProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |
| `EventGrid.json` | `["definitions","DomainUpdateParameterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |
| `EventGrid.json` | `["definitions","EventSubscriptionProperties","properties","eventDeliverySchema"]` | `["EventGridSchema","CustomInputSchema","CloudEventSchemaV1_0"]` | `"EventGridSchema"` | Compliant |
| `EventGrid.json` | `["definitions","NamespaceTopicProperties","properties","inputSchema"]` | `["CloudEventSchemaV1_0"]` | `"CloudEventSchemaV1_0"` | Compliant |
| `EventGrid.json` | `["definitions","PartnerClientAuthentication","properties","clientAuthenticationType"]` | `["AzureAD"]` | `"AzureAD"` | Compliant |
| `EventGrid.json` | `["definitions","PartnerDestinationInfo","properties","endpointType"]` | `["WebHook"]` | `"WebHook"` | Compliant |
| `EventGrid.json` | `["definitions","PartnerNamespaceProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |
| `EventGrid.json` | `["definitions","PartnerNamespaceProperties","properties","partnerTopicRoutingMode"]` | `["SourceEventAttribute","ChannelNameHeader"]` | `"SourceEventAttribute"` | Compliant |
| `EventGrid.json` | `["definitions","PartnerNamespaceUpdateParameterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |
| `EventGrid.json` | `["definitions","PartnerUpdateDestinationInfo","properties","endpointType"]` | `["WebHook"]` | `"WebHook"` | Compliant |
| `EventGrid.json` | `["definitions","ResourceSku","properties","name"]` | `["Basic","Premium"]` | `"Basic"` | Compliant |
| `EventGrid.json` | `["definitions","Topic","properties","kind"]` | `["Azure","AzureArc"]` | `"Azure"` | Compliant |
| `EventGrid.json` | `["definitions","TopicProperties","properties","inputSchema"]` | `["EventGridSchema","CustomEventSchema","CloudEventSchemaV1_0"]` | `"EventGridSchema"` | Compliant |
| `EventGrid.json` | `["definitions","TopicProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |
| `EventGrid.json` | `["definitions","TopicSpacesConfiguration","properties","state"]` | `["Disabled","Enabled"]` | `"Disabled"` | Compliant |
| `EventGrid.json` | `["definitions","TopicUpdateParameterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-245.json) | [Exact worker input](../native-245.input.json) | [Worker log](../native-245.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

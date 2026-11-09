# specification/eventgrid/resource-manager/Microsoft.EventGrid/EventGrid: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-06-15-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/18 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `EventGrid.json` | `["definitions","ClientProperties","properties","state"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `EventGrid.json` | `["definitions","DomainProperties","properties","inputSchema"]` | `["EventGridSchema","CustomEventSchema","CloudEventSchemaV1_0"]` | `"EventGridSchema"` |
| `EventGrid.json` | `["definitions","DomainProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `EventGrid.json` | `["definitions","DomainUpdateParameterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `EventGrid.json` | `["definitions","EventSubscriptionProperties","properties","eventDeliverySchema"]` | `["EventGridSchema","CustomInputSchema","CloudEventSchemaV1_0"]` | `"EventGridSchema"` |
| `EventGrid.json` | `["definitions","NamespaceTopicProperties","properties","inputSchema"]` | `["CloudEventSchemaV1_0"]` | `"CloudEventSchemaV1_0"` |
| `EventGrid.json` | `["definitions","PartnerClientAuthentication","properties","clientAuthenticationType"]` | `["AzureAD"]` | `"AzureAD"` |
| `EventGrid.json` | `["definitions","PartnerDestinationInfo","properties","endpointType"]` | `["WebHook"]` | `"WebHook"` |
| `EventGrid.json` | `["definitions","PartnerNamespaceProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `EventGrid.json` | `["definitions","PartnerNamespaceProperties","properties","partnerTopicRoutingMode"]` | `["SourceEventAttribute","ChannelNameHeader"]` | `"SourceEventAttribute"` |
| `EventGrid.json` | `["definitions","PartnerNamespaceUpdateParameterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `EventGrid.json` | `["definitions","PartnerUpdateDestinationInfo","properties","endpointType"]` | `["WebHook"]` | `"WebHook"` |
| `EventGrid.json` | `["definitions","ResourceSku","properties","name"]` | `["Basic","Premium"]` | `"Basic"` |
| `EventGrid.json` | `["definitions","Topic","properties","kind"]` | `["Azure","AzureArc"]` | `"Azure"` |
| `EventGrid.json` | `["definitions","TopicProperties","properties","inputSchema"]` | `["EventGridSchema","CustomEventSchema","CloudEventSchemaV1_0"]` | `"EventGridSchema"` |
| `EventGrid.json` | `["definitions","TopicProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |
| `EventGrid.json` | `["definitions","TopicSpacesConfiguration","properties","state"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `EventGrid.json` | `["definitions","TopicUpdateParameterProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled","SecuredByPerimeter"]` | `"Enabled"` |

[Native receipt](../native-245.json) | [Worker input](../native-245.input.json) | [Worker log](../native-245.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

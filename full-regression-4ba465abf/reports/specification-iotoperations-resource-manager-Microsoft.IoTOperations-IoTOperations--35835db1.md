# specification/iotoperations/resource-manager/Microsoft.IoTOperations/IoTOperations: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-11-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/37 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `iotoperations.json` | `["definitions","AdvancedSettings","properties","encryptInternalTraffic"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","AioApplicationExposedService","properties","serviceType"]` | `["ClusterIp","LoadBalancer","NodePort"]` | `"ClusterIp"` |
| `iotoperations.json` | `["definitions","AioApplicationExposedServicePort","properties","protocol"]` | `["Http","Https","Grpc","Mrpc"]` | `"Http"` |
| `iotoperations.json` | `["definitions","AkriConnectorProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","AkriConnectorTemplateProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","AuthorizationConfig","properties","cache"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","BrokerAuthenticationProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","BrokerAuthorizationProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","BrokerListenerProperties","properties","serviceType"]` | `["ClusterIp","LoadBalancer","NodePort"]` | `"ClusterIp"` |
| `iotoperations.json` | `["definitions","BrokerListenerProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","BrokerProperties","properties","memoryProfile"]` | `["Tiny","Low","Medium","High"]` | `"Medium"` |
| `iotoperations.json` | `["definitions","BrokerProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","DataflowBuiltInTransformationFilter","properties","type"]` | `["Filter"]` | `"Filter"` |
| `iotoperations.json` | `["definitions","DataflowBuiltInTransformationSettings","properties","serializationFormat"]` | `["Delta","Json","Parquet"]` | `"Json"` |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","copyMqttProperties"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","compression"]` | `["None","Gzip","Snappy","Lz4"]` | `"None"` |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","kafkaAcks"]` | `["Zero","One","All"]` | `"All"` |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","partitionStrategy"]` | `["Default","Static","Topic","Property"]` | `"Default"` |
| `iotoperations.json` | `["definitions","DataflowEndpointKafkaBatching","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","DataflowEndpointMqtt","properties","protocol"]` | `["Mqtt","WebSockets"]` | `"Mqtt"` |
| `iotoperations.json` | `["definitions","DataflowEndpointMqtt","properties","retain"]` | `["Keep","Never"]` | `"Keep"` |
| `iotoperations.json` | `["definitions","DataflowEndpointProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","DataflowGraphProperties","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","DataflowGraphProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","DataflowProfileProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","DataflowProperties","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","DataflowProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","DataflowSourceOperationSettings","properties","serializationFormat"]` | `["Json"]` | `"Json"` |
| `iotoperations.json` | `["definitions","GenerateResourceLimits","properties","cpu"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","InstanceProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","ListenerPort","properties","protocol"]` | `["Mqtt","WebSockets"]` | `"Mqtt"` |
| `iotoperations.json` | `["definitions","RegistryEndpointProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` |
| `iotoperations.json` | `["definitions","SelfCheck","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","SelfTracing","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","SubscriberQueueLimit","properties","strategy"]` | `["None","DropOldest"]` | `"None"` |
| `iotoperations.json` | `["definitions","TlsProperties","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `iotoperations.json` | `["definitions","Traces","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` |

[Native receipt](../native-278.json) | [Worker input](../native-278.input.json) | [Worker log](../native-278.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

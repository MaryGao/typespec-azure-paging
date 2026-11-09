# specification/iotoperationsmq/resource-manager/Microsoft.IoTOperationsMQ/IoTOperationsMQ: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2023-10-04-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/10 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `iotoperationsmq.json` | `["definitions","BrokerListenerProperties","properties","serviceType"]` | `["clusterIp","loadBalancer","nodePort"]` | `"clusterIp"` |
| `iotoperationsmq.json` | `["definitions","BrokerListenerResourceUpdateProperties","properties","serviceType"]` | `["clusterIp","loadBalancer","nodePort"]` | `"clusterIp"` |
| `iotoperationsmq.json` | `["definitions","BrokerProperties","properties","memoryProfile"]` | `["tiny","low","medium","high"]` | `"medium"` |
| `iotoperationsmq.json` | `["definitions","BrokerResourceUpdateProperties","properties","memoryProfile"]` | `["tiny","low","medium","high"]` | `"medium"` |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapProperties","properties","compression"]` | `["none","gzip","snappy","lz4"]` | `"none"` |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapProperties","properties","partitionStrategy"]` | `["default","static","topic","property"]` | `"default"` |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapResourceUpdateProperties","properties","compression"]` | `["none","gzip","snappy","lz4"]` | `"none"` |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapResourceUpdateProperties","properties","partitionStrategy"]` | `["default","static","topic","property"]` | `"default"` |
| `iotoperationsmq.json` | `["definitions","MqttBridgeRemoteBrokerConnectionSpec","properties","protocol"]` | `["mqtt","webSocket"]` | `"mqtt"` |
| `iotoperationsmq.json` | `["definitions","MqttBridgeRemoteBrokerConnectionSpecUpdate","properties","protocol"]` | `["mqtt","webSocket"]` | `"mqtt"` |

[Native receipt](../native-280.json) | [Worker input](../native-280.input.json) | [Worker log](../native-280.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

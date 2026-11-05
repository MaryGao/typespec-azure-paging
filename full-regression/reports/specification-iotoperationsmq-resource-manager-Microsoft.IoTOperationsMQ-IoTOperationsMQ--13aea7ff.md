# specification/iotoperationsmq/resource-manager/Microsoft.IoTOperationsMQ/IoTOperationsMQ: DefaultInEnum

## Scope

Saved API version: `2023-10-04-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 10 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `iotoperationsmq.json` | `["definitions","BrokerListenerProperties","properties","serviceType"]` | `["clusterIp","loadBalancer","nodePort"]` | `"clusterIp"` | Compliant |
| `iotoperationsmq.json` | `["definitions","BrokerListenerResourceUpdateProperties","properties","serviceType"]` | `["clusterIp","loadBalancer","nodePort"]` | `"clusterIp"` | Compliant |
| `iotoperationsmq.json` | `["definitions","BrokerProperties","properties","memoryProfile"]` | `["tiny","low","medium","high"]` | `"medium"` | Compliant |
| `iotoperationsmq.json` | `["definitions","BrokerResourceUpdateProperties","properties","memoryProfile"]` | `["tiny","low","medium","high"]` | `"medium"` | Compliant |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapProperties","properties","compression"]` | `["none","gzip","snappy","lz4"]` | `"none"` | Compliant |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapProperties","properties","partitionStrategy"]` | `["default","static","topic","property"]` | `"default"` | Compliant |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapResourceUpdateProperties","properties","compression"]` | `["none","gzip","snappy","lz4"]` | `"none"` | Compliant |
| `iotoperationsmq.json` | `["definitions","KafkaTopicMapResourceUpdateProperties","properties","partitionStrategy"]` | `["default","static","topic","property"]` | `"default"` | Compliant |
| `iotoperationsmq.json` | `["definitions","MqttBridgeRemoteBrokerConnectionSpec","properties","protocol"]` | `["mqtt","webSocket"]` | `"mqtt"` | Compliant |
| `iotoperationsmq.json` | `["definitions","MqttBridgeRemoteBrokerConnectionSpecUpdate","properties","protocol"]` | `["mqtt","webSocket"]` | `"mqtt"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-280.json) | [Exact worker input](../native-280.input.json) | [Worker log](../native-280.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

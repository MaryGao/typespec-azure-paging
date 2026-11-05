# specification/iotoperations/resource-manager/Microsoft.IoTOperations/IoTOperations: DefaultInEnum

## Scope

Saved API version: `2026-11-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 37 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `iotoperations.json` | `["definitions","AdvancedSettings","properties","encryptInternalTraffic"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","AioApplicationExposedService","properties","serviceType"]` | `["ClusterIp","LoadBalancer","NodePort"]` | `"ClusterIp"` | Compliant |
| `iotoperations.json` | `["definitions","AioApplicationExposedServicePort","properties","protocol"]` | `["Http","Https","Grpc","Mrpc"]` | `"Http"` | Compliant |
| `iotoperations.json` | `["definitions","AkriConnectorProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","AkriConnectorTemplateProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","AuthorizationConfig","properties","cache"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","BrokerAuthenticationProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","BrokerAuthorizationProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","BrokerListenerProperties","properties","serviceType"]` | `["ClusterIp","LoadBalancer","NodePort"]` | `"ClusterIp"` | Compliant |
| `iotoperations.json` | `["definitions","BrokerListenerProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","BrokerProperties","properties","memoryProfile"]` | `["Tiny","Low","Medium","High"]` | `"Medium"` | Compliant |
| `iotoperations.json` | `["definitions","BrokerProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowBuiltInTransformationFilter","properties","type"]` | `["Filter"]` | `"Filter"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowBuiltInTransformationSettings","properties","serializationFormat"]` | `["Delta","Json","Parquet"]` | `"Json"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","copyMqttProperties"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","compression"]` | `["None","Gzip","Snappy","Lz4"]` | `"None"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","kafkaAcks"]` | `["Zero","One","All"]` | `"All"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointKafka","properties","partitionStrategy"]` | `["Default","Static","Topic","Property"]` | `"Default"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointKafkaBatching","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointMqtt","properties","protocol"]` | `["Mqtt","WebSockets"]` | `"Mqtt"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointMqtt","properties","retain"]` | `["Keep","Never"]` | `"Keep"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowEndpointProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowGraphProperties","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowGraphProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowProfileProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowProperties","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","DataflowSourceOperationSettings","properties","serializationFormat"]` | `["Json"]` | `"Json"` | Compliant |
| `iotoperations.json` | `["definitions","GenerateResourceLimits","properties","cpu"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","InstanceProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","ListenerPort","properties","protocol"]` | `["Mqtt","WebSockets"]` | `"Mqtt"` | Compliant |
| `iotoperations.json` | `["definitions","RegistryEndpointProperties","properties","healthState"]` | `["Available","Degraded","Unavailable","Unknown"]` | `"Unknown"` | Compliant |
| `iotoperations.json` | `["definitions","SelfCheck","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","SelfTracing","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","SubscriberQueueLimit","properties","strategy"]` | `["None","DropOldest"]` | `"None"` | Compliant |
| `iotoperations.json` | `["definitions","TlsProperties","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `iotoperations.json` | `["definitions","Traces","properties","mode"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-278.json) | [Exact worker input](../native-278.input.json) | [Worker log](../native-278.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

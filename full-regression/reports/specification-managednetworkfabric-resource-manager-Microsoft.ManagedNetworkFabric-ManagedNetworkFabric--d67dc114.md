# specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/ManagedNetworkFabric: DefaultInEnum

## Scope

Saved API version: `2025-07-15`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 29 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `managednetworkfabric.json` | `["definitions","AccessControlListProperties","properties","defaultAction"]` | `["Permit","Deny"]` | `"Permit"` | Compliant |
| `managednetworkfabric.json` | `["definitions","BfdConfiguration","properties","administrativeState"]` | `["Enabled","Disabled","MAT","RMA"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","BgpConfiguration","properties","v4OverV6BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","BgpConfiguration","properties","v6OverV4BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","BmpConfigurationProperties","properties","exportPolicy"]` | `["Pre-Policy","Post-Policy","All","LocalRib"]` | `"All"` | Compliant |
| `managednetworkfabric.json` | `["definitions","ExternalNetworkBmpProperties","properties","configurationState"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","ExternalNetworkPropertiesOptionAProperties","properties","v4OverV6BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","ExternalNetworkPropertiesOptionAProperties","properties","v6OverV4BgpSession"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","GlobalAccessControlListActionProperties","properties","enableCount"]` | `["True","False"]` | `"False"` | Compliant |
| `managednetworkfabric.json` | `["definitions","GlobalNetworkTapRuleActionProperties","properties","enableCount"]` | `["True","False"]` | `"False"` | Compliant |
| `managednetworkfabric.json` | `["definitions","InternalNetworkProperties","properties","extension"]` | `["NoExtension","NPB"]` | `"NoExtension"` | Compliant |
| `managednetworkfabric.json` | `["definitions","InternalNetworkProperties","properties","isMonitoringEnabled"]` | `["True","False"]` | `"False"` | Compliant |
| `managednetworkfabric.json` | `["definitions","L2IsolationDomainProperties","properties","extendedVlan"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","L3IsolationDomainProperties","properties","redistributeConnectedSubnets"]` | `["True","False"]` | `"True"` | Compliant |
| `managednetworkfabric.json` | `["definitions","L3IsolationDomainProperties","properties","redistributeStaticRoutes"]` | `["True","False"]` | `"False"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NetworkFabricControllerProperties","properties","isWorkloadManagementNetworkEnabled"]` | `["True","False"]` | `"True"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NetworkFabricControllerProperties","properties","nfcSku"]` | `["Basic","Standard","HighPerformance"]` | `"Standard"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NetworkTapProperties","properties","pollingType"]` | `["Pull","Push"]` | `"Pull"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NetworkTapRuleMatchCondition","properties","encapsulationType"]` | `["None","GTPv1"]` | `"None"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NetworkToNetworkInterconnectProperties","properties","nniType"]` | `["CE","NPB"]` | `"CE"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NetworkToNetworkInterconnectProperties","properties","isManagementType"]` | `["True","False"]` | `"True"` | Compliant |
| `managednetworkfabric.json` | `["definitions","NniBmpProperties","properties","configurationState"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","QosProperties","properties","qosConfigurationState"]` | `["Disabled","Enabled"]` | `"Disabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","RoutePolicyProperties","properties","defaultAction"]` | `["Permit","Deny"]` | `"Deny"` | Compliant |
| `managednetworkfabric.json` | `["definitions","RoutePolicyProperties","properties","addressFamilyType"]` | `["IPv4","IPv6"]` | `"IPv4"` | Compliant |
| `managednetworkfabric.json` | `["definitions","StatementConditionProperties","properties","type"]` | `["Or","And"]` | `"Or"` | Compliant |
| `managednetworkfabric.json` | `["definitions","StaticRouteConfiguration","properties","extension"]` | `["NoExtension","NPB"]` | `"NoExtension"` | Compliant |
| `managednetworkfabric.json` | `["definitions","UniqueRouteDistinguisherProperties","properties","uniqueRdConfigurationState"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `managednetworkfabric.json` | `["definitions","UniqueRouteDistinguisherProperties","properties","nniDerivedUniqueRdConfigurationState"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-304.json) | [Exact worker input](../native-304.input.json) | [Worker log](../native-304.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

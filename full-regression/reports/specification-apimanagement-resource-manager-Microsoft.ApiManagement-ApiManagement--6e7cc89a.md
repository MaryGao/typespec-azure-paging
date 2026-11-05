# specification/apimanagement/resource-manager/Microsoft.ApiManagement/ApiManagement: DefaultInEnum

## Scope

Saved API version: `2025-09-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 25 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/policies/{policyId}","get","parameters","6"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/resolvers/{resolverId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/policies/{policyId}","get","parameters","5"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/policies/{policyId}","get","parameters","6"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}/operations/{operationId}/policies/{policyId}","get","parameters","8"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/policies/{policyId}","get","parameters","6"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["definitions","AdditionalLocation","properties","natGatewayState"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","AllPoliciesContractProperties","properties","complianceState"]` | `["Pending","NonCompliant","Compliant"]` | `"Pending"` | Compliant |
| `openapi.json` | `["definitions","ApiManagementServiceBackupRestoreParameters","properties","accessType"]` | `["AccessKey","SystemAssignedManagedIdentity","UserAssignedManagedIdentity"]` | `"AccessKey"` | Compliant |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","natGatewayState"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","virtualNetworkType"]` | `["None","External","Internal"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","legacyPortalStatus"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","developerPortalStatus"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","ConfigurationApi","properties","legacyApi"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","GatewayTokenRequestContract","properties","keyType"]` | `["primary","secondary"]` | `"primary"` | Compliant |
| `openapi.json` | `["definitions","PolicyContractProperties","properties","format"]` | `["xml","xml-link","rawxml","rawxml-link"]` | `"xml"` | Compliant |
| `openapi.json` | `["definitions","PolicyFragmentContractProperties","properties","format"]` | `["xml","rawxml"]` | `"xml"` | Compliant |
| `openapi.json` | `["definitions","PolicyRestrictionContractProperties","properties","requireBase"]` | `["true","false"]` | `"false"` | Compliant |
| `openapi.json` | `["definitions","PolicyWithComplianceContractProperties","properties","complianceState"]` | `["Pending","NonCompliant","Compliant"]` | `"Pending"` | Compliant |
| `openapi.json` | `["definitions","PortalConfigCspProperties","properties","mode"]` | `["enabled","disabled","reportOnly"]` | `"disabled"` | Compliant |
| `openapi.json` | `["definitions","UserEntityBaseParameters","properties","state"]` | `["active","blocked","pending","deleted"]` | `"active"` | Compliant |
| `openapi.json` | `["definitions","UserTokenParameterProperties","properties","keyType"]` | `["primary","secondary"]` | `"primary"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-11.json) | [Exact worker input](../native-11.input.json) | [Worker log](../native-11.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

# specification/apimanagement/resource-manager/Microsoft.ApiManagement/ApiManagement: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2025-09-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/25 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operations/{operationId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/policies/{policyId}","get","parameters","6"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/resolvers/{resolverId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/policies/{policyId}","get","parameters","5"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/policies/{policyId}","get","parameters","6"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}/operations/{operationId}/policies/{policyId}","get","parameters","8"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/policies/{policyId}","get","parameters","6"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies/{policyId}","get","parameters","7"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["definitions","AdditionalLocation","properties","natGatewayState"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","AllPoliciesContractProperties","properties","complianceState"]` | `["Pending","NonCompliant","Compliant"]` | `"Pending"` |
| `openapi.json` | `["definitions","ApiManagementServiceBackupRestoreParameters","properties","accessType"]` | `["AccessKey","SystemAssignedManagedIdentity","UserAssignedManagedIdentity"]` | `"AccessKey"` |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","natGatewayState"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","virtualNetworkType"]` | `["None","External","Internal"]` | `"None"` |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","legacyPortalStatus"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `openapi.json` | `["definitions","ApiManagementServiceBaseProperties","properties","developerPortalStatus"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `openapi.json` | `["definitions","ConfigurationApi","properties","legacyApi"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `openapi.json` | `["definitions","GatewayTokenRequestContract","properties","keyType"]` | `["primary","secondary"]` | `"primary"` |
| `openapi.json` | `["definitions","PolicyContractProperties","properties","format"]` | `["xml","xml-link","rawxml","rawxml-link"]` | `"xml"` |
| `openapi.json` | `["definitions","PolicyFragmentContractProperties","properties","format"]` | `["xml","rawxml"]` | `"xml"` |
| `openapi.json` | `["definitions","PolicyRestrictionContractProperties","properties","requireBase"]` | `["true","false"]` | `"false"` |
| `openapi.json` | `["definitions","PolicyWithComplianceContractProperties","properties","complianceState"]` | `["Pending","NonCompliant","Compliant"]` | `"Pending"` |
| `openapi.json` | `["definitions","PortalConfigCspProperties","properties","mode"]` | `["enabled","disabled","reportOnly"]` | `"disabled"` |
| `openapi.json` | `["definitions","UserEntityBaseParameters","properties","state"]` | `["active","blocked","pending","deleted"]` | `"active"` |
| `openapi.json` | `["definitions","UserTokenParameterProperties","properties","keyType"]` | `["primary","secondary"]` | `"primary"` |

[Native receipt](../native-11.json) | [Worker input](../native-11.input.json) | [Worker log](../native-11.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

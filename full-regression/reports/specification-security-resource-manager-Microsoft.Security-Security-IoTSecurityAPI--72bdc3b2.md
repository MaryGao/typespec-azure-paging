# specification/security/resource-manager/Microsoft.Security/Security/IoTSecurityAPI: DefaultInEnum

## Scope

Saved API version: `2019-08-01`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 4 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `security-IoTSecurity.json` | `["definitions","AdditionalWorkspacesProperties","properties","type"]` | `["Sentinel"]` | `"Sentinel"` | Compliant |
| `security-IoTSecurity.json` | `["definitions","IoTSecuritySolutionProperties","properties","status"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `security-IoTSecurity.json` | `["definitions","IoTSecuritySolutionProperties","properties","unmaskedIpLoggingStatus"]` | `["Disabled","Enabled"]` | `"Disabled"` | Compliant |
| `security-IoTSecurity.json` | `["definitions","RecommendationConfigurationProperties","properties","status"]` | `["Disabled","Enabled"]` | `"Enabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-431.json) | [Exact worker input](../native-431.input.json) | [Worker log](../native-431.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

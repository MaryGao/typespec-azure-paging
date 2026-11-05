# specification/domainservices/resource-manager/Microsoft.AAD/DomainServices: DefaultInEnum

## Scope

Saved API version: `2026-08-31-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 14 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `openapi.json` | `["definitions","ConfigDiagnosticsValidatorResult","properties","status"]` | `["None","Running","OK","Failure","Warning","Skipped"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","ntlmV1"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","tlsV1"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","syncNtlmPasswords"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","syncKerberosPasswords"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","syncOnPremPasswords"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","kerberosRc4Encryption"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","kerberosArmoring"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","ldapSigning"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","channelBinding"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","DomainSecuritySettings","properties","syncOnPremSamAccountName"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","DomainServiceProperties","properties","syncScope"]` | `["All","CloudOnly"]` | `"All"` | Compliant |
| `openapi.json` | `["definitions","LdapsSettings","properties","ldaps"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","LdapsSettings","properties","externalAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-229.json) | [Exact worker input](../native-229.input.json) | [Worker log](../native-229.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

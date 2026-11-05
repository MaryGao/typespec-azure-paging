# specification/cdn/resource-manager/Microsoft.Cdn/Cdn: DefaultInEnum

## Scope

Saved API version: `2026-08-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

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
| `openapi.json` | `["definitions","BatchRuleProperties","properties","matchProcessingBehavior"]` | `["Continue","Stop"]` | `"Continue"` | Compliant |
| `openapi.json` | `["definitions","EndpointPropertiesUpdateParameters","properties","queryStringCachingBehavior"]` | `["IgnoreQueryString","BypassCaching","UseQueryString","NotSet"]` | `"NotSet"` | Compliant |
| `openapi.json` | `["definitions","RouteProperties","properties","forwardingProtocol"]` | `["HttpOnly","HttpsOnly","MatchRequest"]` | `"MatchRequest"` | Compliant |
| `openapi.json` | `["definitions","RouteProperties","properties","linkToDefaultDomain"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","RouteProperties","properties","httpsRedirect"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","RouteUpdatePropertiesParameters","properties","forwardingProtocol"]` | `["HttpOnly","HttpsOnly","MatchRequest"]` | `"MatchRequest"` | Compliant |
| `openapi.json` | `["definitions","RouteUpdatePropertiesParameters","properties","linkToDefaultDomain"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","RouteUpdatePropertiesParameters","properties","httpsRedirect"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","RuleProperties","properties","matchProcessingBehavior"]` | `["Continue","Stop"]` | `"Continue"` | Compliant |
| `openapi.json` | `["definitions","RuleUpdatePropertiesParameters","properties","matchProcessingBehavior"]` | `["Continue","Stop"]` | `"Continue"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-169.json) | [Exact worker input](../native-169.input.json) | [Worker log](../native-169.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

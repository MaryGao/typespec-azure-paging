# specification/cdn/resource-manager/Microsoft.Cdn/Cdn: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-08-01-preview`.

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
| `openapi.json` | `["definitions","BatchRuleProperties","properties","matchProcessingBehavior"]` | `["Continue","Stop"]` | `"Continue"` |
| `openapi.json` | `["definitions","EndpointPropertiesUpdateParameters","properties","queryStringCachingBehavior"]` | `["IgnoreQueryString","BypassCaching","UseQueryString","NotSet"]` | `"NotSet"` |
| `openapi.json` | `["definitions","RouteProperties","properties","forwardingProtocol"]` | `["HttpOnly","HttpsOnly","MatchRequest"]` | `"MatchRequest"` |
| `openapi.json` | `["definitions","RouteProperties","properties","linkToDefaultDomain"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","RouteProperties","properties","httpsRedirect"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","RouteUpdatePropertiesParameters","properties","forwardingProtocol"]` | `["HttpOnly","HttpsOnly","MatchRequest"]` | `"MatchRequest"` |
| `openapi.json` | `["definitions","RouteUpdatePropertiesParameters","properties","linkToDefaultDomain"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","RouteUpdatePropertiesParameters","properties","httpsRedirect"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","RuleProperties","properties","matchProcessingBehavior"]` | `["Continue","Stop"]` | `"Continue"` |
| `openapi.json` | `["definitions","RuleUpdatePropertiesParameters","properties","matchProcessingBehavior"]` | `["Continue","Stop"]` | `"Continue"` |

[Native receipt](../native-169.json) | [Worker input](../native-169.input.json) | [Worker log](../native-169.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

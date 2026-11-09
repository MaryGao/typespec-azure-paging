# specification/azurearcdata/resource-manager/Microsoft.AzureArcData/AzureArcData: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-03-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/9 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["definitions","ActiveDirectoryConnectorDomainDetails","properties","serviceAccountProvisioning"]` | `["automatic","manual"]` | `"manual"` |
| `openapi.json` | `["definitions","DataControllerProperties","properties","infrastructure"]` | `["azure","gcp","aws","alibaba","onpremises","other"]` | `"other"` |
| `openapi.json` | `["definitions","FailoverGroupSpec","properties","partnerSyncMode"]` | `["async","sync"]` | `"async"` |
| `openapi.json` | `["definitions","FailoverGroupSpec","properties","role"]` | `["primary","secondary","force-primary-allow-data-loss","force-secondary"]` | `"primary"` |
| `openapi.json` | `["definitions","PostgresInstanceSku","properties","tier"]` | `["Hyperscale"]` | `"Hyperscale"` |
| `openapi.json` | `["definitions","SqlManagedInstanceProperties","properties","licenseType"]` | `["BasePrice","LicenseIncluded","DisasterRecovery"]` | `"BasePrice"` |
| `openapi.json` | `["definitions","SqlManagedInstanceSku","properties","tier"]` | `["GeneralPurpose","BusinessCritical"]` | `"GeneralPurpose"` |
| `openapi.json` | `["definitions","SqlServerInstanceRunTargetRecommendationJobRequest","properties","resourceUpdateMode"]` | `["UpdateAllTargetRecommendationDetails","SkipResourceUpdate"]` | `"UpdateAllTargetRecommendationDetails"` |
| `openapi.json` | `["definitions","SqlServerInstanceTelemetryRequest","properties","aggregationType"]` | `["Average","Minimum","Maximum","Sum","Count"]` | `"Average"` |

[Native receipt](../native-155.json) | [Worker input](../native-155.input.json) | [Worker log](../native-155.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

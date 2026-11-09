# ValidFormats: full frozen ARM validation

**complete**: **487/487** native compilations succeeded and **487/487** Swagger result sets verified. Population: **487 ARM projects / 649 Swagger files**.
34 projects had fresh Swagger replay; 453 reused the complete hash-verified previous results after the user requested TypeSpec-only revalidation.

Saved/verified ValidFormats findings: **123 / 123**, compared at exact document and JSON paths. Related source-warning witnesses: **123**; unmatched Swagger observations: **0**; additional native warnings: **204**.
Native policies separately report **no-format=202**, **known-encoding=28**, **no-generic-numeric=97**. These are not equivalent-defect totals.

## Outcome and policy differences

Compared with `21f7aefe9c4399e4f51b28349ef02d4c64b1c5fc`: native warnings added/removed **0/0**; Swagger findings added/removed **0/0**; new Swagger-only gaps **0**. All 487 projects and all 649 Swagger files were compared as diagnostic multisets, including source locations and duplicate occurrences.
[Exact previous-run comparison](previous-run-comparison.json).

No Swagger-only occurrences remain among the successfully assessed source/schema witnesses. The array, inline-parameter and dictionary-value fixes remain in the existing numeric rule.

- **authored-format-ban-broader-than-swagger-vocabulary: 202**.
- **unsupported-source-encoding-on-formatless-file-response: 2**.

Additional native warnings were investigated using exact source excerpts, semantic metadata, selected same-name Swagger candidates and fresh production-rule vocabulary probes. Unassessed selected-version correspondence is kept explicit; matching names do not prove global projection equivalence. Specific numeric types such as int8, uint32 and decimal128 remain a separate compatibility policy decision.

## Projects with findings on either side

| Project                                                                                                          | Swagger | no-format | known-encoding | no-generic-numeric | Swagger-only | Native-only |
| ---------------------------------------------------------------------------------------------------------------- | ------: | --------: | -------------: | -----------------: | -----------: | ----------: |
| specification/advisor/resource-manager/Microsoft.Advisor/Advisor                                                 |       0 |         1 |              0 |                  0 |            0 |           1 |
| specification/apimanagement/resource-manager/Microsoft.ApiManagement/ApiManagement                               |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/automation/resource-manager/Microsoft.Automation/Automation                                        |       0 |        30 |              0 |                  0 |            0 |          30 |
| specification/azurearcdata/resource-manager/Microsoft.AzureArcData/AzureArcData                                  |       0 |         4 |              0 |                  0 |            0 |           4 |
| specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/BillingBenefits                         |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/CognitiveServices                   |       0 |         6 |              0 |                  0 |            0 |           6 |
| specification/commerce/resource-manager/Microsoft.Commerce/Commerce                                              |       2 |         0 |              0 |                  2 |            0 |           0 |
| specification/consumption/resource-manager/Microsoft.Consumption/Consumption                                     |      76 |        11 |              0 |                 76 |            0 |          11 |
| specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB                                         |       2 |         0 |              2 |                  0 |            0 |           0 |
| specification/cost-management/resource-manager/Microsoft.CostManagement/CostManagement                           |      19 |         0 |              0 |                 19 |            0 |           0 |
| specification/dashboard/resource-manager/Microsoft.Dashboard/Dashboard                                           |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/databricks/resource-manager/Microsoft.Databricks/Databricks                                        |       0 |         6 |              0 |                  0 |            0 |           6 |
| specification/datamigration/resource-manager/Microsoft.DataMigration/DataMigration                               |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/DeviceProvisioningServices           |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/eventgrid/resource-manager/Microsoft.EventGrid/EventGrid                                           |       0 |         6 |              0 |                  0 |            0 |           6 |
| specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub                                              |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsight                                           |       0 |         1 |              0 |                  0 |            0 |           1 |
| specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/HealthcareApis                            |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/hybridcompute/resource-manager/Microsoft.HybridCompute/HybridCompute                               |       0 |         4 |              0 |                  0 |            0 |           4 |
| specification/maps/resource-manager/Microsoft.Maps/Maps                                                          |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights             |       0 |         1 |              0 |                  0 |            0 |           1 |
| specification/providerhub/resource-manager/Microsoft.ProviderHub/ProviderHub                                     |       0 |        10 |              0 |                  0 |            0 |          10 |
| specification/purview/resource-manager/Microsoft.Purview/Purview                                                 |       0 |         4 |              0 |                  0 |            0 |           4 |
| specification/quota/resource-manager/Microsoft.Quota/Quota                                                       |       0 |         7 |              0 |                  0 |            0 |           7 |
| specification/search/resource-manager/Microsoft.Search/Search                                                    |       0 |        59 |              0 |                  0 |            0 |          59 |
| specification/security/resource-manager/Microsoft.Security/Security/LegacySettingsAPI                            |       0 |         1 |              0 |                  0 |            0 |           1 |
| specification/security/resource-manager/Microsoft.Security/Security/SensitivitySettingsAPI                       |       0 |         5 |              0 |                  0 |            0 |           5 |
| specification/securityinsights/resource-manager/Microsoft.SecurityInsights/SecurityInsights                      |       0 |         9 |              0 |                  0 |            0 |           9 |
| specification/servicefabric/resource-manager/Microsoft.ServiceFabric/ServiceFabric                               |      10 |         0 |             10 |                  0 |            0 |           0 |
| specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/ServiceFabricManagedClusters |      14 |         0 |             14 |                  0 |            0 |           0 |
| specification/sql/resource-manager/Microsoft.Sql/SQL                                                             |       0 |        12 |              0 |                  0 |            0 |          12 |
| specification/sqlvirtualmachine/resource-manager/Microsoft.SqlVirtualMachine/SqlVirtualMachine                   |       0 |         2 |              0 |                  0 |            0 |           2 |
| specification/storagecache/resource-manager/Microsoft.StorageCache/StorageCache                                  |       0 |         1 |              0 |                  0 |            0 |           1 |
| specification/web/resource-manager/Microsoft.Web/AppService                                                      |       0 |         6 |              2 |                  0 |            0 |           8 |

## Complete evidence

[Full 487-project summary](full-validation-summary.json) · [Every Swagger occurrence and native-only disposition](full-validation-findings.json) · [Runtime, controls and verification](full-validation-receipt.json).
Detailed local reports for every project, raw compiler/replay receipts, exact commands, source excerpts/hashes, and the complete scorecard are under `coverage-reports\valid-formats\full-validation-after-review-e8a187968`. Previous full-run and five-project reports remain preserved.

## Runtime and recovery

Candidate: `e8a18796811285284ae50cb3a40e7be230368e3b`; core: `f87a4e2d51c5cc0b3d995d4c7542578d55799804`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.
Baseline identity: `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`. All 649 retained Swagger files and the complete population metadata were checked against the sealed inventory. 17 injected package archives / 3188 files matched installed bytes at both start and end.
All authored-source #suppress directives were disabled in memory. No Swagger README/AutoRest suppression filtering was applied. Package libraries remain outside authored-service scope. Source hashes and compiler-normalized source positions were preserved.
Preflight controls included known violations, compliant and numeric-boundary fixtures, preserved/disabled suppressions, dictionary values and a BOM-bearing suppressed fixture. Original production schema controls remain in every fresh or reused replay receipt.
This review-fix run used the BOM-safe source host and the previously proved unresolved production-rule resolver from the outset; no earlier attempt is relabeled as this candidate. Reference-resolution optimization leaves the production ValidFormats function and resolved:false policy unchanged.

## Limits

This is the full retained ARM corpus, not data-plane coverage. Fresh work is native no-emit compilation. Swagger results are reused where marked above; retained earlier fresh replays are explicit. There was no fresh Swagger emission, full AutoRest validation, emitter unknown-format assessment or independent release-readiness review. No 1:1 diagnostic equivalence, numeric compatibility policy approval or migration acceptance is claimed.

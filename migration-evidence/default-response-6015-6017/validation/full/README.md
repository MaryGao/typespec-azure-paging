# Default-response rules: full frozen-corpus validation

**All 487 projects are assessed with no compile/worker failures. All 178 historical RequiredDefaultResponse findings have one-to-one native witnesses. Fresh native execution reports 486 findings: 178 matched wire operations plus 308 additional non-service source operations. No Swagger-only or unexplained findings were found.**

| Project with findings | MissingDefaultResponse | RequiredDefaultResponse | Fresh native | Bijectively matched | Native-only non-service |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Microsoft.RecoveryServices/SiteRecovery](specification--recoveryservicessiterecovery--resource-manager--microsoft.recoveryservices--siterecovery.md) | 0 | 137 | 137 | 137 | 0 |
| [Microsoft.Web/AppService](specification--web--resource-manager--microsoft.web--appservice.md) | 0 | 0 | 106 | 0 | 106 |
| [Microsoft.DataBoxEdge/DataBoxEdge](specification--databoxedge--resource-manager--microsoft.databoxedge--databoxedge.md) | 0 | 0 | 71 | 0 | 71 |
| [Microsoft.RecoveryServices/RecoveryServicesBackup](specification--recoveryservicesbackup--resource-manager--microsoft.recoveryservices--recoveryservicesbackup.md) | 0 | 0 | 56 | 0 | 56 |
| [ApplicationInsights/ComponentAPIs](specification--applicationinsights--resource-manager--microsoft.insights--applicationinsights--componentapis.md) | 0 | 23 | 23 | 23 | 0 |
| [Microsoft.DocumentDB/DocumentDB](specification--cosmos-db--resource-manager--microsoft.documentdb--documentdb.md) | 0 | 0 | 12 | 0 | 12 |
| [Microsoft.ServiceLinker/ServiceLinker](specification--servicelinker--resource-manager--microsoft.servicelinker--servicelinker.md) | 0 | 0 | 12 | 0 | 12 |
| [Microsoft.Devices/DeviceProvisioningServices](specification--deviceprovisioningservices--resource-manager--microsoft.devices--deviceprovisioningservices.md) | 0 | 0 | 10 | 0 | 10 |
| [Microsoft.SignalRService/SignalRService](specification--webpubsub--resource-manager--microsoft.signalrservice--signalrservice.md) | 0 | 0 | 9 | 0 | 9 |
| [ApplicationInsights/WebTestsApi](specification--applicationinsights--resource-manager--microsoft.insights--applicationinsights--webtestsapi.md) | 0 | 7 | 7 | 7 | 0 |
| [Microsoft.PowerPlatform/PowerPlatform](specification--powerplatform--resource-manager--microsoft.powerplatform--powerplatform.md) | 0 | 0 | 7 | 0 | 7 |
| [Microsoft.SignalRService/SignalRService](specification--signalr--resource-manager--microsoft.signalrservice--signalrservice.md) | 0 | 0 | 6 | 0 | 6 |
| [ApplicationInsights/Favorites](specification--applicationinsights--resource-manager--microsoft.insights--applicationinsights--favorites.md) | 0 | 5 | 5 | 5 | 0 |
| [Microsoft.Quota/Quota](specification--quota--resource-manager--microsoft.quota--quota.md) | 0 | 0 | 5 | 0 | 5 |
| [ApplicationInsights/AnalyticsItems](specification--applicationinsights--resource-manager--microsoft.insights--applicationinsights--analyticsitems.md) | 0 | 4 | 4 | 4 | 0 |
| [Microsoft.CognitiveServices/CognitiveServices](specification--cognitiveservices--resource-manager--microsoft.cognitiveservices--cognitiveservices.md) | 0 | 0 | 4 | 0 | 4 |
| [Microsoft.KeyVault/KeyVault](specification--keyvault--resource-manager--microsoft.keyvault--keyvault.md) | 0 | 0 | 4 | 0 | 4 |
| [Microsoft.CostManagement/CostManagement](specification--cost-management--resource-manager--microsoft.costmanagement--costmanagement.md) | 0 | 0 | 2 | 0 | 2 |
| [Microsoft.ApiManagement/ApiManagement](specification--apimanagement--resource-manager--microsoft.apimanagement--apimanagement.md) | 0 | 0 | 1 | 0 | 1 |
| [ApplicationInsights/WebTestLocation](specification--applicationinsights--resource-manager--microsoft.insights--applicationinsights--webtestlocation.md) | 0 | 1 | 1 | 1 | 0 |
| [Microsoft.Network/FrontDoor](specification--frontdoor--resource-manager--microsoft.network--frontdoor.md) | 0 | 0 | 1 | 0 | 1 |
| [Microsoft.Devices/IoTHub](specification--iothub--resource-manager--microsoft.devices--iothub.md) | 0 | 1 | 1 | 1 | 0 |
| [NewRelic.Observability/NewRelicObservability](specification--newrelic--resource-manager--newrelic.observability--newrelicobservability.md) | 0 | 0 | 1 | 0 | 1 |
| [Microsoft.ResourceConnector/ResourceConnector](specification--resourceconnector--resource-manager--microsoft.resourceconnector--resourceconnector.md) | 0 | 0 | 1 | 0 | 1 |
| **Total** | **0** | **178** | **486** | **178** | **308** |

The other 463 projects have zero findings in both saved members and fresh native execution. [Every project and raw receipt](projects.md) is listed, including zero/zero cases.

## 1. Scope and execution

Approved full validation of [PR #6038](https://github.com/Azure/typespec-azure/pull/6038). Candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`, core `8574d5453f7bf9a07dc09bd41edac579af71d94b`, frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; tooling `52eeec48b136f97addc10d90dcba4457a04f83a7`. The [plan](plan.json) records approval, applicability, population, reuse and budget before execution.

The existing checkout and the same 15 packed candidate artifacts were reused. The supported analyzer ran patch/install, consumed sealed baseline `swagger-arm-20261026-2cd3c5dd` with `frozen-reference`, verified/copied its entire inventory, ran all 487 projects without filter/limit, and verified the dataset again before recording complete status. Baseline identity: `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`.

Native execution took 24.4 minutes at concurrency two within the 7200-second budget. Total successful analyzer duration was 78.6 minutes, including installation and whole-inventory integrity checks. No new checkout, candidate rebuild, repack, Swagger generation or fresh Swagger execution was performed.

All 15 installed candidate package payloads match the unchanged archives byte-for-byte, and all 487 workers' recorded package entrypoints were verified. Portable harness controls: 37 passed; six fixtures requiring an unrelated unmerged resource-group rule were excluded prospectively. Nine target-specific controls passed in the pilot against these same candidate archives.

Setup recovery is retained rather than disguised as native execution: a standalone complete tooling copy passed the controls but could not provide Git provenance for the analyzer; the official Git-backed checkout was reused instead. The first official installation rejected the pilot's node_modules junction. Only that task-owned junction was unlinked, preserving its private runtime; the supported installer then created a real directory from cached packages. The failed setup manifest/log and pre-collection control failure are retained under evidence. No native project was counted as compliant because of a setup failure.

## 2. RequiredDefaultResponse

All 178 saved findings have exactly one mutual native witness: a concrete authored operation, matching HTTP verb/route, absent native fallback and absent saved Swagger default. Every fresh diagnostic was replayed at its exact source location; correspondence is not inferred from totals.

The 308 additional native findings all target non-service source operations with no saved Swagger route/verb counterpart: 304 in `client.tsp`, 4 in `back-compatible.tsp`. These are SDK customization/compatibility declarations, not additional saved wire defects. Their compiler HTTP-service exclusion, absent fallback and exact source signatures are retained individually. Four such declarations also produce HTTP route-resolution diagnostics during inspection; those diagnostics are retained, not hidden or treated as compile failures.

Equal-count projects: 470/487; Swagger-higher excess: 0; native-higher excess and total absolute difference: 308. Raw counts are **not equivalent** because native source traversal includes declarations absent from emitted Swagger.

## 3. MissingDefaultResponse

Both Swagger members were registered in 649 successful historical production executions across all 487 projects. The absent Spectral shard means zero observed findings, not skipped evaluation. Of the 486 native-only findings against this member, 178 are confirmed false negatives of its [response-key selector](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts#L1305-L1313), each corroborated by a RequiredDefaultResponse witness. The other 308 reflect the source-only population, not demonstrated Swagger false negatives.

Equal-count projects: 463/487; Swagger-higher excess: 0; native-higher excess and total absolute difference: 486. A capture percentage with a zero Swagger denominator is not meaningful. The shared native count is not summed twice across the two comparisons.

## 4. Boundaries and disposition

The current implementation and independent reporting are unchanged. Keep recommended-ruleset activation disabled while deciding whether non-service SDK customization/compatibility operations belong in the rule's policy. This is a broader source scope than Swagger; this report does not silently filter those findings away or claim raw equivalence.

The result is scoped to the frozen corpus, explicit target-only activation and source traversal with source suppressions retained. It does not assess project default activation, selected-version/reachability projection equivalence, fresh emission, or cross-rule duplicate volume. The operation audit ran after all native workers finished while the analyzer's final integrity check was pending; the later complete manifest and post-completion runtime verification close that checkpoint.

The [follow-up issue #6042](https://github.com/Azure/typespec-azure/issues/6042), attached to [epic #6020](https://github.com/Azure/typespec-azure/issues/6020), tracks the duplicate-reporting policy decision without changing this PR. These 486 findings target concrete operations; they are not a measured count of duplicate cross-rule warnings.

Exact archives, runtime, complete copied baseline and raw execution output remain locally retained. This report does not certify portable artifact recovery or release/merge readiness.

Evidence: [official complete manifest](evidence/run/manifest.json), [raw member counts](evidence/run/coverage.json), [operation audit](evidence/full-audit-summary.json), [runtime payloads and worker identities](evidence/full-runtime-identity.json), [portable controls](evidence/full-injected-controls-complete-tooling.json), [historical registration/completion](evidence/full-validator-provenance.json).

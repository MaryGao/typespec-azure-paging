# Default-response rules: five-project comparison

| Project                                                        | MissingDefaultResponse | RequiredDefaultResponse | Fresh native | Legacy/native matched | Legacy-only | Native-only vs legacy |
| -------------------------------------------------------------- | ---------------------: | ----------------------: | -----------: | --------------------: | ----------: | --------------------: |
| [Site Recovery](site-recovery.md)                              |                      0 |                     137 |          137 |                   137 |           0 |                     0 |
| [Application Insights Component APIs](application-insights.md) |                      0 |                      23 |           23 |                    23 |           0 |                     0 |
| [IoT Hub](iot-hub.md)                                          |                      0 |                       1 |            1 |                     1 |           0 |                     0 |
| [Deployments](deployments.md)                                  |                      0 |                       0 |            0 |                     0 |           0 |                     0 |
| [Storage](storage.md)                                          |                      0 |                       0 |            0 |                     0 |           0 |                     0 |
| **Total**                                                      |                  **0** |                 **161** |      **161** |               **161** |       **0** |                 **0** |

## 1. Scope and execution

Approved five-project representative validation of [PR #6038](https://github.com/Azure/typespec-azure/pull/6038), candidate `071afdea846ea0898e03a4d59f2c67bfa5a68266`, core `8574d5453f7bf9a07dc09bd41edac579af71d94b`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

All five fresh native receipts are assessed with no compile failures. The project workers took about 19 seconds after nine successful injected controls. Setup took substantially longer: an unnecessary full checkout/inventory scan and a stalled full-workspace dependency install preceded recovery. The redundant scan and stalled install were stopped. A minimal private runtime installed in 14.1 seconds after explicitly preserving the machine's approved registry proxy for pnpm 12; no TLS verification was disabled.

The 15 injected archives were verified byte-for-byte against installed payloads. Compiler and library receipts prove actual loaded entrypoints. Nine controls cover missing GET/HEAD defaults, explicit numeric errors, no responses, implicit/explicit defaults, standard ARM templates, removed template defaults, suppression, and explicit activation despite disabled configuration.

The saved Swagger results were reused, not regenerated or rerun. Baseline `swagger-arm-20261026-2cd3c5dd`, identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`, metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`. The baseline content seal and selected indexes, shard, 2593 retained input files, emitted Swagger and successful production execution logs were hash-verified. Both Swagger members were registered in each retained execution. The absent `MissingDefaultResponse` shard therefore means zero observed findings, not not-evaluated. This is selected-input verification, not a repeated full-inventory audit.

Native execution is `target-only`, `scope: source`, with authored suppressions retained. Default activation, selected-version projection and full-corpus coverage are not assessed. This bounded worker lane avoids passing unsupported project filters to the full shared-baseline analyzer.

## 2. RequiredDefaultResponse

All **161 historical findings matched 161 concrete native operations** by route, verb, source location and absent fallback. There are **no Swagger-only or native-only differences** against this legacy member in the sample. All five project counts agree; summed excess in either direction and total absolute difference are zero.

This is 100% correspondence for the selected historical findings, not proof of full-corpus equivalence. Source-operation populations differ from emitted selected-API populations in IoT Hub and Storage; those differences produced no extra findings in this sample.

## 3. MissingDefaultResponse

Saved production execution reported **zero** findings in all five projects. Fresh native execution found **161** missing defaults across three projects. Each is independently corroborated by the missing saved Swagger fallback and legacy finding.

The difference is the confirmed Spectral response-key selector defect, not a native coverage gap. Equal-count projects: 2/5; Swagger-higher excess: 0; native-higher excess and total absolute difference: 161. No percentage of captured Swagger violations is meaningful with a zero Swagger denominator. Keep the documented requirement rather than reproducing the false negatives.

The shared native count is shown once in totals; comparing it separately to both Swagger members does not create two native executions or 322 native findings.

## 4. Disposition and next gate

No unexplained correspondence gaps were observed. Retain the current implementation and its independent reporting. HEAD behavior and standard-template compliance are corroborated by real projects and discriminating injected controls.

**Stopped for user review. Full-spec validation has not run and requires separate approval.**

Evidence: [selection](selection.json), [runtime identity](evidence/runtime-identity.json), [injected controls](evidence/controls.json), [execution](evidence/execution.json), [audit summary](evidence/audit-summary.json), [setup recovery](evidence/runtime-recovery.json). Per-project reports follow the Scope / Difference inventory / Detailed differences structure used in `comp-reports`.

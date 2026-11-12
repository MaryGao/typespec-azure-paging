# Evidence details

## Method and source

The full screen used ARM specs at [`939d1a81ec5159e61394cd8ca2589c2c0ce49ccd`](https://github.com/Azure/azure-rest-api-specs/tree/939d1a81ec5159e61394cd8ca2589c2c0ce49ccd) and the TypeSpec rule at [`35bba1703d4c261d3807a67a3c1cfa6e2c923d12`](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-resource-manager/src/rules/no-query-in-collection.ts). The later PR head changed only generated documentation indexes.

`QueryParametersInCollectionGet` is marked `stagingOnly` in `@microsoft.azure/openapi-validator-rulesets@2.2.6`. The focused evaluator applied the registered rule function to emitted Swagger and resolved operation-parameter references, with no unresolved references. It found 2,155 occurrences. The [full screen](runs/full-20261111/full-staging-screen.json) records project-level Swagger, raw TypeSpec, and HTTP-aligned counts. These raw counts are not a finding-by-finding comparison.

Of 489 discovered projects, 488 compiled and produced 650 Swagger files; validation of those files completed without a Swagger-validation failure. AzureResilienceManagement was unassessed: the generated temporary config was rejected because a project config must be named `tspconfig.yaml` and cannot be passed as a build config.

The destination is the existing ARM `no-query-in-collection` rule because it already checks this policy; the change extends its operation selection instead of introducing a parallel rule.

## App Service library-defined query parameters

The [`AiGateways_ListByResourceGroup` TypeSpec operation](https://github.com/Azure/azure-rest-api-specs/blob/939d1a81ec5159e61394cd8ca2589c2c0ce49ccd/specification/web/resource-manager/Microsoft.Web/AppService/AIGateway.tsp#L45-L53) composes Azure.Core query models. Its [emitted Swagger collection GET](https://github.com/Azure/azure-rest-api-specs/blob/939d1a81ec5159e61394cd8ca2589c2c0ce49ccd/specification/web/resource-manager/Microsoft.Web/AppService/stable/2026-08-01/openapi.json#L2063-L2118) has seven disallowed query names: `top`, `skip`, `maxpagesize`, `filter`, `select`, `expand`, and `orderby`.

The Swagger linter reports all seven. The captured TypeSpec run has no corresponding warning for those names. For `top`, the [saved source-location match](runs/full-20261111/full-swagger-only-first.sanitized.json) points to the shared [Azure.Core declaration](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-core/lib/models.tsp#L62-L66); the [raw TypeSpec diagnostic extract](runs/full-20261111/native-483.raw-diagnostics.json) records the project's other warnings. The compiler's [linter collector](https://github.com/microsoft/typespec/blob/e06f6b34fdad9d7f49bfc084a598b03c60684e9a/packages/compiler/src/core/linter.ts#L566-L574) retains project-source diagnostics but drops library-source diagnostics. Plain `filter` is not the allowed `$filter` spelling.

This is a confirmed gap, not proof that it is the only one in the corpus. [Azure/typespec-azure#6066](https://github.com/Azure/typespec-azure/issues/6066) tracks the impact and the unresolved decision on reporting at a project usage site.

## Five-project comparison

| Project   | Swagger target findings | HTTP-aligned TypeSpec diagnostics | Observation                                                                                                            |
| --------- | ----------------------: | --------------------------------: | ---------------------------------------------------------------------------------------------------------------------- |
| Advisor   |                       6 |                                 6 | All Swagger findings matched.                                                                                          |
| Compute   |                      28 |                                28 | All matched; full AutoRest validation failed on a missing common-types reference, so Swagger findings are target-only. |
| Key Vault |                       5 |                                 6 | All five matched; one additional TypeSpec diagnostic is on an `@list` GET path outside Swagger's path heuristic.       |
| Network   |                      79 |                                81 | All 79 matched; two additional TypeSpec diagnostics are on an `@list` POST.                                            |
| Storage   |                      13 |                                13 | All Swagger findings matched.                                                                                          |

The [staging-rule evaluation](runs/five-project-fresh-2026-11-12/staging-rule-evaluation.json) and [operation/source matches](runs/five-project-fresh-2026-11-12/swagger-native-operation-matches.json) retain the observed findings. TypeSpec alignment used selected-version HTTP metadata and recorded parameter source locations, not a rerun of the rule on a projected program. A separate Key Vault AutoRest staging smoke run also produced five findings.

## Fixture-to-test mapping

The [Swagger fixtures](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/test/query-parameters-in-collection-get.test.ts) and [TypeSpec tests](https://github.com/MaryGao/typespec-azure-paging/blob/35bba1703d4c261d3807a67a3c1cfa6e2c923d12/packages/typespec-azure-resource-manager/test/rules/no-query-in-collection.test.ts) cover the following surfaces:

| Swagger fixture behavior                                              | TypeSpec coverage                                                                                                                                                                                                             |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Top-level and nested collection GETs; multiple extra query parameters | Collection GET and nested-path tests report the corresponding parameters.                                                                                                                                                     |
| `api-version` and `$filter` exemptions                                | A collection-GET control accepts both. The Swagger `$filter` fixture uses a point path, so its zero result alone does not prove the collection-path exemption; the Swagger rule implementation explicitly excludes `$filter`. |
| Point GET and non-GET operations                                      | Non-list point GET and POST controls are accepted. TypeSpec intentionally also checks POST operations marked `@list`.                                                                                                         |
| `x-ms-paths` query disambiguation                                     | Unassessed: no corresponding TypeSpec source fixture was verified.                                                                                                                                                            |
| No parameters                                                         | No direct counterpart was verified; compliant TypeSpec query controls emit no diagnostic.                                                                                                                                     |

Additional TypeSpec tests cover `@list` operations across methods and paths and shared-source deduplication. The library-parameter test currently expects no diagnostic; it reflects compiler suppression rather than demonstrating Swagger parity.

Focused rule tests, the dependency-closure build, formatting, and lint passed for the assessed candidate. The original full AutoRest check for Compute in the five-project run failed; its target-only findings are not presented as a successful full AutoRest run.

## Publication and refresh limits

The [task manifest](task.json) identifies the retained evidence and original receipt hashes. The App Service source-location receipt is sanitized only to replace its machine-specific package-install path with the portable package path; counts and locations are unchanged. The TypeSpec diagnostic extract preserves all raw rule diagnostics from the original project receipt. The original full worker inputs and receipts remain local and are not included here.

If rule semantics, the compiler/emitter closure, or the selected specs change, rerun the affected tests and real-spec assessment rather than treating this report as evidence for the new inputs. Documentation-index-only changes do not change the assessed rule source.

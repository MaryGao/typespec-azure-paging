# Search ARM: no-request-body comparison

## 1. Scope

Project: `specification/search/resource-manager/Microsoft.Search/Search`; selected Swagger API: `2026-09-01-preview`.
Native revision: `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core revision: `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs revision: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

**assessed.** Swagger target observations: **0**. Native raw/source warnings: **10** (6 GET, 4 DELETE). Differing source observations: **10** (0 Swagger-only, 10 native-only). Native ambient diagnostics: 0.

Audience: arm; Swagger policies: `GetMustNotHaveRequestBody`, `DeleteMustNotHaveRequestBody`. TypeSpec rule: `@azure-tools/typespec-azure-core/no-request-body`.

Comparison profile: Fresh native source diagnostics versus immutable historical ARM production observations.

Source programs and selected Swagger are not version/reachability aligned; client-only and nonselected-version operations remain in source scope. Raw warning counts and Swagger parameter diagnostics use different units; normalized actionable completeness is **not determined**. No full-population equivalence is claimed.

Evidence: [native receipt](evidence/search-arm/native.json), [worker input](evidence/search-arm/input.json), [execution receipt](evidence/search-arm/execution.json), [selected Spectral receipt](evidence/search-arm/spectral.json), [historical production evidence](evidence/search-arm/historical.json), [selection/provenance](selection.json).

## 2. Difference inventory

| Native source    | Verb   | SDK customization                                                     | Original wire operation                                     | Resolved Swagger body parameters |
| ---------------- | ------ | --------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| `client.tsp:167` | GET    | `Customizations.searchGetCustomization`                               | `Microsoft.Search.SearchServices.get`                       | 0                                |
| `client.tsp:259` | DELETE | `Customizations.searchDeleteCustomization`                            | `Microsoft.Search.SearchServices.delete`                    | 0                                |
| `client.tsp:316` | DELETE | `Customizations.queryKeysDeleteCustomization`                         | `Microsoft.Search.SearchServices.queryKeysDelete`           | 0                                |
| `client.tsp:533` | GET    | `Customizations.privateLinkResourcesListSupportedCustomization`       | `Microsoft.Search.SearchServices.listSupported`             | 0                                |
| `client.tsp:429` | GET    | `Customizations.privateEndpointConnectionsGetCustomization`           | `Microsoft.Search.PrivateEndpointConnections.get`           | 0                                |
| `client.tsp:498` | DELETE | `Customizations.privateEndpointConnectionsDeleteCustomization`        | `Microsoft.Search.PrivateEndpointConnections.delete`        | 0                                |
| `client.tsp:404` | GET    | `Customizations.privateEndpointConnectionsListByServiceCustomization` | `Microsoft.Search.PrivateEndpointConnections.listByService` | 0                                |
| `client.tsp:620` | GET    | `Customizations.SharedPrivateLinkResourcesGetCustomization`           | `Microsoft.Search.SharedPrivateLinkResources.get`           | 0                                |
| `client.tsp:702` | DELETE | `Customizations.SharedPrivateLinkResourcesDeleteCustomization`        | `Microsoft.Search.SharedPrivateLinkResources.delete`        | 0                                |
| `client.tsp:594` | GET    | `Customizations.SharedPrivateLinkResourcesListByServiceCustomization` | `Microsoft.Search.SharedPrivateLinkResources.listByService` | 0                                |

## 3. Detailed differences

All ten diagnostics target operations in the `Customizations` namespace in `client.tsp`, outside the declared HTTP service. Resolved HTTP metadata treats their unannotated SDK request-options wrappers (`params`, and sometimes a `body` placeholder) as implicit request bodies. The rule currently visits those source operations, so it reports them.

Each row was matched by exact diagnostic location to the semantic operation, then by actual SDK override object identity for Go, C#, and JavaScript to its original service operation. Original HTTP metadata has no non-void request body. Each original's exact verb/path uniquely matches the selected saved Swagger; all operation parameter references were resolved against hash-verified retained files, with zero body parameters.

These are **ten native-only source-scope observations, not ten demonstrated on-wire bodies**. The six GET cases preserve the previously known scope difference; the consolidated rule also exposes four DELETE cases. [#5993](https://github.com/Azure/typespec-azure/issues/5993) remains open. No source suppressions, production predicate edits, or finding normalization were applied. See the [complete semantic correspondence and source excerpts](evidence/search-arm/gap-investigation.json).

The no-gap condition for full validation is not met. Full validation was not started.

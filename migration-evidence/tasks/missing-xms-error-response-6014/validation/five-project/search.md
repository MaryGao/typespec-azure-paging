# Search: MissingXmsErrorResponse comparison

## 1. Scope

Project: `specification/search/resource-manager/Microsoft.Search/Search`; saved Swagger API `2026-09-01-preview`. Candidate `74e56a0f144190769180d5dbb27179db8b448c9c`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Assessed: **Swagger 3; TypeSpec 7; matched 3; Swagger-only 0; TypeSpec-only 4**. Swagger results are verified historical production execution, not a fresh rerun. Native lint is explicitly enabled on source scope, retaining suppressions; it is not selected-version projected or restricted to emitted service operations. Default activation is not assessed.

Evidence: [native receipt](evidence/search/native.json), [saved responses](evidence/search/saved-responses.json), [operation correspondence](evidence/search/correspondence.json), [saved production provenance](evidence/search/saved-validator-provenance.json), [run](evidence/execution.json).

## 2. Difference inventory

All three saved DELETE 404 findings match:

| Swagger operation | Native location |
| --- | --- |
| `QueryKeys_Delete` | `SearchService.tsp:361` |
| `PrivateEndpointConnections_Delete` | `PrivateEndpointConnection.tsp:78` |
| `SharedPrivateLinkResources_Delete` | `SharedPrivateLinkResource.tsp:83` |

Four native-only warnings are on unmarked DELETE 404 responses in client customizations:

| Source | Operation in `Customizations` namespace | Classification |
| --- | --- | --- |
| `client.tsp:259` | `searchDeleteCustomization` | Non-service client override |
| `client.tsp:316` | `queryKeysDeleteCustomization` | Non-service client override |
| `client.tsp:498` | `privateEndpointConnectionsDeleteCustomization` | Non-service client override |
| `client.tsp:702` | `SharedPrivateLinkResourcesDeleteCustomization` | Non-service client override |

## 3. Detailed differences

`main.tsp` imports `client.tsp`, whose operations are declared in `Customizations`, outside the `Microsoft.Search` service namespace. Compiler/HTTP inspection confirms all four are absent from the service-operation set and have no corresponding saved Swagger route/verb/status entry. Their return unions contain an unmarked `NotFoundResponse`; their existing suppressions target other rules and do not suppress this new rule.

The native listener checks concrete source operations, including these SDK-only overrides. Swagger checks emitted service response entries, so it cannot report these four source-only cases. This is a demonstrated population boundary, not four missed emitted errors and not a version explanation inferred from counts. Narrowing production lint to service operations would be a separate behavior decision; no code was changed to force parity.

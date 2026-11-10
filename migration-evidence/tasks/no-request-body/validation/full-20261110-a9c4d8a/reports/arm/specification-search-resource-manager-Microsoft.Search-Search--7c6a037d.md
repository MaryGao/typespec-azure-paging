# specification/search/resource-manager/Microsoft.Search/Search: no-request-body

## 1. Scope

**assessed.** Candidate `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Selected Swagger API: `2026-09-01-preview`.

Audience: arm. Native raw warnings: **10** (6 GET, 4 DELETE). Swagger target observations: **0**. Native-minus-Swagger difference: 10. Ambient diagnostics: 0.

Source and selected Swagger are not version/reachability aligned; raw operation warnings and parameter-level Swagger diagnostics are different units. Source suppressions remain honored, default activation is not assessed by target-only workers, and actionable equivalence is undetermined. Evidence: [native receipt](../../arm/native-417.json), [Swagger receipt](../../evidence/historical-arm.json), [full summary](../../index.md).

## 2. Difference inventory

- `client.tsp:167:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:259:4`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:316:4`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:533:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:429:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:498:4`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:404:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:620:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:702:4`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:594:4`: GET operations must not have a request body. Remove the request body.

## 3. Detailed differences

All ten warnings (six GET, four DELETE) target SDK-only Customizations operations, outside the declared HTTP service. Implicit options wrappers look like bodies to resolved source HTTP metadata. Exact SDK override identity and verb/path correspondences establish that all original service operations and reference-resolved Swagger operations are bodyless. The previous semantic audit is revalidated against identical full-run diagnostic tuples, source and package artifacts: [complete correspondence](../../evidence/search-gap-investigation.json). #5993 remains unresolved; no production edits, suppression or count normalization was applied.

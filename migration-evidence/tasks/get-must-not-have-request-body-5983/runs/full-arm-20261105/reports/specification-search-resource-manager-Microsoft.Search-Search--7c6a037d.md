# specification/search/resource-manager/Microsoft.Search/Search

**Status:** assessed. Saved Swagger findings: **0**; fresh native raw/source findings: **6/6**. Ambient diagnostics: **0**.

| Scope | Value |
|---|---|
| Saved Swagger API version | `2026-09-01-preview` |
| Candidate | `5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b` |
| Frozen specs | `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9` |
| Selected source inventory | 9 TypeSpec files; 171 retained inputs |
| Saved Swagger inventory | 1 documents; 13 GET operations |
| Saved operation-level GET body parameters | 0 |
| Raw Swagger-minus-native difference | -6 |

All six findings are source-only SDK customization operations in `namespace Customizations`, outside the declared Microsoft.Search HTTP service. Each has an implicit `params` request-options wrapper that HTTP metadata interprets as a body. Exact SDK override-object identity maps them to original service operations with no non-void request payload; those original verb/path pairs match saved Swagger GETs without body parameters. They are not six demonstrated on-wire GET-body violations. All six raw/source warnings remain counted. Whether the ARM lint should exclude these helpers remains a policy/review decision; validation did not change production code or add suppressions.

## Diagnostics

- `client.tsp:167:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:533:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:429:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:404:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:620:4`: GET operations must not have a request body. Remove the request body.
- `client.tsp:594:4`: GET operations must not have a request body. Remove the request body.

## Evidence and limits

[Native receipt](../native-417.json) | [Worker input](../native-417.input.json) | [Coverage](../coverage.md) | [Historical verification](../preflight/historical-full.json) | [Artifact verification](../preflight/artifact-verification.json) | [All-six semantic correspondence](../preflight/search-gap-investigation.json).

Historical production logs were hash-verified, explicitly selected GetMustNotHaveRequestBody, validated each saved primary Swagger document and completed successfully. Absence of an aggregate rule shard was not treated as proof of zero findings. Static local/relative parameter-reference resolution corroborates saved GET/body counts.

Native source scope is not a projection aligned to the saved emitted API version. The candidate compiler differs from the historical producer. Source suppressions remain honored; the target is explicitly enabled, so project default activation is not assessed. Injected positive/compliant/suppression controls are separate evidence and not real violating project sites.

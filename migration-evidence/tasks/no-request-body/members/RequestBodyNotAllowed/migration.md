# RequestBodyNotAllowed

## 1. Conclusion and scope

The GET/DELETE predicate of `@azure-tools/typespec-azure-core/no-request-body` implements the intended data-plane policy beyond `Azure.Core.RpcOperation`. Real-spec equivalence is not assessed.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-dataplane.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/request-body-not-allowed.md). Data-plane OpenAPI 2.0 warning; GET/DELETE operation parameters under `paths` are checked for `in: body`.

## 2. Actual coverage

**Assessed coverage:** the canonical local suite verifies both verbs on ordinary and RPC-derived operations, positive payloads and negative controls. The data-plane preset leaves the broader new rule disabled, preserving the existing enabled RPC rule. Current real-spec project and finding counts are unassessed.

## 3. Function-level coverage

Explicit and resolved implicit GET/DELETE bodies report once; optional and empty-model bodies are not exempt. Bodyless and non-target-method controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Both use warning severity, but Swagger diagnoses selected parameter fields while TypeSpec diagnoses resolved operation bodies. The old RPC-specific rule remains available and can overlap if both are enabled. No current numerical comparison has been performed.

## NOTES

The shared rule has one enablement/suppression ID for both verbs and audiences, not independent per-member controls. Data-plane real-spec coverage must be included after user approval; ARM-only historical evidence is insufficient.

# RequestBodyNotAllowed

## 1. Conclusion and scope

The GET/DELETE predicate of `@azure-tools/typespec-azure-core/no-request-body` implements the intended data-plane policy beyond `Azure.Core.RpcOperation`. Real-spec equivalence is not assessed.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-dataplane.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/request-body-not-allowed.md). Data-plane OpenAPI 2.0 warning; GET/DELETE operation parameters under `paths` are checked for `in: body`.

## 2. Actual coverage

**Assessed coverage:** the canonical local suite verifies both verbs on ordinary and RPC-derived operations, positive payloads and negative controls. The data-plane preset leaves the broader new rule disabled, preserving the existing enabled RPC rule. The [current pilot](../../validation/20261109-a9c4d8a/index.md) freshly compiles Key Vault Keys and Search data plane with zero target or ambient diagnostics. A separately documented selected-rule Spectral profile loads the installed production RequestBodyNotAllowed definition and reports zero findings on their frozen checked-in OAS2. Positive/negative/reference/selector controls pass.

This is selected-rule data-plane evidence, not coverage derived from the ARM-only shared baseline/analyzer, a saved data-plane baseline, or a full AutoRest production run. Source and selected Swagger populations are not version/reachability aligned; positive-case real-spec equivalence remains undetermined.

## 3. Function-level coverage

Explicit and resolved implicit GET/DELETE bodies report once; optional and empty-model bodies are not exempt. Bodyless and non-target-method controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Both use warning severity, but Swagger diagnoses selected parameter fields while TypeSpec diagnoses resolved operation bodies. The old RPC-specific rule remains available and can overlap if both are enabled. Both current data-plane projects have zero selected Swagger and native target observations; this does not prove positive-case equivalence.

## NOTES

The shared rule has one enablement/suppression ID for both verbs and audiences, not independent per-member controls. The combined pilot includes separate data-plane evidence, but has ten native-only ARM customization warnings. The user's no-gap condition for full validation is not met, so no full run was started.

# GetMustNotHaveRequestBody

## 1. Conclusion and scope

The GET branch of `@azure-tools/typespec-azure-core/no-request-body` implements the intended ARM policy. It replaces the unmerged ARM-only rule in PR #5986. Real-spec equivalence for this revision is not assessed.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-must-not-have-request-body.md). ARM OpenAPI 2.0 error, guideline RPC-Get-V1-02; resolved operation-level body parameters under `paths` and `x-ms-paths`.

## 2. Actual coverage

**Assessed coverage:** local GET violating/compliant cases, RPC operations, and ARM read-template customization pass. The [current three-project ARM pilot](../../validation/20261109-a9c4d8a/index.md) has zero saved production Swagger GET observations and six native GET warnings, all Search client-only customizations. Every warning maps to a bodyless original service operation and saved Swagger route. Advisor and Compute have no target findings. Fresh selected-rule Spectral execution corroborates the saved zero counts; this is not full-population or version-aligned equivalence.

## 3. Function-level coverage

Explicit, implicit, optional, empty-model, body-root, primitive, and multipart GET bodies report once. Bodyless, `void`, HTTP-metadata-only and non-request-visible controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Swagger selects body parameters and emits errors; TypeSpec resolves the payload and reports one warning per operation. Current GET counts differ by six source-only SDK customizations, whose implicit options wrappers are interpreted as request bodies. These are not six demonstrated on-wire bodies. Raw findings remain visible; #5993 is unresolved.

## NOTES

One shared Core rule controls both GET and DELETE. Existing RPC behavior is preserved. The user authorized full validation only if representative comparison has no gaps; that condition is not met, so no full run was started.

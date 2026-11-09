# GetMustNotHaveRequestBody

## 1. Conclusion and scope

The GET branch of `@azure-tools/typespec-azure-core/no-request-body` implements the intended ARM policy. It replaces the unmerged ARM-only rule in PR #5986. Real-spec equivalence for this revision is not assessed.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/get-must-not-have-request-body.md). ARM OpenAPI 2.0 error, guideline RPC-Get-V1-02; resolved operation-level body parameters under `paths` and `x-ms-paths`.

## 2. Actual coverage

**Assessed coverage:** local GET violating/compliant cases, RPC operations, and ARM read-template customization pass. Current Swagger/TypeSpec real-spec project and finding counts are unassessed; earlier ARM-only results do not validate changed source.

## 3. Function-level coverage

Explicit, implicit, optional, empty-model, body-root, primitive, and multipart GET bodies report once. Bodyless, `void`, HTTP-metadata-only and non-request-visible controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Swagger selects body parameters and emits errors; TypeSpec resolves the payload and reports one warning per operation. Whole-source operations and client-only helpers can differ from emitted service routes. No current numerical comparison has been performed.

## NOTES

One shared Core rule controls both GET and DELETE. Existing RPC behavior is preserved. User manual PR review and approval are required before five-project validation; full specs require another approval.

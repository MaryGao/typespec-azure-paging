# DeleteMustNotHaveRequestBody

## 1. Conclusion and scope

The DELETE branch of `@azure-tools/typespec-azure-core/no-request-body` implements the intended ARM policy for issue #5982. Real-spec equivalence is not assessed.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/delete-must-not-have-request-body.md). ARM OpenAPI 2.0 error, guideline RPC-Delete-V1-02; resolved operation-level body parameters under `paths`.

The documentation labels applicability as ARM and data plane, but actual caller selection registers this rule through the ARM ruleset. Data-plane GET/DELETE enforcement is separately registered as `RequestBodyNotAllowed`.

## 2. Actual coverage

**Assessed coverage:** local DELETE violating/compliant cases, RPC operations, and synchronous/asynchronous ARM delete-template customization pass. Current Swagger/TypeSpec real-spec project and finding counts are unassessed.

## 3. Function-level coverage

Explicit, implicit, optional, empty-model, body-root, primitive, and multipart DELETE bodies report once. Bodyless, `void`, HTTP-metadata-only and non-request-visible controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Swagger emits an error per selected body parameter and does not select `x-ms-paths` or path-item-level parameters. TypeSpec emits one warning per resolved body-bearing DELETE operation, without reproducing JSON-selector blind spots. No current numerical comparison has been performed.

## NOTES

One shared Core rule controls both GET and DELETE. Existing RPC behavior is preserved. User manual PR review and approval are required before five-project validation; full specs require another approval.

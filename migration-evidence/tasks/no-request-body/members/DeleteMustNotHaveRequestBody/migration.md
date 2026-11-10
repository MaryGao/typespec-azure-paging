# DeleteMustNotHaveRequestBody

## 1. Conclusion and scope

The DELETE branch of `@azure-tools/typespec-azure-core/no-request-body` implements the intended ARM policy for issue #5982. Full observed-population comparison is complete; whole-rule equivalence remains undetermined.

Swagger sources: [implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/az-arm.ts), [documentation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/delete-must-not-have-request-body.md). ARM OpenAPI 2.0 error, guideline RPC-Delete-V1-02; resolved operation-level body parameters under `paths`.

The documentation labels applicability as ARM and data plane, but actual caller selection registers this rule through the ARM ruleset. Data-plane GET/DELETE enforcement is separately registered as `RequestBodyNotAllowed`.

## 2. Actual coverage

**Assessed coverage:** local DELETE violating/compliant cases, RPC operations, and synchronous/asynchronous ARM delete-template customization pass. The [current three-project ARM pilot](../../validation/20261109-a9c4d8a/index.md) has zero saved production Swagger DELETE observations and four native DELETE warnings, all Search client-only customizations. Every warning maps to a bodyless original service operation and saved Swagger route. Advisor and Compute have no target findings. Fresh selected-rule Spectral execution corroborates the saved zero counts; this is not full-population or version-aligned equivalence.

## 3. Function-level coverage

The [full frozen-population comparison](../../validation/full-20261110-a9c4d8a/index.md) covers all 487 ARM projects, with successful native compilation and finalized baseline-integrity checks. Saved production DELETE observations are zero; four native DELETE warnings remain, exclusively the already-investigated Search client-only customizations. Nine actual DELETE-body wire cases were observed in the separate data-plane audience, not double-counted as ARM policy findings.

Explicit, implicit, optional, empty-model, body-root, primitive, and multipart DELETE bodies report once. Bodyless, `void`, HTTP-metadata-only and non-request-visible controls pass. See the [group report](../../migration.md) for shared evidence and exact revision.

## 4. Why diagnostic counts differ

Swagger emits an error per selected body parameter and does not select `x-ms-paths` or path-item-level parameters. TypeSpec emits one warning per resolved body-bearing DELETE operation, without reproducing JSON-selector blind spots. The current four-warning difference consists of Search SDK customizations with implicit options-wrapper bodies; all actual service operations are bodyless. These are not four demonstrated wire violations, and no findings are suppressed or normalized away.

## NOTES

One shared Core rule controls both GET and DELETE. Existing RPC behavior is preserved. The user explicitly authorized full validation despite the pilot gaps on November 10, 2026. All 487 ARM projects were assessed; #5993 remains unresolved, and raw findings are retained.

# PatchResponseCodes + LroPatch202 migration

## 1. Conclusion and scope

The TypeSpec rule `arm-patch-operation-response-codes` migrates Swagger linter
rules [PatchResponseCodes](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/patch-response-codes.md)
and [LroPatch202](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/lro-patch202.md).
**The rules are not equivalent for operations marked long-running only by an
explicit Swagger extension or the legacy AutoRest marker:** the TypeSpec rule
classifies them using Azure Core LRO metadata, like the DELETE rule. The
rule also does not validate long-running options. The extent of these
differences in production Azure service projects remains undetermined because
no real-spec comparison has been run.

## 2. Actual coverage

No Azure service projects have been assessed. Findings are total individual
diagnostics across the population, not project counts.

| Count                              | Swagger linter | TypeSpec linter |
| ---------------------------------- | -------------- | --------------- |
| Reported service-project diagnostics | unassessed     | unassessed      |
| Comparable violation totals / coverage | unassessed | unassessed      |

**Assessed coverage:** No service population was assessed, so diagnostic totals,
comparable violation totals, and coverage percentages remain unassessed. The
implementation and focused tests do not establish production prevalence or
semantic correspondence.

See [Why diagnostic counts differ](#4-why-diagnostic-counts-differ) for the
current comparison limitation.

## 3. Function-level coverage

| Behavior | Result | Rationale |
| --- | --- | --- |
| Synchronous PATCH has exactly `200` and `default` responses. | Implemented; production equivalence unassessed | The rule check and focused tests are in [the implementation](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts) and [ARM tests](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/test/rules/arm-patch-response-codes.test.ts). No service comparison has been run. |
| Long-running PATCH has exactly `200`, `202`, and `default`; its `202` response has no body. | Implemented; production equivalence unassessed | The check and fixtures are covered by the [rule implementation](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts) and [ARM tests](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/test/rules/arm-patch-response-codes.test.ts). |
| LRO classification using Azure Core metadata. | Implemented; differs from Swagger flags | The [rule](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts) uses `getLroMetadata`, as DELETE does. [AutoRest tests](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-autorest/test/arm-patch-response-codes.test.ts) show that an explicit flag or AutoRest-scoped legacy marker alone emits an LRO flag but is treated as synchronous by the TypeSpec rule. |
| Long-running options and explicit flag consistency. | Missing | The TypeSpec rule does not validate `x-ms-long-running-operation-options` or its flag; see [Swagger implementation](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/packages/rulesets/src/spectral/functions/patch-response-codes.ts). |
| Scope is ARM provider services, including nested namespaces. | Implemented; population coverage unassessed | The rule enumerates provider service operations in its [implementation](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts); production project coverage has not been measured. |
| Per-version response behavior. | Unassessed | The rule inspects unprojected response types; the [rule documentation](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-operation-response-codes.md) records this limitation. |

## 4. Why diagnostic counts differ

No real Azure specification comparison or diagnostic attribution was run.
Focused tests establish that explicit or legacy LRO markers without protocol
metadata can lead to different classification. The TypeSpec rule also does not
check LRO options. Service-project counts, attribution, and group correspondence
remain unassessed pending the approved comparison.

## NOTES

- This is a provisional report for the draft PR. It is not an equivalence or
  acceptance decision and must be replaced with assessed results after review
  and approval.
- Frozen Swagger source revision: `e1b8b207a196cf2fc288593efec22e6e38ab98d5`.
  Azure base: `72f18e650de1b07b991839e61ee5b2642df3e37f`; candidate:
  `2c8fd2fbdc425119e1ff34faad2828525f57b7ef`; core submodule:
  `b5e41f255d6b1fe573904e44cb71d772802ada3b`.
- Focused PATCH, DELETE, AutoRest, and ruleset tests passed. Build-mode
  TypeScript checks passed for Azure Core, TCGC, ARM, and AutoRest; formatting
  and type-aware lint passed for the revised files.
- Full package lifecycle scripts were not rerun against this head: the
  repository-pinned pnpm manager was unavailable, and Corepack's download
  failed with a TLS handshake error. No real-spec validation was run.
- The rule is a warning, enabled in ARM's `all` ruleset and not added to the
  curated `resource-manager` ruleset. Duplicate HTTP compiler diagnostics
  remain tracked separately in [Azure/typespec-azure#6084](https://github.com/Azure/typespec-azure/issues/6084);
  this change does not modify TypeSpec HTTP diagnostic behavior.

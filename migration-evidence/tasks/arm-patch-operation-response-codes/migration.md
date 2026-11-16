# PatchResponseCodes + LroPatch202 migration

## 1. Conclusion and scope

The TypeSpec rule `arm-patch-operation-response-codes` migrates Swagger linter
rules [PatchResponseCodes](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/patch-response-codes.md)
and [LroPatch202](https://github.com/Azure/azure-openapi-validator/blob/e1b8b207a196cf2fc288593efec22e6e38ab98d5/docs/lro-patch202.md).
**Functional equivalence for production Azure service projects remains
undetermined:** no real-spec comparison has been run. This assessment is limited
to implementation and focused test behavior; it does not establish service
coverage or bug-for-bug equivalence.

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
| LRO classification requires a strict `x-ms-long-running-operation: true` flag and accounts for OpenAPI extensions, protocol metadata, and the AutoRest-scoped legacy marker. | Implemented; production equivalence unassessed | Classification and marker behavior are exercised by the [ARM tests](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/test/rules/arm-patch-response-codes.test.ts), [AutoRest tests](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-autorest/test/arm-patch-response-codes.test.ts), and [LRO protocol tests](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-core/test/lro-protocol.test.ts). |
| Scope is ARM provider services, including nested namespaces. | Implemented; population coverage unassessed | The rule enumerates provider service operations in its [implementation](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-response-codes.ts); production project coverage has not been measured. |
| Per-version response behavior. | Unassessed | The rule inspects unprojected response types; the [rule documentation](https://github.com/Azure/typespec-azure/blob/fix/arm-patch-response-codes-clean/packages/typespec-azure-resource-manager/src/rules/arm-patch-operation-response-codes.md) records this limitation. |

## 4. Why diagnostic counts differ

No real Azure specification comparison or diagnostic attribution was run, so no
Swagger-only, TypeSpec-only, count-only, or semantic difference groups have
been observed. This is not evidence that there are no differences. Raw totals,
attribution, and group correspondence remain unassessed pending the approved
comparison.

## NOTES

- This is a provisional report for the draft PR. It is not an equivalence or
  acceptance decision and must be replaced with assessed results after review
  and approval.
- Frozen Swagger source revision: `e1b8b207a196cf2fc288593efec22e6e38ab98d5`.
  Azure base: `72f18e650de1b07b991839e61ee5b2642df3e37f`; candidate:
  `71a6b2f7c2591da340418422d7240aaf22919cf0`; core submodule:
  `b5e41f255d6b1fe573904e44cb71d772802ada3b`.
- Focused tests passed: 92 tests across five selected files. Build-mode
  TypeScript checks passed for Azure Core, TCGC, ARM, and AutoRest.
- Full package lifecycle scripts and type-aware lint were not rerun against
  this head: the repository-pinned pnpm manager was unavailable, and Corepack's
  download failed with a TLS handshake error. No real-spec validation was run.
- The rule is a warning, enabled in ARM's `all` ruleset and not added to the
  curated `resource-manager` ruleset. Duplicate HTTP compiler diagnostics
  remain tracked separately in [Azure/typespec-azure#6084](https://github.com/Azure/typespec-azure/issues/6084);
  this change does not modify TypeSpec HTTP diagnostic behavior.

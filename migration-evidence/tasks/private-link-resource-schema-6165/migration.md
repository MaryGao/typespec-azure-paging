# Private link resource schema migration

## 1. Scope

[`PrivateEndpointResourceSchemaValidation`](https://github.com/Azure/azure-openapi-validator/blob/405e6f094fa8280e05af23327845f6202a8edc65/packages/rulesets/src/native/legacyRules/PrivateEndpointResourceSchemaValidation.ts) maps to `@azure-tools/typespec-azure-resource-manager/private-link-resource-schema`. Implementation: [Azure/typespec-azure#6165](https://github.com/Azure/typespec-azure/pull/6165); tracking: [#6155](https://github.com/Azure/typespec-azure/issues/6155).

The native rule checks GET 200 payloads on operations attached to resolved ARM resources, using the Swagger path suffixes without requiring particular private-link templates. It does not require missing APIs to exist. The broader operation-scope discussion remains in [#6159](https://github.com/Azure/typespec-azure/issues/6159).

## 2. Coverage

All **56 approved suitable services** were assessed on both sides: **57 checked-in Swagger documents** and **56 unprojected TypeSpec projects**. No project failed. All 73 selected Swagger candidate routes had exact TypeSpec route counterparts; TypeSpec exposed three additional candidate routes absent from selected Swagger.

| Observed raw diagnostics  | Swagger | TypeSpec |
| ------------------------- | ------: | -------: |
| Reported diagnostics      |       1 |        1 |
| Swagger-only diagnostics  |       0 |        - |
| TypeSpec-only diagnostics |       - |        0 |

**Final gap analysis:** **0 Swagger-only and 0 TypeSpec-only diagnostic cases** were observed in the approved population. The one diagnostic on each side belongs to the same operation and response-shape issue, not a migration difference. No new migration-rule gaps were observed in this comparison. The [diagnostic differences](evidence.md#diagnostic-differences) and [raw observations](observations.json) reconcile both directions separately.

This is not proof of version-matched or suppression-inclusive parity: TypeSpec is unprojected, Swagger uses selected checked-in API documents, source suppressions are retained, and Swagger README suppressions are not applied. Exact AutoRest core and full transitive tool dependency identities were not recorded. Services without candidate routes do not establish behavioral coverage for this rule. See [population and limits](evidence.md#population-and-limits).

## 3. Why diagnostic counts differ

| Category                                                                         | Swagger-only diagnostics | TypeSpec-only diagnostics | Explanation                      |
| -------------------------------------------------------------------------------- | -----------------------: | ------------------------: | -------------------------------- |
| [Swagger-only cases](evidence.md#swagger-only-cases)                             |                        0 |                         0 | None observed.                   |
| [TypeSpec-only cases](evidence.md#typespec-only-cases)                           |                        0 |                         0 | None observed.                   |
| [Unresolved differing diagnostics](evidence.md#unresolved-differing-diagnostics) |                        0 |                         0 | None in the assessed population. |

**Signed reconciliation:** Swagger minus TypeSpec is **1 - 1 = +0 Swagger-only - 0 TypeSpec-only + 0 unresolved remainder = 0**. The shared diagnostic cancels; it is recorded separately for raw-count traceability, not included as a gap case.

Maps has three TypeSpec-only route-inventory entries, but no rule diagnostics on them. These are not TypeSpec-only diagnostic cases and are not classified as a confirmed version-aware linting issue. See [route inventory differences](evidence.md#route-inventory-differences).

## 4. Function-level coverage

| Swagger behavior                                                                                                                 | Observed TypeSpec outcome and limit                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Private endpoint connection point GET 200: check `properties.privateEndpoint` and `properties.privateLinkServiceConnectionState` | All 24 selected Swagger point routes have native counterparts; TypeSpec accepts the encountered payloads. No violating point response was observed in this population.                                                                                          |
| Private endpoint connection collection GET 200: inspect `value` array items                                                      | All 24 selected Swagger collection routes have native counterparts; no differing diagnostic was observed.                                                                                                                                                       |
| Private link resource collection GET 200: check `properties.groupId`, `requiredMembers`, and `requiredZoneNames`                 | All 25 selected Swagger collection routes have native counterparts. Both validators report the same malformed response; the other selected responses produce no finding.                                                                                        |
| Follow referenced/inherited schema structure                                                                                     | The comparison uses referenced Swagger inputs and native response models; reference hashes and source hashes are recorded. This does not establish equivalence for every inheritance or metadata pattern.                                                       |
| Resource and operation selection                                                                                                 | All 76 native candidate GET operations in this run belong to resolved ARM resources. Native excludes unassociated provider-level operations, unlike Swagger's path-based selection; no differing diagnostic from that boundary was observed in this population. |

See [function-level observations](evidence.md#function-level-observations), the [candidate implementation](https://github.com/MaryGao/typespec-azure-paging/blob/9fc24d4768a0c7b1a490de863958abe44085881f/packages/typespec-azure-resource-manager/src/rules/private-link-resource-schema.ts), and [focused behavioral tests](https://github.com/MaryGao/typespec-azure-paging/blob/9fc24d4768a0c7b1a490de863958abe44085881f/packages/typespec-azure-resource-manager/test/rules/private-link-resource-schema.test.ts). Passing routes and authoring checks are not population-wide semantic parity.

## NOTES

- [Pinned population and input mapping](selection.json), [validation identity and integrity verification](validation.json), [source and reference fingerprints](input-hashes.json), and [per-service observations](observations.json).
- Candidate `9fc24d4768a0c7b1a490de863958abe44085881f`; core `123e997958ced3b632caa0a4486e306d1487ca82`; specs `1775cd6359369f2e5092d08ada94b4b4c1b8acba`.
- The native rule is explicitly enabled for this comparison, at warning severity. It remains disabled in the recommended resource-manager ruleset; the reused Swagger rule runs at error severity.
- This report covers the complete approved suitable-service list, not every specification in the repository. Synthetic cases are excluded from this migration report and its counts.

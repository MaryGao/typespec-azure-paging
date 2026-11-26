# Resource path validation migration

## 1. Scope

The opt-in TypeSpec rule `@azure-tools/typespec-azure-resource-manager/resource-path-validation` in [PR #6163](https://github.com/Azure/typespec-azure/pull/6163) covers five Swagger rules: `PathContainsResourceType`, `PathForNestedResource`, `PathForTrackedResourceTypes`, `PathResourceProviderNamePascalCase`, and `PathResourceProviderMatchNamespace`.

The comparison uses TypeSpec Azure candidate `6f1de36f58258c789577ae516331b14a3af7b121`, TypeSpec core `123e997958ced3b632caa0a4486e306d1487ca82`, and [azure-rest-api-specs `1775cd6359369f2e5092d08ada94b4b4c1b8acba`](https://github.com/Azure/azure-rest-api-specs/tree/1775cd6359369f2e5092d08ada94b4b4c1b8acba).

## 2. Coverage

All **56 projects** on the [suitable-service list](https://github.com/markcowl/azure-rest-api-specs/blob/30a602e9e17f834fb9de6c3f500dbc1a5f2447cb/documentation/typespec-arm-resource-data/Report_20261106/provisioning-validation-services.md#services-suitable-for-validation) were assessed against **57 Swagger documents**. Swagger reported **102 diagnostics** and TypeSpec **106**, with **101 matching route/rule pairs**.

### Projects with findings

| Project           | Swagger version | Swagger | TypeSpec | Matched | Swagger-only | TypeSpec-only |
| ----------------- | --------------- | ------: | -------: | ------: | -----------: | ------------: |
| Attestation       | 2021-06-01      |       1 |        1 |       1 |            0 |             0 |
| Load Testing      | 2022-12-01      |       0 |        1 |       0 |            0 |             1 |
| MySQL             | 2024-12-30      |      46 |       48 |      46 |            0 |             2 |
| PostgreSQL        | 2026-10-01      |      52 |       54 |      52 |            0 |             2 |
| Recovery Services | 2026-11-01      |       1 |        0 |       0 |            1 |             0 |
| Resource Health   | 2026-07-01      |       2 |        2 |       2 |            0 |             0 |

## 3. Why diagnostic counts differ

All six remaining gaps are known issues or a false positive:

| Gap case                                                                                    | Analysis                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Known issue: API versions (5 TypeSpec-only)](gap-evidence.md#api-version-mismatch-cases)   | Tracked in [#5875](https://github.com/Azure/typespec-azure/issues/5875). |
| [Swagger false positive: named singleton (1 Swagger-only)](gap-evidence.md#named-singleton) | Swagger rejects a required fixed singleton name.                         |

The [three previously Swagger-only tracked paths](gap-evidence.md#tracked-resource-classification) now match. Counts reconcile as `102 - 106 = 1 - 5 = -4`.

## 4. Function-level coverage

| Behavior                 | Result                                                      |
| ------------------------ | ----------------------------------------------------------- |
| Resource type path       | No findings                                                 |
| Nested resource path     | One known version difference and one Swagger false positive |
| Tracked-resource scope   | Three matched route/rule pairs                              |
| Provider PascalCase      | 98 matched pairs and four known version differences         |
| Provider namespace match | No findings                                                 |

## 5. Method and limitations

- The rule was explicitly enabled on unprojected TypeSpec source. Swagger used the latest stable version per project (latest preview when no stable version exists). TypeSpec suppressions were retained; Swagger README suppressions were not applied.
- Swagger used OpenAPI validator 2.2.4, rulesets 2.2.6, validator core 1.0.7 and AutoRest launcher 3.8.0. Cached results were reused after input and output hash checks; the exact AutoRest core was not recorded. See the [validation receipts](validation-receipts.json).
- Matches use literal routes and rule categories, not operation identity. Version and suppression differences, as well as schema visibility, limit parity conclusions.

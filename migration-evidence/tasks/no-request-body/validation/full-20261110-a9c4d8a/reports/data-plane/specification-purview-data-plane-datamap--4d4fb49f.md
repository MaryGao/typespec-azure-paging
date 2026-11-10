# specification/purview/data-plane/datamap: no-request-body

## 1. Scope

**assessed.** Candidate `a9c4d8a1db1bad607cd21d856421c6b1b712d746`; core `837b5a769414f853fd22eeed0a123c953425b1d8`; frozen specs `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Selected Swagger API: `2024-03-01-preview`.

Audience: data-plane. Native raw warnings: **12** (0 GET, 12 DELETE). Swagger target observations: **6**. Native-minus-Swagger difference: 6. Ambient diagnostics: 0.

Source and selected Swagger are not version/reachability aligned; raw operation warnings and parameter-level Swagger diagnostics are different units. Source suppressions remain honored, default activation is not assessed by target-only workers, and actionable equivalence is undetermined. Evidence: [native receipt](../../data-plane/projects/079-purview-datamap/native.json), [Swagger receipt](../../data-plane/projects/079-purview-datamap/spectral.json), [full summary](../../index.md).

## 2. Difference inventory

- `routes.tsp:658:3`: DELETE operations must not have a request body. Remove the request body.
- `routes.tsp:706:3`: DELETE operations must not have a request body. Remove the request body.
- `routes.tsp:785:3`: DELETE operations must not have a request body. Remove the request body.
- `routes.tsp:859:3`: DELETE operations must not have a request body. Remove the request body.
- `routes.tsp:1350:3`: DELETE operations must not have a request body. Remove the request body.
- `routes.tsp:2085:3`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:59:3`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:61:3`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:66:3`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:69:3`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:96:3`: DELETE operations must not have a request body. Remove the request body.
- `client.tsp:155:3`: DELETE operations must not have a request body. Remove the request body.

## 3. Detailed differences

There are **six actual DELETE wire operations with bodies**, and both rules detect all six. Native source traversal additionally reports their six client aliases outside the declared HTTP service: **12 native warnings versus six Swagger observations**. Compiler sourceOperation object identity, declared HTTP service membership, exact verb/path and each frozen Swagger body parameter establish the one-service-plus-one-alias correspondence. Raw counts are retained; this is not six additional on-wire defects, a blanket normalization, or proof of whole-rule parity. [Complete semantic correspondence](../../evidence/purview-gap-investigation.json).

| Wire DELETE route                                                      | Swagger operationId                         | Native service operation                                   | Native client alias                                        |
| ---------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `/atlas/v2/entity/guid/{guid}/businessmetadata`                        | `Entity_RemoveBusinessMetadata`             | `PurviewDataMap.Entity.removeBusinessMetadata`             | `Customizations.Entity.removeBusinessMetadata`             |
| `/atlas/v2/entity/guid/{guid}/businessmetadata/{businessMetadataName}` | `Entity_RemoveBusinessMetadataAttributes`   | `PurviewDataMap.Entity.removeBusinessMetadataAttributes`   | `Customizations.Entity.removeBusinessMetadataAttributes`   |
| `/atlas/v2/entity/guid/{guid}/labels`                                  | `Entity_RemoveLabels`                       | `PurviewDataMap.Entity.removeLabels`                       | `Customizations.Entity.removeLabels`                       |
| `/atlas/v2/entity/uniqueAttribute/type/{typeName}/labels`              | `Entity_RemoveLabelsByUniqueAttribute`      | `PurviewDataMap.Entity.removeLabelsByUniqueAttribute`      | `Customizations.Entity.removeLabelsByUniqueAttribute`      |
| `/atlas/v2/glossary/terms/{termId}/assignedEntities`                   | `Glossary_DeleteTermAssignmentFromEntities` | `PurviewDataMap.Glossary.deleteTermAssignmentFromEntities` | `Customizations.Glossary.deleteTermAssignmentFromEntities` |
| `/atlas/v2/types/typedefs`                                             | `Type_BulkDelete`                           | `PurviewDataMap.Type.bulkDelete`                           | `Customizations.TypeDefinition.batchDelete`                |

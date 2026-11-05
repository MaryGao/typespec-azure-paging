# specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB: DefaultInEnum

## Scope

Saved API version: `2026-04-01-preview`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 18 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `openapi.json` | `["definitions","BaseCopyJobProperties","properties","jobType"]` | `["CassandraRUToCassandraRU","CassandraRUToAzureBlobStorage","AzureBlobStorageToCassandraRU","MongoRUToMongoRU","MongoRUToMongoVCore","NoSqlRUToNoSqlRU"]` | `"NoSqlRUToNoSqlRU"` | Compliant |
| `openapi.json` | `["definitions","ConflictResolutionPolicy","properties","mode"]` | `["LastWriterWins","Custom"]` | `"LastWriterWins"` | Compliant |
| `openapi.json` | `["definitions","ContainerPartitionKey","properties","kind"]` | `["Hash","Range","MultiHash"]` | `"Hash"` | Compliant |
| `openapi.json` | `["definitions","DataTransferDataSourceSink","properties","component"]` | `["CosmosDBCassandra","CosmosDBMongo","CosmosDBMongoVCore","CosmosDBSql","AzureBlobStorage","BaseCosmosDataTransferDataSourceSink"]` | `"CosmosDBCassandra"` | Compliant |
| `openapi.json` | `["definitions","DatabaseAccountCreateUpdateParameters","properties","kind"]` | `["GlobalDocumentDB","MongoDB","Parse"]` | `"GlobalDocumentDB"` | Compliant |
| `openapi.json` | `["definitions","DatabaseAccountCreateUpdateProperties","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","DatabaseAccountGetProperties","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","DatabaseAccountGetResults","properties","kind"]` | `["GlobalDocumentDB","MongoDB","Parse"]` | `"GlobalDocumentDB"` | Compliant |
| `openapi.json` | `["definitions","GremlinDatabaseResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","GremlinGraphResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","Indexes","properties","dataType"]` | `["String","Number","Point","Polygon","LineString","MultiPolygon"]` | `"String"` | Compliant |
| `openapi.json` | `["definitions","Indexes","properties","kind"]` | `["Hash","Range","Spatial"]` | `"Hash"` | Compliant |
| `openapi.json` | `["definitions","IndexingPolicy","properties","indexingMode"]` | `["consistent","lazy","none"]` | `"consistent"` | Compliant |
| `openapi.json` | `["definitions","MongoDBCollectionResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","MongoDBDatabaseResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","SqlContainerResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","SqlDatabaseResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |
| `openapi.json` | `["definitions","TableResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-204.json) | [Exact worker input](../native-204.input.json) | [Worker log](../native-204.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

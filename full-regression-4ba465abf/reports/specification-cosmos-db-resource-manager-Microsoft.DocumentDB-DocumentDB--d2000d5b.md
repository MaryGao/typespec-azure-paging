# specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-04-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/18 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["definitions","BaseCopyJobProperties","properties","jobType"]` | `["CassandraRUToCassandraRU","CassandraRUToAzureBlobStorage","AzureBlobStorageToCassandraRU","MongoRUToMongoRU","MongoRUToMongoVCore","NoSqlRUToNoSqlRU"]` | `"NoSqlRUToNoSqlRU"` |
| `openapi.json` | `["definitions","ConflictResolutionPolicy","properties","mode"]` | `["LastWriterWins","Custom"]` | `"LastWriterWins"` |
| `openapi.json` | `["definitions","ContainerPartitionKey","properties","kind"]` | `["Hash","Range","MultiHash"]` | `"Hash"` |
| `openapi.json` | `["definitions","DataTransferDataSourceSink","properties","component"]` | `["CosmosDBCassandra","CosmosDBMongo","CosmosDBMongoVCore","CosmosDBSql","AzureBlobStorage","BaseCosmosDataTransferDataSourceSink"]` | `"CosmosDBCassandra"` |
| `openapi.json` | `["definitions","DatabaseAccountCreateUpdateParameters","properties","kind"]` | `["GlobalDocumentDB","MongoDB","Parse"]` | `"GlobalDocumentDB"` |
| `openapi.json` | `["definitions","DatabaseAccountCreateUpdateProperties","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","DatabaseAccountGetProperties","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","DatabaseAccountGetResults","properties","kind"]` | `["GlobalDocumentDB","MongoDB","Parse"]` | `"GlobalDocumentDB"` |
| `openapi.json` | `["definitions","GremlinDatabaseResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","GremlinGraphResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","Indexes","properties","dataType"]` | `["String","Number","Point","Polygon","LineString","MultiPolygon"]` | `"String"` |
| `openapi.json` | `["definitions","Indexes","properties","kind"]` | `["Hash","Range","Spatial"]` | `"Hash"` |
| `openapi.json` | `["definitions","IndexingPolicy","properties","indexingMode"]` | `["consistent","lazy","none"]` | `"consistent"` |
| `openapi.json` | `["definitions","MongoDBCollectionResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","MongoDBDatabaseResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","SqlContainerResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","SqlDatabaseResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |
| `openapi.json` | `["definitions","TableResource","properties","createMode"]` | `["Default","Restore"]` | `"Default"` |

[Native receipt](../native-204.json) | [Worker input](../native-204.input.json) | [Worker log](../native-204.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

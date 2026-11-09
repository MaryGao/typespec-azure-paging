# specification/databox/resource-manager/Microsoft.DataBox/DataBox: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2025-07-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/9 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `databox.json` | `["definitions","DataAccountDetails","properties","dataAccountType"]` | `["StorageAccount","ManagedDisk"]` | `"StorageAccount"` |
| `databox.json` | `["definitions","DataExportDetails","properties","logCollectionLevel"]` | `["Error","Verbose"]` | `"Error"` |
| `databox.json` | `["definitions","DataImportDetails","properties","logCollectionLevel"]` | `["Error","Verbose"]` | `"Error"` |
| `databox.json` | `["definitions","EncryptionPreferences","properties","doubleEncryption"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `databox.json` | `["definitions","JobProperties","properties","deliveryType"]` | `["NonScheduled","Scheduled"]` | `"NonScheduled"` |
| `databox.json` | `["definitions","KeyEncryptionKey","properties","kekType"]` | `["MicrosoftManaged","CustomerManaged"]` | `"MicrosoftManaged"` |
| `databox.json` | `["definitions","ShippingAddress","properties","addressType"]` | `["None","Residential","Commercial"]` | `"None"` |
| `databox.json` | `["definitions","TransferAllDetails","properties","dataAccountType"]` | `["StorageAccount","ManagedDisk"]` | `"StorageAccount"` |
| `databox.json` | `["definitions","TransferFilterDetails","properties","dataAccountType"]` | `["StorageAccount","ManagedDisk"]` | `"StorageAccount"` |

[Native receipt](../native-209.json) | [Worker input](../native-209.input.json) | [Worker log](../native-209.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

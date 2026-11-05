# ValidFormats: second five-project batch

**Dictionary-value gap fixed.** Commerce's `MonetaryCommitment.TieredDiscount?: Record<decimal>` now reports under `no-generic-numeric`. The existing rule unwraps arrays and records, including nested combinations, with a cycle guard. The same five projects were rerun without suppressions.

| Project        | Swagger | no-format | known-encoding | no-generic-numeric | Swagger-only |
| -------------- | ------: | --------: | -------------: | -----------------: | -----------: |
| Commerce       |       2 |         0 |              0 |                  2 |            0 |
| Service Fabric |      10 |         0 |             10 |                  0 |            0 |
| Compute        |       0 |         0 |              0 |                  0 |            0 |
| Storage        |       0 |         0 |              0 |                  0 |            0 |
| Key Vault      |       0 |         0 |              0 |                  0 |            0 |

**12** saved Swagger findings were reproduced at exactly the same document/JSON paths. **12** have related native source-warning witnesses; **0** are Swagger-only; there are **zero** TypeSpec-only warnings in this batch. The three native rule columns remain separate policies, not equivalent defect totals.

## Dictionary-value fix and before/after

Commerce numeric warnings change **1 → 2** and Swagger-only occurrences **1 → 0**. The other four projects and all Swagger findings are unchanged.
[Before-fix evidence](https://github.com/MaryGao/typespec-azure-paging/blob/18992e334abe771f9e4473b7d9cec63182b7a6e8/migration-evidence/tasks/valid-formats-5971/batch-2.md) and local pre-fix reports remain preserved.

Swagger JSON pointer: `/definitions/MonetaryCommitment/properties/TieredDiscount/additionalProperties/format`.
[Pinned authored source](https://github.com/Azure/azure-rest-api-specs/blob/2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9/specification/commerce/resource-manager/Microsoft.Commerce/Commerce/models.tsp#L356).

```json
{
  "type": "object",
  "description": "The list of key/value pairs for the tiered meter rates, in the format 'key':'value' where key = price, and value = the corresponding discount percentage. This field is used only by offer terms of type 'Monetary Commitment'.",
  "additionalProperties": {
    "format": "decimal",
    "type": "number"
  }
}
```

```typespec
   * The list of key/value pairs for the tiered meter rates, in the format 'key':'value' where key = price, and value = the corresponding discount percentage. This field is used only by offer terms of type 'Monetary Commitment'.
   */
  #suppress "@azure-tools/typespec-azure-core/casing-style" "FIXME: Update justification, follow aka.ms/tsp/conversion-fix for details"
  #suppress "@azure-tools/typespec-azure-resource-manager/arm-no-record" "FIXME: Update justification, follow aka.ms/tsp/conversion-fix for details"
  TieredDiscount?: Record<decimal>;

  /**
   * An array of meter ids that are excluded from the given offer terms.
```

The isolated fixture with no authored suppressions now produces exactly one numeric warning (previously zero):

```typespec
import "@azure-tools/typespec-azure-core";

model DictionaryControl {
  discounts: Record<decimal>;
}
```

The dictionary coverage gap is resolved. Specific numeric types remain allowed; scalar-extension and suppression policies are unchanged. Regression coverage includes all four generic record value types, nested records and mixed array/record combinations, specific numeric records and recursive collections.

## Why these projects

- **Commerce** (`2015-06-01-preview`): Generic decimal credit alongside allowed float32 quantities; remaining Swagger-positive pricing service.
- **Service Fabric** (`2026-03-01-preview`): Unsupported duration-constant encoding across application and cluster upgrade models; distinct from previously tested Managed Clusters.
- **Compute** (`2026-04-01`): Large VM/VMSS model graph, typed operation parameters, allowed float64 prices and standard duration types.
- **Storage** (`2026-09-01`): Supported RFC7231 datetime encoding and fixed-precision float32/float64 lifecycle and platform metric thresholds.
- **Key Vault** (`2026-06-01-preview`): Supported base64url-encoded bytes in vault/HSM key material plus enum and model arrays.

Commerce and Service Fabric were the two remaining baseline-positive services beyond the first batch. Compute, Storage and Key Vault provide distinct supported-pattern negative controls. This is purposive sampling, not corpus prevalence or a claim that other linter rules report nothing.

## Complete observed Swagger occurrence inventory

| Project        | JSON pointer                                                                                 | Format            | Related native source warning |
| -------------- | -------------------------------------------------------------------------------------------- | ----------------- | ----------------------------- |
| Commerce       | `/definitions/MonetaryCommitment/properties/TieredDiscount/additionalProperties/format`      | decimal           | models.tsp:356                |
| Commerce       | `/definitions/MonetaryCredit/properties/Credit/format`                                       | decimal           | models.tsp:332                |
| Service Fabric | `/definitions/ArmRollingUpgradeMonitoringPolicy/properties/healthCheckWaitDuration/format`   | duration-constant | ApplicationResource.tsp:247   |
| Service Fabric | `/definitions/ArmRollingUpgradeMonitoringPolicy/properties/healthCheckStableDuration/format` | duration-constant | ApplicationResource.tsp:254   |
| Service Fabric | `/definitions/ArmRollingUpgradeMonitoringPolicy/properties/healthCheckRetryTimeout/format`   | duration-constant | ApplicationResource.tsp:261   |
| Service Fabric | `/definitions/ArmRollingUpgradeMonitoringPolicy/properties/upgradeTimeout/format`            | duration-constant | ApplicationResource.tsp:268   |
| Service Fabric | `/definitions/ArmRollingUpgradeMonitoringPolicy/properties/upgradeDomainTimeout/format`      | duration-constant | ApplicationResource.tsp:275   |
| Service Fabric | `/definitions/ClusterUpgradePolicy/properties/healthCheckWaitDuration/format`                | duration-constant | Cluster.tsp:985               |
| Service Fabric | `/definitions/ClusterUpgradePolicy/properties/healthCheckStableDuration/format`              | duration-constant | Cluster.tsp:992               |
| Service Fabric | `/definitions/ClusterUpgradePolicy/properties/healthCheckRetryTimeout/format`                | duration-constant | Cluster.tsp:999               |
| Service Fabric | `/definitions/ClusterUpgradePolicy/properties/upgradeTimeout/format`                         | duration-constant | Cluster.tsp:1006              |
| Service Fabric | `/definitions/ClusterUpgradePolicy/properties/upgradeDomainTimeout/format`                   | duration-constant | Cluster.tsp:1013              |

## Provenance and limits

Candidate: `21f7aefe9c4399e4f51b28349ef02d4c64b1c5fc`; core: `f87a4e2d51c5cc0b3d995d4c7542578d55799804`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.
All authored-source #suppress directives were disabled in memory and original source hashes checked. Fresh production ValidFormats-only replay applied no README/AutoRest suppression filtering. All five native runs succeeded, all saved/fresh JSON paths agreed, native controls and suppression-disable controls passed, and nine Swagger schema controls passed in each replay.
The final Azure Core build, 14 focused tests across three rule files, full repository format and lint passed. The rebuilt candidate was reinjected offline and verified against 17 archives / 3,188 packed files. Detailed reports, snapshots, source excerpts, raw diagnostics, exact commands and logs are under `coverage-reports\valid-formats\batch-2\after-dictionary-fix`.
[Portable validation receipt](batch-2-validation.json) contains the raw native warnings, all 12 Swagger observations and source candidates, gap schemas/excerpts, control results, selection witnesses and package identities.
No fresh Swagger emission, globally projected source/version equivalence, emitter unknown-format assessment, full AutoRest validation, full-corpus run or migration acceptance is claimed. Other linter rules are outside these three comparison counts.

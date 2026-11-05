# ValidFormats: second five-project batch

**One additional coverage gap found:** Commerce's `MonetaryCommitment.TieredDiscount?: Record<decimal>` is not reported by `no-generic-numeric`. The previous fix covers arrays and inline operation parameters, not dictionary values. No production code was changed in this validation-only batch.

| Project        | Swagger | no-format | known-encoding | no-generic-numeric | Swagger-only |
| -------------- | ------: | --------: | -------------: | -----------------: | -----------: |
| Commerce       |       2 |         0 |              0 |                  1 |            1 |
| Service Fabric |      10 |         0 |             10 |                  0 |            0 |
| Compute        |       0 |         0 |              0 |                  0 |            0 |
| Storage        |       0 |         0 |              0 |                  0 |            0 |
| Key Vault      |       0 |         0 |              0 |                  0 |            0 |

**12** saved Swagger findings were reproduced at exactly the same document/JSON paths. **11** have related native source-warning witnesses; **one** is Swagger-only; there are **zero** TypeSpec-only warnings in this batch. The three native rule columns remain separate policies, not equivalent defect totals.

## Dictionary-value gap

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

An isolated fixture with no authored suppressions independently reproduces zero compared-rule warnings:

```typespec
import "@azure-tools/typespec-azure-core";

model DictionaryControl {
  discounts: Record<decimal>;
}
```

This is a genuine additional reporting-shape gap, not an intentional specific-numeric compatibility policy difference or a source-suppression effect. Dictionary values require a separate follow-up; this run deliberately leaves the fixed candidate unchanged.

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
| Commerce       | `/definitions/MonetaryCommitment/properties/TieredDiscount/additionalProperties/format`      | decimal           | **Not reported**              |
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

Candidate: `952472b51b488486c0a41855cc8f3a22208613fe`; core: `f87a4e2d51c5cc0b3d995d4c7542578d55799804`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.
All authored-source #suppress directives were disabled in memory and original source hashes checked. Fresh production ValidFormats-only replay applied no README/AutoRest suppression filtering. All five native runs succeeded, all saved/fresh JSON paths agreed, native controls and suppression-disable controls passed, and nine Swagger schema controls passed in each replay.
The unchanged fixed runtime was verified against 17 candidate archives / 3,188 packed files. Detailed local reports preserve every occurrence, schema snapshot, source excerpt, raw diagnostic and exact command under `coverage-reports\valid-formats\batch-2`.
[Portable validation receipt](batch-2-validation.json) contains the raw native warnings, all 12 Swagger observations and source candidates, gap schemas/excerpts, control results, selection witnesses and package identities.
No fresh Swagger emission, globally projected source/version equivalence, emitter unknown-format assessment, full AutoRest validation, full-corpus run or migration acceptance is claimed. Other linter rules are outside these three comparison counts.

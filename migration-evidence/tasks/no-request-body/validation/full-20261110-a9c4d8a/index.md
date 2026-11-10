# no-request-body: full frozen-population validation

**Complete execution; a known scope gap and explicit comparison limitations remain.** All 590 configured source programs were attempted at `a9c4d8a1db1bad607cd21d856421c6b1b712d746` (PR #5986 is now merged). Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

| Audience/profile | Source programs attempted | Native compiled | Swagger comparisons assessed | Native warnings | Comparable Swagger observations |
| ---------------- | ------------------------: | --------------: | ---------------------------: | --------------: | ------------------------------: |
| arm              |                       487 |             487 |                          487 |              10 |                               0 |
| data-plane       |                       103 |             103 |                           98 |              15 |                               9 |

## Differences

Search ARM retains **ten native-only SDK customization warnings: six GET, four DELETE**. Exact full-run warning tuples match the previously investigated source/runtime; every corresponding real service and Swagger operation is bodyless. [Semantic correspondence](evidence/search-gap-investigation.json). No warnings were hidden or normalized; #5993 remains open. Both raw excess directions are retained separately in [summary.json](summary.json), not cancelled across audiences/projects.

## Unassessed comparisons

- [specification/ai-foundry/data-plane/Foundry](reports/data-plane/specification-ai-foundry-data-plane-Foundry--e39fe65f.md): unassessed-no-local-oas2.
- [specification/keyvault/data-plane/Administration/BackupRestore](reports/data-plane/specification-keyvault-data-plane-Administration-BackupRestore--b941c45b.md): unassessed-no-local-oas2.
- [specification/keyvault/data-plane/Administration/EKM](reports/data-plane/specification-keyvault-data-plane-Administration-EKM--e6c493c6.md): unassessed-no-local-oas2.
- [specification/keyvault/data-plane/Administration/RBAC](reports/data-plane/specification-keyvault-data-plane-Administration-RBAC--8ab51401.md): unassessed-no-local-oas2.
- [specification/keyvault/data-plane/Administration/Settings](reports/data-plane/specification-keyvault-data-plane-Administration-Settings--b4490955.md): unassessed-no-local-oas2.

These are not counted as clean comparisons. Native source execution and availability of an OAS2 comparison are separate facts.

## Population and methods

ARM: all **487** immutable shared-baseline projects, no filter/limit; official analyzer with `frozen-reference`, source scope, two ARM Swagger members and one Core native rule. Every saved document's production registration/completion is verified: [historical receipts and static inventory](evidence/historical-arm.json). Historical Swagger was not refreshed or relabeled as freshly emitted.

Data plane: all **103** frozen data-plane preset projects with both `main.tsp` and `tspconfig.yaml`, including outside-path services discovered by an independent complete Git-tree preset audit. Config-only/fragment-only directories remain inventoried. Resolved emitter output locations identify selected latest-version checked-in OAS2; exact Git blobs and transitive local reference/example closure are retained independently of the sparse runtime checkout. The separate selected-rule Spectral profile is **not a saved data-plane baseline or full AutoRest production run**.

All 15 candidate artifacts match source/build and installed runtime. Native request-body controls passed; **37 portable controls passed**, with six explicitly non-applicable fixtures for an unrelated unregistered ARM resource-group rule. Source/version populations are not aligned, authored suppressions remain effective, target-only workers do not measure default preset activation, and zero observations do not prove positive-case equivalence.

## Evidence

[Full provenance](selection.json), [structured summary and per-project report links](summary.json), [official ARM results](arm/coverage.json), [ARM execution manifest](arm/manifest.json), [primary data-plane execution](data-plane/execution.json), [outside-path data-plane execution](data-plane-supplement/execution.json), [preset discovery audit](evidence/data-plane-discovery-audit.json), [runtime payload verification](evidence/runtime-identity.json).

## Real data-plane positive cases

[Checksummed retained-evidence replay](evidence/replay.md) and [release publication manifest](publication.json) describe the durable compact/raw evidence split.

**Nine real DELETE-body wire violations detected on both sides:** six in Purview DataMap and three in Machine Learning RunHistory. Purview additionally has six SDK client-alias warnings, yielding **15 native warnings versus nine Swagger observations** across data plane. Compiler Operation/sourceOperation identities, service membership, exact HTTP verb/path and actual frozen Swagger body parameters establish every correspondence. Raw counts remain unchanged; the aliases are not six additional on-wire defects. [Purview investigation](evidence/purview-gap-investigation.json), [RunHistory investigation](evidence/run-history-positive-investigation.json), [post-execution data-plane integrity](evidence/data-plane-integrity.json). The RunHistory cases were added during final reconciliation; the earlier interim status mentioning Purview alone was not a final corpus total.

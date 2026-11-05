# GetMustNotHaveRequestBody migration

## 1. Conclusion and scope

**Full frozen ARM regression complete: 487/487 projects assessed, zero failures, and six native-only warnings in Search SDK customization helpers.** Historical Swagger findings are zero. All six differences have an evidence-backed scope explanation, but the helper-exclusion policy still needs review. This is not a zero-warning pass or a semantic-equivalence/release-readiness claim. The implementation remains a draft.

Issue: [Azure/typespec-azure#5983](https://github.com/Azure/typespec-azure/issues/5983).
Native PR: [Azure/typespec-azure#5986](https://github.com/Azure/typespec-azure/pull/5986), based on and targeting public `main`; its tested head is unchanged.

The native rule is `@azure-tools/typespec-azure-resource-manager/no-get-request-body`. It uses resolved HTTP metadata to report GET operations with non-void request bodies, including explicit, implicit, optional, empty-model, and multipart bodies. It emits one warning on each offending operation. Other HTTP methods are unchanged.

The existing Azure Core `rpc-operation-request-body` rule only checks operations derived from `Azure.Core.RpcOperation`; it does not cover ordinary ARM GET operations. The existing ARM `use-model-request-body` rule checks body shape, not whether a GET operation can have a body. The new rule fills that policy gap without changing either released rule.

The new rule is included in the ARM library's `all` ruleset and explicitly disabled in the central `resource-manager` preset.

| Identity              | Value                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flow                  | Native-first, with an explicitly requested early draft publication                                                                                                                          |
| Candidate base        | `Azure/typespec-azure:main` at `3e96b05ca76910c3412fa0c1ba85d4281a48d44a`                                                                                                                   |
| Native source         | [`5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b`](https://github.com/Azure/typespec-azure/commit/5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b)                                                       |
| Native implementation | [`no-get-request-body.ts`](https://github.com/Azure/typespec-azure/blob/5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b/packages/typespec-azure-resource-manager/src/rules/no-get-request-body.ts) |
| Core gitlink          | `f87a4e2d51c5cc0b3d995d4c7542578d55799804`                                                                                                                                                  |
| Upstream validator    | `Azure/azure-openapi-validator` at `e1b8b207a196cf2fc288593efec22e6e38ab98d5`                                                                                                               |
| Upstream audience     | ARM OpenAPI 2.0, guideline RPC-Get-V1-02                                                                                                                                                    |
| Frozen specs          | `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`                                                                                                                                                  |
| Analyzer              | `52eeec48b136f97addc10d90dcba4457a04f83a7`                                                                                                                                                  |
| Shared baseline       | `swagger-arm-20261026-2cd3c5dd`; metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`                                                                                                 |
| Baseline identity     | `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`                                                                                                                          |
| Comparison policy     | Production ARM; `frozen-reference`; `scope: source`; `nativeMode: target-only`; no filter or limit                                                                                          |

## 2. Actual coverage

**Fresh full native execution:** every one of the 487 frozen ARM projects compiled with the target rule explicitly enabled. The supported analyzer completed its final integrity checks and sealed the run as `complete`. No Swagger generation or validator execution was repeated.

| Measurement                                               | Result                                           |
| --------------------------------------------------------- | ------------------------------------------------ |
| Selected / assessed real-spec projects                    | 487 / 487                                        |
| Failed / unassessed projects                              | 0 / 0                                            |
| Saved Swagger raw / file-independent findings             | 0 / 0                                            |
| Native raw / source-scope / distinct-source findings      | 6 / 6 / 6                                        |
| Ambient diagnostics                                       | 0                                                |
| Equal raw-count projects                                  | 486                                              |
| Native-only / Swagger-only / overlapping finding projects | 1 / 0 / 0                                        |
| Raw Swagger-minus-native difference                       | -6                                               |
| Swagger-higher / native-higher excess                     | 0 / 6                                            |
| Absolute per-project raw difference sum                   | 6                                                |
| Relative difference against Swagger                       | Undefined: historical denominator is zero        |
| Diagnostic-project coverage percentage                    | Undefined: no Swagger finding projects; not 100% |
| Saved primary Swagger documents / GET operations          | 649 / 7,147                                      |
| Saved operation-level GET body parameters                 | 0                                                |
| Verified historical raw/stderr logs                       | 1,298                                            |
| Default activation across real projects                   | Not assessed; target-only execution              |

The summary also retains a max-count-normalized difference of `6 / max(0, 6) = 1`; this is not a recall, equivalence, or acceptance score. No opposing gaps are canceled and no findings are normalized away.

All 93,496 retained dataset files were checked by the analyzer's complete inventory/hash guards before and after copying and after execution. Separate verification of all selected production logs established explicit `GetMustNotHaveRequestBody` error-severity selection, actual primary-document validation, and successful completion. The absent aggregate rule shard was not treated as proof of zero.

The earlier Advisor/Compute/KeyVault/Network/Storage pilot compiled all five projects with zero target and ambient diagnostics; its 573 saved GET operations had no body parameters. The full run freshly reassessed those projects and the remaining corpus. Pilot counts are not added to the 487-project population.

Full results: [index and all 487 project reports](runs/full-arm-20261105/index.md), [coverage](runs/full-arm-20261105/coverage.md), [machine coverage](runs/full-arm-20261105/coverage.json), [integrity manifest](runs/full-arm-20261105/manifest.json), [summary](runs/full-arm-20261105/summary.json), and [historical verification](runs/full-arm-20261105/preflight/historical-full.json).

### Gap analysis and decision

The new rule fills the general GET-body predicate absent from the existing RPC-template-specific rule. Full regression exposed an additional audience boundary: the whole-program listener also checks imported, client-only customization operations outside the declared ARM HTTP service.

All six native-only warnings occur in `specification/search/resource-manager/Microsoft.Search/Search/client.tsp`, under `namespace Customizations`. Their optional `params` request-options wrapper becomes an implicit body in HTTP metadata. These operations are SDK overrides, not emitted service routes. Exact SDK override-object identities for Go, C#, and JavaScript map each helper to an original service operation with no non-void request payload; original GET verb/path pairs match saved Swagger without body parameters.

| Customization operation                                | Source line | Original service operation                                  |
| ------------------------------------------------------ | ----------: | ----------------------------------------------------------- |
| `searchGetCustomization`                               |         167 | `Microsoft.Search.SearchServices.get`                       |
| `privateEndpointConnectionsListByServiceCustomization` |         404 | `Microsoft.Search.PrivateEndpointConnections.listByService` |
| `privateEndpointConnectionsGetCustomization`           |         429 | `Microsoft.Search.PrivateEndpointConnections.get`           |
| `privateLinkResourcesListSupportedCustomization`       |         533 | `Microsoft.Search.SearchServices.listSupported`             |
| `SharedPrivateLinkResourcesListByServiceCustomization` |         594 | `Microsoft.Search.SharedPrivateLinkResources.listByService` |
| `SharedPrivateLinkResourcesGetCustomization`           |         620 | `Microsoft.Search.SharedPrivateLinkResources.get`           |

[All-six semantic correspondence](runs/full-arm-20261105/preflight/search-gap-investigation.json) retains resolved helper bodies, declared-service membership, each actual override mapping, original operation locations, and matching saved Swagger paths. This is not name-only matching or six demonstrated on-wire GET-body defects.

**Decision:** retain all six raw/source warnings and the native-only project. The difference is explained as source-versus-emission/client-customization scope, but whether the ARM rule should exclude such helpers remains an explicit policy/review question before final acceptance. This validation task did not alter production semantics, add source suppressions, or filter the corpus to obtain matching counts.

## 3. Function-level coverage

The [canonical native suite](https://github.com/Azure/typespec-azure/blob/5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b/packages/typespec-azure-resource-manager/test/rules/no-get-request-body.test.ts) owns the rule behavior cases.

| Material check                            | Native implementation and local evidence                                                        | Real-spec disposition                                                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Select GET operations                     | Resolved HTTP verb, not operation name; non-GET and inferred-verb controls pass                 | All 487 projects compiled; six source-only GET helper warnings investigated                                            |
| Reject an explicit body                   | Model and primitive body fixtures pass                                                          | Explicit-body injected positive passed; no emitted real violating site established                                     |
| Reject optional and empty-model bodies    | Dedicated violating fixtures pass                                                               | Both injected positives passed                                                                                         |
| Recognize alternate body authoring        | `@bodyRoot`, multipart, and implicit-body fixtures pass                                         | Implicit-body injected positive passed; real helper wrappers also resolve as bodies; other forms remain local fixtures |
| Count one violation per valid GET body    | Multi-property implicit body reports once; exact operation-position assertions pass             | Six warnings at six distinct helper-operation locations                                                                |
| Allow absence of a request body           | Metadata-only and standard ARM read controls pass                                               | Compliant injected GET/POST controls passed; 486 projects have matching zero counts                                    |
| Ignore non-payload metadata               | `@bodyIgnore` and visibility-filtered property control passes                                   | Local fixtures; no dedicated real violating/compliant pair                                                             |
| Allow a synthetic `void` body             | Explicit `void` fixture passes                                                                  | Injected void control passed; original Search service operations have no non-void payload                              |
| Avoid source-template duplicate findings  | Concrete generic-operation fixture reports once using owning-package template exclusions        | No duplicate target source locations among the six findings                                                            |
| Support standard ARM operations           | `ArmResourceRead` with a body-bearing `Parameters` customization reports; default read does not | Full frozen ARM compilation; real positive on-wire case not established                                                |
| Preserve activation and suppression       | Registration/preset tests and source-suppression fixtures pass                                  | Actual injected library-all enablement, central-preset nonactivation, explicit opt-in and suppression controls passed  |
| Exclude client-only customization helpers | No exclusion is implemented by this candidate                                                   | Scope-policy question exposed by six Search warnings; requires review                                                  |

The original validator uses the resolved selector `$[paths,'x-ms-paths'].*.get.parameters[?(@.in === 'body')]` and Spectral `falsy`. It has no optional-body or empty-schema exception. Static saved-document verification resolves local/relative parameter references and corroborates the absence of GET body parameters; it is not a fresh Spectral execution. Matching clean real projects and synthetic positives do not establish detection parity on a real on-wire violation.

## 4. Why diagnostic counts differ

The observed difference is **six native-only findings in one Search project**, all explained by imported client-only SDK helpers outside the emitted service. HTTP metadata sees a `params` wrapper body on each helper; Swagger validation sees the original service GETs, which have no non-void payload/body parameter. The listener examines the whole source program rather than only the selected-version emitted operation graph.

No raw findings were discarded, reclassified as compliant, or numerically normalized to zero. There are no unexplained project count differences, but the helper-scope policy still blocks an unconditional parity/readiness conclusion.

Other retained contract differences:

- The Swagger rule reports an error for each selected body parameter; the native rule reports a warning once per operation with a resolved body.
- The native rule uses HTTP semantic metadata rather than `paths` or `x-ms-paths` JSON locations.
- A synthetic `void` body represents no payload and is allowed; an explicit empty model remains a body and is reported.
- Enabling both the new ARM rule and the existing RPC-specific Core rule can produce both warnings for the same RPC-derived GET operation.
- Native source scope is not a selected-version projection. Historical producer core `88e5bd18b07d0cbd3bbe92946aff36beaf707b54` differs from candidate core `f87a4e2d51c5cc0b3d995d4c7542578d55799804`. The frozen-reference run assumes backward compatibility; it does not prove identical emission.
- Source suppressions remain honored. Per-project default activation is not assessed, although intended library-all and central-preset behavior was checked separately.

## NOTES

### Local evidence already obtained

These local checks ran before early draft publication; full real-spec evidence is reported separately above:

| Check                                                | Result                                                                                                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Native rule tests                                    | 20 passed, including a final rerun after converting unsupported target assertions to supported exact-position markers                                              |
| ARM and rulesets package suites                      | 872 passed in 88 files                                                                                                                                             |
| Dependency-closure builds                            | 21 tasks passed                                                                                                                                                    |
| Affected package lint and type-aware lint            | Passed                                                                                                                                                             |
| Task-owned test type checks                          | New rule and changed registration-test file passed using owning-package compiler options                                                                           |
| Actual authored and generated documentation examples | Incorrect examples emitted exactly one registered-rule warning on `get`; correct examples emitted no diagnostics; no compilation errors                            |
| Documentation generation                             | Completed with existing documentation-missing warnings for unrelated entries                                                                                       |
| Formatting and staged whitespace                     | Passed                                                                                                                                                             |
| Full package test-source type checks                 | Not passing: unchanged tests contain type errors and package Vitest configurations import a file outside their configured root/file lists; no unrelated fixes made |

Reproducible package commands:

```powershell
mise exec -- pnpm exec vitest run --config vitest.config.fast.ts packages\typespec-azure-resource-manager\test packages\typespec-azure-rulesets\test
mise exec -- pnpm run-all --filter=@azure-tools/typespec-azure-rulesets --filter=@typespec/prettier-plugin-typespec build --output-logs=errors-only
mise exec -- pnpm exec oxlint packages\typespec-azure-resource-manager packages\typespec-azure-rulesets --type-aware --deny-warnings
mise exec -- pnpm --filter @azure-tools/typespec-azure-resource-manager regen-docs
```

### Pending gates

Full-population execution, complete baseline integrity checks, artifact/source/injection identity checks, applicable portable controls, and all-six gap investigation are complete for the tested candidate.

The client-customization scope decision, independent semantic/readiness reviews, separate GitHub development/release-readiness checkpoints, fresh-checkout portable recovery/full rerun, and live CI acceptance remain outstanding. Full monorepo suites and real on-wire positive-case equivalence are not claimed. Existing unrelated full test-source type-check failures are unchanged. The PR remains a draft.

Any later production change must rerun affected local checks and invalidate any affected corpus evidence. Real-spec runs must retain the frozen baseline identity, full population, failure accounting, and honest comparison scope; Swagger data must not be regenerated merely to match native diagnostics.

### Full-run controls, artifacts, and timing

- All 37 applicable portable official-package harness controls passed. Six preregistered `resource-group-path-parameter` fixtures require an unrelated migration rule absent from this main-based candidate; they are explicitly non-applicable, not passes.
- Target controls produced the expected four warnings for explicit, optional, empty-model, and implicit GET bodies; compliant GET/POST/void and authored-suppression cases passed. The disabled-configuration control proved explicit comparison activation.
- Two actual injected activation controls passed: ARM library `all` reports the violation, whereas the central `resource-manager` preset does not. Comparison activation reports in both. These do not replace per-real-project default-activation assessment.
- Fifteen unchanged candidate/core archives were byte-verified against 2,871 installed files after the full run. Every non-manifest packed payload also matched the candidate source/build checkout, including inherited licenses. Package manifests were checked against installed manifests; pnpm intentionally rewrites their workspace ranges.
- Candidate build commands are retained with the pilot evidence; original build stdout is retained in the session transcript rather than a separate log. The source/build/payload comparisons provide separately published provenance. The ESM-aware verifier corrected an initial CommonJS-resolution failure on the import-only rulesets package; the focused Search investigation also accounts for original metadata-only `void` bodies. Neither correction changed production code.
- Total analyzer time was 74.8 minutes: 44.3 minutes before native execution, 13.9 minutes for all fresh TypeSpec workers, and 16.5 minutes for final integrity checks. Repeated loose-file baseline integrity/copy I/O, not TypeSpec rule execution, dominated.

[Runtime/source verification](runs/full-arm-20261105/preflight/artifact-verification.json), [portable controls](runs/full-arm-20261105/preflight/portable-controls.json), [target controls](runs/full-arm-20261105/preflight/target-controls.json), and [activation controls](runs/full-arm-20261105/preflight/activation-controls.json) retain the exact results.

### Publication and recovery

The compact run under `runs/full-arm-20261105` includes a separate report for every project, sanitized native receipts/worker inputs, raw/source count accounting, source-level gap correspondence, controls, and an integrity manifest. Known machine roots are replaced with `<candidate>`, `<core>`, `<specs>`, `<baseline>`, `<coverage>`, `<tooling>`, and `<tooling-archive>`; diagnostic codes/counts and project-relative target locations are unchanged. Redundant baseline inventories are omitted only from portable worker inputs. [Publication checksums](runs/full-arm-20261105/publication-checksums.json) retain original and published hashes.

Candidate package recovery: [immutable release](https://github.com/MaryGao/typespec-azure-paging/releases/tag/get-must-not-have-request-body-5983-full-arm-20261105), asset `get-must-not-have-request-body-5983-candidate-artifacts-20261105.tar.gz`, 1,983,858 bytes, SHA-256 `6de31443403c728c5ff9b0135067a1cf88844e528e20f6ca25bf5a7ae0a60802`. Upload and an independent download/hash round trip were verified. The release tag points to the prior evidence checkpoint, not the tested native source; package identity is bound separately to candidate `5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b` and its core gitlink.

Shared baseline recovery: repository `msyyc/azure-rest-api-specs`, release `swagger-lint-baseline-20261026-2cd3c5dd`, asset `swagger-arm-20261026-2cd3c5dd.tar.gz`, 51,932,501 bytes, SHA-256 `0904cbd17e24ce076e7969837b85b1f5b3682e5ae25b8805b048fb506e77c1d0`. Retain the archive's `manifest.json`, `baseline.json`, and complete `dataset` directory. The current run reused the existing sealed local baseline and verified its full inventory; it did not redownload or regenerate Swagger.

Frozen source preservation was checked remotely at `msyyc/azure-rest-api-specs:evidence/long-running-operations-options-validator-20261022-source`, pointing exactly to `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. The canonical source is `Azure/azure-rest-api-specs` at the same commit. Analyzer commit `52eeec48b136f97addc10d90dcba4457a04f83a7` was also confirmed available in `Azure/typespec-azure`.

To fully rerun: recover those exact clean source/candidate/tooling commits, initialize candidate `core` at its gitlink, restore/build only missing candidate integration prerequisites, recover and hash-check both archives, and use the specs' pnpm 12.6.0 with Node 26.5.0. Preserve the approved registry process-locally. From the pinned tooling's `packages\typespec-lintdiff`, run:

```powershell
node --import tsx/esm test\harness\native-coverage.ts `
  --candidate-repo "<candidate>" --specs-repo "<specs>" --tgz-dir "<artifacts>" `
  --validator-rule GetMustNotHaveRequestBody `
  --tsp-rule @azure-tools/typespec-azure-resource-manager/no-get-request-body `
  --scope source --baseline-run "<baseline>" --baseline-policy frozen-reference `
  --native-mode target-only --concurrency 4 --native-budget-seconds 5400 `
  --output "<new-empty-output>"
```

Recheck controls/runtime identities, retain all failures, and regenerate per-project/migration conclusions from the new sealed counts and semantic correspondence; do not copy this run's conclusions onto another candidate. Reading published evidence and recovering the candidate artifact by download/hash were verified. A fresh-checkout full replay of the published bundle has not been performed and is not claimed.

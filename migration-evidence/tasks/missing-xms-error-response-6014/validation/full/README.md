# MissingXmsErrorResponse: full frozen ARM validation

## 1. Scope

**Completed successfully, including final integrity verification:** 487/487 ARM projects assessed; zero compilation, worker or budget failures. Swagger observations were reused from the sealed historical production baseline; Swagger was not regenerated.

Candidate: `74e56a0f144190769180d5dbb27179db8b448c9c`; compiler/core: `8574d5453f7bf9a07dc09bd41edac579af71d94b`; frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; tooling: `52eeec48b136f97addc10d90dcba4457a04f83a7`.

The official analyzer used `--baseline-policy frozen-reference --scope source --native-mode target-only --concurrency 2`, without a project filter or limit. Source suppressions and target options remained effective. Project default activation and selected-version/reachability alignment were not assessed.

Execution finished on 2026-11-10 at 05:20:39 UTC. Native workers ran from 04:33:56 to 05:00:20 UTC, within the two-hour native-stage budget. Setup and integrity scanning of the 93,496-file retained dataset account for the longer overall duration.

## 2. Difference inventory

| Project | Swagger findings | Native findings | Matched | Swagger-only | Native-only |
| --- | ---: | ---: | ---: | ---: | ---: |
| Automation | 1 | 1 | 1 | 0 | 0 |
| Device Provisioning Services | 1 | 1 | 1 | 0 | 0 |
| IoT Hub | 1 | 1 | 1 | 0 | 0 |
| Operational Insights | 1 | 1 | 1 | 0 | 0 |
| Palo Alto Cloudngfw | 1 | 1 | 1 | 0 | 0 |
| Deployments | 5 | 5 | 5 | 0 | 0 |
| Deployment Stacks | 3 | 4 | 3 | 0 | 1 |
| Search | 3 | 7 | 3 | 0 | 4 |
| Solutions | 4 | 5 | 4 | 0 | 1 |
| Other 478 projects | 0 | 0 | 0 | 0 | 0 |
| **Total** | **20** | **26** | **20** | **0** | **6** |

All 20 historical Swagger findings correspond to actual native operation/route/verb/status identities. There are no unexplained observations or unassessed projects. This establishes observed correspondence on this frozen ARM population, not universal semantic equivalence.

## 3. Detailed differences

**Search: four non-service SDK customizations.** The `Customizations` namespace is imported into the source program but is outside the emitted `Microsoft.Search` service. Four DELETE operations include an unmarked 404 response: `searchDeleteCustomization`, `queryKeysDeleteCustomization`, `privateEndpointConnectionsDeleteCustomization`, and `SharedPrivateLinkResourcesDeleteCustomization`, at `client.tsp:259`, `:316`, `:498`, and `:702`.

**Deployment Stacks: one emitter-scoped SDK customization.** `DeploymentStacksAtScope.validateStack` is a CSharp-only customization declared by `client.tsp:44-49`, inheriting the unmarked POST/400 response from `routes.tsp:41`. It uses `/{scope}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/validate`. Compiler/HTTP inspection identifies it as a service operation, but the emitter's own `createTCGCContext`/`isInScope` predicate excludes it from AutoRest. The three resource-group/subscription/management-group operations each match their saved Swagger finding.

All four Deployment Stacks diagnostics share `routes.tsp:41`, because the concrete operations inherit one template declaration. The investigation recovered actual semantic operation targets by recompiling with the same injected libraries and verifying the complete diagnostic sequence against saved receipts. Source-line equality alone cannot identify these four operations or establish correspondence.

**Solutions: one legacy selector gap.** `ApplicationDefinitionOpsById.getById`, `ApplicationDefinition.tsp:96`, has an unmarked GET/404 response emitted as `ApplicationDefinitions_GetById` under `x-ms-paths` on the `?disambiguation_dummy` route. The legacy selector only visits `paths`; native HTTP-metadata lint correctly still examines it.

**Counting caution:** 26 native diagnostics occupy 23 source targets. The analyzer's source-target-based "validator excess" of two is not two Swagger-only cases: three scoped Deployment Stacks response entries correspond to warnings at one shared source location. The operation-level investigation establishes zero Swagger-only findings without discarding any raw observation.

Severity/location remain intentional differences: Swagger errors at response entries versus native warnings on operations. Native ranges and source/version populations remain broader than emitted Swagger. No production rule change was made to force count parity.

## Evidence and reproduction

The [published validation directory](https://github.com/MaryGao/typespec-azure-paging/tree/migration-evidence/missing-xms-error-response-6014/migration-evidence/tasks/missing-xms-error-response-6014/validation) retains all 487 sanitized native receipts, analyzer manifest/coverage, per-operation correspondence, five-project reports and integrity receipts. Original machine-local receipts remain unchanged.

The same 15 candidate/compiler package archives passed byte-for-byte installed-payload verification. Five target-specific injected controls passed. Of 43 portable harness cases, 37 applicable controls passed; six cases require the unrelated, unregistered `resource-group-path-parameter` migration and were excluded explicitly before execution. Two earlier bootstrap attempts collected no tests because the minimal tooling checkout lacked its complete tsconfig graph; their failed receipts are retained separately, not counted as passes.

The [runtime release](https://github.com/MaryGao/typespec-azure-paging/releases/tag/missing-xms-error-response-full-20261110-74e56a0f1) preserves the exact 15 packages plus sanitized build/pack provenance. The publication inventory binds every published receipt to its original hash and records the runtime archive hash.

For replay, restore the pinned candidate/core and tooling commits, obtain the sealed shared baseline `swagger-arm-20261026-2cd3c5dd` from `msyyc/azure-rest-api-specs`, and check out its frozen source commit into a separate clean writable specs runtime. Extract the runtime release archive and invoke the pinned analyzer with the same mapping, source scope, target-only mode and frozen-reference policy into a new empty output directory; use the specs-declared pnpm 12.6.0 on PATH. The baseline archive SHA-256 is `0904cbd17e24ce076e7969837b85b1f5b3682e5ae25b8805b048fb506e77c1d0`; its content identity is `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`.

Native implementation and PR #6028 are unchanged. This validation does not merge the PR or replace CI/reviewer approval.

# GetMustNotHaveRequestBody migration

## 1. Conclusion and scope

**Draft implementation; real-spec validation is not assessed.** The author requested draft PR preparation without real-spec validation. This report does not claim complete migration equivalence, release readiness, or completion of the skill's validation and review gates.

Issue: [Azure/typespec-azure#5983](https://github.com/Azure/typespec-azure/issues/5983).

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

## 2. Actual coverage

**Assessed coverage:** local rule behavior and package integration only. The canonical native rule suite contains 20 passing cases. The affected ARM and rulesets suites passed 872 tests in 88 files. These are unit/package results, not a real-spec coverage assessment.

**Real-spec validation: not run.** No representative service compile, injected real-service control, full native corpus execution, saved Swagger/native diagnostic comparison, or real-spec gap investigation was performed. No real-spec population is assessed and no quantitative equivalence is claimed.

| Measurement                             | Result                  |
| --------------------------------------- | ----------------------- |
| Assessed real-spec projects             | Not assessed            |
| Swagger raw/comparable findings         | Not assessed            |
| Native raw/comparable findings          | Not assessed            |
| Equal-count projects                    | Not assessed            |
| Swagger-higher/native-higher excess     | Not assessed            |
| Absolute/relative diagnostic difference | Not assessed            |
| Project overlap and one-sided projects  | Not assessed            |
| Failed or unassessed corpus projects    | Population not executed |

The shared baseline descriptors were read at metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6`, identifying `swagger-arm-20261026-2cd3c5dd` and frozen specs source `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Archive recovery, integrity/compatibility assessment, and baseline consumption are still pending. Descriptor discovery is not coverage evidence.

### Gap analysis and decision

Source analysis identifies a general ARM GET request-body policy not expressed by the existing RPC-template-specific rule. The decision is to add an ARM-owned rule using supported HTTP metadata, not emitted Swagger parsing. Local fixtures support its predicate and activation policy. Real-spec coverage, potential false positives, and diagnostic correspondence remain unassessed; the draft is not ready for final migration acceptance.

## 3. Function-level coverage

The [canonical native suite](https://github.com/Azure/typespec-azure/blob/5e7a4849d2c0ed0a0e990bf3e0cf48436e6d218b/packages/typespec-azure-resource-manager/test/rules/no-get-request-body.test.ts) owns the rule behavior cases.

| Material check                           | Native implementation and local evidence                                                        | Real-spec disposition                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Select GET operations                    | Resolved HTTP verb, not operation name; non-GET and inferred-verb controls pass                 | Pending                                  |
| Reject an explicit body                  | Model and primitive body fixtures pass                                                          | Pending                                  |
| Reject optional and empty-model bodies   | Dedicated violating fixtures pass                                                               | Pending                                  |
| Recognize alternate body authoring       | `@bodyRoot`, multipart, and implicit-body fixtures pass                                         | Pending                                  |
| Count one violation per valid GET body   | Multi-property implicit body reports once; exact operation-position assertions pass             | Pending                                  |
| Allow absence of a request body          | Metadata-only and standard ARM read controls pass                                               | Pending                                  |
| Ignore non-payload metadata              | `@bodyIgnore` and visibility-filtered property control passes                                   | Pending                                  |
| Allow a synthetic `void` body            | Explicit `void` fixture passes                                                                  | Pending                                  |
| Avoid source-template duplicate findings | Concrete generic-operation fixture reports once using owning-package template exclusions        | Pending                                  |
| Support standard ARM operations          | `ArmResourceRead` with a body-bearing `Parameters` customization reports; default read does not | Pending                                  |
| Preserve activation policy               | Public registration test verifies library `all` activation and central preset nonactivation     | Pending real-service activation evidence |

The original validator uses the resolved selector `$[paths,'x-ms-paths'].*.get.parameters[?(@.in === 'body')]` and Spectral `falsy`. It has no optional-body or empty-schema exception. Native semantic coverage is assessed independently of Swagger selector/emission blind spots; those differences have not been compared against real services.

## 4. Why diagnostic counts differ

No corpus counts have been collected or compared, so this report does not assert an observed count difference.

Known contract differences to investigate during a later comparison:

- The Swagger rule reports an error for each selected body parameter; the native rule reports a warning once per operation with a resolved body.
- The native rule uses HTTP semantic metadata rather than `paths` or `x-ms-paths` JSON locations.
- A synthetic `void` body represents no payload and is allowed; an explicit empty model remains a body and is reported.
- Enabling both the new ARM rule and the existing RPC-specific Core rule can produce both warnings for the same RPC-derived GET operation.
- Reachability, versions, audience selection, activation, suppressions, compile failures, and output representation must be aligned before counts are considered comparable.

## NOTES

### Local evidence already obtained

The following checks ran before early draft publication; no real-spec execution is included:

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

Real-spec runtime preparation, baseline integrity and compatibility, immutable artifact/injection checks, full-population comparison, gap investigation, independent local semantic/readiness reviews, and separate GitHub development/release-readiness reviews remain pending. No review or migration-completion claim is made by this early draft.

Any later production change must rerun affected local checks and invalidate any affected corpus evidence. Real-spec runs must retain the frozen baseline identity, full population, failure accounting, and honest comparison scope; Swagger data must not be regenerated merely to match native diagnostics.

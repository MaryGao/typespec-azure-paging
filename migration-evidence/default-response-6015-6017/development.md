# Development evidence

This is the original development-preparation record, not a real-spec coverage report. No real specs were evaluated during PR preparation. The user subsequently approved five-project validation; that separate stage is recorded in the [representative report](validation/five-project/README.md). Full-spec validation remains gated.

## Native contract

Use the owning ARM package and native HTTP response metadata. A default is `HttpOperationResponse.statusCodes === "*"`. Skip generic operation declarations/instances and uninstantiated interface operations using existing helpers. Keep distinct concrete operations separate. Report each absent default directly from the operation listener.

Following manual review, each rule reports independently. There is no shared program-state marker, diagnostic ownership, or cross-rule suppression. The existing PUT/POST/DELETE and `use-standard-error` rules and the HTTP response helper are unchanged from the candidate base. When enabled together, overlapping checks can report separate diagnostics for the same operation. No source text, OpenAPI parsing, emitter callbacks, new dependencies, or SDK-facing dependency inversion are used.

## Test-claim mapping

| Claim                                                                                        | Existing native harness   | Canonical evidence                                                                           |
| -------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| Missing fallback on all supported HTTP verb decorators; exact authored target                | Single-rule tester        | `missing-default-response.test.ts`, parameterized HTTP-method cases                          |
| Explicit/ranged error responses are not defaults; multiple statuses do not multiply warnings | Single-rule tester        | Same suite, explicit/ranged response cases                                                   |
| No responses still lacks a fallback                                                          | Single-rule tester        | Same suite, `never` result                                                                   |
| Standard errors, custom implicit errors, and explicit default models are accepted            | Single-rule tester        | Same suite, accepted-default cases                                                           |
| Concrete operation and instantiated-interface filtering                                      | Single-rule tester        | Same suite, concrete customization and inherited operation cases                             |
| Removed standard ARM template error is detected, including HEAD                              | Single-rule tester        | Same suite, template cases                                                                   |
| Independent reporting alongside response-code, missing-error, and custom-error checks        | Registered linter         | Same suite, PUT/POST/DELETE and `use-standard-error` interactions                            |
| Library `all` membership and recommended-preset nonactivation                                | Existing package tests    | ARM `test/linter.test.ts` and rulesets `test/validate-rules-defined.test.ts`                 |
| Published incorrect/correct examples                                                         | Synthetic CLI compilation | Exact operation snippets under the same ARM resource setup; expected one/zero target warning |

## Checks and limitations

All required development-preparation checks below passed. The subsequently approved five-project comparison is assessed separately; full-corpus comparison remains unassessed.

The simplification at `e26ad37b1e0c76a36c5495e0b1c1a497c59ca4d5` was revalidated with the ARM package build, documentation generation, all 99 focused ARM tests (27 new-rule cases), root lint including type-aware lint, targeted formatting, and `git diff --check`. The interaction tests now require both independent diagnostics, including both rule-registration orders for the missing-error check. The focused run took 103.62 seconds. Other checks below describe the initial preparation; ruleset registration and documentation examples were not changed by this revision.

| Check                                                                                                                          | Result                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm -r --filter "@azure-tools/typespec-azure-resource-manager..." build`                                                     | Passed; compatible compiler and library closure, source type-check, and library lint                                              |
| `pnpm -r --filter "@azure-tools/typespec-azure-rulesets..." --filter "!@azure-tools/typespec-azure-resource-manager..." build` | Passed; remaining dependency closure and rulesets build                                                                           |
| ARM `vitest run` selecting the new suite, PUT/POST/DELETE response suites, `use-standard-error`, and `linter.test.ts`          | 99 passed across six files, including 27 new-rule cases; `--maxWorkers=1 --hookTimeout=30000 --testTimeout=30000`; 110.09 seconds |
| Rulesets `vitest run --maxWorkers=1 --hookTimeout=30000 --testTimeout=30000`                                                   | 17 passed; 27.45 seconds                                                                                                          |
| ARM `regen-docs`                                                                                                               | Passed; existing unrelated diagnostic-documentation warnings retained                                                             |
| Synthetic documentation snippets, `tsp compile --no-emit`                                                                      | Incorrect snippet: exactly one target warning; correct snippet: no diagnostics                                                    |
| Root `pnpm format` followed by `pnpm lint`                                                                                     | Passed, including repository-wide type-aware lint                                                                                 |
| Explicit Prettier check including the ignored generated rule page                                                              | Passed                                                                                                                            |
| `pnpm chronus status`                                                                                                          | Passed; parsed feature and internal entries                                                                                       |
| `git diff --check` and core submodule cleanliness                                                                              | Passed                                                                                                                            |
| Independent semantic review of initial native source diff                                                                      | No high-confidence bugs found in the initial preparation; not rerun for the simplification                                        |

A supplemental `tsc --noEmit -p packages/typespec-azure-resource-manager/tsconfig.json` also included existing test suites and failed in untouched baseline tests and the existing Vitest `rootDir` setup. There were no reported errors in the new suite or changed source files. This is not a passing full-test type-check; the required source-only build and repository type-aware lint passed. Those unrelated test typing issues were not changed.

Dependency installation materialized JavaScript tooling but its unrelated Python emitter prepare hook failed with a PyPI TLS handshake error. Required ARM and rulesets dependency builds succeeded independently; the Python emitter is not part of this change's validation scope.

The first parallel focused run encountered cold-start 10-second hook timeouts under shared-machine load. It also exposed three synthetic fixture errors: unsupported `@options`, a template named `Read` colliding with `TypeSpec.Read`, and a deprecated PUT template. Those fixtures were corrected without changing the new predicate. Subsequent focused execution uses bounded workers and explicit test/hook timing budgets rather than changing repository configuration.

Chronus CLI generation was attempted with explicit package names and change kinds, both before and after staging, but reported no changed packages. The two entries use the repository's existing feature/internal frontmatter format; `pnpm chronus status` successfully parsed them.

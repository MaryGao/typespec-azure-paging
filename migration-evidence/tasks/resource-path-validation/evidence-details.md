# Resource path validation evidence

## Candidate checks

The candidate was based on TypeSpec main at `42a033215c7512522f4117a71b02dc60b8aff060` and committed as [`f0c007f3f2ffa53db901177c2f2869542cf45ac3`](https://github.com/Azure/typespec-azure/commit/f0c007f3f2ffa53db901177c2f2869542cf45ac3). The following focused checks passed on the candidate after the generic-interface regression fix:

- 82 tests across the new rule, the existing PUT rule, ARM linter registration, and ruleset validation. The test runner emitted a Vite configuration warning.
- ARM package build, affected type-aware lint, and formatting checks.
- ARM documentation generation, with existing missing-documentation warnings for other declarations.

The initial test run before the regression fix timed out in its default setup hook. A later run using a 30-second hook timeout passed. The pre-fix rulesets build also passed; no production ruleset files were changed by the later fix.

```powershell
mise exec -- pnpm exec vitest run --config vitest.config.fast.ts --hookTimeout 30000 packages\typespec-azure-resource-manager\test\rules\resource-path-validation.test.ts packages\typespec-azure-resource-manager\test\rules\use-resource-path-for-put.test.ts packages\typespec-azure-resource-manager\test\linter.test.ts packages\typespec-azure-rulesets\test\validate-rules-defined.test.ts
mise exec -- pnpm --filter '@azure-tools/typespec-azure-resource-manager' build
mise exec -- pnpm exec oxlint packages\typespec-azure-resource-manager\src\rules\resource-path-validation.ts packages\typespec-azure-resource-manager\test\rules\resource-path-validation.test.ts --type-aware --deny-warnings
mise exec -- pnpm exec prettier --check packages\typespec-azure-resource-manager\src\rules\resource-path-validation.ts packages\typespec-azure-resource-manager\test\rules\resource-path-validation.test.ts packages\typespec-azure-resource-manager\src\rules\resource-path-validation.md packages\typespec-azure-resource-manager\README.md website\src\content\docs\docs\libraries\azure-resource-manager\reference\linter.md
mise exec -- pnpm --filter '@azure-tools/typespec-azure-resource-manager' regen-docs
```

An independent local reviewer found an omitted concrete generic-interface case. The implementation was fixed and the same reviewer re-reviewed the candidate without significant findings. These checks do not establish coverage against real specifications.

## Saved Swagger observations

The published shared Swagger baseline descriptor at metadata commit `1c9d2b0e6a596754af1aa793b1906ff3c4ef2bd6` identifies specs commit `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`, baseline identity `aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995`, and archive SHA-256 `0904cbd17e24ce076e7969837b85b1f5b3682e5ae25b8805b048fb506e77c1d0`. The archive and its contents have not been verified for this task.

A separate five-project local cache records specs commit `489ca9fba553863941a9e52c73bd0fd390a5d25b`, OpenAPI validator `2.2.4`, and rulesets `2.2.6`. Some cached logs select these Swagger rules. Cache inputs, referenced files, flags, and suppression compatibility must be verified before reuse. These two source commits are distinct and their results must not be mixed.

No representative or full-spec validation has been run for this candidate.

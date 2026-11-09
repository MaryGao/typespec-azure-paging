# DefaultInEnum review update

Validated candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`.

The proposed rule is `@azure-tools/typespec-azure-core/use-known-enum-default`. The rule now checks `getUnionAsEnum().flattenedMembers` directly, matching the enum values used by AutoRest. The local traversal is removed; the shared helper and its tests remain unchanged. The naming and documentation improvements remain.

The revised documentation has one Incorrect and one Correct section, each with named-union and ARM-property subsections. All five actual snippets previously compiled with expected target counts; the unchanged ARM resource/operation context is supplied by the validation wrapper, not duplicated in the documentation. Those snippet controls were not rerun for this update.

[Current flattened-member receipt](flattened-members.json) | [Historical rollback receipt](helper-revert.json) | [Earlier review validation](validation.json) | [Documentation controls](documentation/results.json) | [Original sealed corpus run](../full-regression/index.md)

The current candidate passed all 47 focused rule/helper/rulesets cases (20 rule, 12 helper, 15 rulesets), Core build, affected-file formatting, root/type-aware lint, and Chronus verification. Three collision cases now require warnings for overwritten defaults and accept the retained values. The synthetic nested/outer `Cat` case was removed separately in `d1bbf5e9e` at the user's request. No real-spec collision example has been confirmed.

The historical rollback at `59641e2e` passed 48 focused cases while still using local traversal. Its receipt remains unchanged; it does not describe the current membership behavior.

The earlier `a477b4ce` packet remains historical: its focused recovery run passed 139 tests; an initial full Core attempt had one unrelated 5-second casing-test timeout (514 passed, 2 skipped), followed by a passing recovery without relaxing timeouts. Five affected builds, documentation generation, root formatting/lint/engineering type-check, and Chronus verification passed for that earlier candidate. Its shared-helper API approach has since been removed.

The original 487-project corpus results remain tied to `dd233ce` and its old rule ID. [Separate full revalidation at `4ba465abf`](../full-regression-4ba465abf/index.md) is now complete: 487/487 succeeded with zero target findings and ambient diagnostics, and final integrity verification passed. No new observed diagnostic gap was found; Swagger results were reused. The PR advanced to `a379ac336e9e5da104005d73c822a681ce02e284` through a main merge during this run, changing compiler/library inputs; that newer runtime is not covered. Earlier live CI results likewise do not describe these candidates.

All three review threads are left unresolved for Timo.

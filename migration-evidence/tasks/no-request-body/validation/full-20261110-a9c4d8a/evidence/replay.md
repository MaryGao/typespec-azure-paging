# Full-validation evidence replay

The [publication manifest](../publication.json) identifies the release asset by byte length and SHA256. The archive retains all original full-run receipts, worker inputs and logs, all 15 unchanged candidate package archives, both data-plane Swagger/reference datasets, controls, tooling snapshots and raw project reports. The Git evidence tree provides compact browsable reports and receipts. Its Markdown is formatted and its terminal-log views normalize line endings and trailing whitespace; raw and compact hashes are separately recorded in [file-retention.json](file-retention.json).

The redundant 487-project ARM dataset is not repackaged. Its exact independently checksummed shared baseline asset, source revision, metadata revision and baseline identity are recorded in the retention manifest. The official analyzer completed both initial and final baseline-integrity checks. Its full 42 MB `arm/baseline.json`, runtime installation receipts, all 487 worker inputs and original logs are retained in the new release archive rather than duplicated in Git.

## Download and verify

```powershell
gh release download no-request-body-full-validation-20261110-a9c4d8a --repo github.com/MaryGao/typespec-azure-paging --pattern no-request-body-full-evidence-a9c4d8a.tar.gz
Get-FileHash -Algorithm SHA256 .\no-request-body-full-evidence-a9c4d8a.tar.gz
New-Item -ItemType Directory -Path .\full-replay
tar -xzf .\no-request-body-full-evidence-a9c4d8a.tar.gz -C .\full-replay
```

Compare the asset hash with `publication.json`, then recompute every extracted file's `rawSha256` from `evidence\file-retention.json`. Git compact files use `compactSha256`. The retention manifest excludes itself and the Git-only publication manifest to avoid circular hashes; the downloaded manifest is independently checked against its Git copy. This verifies retained evidence bytes, not a new compiler run.

## Re-execution identities

Candidate: `Azure/typespec-azure@a9c4d8a1db1bad607cd21d856421c6b1b712d746`; compiler gitlink: `837b5a769414f853fd22eeed0a123c953425b1d8`; specs: `Azure/azure-rest-api-specs@2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`; analyzer: `Azure/typespec-azure@52eeec48b136f97addc10d90dcba4457a04f83a7`. The [selection](../selection.json), [ARM manifest](../arm/manifest.json) and retained per-worker inputs contain the exact profiles and invocation settings. The evidence contains absolute paths from the original Windows run; a new runtime must deliberately map those checkouts and dependencies rather than silently substitute latest packages.

The original source compilation is target-only and source suppressions remain honored. The data-plane profile uses the installed production selected rule through Spectral; it is not full AutoRest production execution or a saved data-plane baseline. Five OAS2 comparisons remain unassessed. Nine exact positive DELETE-body correspondences and the explained Search/Purview scope differences do not establish whole-rule equivalence or release readiness.

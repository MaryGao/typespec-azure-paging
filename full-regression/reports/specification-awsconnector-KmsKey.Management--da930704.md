# specification/awsconnector/KmsKey.Management: DefaultInEnum

## Scope

Saved API version: `2024-12-01`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 3 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `kmsKey.json` | `["definitions","AwsKmsKeyProperties","properties","keySpec"]` | `["ECC_NIST_P256","ECC_NIST_P384","ECC_NIST_P521","ECC_SECG_P256K1","HMAC_224","HMAC_256","HMAC_384","HMAC_512","RSA_2048","RSA_3072","RSA_4096","SM2","SYMMETRIC_DEFAULT"]` | `"SYMMETRIC_DEFAULT"` | Compliant |
| `kmsKey.json` | `["definitions","AwsKmsKeyProperties","properties","keyUsage"]` | `["ENCRYPT_DECRYPT","GENERATE_VERIFY_MAC","SIGN_VERIFY"]` | `"ENCRYPT_DECRYPT"` | Compliant |
| `kmsKey.json` | `["definitions","AwsKmsKeyProperties","properties","origin"]` | `["AWS_KMS","EXTERNAL"]` | `"AWS_KMS"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-109.json) | [Exact worker input](../native-109.input.json) | [Worker log](../native-109.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

# specification/awsconnector/KmsKey.Management: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2024-12-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/3 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `kmsKey.json` | `["definitions","AwsKmsKeyProperties","properties","keySpec"]` | `["ECC_NIST_P256","ECC_NIST_P384","ECC_NIST_P521","ECC_SECG_P256K1","HMAC_224","HMAC_256","HMAC_384","HMAC_512","RSA_2048","RSA_3072","RSA_4096","SM2","SYMMETRIC_DEFAULT"]` | `"SYMMETRIC_DEFAULT"` |
| `kmsKey.json` | `["definitions","AwsKmsKeyProperties","properties","keyUsage"]` | `["ENCRYPT_DECRYPT","GENERATE_VERIFY_MAC","SIGN_VERIFY"]` | `"ENCRYPT_DECRYPT"` |
| `kmsKey.json` | `["definitions","AwsKmsKeyProperties","properties","origin"]` | `["AWS_KMS","EXTERNAL"]` | `"AWS_KMS"` |

[Native receipt](../native-109.json) | [Worker input](../native-109.input.json) | [Worker log](../native-109.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

# specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/DesktopVirtualization: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-04-01-preview`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/12 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalSchedulePatchProperties","properties","rampUpStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalSchedulePatchProperties","properties","peakStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalSchedulePatchProperties","properties","rampDownStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalSchedulePatchProperties","properties","offPeakStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalScheduleProperties","properties","rampUpStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalScheduleProperties","properties","peakStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalScheduleProperties","properties","rampDownStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPersonalScheduleProperties","properties","offPeakStartVMOnConnect"]` | `["Enable","Disable"]` | `"Enable"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanPooledScheduleProperties","properties","scalingMethod"]` | `["PowerManage","CreateDeletePowerManage"]` | `"PowerManage"` |
| `desktopvirtualization.json` | `["definitions","ScalingPlanProperties","properties","hostPoolType"]` | `["Pooled","Personal"]` | `"Pooled"` |
| `desktopvirtualization.json` | `["definitions","ScalingSchedule","properties","scalingMethod"]` | `["PowerManage","CreateDeletePowerManage"]` | `"PowerManage"` |
| `desktopvirtualization.json` | `["definitions","SecurityInfoProperties","properties","type"]` | `["Standard","TrustedLaunch","ConfidentialVM"]` | `"Standard"` |

[Native receipt](../native-217.json) | [Worker input](../native-217.input.json) | [Worker log](../native-217.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

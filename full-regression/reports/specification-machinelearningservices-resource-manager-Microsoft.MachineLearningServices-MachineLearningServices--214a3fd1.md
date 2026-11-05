# specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/MachineLearningServices: DefaultInEnum

## Scope

Saved API version: `2026-09-01`. Tested candidate: `dd233ce884c25ed54074ad6feaa770ee567c4f5e`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`.

Fresh native execution uses explicit target activation, source scope, retained source suppressions, and no emission. Historical Swagger validation is reused from hash-verified production logs, not rerun.

## Difference inventory

| Observation | Result |
| --- | --- |
| Native assessment | Assessed |
| Native raw / source findings | 0 / 0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1 / 89 |
| Static membership violations | 0 |

## Detailed cases

No target-rule findings or attributable diagnostic differences were observed.

### All saved primary enum/default sites

| Swagger file | JSON path segments | Declared enum | Default | Membership |
| --- | --- | --- | --- | --- |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions","get","parameters","9"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions","get","parameters","8"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions","get","parameters","12"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions","get","parameters","8"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions","get","parameters","9"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions","get","parameters","8"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets","get","parameters","6"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions","get","parameters","7"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{featuresetName}/versions/{featuresetVersion}/features","get","parameters","10"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities","get","parameters","6"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions","get","parameters","7"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs","get","parameters","7"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models","get","parameters","6"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions","get","parameters","14"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` | Compliant |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules","get","parameters","5"]` | `["EnabledOnly","DisabledOnly","All"]` | `"EnabledOnly"` | Compliant |
| `openapi.json` | `["definitions","AKSSchemaProperties","properties","clusterPurpose"]` | `["FastProd","DenseProd","DevTest"]` | `"FastProd"` | Compliant |
| `openapi.json` | `["definitions","AKSSchemaProperties","properties","loadBalancerType"]` | `["PublicIp","InternalLoadBalancer"]` | `"PublicIp"` | Compliant |
| `openapi.json` | `["definitions","AmlComputeProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |
| `openapi.json` | `["definitions","AmlComputeProperties","properties","remoteLoginPortPublicAccess"]` | `["Enabled","Disabled","NotSpecified"]` | `"NotSpecified"` | Compliant |
| `openapi.json` | `["definitions","AutoMLVertical","properties","logVerbosity"]` | `["NotSet","Debug","Info","Warning","Error","Critical"]` | `"Info"` | Compliant |
| `openapi.json` | `["definitions","AzureBlobDatastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","AzureDataLakeGen1Datastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","AzureDataLakeGen2Datastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","AzureFileDatastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","BatchDeploymentProperties","properties","loggingLevel"]` | `["Info","Warning","Debug"]` | `"Info"` | Compliant |
| `openapi.json` | `["definitions","BatchDeploymentProperties","properties","outputAction"]` | `["SummaryOnly","AppendRow"]` | `"AppendRow"` | Compliant |
| `openapi.json` | `["definitions","CapabilityHostProperties","properties","capabilityHostKind"]` | `["Agents"]` | `"Agents"` | Compliant |
| `openapi.json` | `["definitions","Classification","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted"]` | `"AUCWeighted"` | Compliant |
| `openapi.json` | `["definitions","Collection","properties","dataCollectionMode"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","ComputeInstanceDataDisk","properties","storageAccountType"]` | `["Standard_LRS","Premium_LRS"]` | `"Standard_LRS"` | Compliant |
| `openapi.json` | `["definitions","ComputeInstanceProperties","properties","applicationSharingPolicy"]` | `["Personal","Shared"]` | `"Shared"` | Compliant |
| `openapi.json` | `["definitions","ComputeInstanceProperties","properties","computeInstanceAuthorizationType"]` | `["personal"]` | `"personal"` | Compliant |
| `openapi.json` | `["definitions","ComputeInstanceSshSettings","properties","sshPublicAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","CustomModelJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` | Compliant |
| `openapi.json` | `["definitions","CustomModelJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` | Compliant |
| `openapi.json` | `["definitions","DataCollector","properties","rollingRate"]` | `["Year","Month","Day","Hour","Minute"]` | `"Hour"` | Compliant |
| `openapi.json` | `["definitions","DeploymentLogsRequest","properties","containerType"]` | `["StorageInitializer","InferenceServer"]` | `"InferenceServer"` | Compliant |
| `openapi.json` | `["definitions","Endpoint","properties","protocol"]` | `["tcp","udp","http"]` | `"tcp"` | Compliant |
| `openapi.json` | `["definitions","EnvironmentVariable","properties","type"]` | `["local"]` | `"local"` | Compliant |
| `openapi.json` | `["definitions","EnvironmentVersionProperties","properties","autoRebuild"]` | `["Disabled","OnBaseImageUpdate"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","EnvironmentVersionProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` | Compliant |
| `openapi.json` | `["definitions","FeatureImportanceSettings","properties","mode"]` | `["Disabled","Enabled"]` | `"Disabled"` | Compliant |
| `openapi.json` | `["definitions","FeatureProperties","properties","dataType"]` | `["String","Integer","Long","Float","Double","Binary","Datetime","Boolean"]` | `"String"` | Compliant |
| `openapi.json` | `["definitions","Forecasting","properties","primaryMetric"]` | `["SpearmanCorrelation","NormalizedRootMeanSquaredError","R2Score","NormalizedMeanAbsoluteError"]` | `"NormalizedRootMeanSquaredError"` | Compliant |
| `openapi.json` | `["definitions","ForecastingSettings","properties","featureLags"]` | `["None","Auto"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ForecastingSettings","properties","shortSeriesHandlingConfig"]` | `["None","Auto","Pad","Drop"]` | `"Auto"` | Compliant |
| `openapi.json` | `["definitions","ForecastingSettings","properties","targetAggregateFunction"]` | `["None","Sum","Max","Min","Mean"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ForecastingSettings","properties","useStl"]` | `["None","Season","SeasonTrend"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","Image","properties","type"]` | `["docker","azureml"]` | `"docker"` | Compliant |
| `openapi.json` | `["definitions","ImageClassification","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted"]` | `"Accuracy"` | Compliant |
| `openapi.json` | `["definitions","ImageClassificationMultilabel","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted","IOU"]` | `"IOU"` | Compliant |
| `openapi.json` | `["definitions","ImageInstanceSegmentation","properties","primaryMetric"]` | `["MeanAveragePrecision"]` | `"MeanAveragePrecision"` | Compliant |
| `openapi.json` | `["definitions","ImageModelSettings","properties","learningRateScheduler"]` | `["None","WarmupCosine","Step"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ImageModelSettings","properties","optimizer"]` | `["None","Sgd","Adam","Adamw"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ImageModelSettingsObjectDetection","properties","modelSize"]` | `["None","Small","Medium","Large","ExtraLarge"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ImageModelSettingsObjectDetection","properties","validationMetricType"]` | `["None","Coco","Voc","CocoVoc"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","ImageObjectDetection","properties","primaryMetric"]` | `["MeanAveragePrecision"]` | `"MeanAveragePrecision"` | Compliant |
| `openapi.json` | `["definitions","IndexColumn","properties","dataType"]` | `["String","Integer","Long","Float","Double","Binary","Datetime","Boolean"]` | `"String"` | Compliant |
| `openapi.json` | `["definitions","MLFlowModelJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` | Compliant |
| `openapi.json` | `["definitions","MLFlowModelJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` | Compliant |
| `openapi.json` | `["definitions","MLTableJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` | Compliant |
| `openapi.json` | `["definitions","MLTableJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` | Compliant |
| `openapi.json` | `["definitions","MaterializationSettings","properties","storeType"]` | `["None","Online","Offline","OnlineAndOffline"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","OneLakeDatastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","OnlineDeploymentProperties","properties","egressPublicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","OnlineEndpointProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` | Compliant |
| `openapi.json` | `["definitions","PendingUploadRequestDto","properties","pendingUploadType"]` | `["None","TemporaryBlobReference"]` | `"TemporaryBlobReference"` | Compliant |
| `openapi.json` | `["definitions","PendingUploadResponseDto","properties","pendingUploadType"]` | `["None","TemporaryBlobReference"]` | `"TemporaryBlobReference"` | Compliant |
| `openapi.json` | `["definitions","QueueSettings","properties","jobTier"]` | `["Null","Spot","Basic","Standard","Premium"]` | `"Null"` | Compliant |
| `openapi.json` | `["definitions","RandomSamplingAlgorithm","properties","rule"]` | `["Random","Sobol"]` | `"Random"` | Compliant |
| `openapi.json` | `["definitions","Regression","properties","primaryMetric"]` | `["SpearmanCorrelation","NormalizedRootMeanSquaredError","R2Score","NormalizedMeanAbsoluteError"]` | `"NormalizedRootMeanSquaredError"` | Compliant |
| `openapi.json` | `["definitions","SkuCapacity","properties","scaleType"]` | `["Automatic","Manual","None"]` | `"Automatic"` | Compliant |
| `openapi.json` | `["definitions","SkuSetting","properties","tier"]` | `["Free","Basic","Standard","Premium"]` | `"Basic"` | Compliant |
| `openapi.json` | `["definitions","StackEnsembleSettings","properties","stackMetaLearnerType"]` | `["None","LogisticRegression","LogisticRegressionCV","LightGBMClassifier","ElasticNet","ElasticNetCV","LightGBMRegressor","LinearRegression"]` | `"None"` | Compliant |
| `openapi.json` | `["definitions","TableVerticalFeaturizationSettings","properties","mode"]` | `["Auto","Custom","Off"]` | `"Auto"` | Compliant |
| `openapi.json` | `["definitions","TextClassification","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted"]` | `"Accuracy"` | Compliant |
| `openapi.json` | `["definitions","TritonModelJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` | Compliant |
| `openapi.json` | `["definitions","TritonModelJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` | Compliant |
| `openapi.json` | `["definitions","UriFileJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` | Compliant |
| `openapi.json` | `["definitions","UriFileJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` | Compliant |
| `openapi.json` | `["definitions","UriFolderJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` | Compliant |
| `openapi.json` | `["definitions","UriFolderJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` | Compliant |
| `openapi.json` | `["definitions","VolumeDefinition","properties","type"]` | `["bind","volume","tmpfs","npipe"]` | `"bind"` | Compliant |

## Evidence and boundaries

[Native receipt](../native-302.json) | [Exact worker input](../native-302.input.json) | [Worker log](../native-302.log) | [Complete historical schema sites and production log excerpts](../preflight/historical-full.json) | [Full-run index](../index.md)

Raw/source findings are retained separately; source filtering is not API-version projection. Native warning severity, explicit nullable-null acceptance, and disabled recommended presets remain intentional differences from Swagger. No equivalence or release-readiness claim follows from matching counts.

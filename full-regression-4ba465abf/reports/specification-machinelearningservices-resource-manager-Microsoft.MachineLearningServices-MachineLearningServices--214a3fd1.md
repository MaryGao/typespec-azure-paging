# specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/MachineLearningServices: DefaultInEnum revalidation

Candidate: `4ba465abf8e5c577197f6c3f930b1ece40d34305`. Frozen specs: `2cd3c5dd6d00a5f53214fe594afd2aef3f44d3f9`. Saved API version: `2026-09-01`.

Fresh TypeSpec execution explicitly enables `use-known-enum-default` in target-only/source mode. Swagger generation and validation are not rerun; saved production observations are reused.

| Observation | Result |
| --- | --- |
| Native assessment | success |
| Native raw/source findings | 0/0 |
| Native ambient diagnostics | 0 |
| Saved Swagger target findings | 0 |
| Saved primary documents / enum-default sites | 1/89 |

No target diagnostic difference was observed.

## Saved primary enum/default sites

| Swagger file | JSON path | Enum | Default |
| --- | --- | --- | --- |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions","get","parameters","9"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions","get","parameters","8"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions","get","parameters","12"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions","get","parameters","8"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions","get","parameters","9"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments","get","parameters","5"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions","get","parameters","8"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets","get","parameters","6"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions","get","parameters","7"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{featuresetName}/versions/{featuresetVersion}/features","get","parameters","10"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities","get","parameters","6"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions","get","parameters","7"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs","get","parameters","7"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models","get","parameters","6"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions","get","parameters","14"]` | `["ActiveOnly","ArchivedOnly","All"]` | `"ActiveOnly"` |
| `openapi.json` | `["paths","/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules","get","parameters","5"]` | `["EnabledOnly","DisabledOnly","All"]` | `"EnabledOnly"` |
| `openapi.json` | `["definitions","AKSSchemaProperties","properties","clusterPurpose"]` | `["FastProd","DenseProd","DevTest"]` | `"FastProd"` |
| `openapi.json` | `["definitions","AKSSchemaProperties","properties","loadBalancerType"]` | `["PublicIp","InternalLoadBalancer"]` | `"PublicIp"` |
| `openapi.json` | `["definitions","AmlComputeProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |
| `openapi.json` | `["definitions","AmlComputeProperties","properties","remoteLoginPortPublicAccess"]` | `["Enabled","Disabled","NotSpecified"]` | `"NotSpecified"` |
| `openapi.json` | `["definitions","AutoMLVertical","properties","logVerbosity"]` | `["NotSet","Debug","Info","Warning","Error","Critical"]` | `"Info"` |
| `openapi.json` | `["definitions","AzureBlobDatastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` |
| `openapi.json` | `["definitions","AzureDataLakeGen1Datastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` |
| `openapi.json` | `["definitions","AzureDataLakeGen2Datastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` |
| `openapi.json` | `["definitions","AzureFileDatastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` |
| `openapi.json` | `["definitions","BatchDeploymentProperties","properties","loggingLevel"]` | `["Info","Warning","Debug"]` | `"Info"` |
| `openapi.json` | `["definitions","BatchDeploymentProperties","properties","outputAction"]` | `["SummaryOnly","AppendRow"]` | `"AppendRow"` |
| `openapi.json` | `["definitions","CapabilityHostProperties","properties","capabilityHostKind"]` | `["Agents"]` | `"Agents"` |
| `openapi.json` | `["definitions","Classification","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted"]` | `"AUCWeighted"` |
| `openapi.json` | `["definitions","Collection","properties","dataCollectionMode"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","ComputeInstanceDataDisk","properties","storageAccountType"]` | `["Standard_LRS","Premium_LRS"]` | `"Standard_LRS"` |
| `openapi.json` | `["definitions","ComputeInstanceProperties","properties","applicationSharingPolicy"]` | `["Personal","Shared"]` | `"Shared"` |
| `openapi.json` | `["definitions","ComputeInstanceProperties","properties","computeInstanceAuthorizationType"]` | `["personal"]` | `"personal"` |
| `openapi.json` | `["definitions","ComputeInstanceSshSettings","properties","sshPublicAccess"]` | `["Enabled","Disabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","CustomModelJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` |
| `openapi.json` | `["definitions","CustomModelJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` |
| `openapi.json` | `["definitions","DataCollector","properties","rollingRate"]` | `["Year","Month","Day","Hour","Minute"]` | `"Hour"` |
| `openapi.json` | `["definitions","DeploymentLogsRequest","properties","containerType"]` | `["StorageInitializer","InferenceServer"]` | `"InferenceServer"` |
| `openapi.json` | `["definitions","Endpoint","properties","protocol"]` | `["tcp","udp","http"]` | `"tcp"` |
| `openapi.json` | `["definitions","EnvironmentVariable","properties","type"]` | `["local"]` | `"local"` |
| `openapi.json` | `["definitions","EnvironmentVersionProperties","properties","autoRebuild"]` | `["Disabled","OnBaseImageUpdate"]` | `"Disabled"` |
| `openapi.json` | `["definitions","EnvironmentVersionProperties","properties","osType"]` | `["Linux","Windows"]` | `"Linux"` |
| `openapi.json` | `["definitions","FeatureImportanceSettings","properties","mode"]` | `["Disabled","Enabled"]` | `"Disabled"` |
| `openapi.json` | `["definitions","FeatureProperties","properties","dataType"]` | `["String","Integer","Long","Float","Double","Binary","Datetime","Boolean"]` | `"String"` |
| `openapi.json` | `["definitions","Forecasting","properties","primaryMetric"]` | `["SpearmanCorrelation","NormalizedRootMeanSquaredError","R2Score","NormalizedMeanAbsoluteError"]` | `"NormalizedRootMeanSquaredError"` |
| `openapi.json` | `["definitions","ForecastingSettings","properties","featureLags"]` | `["None","Auto"]` | `"None"` |
| `openapi.json` | `["definitions","ForecastingSettings","properties","shortSeriesHandlingConfig"]` | `["None","Auto","Pad","Drop"]` | `"Auto"` |
| `openapi.json` | `["definitions","ForecastingSettings","properties","targetAggregateFunction"]` | `["None","Sum","Max","Min","Mean"]` | `"None"` |
| `openapi.json` | `["definitions","ForecastingSettings","properties","useStl"]` | `["None","Season","SeasonTrend"]` | `"None"` |
| `openapi.json` | `["definitions","Image","properties","type"]` | `["docker","azureml"]` | `"docker"` |
| `openapi.json` | `["definitions","ImageClassification","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted"]` | `"Accuracy"` |
| `openapi.json` | `["definitions","ImageClassificationMultilabel","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted","IOU"]` | `"IOU"` |
| `openapi.json` | `["definitions","ImageInstanceSegmentation","properties","primaryMetric"]` | `["MeanAveragePrecision"]` | `"MeanAveragePrecision"` |
| `openapi.json` | `["definitions","ImageModelSettings","properties","learningRateScheduler"]` | `["None","WarmupCosine","Step"]` | `"None"` |
| `openapi.json` | `["definitions","ImageModelSettings","properties","optimizer"]` | `["None","Sgd","Adam","Adamw"]` | `"None"` |
| `openapi.json` | `["definitions","ImageModelSettingsObjectDetection","properties","modelSize"]` | `["None","Small","Medium","Large","ExtraLarge"]` | `"None"` |
| `openapi.json` | `["definitions","ImageModelSettingsObjectDetection","properties","validationMetricType"]` | `["None","Coco","Voc","CocoVoc"]` | `"None"` |
| `openapi.json` | `["definitions","ImageObjectDetection","properties","primaryMetric"]` | `["MeanAveragePrecision"]` | `"MeanAveragePrecision"` |
| `openapi.json` | `["definitions","IndexColumn","properties","dataType"]` | `["String","Integer","Long","Float","Double","Binary","Datetime","Boolean"]` | `"String"` |
| `openapi.json` | `["definitions","MLFlowModelJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` |
| `openapi.json` | `["definitions","MLFlowModelJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` |
| `openapi.json` | `["definitions","MLTableJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` |
| `openapi.json` | `["definitions","MLTableJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` |
| `openapi.json` | `["definitions","MaterializationSettings","properties","storeType"]` | `["None","Online","Offline","OnlineAndOffline"]` | `"None"` |
| `openapi.json` | `["definitions","OneLakeDatastore","properties","serviceDataAccessAuthIdentity"]` | `["None","WorkspaceSystemAssignedIdentity","WorkspaceUserAssignedIdentity"]` | `"None"` |
| `openapi.json` | `["definitions","OnlineDeploymentProperties","properties","egressPublicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `openapi.json` | `["definitions","OnlineEndpointProperties","properties","publicNetworkAccess"]` | `["Enabled","Disabled"]` | `"Enabled"` |
| `openapi.json` | `["definitions","PendingUploadRequestDto","properties","pendingUploadType"]` | `["None","TemporaryBlobReference"]` | `"TemporaryBlobReference"` |
| `openapi.json` | `["definitions","PendingUploadResponseDto","properties","pendingUploadType"]` | `["None","TemporaryBlobReference"]` | `"TemporaryBlobReference"` |
| `openapi.json` | `["definitions","QueueSettings","properties","jobTier"]` | `["Null","Spot","Basic","Standard","Premium"]` | `"Null"` |
| `openapi.json` | `["definitions","RandomSamplingAlgorithm","properties","rule"]` | `["Random","Sobol"]` | `"Random"` |
| `openapi.json` | `["definitions","Regression","properties","primaryMetric"]` | `["SpearmanCorrelation","NormalizedRootMeanSquaredError","R2Score","NormalizedMeanAbsoluteError"]` | `"NormalizedRootMeanSquaredError"` |
| `openapi.json` | `["definitions","SkuCapacity","properties","scaleType"]` | `["Automatic","Manual","None"]` | `"Automatic"` |
| `openapi.json` | `["definitions","SkuSetting","properties","tier"]` | `["Free","Basic","Standard","Premium"]` | `"Basic"` |
| `openapi.json` | `["definitions","StackEnsembleSettings","properties","stackMetaLearnerType"]` | `["None","LogisticRegression","LogisticRegressionCV","LightGBMClassifier","ElasticNet","ElasticNetCV","LightGBMRegressor","LinearRegression"]` | `"None"` |
| `openapi.json` | `["definitions","TableVerticalFeaturizationSettings","properties","mode"]` | `["Auto","Custom","Off"]` | `"Auto"` |
| `openapi.json` | `["definitions","TextClassification","properties","primaryMetric"]` | `["AUCWeighted","Accuracy","NormMacroRecall","AveragePrecisionScoreWeighted","PrecisionScoreWeighted"]` | `"Accuracy"` |
| `openapi.json` | `["definitions","TritonModelJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` |
| `openapi.json` | `["definitions","TritonModelJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` |
| `openapi.json` | `["definitions","UriFileJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` |
| `openapi.json` | `["definitions","UriFileJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` |
| `openapi.json` | `["definitions","UriFolderJobInput","properties","mode"]` | `["ReadOnlyMount","ReadWriteMount","Download","Direct","EvalMount","EvalDownload"]` | `"ReadOnlyMount"` |
| `openapi.json` | `["definitions","UriFolderJobOutput","properties","mode"]` | `["ReadWriteMount","Upload","Direct"]` | `"ReadWriteMount"` |
| `openapi.json` | `["definitions","VolumeDefinition","properties","type"]` | `["bind","volume","tmpfs","npipe"]` | `"bind"` |

[Native receipt](../native-302.json) | [Worker input](../native-302.input.json) | [Worker log](../native-302.log) | [Historical evidence](../preflight/historical-full.json) | [Full index](../index.md)

Source scope is not selected-version emission equivalence. Nullable-null acceptance, native warning severity, and opt-in recommended presets remain intentional boundaries.

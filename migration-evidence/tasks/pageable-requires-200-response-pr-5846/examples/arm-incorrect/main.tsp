import "@azure-tools/typespec-azure-resource-manager";

import "@typespec/http";
import "@azure-tools/typespec-azure-core";
using TypeSpec.Http;
using Azure.Core;

@service @Azure.ResourceManager.armProviderNamespace namespace Microsoft.Contoso;
model Widget { name: string; }
@list
@post
@route("/widgets:search")
op searchWidgets is RpcOperation<
  {},
  {
    @statusCode status: 201;
    @body body: Page<Widget>;
  }
>;
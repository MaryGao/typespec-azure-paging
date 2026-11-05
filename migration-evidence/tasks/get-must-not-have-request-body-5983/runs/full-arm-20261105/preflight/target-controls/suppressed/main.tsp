import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace PilotControl;
#suppress "@azure-tools/typespec-azure-resource-manager/no-get-request-body" "Intentional control suppression"
@get op suppressed(@body body: { value: string }): void;

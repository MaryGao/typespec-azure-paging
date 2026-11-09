import "@typespec/http";
import "@azure-tools/typespec-azure-core";
using TypeSpec.Http;
@service namespace PilotControl;
#suppress "@azure-tools/typespec-azure-core/no-request-body" "Intentional control suppression"
@route("/get") @get op suppressed(@body body: { value: string }): void;

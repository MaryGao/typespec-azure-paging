import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
import "@azure-tools/typespec-azure-rulesets";
using TypeSpec.Http;
@service namespace ActivationControl;
@route("/widgets") @get op read(@body body: { value: string }): void;

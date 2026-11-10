import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace Pilot;
#suppress "@azure-tools/typespec-azure-resource-manager/missing-error-decorator" "Pilot suppression control"
@get op check(): { @statusCode status: 400; };

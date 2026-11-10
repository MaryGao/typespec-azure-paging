import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace Pilot;
@get op check(): { @statusCode status: 400; } | { @statusCode status: 500; };

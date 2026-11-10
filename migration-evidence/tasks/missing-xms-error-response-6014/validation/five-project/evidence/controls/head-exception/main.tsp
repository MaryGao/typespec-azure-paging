import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace Pilot;
@head op check(): { @statusCode status: 404; } | { @statusCode status: 500; };

import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace Pilot;
@error model Failure { @statusCode status: 500; }
@get op check(): Failure;

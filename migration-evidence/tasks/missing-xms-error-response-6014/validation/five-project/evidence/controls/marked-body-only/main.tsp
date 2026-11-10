import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace Pilot;
@error model Payload { code: string; }
@get op check(): { @statusCode status: 400; @body body: Payload; };

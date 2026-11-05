import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace PilotControl;
@route("/bodyless") @get op bodyless(@query name?: string): void;
@route("/void") @get op voidBody(@body body: void): void;
@route("/post") @post op permitted(@body body: { value: string }): void;

import "@typespec/http";
import "@azure-tools/typespec-azure-core";
using TypeSpec.Http;
@service namespace PilotControl;
@route("/get") @get op getBodyless(@query name?: string): void;
@route("/delete") @delete op deleteBodyless(): void;
@route("/void") @delete op deleteVoid(@body body: void): void;
@route("/post") @post op postBody(@body body: { value: string }): void;

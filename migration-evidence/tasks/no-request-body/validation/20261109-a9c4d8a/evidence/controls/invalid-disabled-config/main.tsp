import "@typespec/http";
import "@azure-tools/typespec-azure-core";
using TypeSpec.Http;
@service namespace PilotControl;
@route("/get") @get op getBody(@body body: { value: string }): void;
@route("/delete") @delete op deleteBody(@body body?: {}): void;
@route("/implicit") @get op implicit(value: string): void;

import "@typespec/http";
import "@azure-tools/typespec-azure-resource-manager";
using TypeSpec.Http;
@service namespace PilotControl;
@route("/explicit") @get op explicit(@body body: { value: string }): void;
@route("/optional") @get op optional(@body body?: { value: string }): void;
@route("/empty") @get op empty(@body body: {}): void;
@route("/implicit") @get op implicit(value: string): void;

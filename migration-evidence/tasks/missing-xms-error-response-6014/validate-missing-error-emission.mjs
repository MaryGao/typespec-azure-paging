import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const repo = process.argv[2];
const output = process.argv[3];
const { Tester } = await import(
  pathToFileURL(join(repo, "packages", "typespec-autorest", "test", "test-host.ts"))
);
const results = [];
for (const responses of ["Unmarked | Marked", "Marked | Unmarked"]) {
  const [{ outputs }, diagnostics] = await Tester.compileAndDiagnose(`
    @service namespace Demo;
    model Unmarked { @statusCode status: 400; @body body: string; }
    @error model Marked { @statusCode status: 400; @body body: string; }
    @get op read(): ${responses};
  `);
  assert.deepEqual(diagnostics, []);
  const document = JSON.parse(outputs["openapi.json"]);
  const response = document.paths["/"].get.responses["400"];
  assert.equal(response["x-ms-error-response"], responses.startsWith("Marked") ? true : undefined);
  results.push({ responses, response });
}
await writeFile(output, JSON.stringify({ results }, null, 2) + "\n");
process.stdout.write(
  "Verified AutoRest shared-status error marker behavior in both union orders.\n",
);

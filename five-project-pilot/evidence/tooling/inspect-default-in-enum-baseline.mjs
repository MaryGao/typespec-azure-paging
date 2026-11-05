import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const root = "C:\\Users\\marygao\\project\\coverage-reports\\default-in-enum";
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const selection = read(path.join(root, "selection.json"));
const baseline = read(path.join(selection.baselineDirectory, "baseline.json"));
const inventory = new Map(baseline.files.map((file) => [file.file.replaceAll("\\", "/"), file.sha256]));
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const results = [];
for (const project of selection.projects) {
  const saved = baseline.projects.find((item) => item.sourcePath === project.sourcePath);
  const files = [];
  for (const relative of saved.rawFiles) {
    const bytes = fs.readFileSync(path.join(selection.baselineDirectory, "dataset", relative));
    const sha256 = hash(bytes);
    if (sha256 !== inventory.get(relative.replaceAll("\\", "/"))) throw new Error(`Raw log hash mismatch: ${relative}`);
    const local = path.join(root, "evidence", project.slug, "swagger-raw", path.basename(relative));
    fs.mkdirSync(path.dirname(local), { recursive: true });
    fs.copyFileSync(path.join(selection.baselineDirectory, "dataset", relative), local);
    if (!relative.endsWith(".jsonl")) {
      files.push({ file: relative, sha256, bytes: bytes.length });
      continue;
    }
    const rows = bytes.toString("utf8").trim().split(/\r?\n/).map((line, index) => ({ line: index + 1, row: JSON.parse(line) }));
    const selected = rows.filter(({ row }) => row.message?.includes("severity 'Error': 'DefaultInEnum'"));
    const validating = rows.filter(({ row }) => row.message?.startsWith("spectralPluginFunc: Validating OpenAPI spec."));
    const completed = rows.filter(({ row }) => row.message === "spectralPluginFunc: Return");
    const production = rows.filter(({ row }) => row.message?.startsWith("Detected production run."));
    const failures = rows.filter(({ row }) => row.level === "fatal" || row.message?.includes("spectralPluginFunc: Failed validating:"));
    const targetFindings = rows.filter(({ row }) =>
      !["information", "debug", "verbose"].includes(row.level) && JSON.stringify(row).includes("DefaultInEnum"));
    if (selected.length !== 2 || validating.length < 1 || completed.length !== 1 ||
        production.length < 1 || failures.length > 0) throw new Error(`Incomplete historical execution: ${relative}`);
    files.push({
      file: relative, sha256, bytes: bytes.length,
      selected: selected.map(({ line, row }) => ({ line, message: row.message })),
      validating: validating.map(({ line, row }) => ({ line, message: row.message })),
      production: production.map(({ line, row }) => ({ line, message: row.message })),
      completed: completed.map(({ line, row }) => ({ line, message: row.message })),
      targetFindings,
    });
  }
  const sourceFiles = read(path.join(root, "evidence", project.slug, "source-files.json"));
  const swagger = read(path.join(root, "evidence", project.slug, "saved-enum-defaults.json"));
  const propertyNames = new Set(swagger.flatMap((file) => file.enumDefaults.map((site) => site.path.at(-1))));
  const sourceDefaults = [];
  for (const { file } of sourceFiles.filter(({ file }) => file.endsWith(".tsp"))) {
    const lines = fs.readFileSync(path.join(selection.specs, file), "utf8").split(/\r?\n/);
    for (let index = 0; index < lines.length; index++) {
      const match = /^\s*([A-Za-z_]\w*)\??\s*:.*=/.exec(lines[index]);
      if (match && propertyNames.has(match[1])) sourceDefaults.push({ file, line: index + 1, text: lines[index].trim() });
    }
  }
  const native = read(path.join(root, "evidence", project.slug, "native.json"));
  for (const relative of saved.swaggerFiles) {
    if (!files.some((file) => file.validating?.some(({ message }) => message.includes(relative.replaceAll("\\", "/"))))) {
      throw new Error(`Selected Swagger has no successful production validation receipt: ${relative}`);
    }
  }
  const result = {
    slug: project.slug,
    historicalStatus: "assessed-from-verified-saved-production-logs",
    historicalCompileStatus: saved.compileStatus,
    historicalValidationStatus: saved.validationStatus,
    observedSwaggerFindings: files.reduce((sum, file) => sum + (file.targetFindings?.length ?? 0), 0),
    logFiles: files,
    authoredTypeSpecFiles: sourceFiles.filter(({ file }) => file.endsWith(".tsp")).length,
    retainedInputFiles: sourceFiles.length,
    nativeStatus: native.status,
    ambientDiagnostics: native.ambientDiagnostics,
    sourceDefaultCorroboration: sourceDefaults,
    sourceDefaultCorroborationLimit: "Textual property-name matches, not a proven one-to-one emitted schema or API-version mapping.",
  };
  fs.writeFileSync(path.join(root, "evidence", project.slug, "historical-validation.json"), JSON.stringify(result, null, 2) + "\n");
  results.push(result);
  console.log(JSON.stringify({
    slug: project.slug, logs: files.length, swaggerFindings: result.observedSwaggerFindings,
    authoredTypeSpecFiles: result.authoredTypeSpecFiles, ambientCount: native.ambientDiagnostics.length, sourceDefaults,
  }));
}
fs.writeFileSync(path.join(root, "evidence", "historical-validation.json"), JSON.stringify({
  status: "assessed-from-verified-saved-production-logs",
  freshSwaggerExecution: false,
  baselineIdentity: selection.baselineIdentity,
  projects: results.map(({ logFiles, sourceDefaultCorroboration, ...result }) => result),
}, null, 2) + "\n");

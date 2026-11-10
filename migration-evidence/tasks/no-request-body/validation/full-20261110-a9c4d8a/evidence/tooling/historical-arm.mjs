import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const baseline =
  "C:\\dev\\worktrees\\xms-pageable-validation-5844\\shared-swagger-arm-20261026-2cd3c5dd";
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const sealed = read(path.join(baseline, "baseline.json"));
const manifest = read(path.join(baseline, "manifest.json"));
const identity = "aceebb4ebf1ae78205105a94337046d18e583472bd1ebf782effca1e24a75995";
assert(
  manifest.status === "complete" &&
    manifest.baselineIdentity === identity &&
    sha(JSON.stringify(sealed)) === identity,
  "Shared baseline identity changed.",
);
const inventory = new Map(
  sealed.files.map((item) => [item.file.replaceAll("\\", "/"), item.sha256]),
);
const verified = new Map();
const documents = new Map();
const rules = ["GetMustNotHaveRequestBody", "DeleteMustNotHaveRequestBody"];
function bytes(relative) {
  const file = relative.replaceAll("\\", "/");
  assert(
    !file.startsWith("../") && !path.posix.isAbsolute(file),
    "Baseline reference escapes dataset.",
  );
  const content = fs.readFileSync(path.join(baseline, "dataset", file));
  const digest = sha(content);
  assert(digest === inventory.get(file), "Changed baseline input: " + file);
  verified.set(file, digest);
  return content;
}
function document(file) {
  if (!documents.has(file)) documents.set(file, JSON.parse(bytes(file)));
  return documents.get(file);
}
function parameter(value, file, seen = new Set()) {
  if (!value?.$ref) return value;
  const [part, pointer] = value.$ref.split("#");
  assert(pointer?.startsWith("/") && !/^[a-z]+:/i.test(part), "Unsupported parameter reference.");
  const targetFile = part
    ? path.posix.normalize(path.posix.join(path.posix.dirname(file), decodeURIComponent(part)))
    : file;
  const key = `${targetFile}#${pointer}`;
  assert(!seen.has(key), "Cyclic parameter reference.");
  seen.add(key);
  const target = pointer
    .slice(1)
    .split("/")
    .reduce(
      (node, part) => node?.[decodeURIComponent(part).replaceAll("~1", "/").replaceAll("~0", "~")],
      document(targetFile),
    );
  assert(target !== undefined, "Unresolved parameter: " + key);
  return parameter(target, targetFile, seen);
}
const projects = [];
for (const project of sealed.projects) {
  assert(
    project.compileStatus === "success" && project.validationStatus === "success",
    "Unsuccessful saved project.",
  );
  const logs = [];
  for (const file of [
    ...new Set([...(project.rawFiles ?? []), ...(project.validatorLogFiles ?? [])]),
  ]) {
    const content = bytes(file);
    if (!file.endsWith(".jsonl")) continue;
    const rows = content
      .toString("utf8")
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line, index) => ({ line: index + 1, row: JSON.parse(line) }));
    const registration = Object.fromEntries(
      rules.map((rule) => [
        rule,
        rows
          .filter(({ row }) => row.message?.includes(`severity 'Error': '${rule}'`))
          .map(({ line, row }) => ({ line, message: row.message })),
      ]),
    );
    const validating = rows.filter(({ row }) =>
      row.message?.startsWith("spectralPluginFunc: Validating OpenAPI spec."),
    );
    const complete = rows.filter(({ row }) => row.message === "spectralPluginFunc: Return");
    const production = rows.filter(({ row }) =>
      row.message?.startsWith("Detected production run."),
    );
    const failures = rows.filter(
      ({ row }) =>
        row.level === "fatal" || row.message?.includes("spectralPluginFunc: Failed validating:"),
    );
    assert(
      rules.every((rule) => registration[rule].length === 2) &&
        validating.length > 0 &&
        complete.length === 1 &&
        production.length > 0 &&
        failures.length === 0,
      "Incomplete saved production execution: " + file,
    );
    const findings = Object.fromEntries(
      rules.map((rule) => [
        rule,
        rows.filter(
          ({ row }) =>
            !["information", "debug", "verbose"].includes(row.level) &&
            JSON.stringify(row).includes(rule),
        ),
      ]),
    );
    logs.push({
      file,
      sha256: sha(content),
      registration,
      completedLines: complete.map(({ line }) => line),
      productionLines: production.map(({ line }) => line),
      validatedFiles: project.swaggerFiles.filter((file) =>
        validating.some(({ row }) => row.message.includes(file.replaceAll("\\", "/"))),
      ),
      findings,
    });
  }
  const swagger = project.swaggerFiles.map((file) => {
    assert(
      logs.some((log) => log.validatedFiles.includes(file)),
      "No saved execution receipt: " + file,
    );
    const doc = document(file);
    const operations = [];
    for (const section of ["paths", "x-ms-paths"]) {
      for (const [route, item] of Object.entries(doc[section] ?? {})) {
        assert(!item.$ref, "Path-item reference requires separate assessment: " + file);
        for (const verb of ["get", "delete"]) {
          if (!item[verb]) continue;
          assert(!item[verb].$ref, "Operation reference requires separate assessment: " + file);
          operations.push({
            section,
            route,
            verb,
            operationId: item[verb].operationId,
            bodyParameters: (item[verb].parameters ?? [])
              .map((p) => parameter(p, file))
              .filter((p) => p?.in === "body"),
            originalPolicy: verb === "get" ? rules[0] : section === "paths" ? rules[1] : null,
          });
        }
      }
    }
    return { file, sha256: verified.get(file), operations };
  });
  projects.push({
    project: project.sourcePath,
    apiVersion: project.apiVersion,
    swagger,
    counts: Object.fromEntries(
      rules.map((rule) => [rule, logs.reduce((sum, log) => sum + log.findings[rule].length, 0)]),
    ),
    staticBodyParameters: Object.fromEntries(
      rules.map((rule) => [
        rule,
        swagger.reduce(
          (sum, file) =>
            sum +
            file.operations
              .filter((op) => op.originalPolicy === rule)
              .reduce((n, op) => n + op.bodyParameters.length, 0),
          0,
        ),
      ]),
    ),
    logs,
  });
}
assert(projects.length === 487, "Wrong full ARM population.");
const result = {
  status: "assessed-from-verified-saved-production-execution",
  freshSwaggerExecution: false,
  baselineIdentity: identity,
  projects,
  swaggerFiles: projects.reduce((sum, p) => sum + p.swagger.length, 0),
  counts: Object.fromEntries(
    rules.map((rule) => [rule, projects.reduce((sum, p) => sum + p.counts[rule], 0)]),
  ),
  verifiedFiles: [...verified].map(([file, sha256]) => ({ file, sha256 })),
  limit:
    "Saved production registration/completion proves target evaluation; static resolved-parameter inventory corroborates selectors but is not fresh Swagger execution or source-operation correspondence. The official analyzer independently verifies the complete immutable dataset.",
};
fs.writeFileSync(
  path.join(root, "evidence", "historical-arm.json"),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      projects: projects.length,
      swaggerFiles: result.swaggerFiles,
      counts: result.counts,
      verifiedFiles: verified.size,
    },
    null,
    2,
  ),
);

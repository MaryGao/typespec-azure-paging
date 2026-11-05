import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = "C:\\Users\\marygao\\project\\coverage-reports\\default-in-enum";
const selection = JSON.parse(fs.readFileSync(path.join(root, "selection.json"), "utf8"));
const identity = JSON.parse(fs.readFileSync(path.join(root, "evidence", "runtime-identity.json"), "utf8"));
if (identity.status !== "passed") throw new Error("Injected artifacts have not passed verification.");
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
};
async function execute(input, output, log) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const fd = fs.openSync(log, "w");
  const startedAt = new Date().toISOString();
  const outcome = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [selection.worker.file, input, output], {
      cwd: selection.specs,
      stdio: ["ignore", fd, fd],
      timeout: 240000,
      windowsHide: true,
    });
    child.on("error", reject);
    child.on("exit", (exitCode, signal) => resolve({ exitCode, signal }));
  }).finally(() => fs.closeSync(fd));
  const receipt = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, "utf8")) : undefined;
  return {
    startedAt,
    finishedAt: new Date().toISOString(),
    ...outcome,
    workerStatus: receipt?.status ?? "missing-receipt",
    status: receipt?.status === "success" ? "assessed" : "unassessed",
    rawCount: receipt?.rawDiagnostics?.length,
    diagnosticCount: receipt?.diagnostics?.length,
    error: receipt?.error,
    input,
    output,
    log,
  };
}
const controls = [];
for (const [name, expected] of [["invalid-string", 1], ["invalid-number", 1], ["compliant", 0], ["suppressed", 0]]) {
  const directory = path.join(root, "evidence", "controls", name);
  const input = path.join(directory, "input.json");
  write(input, {
    specsRepo: selection.specs,
    project: { sourcePath: `.validation-controls/default-in-enum/${name}` },
    validatorRules: ["DefaultInEnum"],
    tspRules: [selection.typeSpecRule],
    scope: "source",
    nativeMode: "target-only",
  });
  const result = await execute(input, path.join(directory, "native.json"), path.join(directory, "worker.log"));
  const passed = result.exitCode === 0 && result.status === "assessed" && result.rawCount === expected;
  controls.push({ name, expected, passed, ...result });
  write(path.join(root, "evidence", "controls.json"), controls);
  console.log(`Control ${name}: ${result.status}, ${result.rawCount} diagnostics, expected ${expected}, passed=${passed}`);
  if (!passed) throw new Error(`Injected control failed: ${name}`);
}
const execution = {
  schemaVersion: 1,
  status: "running",
  startedAt: new Date().toISOString(),
  candidateCommit: selection.candidateCommit,
  coreCommit: selection.candidateCoreCommit,
  specsCommit: selection.specsCommit,
  worker: selection.worker,
  node: process.version,
  scope: "source",
  nativeMode: "target-only",
  defaultActivation: "not-assessed",
  fullRegression: false,
  swaggerGeneration: false,
  sourceSuppressionsRetained: true,
  concurrency: 2,
  perProjectTimeoutMs: 240000,
  projects: [],
};
const executionFile = path.join(root, "evidence", "execution.json");
write(executionFile, execution);
let next = 0;
async function consume() {
  while (next < selection.projects.length) {
    const project = selection.projects[next++];
    const directory = path.join(root, "evidence", project.slug);
    const result = await execute(
      path.join(directory, "input.json"),
      path.join(directory, "native.json"),
      path.join(directory, "worker.log"),
    );
    execution.projects.push({ slug: project.slug, project: project.sourcePath, ...result });
    write(executionFile, execution);
    console.log(`${project.name}: ${result.status}, raw=${result.rawCount}, exit=${result.exitCode}`);
  }
}
await Promise.all([consume(), consume()]);
execution.finishedAt = new Date().toISOString();
execution.quiescent = true;
execution.status = execution.projects.every((project) => project.status === "assessed" && project.exitCode === 0)
  ? "completed"
  : "incomplete";
write(executionFile, execution);
if (execution.status !== "completed") process.exitCode = 1;

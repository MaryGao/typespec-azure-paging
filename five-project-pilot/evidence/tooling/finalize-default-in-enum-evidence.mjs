import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const root = "C:\\Users\\marygao\\project\\coverage-reports\\default-in-enum";
const workspace = "C:\\Users\\marygao\\.copilot\\session-state\\b1b33c8e-4a8a-42c2-bcfe-8b95b2b0e0e1\\files";
const evidence = "C:\\dev\\worktrees\\evidence-default-in-enum-5972";
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const selection = read(path.join(root, "selection.json"));
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const dependency = "specification/network/resource-manager/Microsoft.Network/Network/Common/main.tsp";
const tracked = execFileSync("git", ["show", `${selection.specsCommit}:${dependency}`], { cwd: selection.specs, maxBuffer: 8 * 1024 * 1024 });
const bytes = fs.readFileSync(path.join(selection.specs, dependency));
const canonical = bytes.toString("utf8").replaceAll("\r\n", "\n");
if (hash(tracked) !== hash(canonical)) throw new Error("Shared Network source differs from frozen commit.");
const lines = canonical.split("\n");
const dependencyEvidence = {
  file: dependency,
  specsCommit: selection.specsCommit,
  installedBytesSha256: hash(bytes),
  gitBlobSha256: hash(tracked),
  normalizedBytesMatchGitBlob: true,
  outsideSelectedProjectRoot: true,
  declarations: [1234, 1239, 2935].map((line) => ({ line, text: lines[line - 1] })),
};
fs.writeFileSync(path.join(root, "evidence", "network", "source-dependency-evidence.json"), JSON.stringify(dependencyEvidence, null, 2) + "\n");

const copy = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};
for (const name of ["candidate-build", "additional-core-build", "rule-rebuild", "focused-tests", "ruleset-tests", "pack-azure", "pack-core", "candidate-injection"]) {
  copy(path.join(evidence, ".local", `${name}.log`), path.join(root, "evidence", "development", `${name}.log`));
}
for (const control of ["invalid-string", "invalid-number", "compliant", "suppressed"]) {
  for (const file of ["main.tsp", "tspconfig.yaml"]) {
    copy(path.join(selection.specs, ".validation-controls", "default-in-enum", control, file),
      path.join(root, "evidence", "controls", control, file));
  }
}
copy(selection.worker.file, path.join(root, "evidence", "tooling", "native-coverage-worker.mjs"));
for (const file of ["prepare-default-in-enum-pilot.mjs", "verify-default-in-enum-artifacts.mjs", "run-default-in-enum-pilot.mjs", "inspect-default-in-enum-baseline.mjs", "finalize-default-in-enum-evidence.mjs"]) {
  copy(path.join(workspace, file), path.join(root, "evidence", "tooling", file));
}

for (const project of selection.projects) {
  const native = read(path.join(root, "evidence", project.slug, "native.json"));
  const history = read(path.join(root, "evidence", project.slug, "historical-validation.json"));
  if (native.status !== "success" || native.rawDiagnostics.length !== 0 ||
      native.diagnostics.length !== 0 || native.ambientDiagnostics.length !== 0 ||
      history.observedSwaggerFindings !== 0) throw new Error(`Unexpected report outcome: ${project.slug}`);
}
const controls = read(path.join(root, "evidence", "controls.json"));
if (controls.length !== 4 || controls.some((control) => !control.passed)) throw new Error("Control results do not support report.");
const identity = read(path.join(root, "evidence", "runtime-identity.json"));
if (identity.status !== "passed" || identity.artifacts.length !== 15 ||
    identity.artifacts.reduce((sum, item) => sum + item.verifiedFiles, 0) !== 2867) throw new Error("Artifact totals do not support report.");
for (const file of ["index.md", ...selection.projects.map((project) => `${project.slug}.md`)]) {
  for (const [, target] of fs.readFileSync(path.join(root, file), "utf8").matchAll(/\]\(([^)]+)\)/g)) {
    if (!/^[a-z]+:/i.test(target) && !fs.existsSync(path.resolve(root, target))) throw new Error(`Broken evidence link: ${file} -> ${target}`);
  }
}
console.log("Evidence assertions and local report links passed.");

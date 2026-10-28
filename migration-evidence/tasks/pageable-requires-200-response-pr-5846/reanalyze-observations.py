import argparse
import collections
import hashlib
import json
from pathlib import Path


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def reanalyze(run):
    metadata = read_json(run / "dataset" / "_meta.json")
    index = read_json(run / "dataset" / "validator-results.json")
    official = read_json(run / "coverage.json")
    rule = "PageableRequires200Response"
    shard = index["rules"].get(rule)
    observations = (
        read_json(run / "dataset" / shard["resultsFile"])["results"] if shard else []
    )
    grouped = collections.defaultdict(list)
    for observation in observations:
        grouped[observation["project"]].append(observation)
    receipts = {}
    for path in run.glob("native-*.json"):
        if not path.stem.removeprefix("native-").isdigit():
            continue
        receipt = read_json(path)
        assert receipt["project"] not in receipts, "Duplicate native project receipt"
        receipts[receipt["project"]] = receipt
    selected = {project["sourcePath"] for project in metadata["projects"]}
    assert set(receipts) == selected, "Receipt population differs from selected projects"
    assert set(grouped) <= selected, "Validator observation outside selected population"
    rows = []
    unassessed = []
    for project in metadata["projects"]:
        name = project["sourcePath"]
        native = receipts[name]
        if (
            project["compileStatus"] != "success"
            or project["validationStatus"] != "success"
            or native["status"] != "success"
        ):
            unassessed.append(
                {
                    "project": name,
                    "compileStatus": project["compileStatus"],
                    "validationStatus": project["validationStatus"],
                    "nativeStatus": native["status"],
                    "compileError": project.get("compileError"),
                    "validationError": project.get("validationError"),
                    "nativeError": native.get("error"),
                }
            )
            continue
        diagnostics = native["diagnostics"]
        identities = set()
        locationless = 0
        for number, item in enumerate(diagnostics):
            location = (item.get("sourceFile"), item.get("line"), item.get("column"))
            if None in location:
                locationless += 1
                identities.add(("locationless", number))
            else:
                identities.add((item["rule"], *location))
        swagger = grouped[name]
        independent = {
            json.dumps([item["rule"], item["path"]], separators=(",", ":"))
            for item in swagger
        }
        rows.append(
            {
                "project": name,
                "apiVersion": project.get("apiVersion"),
                "validatorRawCount": len(swagger),
                "validatorFileIndependentCount": len(independent),
                "nativeRawCount": len(native["rawDiagnostics"]),
                "nativeDefaultCount": len(native.get("defaultTargetDiagnostics", [])),
                "nativeAlignedCount": len(diagnostics),
                "nativeSourceCount": len(identities),
                "nativeLocationlessCount": locationless,
                "difference": len(independent) - len(identities),
                "rawDifference": len(swagger) - len(diagnostics),
            }
        )
    validator_projects = {row["project"] for row in rows if row["validatorRawCount"]}
    native_projects = {row["project"] for row in rows if row["nativeAlignedCount"]}
    assessed = {row["project"] for row in rows}
    metrics = {
        "selectedProjectCount": len(selected),
        "assessableProjectCount": len(rows),
        "selectedValidatorRawCount": len(observations),
        "unassessedValidatorRawCount": sum(
            len(items) for name, items in grouped.items() if name not in assessed
        ),
        "unassessedNativeRawCount": sum(
            len(receipt["rawDiagnostics"])
            for name, receipt in receipts.items()
            if name not in assessed
        ),
        "validatorProjects": sorted(validator_projects),
        "nativeProjects": sorted(native_projects),
        "overlapProjects": sorted(validator_projects & native_projects),
        "validatorOnlyProjects": sorted(validator_projects - native_projects),
        "nativeOnlyProjects": sorted(native_projects - validator_projects),
        "projectsWithEqualRawCounts": sum(row["rawDifference"] == 0 for row in rows),
        "projectsWithEqualCounts": sum(row["difference"] == 0 for row in rows),
    }
    for field in (
        "validatorRawCount",
        "validatorFileIndependentCount",
        "nativeRawCount",
        "nativeDefaultCount",
        "nativeAlignedCount",
        "nativeSourceCount",
        "nativeLocationlessCount",
    ):
        metrics[field] = sum(row[field] for row in rows)
    for field, difference, direction in (
        ("rawValidatorExcess", "rawDifference", 1),
        ("rawNativeExcess", "rawDifference", -1),
        ("validatorExcess", "difference", 1),
        ("nativeExcess", "difference", -1),
    ):
        metrics[field] = sum(max(0, direction * row[difference]) for row in rows)
    for field, value in metrics.items():
        assert official[field] == value, f"Official aggregate mismatch: {field}"
    assert {row["project"]: row for row in rows} == {
        row["project"]: row for row in official["projects"]
    }, "Official per-project metrics differ from independent observations"
    assert {item["project"] for item in unassessed} == {
        item["project"] for item in official["unassessedProjects"]
    }, "Unassessed population differs"
    return {
        "rule": rule,
        "specsCommit": metadata["specsCommit"],
        "scope": read_json(run / "manifest.json")["config"]["scope"],
        "metricsMatchOfficialReport": True,
        "metrics": metrics,
        "unassessedProjects": unassessed,
        "gapProjects": [
            row for row in rows if row["difference"] != 0 or row["rawDifference"] != 0
        ],
        "projects": sorted(rows, key=lambda row: row["project"]),
        "coverageJsonSha256": hashlib.sha256((run / "coverage.json").read_bytes()).hexdigest(),
        "claim": "Observation reanalysis only; not a native/validator rerun, sealed-baseline integrity validation, or semantic equivalence decision.",
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("run", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    result = reanalyze(args.run)
    with args.output.open("x", encoding="utf-8") as destination:
        json.dump(result, destination, indent=2)
        destination.write("\n")
    print(
        json.dumps(
            {
                "output": str(args.output),
                "metricsMatchOfficialReport": result["metricsMatchOfficialReport"],
                "selected": result["metrics"]["selectedProjectCount"],
                "assessed": result["metrics"]["assessableProjectCount"],
                "unassessed": len(result["unassessedProjects"]),
                "gapProjects": len(result["gapProjects"]),
            }
        )
    )


if __name__ == "__main__":
    main()

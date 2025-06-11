import { match } from "node:assert";
import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./targets/cli.ts";
import { test } from "./utils.ts";

test("CLI version", async () => {
	const proc = spawnSync(BIN_PATH, ["--version"], { encoding: "utf8" });
	match(proc.stdout, /^v\d+\.\d+.\d+\n$/);
});

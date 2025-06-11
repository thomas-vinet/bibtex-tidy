import { readdirSync, readFileSync } from "node:fs";
import yaml from "yaml";
import type { Options } from "../../src/optionUtils.ts";
import { join } from "node:path";

type Spec = {
	title: string;
	input: string;
	expected?: string;
	options: Options;
	warnings?: { code: string; rule: string }[];
};

function readYaml(file: string) {
	try {
		return yaml.parseAllDocuments(readFileSync(file, "utf8"));
	} catch (error) {
		throw new Error(`Failed to read ${file}`, { cause: error });
	}
}
export async function iterateSpecs(path: string, cb: (spec: Spec) => void) {
	const specs = readdirSync(path);
	for (const file of specs) {
		const documents = readYaml(join(path, file));

		for (const doc of documents) {
			const spec = doc.contents?.toJSON();
			if (spec) {
				cb(spec);
			}
		}
	}
}

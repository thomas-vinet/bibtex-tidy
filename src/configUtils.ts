import { argsToOptions } from "./cli/argsToOptions.ts";
import type { CLIOptions } from "./optionUtils.ts";

export function optionsToConfig() {}

export function configToOptions(config: string): {
	unknownArgs: string[];
	options: CLIOptions;
} {
	const cliArgs = config
		.trim()
		.split("\n")
		.map((entry, index) => {
			if (entry.split(":").length != 2) {
				console.error(
					"Could not parse config file : line",
					index,
					"should contain exactly one : .",
				);
				process.exit(1);
			}
			return "--" + entry.replace(":", "=");
		});
	return argsToOptions(cliArgs, true);
}

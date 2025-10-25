import { parseOptionFromKeyValues, type CLIOptions } from "./optionUtils.ts";

export function optionsToConfig() {

}

export function configToOptions(config: string): CLIOptions {
  const entries = config.trim().split("\n");
  const options: CLIOptions = {};
  for (const entry of entries) {
    const index = entry.indexOf(":");
    if (index === -1) {
      continue;
    }
    const key = "--" + entry.substring(0, index).trim();
    const values = entry.substring(index + 1).trim().split(",").map((v) => v.trim());
    const configParsed = parseOptionFromKeyValues(key, values);
    if (configParsed != undefined) {
      const [option, value] = configParsed;
      // @ts-ignore
      options[option] = value;
    }
  }
  return options;
}

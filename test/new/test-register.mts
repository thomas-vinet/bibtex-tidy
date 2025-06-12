import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./test/new/test-loader.mts", pathToFileURL("./"));

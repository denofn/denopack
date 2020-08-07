import { Plugin } from "../../deps.ts";
import { resolver } from "../../util/resolver.ts";

export function pluginImportResolver(): Plugin {
  return {
    name: "denopack-plugin-importResolver",
    resolveId: resolver,
  };
}

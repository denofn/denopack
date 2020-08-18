import { Plugin } from "../../deps.ts";

export function pluginRootResolver(): Plugin {
  return {
    name: "denopack-plugin-rootResolver",
    resolveId: (importee: string, importer: string | undefined): string | undefined => {
      if (!importer) return importee;
    },
  };
}

export default pluginRootResolver;

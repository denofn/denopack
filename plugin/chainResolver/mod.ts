import { Plugin, ResolveIdResult } from "../../deps.ts";

export function pluginChainResolver(...plugs: Plugin[]): Plugin {
  return {
    name: "denopack-plugin-chainResolver",
    async resolveId(importee, importer) {
      let resolvedImportee: ResolveIdResult = undefined;

      for (const plug of plugs) {
        resolvedImportee = await plug?.resolveId?.call(
          this,
          typeof resolvedImportee === "string" ? resolvedImportee : importee,
          importer
        );
        // bail on partial resolved id
        if (typeof resolvedImportee === "object" && typeof resolvedImportee?.id !== "undefined")
          return resolvedImportee;
      }

      return resolvedImportee;
    },
  };
}

export default pluginChainResolver;

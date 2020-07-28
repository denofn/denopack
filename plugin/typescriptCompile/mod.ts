import { Plugin } from "../../deps.ts";
import { resolver } from "../../util/resolver.ts";
import { rewriteFileUrl } from "../../util/rewriteFileUrl.ts";
import { usesProtocol } from "../../util/usesProtocol.ts";

let modules: Record<string, string>;
let files: string[];

export function pluginTypescriptCompile(opts?: Deno.CompilerOptions): Plugin {
  return {
    name: "denopack-plugin-typescriptCompile",
    resolveId: async function (importee, importer) {
      if (!importer && !modules) {
        const [diagnostics, emitMap] = await Deno.compile(importee, undefined, opts);

        if (diagnostics) throw new Error(Deno.formatDiagnostics(diagnostics));

        modules = emitMap;
        files = Object.keys(modules);

        if (!usesProtocol(importee)) return rewriteFileUrl(`file://${importee}`);
      }

      const imp = rewriteFileUrl(importee);
      return resolver(imp, importer);
    },
    async load(id) {
      if (!files.includes(id)) throw new Error(`Cannot find file ${id} in emitMap`);

      return modules[id];
    },
  };
}

import { path, Plugin } from "../../deps.ts";
import { isHttpUrl } from "../../util/isHttpUrl.ts";
import { resolver } from "../../util/resolver.ts";
import { stripFileProtocol } from "../../util/stripFileProtocol.ts";

let modules: Record<string, string>;
let files: string[];

let entryPoint: string;

export function pluginTypescriptCompile(opts?: Deno.CompilerOptions): Plugin {
  return {
    name: "denopack-plugin-typescriptCompile",
    resolveId: async function (importee, importer) {
      if (!importer && !entryPoint && !modules) {
        const [diagnostics, emitMap] = await Deno.compile(importee, undefined, opts);

        if (diagnostics) throw new Error(Deno.formatDiagnostics(diagnostics));

        entryPoint = importee;
        modules = stripFileProtocol(emitMap);
        files = Object.keys(modules);

        return importee;
      }

      return resolver(importee, importer);
    },
    async load(id) {
      const resolvedFile = isHttpUrl(id) ? id : path.resolve(id);
      const originalFile = path.parse(resolvedFile);

      if (originalFile.ext === ".js" || originalFile.ext === ".jsx") {
        if (!files.includes(resolvedFile)) throw new Error(`Cannot find file ${id} in emitMap`);
        // be lazy
        return { code: modules[resolvedFile] };
      } else if (originalFile.ext === ".ts" || originalFile.ext === ".tsx") {
        const jsUrl = `${originalFile.dir}/${originalFile.name}.${
          originalFile.ext === ".tsx" ? "jsx" : "js"
        }`;

        if (!files.includes(jsUrl)) throw new Error(`Cannot find file ${id} in emitMap`);

        return { code: modules[jsUrl] };
      }
    },
  };
}

import { path, Plugin } from "../../deps.ts";
import { isHttpUrl } from "../../util/isHttpUrl.ts";
import { resolver } from "../../util/resolver.ts";
import { stripFileProtocol } from "../../util/stripFileProtocol.ts";

type Options = {
  useAsLoader?: boolean;
  compilerOptions?: Deno.CompilerOptions;
};

let modules: Record<string, string>;
let files: string[];

function resolveFromModules(id: string) {
  const resolvedFile = isHttpUrl(id) ? id : path.resolve(id);
  const originalFile = path.parse(resolvedFile);
  const jsFile =
    originalFile.ext === ".js" || originalFile.ext === ".jsx"
      ? resolvedFile
      : `${originalFile.dir}/${originalFile.name}.${originalFile.ext === ".tsx" ? "jsx" : "js"}`;

  if (!files.includes(jsFile)) throw new Error(`Cannot find file ${id} in emitMap`);
  return { code: modules[jsFile], map: modules[`${jsFile}.map`] };
}

async function resolveId(
  compilerOptions: Deno.CompilerOptions,
  importee: string,
  importer: string | undefined
) {
  if (importer || modules) return resolver(importee, importer);

  const [diagnostics, emitMap] = await Deno.compile(importee, undefined, compilerOptions);
  if (diagnostics) throw new Error(Deno.formatDiagnostics(diagnostics));

  modules = stripFileProtocol(emitMap);
  files = Object.keys(modules);

  return importee;
}

export function pluginTypescriptCompile({ useAsLoader, compilerOptions }: Options = {}): Plugin {
  return {
    name: "denopack-plugin-typescriptCompile",
    async resolveId(importee, importer) {
      return resolveId(compilerOptions ?? {}, importee, importer);
    },

    async load(id) {
      return !!useAsLoader ? resolveFromModules(id) : null;
    },

    async transform(_, id) {
      return !!useAsLoader ? null : resolveFromModules(id);
    },
  };
}

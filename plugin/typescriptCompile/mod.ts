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
    originalFile.ext === ".js"
      ? resolvedFile
      : `${originalFile.dir}/${originalFile.name}.js`;

  if (!files.includes(jsFile)) {
    // Allows files like React (.js) to still be bundled since they don't get re-emitted
    console.warn(`Cannot find file ${id} in emitMap`);
    return;
  }

  return { code: modules[jsFile], map: modules[`${jsFile}.map`] };
}

async function resolveId(
  compilerOptions: Deno.CompilerOptions,
  _importee: string,
  importer: string | undefined
) {
  if (importer || modules) return resolver(_importee, importer);

  let importee = _importee;

  if (isHttpUrl(importee)) {
    const { url, redirected } = await fetch(importee);
    redirected && (importee = url);
  }

  const { diagnostics, files: emitFiles } = await Deno.emit(importee, {
    check: true,
    compilerOptions,
  });

  if (diagnostics) throw new Error(Deno.formatDiagnostics(diagnostics));

  modules = stripFileProtocol(emitFiles);
  files = Object.keys(modules);

  return importee;
}

export function pluginTypescriptCompile({
  useAsLoader,
  compilerOptions,
}: Options = {}): Plugin {
  return {
    name: "denopack-plugin-typescriptCompile",
    async resolveId(importee, importer) {
      return resolveId(compilerOptions ?? {}, importee, importer);
    },

    async load(id) {
      return useAsLoader ? resolveFromModules(id) : null;
    },

    async transform(_, id) {
      return useAsLoader ? null : resolveFromModules(id);
    },
  };
}

export default pluginTypescriptCompile;

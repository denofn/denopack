import { path, Plugin } from "../../deps.ts";
import { isHttpUrl } from "../../util/isHttpUrl.ts";
import { resolver } from "../../util/resolver.ts";
import { usesProtocol } from "../../util/usesProtocol.ts";

type Options = {
  useAsLoader?: boolean;
  compilerOptions?: Deno.CompilerOptions;
};

let modules: Record<string, string>;
let files: string[];

function resolveFromModules(id: string) {
  const resolvedFile = usesProtocol(id) ? id : path.resolve(id);
  const jsFile = `${resolvedFile}.js`;

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
  importer: string | undefined,
) {
  if (importer || modules) return resolver(_importee, importer);

  let importee = resolver(_importee);

  if (isHttpUrl(importee)) {
    const { url, redirected } = await fetch(importee);
    redirected && (importee = url);
  }

  const result = await Deno.emit(importee, { compilerOptions });
  const { diagnostics } = result;

  if (diagnostics.length) {
    throw new Error(Deno.formatDiagnostics(diagnostics));
  }

  modules = result.files;
  files = Object.keys(modules);

  return importee;
}

export function pluginTypescriptCompile(
  { useAsLoader, compilerOptions }: Options = {},
): Plugin {
  return {
    name: "denopack-plugin-typescriptCompile",
    resolveId(importee, importer) {
      return resolveId(compilerOptions ?? {}, importee, importer);
    },

    load(id) {
      return useAsLoader ? resolveFromModules(id) : null;
    },

    transform(_, id) {
      return useAsLoader ? null : resolveFromModules(id);
    },
  };
}

export default pluginTypescriptCompile;

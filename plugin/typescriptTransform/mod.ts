import { Plugin } from "../../deps.ts";

export function pluginTypescriptTransform(opts?: Deno.CompilerOptions): Plugin {
  return {
    name: "denopack-plugin-typescriptTransform",
    transform: async function (code, id) {
      const result = await Deno.transpileOnly({ [id]: code }, opts);
      return result[id].source;
    },
  };
}

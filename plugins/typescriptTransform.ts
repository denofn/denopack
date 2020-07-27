import { Plugin } from "../deps.ts";

export function pluginTypescriptTransform(): Plugin {
  return {
    name: "denopack-plugin-typescriptTransform",
    transform: async function (code, id) {
      const result = await Deno.transpileOnly({ [id]: code });
      return result[id].source;
    },
  };
}

import { Plugin } from "../../deps.ts";
import { minify } from "./deps.ts";

import type { MinifyOptions } from "./deps.ts";

export function pluginTerserTransform(
  { sourceMap, ...opts }: MinifyOptions = {},
): Plugin {
  if (sourceMap) {
    console.warn(
      `Sourcemap config option is ignored. Generating sourcemaps is inferred from Rollup output options`,
    );
  }

  return {
    name: "denopack-plugin-terserTransform",
    async renderChunk(code) {
      const result = await minify(code, { ...opts, sourceMap: true });

      if (typeof result.code === "undefined") {
        throw new Error("Terser is not supposed to return nothing!");
      }
      if (typeof result.map === "undefined") {
        throw new Error("Terser failed to generate a sourcemap!");
      }

      return { code: result.code, map: result.map as string };
    },
  };
}

export default pluginTerserTransform;

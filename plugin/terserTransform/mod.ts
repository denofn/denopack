import { Plugin } from "../../deps.ts";
import { MinifyOptions } from "../../vendor/terser@4.8.0/terser.d.ts";
import { minify } from "../../vendor/terser@4.8.0/terser.ts";

export function pluginTerserTransform({ sourceMap, ...opts }: MinifyOptions = {}): Plugin {
  return {
    name: "denopack-plugin-terserTransform",
    transform(code) {
      const result = minify(code, { ...opts, sourceMap: !!sourceMap });

      if (typeof result.code === "undefined")
        throw new Error("Terser is not supposed to return nothing!");
      if (!!sourceMap && typeof result.map === "undefined")
        throw new Error("Terser failed to generate a sourcemap!");

      return { code: result.code, map: result.map as string };
    },
  };
}

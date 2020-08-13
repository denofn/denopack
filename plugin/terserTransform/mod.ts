import { Plugin } from "../../deps.ts";
import { MinifyOptions } from "../../vendor/terser@4.8.0/terser.d.ts";
import { minify } from "../../vendor/terser@4.8.0/terser.ts";

export function pluginTerserTransform({ sourceMap, ...opts }: MinifyOptions = {}): Plugin {
  if (!!sourceMap) {
    console.warn(
      `Sourcemap config option is ignored. Generating sourcemaps is inferred from Rollup output options`
    );
  }

  return {
    name: "denopack-plugin-terserTransform",
    transform(code) {
      const result = minify(code, { ...opts, sourceMap: true });

      if (typeof result.code === "undefined")
        throw new Error("Terser is not supposed to return nothing!");
      if (typeof result.map === "undefined")
        throw new Error("Terser failed to generate a sourcemap!");

      return { code: result.code, map: result.map as string };
    },
  };
}

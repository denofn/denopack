import { Plugin } from "../../deps.ts";
import { MinifyOptions } from "../../vendor/terser@4.8.0/terser.d.ts";
import { minify } from "../../vendor/terser@4.8.0/terser.ts";

export function pluginTerserTransform({ sourceMap, ...opts }: MinifyOptions = {}): Plugin {
  if (!!sourceMap) {
    console.log("`sourceMap` is removed. It is inferred from denopack options,");
  }

  return {
    name: "denopack-plugin-terserTransform",
    renderChunk(code, _, { sourcemap, file }) {
      const result = minify(code, { ...opts, sourceMap: !!sourcemap });

      if (typeof result.code === "undefined")
        throw new Error("Terser is not supposed to return nothing!");
      if (!!sourcemap && typeof result.map === "undefined")
        throw new Error("Terser failed to generate a sourcemap!");

      return !!sourcemap && result.map
        ? { code: `${result.code}\n//# sourceMappingURL=${file}.map`, map: result.map as string }
        : result.code;
    },
  };
}

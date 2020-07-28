import { Plugin } from "../../deps.ts";
import { MinifyOptions } from "../../vendor/terser@4.8.0/terser.d.ts";
import { minify } from "../../vendor/terser@4.8.0/terser.ts";

export function pluginTerserTransform(opts: MinifyOptions = {}): Plugin {
  return {
    name: "denopack-plugin-terserTransform",
    renderChunk(code) {
      const result = minify(code, opts)!.code;

      if (typeof result === "undefined")
        throw new Error("Terser is not supposed to return nothing");

      return result;
    },
  };
}

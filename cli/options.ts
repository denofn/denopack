import { OutputOptions, RollupOptions } from "../deps.ts";
import { useCompile } from "../plugin/hooks.ts";
import { pluginTerserTransform } from "../plugin/terserTransform/mod.ts";

const config: RollupOptions = {
  plugins: useCompile(),
  output: {
    file: "bundle.js",
    format: "esm",
    sourcemap: true,
    plugins: [
      pluginTerserTransform({
        module: true,
        compress: true,
        mangle: true,
      }),
    ],
  },
};

export type Options = {
  input: string;
  defaultConfig?: boolean;
  output?: string;
  dir?: string;
  print?: boolean;
  config?: string;
  help?: boolean;
  watch?: string;
};

export function printDefaultConfig(): void {
  console.log(`import { pluginTerserTransform, RollupOptions, useCompile } from "https://deno.land/x/denopack@0.3.2/mod.ts";

const config: RollupOptions = {
  plugins: useCompile(),
  output: {
    file: "bundle.js",
    format: "esm",
    sourcemap: true,
    plugins: [
      pluginTerserTransform({
        module: true,
        compress: true,
        mangle: true,
      }),
    ],
  },
};

export default config;
`);
}

export function splitOptions(opts: RollupOptions): [Omit<RollupOptions, "output">, OutputOptions] {
  const { output, ...restOpts } = opts;
  return [restOpts, output as OutputOptions];
}

export default config;

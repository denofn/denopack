import { OutputOptions, RollupOptions } from "../deps.ts";
import { useCompile } from "../plugin/hooks.ts";
import { pluginTerserTransform } from "../plugin/terserTransform/mod.ts";

const config: RollupOptions = {
  plugins: useCompile(),
  output: {
    file: "bundle.js",
    format: "esm",
    plugins: [pluginTerserTransform({ module: true, compress: true, mangle: true })],
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
};

export function printDefaultConfig(): void {
  console.log(`import { RollupOptions } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/deps.ts";
import { useCompile } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/hooks.ts";
import { pluginTerserTransform } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/terserTransform/mod.ts";

export default {
  plugins: useCompile(),
  output: {
    file: "bundle.js",
    format: "esm",
    plugins: [pluginTerserTransform({ module: true, compress: true, mangle: true })],
  },
};
`);
}

export function splitOptions(opts: RollupOptions): [Omit<RollupOptions, "output">, OutputOptions] {
  const { output, ...restOpts } = opts;
  return [restOpts, output as OutputOptions];
}

export default config;

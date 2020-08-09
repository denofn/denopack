import { OutputOptions, RollupCache, RollupOptions } from "../deps.ts";
import { useCompile } from "../plugin/hooks.ts";
import { pluginTerserTransform } from "../plugin/terserTransform/mod.ts";
import { getCache } from "./getCache.ts";

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
  cache?: string;
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

export async function mergeOptions(
  opts: RollupOptions,
  { input, output, dir, cache }: Options,
  watchCache?: RollupCache
): Promise<[Omit<RollupOptions, "output">, OutputOptions, string]> {
  const { output: _outputOpts, ...rollupOpts } = opts;
  const outputOpts = (_outputOpts as OutputOptions) ?? {};

  if (input) rollupOpts.input = input;
  if (!rollupOpts.input) {
    console.error("Error: no input file has been defined");
    Deno.exit(1);
  }

  if (output) outputOpts.file = output;
  if (watchCache && !rollupOpts.cache && !cache) rollupOpts.cache = watchCache;
  if (cache) rollupOpts.cache = await getCache(cache);

  const outputDir = dir ? dir : outputOpts?.dir ? outputOpts.dir : Deno.cwd();
  outputOpts.dir = undefined;

  return [rollupOpts, outputOpts as OutputOptions, outputDir];
}

export default config;

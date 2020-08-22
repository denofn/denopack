import { OutputOptions, RollupCache, RollupOptions } from "../deps.ts";
import { useCache } from "../plugin/hooks.ts";
import { pluginTerserTransform } from "../plugin/terserTransform/mod.ts";
import { getCache } from "./getCache.ts";

const config: RollupOptions = {
  plugins: [
    ...useCache(),
    pluginTerserTransform({
      module: true,
      compress: true,
      mangle: true,
    }),
  ],
  output: {
    file: "bundle.js",
    format: "esm",
    sourcemap: true,
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
  console.log(`import { pluginTerserTransform, RollupOptions, useCache } from "https://deno.land/x/denopack@0.7.1/mod.ts";

const config: RollupOptions = {
  plugins: [
    ...useCache(),
    pluginTerserTransform({
      module: true,
      compress: true,
      mangle: true,
    }),
  ],
  output: {
    file: "bundle.js",
    format: "esm",
    sourcemap: true,
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

  outputOpts.dir = dir ? dir : outputOpts?.dir ? outputOpts.dir : undefined;
  if (outputOpts.dir) outputOpts.file = undefined; // It's either file or dir, dir supports dynamic imports thus takes precedence
  const outputDir = outputOpts?.dir ? outputOpts.dir : Deno.cwd();

  return [rollupOpts, outputOpts as OutputOptions, outputDir];
}

export default config;

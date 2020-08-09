import { path, rollup, RollupBuild, RollupCache } from "../deps.ts";
import { emitFiles } from "./emitFiles.ts";
import { mergeOptions, Options } from "./options.ts";
import { persistCache } from "./persistCache.ts";

let outputDir: string;

export async function runBundler(
  { input, output, dir, config, print, cache }: Options,
  watchCache?: RollupCache
): Promise<RollupCache | undefined> {
  const { default: conf } = await import(
    config && typeof config === "string"
      ? `file://${path.join(Deno.cwd(), path.normalize(config))}`
      : "./options.ts"
  );

  const [rollupOpts, outputOpts, _outputDir] = await mergeOptions(
    conf,
    { input, output, dir, cache },
    watchCache
  );

  const bundle = (await rollup(rollupOpts)) as RollupBuild;
  const generated = await bundle.generate(outputOpts);

  if (!outputDir) outputDir = _outputDir;
  if (cache) await persistCache(cache, bundle.cache!);

  if (!print) return emitFiles(generated, outputDir, bundle.cache);

  console.log(generated.output[0].code);

  return bundle.cache;
}

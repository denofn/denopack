import { path, rollup, RollupBuild, RollupCache } from "../deps.ts";
import { findPlugin } from "../util/findPlugin.ts";
import { emitFiles } from "./emitFiles.ts";
import { mergeOptions, Options } from "./options.ts";
import { persistCache } from "./persistCache.ts";
import { persistSourceMaps } from "./persistSourceMaps.ts";

export async function runBundler(
  { input, output, dir, config, print, cache }: Options,
  watchCache?: RollupCache,
): Promise<RollupCache | undefined> {
  const now = Date.now();

  const { default: conf } = await import(
    config && typeof config === "string"
      ? `file://${path.join(Deno.cwd(), path.normalize(config))}`
      : "./options.ts"
  );

  if (
    !!watchCache &&
    findPlugin(conf.plugins ?? [], "denopack-plugin-typescriptCompile")
  ) {
    console.warn(
      `pluginTypescriptCompile is currently not supported in watch mode`,
    );
    Deno.exit(1);
  }

  const [rollupOpts, outputOpts, outputDir] = await mergeOptions(
    conf,
    { input, output, dir, cache },
    watchCache,
  );

  const bundle = (await rollup(rollupOpts)) as RollupBuild;
  const generated = await persistSourceMaps(bundle.generate, outputOpts);

  if (cache) await persistCache(cache, bundle.cache!);

  if (!print) {
    await emitFiles(generated, outputDir);
    console.log(`denopack completed in ${Date.now() - now}ms`);
  } else console.log(generated.output[0].code);

  return bundle.cache;
}

import { debounce, RollupCache } from "../deps.ts";
import { isHttpUrl } from "../util/isHttpUrl.ts";
import type { Options } from "./options.ts";
import { runBundler } from "./runBundler.ts";

export async function watch({ watch, ...opts }: Options) {
  if (typeof watch !== "string" || isHttpUrl(watch)) {
    throw new Error(`You need to provide a local file or directory to watch`);
  }

  let cache: RollupCache = { modules: [] };

  const run = debounce(async function () {
    cache = (await runBundler(opts, cache)) as RollupCache;
  }, 100);

  await run();

  for await (const { kind } of Deno.watchFs(watch)) {
    if (kind === "any" || kind === "access") continue;
    await run();
  }
}

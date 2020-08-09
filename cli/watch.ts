import type { RollupCache } from "../deps.ts";
import { isHttpUrl } from "../util/isHttpUrl.ts";
import { Options } from "./options.ts";
import { runBundler } from "./runBundler.ts";

export async function watch({ watch, ...opts }: Options) {
  if (typeof watch !== "string" || isHttpUrl(watch))
    throw new Error(`You need to provide a local file or directory to watch`);

  let cache: RollupCache = { modules: [] };

  cache = (await runBundler(opts, cache)) as RollupCache;

  for await (const { kind } of Deno.watchFs(watch)) {
    if (kind === "access") continue;
    cache = (await runBundler(opts, cache)) as RollupCache;
  }
}

import type { RollupCache } from "../deps.ts";

export async function persistCache(
  cachePath: string,
  cache: RollupCache,
): Promise<void> {
  return Deno.writeTextFile(cachePath, JSON.stringify(cache, undefined, 2));
}

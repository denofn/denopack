import { fs, path, RollupCache } from "../deps.ts";

export async function getCache(_cachePath: string): Promise<RollupCache> {
  const cachePath = path.resolve(_cachePath);
  if (!cachePath.endsWith(".json")) throw new Error(`${cachePath} does not point to a JSON file`);
  const defaultCache: RollupCache = { modules: [] };

  try {
    await Deno.lstat(cachePath);
    return fs.readJson(cachePath) as Promise<RollupCache>;
  } catch {
    return defaultCache;
  }
}

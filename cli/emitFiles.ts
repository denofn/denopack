import { OutputAsset, path, RollupCache, RollupOutput } from "../deps.ts";
import { isDir } from "../util/isDir.ts";

// deno-lint-ignore no-explicit-any
function isOutputAsset(x: any): x is OutputAsset {
  return Boolean(x?.isAsset);
}

export async function emitFiles(
  generated: RollupOutput,
  outputDir: string,
  cache?: RollupCache
): Promise<RollupCache | undefined> {
  const outputDirPath = path.resolve(Deno.cwd(), path.normalize(outputDir));

  if (!(await isDir(outputDirPath))) await Deno.mkdir(outputDirPath);

  for (const toEmit of generated.output) {
    const location = path.resolve(outputDirPath, toEmit.fileName);
    const data: string | Uint8Array = isOutputAsset(toEmit) ? toEmit.source : toEmit.code;

    if (typeof data === "string") await Deno.writeTextFile(location, data);
    else await Deno.writeFile(location, data);

    if (!isOutputAsset(toEmit) && toEmit.map) {
      await Deno.writeTextFile(
        path.resolve(outputDirPath, `${toEmit.map.file}.map`),
        JSON.stringify(toEmit.map)
      );
    }
  }

  if (cache) {
    return cache;
  }
}

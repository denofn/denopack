import type { OutputOptions, RollupOutput } from "../deps.ts";
import { isOutputAsset } from "../util/isOutputAsset.ts";

export async function persistSourceMaps(
  generateFn: (outputOptions: OutputOptions) => Promise<RollupOutput>,
  opts: OutputOptions,
): Promise<RollupOutput> {
  const generated = await generateFn(opts);

  if (!opts.sourcemap) return generated;

  for (const i in generated.output) {
    const toEmit = generated.output[i];
    if (
      !isOutputAsset(toEmit) &&
      toEmit.map &&
      !toEmit.code.includes(`//# sourceMappingUrl=${toEmit.map.file}.map`)
    ) {
      toEmit.code =
        `${toEmit.code}//# sourceMappingUrl=${toEmit.map.file}.map\n`;
    }
  }

  return generated;
}

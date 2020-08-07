import { path, rollup, RollupBuild } from "../deps.ts";
import { emitFiles } from "./emitFiles.ts";
import { Options, splitOptions } from "./options.ts";

export async function runBundler({ input, output, dir, config, print }: Options): Promise<void> {
  const { default: conf } = await import(
    config && typeof config === "string"
      ? path.resolve(Deno.cwd(), path.normalize(config))
      : "./options.ts"
  );

  const [rollupOpts, outputOpts] = splitOptions(conf);
  const outputDir = dir ? dir : outputOpts?.dir ? outputOpts.dir : Deno.cwd();
  outputOpts.dir = undefined;

  if (input) {
    rollupOpts.input = input;
  }

  if (!rollupOpts.input) {
    console.error("Error: no input file has been defined");
    Deno.exit(1);
  }

  if (output) {
    outputOpts.file = output;
  }

  const bundle = (await rollup(rollupOpts)) as RollupBuild;
  const generated = await bundle.generate(outputOpts);

  if (print) console.log(generated.output[0].code);
  else {
    return emitFiles(generated, outputDir);
  }
}

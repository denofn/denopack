import { Options, printDefaultConfig } from "./cli/options.ts";
import { runBundler } from "./cli/runBundler.ts";
import { watch } from "./cli/watch.ts";
import { cac } from "./deps.ts";

const denopack = cac("denopack");
denopack.version("0.3.2");

denopack
  .option("-i, --input <pathToFile>", "The input file (most likely mod.ts)", {})
  .usage("-i mod.ts");

denopack.option("-o, --output [pathToFile]", "The output file name", {});

denopack.option("-d, --dir [pathToDir]", "The output directory", {});

denopack.option(
  "-c, --config [pathToConfig]",
  "The config file. Use --defaultConfig for default values",
  {}
);

denopack
  .option("--watch <dirOrFile>", "Watch a file or directory and rebuild on changes", {})
  .usage("--watch mod.ts")
  .usage("--watch src");

denopack.option("--cache <cacheLocation>", "Persist build cache", {}).usage("--cache cache.json");

denopack.option("-p, --print", "Prints the generated bundle to stdout", {});

denopack.option("--defaultConfig", "Prints the default config to stdout", {});

denopack.help(() => {
  console.log("🦕📦🦕📦🦕📦🦕📦\n");
});

denopack.example("denopack -i mod.ts");
denopack.example("denopack -i mod.ts -o bundle.js");
denopack.example("denopack -i mod.ts --dir dist");
denopack.example("denopack -c denopack.config.ts");
denopack.example("denopack -i mod.ts -o out.js --dir dist -c denopack.config.ts");

const opts = denopack.parse().options as Options;

if (opts.help) {
  // noop
} else if (opts.defaultConfig) {
  printDefaultConfig();
} else if (opts.watch) {
  watch(opts);
} else {
  runBundler(opts);
}

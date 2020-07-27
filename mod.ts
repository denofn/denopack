import { path, rollup, RollupBuild, RollupOptions } from "./deps.ts";
import { useCompile } from "./plugins/hooks.ts";
import { pluginTerserTransform } from "./plugins/terserTransform.ts";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

function parseInputFile() {
  const _location = Deno.args[0];
  if (!_location || !extensions.includes(path.parse(_location).ext))
    throw new Error(`No valid input file has been given!`);

  const location = path.resolve(Deno.cwd(), path.normalize(_location));

  return path.parse(location);
}

const { dir, base } = parseInputFile();

const options: RollupOptions = {
  input: `${dir}/${base}`,
  plugins: useCompile(),
};

const bundle = (await rollup(options)) as RollupBuild;
const generated = await bundle.generate({
  file: "bundle.js",
  format: "esm",
  plugins: [pluginTerserTransform({ module: true, compress: true, mangle: true })],
});

if (!Deno.args[1]) console.log(generated.output[0].code);
else Deno.writeTextFile(path.resolve(Deno.cwd(), Deno.args[1]), generated.output[0].code);

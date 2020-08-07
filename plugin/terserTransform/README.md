# denopack/plugin/typescriptTransform

Use Terser to minify/compress/mangle/... your bundle.

## Options

- `opts [MinifyOptions]`: this plugin accepts Terser's config object for [minify options](https://terser.org/docs/api-reference#minify-options)

## Usage

```ts
import { pluginImportResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/importResolver/mod.ts";
import { pluginFileLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/fileLoader/mod.ts";
import { pluginTypescriptTransform } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/typescriptTransform/mod.ts";
import { pluginTerserTransform } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/terserTransform/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginFileLoader(),
    pluginTypescriptTransform({ ...myOptions }),
  ],
  output: {
    plugins: [pluginTerserTransform()],
  },
};
```

# denopack/plugin/terserTransform

Use Terser to minify/compress/mangle/... your bundle.

## Options

- `opts [MinifyOptions]`: this plugin accepts Terser's config object for
  [minify options](https://terser.org/docs/api-reference#minify-options)

## Usage

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.10.0/plugin/importResolver/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.10.0/plugin/fileLoader/mod.ts";
import { pluginTypescriptTransform } from "https://deno.land/x/denopack@0.10.0/plugin/typescriptTransform/mod.ts";
import { pluginTerserTransform } from "https://deno.land/x/denopack@0.10.0/plugin/terserTransform/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginFileLoader(),
    pluginTypescriptTransform({ ...myOptions }),
    pluginTerserTransform(),
  ],
};
```

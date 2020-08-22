# denopack/plugin/typescriptTransform

Uses the internal `Deno.transpileOnly` [compiler API](https://deno.land/manual/runtime/compiler_apis) to transpile TS to JS.

## Options

- `opts [Deno.CompilerOptions]`: this plugin accepts compiler options to pass to the Deno compiler API

## Required flags

- `--unstable`

## Usage

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.7.0/plugin/importResolver/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.7.0/plugin/fileLoader/mod.ts";
import { pluginTypescriptTransform } from "https://deno.land/x/denopack@0.7.0/plugin/typescriptTransform/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginFileLoader(),
    pluginTypescriptTransform({ ...myOptions }),
  ],
};
```

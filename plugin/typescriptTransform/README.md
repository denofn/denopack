# denopack/plugin/typescriptTransform

Uses the internal `Deno.transpileOnly` [compiler API](https://deno.land/manual/runtime/compiler_apis) to transpile TS to JS.

## Options

- `opts [Deno.CompilerOptions]`: this plugin accepts compiler options to pass to the Deno compiler API

## Required flags

- `--unstable`

## Usage

```ts
import { pluginImportResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/importResolver/mod.ts";
import { pluginFileLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/fileLoader/mod.ts";
import { pluginTypescriptTransform } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/typescriptTransform/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginFileLoader(),
    pluginTypescriptTransform({ ...myOptions }),
  ],
};
```

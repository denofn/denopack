# denopack/plugin/typescriptCompile

Uses the internal `Deno.compile` [compiler API](https://deno.land/manual/runtime/compiler_apis) to fully compile a TS source file.

It stores all resolved modules in a runtime object to load the compiled code for each module in the Rollup `load` hook.

This plugin runs as a **transformer** by default, not as a loader. This is done explicitly in ease of support to allow source maps resolving to Typescript code where possible. If you want to use it as a **file loader**, please set the `useAsLoader` [option](#options) to `true`.

To see how it behaves in conjunction with a file loader, see the `useCompile` hook in [hooks.ts](../).

If you don't care about source maps, using the Compiler API with appears to be the most performant option (since we're not providing any extra overhead and are letting the compiler to do its work), but does require network access. To see this in action, use the `useCompileAsLoader` hook.

## Options

- `useAsLoader [boolean]`: use as a file "loader" instead of a transformation tool
- `compilerOptions [Deno.CompilerOptions]`: this plugin accepts compiler options to pass to the Deno compiler API

## Required flags

- `--unstable`
- `--allow-read` for local files
- `--allow-net` for fetching urls

## Usage

### In conjunction with a source file loader

```ts
import { pluginTypescriptCompile } from "https://deno.land/x/denopack@0.7.0/plugin/typescriptCompile/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.7.0/plugin/fileLoader/mod.ts";

export default {
  plugins: [
    pluginTypescriptCompile({ compilerOptions: { ...myCompilerOptions } }),
    pluginFileLoader(),
  ],
};
```

### Explicitly loading files

```ts
import { pluginTypescriptCompile } from "https://deno.land/x/denopack@0.7.0/plugin/typescriptCompile/mod.ts";

export default {
  plugins: [
    pluginTypescriptCompile({ useAsLoader: true, compilerOptions: { ...myCompilerOptions } }),
  ],
};
```

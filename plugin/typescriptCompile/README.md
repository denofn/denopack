# denopack/plugin/typescriptCompile

Uses the internal `Deno.compile` [compiler API](https://deno.land/manual/runtime/compiler_apis) to fully compile a TS source file.

It stores all resolved modules in a runtime object to load the compiled code for each module in the Rollup `load` hook.

Since this handles pretty much all pre-bundling steps internall, it's added to [hooks.ts](../) as a separate strategy. This appears to be the most performant option (since we're not providing any extra overhead and let the compiler do its work), but does require network access.

## Options

- `opts [Deno.CompilerOptions]`: this plugin accepts compiler options to pass to the Deno compiler API

## Required flags

- `--unstable`
- `--allow-read` for local files
- `--allow-net` for fetching urls

## Usage

```ts
import { pluginTypescriptCompile } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/typescriptCompile/mod.ts";

export default {
  plugins: [pluginTypescriptCompile({ ...myOptions })],
};
```

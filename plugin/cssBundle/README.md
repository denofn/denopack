# denopack/plugin/cssBundle

Denopack plugin that bundles imported CSS

**NOTE: currently incompatible with `--cache` and `--watch`**

## Options

- `output [string | false]`: default `"bundle.css"`. Filename of the css bundle. Will emit no file if output is `false`

## Required flags

- `--allow-read` and `--allow-env` because @rollup/pluginutils uses `std/node/process.ts`

## Attribution

This plugin is a rough rewrite of [rollup-plugin-css-only](https://github.com/thgh/rollup-plugin-css-only).

## Usage

```ts
import css from "https://deno.land/x/denopack@0.10.0/plugin/cssBundle/mod.ts";

export default {
  plugins: [css({ output: "bundle.css" })],
};
```

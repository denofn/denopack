# denopack/plugin/htmlBundle

Creates HTML files to serve Rollup bundles.

**NOTE: currently incompatible with `--cache` and `--watch`**

## Options

- `attributes [Attributes]`: Specifies additional attributes for `html`, `link`, and `script` elements. For each property, provide an object with key-value pairs that represent an HTML element attribute name and value. By default, the `html` element is rendered with an attribute of `lang="en"`
  - Note: If using the `es` / `esm` output format, `{ type: 'module'}` is automatically added to attributes.script
  - Attributes typing can be found [here](https://github.com/denofn/denopack/util/htmlTemplate.ts)
- `fileName [string]`: default `index.html`. Specifies the name of the HTML to emit
- `meta [object[]]`: default `[{ charset: "utf-8" }]`. Specifies attributes used to create `<meta>` elements. For each array item, provide an object with key-value pairs that represent `<meta>` element attribute names and values
- `publicPath [string]`: default `""`. Specifies a path to prepend to all bundle assets (files) in the HTML output
- `template [TemplateOpts => Promise<string>]`: default is [the built-in default template](https://github.com/denofn/denopack/util/htmlTemplate.ts). TemplateOpts typings can be found at the same link. Specifies a function that provides the rendered source for the HTML output
- `title [string]`: default `"Rollup Bundle"`. Specifies the HTML document title

## Supported Output Formats

By default, this plugin supports the `esm` (`es`), `iife`, and `umd` [output formats](https://rollupjs.org/guide/en/#outputformat), as those are most commonly used as browser bundles. Other formats can be used, but will require using the [`template`](#options) option to specify a custom template function which renders the unique requirements of other formats.

### `amd`

Will likely require use of RequireJS semantics, which allows only for a single entry `<script>` tag. If more entry chunks are emitted, these need to be loaded via a proxy file. RequireJS would also need to be a dependency and added to the build: https://requirejs.org/docs/start.html.

### `system`

Would require a separate `<script>` tag first that adds the `s.js` minimal loader. Loading modules might then resemble: `<script>System.import('./batman.js')</script>`.

## Attribution

This plugin is a Deno rewrite of [@rollup/plugin-html](https://github.com/rollup/plugins/blob/master/packages/html).

## Usage

```ts
import html from "https://deno.land/x/denopack@0.9.0/plugin/htmlBundle/mod.ts";

export default {
  plugins: [html()],
};
```

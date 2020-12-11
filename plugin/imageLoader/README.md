# denopack/plugin/imageLoader

This plugin allows you to import JPG, PNG, GIF, SVG, and WebP files.

## Options

### `dom`

Type: `Boolean`<br>
Default: `false`

If `true`, instructs the plugin to generate an ES Module which exports a DOM `Image` which can be used with a browser's DOM. Otherwise, the plugin generates an ES Module which exports a `default const` containing the Base64 representation of the image.

Using this option set to `true`, the export can be used as such:

```js
import logo from './rollup.png';
document.body.appendChild(logo);
```

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.

## Attribution

This plugin is a Deno rewrite of [@rollup/plugin-image](https://github.com/rollup/plugins/tree/master/packages/image).

## Usage

```ts
import { pluginImageLoader as image } from "https://deno.land/x/denopack@0.10.0/plugin/imageLoader/mod.ts";

export default {
  plugins: [image()],
};
```

# denopack/plugin/importResolver

Resolves the root node and only the root node. Use this plugin if you want to
write your resolving logic yourself.

## Usage

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.10.0/plugin/importResolver/mod.ts";

export default {
  plugins: [pluginImportResolver()],
};
```

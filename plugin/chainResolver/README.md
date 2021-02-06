# denopack/plugin/chainResolver

If files are resolved, Rollup will skip all other resolvers for that file.
Sometimes you still want to do extra resolving.

## Usage

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.10.0/plugin/importResolver/mod.ts";
import { pluginChainResolver } from "https://deno.land/x/denopack@0.10.0/plugin/chainResolver/mod.ts";
import { pluginCacheResolver } from "https://deno.land/x/denopack@0.10.0/plugin/cacheResolver/mod.ts";

export default {
  plugins: [pluginChainResolver(pluginImportResolver(), pluginCacheResolver())],
};
```

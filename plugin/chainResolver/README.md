# denopack/plugin/chainResolver

If files are resolved, Rollup will skip all other resolvers for that file. Sometimes you still want to do extra resolving.

## Usage

```ts
import { pluginImportResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/importResolver/mod.ts";
import { pluginChainResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/chainResolver/mod.ts";
import { pluginCacheResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/cacheResolver/mod.ts";

export default {
  plugins: [pluginChainResolver(pluginImportResolver(), pluginCacheResolver())],
};
```

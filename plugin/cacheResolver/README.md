# denopack/plugin/cacheResolver

> NOTE: this plugin will be removed in a future version. The functionality of resolving to /gen/rest/of/url will change to hashes as soon as Deno v1.2.3. Use [pluginCacheLoader](../cacheLoader) instead.

- [optional] checks if file exists in `.deno/gen` cache, if not return url
- returns local file location

## Options

- `lazy [boolean]`: defaults to false. If active, this will skip checking whether the file actually exists locally and will lazily return the assumed path.

## Required flags

- `--allow-read`
- `--allow-env`

## Usage

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.5.0/plugin/importResolver/mod.ts";
import { pluginChainResolver } from "https://deno.land/x/denopack@0.5.0/plugin/chainResolver/mod.ts";
import { pluginCacheResolver } from "https://deno.land/x/denopack@0.5.0/plugin/cacheResolver/mod.ts";

export default {
  plugins: [pluginChainResolver(pluginImportResolver(), pluginCacheResolver())],
};
```

# denopack/plugin/cacheLoader

- [optional] checks if cached file exists and skips loading if it doesn't
- [optional] checks integrity of cached file against a lockfile
- returns local cached file location

## Options

- `lazy [boolean]`: defaults to false. If active, this will skip checking whether the file actually exists locally and will lazily return the assumed path
- `cacheOnly [boolean]`: throws if an external dependency is not found inside the cache
- `lockFile [string]`: path to a lockfile (for example: `lock.json`). Throws if the integrity of the loaded cache file does not match the integrity in the lockfile

## Required flags

- `--allow-read`
- `--allow-env`

## Usage

Put this before pluginFileLoader

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.7.0/plugin/importResolver/mod.ts";
import { pluginCacheLoader } from "https://deno.land/x/denopack@0.7.0/plugin/cacheLoader/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.7.0/plugin/filLoader/mod.ts";

export default {
  plugins: [pluginImportResolver(), pluginCacheLoader(), pluginFileLoader()],
};
```

### Strict integrity checks

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.7.0/plugin/importResolver/mod.ts";
import { pluginCacheLoader } from "https://deno.land/x/denopack@0.7.0/plugin/cacheLoader/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.7.0/plugin/filLoader/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginCacheLoader({ lockFile: "lock.json", cacheOnly: true }),
    pluginFileLoader({ lockFile: "lock.json" }),
  ],
};
```

# denopack/plugin/fileLoader

- Loads locally resolved files
- Fetches resolved urls
- [optional] checks integrity of files loaded from url against a lockfile

## Options

- `lockFile [string]`: path to a lockfile (for example: `lock.json`). Throws if the integrity of the loaded cache file does not match the integrity in the lockfile

## Required flags

- `--allow-read` for local files and lockfiles
- `--allow-net` for fetching urls

## Usage

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.8.0/plugin/importResolver/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.8.0/plugin/fileLoader/mod.ts";

export default {
  plugins: [pluginImportResolver(), pluginFileLoader()],
};
```

### Strict integrity checks

```ts
import { pluginImportResolver } from "https://deno.land/x/denopack@0.8.0/plugin/importResolver/mod.ts";
import { pluginCacheLoader } from "https://deno.land/x/denopack@0.8.0/plugin/cacheLoader/mod.ts";
import { pluginFileLoader } from "https://deno.land/x/denopack@0.8.0/plugin/filLoader/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginCacheLoader({ lockFile: "lock.json", cacheOnly: true }),
    pluginFileLoader({ lockFile: "lock.json" }),
  ],
};
```

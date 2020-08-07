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
import { pluginImportResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/importResolver/mod.ts";
import { pluginFileLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/fileLoader/mod.ts";

export default {
  plugins: [pluginImportResolver(), pluginFileLoader()],
};
```

### Strict integrity checks

```ts
import { pluginImportResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/importResolver/mod.ts";
import { pluginCacheLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/cacheLoader/mod.ts";
import { pluginFileLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/filLoader/mod.ts";

export default {
  plugins: [
    pluginImportResolver(),
    pluginCacheLoader({ lockFile: "lock.json", cacheOnly: true }),
    pluginFileLoader({ lockFile: "lock.json" }),
  ],
};
```

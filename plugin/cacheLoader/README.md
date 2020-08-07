# denopack/plugin/cacheLoader

- [optional] checks if cached file exists and skips loading if it doesn't
- returns local cached file location

## Options

- `lazy [boolean]`: defaults to false. If active, this will skip checking whether the file actually exists locally and will lazily return the assumed path.

## Required flags

- `--allow-read`
- `--allow-env`

## Usage

Put this before pluginFileLoader

```ts
import { pluginRootResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/rootResolver/mod.ts";
import { pluginCacheLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/cacheLoader/mod.ts";
import { pluginFileLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/filLoader/mod.ts";

export default {
  plugins: [pluginRootResolver(), pluginCacheLoader(), pluginFileLoader()],
};
```

# denopack/plugin/fileLoader

- Loads locally resolved files
- Fetches resolved urls

## Required flags

- `--allow-read` for local files
- `--allow-net` for fetching urls

## Usage

```ts
import { pluginRootResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/rootResolver/mod.ts";
import { pluginFileLoader } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/fileLoader/mod.ts";

export default {
  plugins: [pluginRootResolver(), pluginFileLoader()],
};
```

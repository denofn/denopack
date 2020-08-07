# denopack/plugin/rootResolver

Resolves the root node and only the root node.
Use this plugin if you want to write your resolving logic yourself.

## Usage

```ts
import { pluginRootResolver } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/rootResolver/mod.ts";

export default {
  plugins: [pluginRootResolver()],
};
```

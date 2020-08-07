# denopack plugins

denopack provides several built-in plugins that you can use

- [pluginRootResolver](./pluginRootResolver)
- [pluginImportResolver](./pluginImportResolver)
- ~~[pluginCacheResolver](./pluginCacheResolver)~~ **deprecated after Deno v1.2.3**
- [pluginChainResolver](./pluginChainResolver)
- [pluginCacheLoader](./pluginCacheResolver)
- [pluginFileLoader](./pluginFileLoader)
- [pluginTypescriptTransform](./pluginTypescriptTransform)
- [pluginTypescriptCompile](./pluginTypescriptCompile)
- [pluginTerserTransform](./pluginTerserTransform)

## Hooks

Some of these plugins are collected in strategies that are defined as hooks. These hooks will always return as an array of plugins. Your choice in strategy will probably depend on the permissions you want the bundling to happen with:

- `useCacheLazy` is the least invasive, always resolving to a file (thus needing `--allow-read`). The downside is that everything already needs to be pre-cached before bundling starts. It does also require access to environment variables to find DENO_DIR (`--allow-env`)
- `useCache` require an additional, potential `--allow-net` if files aren't cached yet.
- `useAlwaysFetch`, `useCompile` and `useCompileAsLoader` require `--allow-read` and `--allow-net`

**NOTE: aside from permission flags, all of these hooks require `--unstable` to leverage compilation/transpilation**

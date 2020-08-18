# Contributing

- If you are using vscode, install and enable the [required extensions](./.vscode/extensions.json).
  - If you are not using vscode, sort your imports and use the following prettier settings:
    - semi: true
    - singleQuote: false
    - printWidth: 100
    - trailingComma: "es5"
    - tabWidth: 2
    - useTabs: false
- Functions, constants and variables are always camelCase
- Classes are allowed to be PascalCase
- Extract shared code to [util](./util)
- Code that is not a plugin or hook lives in [cli](./cli)

## Contributing denopack plugins

Contributing a plugin to the denopack repo is not only extremely welcomed, it's even encouraged. That does mean a few conventions are in order, extending from the existing [Rollup conventions](https://rollupjs.org/guide/en/#conventions) these are:

- Plugins should have a clear plugin name with a `denopack-plugin-` prefix
- Plugin functions are always camelCased and are default exported
- Plugins and their documentation should be stored in a separate folder [inside the plugin directory](./plugin)
- Optionally also indicating what the most impactful action is (resolve, load, transform, bundle ...). The [typescriptCompile](./plugin/typescriptCompile) plugin is an obvious exception, but do take a look at the naming of the [other plugins](./plugin)
- Use async Deno APIs (readFile not readFileSync, etc.)
- Document your plugin in English and **detail what flags are required**! [Here's an example](./plugin/typescriptCompile/README.md)

## Contributing denopack hooks

Contributing a hook follows the following conventions:

- Hooks start with the keyword use
- Hooks are always camelCased
- Hooks are stored inside of [hooks.ts](./plugin/hooks.ts)
- Hooks are always functions and always return an array of plugins
- Using plugins that accept configuration options in hooks should always be allowed to pass config down to that plugin
- Configuration options are stored in one object containing all configuration options, see [hooks.ts](./plugin/hooks.ts) for examples

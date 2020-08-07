<p align="center">
   <img src="https://github.com/denofn/denopack/raw/main/.github/denopack_logo.png" alt="denopack logo" />
</p>
<p align="center">Bundling and minification toolset for Deno</p>
<p align="center">
   <img src="https://img.shields.io/github/v/tag/denofn/denopack?label=latest" />
   <a href="https://nest.land/package/denopack"><img src="https://nest.land/badge.svg" /></a>
</p>

---

## Preface

🦕📦 denopack is a CLI tool and a collection of plugins that for bundling Typescript code to be used with Deno or in the browser. This library uses the browser versions of [Rollup](https://github.com/rollup/rollup) (bundling) and [Terser](https://github.com/terser/terser) (compression/minification).

> This library is made for Deno and is thus fully usable in Deno as a package or as a CLI app with `deno install`. No node_modules, npm/yarn scripts, etc are needed.

## Contents

- [Preface](#preface)
- [Contents](#contents)
- [Goals](#goals)
- [CLI](#cli)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Usage with script runners](#usage-with-script-runners)
  - [Permissions](#permissions)
- [Config file](#config-file)
- [Plugins](#plugins)
  - [Usage](#usage-1)
    - [Usage wihout CLI](#usage-without-cli)
  - [Contributing denopack plugins](#contributing-denopack-plugins)
  - [Contributing denopack hooks](#contributing-denopack-hooks)
- [Acknowledgements](#acknowledgements)

## Goals

There is absolutely nothing wrong with `deno bundle`, but in its current state it is missing several features that are present in the NodeJS ecosystem. The goal is to provide an alternative bundling method that can - together with a plugin system, extending functionality - provide several key wishlist features _**without turning to Node**_:

- [x] [Tree shaking](https://rollupjs.org/guide/en/#tree-shaking) comes built-in with Rollup
- [x] Minification by the usage of the [Terser plugin](./plugin/terserTransform)
- [ ] Source Maps (should also come built-in with Rollup, [coming soon](https://github.com/denofn/denopack/pull/2))
- [ ] File watching (pretty sure this can be implemented, coming soon)
- [ ] Lock file support, checking checksums from the lockfile against loaded code

More to come, also see the `deno bundle` roadmap/wishlist over at [denoland/deno/issues/4549](https://github.com/denoland/deno/issues/4549)

## CLI

### Installation

```sh
deno install --unstable --allow-read --allow-write --allow-env --allow-net -n denopack https://cdn.jsdelivr.net/gh/denofn/denopack@latest/cli.ts
```

```sh
eggs install --unstable --allow-read --allow-write --allow-env --allow-net -n denopack https://x.nest.land/denopack@0.2.0/cli.ts
```

**NOTE: denopack uses unstable Deno APIs. These APIs are not final and may break, but this does mean `--unstable` is mandatory!**

### Usage

```
Usage:
  $ denopack -i mod.ts

Options:
  -v, --version                Display version number
  -i, --input <pathToFile>     The input file (most likely mod.ts)
  -o, --output [pathToFile]    The output file name
  -d, --dir [pathToDir]        The output directory
  -c, --config [pathToConfig]  The config file. Use --defaultConfig for default values
  -p, --print                  Prints the generated bundle to stdout
  --defaultConfig              Prints the default config to stdout
  -h, --help                   Display this message

Examples:
denopack -i mod.ts
denopack -i mod.ts -o bundle.js
denopack -i mod.ts --dir dist
denopack -c denopack.config.ts
denopack -i mod.ts -o out.js --dir dist -c denopack.config.ts
```

### Usage with script runners

In case you don't want to globally install denopack, but want to use it locally with script runners: this is absolutely, totally possible since denopack uses 0 NodeJS specific code!

Script runners that should work out-of-the-box:

- [velociraptor](https://github.com/umbopepato/velociraptor)

```yml
# example

scripts:
  start: deno run --unstable --allow-read --allow-write https://cdn.jsdelivr.net/gh/denofn/denopack@latest/cli.ts
```

```sh
vr run start -i mod.ts -o bundle.js
```

- [denox](https://github.com/BentoumiTech/denox)

```yml
#example

scripts:
  start:
    file: https://cdn.jsdelivr.net/gh/denofn/denopack@latest/cli.ts
    deno_options:
      allow-read: true
      allow-write: true
      unstable: true
```

```sh
denox run start -i mod.ts -o bundle.js
```

- [Commands](https://github.com/buttercubz/commands)

```json
{
  "config": {
    "start": "--unstable --allow-read --allow-write https://cdn.jsdelivr.net/gh/denofn/denopack@latest/cli.ts -i mod.ts -o bundle.js"
  }
}
```

```sh
Commands start
```

### Permissions

**NOTE: both denopack and its plugins use unstable Deno APIs. These APIs are not final and may break, but this does mean `--unstable` is mandatory!**

The CLI itself can run with a base permission of `--allow-read`, printing to stdout with the `-p` flag. Writing to file naturally requires `--allow-write`.

Additionally, the various built-in plugins can require extra permissions like `--allow-net` and `--allow-env`. More info can be found [here](./plugin).

## Config file

Importing a [Rollup config file](https://rollupjs.org/guide/en/#configuration-files) is supported using the `-c <path/to/config>` flag and follow the same conventions as Rollup:

- use default export for your config
- ideally call it `rollup.config.ts` or `denopack.config.ts`

## Plugins

Since the bundling logic - aside file system/network access - is handled by Rollup, the remaining core functionality of denopack is based around plugins that use Deno APIs for key features.

A list of included plugins and a collection of strategies are included [in the plugin directory](./plugin). Documentation from Rollup regarding plugins is available on their [docs site](https://rollupjs.org/guide/en/#plugin-development).

### Usage

If you only need plugins or hooks - for example to create a config file - you can import straight from the `mod.ts` in the plugin directory.

```ts
import /* whatever plugins/hooks are needed */ "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/plugin/mod.ts";

export default {
  file: "mod.ts",
  plugins: [
    /* whatever plugins or hooks were imported */
  ],
};
```

#### Usage without CLI

If you want to handle the building/bundling yourself, the toplevel `mod.ts` also includes `rollup` that exposes the [Rollup Javascript API]() and several typings.

```ts
import {
  rollup /* whatever plugins/hooks are needed */,
} from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/mod.ts";
import type { RollupOptions } from "https://cdn.jsdelivr.net/gh/denofn/denopack@latest/mod.ts";
```

Just like the CLI, you can use it out-of-the-box with `deno run` or script runners like the ones mentioned up above.

### Contributing

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

#### Contributing denopack plugins

Contributing a plugin to the denopack repo is not only extremely welcomed, it's even encouraged. That does mean a few conventions are in order, extending from the existing [Rollup conventions](https://rollupjs.org/guide/en/#conventions) these are:

- Plugins should have a clear plugin name with a `denopack-plugin-` prefix
- Plugin functions are always camelCased
- Plugins and their documentation should be stored in a separate folder [inside the plugin directory](./plugin)
- Optionally also indicating what the most impactful action is (resolve, load, transform, ...). The [typescriptCompile](./plugin/typescriptCompile) plugin is an obvious exception, but do take a look at the naming of the [other plugins](./plugin)
- Use async Deno APIs (readFile not readFileSync, etc.)
- Document your plugin in English and **detail what flags are required**! [Here's an example](./plugin/typescriptCompile/README.md)

#### Contributing denopack hooks

Contributing a hook follows the following conventions:

- Hooks start with the keyword use
- Hooks are always camelCased
- Hooks are stored inside of [hooks.ts](./plugin/hooks.ts)
- Hooks are always functions and always return an array of plugins
- Using plugins that accept configuration options in hooks should always be allowed to pass config down to that plugin

## Acknowledgements

- Reddit user [u/HarmonicAscendant](https://www.reddit.com/r/Deno/comments/hlm7dd/any_frontend_build_tools_for_deno_yet/) - unrelated to this library - who coined the name name Denopack
- The sauropod and package emoji's courtesy of [Twemoji](https://twemoji.twitter.com/)

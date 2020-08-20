<p align="center">
   <img src="https://github.com/denofn/denopack/raw/main/.github/denopack_logo.png" alt="denopack logo" />
</p>
<p align="center">The bundling and minification toolset, <strong>made for Deno</strong></p>
<p align="center">
   <img src="https://img.shields.io/github/v/tag/denofn/denopack?label=latest&labelColor=black&style=flat&color=teal" />
   <a href="https://deno.land/x/denopack"><img src="https://img.shields.io/badge/Available%20on-deno.land/x-teal.svg?style=flat&logo=deno&labelColor=black" /></a>
   <a href="https://nest.land/package/denopack"><img src="https://nest.land/badge.svg" /></a>
</p>

---

## Preface

🦕📦 denopack is a CLI tool and a collection of plugins designed for bundling code to be used with Deno or in the browser. _No node_modules, no npm or yarn needed._

**General note: make sure you are running Deno v1.2.0 or later**

### Installation

```sh
deno install --unstable --allow-read --allow-write --allow-env --allow-net -n denopack https://deno.land/x/denopack@0.6.0/cli.ts
```

```sh
eggs install --unstable --allow-read --allow-write --allow-env --allow-net -n denopack https://x.nest.land/denopack@0.6.0/cli.ts
```

**NOTE: denopack uses unstable Deno APIs. These APIs are not final and may break, but this does mean `--unstable` is mandatory!**

## Documentation

Visit [https://denopack.mod.land](https://denopack.mod.land)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## Acknowledgements

- Reddit user [u/HarmonicAscendant](https://www.reddit.com/r/Deno/comments/hlm7dd/any_frontend_build_tools_for_deno_yet/) - unrelated to this library - who coined the name name Denopack
- The sauropod and package emoji's courtesy of [Twemoji](https://twemoji.twitter.com/)

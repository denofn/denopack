# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.1](https://github.com/denofn/denopack/compare/0.9.0..0.9.1) - 2020-10-03

### Fixed

- Nested route in CSS plugin
- Don't panic when cache is invalid
- ensureDir when emitting files
- resolve absolute and file:// path correctly
- correctly format sourceMappingURL

## [0.9.0](https://github.com/denofn/denopack/compare/0.8.0..0.9.0) - 2020-09-16

### Added

- Test fixtures for htmlBundle

### Changed

- Updated dependencies and types to Deno 1.4.0 and Terser 5

### Fixed

- Relative paths in htmlBundle plugin
- MacOS cache location path
- Early exit for installer

## [0.8.0](https://github.com/denofn/denopack/compare/0.7.1..0.8.0) - 2020-08-26

### Added

- pluginServe

### Changed

- Added pluginServe to React recipe

## [0.7.1](https://github.com/denofn/denopack/compare/0.7.0..0.7.1) - 2020-08-22

### Fixed

- added install.ts to egg.json

## [0.7.0](https://github.com/denofn/denopack/compare/0.6.0..0.7.0) - 2020-08-22

### Added

- Change to custom install script

### Changed

- Switched out custom filter function in cssBundle for official Rollup createFilter function

## [0.6.0](https://github.com/denofn/denopack/compare/0.5.0..0.6.0) - 2020-08-18

### Added

- Plugins for html and css assets
- React template recipe
- Plugins are now also exported with `export default`

### Changed

- Updated Rollup to v2.26.3
- Toplevel mod.ts now re-exports rollup from deps.ts
- Removed pluginCacheResolver

## [0.5.0](https://github.com/denofn/denopack/compare/0.4.0..0.5.0) - 2020-08-13

### Changed

- Directory loading to support dynamic imports and code splitting
- BREAKING: pluginTerserTransform is now an actual transform plugin, not an output plugin
- Sourcemapping identifiers are now appended in CLI, not in pluginTerserTransform

## [0.4.0](https://github.com/denofn/denopack/compare/0.3.2..0.4.0) - 2020-08-11

### Added

- Handle entry file redirects (re: [denoland/deno/issues/3082](https://github.com/denoland/deno/issues/3082))
- Rollup cache support for incremental compiles in [denofn/denopack/pull/5](https://github.com/denofn/denopack/pull/5)
- File watch mode (pluginTypescriptCompile is **not** supported) in [denofn/denopack/pull/5](https://github.com/denofn/denopack/pull/5)

### Changed

- Default plugin hook changed from useCompile to useCache in [denofn/denopack/pull/5](https://github.com/denofn/denopack/pull/5)
- Extra CLI options like print, watch and cache are now verbose in [denofn/denopack/pull/5](https://github.com/denofn/denopack/pull/5)
- File watch uses debounce, taking last event in series as a trigger

## [0.3.2](https://github.com/denofn/denopack/compare/0.3.0..0.3.2) - 2020-08-08

### Fixed

- Load config from file URI relative to CWD instead of absolute path (this broke stuff on installs from registries)

## [0.3.0](https://github.com/denofn/denopack/compare/0.2.0..0.3.0) - 2020-08-07

### Added

- Source map support in [denofn/denopack/pull/2](https://github.com/denofn/denopack/pull/2)
- Lockfile integrity checking in [denofn/denopack/pull/4](https://github.com/denofn/denopack/pull/4)

### Changed

- Hooks now take one configuration object as parameter where needed in [denofn/denopack/pull/4](https://github.com/denofn/denopack/pull/4)

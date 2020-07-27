import { Plugin } from "../deps.ts";
import { resolver } from "../util/resolver.ts";

export function pluginRootResolver(): Plugin {
  return {
    name: "denopack-plugin-rootResolver",
    resolveId: resolver,
  };
}

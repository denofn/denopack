import type { Plugin } from "../deps.ts";

export function findPlugin(plugins: Plugin[], name: string): boolean {
  for (const p of plugins) {
    if (p.name === name) return true;
  }

  return false;
}

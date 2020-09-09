import { path } from "../deps.ts";

// Credits to timreichen/Bundler
export function resolveCacheLocation(): string {
  const denoDir = Deno.env.get("DENO_DIR");
  if (denoDir) return denoDir;

  const homeDir = Deno.env.get("HOME");

  switch (Deno.build.os) {
    case "darwin":
      if (homeDir) return path.join(homeDir, "Library", "Caches", "deno");
      break;
    case "linux": {
      const xdgCacheHomeDir = Deno.env.get("XDG_CACHE_HOME");
      if (xdgCacheHomeDir) return path.join(xdgCacheHomeDir, "deno");
      else if (homeDir) return path.join(homeDir, ".cache", "deno");
      break;
    }
    case "windows": {
      const localAppData = Deno.env.get("LOCALAPPDATA");
      if (localAppData) return path.join(localAppData, "deno");
      break;
    }
  }

  return homeDir ? path.join(homeDir, ".deno") : path.join("~", ".deno");
}

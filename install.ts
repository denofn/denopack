import { join, parse } from "https://deno.land/std@0.66.0/path/mod.ts";

const url = import.meta.url;

function buildURL(target: string): string {
  const { dir } = parse(url);
  return new URL(join(dir, target)).href;
}

// Cache all deps

// Main deps
await Deno.run({
  cmd: ["deno", "cache", "--unstable", `${buildURL("./deps.ts")}`],
}).status();

// Terser
await Deno.run({
  cmd: ["deno", "cache", "--unstable", `${buildURL("./plugin/terserTransform/deps.ts")}`],
}).status();

// Unstable plugin deps
await Deno.run({
  cmd: [
    "deno",
    "cache",
    "--unstable",
    "--no-check", // remove when https://github.com/denoland/deno/issues/7145 is resolved
    `${buildURL("./plugin/deps.ts")}`,
  ],
}).status();

// Install
await Deno.run({
  cmd: [
    "deno",
    "install",
    "--unstable",
    "--allow-read",
    "--allow-write",
    "--allow-env",
    "--allow-net",
    "-f",
    "--name=denopack",
    `${buildURL("cli.ts")}`,
  ],
}).status();

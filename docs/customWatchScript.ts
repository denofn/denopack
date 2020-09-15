import { debounce } from "../deps.ts";

async function watch() {
  const run = debounce(async function () {
    Deno.run({
      cmd: ["vr", "start"],
    });
  }, 100);

  await run();

  for await (const { kind } of Deno.watchFs("src")) {
    if (kind === "any" || kind === "access") continue;
    await run();
  }
}

watch();

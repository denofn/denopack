import { fs, path } from "../../deps.ts";
import { asserts } from "../../test_deps.ts";

const fixturesBasePath = "fixtures/htmlBundle";

Deno.test({
  name: "Creates html output that references js and css assets",
  async fn() {
    const testPath = path.join(fixturesBasePath, "basicJsAndCss");
    try {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "--unstable",
          "--allow-read",
          "--allow-write",
          "--allow-env",
          "--allow-net",
          "../../../cli.ts",
          "-c",
          "denopack.config.ts",
        ],
        cwd: testPath,
      });

      await p.status();
      p.close();

      await fs.ensureDir(path.join(testPath, "dist"));
      await fs.ensureFile(path.join(testPath, "dist", "index.html"));

      const htmlBundle = await Deno.readTextFile(
        path.join(testPath, "dist", "index.html"),
      );
      asserts.assert(
        htmlBundle.includes(`<link href="./mod.css" rel="stylesheet">`),
      );
      asserts.assert(
        htmlBundle.includes(`<script src="./mod.js" type="module"></script>`),
      );
    } finally {
      // cleanup
      await Deno.remove(path.join(testPath, "dist"), { recursive: true });
    }
  },
});

Deno.test({
  name: "Creates html output that references relative js and css assets",
  async fn() {
    const testPath = path.join(fixturesBasePath, "relativeUrls");
    try {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "--unstable",
          "--allow-read",
          "--allow-write",
          "--allow-env",
          "--allow-net",
          "../../../cli.ts",
          "-c",
          "denopack.config.ts",
        ],
        cwd: testPath,
      });

      await p.status();
      p.close();

      await fs.ensureDir(path.join(testPath, "dist", "public"));
      await fs.ensureFile(path.join(testPath, "dist", "public", "index.html"));

      const htmlBundle = await Deno.readTextFile(
        path.join(testPath, "dist", "public", "index.html"),
      );
      asserts.assert(
        htmlBundle.includes(`<link href="../mod.css" rel="stylesheet">`),
      );
      asserts.assert(
        htmlBundle.includes(`<script src="../mod.js" type="module"></script>`),
      );
    } finally {
      // cleanup
      await Deno.remove(path.join(testPath, "dist"), { recursive: true });
    }
  },
});

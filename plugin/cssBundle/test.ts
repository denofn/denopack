import { fs, path } from "../../deps.ts";
import { asserts } from "../../test_deps.ts";

const fixturesBasePath = "fixtures/cssBundle";

Deno.test({
  name: "Emits css output correctly",
  async fn() {
    const testPath = path.join(fixturesBasePath, "basicCssEmit");
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
      await fs.ensureFile(path.join(testPath, "dist", "css/output.css"));

      const css_output = await Deno.readTextFile(
        path.join(testPath, "dist", "css/output.css"),
      );
      asserts.assertStringContains(
        css_output.replaceAll(/\s/g, ""),
        "body{background-color:black;}",
      );
    } finally {
      // cleanup
      await Deno.remove(path.join(testPath, "dist"), { recursive: true });
    }
  },
});

import { BottomSpacer } from "../components/BottomSpacer.tsx";
import { Code } from "../components/Code.tsx";
import { Link } from "../components/Link.tsx";
import { Page } from "../components/Page.tsx";
import { Section } from "../components/Section.tsx";
import { SidebarContainer } from "../components/Sidebar.tsx";
import { css, React } from "../deps.ts";

const sectionContainer = css({
  minWidth: "300px",
  width: "66vw",
});

function CLI() {
  return (
    <Page active="cli">
      <>
        <SidebarContainer active="cli">
          <Section title="CLI" className={sectionContainer}>
            <h4>Usage</h4>
            <p>
              The following flags are available:
              <ul>
                <li>
                  <Code>-i/--input {"<pathToFile>"}</Code>: the input file (in most cases mod.ts)
                </li>
                <li>
                  <Code>-o/--output {"<pathToFile>"}</Code>: the output file name
                </li>
                <li>
                  <Code>-d/--dir {"<pathToDir>"}</Code>: the output directory. Setting this is
                  needed for code splitting and always takes precedence over <Code>-o</Code>
                </li>
                <li>
                  <Code>-c/--config {"<pathToConfig>"}</Code>: the config file. Use{" "}
                  <Code>--defaultConfig</Code> to see the default values.
                </li>
                <li>
                  <Code>--cache {"<cacheLocation>"}</Code>: location to persist build cache
                </li>
                <li>
                  <Code>--watch {"<dirOrFile>"}</Code>: watch a file or directory and rebuild on
                  changes
                </li>
                <li>
                  <Code>--defaultConfig</Code>: prints the default config to stdout
                </li>
                <li>
                  <Code>--print</Code>: prints the generated bundle to stdout
                </li>
                <li>
                  <Code>-v/--version</Code>: display version number
                </li>
                <li>
                  <Code>-h/--help</Code>: display the CLI help message
                </li>
              </ul>
            </p>
            <h4>Permissions</h4>
            <p>
              <strong>
                NOTE: both denopack and its plugins use unstable Deno APIs. These APIs are not final
                and may break, but this does mean <Code>--unstable</Code> is mandatory!
              </strong>
            </p>
            <p>
              The CLI itself can run with a base permission of <Code>--allow-read</Code>, printing
              to stdout with the <Code>-p</Code> flag. Writing to file naturally requires{" "}
              <Code>--allow-write</Code>.
              <br />
              Additionally, the various built-in plugins can require extra permissions like{" "}
              <Code>--allow-net</Code> and <Code>--allow-env</Code>. More info can be found{" "}
              <Link href="https://github.com/denofn/denopack/blob/main/plugin" target="_blank">
                in the plugin folder on Github
              </Link>
              .
            </p>
            <h4>Config file</h4>
            <p>
              Importing a{" "}
              <Link href="https://rollupjs.org/guide/en/#configuration-files" target="_blank">
                Rollup config file
              </Link>{" "}
              is supported using the <Code>-c {"<path/to/config>"}</Code> flag and follow the same
              conventions as Rollup:
              <ul>
                <li>use default export for your config</li>
                <li>ideally call it rollup.config.ts or denopack.config.ts</li>
              </ul>
            </p>
          </Section>
          <BottomSpacer />
        </SidebarContainer>
      </>
    </Page>
  );
}

export const title = "denopack - CLI";
export default CLI;

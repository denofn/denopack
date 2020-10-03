import { BottomSpacer } from "../components/BottomSpacer.tsx";
import { CodeBlock } from "../components/CodeBlock.tsx";
import { Link } from "../components/Link.tsx";
import { Page } from "../components/Page.tsx";
import { Section } from "../components/Section.tsx";
import { SidebarContainer } from "../components/Sidebar.tsx";
import { css, React } from "../deps.ts";

const sectionContainer = css({
  minWidth: "300px",
  width: "66vw",
});

function Pad() {
  return (
    <span
      className={css({
        paddingLeft: "16px",
      })}
    />
  );
}

function Plugins() {
  return (
    <Page active="plugins">
      <>
        <SidebarContainer active="plugins">
          <Section title="Plugins" className={sectionContainer}>
            <p>
              Since the bundling logic - aside file system/network access - is
              handled by Rollup, the remaining core functionality of denopack is
              based around plugins that use Deno APIs for key features. A list
              of included plugins and a collection of strategies are included in
              the{" "}
              <Link
                href="https://github.com/denofn/denopack/blob/main/plugin"
                target="_blank"
              >
                plugin directory on Github
              </Link>
              . Documentation from Rollup regarding plugins is available on
              their{" "}
              <Link
                href="https://rollupjs.org/guide/en/#plugin-development"
                target="_blank"
              >
                docs site
              </Link>
              .
            </p>
            <h4>Usage</h4>
            <p>
              If you only need plugins or hooks - for example to create a config
              file - you can import straight from the mod.ts in the plugin
              directory.
            </p>
            <CodeBlock>
              import /* whatever plugins/hooks are needed */
              "https://deno.land/x/denopack@0.9.1/plugin/mod.ts";
              <br />
              <br />
              export default {"{"}
              <br />
              <Pad />
              file: "mod.ts",
              <br />
              <Pad />
              plugins: [ /* whatever plugins or hooks were imported */ ],
              <br />
              {"}"};
            </CodeBlock>
          </Section>
          <BottomSpacer />
        </SidebarContainer>
      </>
    </Page>
  );
}

export const title = "denopack - Plugins";
export default Plugins;

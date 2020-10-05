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

function ScriptRunners() {
  return (
    <Page active="scriptrunners">
      <>
        <SidebarContainer active="scriptrunners">
          <Section title="Script runners" className={sectionContainer}>
            <p>
              In case you don't want to globally install denopack, but want to
              use it locally with script runners: this is absolutely, totally
              possible since denopack uses 0 NodeJS specific code!
            </p>
            <h4>
              <Link
                href="https://github.com/umbopepato/velociraptor"
                target="_blank"
              >
                Velociraptor
              </Link>
            </h4>
            <CodeBlock>
              scripts:
              <br />
              <Pad />
              start: deno run --unstable --allow-read --allow-write
              https://deno.land/x/denopack@0.10.0/cli.ts
            </CodeBlock>
            <CodeBlock>vr run start -i mod.ts -o bundle.js</CodeBlock>
            <h4>
              <Link
                href="https://github.com/BentoumiTech/denox"
                target="_blank"
              >
                Denox
              </Link>
            </h4>
            <CodeBlock>
              scripts:
              <br />
              <Pad />
              start:
              <br />
              <Pad />
              <Pad />
              file: https://deno.land/x/denopack@0.10.0/cli.ts
              <br />
              <Pad />
              <Pad />
              deno_options:
              <br />
              <Pad />
              <Pad />
              <Pad />
              allow-read: true
              <br />
              <Pad />
              <Pad />
              <Pad />
              allow-write: true
              <br />
              <Pad />
              <Pad />
              <Pad />
              unstable: true
            </CodeBlock>
            <CodeBlock>denox run start -i mod.ts -o bundle.js</CodeBlock>
            <h4>
              <Link
                href="https://github.com/buttercubz/commands"
                target="_blank"
              >
                Commands
              </Link>
            </h4>
            <CodeBlock>
              {"{"}
              <br />
              <Pad />
              "config": {"{"}
              <br />
              <Pad />
              <Pad />
              "start": "--unstable --allow-read --allow-write
              https://deno.land/x/denopack@0.10.0/cli.ts -i mod.ts -o bundle.js"
              <br />
              <Pad />
              {"}"}
              <br />
              {"}"}
            </CodeBlock>
            <CodeBlock>vr run start -i mod.ts -o bundle.js</CodeBlock>
          </Section>
          <BottomSpacer />
        </SidebarContainer>
      </>
    </Page>
  );
}

export const title = "denopack - Script runners";
export default ScriptRunners;

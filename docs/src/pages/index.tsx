import { BottomSpacer } from "../components/BottomSpacer.tsx";
import { Code } from "../components/Code.tsx";
import { CodeBlock } from "../components/CodeBlock.tsx";
import { Hero } from "../components/Hero.tsx";
import { Page } from "../components/Page.tsx";
import { Section } from "../components/Section.tsx";
import { SidebarContainer } from "../components/Sidebar.tsx";
import { css, React } from "../deps.ts";

const heroP = css({
  margin: 0,
  marginTop: "1rem",
  minWidth: "300px",
  width: "50vw",
});

const sectionContainer = css({
  minWidth: "300px",
  width: "66vw",
});

const highlightedSpan = css({
  color: "#2C7A7B",
});

function Index() {
  return (
    <Page active="home">
      <>
        <Hero
          title={
            <>
              The bundling and minification toolset,{" "}
              <span className={highlightedSpan}>made for Deno.</span>
            </>
          }
        >
          <p className={heroP}>
            denopack is a CLI tool and a collection of plugins designed for bundling code to be used
            with Deno or in the browser.{" "}
            <i className={highlightedSpan}>No node_modules, no npm or yarn needed.</i>
          </p>
          <p className={heroP}>
            <img src="https://img.shields.io/github/v/tag/denofn/denopack?label=latest&labelColor=black&style=flat&color=teal" />{" "}
            <a href="https://deno.land/x/denopack">
              <img src="https://img.shields.io/badge/Available%20on-deno.land/x-teal.svg?style=flat&logo=deno&labelColor=black" />
            </a>{" "}
            <a href="https://nest.land/package/denopack">
              <img src="https://nest.land/badge.svg" />
            </a>
          </p>
        </Hero>
        <SidebarContainer active="home">
          <Section title="Installation" className={sectionContainer}>
            <h4>From deno.land</h4>
            <CodeBlock>
              deno run --allow-run --allow-read https://deno.land/x/denopack@0.7.0/install.ts
            </CodeBlock>
            <h4>From nest.land</h4>
            <CodeBlock>
              deno run --allow-run --allow-read https://x.nest.land/denopack@0.7.0/install.ts
            </CodeBlock>
          </Section>
          <Section title="Goal" className={sectionContainer}>
            <p>
              Disclaimer: there is absolutely <strong>nothing</strong> wrong with{" "}
              <Code>deno bundle</Code>. In most cases, it will actually handle everything necessary
              for a bundler to handle. There are, however, several features missing that would make
              a bundler even more awesome such as minifying, tree shaking, ...
            </p>
            <p>
              denopack's goal is to provide a pluggable bundling solution for the Deno ecosystem,
              using Rollup behind the scenes, continually expanding functionality. It is important
              for both backend and frontend development on Deno to be able to use a mature and
              optimized set of tools, and denopack is here to help.
            </p>
          </Section>
          <BottomSpacer />
        </SidebarContainer>
      </>
    </Page>
  );
}

export const title = "denopack";
export default Index;

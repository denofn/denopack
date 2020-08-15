import { css, React } from "../deps.ts";

const codeRoot = css({
  fontFamily: "monospace",
  backgroundColor: "#E2E8F0",
  padding: "0 2px",
});

export function Code({ children }: React.PropsWithChildren<{}>) {
  return <span className={codeRoot}>{children}</span>;
}

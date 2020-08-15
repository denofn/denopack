import { css, React } from "../deps.ts";

const codeRoot = css({
  display: "block",
  fontSize: "1.15rem",
  lineHeight: "1.65rem",
  backgroundColor: "#E2E8F0",
  fontFamily: "monospace",
  padding: ".5rem",
  wordBreak: "break-word",
});

export function CodeBlock({ children }: React.PropsWithChildren<{}>) {
  return <div className={codeRoot}>{children}</div>;
}

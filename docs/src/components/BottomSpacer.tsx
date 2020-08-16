import { css, React } from "../deps.ts";

const footerSpacer = css({
  marginBottom: "5rem",
});

export function BottomSpacer() {
  return <div className={footerSpacer} />;
}

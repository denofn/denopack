import { css, React } from "../deps.ts";
import { Topbar } from "./Topbar.tsx";

const footerSpacer = css({
  marginBottom: "5rem",
});

export function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Topbar />
      {children}
      <div className={footerSpacer} />
    </>
  );
}

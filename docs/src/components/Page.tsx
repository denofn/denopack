import { css, React } from "../deps.ts";

const pageRoot = css({
  textAlign: "center",
});

export function Page({ children }: React.PropsWithChildren<{}>) {
  return <div className={pageRoot}>{children}</div>;
}

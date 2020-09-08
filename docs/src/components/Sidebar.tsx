import { css, React } from "../deps.ts";
import { MenuContent } from "./MenuContent.tsx";

const sidebarContainer = css({
  display: "flex",
  margin: "auto",
  justifyContent: "center",
});

const sidebarRoot = css({
  display: "none",
  "@media": {
    "(min-width: 1000px)": {
      width: "300px",
      minWidth: "300px",
      maxWidth: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingTop: "3rem",
      marginRight: "1rem",
      overflowY: "auto",
    },
  },
});

const contentRoot = css({});

type Props = {
  active?: string;
};

export function SidebarContainer(
  { children, active }: React.PropsWithChildren<Props>,
) {
  return (
    <div className={sidebarContainer}>
      <div className={sidebarRoot}>
        <MenuContent active={active} />
      </div>
      <div className={contentRoot}>{children}</div>
    </div>
  );
}

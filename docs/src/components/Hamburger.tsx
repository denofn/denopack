import { css, React } from "../deps.ts";
import { MenuContent } from "./MenuContent.tsx";
import { GHLogo } from "./Topbar.tsx";

const sharedStyles = {
  transition: "all 0.3s",
  boxSizing: "border-box",
};

const inputCheckbox = css({
  ...sharedStyles,
  display: "none",
  "&:checked ~ #sidebarMenu": {
    transform: "translateX(0)",
  },
  "&:checked ~ .sidebarIconToggle > .horizontal": {
    opacity: 0,
  },
  "&:checked ~ .sidebarIconToggle > .diagonalPart1": {
    transform: "rotate(135deg)",
    marginTop: "8px",
  },
  "&:checked ~ .sidebarIconToggle > .diagonalPart2": {
    transform: "rotate(-135deg)",
    marginTop: "-9px",
  },
});

const sidebarIconToggle = css({
  ...sharedStyles,
  cursor: "pointer",
  position: "absolute",
  zIndex: "99",
  top: "22px",
  right: "1rem",
  height: "22px",
  width: "22px",
});

const spinner = css({
  ...sharedStyles,
  position: "absolute",
  height: "3px",
  width: "100%",
  backgroundColor: "#4A5568",
});

const lineWithMargin = css({
  position: "relative",
  float: "left",
  marginTop: "3px",
});

const line = css({
  position: "relative",
  float: "left",
});

const sidebarMenu = css({
  backgroundColor: "white",
  height: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  width: "100vw",
  marginTop: "4rem",
  transform: "translateX(100vw)",
  transition: "transform 250ms ease-in-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "3rem",
  overflowY: "auto",
});

type Props = {
  active?: string;
};

export function Hamburger({ active }: Props) {
  return (
    <>
      <input type="checkbox" className={inputCheckbox} id="openSidebarMenu" />
      <label
        htmlFor="openSidebarMenu"
        className={[sidebarIconToggle, "sidebarIconToggle"].join(" ")}
      >
        <div className={[spinner, line, "diagonalPart1"].join(" ")}></div>
        <div className={[spinner, lineWithMargin, "horizontal"].join(" ")}>
        </div>
        <div className={[spinner, lineWithMargin, "diagonalPart2"].join(" ")}>
        </div>
      </label>
      <div id="sidebarMenu" className={sidebarMenu}>
        <MenuContent active={active} />
        <GHLogo />
      </div>
    </>
  );
}

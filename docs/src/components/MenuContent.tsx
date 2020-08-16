import { css, React } from "../deps.ts";

const menuLinkRoot = css({
  fontFamily: "'Rubik', sans-serif",
  fontSize: "1.33rem",
  color: "#4A5568",
  textDecoration: "none",
  marginBottom: "16px",
  ":hover": {
    color: "black",
  },
  "@media": {
    "(min-width: 1000px)": {
      fontSize: "1.15rem",
      marginBottom: "8px",
    },
  },
});

const activeLink = css({
  color: "black",
});

type LinkProps = {
  href: string;
  active?: boolean;
};

function MenuLink({ href, active, children }: React.PropsWithChildren<LinkProps>) {
  return active ? (
    <a className={`${menuLinkRoot} ${activeLink}`}>{children}</a>
  ) : (
    <a href={href} className={menuLinkRoot}>
      {children}
    </a>
  );
}

export function MenuContent({ active }: { active?: string }) {
  return (
    <>
      <MenuLink href="./index.html" active={active === "home"}>
        Home
      </MenuLink>
      <MenuLink href="./cli.html" active={active === "cli"}>
        CLI
      </MenuLink>
      <MenuLink href="./scriptRunners.html" active={active === "scriptrunners"}>
        Script runners
      </MenuLink>
      <MenuLink href="./plugins.html" active={active === "plugins"}>
        Plugins
      </MenuLink>
    </>
  );
}

import { css, React } from "../deps.ts";

const linkRoot = css({
  color: "#4A5568",
  textDecoration: "none",
  ":hover": {
    color: "black",
  },
});

type AProps = {
  href: string;
  target?: string;
};

export function Link({ href, target, children }: React.PropsWithChildren<AProps>) {
  return (
    <a href={href} target={target} className={linkRoot}>
      {children}
    </a>
  );
}

import { css, React } from "../deps.ts";

const sectionRoot = css({
  paddingTop: "1.5rem",
  width: "100%",
});

type Props = {
  className?: string;
  title: React.ReactNode;
};

export function Section({ title, children, className }: React.PropsWithChildren<Props>) {
  return (
    <section className={`${sectionRoot}${className ? " " + className : ""}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

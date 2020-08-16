import { css, React } from "../deps.ts";

const sectionRoot = css({
  margin: "3rem auto 0",
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

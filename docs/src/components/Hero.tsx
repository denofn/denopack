import { css, React } from "../deps.ts";

const heroRoot = css({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContental: "center",
  textAlign: "center",
  padding: "3rem 1.5rem",
  flexDirection: "column",
  backgroundColor: "#EDF2F7",
  borderBottom: "1px solid #E2E8F0",
  fontSize: "1.15rem",
  lineHeight: "1.5rem",
});

const heroTitle = css({
  fontSize: "2.125rem",
  lineHeight: "2.75rem",
});

type Props = {
  title: React.ReactNode;
};

export function Hero({ title, children }: React.PropsWithChildren<Props>) {
  return (
    <section className={heroRoot}>
      <h1 className={heroTitle}>{title}</h1>
      {children}
    </section>
  );
}

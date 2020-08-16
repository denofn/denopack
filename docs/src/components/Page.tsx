import { React } from "../deps.ts";
import { Topbar } from "./Topbar.tsx";

type Props = {
  active?: string;
};

export function Page({ children, active }: React.PropsWithChildren<Props>) {
  return (
    <>
      <Topbar active={active} />
      {children}
    </>
  );
}

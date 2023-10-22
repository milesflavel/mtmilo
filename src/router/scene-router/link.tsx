import { ReactNode } from "react";
import useLocation from "wouter/use-location";

const Link = (props: { routePath: string; children: ReactNode }) => {
  const [_, navigate] = useLocation();

  return (
    <group onClick={(_) => navigate(props.routePath, { replace: false })}>
      {props.children}
    </group>
  );
};

export default Link;

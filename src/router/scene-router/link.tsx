import { ReactNode, useContext } from "react";
import useLocation from "wouter/use-location";
import { RouterContext } from "./router";

const Link = (props: { routePath: string; children: ReactNode }) => {
  const [_, navigate] = useLocation();
  const { basePath } = useContext(RouterContext);
  const routePath = basePath + props.routePath;

  return (
    <group onClick={(_) => navigate(routePath, { replace: false })}>
      {props.children}
    </group>
  );
};

export default Link;

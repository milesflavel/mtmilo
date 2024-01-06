import { ReactNode } from "react";
import useLocation from "wouter/use-location";
import { A11y } from "@react-three/a11y";
import { useRouter } from "./router";

const Link = (props: {
  routePath: string;
  children: ReactNode;
  description: string;
}) => {
  const [_, navigate] = useLocation();
  const { basePath } = useRouter();
  const routePath = basePath + props.routePath;

  return (
    <A11y
      role="link"
      href={routePath}
      description={props.description}
      actionCall={() => navigate(routePath, { replace: false })}
    >
      {props.children}
    </A11y>
  );
};

export default Link;

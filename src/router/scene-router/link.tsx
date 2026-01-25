import { ReactNode } from "react";
import { A11y } from "@react-three/a11y";
import { useRouter } from "./router";
import { useBrowserLocation } from "wouter/use-browser-location";

const Link = (props: {
  routePath: string;
  children: ReactNode;
  description: string;
}) => {
  const [_, navigate] = useBrowserLocation();
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

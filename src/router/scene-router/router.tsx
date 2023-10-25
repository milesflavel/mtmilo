import { createContext, useEffect, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useLocation } from "wouter";

export const RouterContext = createContext<{
  basePath: string;
}>({
  basePath: "/",
});

const Router = (props: {
  children?: React.ReactNode;
  basePath: string;
  routes: {
    [path: string]: {
      cameraPosition: Vector3;
      cameraRotation?: Vector3;
    };
  };
}) => {
  const [location] = useLocation();
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));

  const tryNavigate = (routePath: string) => {
    const cleanPath = routePath.replace(props.basePath, "");
    const route = props.routes[cleanPath];

    if (route) {
      setPosition(route.cameraPosition);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (tryNavigate(location)) {
      return; // Navigated to specified location
    }
    if (tryNavigate("/404")) {
      return; // Navigated to 404
    }
    console.error("404 - Not Found"); // No 404 configured
  }, [location]);

  useFrame(({ camera }, delta) => {
    camera.position.lerp(position, delta);
  });

  return (
    <RouterContext.Provider value={{ basePath: props.basePath }}>
      {props.children}
    </RouterContext.Provider>
  );
};

export default Router;

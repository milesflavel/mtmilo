import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useLocation } from "wouter";

export type RouterConfig = {
  [path: string]: {
    cameraPosition: Vector3;
    cameraRotation?: Vector3;
  };
};

const Router = (props: { routerConfig: RouterConfig }) => {
  const [location] = useLocation();
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));

  const tryNavigate = (routePath: string) => {
    const route = props.routerConfig[routePath];

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

  return <></>;
};

export default Router;

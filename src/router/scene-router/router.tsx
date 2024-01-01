import { createContext, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useLocation } from "wouter";

export interface RouteMap {
  [path: string]: Route;
}

interface Route {
  cameraPosition: Vector3;
  cameraTarget: Vector3;
  pageTitle?: string;
  component?: React.ReactNode;
}

export const RouterContext = createContext<{
  basePath: string;
}>({
  basePath: "/",
});

const Router = (props: {
  children?: React.ReactNode;
  basePath: string;
  routes: RouteMap;
  setPageTitle?: (pageTitle: string) => void;
}) => {
  const [location] = useLocation();
  const [activeRoute, setActiveRoute] = useState<Route>({
    cameraPosition: new Vector3(0, 0, 0),
    cameraTarget: new Vector3(0, 0, 0),
  });
  const cameraTarget = useRef<Vector3>(new Vector3(0, 0, 0));

  const tryNavigate = (routePath: string) => {
    const cleanPath = routePath.replace(props.basePath, "");
    const route = props.routes[cleanPath];

    if (route) {
      setActiveRoute(route);

      if (props.setPageTitle && route.pageTitle) {
        props.setPageTitle(route.pageTitle);
      }

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
    camera.position.lerp(activeRoute.cameraPosition, delta);
    camera.lookAt(cameraTarget.current.lerp(activeRoute.cameraTarget, delta));
  });

  return (
    <RouterContext.Provider value={{ basePath: props.basePath }}>
      {activeRoute.component}
      {props.children}
    </RouterContext.Provider>
  );
};

export default Router;

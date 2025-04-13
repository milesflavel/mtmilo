import { Canvas, useFrame } from "@react-three/fiber";
import { PointLight, Vector3 } from "three";
import { useRef } from "react";
import { Router, Link } from "../../router/scene-router";
import Box from "./box";
import FullscreenButton from "../../components/interactive/fullscreen-button";
import { RouteMap } from "../../router/scene-router/router";
import { useGLTF } from "@react-three/drei";
import SceneGlb from "../../assets/scene.glb?url";
import { A11yAnnouncer } from "@react-three/a11y";
import { AspectDependantFovPerspectiveCamera } from "./aspect-dependant-fov-perspective-camera";

// const MountTest = () => {
//   useEffect(() => {
//     console.log("Mount", new Date().toLocaleTimeString());
//     return () => console.log("Unmount", new Date().toLocaleTimeString());
//   }, []);

//   return <></>;
// };

const ArcadeCabinetActive = () => {
  const pointLightRef = useRef<PointLight>(null);
  const lastUpdate = useRef(0);
  useFrame((_, delta) => {
    if (lastUpdate.current > 0.2) {
      pointLightRef.current?.color.setRGB(
        0.75 + Math.random() / 4,
        0.75 + Math.random() / 4,
        0.75 + Math.random() / 4,
      );
      lastUpdate.current = 0;
    }
    lastUpdate.current += delta;
  });

  return (
    <pointLight ref={pointLightRef} position={[2, 1.6, -3.1]} intensity={0.2} />
  );
};

// Coordinates are [x,z,y]
const routes: RouteMap = {
  "": {
    cameraPosition: new Vector3(0, 1.75, 5),
    cameraTarget: new Vector3(0, 1.5, 0),
    pageTitle: "Interactive",
  },
  "/counter": {
    cameraPosition: new Vector3(-3, 1.75, 2),
    cameraTarget: new Vector3(-2.5, 1.5, -3),
    pageTitle: "The Counter",
  },
  "/arcade-cabinet": {
    cameraPosition: new Vector3(2, 1.75, -1),
    cameraTarget: new Vector3(2, 1.4, -3.6),
    pageTitle: "Arcade Cabinet",
    component: <ArcadeCabinetActive />,
  },
  "/box/1": {
    cameraPosition: new Vector3(5, 5, 5),
    cameraTarget: new Vector3(1, 1, 0),
    pageTitle: "Box 1",
    // component: <MountTest />,
  },
  "/box/2": {
    cameraPosition: new Vector3(-5, -5, 5),
    cameraTarget: new Vector3(-1, 1, 0),
    pageTitle: "Box 2",
  },
  "/404": {
    cameraPosition: new Vector3(0, 0, 10),
    cameraTarget: new Vector3(0, 0, 0),
    pageTitle: "Not Found",
  },
};

const Scene = (props: { setPageTitle?: (pageTitle: string) => void }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { nodes, materials } = useGLTF(SceneGlb);
  Object.values(materials).forEach((m: any) => {
    if (m.map) {
      m.map.minFilter = 1005;
      m.map.magFilter = 1003;
    }
  });

  return (
    <div ref={sceneRef} className="relative h-full w-full">
      <div className="absolute right-0 top-0 z-10 mr-4 mt-4">
        <FullscreenButton elementRef={sceneRef} />
      </div>
      <Canvas>
        <AspectDependantFovPerspectiveCamera fov={60} />
        <Router
          basePath="/interactive"
          setPageTitle={props.setPageTitle}
          routes={routes}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[-3.75, 2.5, -3]} intensity={2} />
          <pointLight position={[-1.55, 2.5, -3]} intensity={2} />
          <group>
            <primitive object={nodes.Room} />
            <Link
              routePath="/arcade-cabinet"
              description="Go to the arcade cabinet"
            >
              <primitive object={nodes.ArcadeCabinet1} />
            </Link>
            <Link routePath="/counter" description="Go to the counter">
              <primitive object={nodes.Counter1} />
            </Link>
            <primitive object={nodes.Cup1} />
            <primitive object={nodes.Cup2} />
          </group>
          <Link routePath="/box/1" description="Go to box 1">
            <Box position={[-1.2, 0, 0]} />
          </Link>
          <Link routePath="/box/2" description="Go to box 2">
            <Box position={[1.2, 0, 0]} />
          </Link>
          <Link routePath="/box/3" description="Go to box 3">
            <Box position={[1.2, 2.4, 0]} />
          </Link>
        </Router>
      </Canvas>
      <A11yAnnouncer />
    </div>
  );
};

export default Scene;

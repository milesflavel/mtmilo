import { Canvas, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef } from "react";
import { Router, Link } from "../../router/scene-router";
import Box from "./box";
import FullscreenButton from "../../components/interactive/fullscreen-button";
import { RouteMap } from "../../router/scene-router/router";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import SceneGlb from "../../assets/scene.glb?url";

type SceneGltf = GLTF & {
  nodes: {
    Room: THREE.Mesh;
    ArcadeCabinet1: THREE.Mesh;
    Counter1: THREE.Mesh;
    Counter2: THREE.Mesh;
  };
};

// const MountTest = () => {
//   useEffect(() => {
//     console.log("Mount", new Date().toLocaleTimeString());
//     return () => console.log("Unmount", new Date().toLocaleTimeString());
//   }, []);

//   return <></>;
// };

const routes: RouteMap = {
  "": {
    cameraPosition: new Vector3(0, 1.75, 5),
    cameraTarget: new Vector3(0, 1.5, 0),
    pageTitle: "Interactive",
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
  const { nodes } = useGLTF(SceneGlb) as SceneGltf;

  return (
    <div ref={sceneRef} className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
        <Router
          basePath="/interactive"
          setPageTitle={props.setPageTitle}
          routes={routes}
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1000}
          />
          <pointLight position={[0, 2.55, 0]} intensity={20} />
          <group>
            <mesh
              geometry={nodes.Room.geometry}
              material={nodes.Room.material}
              rotation={[Math.PI, 0, Math.PI]}
            />
            <mesh
              geometry={nodes.ArcadeCabinet1.geometry}
              material={nodes.ArcadeCabinet1.material}
              rotation={[Math.PI, 0, Math.PI]}
            />
            <mesh
              geometry={nodes.Counter1.geometry}
              material={nodes.Counter1.material}
              position={[-5, 0, -3]}
              rotation={[Math.PI, 0, Math.PI]}
            />
            <mesh
              geometry={nodes.Counter2.geometry}
              material={nodes.Counter2.material}
              position={[-5, 0, -4.8]}
            />
          </group>
          <Link routePath="/box/1">
            <Box position={[-1.2, 0, 0]} />
          </Link>
          <Link routePath="/box/2">
            <Box position={[1.2, 0, 0]} />
          </Link>
          <Link routePath="/box/3">
            <Box position={[1.2, 2.4, 0]} />
          </Link>
        </Router>
      </Canvas>
      <div className="absolute right-0 top-0 mr-4 mt-4">
        <FullscreenButton elementRef={sceneRef} />
      </div>
    </div>
  );
};

export default Scene;

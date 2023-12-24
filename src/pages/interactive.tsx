import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Router, Link } from "../router/scene-router";
import Box from "../box";
import LoadingSpinner from "../components/loading-spinner";
import Pane from "../components/pane";
import usePageTitle from "../hooks/page-title";
import FullscreenButton from "../components/interactive/fullscreen-button";

const RoomMesh = () => {
  const roomMesh = useLoader(OBJLoader, "/assets/models/room.obj");

  return <primitive object={roomMesh}></primitive>;
};

const ArcadeCabinetMesh = () => {
  const arcadeCabinetMesh = useLoader(
    OBJLoader,
    "/assets/models/arcadecabinet1.obj",
  );

  return (
    <mesh rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
      <primitive object={arcadeCabinetMesh}></primitive>
    </mesh>
  );
};

const TestScene = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sceneRef} className="relative h-full w-full">
      <Canvas className="" camera={{ position: [0, 0, 0] }}>
        <OrbitControls />
        <Router
          basePath="/interactive"
          routes={{
            "/box/1": { cameraPosition: new Vector3(5, 5, 5) },
            "/box/2": { cameraPosition: new Vector3(-5, -5, 5) },
            "/404": { cameraPosition: new Vector3(0, 0, 10) },
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1000}
          />
          <pointLight position={[-10, -10, -10]} intensity={1000} />
          <RoomMesh />
          <ArcadeCabinetMesh />
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
      <div className="absolute right-0 top-0 mr-4 mt-4 overflow-hidden rounded-2xl">
        <FullscreenButton elementRef={sceneRef} />
      </div>
    </div>
  );
};

const Interactive = () => {
  usePageTitle("Interactive - mtmilo");

  return (
    <Pane className="h-full overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <TestScene />
      </Suspense>
    </Pane>
  );
};

export default Interactive;

import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import Box from "./box";
import { Router, Link } from "./router/scene-router";

const CanvasTest = () => {
  const roomMesh = useLoader(OBJLoader, "/assets/models/room.obj");

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 0] }}
    >
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
        <primitive object={roomMesh}></primitive>
        <pointLight position={[-10, -10, -10]} intensity={1000} />
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
  );
};

export default CanvasTest;

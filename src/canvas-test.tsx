import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import Box from "./box";
import { Router, Link } from "./router/scene-router";

const CanvasTest = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 0] }}
    >
      <Router
        routerConfig={{
          "/box/1": { cameraPosition: new Vector3(5, 5, 5) },
          "/box/2": { cameraPosition: new Vector3(-5, -5, 5) },
          "/404": { cameraPosition: new Vector3(10, 0, 10) },
        }}
      ></Router>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1000}
      />
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
      <OrbitControls />
    </Canvas>
  );
};

export default CanvasTest;

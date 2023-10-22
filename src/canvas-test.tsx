import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import Box from "./box";
import useLocation from "wouter/use-location";
import { useEffect, useState } from "react";
import { Router } from "./scene-router";

function Arena() {
  const { scene } = useGLTF(
    "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@camera/public/models/collision-world.glb"
  );
  // const { to, target, lerping, setLerping } = useStore((state) => state)

  // useControls('Camera', () => {
  //   console.log('creating buttons')

  //   // using forEach
  //   // const _buttons = {}
  //   // annotations.forEach(({ title, position, lookAt }) => {
  //   //   _buttons[title] = button(() => {
  //   //     to.copy(position)
  //   //     target.copy(lookAt)
  //   //     setLerping(true)
  //   //   })
  //   // })
  //   // return _buttons

  //   // using reduce
  //   const _buttons = annotations.reduce(
  //     (acc, { title, position, lookAt }) =>
  //       Object.assign(acc, {
  //         [title]: button(() => {
  //           to.copy(position)
  //           target.copy(lookAt)
  //           setLerping(true)
  //         })
  //       }),
  //     {}
  //   )
  //   return _buttons
  // })

  // useFrame(({ camera }, delta) => {
  //   if (lerping) {
  //     camera.position.lerp(to, delta)
  //     controls.current.target.lerp(target, delta)
  //   }
  // })

  const [location] = useLocation();
  const [position, setPosition] = useState<Vector3>(new Vector3(10, 10, 10));

  useEffect(() => {
    switch (location) {
      case "/box/1":
        setPosition(new Vector3(5, 5, 5));
        break;
      case "/box/2":
        setPosition(new Vector3(-5, -5, 5));
        break;
    }
  }, [location]);

  useFrame(({ camera }, delta) => {
    camera.position.lerp(position, delta);
  });

  return (
    <>
      <primitive
        object={scene.children[0]}
        castShadow
        receiveShadow
        material-envMapIntensity={0.4}
        // onDoubleClick={({ camera, intersections }) => {
        //   to.copy(camera.position)
        //   target.copy(intersections[0].point)
        //   setLerping(true)
        // }}
      />
    </>
  );
}

const CanvasTest = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 0] }}
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1000}
      />
      <pointLight position={[-10, -10, -10]} intensity={1000} />
      <Box position={[-1.2, 0, 0]} route="/box/1" />
      <Box position={[1.2, 0, 0]} route="/box/2" />
      <OrbitControls />
      <Arena></Arena>
      <Environment
        files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@camera/public/img/drakensberg_solitary_mountain_1k.hdr"
        background
      />
    </Canvas>
  );
};

export default CanvasTest;

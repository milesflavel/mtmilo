import { Float, Outlines } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { useState } from "react";

const COLOURS = ["#ff55b3", "#1df47f", "#f8dc00", "#19e9fe", "#a577fe"];

const Box = (props: { position: Vector3 }) => {
  const [colour, setColour] = useState("#ffffff");
  const [outline, setOutline] = useState(0);

  const handleFocus = () => {
    const newColourIndex = Math.floor(Math.random() * COLOURS.length);

    setColour(COLOURS[newColourIndex]);
    setOutline(10);
  };

  const handleUnfocus = () => {
    setColour("#ffffff");
    setOutline(0);
  };

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <Float floatIntensity={1} rotationIntensity={1} position={props.position}>
      <mesh onPointerOver={handleFocus} onPointerOut={handleUnfocus}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
        <Outlines thickness={outline} color={colour} screenspace />
      </mesh>
    </Float>
  );
};

export default Box;

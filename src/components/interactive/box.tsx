import { useA11y } from "@react-three/a11y";
import { Float, Outlines } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { useEffect, useState } from "react";

const COLOURS = ["#ff55b3", "#1df47f", "#f8dc00", "#19e9fe", "#a577fe"];
const OUTLINE = 0.05;

const Box = (props: { position: Vector3 }) => {
  const a11y = useA11y();
  const [colour, setColour] = useState("#fff");

  useEffect(() => {
    if (a11y.focus || a11y.hover) {
      const newColourIndex = Math.floor(Math.random() * COLOURS.length);
      setColour(COLOURS[newColourIndex]);
    }
  }, [a11y.focus, a11y.hover]);

  const showOutlineHover = a11y.focus || a11y.hover;
  const showOutlineFocus = a11y.focus;

  return (
    <Float floatIntensity={1} rotationIntensity={1} position={props.position}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
        <Outlines
          thickness={OUTLINE}
          color={colour}
          transparent={!showOutlineHover}
          opacity={0}
        />
        <Outlines
          thickness={OUTLINE * 2}
          color="#000"
          transparent={!showOutlineFocus}
          opacity={0}
        />
        <Outlines
          thickness={OUTLINE * 3}
          color="#fff"
          transparent={!showOutlineFocus}
          opacity={0}
        />
      </mesh>
    </Float>
  );
};

export default Box;

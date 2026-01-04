import { useA11y } from "@react-three/a11y";
import { Outlines } from "@react-three/drei";
import { cloneElement, ReactElement, useEffect, useState } from "react";

const COLOURS = ["#ff55b3", "#1df47f", "#f8dc00", "#19e9fe", "#a577fe"];
const OUTLINE = 0.05;

const Clickable = (props: { children: ReactElement }) => {
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

  const outlines = [
    <Outlines
      key="outline1"
      thickness={OUTLINE * 1}
      color={colour}
      transparent={!showOutlineHover}
      opacity={0}
      screenspace
    />,
    <Outlines
      key="outline2"
      thickness={OUTLINE * 2}
      color="#000"
      transparent={!showOutlineFocus}
      opacity={0}
      screenspace
    />,
    <Outlines
      key="outline3"
      thickness={OUTLINE * 3}
      color="#fff"
      transparent={!showOutlineFocus}
      opacity={0}
      screenspace
    />,
  ];

  return cloneElement(
    props.children,
    {
      ...(props.children.props ?? {}),
    },
    props.children.props &&
      props.children.props.children &&
      Array.isArray(props.children.props.children)
      ? [...props.children.props.children, ...outlines]
      : [...outlines],
  );
};

export default Clickable;

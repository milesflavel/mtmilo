import { useState } from "react";
import { Link } from "wouter";

const COLOURS = [
  "var(--palette-accent1)",
  "var(--palette-accent2)",
  "var(--palette-accent3)",
  "var(--palette-accent4)",
  "var(--palette-accent5)",
];

const HeaderLink = (props: {
  to?: string;
  href?: string;
  children: React.ReactNode;
}) => {
  const [colour, setColour] = useState("var(--palatte-text)");

  const handleFocus = () => {
    const newColourIndex = Math.floor(Math.random() * COLOURS.length);

    setColour(COLOURS[newColourIndex]);
  };

  const handleUnfocus = () => {
    setColour("var(--palatte-text)");
  };

  return (
    <>
      {props.to ? (
        <Link to={props.to}>
          <a
            style={{ display: "inline-block", color: colour }}
            onMouseEnter={handleFocus}
            onMouseLeave={handleUnfocus}
            onFocus={handleFocus}
            onBlur={handleUnfocus}
          >
            {props.children}
          </a>
        </Link>
      ) : (
        <a
          href={props.href}
          style={{ display: "inline-block", color: colour }}
          onMouseEnter={handleFocus}
          onMouseLeave={handleUnfocus}
          onFocus={handleFocus}
          onBlur={handleUnfocus}
        >
          {props.children}
        </a>
      )}
    </>
  );
};

export default HeaderLink;

import { useState } from "react";
import { Link } from "wouter";

const COLOURS = [
  "text-accent-pink",
  "text-accent-green",
  "text-accent-yellow",
  "text-accent-cyan",
  "text-accent-purple",
];

const HeaderLink = (props: {
  to?: string;
  href?: string;
  children: React.ReactNode;
}) => {
  const [colourClass, setColourClass] = useState("text-white");

  const handleFocus = () => {
    const newColourIndex = Math.floor(Math.random() * COLOURS.length);

    setColourClass(COLOURS[newColourIndex]);
  };

  const handleUnfocus = () => {
    setColourClass("text-white");
  };

  return (
    <>
      {props.to ? (
        <Link to={props.to}>
          <a
            className={colourClass}
            onMouseEnter={handleFocus}
            onMouseLeave={handleUnfocus}
            onFocus={handleFocus}
            onBlur={handleUnfocus}
            onTouchStart={handleFocus}
            onTouchEnd={handleUnfocus}
          >
            {props.children}
          </a>
        </Link>
      ) : (
        <a
          href={props.href}
          className={colourClass}
          onMouseEnter={handleFocus}
          onMouseLeave={handleUnfocus}
          onFocus={handleFocus}
          onBlur={handleUnfocus}
          onTouchStart={handleFocus}
          onTouchEnd={handleUnfocus}
        >
          {props.children}
        </a>
      )}
    </>
  );
};

export default HeaderLink;

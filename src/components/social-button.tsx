import { createElement, useState } from "react";
import LogoGithubSvg from "../images/logo-github.svg?react";
import LogoTwitterSvg from "../images/logo-twitter.svg?react";

const LOGOS = {
  github: LogoGithubSvg,
  twitter: LogoTwitterSvg,
};
type LogoType = keyof typeof LOGOS;

const COLOURS = [
  "var(--palette-accent1)",
  "var(--palette-accent2)",
  "var(--palette-accent3)",
  "var(--palette-accent4)",
  "var(--palette-accent5)",
];

const SocialButton = (props: { url: string; logo: LogoType }) => {
  const [colour, setColour] = useState("var(--palatte-text)");

  const Logo = () =>
    createElement(LOGOS[props.logo], {
      style: {
        width: "calc(var(--sizing-padding) * 2)",
        height: "calc(var(--sizing-padding) * 2)",
      },
    });

  const handleFocus = () => {
    const newColourIndex = Math.floor(Math.random() * COLOURS.length);

    setColour(COLOURS[newColourIndex]);
  };

  const handleUnfocus = () => {
    setColour("var(--palatte-text)");
  };

  return (
    <a
      href={props.url}
      style={{ display: "inline-block" }}
      onMouseEnter={handleFocus}
      onMouseLeave={handleUnfocus}
      onFocus={handleFocus}
      onBlur={handleUnfocus}
    >
      <div
        style={{
          width: "calc(var(--sizing-radius) * 2)",
          height: "calc(var(--sizing-radius) * 2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: colour,
        }}
      >
        <Logo />
      </div>
    </a>
  );
};

export default SocialButton;

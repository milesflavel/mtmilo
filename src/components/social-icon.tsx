import { createElement } from "react";
import LogoGithubSvg from "../images/logo-github.svg?react";
import LogoTwitterSvg from "../images/logo-twitter.svg?react";

const LOGOS = {
  github: LogoGithubSvg,
  twitter: LogoTwitterSvg,
};
type LogoType = keyof typeof LOGOS;

const SocialIcon = (props: { logo: LogoType }) => {
  const Logo = () =>
    createElement(LOGOS[props.logo], {
      className: "w-8 h-8",
    });

  return <Logo />;
};

export default SocialIcon;

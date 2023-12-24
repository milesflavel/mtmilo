import { createElement } from "react";
import BurgerMenuSvg from "../images/icons/burger-menu.svg?react";
import CloseSvg from "../images/icons/close.svg?react";
import GithubSvg from "../images/icons/github.svg?react";
import TwitterSvg from "../images/icons/twitter.svg?react";
import FullscreenEnableSvg from "../images/icons/fullscreen-enable.svg?react";
import FullscreenDisableSvg from "../images/icons/fullscreen-disable.svg?react";

const ICONS = {
  burgerMenu: BurgerMenuSvg,
  close: CloseSvg,
  fullscreenEnable: FullscreenEnableSvg,
  fullscreenDisable: FullscreenDisableSvg,
  github: GithubSvg,
  twitter: TwitterSvg,
};
type LogoType = keyof typeof ICONS;

const Icon = (props: { icon: LogoType }) => {
  const IconElement = () =>
    createElement(ICONS[props.icon], {
      className: "w-8 h-8",
    });

  return <IconElement />;
};

export default Icon;

import BurgerMenuSvg from "../images/icons/burger-menu.svg";
import CloseSvg from "../images/icons/close.svg";
import GithubSvg from "../images/icons/github.svg";
import TwitterSvg from "../images/icons/twitter.svg";
import FullscreenEnableSvg from "../images/icons/fullscreen-enable.svg";
import FullscreenDisableSvg from "../images/icons/fullscreen-disable.svg";
import ChevronLeftSvg from "../images/icons/chevron-left.svg";
import ChevronRightSvg from "../images/icons/chevron-right.svg";
import ChevronUpSvg from "../images/icons/chevron-up.svg";
import ChevronDownSvg from "../images/icons/chevron-down.svg";

const ICONS = {
  burgerMenu: BurgerMenuSvg,
  close: CloseSvg,
  chevronLeft: ChevronLeftSvg,
  chevronRight: ChevronRightSvg,
  chevronUp: ChevronUpSvg,
  chevronDown: ChevronDownSvg,
  fullscreenEnable: FullscreenEnableSvg,
  fullscreenDisable: FullscreenDisableSvg,
  github: GithubSvg,
  twitter: TwitterSvg,
};
type LogoType = keyof typeof ICONS;

const Icon = (props: { icon: LogoType }) => {
  return (
    <svg
      className="h-8 w-8"
      width="100"
      height="100"
      viewBox="0, 0, 100, 100"
      preserveAspectRatio="none"
    >
      <use href={`${ICONS[props.icon]}#icon`} />
    </svg>
  );
};

export default Icon;

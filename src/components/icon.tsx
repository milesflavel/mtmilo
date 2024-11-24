import BurgerMenuSvg from "../assets/images/icons/burger-menu.svg";
import CloseSvg from "../assets/images/icons/close.svg";
import GithubSvg from "../assets/images/icons/github.svg";
import TwitterSvg from "../assets/images/icons/twitter.svg";
import BlueskySvg from "../assets/images/icons/bluesky.svg";
import FullscreenEnableSvg from "../assets/images/icons/fullscreen-enable.svg";
import FullscreenDisableSvg from "../assets/images/icons/fullscreen-disable.svg";
import ChevronLeftSvg from "../assets/images/icons/chevron-left.svg";
import ChevronRightSvg from "../assets/images/icons/chevron-right.svg";
import ChevronUpSvg from "../assets/images/icons/chevron-up.svg";
import ChevronDownSvg from "../assets/images/icons/chevron-down.svg";

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
  bluesky: BlueskySvg,
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

import BurgerMenuSvg from "../assets/images/icons/burger-menu.svg?url&no-inline";
import CloseSvg from "../assets/images/icons/close.svg?url&no-inline";
import GithubSvg from "../assets/images/icons/github.svg?url&no-inline";
import TwitterSvg from "../assets/images/icons/twitter.svg?url&no-inline";
import BlueskySvg from "../assets/images/icons/bluesky.svg?url&no-inline";
import FullscreenEnableSvg from "../assets/images/icons/fullscreen-enable.svg?url&no-inline";
import FullscreenDisableSvg from "../assets/images/icons/fullscreen-disable.svg?url&no-inline";
import ChevronLeftSvg from "../assets/images/icons/chevron-left.svg?url&no-inline";
import ChevronRightSvg from "../assets/images/icons/chevron-right.svg?url&no-inline";
import ChevronUpSvg from "../assets/images/icons/chevron-up.svg?url&no-inline";
import ChevronDownSvg from "../assets/images/icons/chevron-down.svg?url&no-inline";

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

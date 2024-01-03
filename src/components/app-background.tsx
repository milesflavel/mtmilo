import AppBackgroundSvg from "../images/app-background.svg?react";

const AppBackground = () => (
  <div className="absolute left-0 top-0 -z-10 h-full w-full">
    <AppBackgroundSvg aria-hidden />
  </div>
);

export default AppBackground;

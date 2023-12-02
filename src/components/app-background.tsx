import AppBackgroundSvg from "../images/app-background.svg?react";

const AppBackground = () => (
  <div className="absolute left-0 top-0 w-full h-full -z-10">
    <AppBackgroundSvg />
  </div>
);

export default AppBackground;

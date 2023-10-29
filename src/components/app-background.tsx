import AppBackgroundSvg from "../images/app-background.svg?react";

const AppBackground = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    }}
  >
    <AppBackgroundSvg />
  </div>
);

export default AppBackground;

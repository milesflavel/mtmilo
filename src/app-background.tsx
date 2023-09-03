import AppBackgroundSvg from "./app-background.svg?raw";

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
    dangerouslySetInnerHTML={{ __html: AppBackgroundSvg }}
  ></div>
);

export default AppBackground;

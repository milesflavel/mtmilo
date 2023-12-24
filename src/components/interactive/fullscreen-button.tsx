import { useEffect, useState } from "react";
import Icon from "../icon";

const FullscreenButton = (props: {
  elementRef: React.RefObject<HTMLElement>;
}) => {
  // Fullscreen implementation from https://www.aha.io/engineering/articles/using-the-fullscreen-api-with-react
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Watch for fullscreenchange
  useEffect(() => {
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const onFullscreenChange = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };
  const toggleFullscreen = () => {
    isFullscreen
      ? document.exitFullscreen()
      : props.elementRef.current?.requestFullscreen();
  };

  return (
    <button
      className="rounded-2xl bg-purple-500/10 p-3 hover:bg-purple-500/20 focus:bg-purple-500/20"
      onClick={toggleFullscreen}
      title={isFullscreen ? "Exit full screen" : "Full screen"}
      type="button"
    >
      {isFullscreen ? (
        <Icon icon="fullscreenDisable" />
      ) : (
        <Icon icon="fullscreenEnable" />
      )}
    </button>
  );
};

export default FullscreenButton;

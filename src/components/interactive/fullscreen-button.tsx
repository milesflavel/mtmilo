import { useEffect, useState } from "react";
import FullscreenDisableSvg from "../../images/fullscreen-disable.svg?react";
import FullscreenEnableSvg from "../../images/fullscreen-enable.svg?react";

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
        <FullscreenDisableSvg className="h-8 w-8" />
      ) : (
        <FullscreenEnableSvg className="h-8 w-8" />
      )}
    </button>
  );
};

export default FullscreenButton;

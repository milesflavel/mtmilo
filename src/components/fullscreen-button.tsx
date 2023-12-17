import { useEffect, useState } from "react";

const FullscreenButton = (props: {
  elementRef: React.RefObject<HTMLElement>;
}) => {
  // https://www.aha.io/engineering/articles/using-the-fullscreen-api-with-react
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
    <div
      className={`absolute left-0 top-0 h-10 w-10 ${
        isFullscreen ? "bg-red-500" : "bg-blue-500"
      }`}
      onClick={toggleFullscreen}
    ></div>
  );
};

export default FullscreenButton;

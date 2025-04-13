import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const AspectDependantFovPerspectiveCamera = (
  props: PerspectiveCameraProps,
) => {
  const perspectiveCamera = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!perspectiveCamera.current || !props.fov) {
        return;
      }

      if (perspectiveCamera.current.aspect > 1) {
        perspectiveCamera.current.fov = props.fov;
      } else {
        // See https://stackoverflow.com/a/48646702
        perspectiveCamera.current.fov =
          (Math.atan(
            Math.tan(((props.fov / 2) * Math.PI) / 180) /
              perspectiveCamera.current.aspect,
          ) *
            2 *
            180) /
          Math.PI;
      }

      perspectiveCamera.current.updateProjectionMatrix();
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.fov]);

  return <PerspectiveCamera makeDefault ref={perspectiveCamera} {...props} />;
};

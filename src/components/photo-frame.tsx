import { useMemo } from "react";

const ROTATE_CLASSES = [
  "-rotate-3",
  "-rotate-2",
  "-rotate-1",
  "rotate-0",
  "rotate-1",
  "rotate-2",
  "rotate-3",
] as const;
type RotateClass = (typeof ROTATE_CLASSES)[number];

const PhotoFrame = (props: {
  src: string;
  alt: string;
  caption: string;
  rotateClass?: RotateClass;
}) => {
  const rotateClass = useMemo(() => {
    if (props.rotateClass) {
      return props.rotateClass;
    }

    const filteredRotateClasses = ROTATE_CLASSES.filter(
      (className) => className !== "rotate-0",
    );

    return filteredRotateClasses[
      Math.floor(Math.random() * filteredRotateClasses.length)
    ];
  }, [props.rotateClass]);

  return (
    <figure
      className={`${rotateClass} scale-95 rounded-sm bg-white p-4 pb-0 transition duration-200 ease-in-out  hover:rotate-0 hover:scale-100`}
    >
      <img
        src={props.src}
        alt={props.alt}
        className="aspect-square w-full rounded-sm object-cover"
      />
      <figcaption className="py-4 text-center font-mono text-xl font-bold text-black">
        {props.caption}
      </figcaption>
    </figure>
  );
};

export default PhotoFrame;

const PhotoFrame = (props: { src: string; caption: string }) => {
  return (
    <figure className="rotate-3 scale-95 rounded-sm bg-white p-4 pb-0 transition duration-200 ease-in-out hover:rotate-0 hover:scale-100">
      <img
        src={props.src}
        className="aspect-square w-full rounded-sm object-cover"
      />
      <figcaption className="py-4 text-center font-mono text-xl font-bold text-black">
        {props.caption}
      </figcaption>
    </figure>
  );
};

export default PhotoFrame;

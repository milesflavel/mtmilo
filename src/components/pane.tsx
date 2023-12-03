const Pane = (
  props: React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    className?: string;
  }
) => {
  return (
    <div
      className={`bg-purple-900/80 backdrop-blur rounded-3xl ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Pane;

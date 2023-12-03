const Pane = (
  props: React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    className?: string;
  },
) => {
  return (
    <div
      className={`rounded-3xl bg-purple-900/80 backdrop-blur ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Pane;

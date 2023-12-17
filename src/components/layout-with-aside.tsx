import Pane from "../components/pane";

const LayoutWithAside = (props: {
  main: React.ReactNode;
  aside?: React.ReactNode;
}) => {
  return (
    <div className="flex h-full flex-col flex-nowrap gap-4 overflow-auto md:flex-row md:justify-between">
      <div className="h-fit w-full md:mx-auto md:max-w-2xl">
        <Pane className="flex flex-grow justify-center p-4 md:h-full">
          <main className="w-full px-4">{props.main}</main>
        </Pane>
      </div>
      <Pane className="flex h-fit w-full justify-center p-4 md:w-80">
        <aside>{props.aside}</aside>
      </Pane>
    </div>
  );
};

export default LayoutWithAside;

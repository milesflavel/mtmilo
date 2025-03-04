import Pane from "../components/pane";
import usePageTitle from "../hooks/page-title";
import ErrorNotFound from "../components/error-not-found";
import useOpenGraph from "../hooks/open-graph";

const Error404Page = () => {
  usePageTitle("Not Found");
  useOpenGraph({});

  return (
    <Pane className="h-full overflow-hidden">
      <main className="h-full">
        <ErrorNotFound />
      </main>
    </Pane>
  );
};

export default Error404Page;

import { Suspense } from "react";
import LoadingSpinner from "../components/loading-spinner";
import Pane from "../components/pane";
import usePageTitle from "../hooks/page-title";
import Scene from "../components/interactive/scene";

const Interactive = () => {
  const setPageTitle = usePageTitle("Interactive - mtmilo");

  return (
    <Pane className="h-full overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <Scene setPageTitle={setPageTitle} />
      </Suspense>
    </Pane>
  );
};

export default Interactive;

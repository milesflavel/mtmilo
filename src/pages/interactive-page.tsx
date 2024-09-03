import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/loading-spinner";
import Pane from "../components/pane";
import usePageTitle from "../hooks/page-title";

const Scene = lazy(() => import("../components/interactive/scene"));

const InteractivePage = () => {
  const setPageTitle = usePageTitle("Interactive");

  return (
    <Pane className="h-full overflow-hidden">
      <main className="h-full">
        <Suspense fallback={<LoadingSpinner />}>
          <Scene setPageTitle={setPageTitle} />
        </Suspense>
      </main>
    </Pane>
  );
};

export default InteractivePage;

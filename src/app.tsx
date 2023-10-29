import { useLocation, Route, Switch } from "wouter";
import AppBackground from "./components/app-background";
import CanvasTest from "./canvas-test";
import Blog from "./pages/blog";

const App = () => {
  const [location] = useLocation();

  return (
    <>
      <AppBackground />
      <div>
        <h1>{location}</h1>
      </div>
      <div style={{ flexGrow: 1, padding: "var(--sizing-padding)" }}>
        <div
          style={{
            height: "100%",
            backgroundColor: "var(--palette-background-overlay)",
            borderRadius: "var(--sizing-radius)",
            overflow: "hidden",
          }}
        >
          <Switch>
            <Route path="/blog/:blogId*">
              <Blog />
            </Route>
            <Route path="/interactive/:_*">
              <CanvasTest />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;

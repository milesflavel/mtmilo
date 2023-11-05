import { useLocation, Route, Switch } from "wouter";
import AppBackground from "./components/app-background";
import CanvasTest from "./canvas-test";
import Blog from "./pages/blog";
import SocialButton from "./components/social-button";

const App = () => {
  return (
    <>
      <AppBackground />
      <div style={{ padding: "var(--sizing-padding)" }}>
        <div
          style={{
            height: "calc(var(--sizing-radius) * 2)",
            backgroundColor: "var(--palette-background-overlay)",
            borderRadius: "var(--sizing-radius)",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "var(--sizing-radius)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "calc(var(--sizing-padding) * 2)",
              }}
            >
              LOGO
            </div>
          </div>
          <div>
            <SocialButton
              url="https://twitter.com/milesflavel"
              logo="twitter"
            />
            <SocialButton
              url="https://github.com/milesflavel/dev-canvas-app"
              logo="github"
            />
          </div>
        </div>
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

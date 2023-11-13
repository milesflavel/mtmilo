import { Route, Switch } from "wouter";
import AppBackground from "./components/app-background";
import CanvasTest from "./canvas-test";
import Blog from "./pages/blog";
import LogoMtmiloSvg from "./images/logo-mtmilo.svg?react";
import HeaderLink from "./components/header-link";
import SocialIcon from "./components/social-icon";
import Home from "./pages/home";

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
            paddingLeft: "var(--sizing-padding)",
            paddingRight: "var(--sizing-padding)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sizing-padding)",
            }}
          >
            <HeaderLink to="/">
              <LogoMtmiloSvg
                style={{
                  height: "calc(var(--sizing-radius) * 1.3)",
                  width: "auto",
                }}
              />
            </HeaderLink>
            <HeaderLink to="/blog">Blog</HeaderLink>
            <HeaderLink to="/interactive">Interactive</HeaderLink>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sizing-padding)",
            }}
          >
            <HeaderLink href="https://twitter.com/milesflavel">
              <SocialIcon logo="twitter" />
            </HeaderLink>
            <HeaderLink href="https://github.com/milesflavel/dev-canvas-app">
              <SocialIcon logo="github" />
            </HeaderLink>
          </div>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          padding: "var(--sizing-padding)",
          overflow: "hidden",
        }}
      >
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/blog/:blogId*">
            <Blog />
          </Route>
          <Route path="/interactive/:_*">
            <CanvasTest />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;

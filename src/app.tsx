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
      <div className="p-4">
        <div className="bg-purple-900/80 backdrop-blur h-16 rounded-3xl overflow-hidden flex justify-between px-4">
          <div className="flex items-center gap-4">
            <HeaderLink to="/">
              <LogoMtmiloSvg className="h-10 w-auto" />
            </HeaderLink>
            <HeaderLink to="/blog">Blog</HeaderLink>
            <HeaderLink to="/interactive">Interactive</HeaderLink>
          </div>
          <div className="flex items-center gap-4">
            <HeaderLink href="https://twitter.com/milesflavel">
              <SocialIcon logo="twitter" />
            </HeaderLink>
            <HeaderLink href="https://github.com/milesflavel/dev-canvas-app">
              <SocialIcon logo="github" />
            </HeaderLink>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-hidden">
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

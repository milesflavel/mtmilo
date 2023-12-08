import { Route, Switch } from "wouter";
import AppBackground from "./components/app-background";
import CanvasTest from "./canvas-test";
import Blog from "./pages/blog";
import LogoMtmiloSvg from "./images/logo-mtmilo.svg?react";
import HeaderLink from "./components/header-link";
import SocialIcon from "./components/social-icon";
import Home from "./pages/home";
import Pane from "./components/pane";

const App = () => {
  return (
    <>
      <AppBackground />
      <nav className="p-4">
        <Pane className="flex h-16 justify-between px-4">
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
            <HeaderLink href="https://github.com/milesflavel/mtmilo">
              <SocialIcon logo="github" />
            </HeaderLink>
          </div>
        </Pane>
      </nav>
      <main className="flex-grow overflow-hidden p-4">
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
      </main>
    </>
  );
};

export default App;

import { Route, Switch } from "wouter";
import AppBackground from "./components/app-background";
import Interactive from "./pages/interactive";
import Blog from "./pages/blog";
import Home from "./pages/home";
import Header from "./components/header";

const App = () => {
  return (
    <>
      <AppBackground />
      <nav className="z-10">
        <Header />
      </nav>
      <div className="flex-grow overflow-hidden">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/blog/:blogId*">
            <Blog />
          </Route>
          <Route path="/interactive/:_*">
            <Interactive />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;

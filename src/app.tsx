import { Route, Switch } from "wouter";
import AppBackground from "./components/app-background";
import Header from "./components/header";
import HomePage from "./pages/home-page";
import BlogArticlePage from "./pages/blog-article-page";
import BlogIndexPage from "./pages/blog-index-page";
import InteractivePage from "./pages/interactive-page";
import Error404Page from "./pages/error-404-page";

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
            <HomePage />
          </Route>
          <Route path="/blog">
            <BlogIndexPage />
          </Route>
          <Route path="/blog/:blogId">
            <BlogArticlePage />
          </Route>
          <Route path="/interactive/:_*">
            <InteractivePage />
          </Route>
          <Route>
            <Error404Page />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;

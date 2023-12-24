import { useEffect, useState } from "react";
import Pane from "../components/pane";
import HeaderLink from "../components/header-link";
import Icon from "../components/icon";
import LogoMtmiloSvg from "../images/logo-mtmilo.svg?react";
import useLocation from "wouter/use-location";

const Header = () => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setNavMenuOpen(false);
  }, [location]);

  return (
    <Pane className="flex h-16 justify-between px-4">
      {/* Not so small screen */}
      <div className="hidden items-center gap-4 sm:flex">
        <HeaderLink to="/">
          <LogoMtmiloSvg className="h-10 w-auto" />
        </HeaderLink>
        <HeaderLink to="/blog">Blog</HeaderLink>
        <HeaderLink to="/interactive">Interactive</HeaderLink>
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        <HeaderLink href="https://twitter.com/milesflavel">
          <Icon icon="twitter" />
        </HeaderLink>
        <HeaderLink href="https://github.com/milesflavel/mtmilo">
          <Icon icon="github" />
        </HeaderLink>
      </div>
      {/* Small screen */}
      <div className="flex items-center gap-4 sm:hidden">
        <HeaderLink to="/">
          <LogoMtmiloSvg className="h-10 w-auto" />
        </HeaderLink>
      </div>
      <div className="flex items-center gap-4 sm:hidden">
        <button onClick={() => setNavMenuOpen(!navMenuOpen)}>
          <Icon icon={navMenuOpen ? "close" : "burgerMenu"} />
        </button>
      </div>
      {navMenuOpen && (
        <div
          className="absolute left-0 top-0 -m-4 h-screen-dvh w-screen-dvw pt-24 sm:hidden"
          onClick={() => setNavMenuOpen(false)}
        >
          <div className="flex flex-col gap-4 bg-purple-900 p-4">
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/blog">Blog</HeaderLink>
            <HeaderLink to="/interactive">Interactive</HeaderLink>
            <HeaderLink href="https://twitter.com/milesflavel">
              <span className="inline">Twitter</span>
              <Icon icon="twitter" />
            </HeaderLink>
            <HeaderLink href="https://github.com/milesflavel/mtmilo">
              <span>Github</span>
              <Icon icon="github" />
            </HeaderLink>
          </div>
        </div>
      )}
    </Pane>
  );
};

export default Header;

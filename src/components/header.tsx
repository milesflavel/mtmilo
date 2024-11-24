import { useEffect, useState } from "react";
import Pane from "../components/pane";
import HeaderLink from "../components/header-link";
import Icon from "../components/icon";
import LogoMtmiloSvg from "../assets/images/logo-mtmilo.svg?react";
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
        <HeaderLink to="/" title="Home page">
          <LogoMtmiloSvg className="h-10 w-auto" />
        </HeaderLink>
        <HeaderLink to="/blog" title="Blog page">
          Blog
        </HeaderLink>
        <HeaderLink to="/interactive" title="Interactive page">
          Interactive
        </HeaderLink>
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        <HeaderLink
          href="https://bsky.app/profile/mtmilo.net"
          title="mtmilo on BlueSky"
        >
          <Icon icon="bluesky" />
        </HeaderLink>
        <HeaderLink
          href="https://github.com/milesflavel/mtmilo"
          title="mtmilo on GitHub"
        >
          <Icon icon="github" />
        </HeaderLink>
      </div>
      {/* Small screen */}
      <div className="flex items-center gap-4 sm:hidden">
        <HeaderLink to="/" title="Home page">
          <LogoMtmiloSvg className="h-10 w-auto" />
        </HeaderLink>
      </div>
      <div className="flex items-center gap-4 sm:hidden">
        <button
          onClick={() => setNavMenuOpen(!navMenuOpen)}
          title={navMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <Icon icon={navMenuOpen ? "close" : "burgerMenu"} />
        </button>
      </div>
      {navMenuOpen && (
        <div
          className="absolute left-0 top-0 -m-4 h-screen-dvh w-screen-dvw pt-24 sm:hidden"
          onClick={() => setNavMenuOpen(false)}
        >
          <div className="flex flex-col items-center gap-4 bg-purple-900 p-4">
            <HeaderLink to="/" title="Home page">
              Home
            </HeaderLink>
            <HeaderLink to="/blog" title="Blog page">
              Blog
            </HeaderLink>
            <HeaderLink to="/interactive" title="Interactive page">
              Interactive
            </HeaderLink>
            <HeaderLink
              href="https://twitter.com/milesflavel"
              title="Miles Flavel on Twitter"
            >
              <span className="inline-flex items-center gap-4">
                Twitter <Icon icon="twitter" />
              </span>
            </HeaderLink>
            <HeaderLink
              href="https://github.com/milesflavel/mtmilo"
              title="mtmilo on GitHub"
            >
              <span className="inline-flex items-center gap-4">
                GitHub <Icon icon="github" />
              </span>
            </HeaderLink>
          </div>
        </div>
      )}
    </Pane>
  );
};

export default Header;

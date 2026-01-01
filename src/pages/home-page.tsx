import LayoutWithAside from "../components/layout-with-aside";
import usePageTitle from "../hooks/page-title";
import ProfilePhoto from "../assets/images/profile-photo.jpg";
import LogoMtmiloAnimated from "../assets/images/logo-mtmilo-animated.svg";
import useOpenGraph from "../hooks/open-graph";
import PhotoFrame from "../components/photo-frame";

const HomePage = () => {
  usePageTitle("Home");
  useOpenGraph({});

  return (
    <LayoutWithAside
      main={
        <section className="prose prose-neutral prose-invert">
          <header>
            {/* <LogoMtmiloAnimated /> */}
            <img
              src={LogoMtmiloAnimated}
              className="mx-auto"
              alt="Mt Milo logo"
            />
            <h1 className=" text-center">&mdash;&nbsp;Welcome&nbsp;&mdash;</h1>
          </header>

          <h2>Who am I?</h2>
          <p>
            I am a fullstack web dev with over 12 years of experience across a
            broad range of technologies. In recent years, I've been focussing on
            User Experience (UX) and Accessibility (A11Y), which are each a
            rabbit-hole unto themself but have been fascinating nonetheless.
          </p>

          <h2>Outside of work</h2>
          <p>
            I'm a massive nerd; I play D&D, enjoy electronics, listen to an
            unreasonable amount of game soundtracks, and have amassed a small
            collection of <i>mostly broken</i> cameras.
          </p>
          <p>
            I am passionate about sustainability and public transport. I walk
            everywhere and take the stairs whenever possible. I'm an advocate
            for{" "}
            <a href="https://en.wikipedia.org/wiki/Right_to_repair">
              Right to Repair
            </a>
            , believing that if pay for and receive a physical item, then you
            own it and should be free to repair and modify it as you wish.
          </p>
        </section>
      }
      aside={
        <>
          <PhotoFrame src={ProfilePhoto} caption="Miles" alt="Photo of Miles" />
          <ul className="list-disc pl-10 pt-2">
            <li>Passionate Dev</li>
            <li>Big Nerd</li>
            <li>Advocate</li>
            <li>Always Learning</li>
          </ul>
        </>
      }
    />
  );
};

export default HomePage;

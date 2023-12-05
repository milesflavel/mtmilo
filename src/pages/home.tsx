import Pane from "../components/pane";
import ProfilePhoto from "../images/profile-photo.jpg";

const Home = () => {
  return (
    <div className="flex h-full flex-row flex-wrap justify-between gap-4 overflow-auto md:flex-nowrap">
      <Pane className="flex flex-grow justify-center p-4">
        <section className="prose prose-neutral prose-invert">
          <h1 className="text-center">Welcome!</h1>

          <h2>What is this?</h2>
          <p>
            Part portfolio, part blog&ndash; This is my dumping ground for
            ideas, projects and journeys into doing things the hard way.
          </p>

          <h2>What's the vision here?</h2>
          <p>
            I'm a full-time, full-stack, full-on developer with no website. The
            plan here is to change that. I've got a soft spot for
            non-traditional websites, so the long-term goal is for this whole
            site to exist as an interactive experience.
          </p>
        </section>
      </Pane>
      <Pane className="flex h-fit w-full justify-center p-4 md:w-80">
        <aside>
          <figure>
            <img
              src={ProfilePhoto}
              className="rounded-2xl border-4 border-solid border-accent-purple"
            />
            <figcaption className="py-3 text-center text-xl font-bold">
              Miles Flavel
            </figcaption>
          </figure>
          <ul className="list-disc pl-10">
            <li>Fullstack Dev</li>
            <li>Transit Nerd</li>
            <li>Repair Advocate</li>
          </ul>
        </aside>
      </Pane>
    </div>
  );
};

export default Home;

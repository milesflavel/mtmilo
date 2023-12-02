import ProfilePhoto from "../images/profile-photo.jpg";

const Home = () => {
  return (
    <div className="flex h-full flex-row justify-between gap-4">
      <div className="bg-purple-900/80 backdrop-blur flex-grow p-4 rounded-3xl">
        <h1 className="text-center">Welcome!</h1>

        <h2>What is this?</h2>
        <p>
          Part portfolio, part blog&ndash; This is my dumping ground for ideas,
          projects and journeys into doing things the hard way.
        </p>

        <h2>What's the vision here?</h2>
        <p>
          I'm a full-time, full-stack, full-on developer with no website. The
          plan here is to change that. I've got a soft spot for non-traditional
          websites, so the long-term goal is for this whole site to exist as an
          interactive experience.
        </p>
      </div>
      <div className="bg-purple-900/80 backdrop-blur h-fit p-4 rounded-3xl">
        <img
          src={ProfilePhoto}
          className="w-80 rounded-2xl border-solid border-4 border-accent-purple"
        />
        <h2 className="text-center">Miles Flavel</h2>
        <ul>
          <li>Fullstack Dev</li>
          <li>Transit Nerd</li>
          <li>Repair Advocate</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

import ProfilePhoto from "../images/profile-photo.jpg";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "var(--sizing-padding)",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          padding: "var(--sizing-padding)",
          backgroundColor: "var(--palette-background-overlay)",
          borderRadius: "var(--sizing-radius)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome!</h1>

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
      <div
        style={{
          padding: "var(--sizing-padding)",
          backgroundColor: "var(--palette-background-overlay)",
          borderRadius: "var(--sizing-radius)",
          height: "fit-content",
        }}
      >
        <img
          src={ProfilePhoto}
          style={{
            width: "300px",
            borderRadius: "var(--sizing-padding)",
            border: "3px solid var(--palette-accent5)",
          }}
        />
        <h2 style={{ textAlign: "center" }}>Miles Flavel</h2>
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

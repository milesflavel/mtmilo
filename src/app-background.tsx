const AppBackground = () => (
  <svg
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="BackgroundPattern"
        patternUnits="userSpaceOnUse"
        width="100"
        height="100"
        patternTransform="scale(4) rotate(0)"
      >
        <use href="#BackgroundDebugBounds" />
        <use
          href="#BackgroundShapeSquiggle"
          stroke="var(--palette-accent2)"
          x="0"
          y="0"
        />
        <use
          href="#BackgroundShapeSquiggle"
          stroke="var(--palette-accent3)"
          x="20"
          y="0"
        />
      </pattern>

      {/* Debug Bounds */}
      <rect
        id="BackgroundDebugBounds"
        x="0"
        y="0"
        width="100"
        height="100"
        fill="none"
        stroke="red"
      ></rect>

      {/* Squiggle */}
      <path
        id="BackgroundShapeSquiggle"
        d="M 5 40 C 20 5, 32.5 5, 47.5 40 S 75 75, 90 40"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      />
    </defs>
    <rect width="100%" height="100%" fill="url(#BackgroundPattern)"></rect>
  </svg>
);

export default AppBackground;

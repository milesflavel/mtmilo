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
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
        fill="none"
        vector-effect="non-scaling-stroke"
      >
        <use href="#BackgroundDebugBounds" />

        <use
          href="#BackgroundShapeTriangle"
          stroke="var(--palette-accent1)"
          transform="translate(10 10) scale(0.1)"
        />
        <use
          href="#BackgroundShapeSquiggle"
          stroke="var(--palette-accent2)"
          transform="translate(27 10) scale(0.2)"
        />
        <use
          href="#BackgroundShapeZigzag"
          stroke="var(--palette-accent3)"
          transform="translate(50 10) scale(0.2)"
        />
        <use
          href="#BackgroundShapeSquare"
          stroke="var(--palette-accent4)"
          transform="translate(70 10) scale(0.1)"
        />
        <use
          href="#BackgroundShapeCross"
          stroke="var(--palette-accent5)"
          transform="translate(90 10) scale(0.1)"
        />
        <use
          href="#BackgroundShapeCircle"
          stroke="var(--palette-accent3)"
          transform="translate(10 30) scale(0.1)"
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
        stroke-width="0.5"
      ></rect>

      {/* Squiggle */}
      <path
        id="BackgroundShapeSquiggle"
        d="M -45 -10
          c 7.5 0, 7.5 15, 15 15
          c 7.5 0, 7.5 -15, 15 -15
          c 7.5 0, 7.5 15, 15 15
          c 7.5 0, 7.5 -15, 15 -15
          c 7.5 0, 7.5 15, 15 15
          c 7.5 0, 7.5 -15, 15 -15"
        vector-effect="non-scaling-stroke"
      />

      {/* Zigzag */}
      <path
        id="BackgroundShapeZigzag"
        d="M -45 -10
          l 15 15, 15 -15, 15 15, 15 -15, 15 15, 15 -15"
        vector-effect="non-scaling-stroke"
      />

      {/* Triangle */}
      <polygon
        id="BackgroundShapeTriangle"
        points="0 -50, 50 35, -50 35"
        vector-effect="non-scaling-stroke"
      />

      {/* Square */}
      <rect
        id="BackgroundShapeSquare"
        x="-45"
        y="-45"
        width="90"
        height="90"
        vector-effect="non-scaling-stroke"
      />

      {/* Cross */}
      <path
        id="BackgroundShapeCross"
        d="M -45 -45 L 45 45
          M -45 45 L 45 -45"
        vector-effect="non-scaling-stroke"
      />

      {/* Circle */}
      <circle
        id="BackgroundShapeCircle"
        cx="0"
        cy="0"
        r="45"
        vector-effect="non-scaling-stroke"
      />
    </defs>
    <rect width="100%" height="100%" fill="url(#BackgroundPattern)"></rect>
  </svg>
);

export default AppBackground;

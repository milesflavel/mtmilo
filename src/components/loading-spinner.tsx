const LoadingSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg style={{ width: 200, height: 200 }}>
        <polygon
          points="100 43, 150 128, 50 128"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="10"
          stroke="var(--palette-accent5)"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="3s"
            repeatCount="indefinite"
          />
        </polygon>
        <defs>
          <path
            id="LoadingSpinnerTextPath"
            d="M 60 40 c 15 -20, 65 -20, 80 0"
          ></path>
        </defs>
        <text
          textLength="80"
          lengthAdjust="spacing"
          font-size="25px"
          fill="var(--palette-accent3)"
        >
          <textPath href="#LoadingSpinnerTextPath">Loading</textPath>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 100 100"
            to="0 100 100"
            dur="9s"
            repeatCount="indefinite"
          ></animateTransform>
        </text>
      </svg>
    </div>
  );
};

export default LoadingSpinner;

import LoadingSpinnerSvg from "../images/loading-spinner.svg?react";

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
      <LoadingSpinnerSvg />
    </div>
  );
};

export default LoadingSpinner;

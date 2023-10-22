import { useLocation } from "wouter";
import AppBackground from "./app-background";
import CanvasTest from "./canvas-test";

const App = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <AppBackground></AppBackground>
      <div>
        <h1>{location}</h1>
      </div>
      <div style={{ flexGrow: 1 }}>
        <CanvasTest></CanvasTest>
      </div>
    </>
  );
};

export default App;

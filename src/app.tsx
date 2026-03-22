import { Player } from "@remotion/player";
import React from "react";
import { createRoot } from "react-dom/client";
import { RemotionFeatures } from "./RemotionFeatures";

const App: React.FC = () => {
  return (
    <Player
      component={RemotionFeatures}
      compositionWidth={1920}
      compositionHeight={1080}
      durationInFrames={600}
      fps={30}
      controls
      autoPlay
      loop
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

createRoot(document.getElementById("root")!).render(<App />);

import { Composition } from "remotion";
import { RemotionFeatures } from "./RemotionFeatures";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RemotionFeatures"
        component={RemotionFeatures}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

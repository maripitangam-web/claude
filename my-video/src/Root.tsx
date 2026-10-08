import { Composition } from "remotion";
import { FPS, MAIN_DURATION } from "./data";
import { SplitVideo } from "./SplitVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SplitVideo"
      component={SplitVideo}
      durationInFrames={Math.round(MAIN_DURATION * FPS)}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

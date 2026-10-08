import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CAPTIONS, CLIPS, FPS } from "./data";

const HALF = 960;

const TopClip: React.FC<{ src: string; from: number; credit: string }> = ({
  src,
  from,
  credit,
}) => {
  const file = staticFile(src);
  const trimBefore = Math.round(from * FPS);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <OffthreadVideo
        src={file}
        muted
        trimBefore={trimBefore}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(40px) brightness(0.6)",
          transform: "scale(1.2)",
        }}
      />
      <OffthreadVideo
        src={file}
        muted
        trimBefore={trimBefore}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 24,
          top: 20,
          padding: "6px 14px",
          borderRadius: 8,
          backgroundColor: "rgba(0,0,0,0.55)",
          color: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 26,
        }}
      >
        {credit}
      </div>
    </AbsoluteFill>
  );
};

const Captions: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const current = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!current) {
    return null;
  }
  const appear = Math.min(1, (t - current.start) * 8);
  return (
    <AbsoluteFill
      style={{
        top: HALF - 110,
        height: 220,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 900,
        textAlign: "center",
        transform: `scale(${0.8 + 0.2 * appear})`,
      }}
    >
      <div
        style={{
          fontSize: 84,
          color: "#FFE600",
          WebkitTextStroke: "3px black",
          textShadow: "0 6px 16px rgba(0,0,0,0.7)",
        }}
      >
        {current.pt}
      </div>
      <div
        style={{
          fontSize: 60,
          color: "white",
          WebkitTextStroke: "2px black",
          textShadow: "0 6px 16px rgba(0,0,0,0.7)",
        }}
      >
        {current.fr}
      </div>
    </AbsoluteFill>
  );
};

export const SplitVideo: React.FC = () => {
  let start = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ height: HALF }}>
        {CLIPS.map((clip, i) => {
          const duration = Math.round((clip.to - clip.from) * FPS);
          const seq = (
            <Sequence key={i} from={start} durationInFrames={duration}>
              <TopClip src={clip.src} from={clip.from} credit={clip.credit} />
            </Sequence>
          );
          start += duration;
          return seq;
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ top: HALF, height: HALF, overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile("video-cortado.mp4")}
          style={{
            position: "absolute",
            width: 1080,
            height: 1920,
            top: -380,
          }}
        />
      </AbsoluteFill>
      <Captions />
    </AbsoluteFill>
  );
};

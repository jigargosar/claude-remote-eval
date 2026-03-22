import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

const COLORS = {
  bg: "#0f0f23",
  primary: "#7c3aed",
  accent: "#22d3ee",
  text: "#f8fafc",
  muted: "#94a3b8",
  cardBg: "#1e1b4b",
};

const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 800,
            fontFamily: "sans-serif",
            color: COLORS.text,
            transform: `scale(${titleScale})`,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: COLORS.primary }}>Remotion</span> Features
        </div>
        <div
          style={{
            fontSize: 36,
            color: COLORS.muted,
            fontFamily: "sans-serif",
            opacity: subtitleOpacity,
          }}
        >
          Programmatic Video Creation with React
        </div>
        <div
          style={{
            width: 200,
            height: 4,
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent})`,
            borderRadius: 2,
            opacity: subtitleOpacity,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - index * 8,
    fps,
    config: { damping: 12 },
  });

  const slideX = interpolate(entrance, [0, 1], [100, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        padding: "30px 40px",
        display: "flex",
        alignItems: "center",
        gap: 30,
        transform: `translateX(${slideX}px)`,
        opacity,
        border: `1px solid ${COLORS.primary}44`,
        width: 800,
      }}
    >
      <div style={{ fontSize: 50 }}>{icon}</div>
      <div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: "sans-serif",
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            color: COLORS.muted,
            fontFamily: "sans-serif",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: "\u{1F3AC}",
    title: "React-Powered Videos",
    description: "Write videos using familiar React components and JSX syntax",
  },
  {
    icon: "\u{1F4CA}",
    title: "Data-Driven Content",
    description: "Fetch APIs, use JSON data, and generate dynamic video content",
  },
  {
    icon: "\u{1F680}",
    title: "SSR & Parallel Rendering",
    description: "Server-side render frames in parallel for blazing fast output",
  },
  {
    icon: "\u{1F3A8}",
    title: "Spring Animations",
    description: "Physics-based animations with configurable spring parameters",
  },
];

const FeaturesSlide: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const moreFeatures = [
  {
    icon: "\u{1F4E6}",
    title: "Webpack & Bundler",
    description: "Custom bundler integration with tree-shaking and code splitting",
  },
  {
    icon: "\u{1F3AF}",
    title: "Compositions",
    description: "Organize videos into reusable compositions with defined dimensions",
  },
  {
    icon: "\u{23F1}\uFE0F",
    title: "Sequences & Timing",
    description: "Precise frame-level control over when elements appear and animate",
  },
  {
    icon: "\u{1F50A}",
    title: "Audio Support",
    description: "Sync audio tracks, control volume, and visualize waveforms",
  },
];

const MoreFeaturesSlide: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {moreFeatures.map((feature, i) => (
          <FeatureCard key={i} {...feature} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const CodeDemoSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 15 } });
  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  const codeLines = [
    'import { useCurrentFrame } from "remotion";',
    "",
    "export const MyVideo = () => {",
    "  const frame = useCurrentFrame();",
    "  const opacity = frame / 30;",
    "  return (",
    '    <div style={{ opacity }}>',
    "      Hello Remotion!",
    "    </div>",
    "  );",
    "};",
  ];

  const visibleChars = Math.floor(frame * 3);

  let charCount = 0;
  const visibleCode = codeLines.map((line) => {
    const lineChars = line.length + 1;
    if (charCount + lineChars <= visibleChars) {
      charCount += lineChars;
      return line;
    }
    const remaining = Math.max(0, visibleChars - charCount);
    charCount += lineChars;
    return line.slice(0, remaining);
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: "sans-serif",
            marginBottom: 40,
          }}
        >
          Write Videos as <span style={{ color: COLORS.accent }}>Code</span>
        </div>
        <div
          style={{
            backgroundColor: "#1a1a2e",
            borderRadius: 16,
            padding: "40px 50px",
            textAlign: "left",
            border: `1px solid ${COLORS.primary}44`,
            minWidth: 700,
          }}
        >
          <pre
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              lineHeight: 1.6,
              color: COLORS.accent,
              margin: 0,
            }}
          >
            {visibleCode.join("\n")}
            {cursorBlink && (
              <span
                style={{
                  backgroundColor: COLORS.accent,
                  width: 2,
                  display: "inline-block",
                }}
              >
                {" "}
              </span>
            )}
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = Math.sin(frame / 10) * 0.05 + 1;
  const fadeIn = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "sans-serif",
            color: COLORS.text,
            transform: `scale(${pulse})`,
          }}
        >
          Start Building with{" "}
          <span style={{ color: COLORS.primary }}>Remotion</span>
        </div>
        <div
          style={{
            fontSize: 32,
            color: COLORS.muted,
            fontFamily: "sans-serif",
          }}
        >
          remotion.dev
        </div>
        <div
          style={{
            width: 300,
            height: 4,
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent})`,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontSize: 24,
            color: COLORS.muted,
            fontFamily: "sans-serif",
            marginTop: 20,
          }}
        >
          Programmatic Videos &bull; React Components &bull; Open Source
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const RemotionFeatures: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <TitleSlide />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <FeaturesSlide />
      </Sequence>
      <Sequence from={240} durationInFrames={150}>
        <MoreFeaturesSlide />
      </Sequence>
      <Sequence from={390} durationInFrames={120}>
        <CodeDemoSlide />
      </Sequence>
      <Sequence from={510} durationInFrames={90}>
        <OutroSlide />
      </Sequence>
    </AbsoluteFill>
  );
};

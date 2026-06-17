import React, { useState, useEffect } from "react";

const tokens = {
  light: {
    bg: "#F7F4ED",
    bgRaised: "#FFFFFF",
    bgSunken: "#EFEAE0",
    ink: "#1C1A17",
    inkSoft: "#4A453D",
    inkFaint: "#8A8275",
    line: "#D9D3C4",
    moss: "#2D4F3D",
    mossSoft: "#E4ECE6",
    sienna: "#A14530",
    siennaSoft: "#F3E4DE",
    paperShadow: "rgba(28,26,23,0.06)",
  },
  dark: {
    bg: "#16140F",
    bgRaised: "#211E18",
    bgSunken: "#0F0D0A",
    ink: "#F0EBDD",
    inkSoft: "#C7C0AE",
    inkFaint: "#857E6F",
    line: "#3A352A",
    moss: "#7FAE93",
    mossSoft: "#243029",
    sienna: "#D98365",
    siennaSoft: "#332420",
    paperShadow: "rgba(0,0,0,0.35)",
  },
};

function useTheme() {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    const preferred = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    if (preferred) setMode("dark");
  }, []);
  return [mode, setMode];
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth < 560 : false
  );
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 560);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return narrow;
}

function Citation({ children }) {
  const { t } = useCtx();
  return (
    <span
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        letterSpacing: "0.02em",
        color: t.inkFaint,
        border: `0.5px solid ${t.line}`,
        borderRadius: "3px",
        padding: "1px 5px",
        marginLeft: "6px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

const CtxR = React.createContext(null);
function useCtx() {
  return React.useContext(CtxR);
}

function SectionLabel({ kicker, title }) {
  const { t } = useCtx();
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: t.moss,
          marginBottom: "8px",
        }}
      >
        {kicker}
      </div>
      <h2
        style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "26px",
          fontWeight: 600,
          color: t.ink,
          margin: 0,
          lineHeight: 1.25,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function IntervalMarks() {
  const { t } = useCtx();
  const gaps = [6, 10, 16, 24, 36, 52];
  let x = 0;
  const ticks = gaps.map((g, i) => {
    x += g;
    return x;
  });
  const width = x + 16;
  return (
    <svg
      width="100%"
      height="28"
      viewBox={`0 0 ${width} 28`}
      preserveAspectRatio="xMinYMid meet"
      style={{ display: "block", marginTop: "4px" }}
      aria-hidden="true"
    >
      <line x1="0" y1="20" x2={width} y2="20" stroke={t.line} strokeWidth="1" />
      {ticks.map((tx, i) => (
        <g key={i}>
          <line x1={tx} y1="12" x2={tx} y2="20" stroke={t.moss} strokeWidth="1.5" />
          <circle cx={tx} cy="9" r="3" fill={t.moss} opacity={0.35 + i * 0.11} />
        </g>
      ))}
    </svg>
  );
}

function EvidenceCard({ claim, citation, tone = "moss" }) {
  const { t } = useCtx();
  const accent = tone === "moss" ? t.moss : t.sienna;
  return (
    <div
      style={{
        background: t.bgRaised,
        border: `0.5px solid ${t.line}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: "2px",
        padding: "16px 18px",
        marginBottom: "12px",
      }}
    >
      <p
        style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "15.5px",
          lineHeight: 1.6,
          color: t.ink,
          margin: 0,
        }}
      >
        {claim}
        <Citation>{citation}</Citation>
      </p>
    </div>
  );
}

function StepRow({ n, title, body }) {
  const { t } = useCtx();
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "18px 0",
        borderBottom: `0.5px solid ${t.line}`,
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "13px",
          color: t.inkFaint,
          minWidth: "22px",
          paddingTop: "2px",
        }}
      >
        {n}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontWeight: 600,
            fontSize: "16.5px",
            color: t.ink,
            marginBottom: "4px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "14.5px",
            lineHeight: 1.65,
            color: t.inkSoft,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

export default function AdultLanguageGuide() {
  const [mode, setMode] = useTheme();
  const isNarrow = useIsNarrow();
  const t = tokens[mode];

  return (
    <CtxR.Provider value={{ t, mode }}>
      <div
        style={{
          background: t.bg,
          minHeight: "100vh",
          fontFamily: "'IBM Plex Sans', sans-serif",
          color: t.ink,
          transition: "background 0.25s ease, color 0.25s ease",
        }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />

        {/* Masthead */}
        <header
          style={{
            borderBottom: `1px solid ${t.line}`,
            padding: "28px 24px 24px",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: t.inkFaint,
              }}
            >
              Field notes · adult acquisition
            </div>
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.06em",
                background: "transparent",
                border: `0.5px solid ${t.line}`,
                color: t.inkSoft,
                borderRadius: "3px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              aria-label="Toggle dark mode"
            >
              {mode === "light" ? "dark mode" : "light mode"}
            </button>
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontWeight: 700,
              fontSize: isNarrow ? "28px" : "38px",
              lineHeight: 1.18,
              color: t.ink,
              margin: "0 0 14px",
              letterSpacing: "-0.01em",
            }}
          >
            Learning a language as an adult: what the evidence actually supports
          </h1>
          <p
            style={{
              fontSize: "15.5px",
              lineHeight: 1.6,
              color: t.inkSoft,
              maxWidth: "560px",
              margin: 0,
            }}
          >
            Drawn from peer-reviewed second language acquisition research, independent
            app efficacy studies, and the recurring patterns across learner communities
            — including the parts that don’t work.
          </p>
        </header>

        <main style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* The real bottleneck */}
          <section style={{ marginBottom: "48px" }}>
            <SectionLabel kicker="01 · the real bottleneck" title="It isn't ability. It's avoidance." />
            <EvidenceCard
              tone="sienna"
              claim="Time is the most commonly cited reason adults don't learn a language, named by around 40%, but emotional barriers run close behind — nearly one in five adults admit they're embarrassed to speak out loud or afraid of making mistakes."
              citation="study, 2025"
            />
            <EvidenceCard
              tone="sienna"
              claim="About 21% of adults believe they're too old to learn a new language, even though research repeatedly shows adults can form new language pathways at any age."
              citation="study, 2025"
            />
          </section>

          {/* Age and the critical period */}
          <section style={{ marginBottom: "48px" }}>
            <SectionLabel kicker="02 · the age question" title="What age actually constrains — and what it doesn't" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr",
                gap: "0",
                border: `0.5px solid ${t.line}`,
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRight: isNarrow ? "none" : `0.5px solid ${t.line}`,
                  borderBottom: isNarrow ? `0.5px solid ${t.line}` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: t.sienna,
                    marginBottom: "10px",
                  }}
                >
                  Genuinely age-limited
                </div>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: t.ink, margin: 0 }}>
                  Pronunciation and accent show the earliest, strictest sensitive period.
                  Native-like accents are rarely achieved when learning begins after
                  age 6–8.
                  <Citation>Scovel, 1988</Citation>
                </p>
              </div>
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: t.moss,
                    marginBottom: "10px",
                  }}
                >
                  Not actually age-limited
                </div>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: t.ink, margin: 0 }}>
                  Vocabulary learning continues effectively throughout the lifespan with
                  no strict critical period, since it's learned consciously through
                  declarative memory.
                  <Citation>Singleton & Lengyel, 1995</Citation>
                </p>
              </div>
            </div>
            <p style={{ fontSize: "13.5px", color: t.inkFaint, lineHeight: 1.6, marginTop: "12px" }}>
              Grammar sits between the two — morphology and syntax decline gradually
              into early adolescence rather than closing sharply, so they remain
              learnable with effort well into adulthood.
            </p>
          </section>

          {/* What moves the needle */}
          <section style={{ marginBottom: "48px" }}>
            <SectionLabel kicker="03 · what moves the needle" title="The interval matters as much as the method" />
            <div style={{ marginBottom: "8px" }}>
              <IntervalMarks />
              <p style={{ fontSize: "12.5px", color: t.inkFaint, marginTop: "6px" }}>
                spaced review intervals — the one technique with the most consistent evidence
              </p>
            </div>
            <StepRow
              n="01"
              title="Spaced repetition for vocabulary"
              body="Retention of spaced vocabulary was found to be three times higher than retention of massed vocabulary, with the effect holding across age groups."
            />
            <StepRow
              n="02"
              title="Comprehensible input, not just any input"
              body="Optimal acquisition occurs when learners already understand roughly 90–98% of what they hear or read, leaving just enough unfamiliar material to absorb in context."
            />
            <StepRow
              n="03"
              title="Speaking early, even badly"
              body="Adults in face-to-face interactive sessions showed stronger gains in speaking and comprehension than peers who spent equal time on non-interactive listening alone. Production engages broader neural circuitry than input does."
            />
            <StepRow
              n="04"
              title="Structured tutoring at the plateau"
              body="An independent efficacy study found 71.6% of italki users improved oral proficiency by at least one level after roughly two months of study — a stronger signal than most self-directed app use alone produces."
            />
          </section>

          {/* The friction */}
          <section style={{ marginBottom: "48px" }}>
            <SectionLabel kicker="04 · logged friction" title="What the research and the reviews both flag" />
            <EvidenceCard
              tone="sienna"
              claim="Duolingo has been criticized for failing to provide context or peer collaboration, with few opportunities for oral production, and those that exist are decontextualized."
              citation="UF thesis"
            />
            <EvidenceCard
              tone="sienna"
              claim="Gamification cuts both ways: users often focus on protecting their streak rather than pushing into harder material, so the tracked metric and actual proficiency can quietly diverge."
              citation="app review"
            />
            <EvidenceCard
              tone="sienna"
              claim="After mastering basic vocabulary and grammar, progress slows sharply — learners feel stuck between beginner and intermediate, bored by easy material and unable to engage with harder content. This plateau is where most self-directed learners quit."
              citation="plateau lit."
            />
            <EvidenceCard
              tone="sienna"
              claim="People with a stronger affective filter are more resistant to input, struggling to understand a message if they don't know every word, while those with a weaker filter tolerate ambiguity and keep progressing."
              citation="Krashen"
            />
          </section>

          {/* Synthesis */}
          <section
            style={{
              background: t.bgRaised,
              border: `0.5px solid ${t.line}`,
              borderRadius: "6px",
              padding: "28px 26px",
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: t.moss,
                marginBottom: "12px",
              }}
            >
              Working synthesis
            </div>
            <p
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "16.5px",
                lineHeight: 1.7,
                color: t.ink,
                margin: "0 0 14px",
              }}
            >
              Build vocabulary with spaced repetition, layer in comprehension you mostly
              already understand, and start speaking within the first weeks rather than
              after you feel ready. Expect a plateau around early-intermediate and add
              structure — a tutor, a class — right as it begins, not after motivation
              has already gone.
            </p>
            <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: t.inkFaint, margin: 0 }}>
              Lower the bar on accent specifically; that's the one place the biology
              genuinely doesn't favor adults. Raise the tolerance for not understanding
              every word; that tolerance, not raw aptitude, is what the evidence ties to
              who actually reaches fluency.
            </p>
          </section>

          <footer
            style={{
              marginTop: "40px",
              paddingTop: "20px",
              borderTop: `0.5px solid ${t.line}`,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              color: t.inkFaint,
              letterSpacing: "0.02em",
            }}
          >
            No single method is declared "most effective" in the literature itself
            — this synthesis follows where the evidence is strongest and flags where
            it is contested.
          </footer>
        </main>
      </div>
    </CtxR.Provider>
  );
}

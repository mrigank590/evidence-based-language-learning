# Evidence-based language learning

Presenting what peer-reviewed second language acquisition research, independent app efficacy studies, and learner-community patterns actually support for adults learning a new language — including the parts that don't work.

Built as a readable dossier rather than a listicle. Every claim carries a source tag. The contested parts of the research stay contested rather than getting smoothed into a clean narrative.

**[→ View the Live Guide](https://mrigank590.github.io/evidence-based-language-learning)**

## Why this exists

Most language-learning content is either marketing copy from an app trying to sell a subscription, or a forum post generalizing from one person's experience. Neither tells you which techniques have actual evidence behind them, which ones are folklore, or where the research itself disagrees.

This pulls from three source types and keeps them honest about their limits:

- **Peer-reviewed research** — second language acquisition studies, critical period hypothesis literature, spaced repetition meta-analyses
- **Independent efficacy studies** — including company-funded research, flagged as such, alongside its documented methodological gaps
- **Learner communities and consumer reviews** — practitioner consensus and app-store complaint patterns, cross-checked against the academic literature rather than taken at face value

## What's covered

- Why the real bottleneck for adults is avoidance (time, embarrassment, the "too old" myth), not aptitude
- What age actually constrains (accent, mainly) versus what it doesn't (vocabulary, largely; grammar, with effort)
- The techniques with the strongest replicated evidence: spaced repetition, comprehensible input, early speaking practice, structured tutoring at the plateau
- The documented failure modes: app gamification optimizing for streaks over proficiency, the early-intermediate plateau where most self-directed learners quit, the affective filter that makes perfectionism measurably slow acquisition

## Using the component

It's a single self-contained `.jsx` file with no external state management or build-specific dependencies beyond React itself.

```bash
npm install react
```

Drop `AdultLanguageGuide.jsx` into a React project and import the default export:

```jsx
import AdultLanguageGuide from "./AdultLanguageGuide";

function App() {
  return <AdultLanguageGuide />;
}
```

The component manages its own dark/light mode via internal state — no theme provider or CSS framework required. It checks `prefers-color-scheme` on load and falls back to light mode if that's unavailable. A toggle button in the header lets the reader switch manually at any time.

Google Fonts (Source Serif 4, IBM Plex Sans, IBM Plex Mono) load via a `<link>` tag inside the component. If you're working offline or want to self-host fonts, swap that tag for your own font-loading strategy and update the `fontFamily` values in the token objects at the top of the file.

## Design notes

The visual approach is intentionally not the default "wellness app" or "AI-generated dashboard" look. It reads more like an annotated research dossier — warm paper tones in light mode, ink-on-paper inversion in dark mode, a moss-green accent for supported findings and a sienna accent for documented friction points, with citation tags rendered in monospace to reinforce that each claim is sourced rather than asserted.

A small interval-marker SVG (`IntervalMarks`) sits next to the spaced-repetition section as the one deliberately illustrative element — it's a visual echo of the actual spacing curve the research describes, used once, where it's literally true to the content, rather than as decoration throughout.

The two-column age-comparison grid collapses to a single column under 560px so it doesn't cramp on mobile screens.

## What this isn't

This isn't a claim that one method is definitively "the most effective." The literature itself doesn't make that claim, and the README and component both say so directly. What's here is a synthesis of where the evidence is strongest, with the disagreements — particularly between Krashen's comprehensible-input model and more recent interactionist critiques — left visible rather than resolved in favor of a tidier story.

It's also not a substitute for an actual study plan. Think of it as the research backing you'd want before choosing one, not the plan itself.

## Customizing

The color tokens, font choices, and copy all live in clearly separated spots:

- `tokens` object (top of file) — all light/dark color values
- `EvidenceCard`, `StepRow`, `SectionLabel` — reusable presentational components
- The four numbered `<section>` blocks inside the default export — the actual content and citations

To swap in your own sourced claims, follow the existing `EvidenceCard` and `StepRow` pattern and keep a citation tag on every factual claim, consistent with how the rest of the content is sourced.

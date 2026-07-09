/**
 * AuroraBackground — the hero's sky-blue radial background.
 *
 * A clean radial gradient (white near the bottom-center, sky-blue toward the
 * edges) that gently breathes via a transform animation, so the gradient stays
 * perfectly uniform while feeling alive. No dark/black tones are possible.
 * The drift is disabled under prefers-reduced-motion (globals.css).
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="hero-radial" />
      <div className="hero-shimmer" />
    </div>
  )
}

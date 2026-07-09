import { site } from '@/content/site'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import Reveal from '@/components/motion/Reveal'
import { siHubspot, siCalendly, siMake, siZapier, siNotion, siN8n } from 'simple-icons'

// Freely-licensed (simple-icons) brand marks keyed by slug.
const LOGOS: Record<string, { path: string; hex: string }> = {
  hubspot:  siHubspot,
  calendly: siCalendly,
  make:     siMake,
  zapier:   siZapier,
  notion:   siNotion,
  n8n:      siN8n,
}

// Brand colours (for the card tint) of the platforms served as image logos.
const NAME_COLOR: Record<string, string> = {
  GoHighLevel: '2F80ED',
  Salesforce:  '00A1E0',
  Twilio:      'F22F46',
}

// Official logo image files (in /public) for brands not in simple-icons.
const LOGO_IMG: Record<string, string> = {
  Salesforce:  '/brand/logos/salesforce.svg',
  Twilio:      '/brand/logos/twilio.svg',
  GoHighLevel: '/brand/logos/gohighlevel.webp',
}

function BrandLogo({ slug }: { slug: string }) {
  const icon = LOGOS[slug]
  if (!icon) return null
  return (
    <svg role="img" viewBox="0 0 24 24" className="h-12 w-12" fill={`#${icon.hex}`} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export default function Integrations() {
  return (
    <section className="overflow-hidden bg-navy-gradient py-20 text-white sm:py-28">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">

          {/* ── Left: text ─────────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400">
                {site.integrationsHeader.eyebrow}
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {site.integrationsHeader.heading}
              </h2>
              <p className="mx-auto mb-8 max-w-md text-base text-white/70 sm:text-lg lg:mx-0">
                {site.integrationsHeader.body}
              </p>
              <CtaButton variant="gradient" href={site.integrationsHeader.ctaHref}>
                {site.integrationsHeader.cta}
              </CtaButton>
            </Reveal>
          </div>

          {/* ── Right: platform logos on brand-tinted tiles ────────────── */}
          <div className="w-full flex-1">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {site.integrations.map(intg => {
                const color = intg.slug ? LOGOS[intg.slug]?.hex : NAME_COLOR[intg.name]
                const c = color ?? '0C60FC'
                return (
                  <div
                    key={intg.name}
                    className="flex min-h-[112px] flex-col items-center justify-center gap-2.5 rounded-2xl border shadow-lg"
                    style={{
                      background: `linear-gradient(0deg, rgba(255,255,255,0.86), rgba(255,255,255,0.86)), #${c}`,
                      borderColor: `#${c}40`,
                    }}
                  >
                    {intg.slug ? (
                      <>
                        <BrandLogo slug={intg.slug} />
                        <span className="text-xs font-semibold text-ink/70">{intg.name}</span>
                      </>
                    ) : LOGO_IMG[intg.name] ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={LOGO_IMG[intg.name]} alt={intg.name} className="h-11 w-auto max-w-[70%] object-contain" />
                        <span className="text-xs font-semibold text-ink/70">{intg.name}</span>
                      </>
                    ) : (
                      <span className="px-2 text-center text-base font-extrabold leading-tight" style={{ color: `#${c}` }}>
                        {intg.name}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

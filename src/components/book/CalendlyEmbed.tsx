import { SITE_URL } from '@/lib/seo'

interface CalendlyEmbedProps {
  url: string
}

/**
 * Calendly inline embed, rendered as a plain server-side <iframe>.
 *
 * We deliberately do NOT use Calendly's widget.js. That script forces a serial
 * chain on every visit: hydrate -> download widget.js -> parse -> create the
 * iframe -> only then fetch the calendar. Emitting the iframe in the static HTML
 * lets the browser start fetching Calendly while it is still parsing the page,
 * so the calendar paints almost immediately. It also removes the client-side
 * navigation bug that widget.js has (its DOM auto-scan only ever runs once).
 *
 * widget.js only adds postMessage event hooks (CalendlyEventScheduled etc.),
 * which this site does not use.
 */
function embedSrc(url: string) {
  const u = new URL(url)
  u.searchParams.set('embed_domain', new URL(SITE_URL).hostname)
  u.searchParams.set('embed_type', 'Inline')
  return u.toString()
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-surface"
      style={{ minWidth: '320px', height: '700px' }}
    >
      {/* Skeleton sits behind the iframe and is covered the moment Calendly paints. */}
      <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-surface" />

      <iframe
        src={embedSrc(url)}
        title="Book a call with Ambliq Solutions"
        loading="eager"
        className="relative h-full w-full border-0"
      />
    </div>
  )
}

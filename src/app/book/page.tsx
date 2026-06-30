import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/common/Container'
import CalendlyEmbed from '@/components/book/CalendlyEmbed'
import { Mail, ArrowLeft, CalendarClock } from 'lucide-react'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book a free 30-minute AI audit call with the Ambliq Solutions team. We will walk through your lead flow and show you where AI automation fits.',
  alternates: {
    canonical: '/book',
  },
}

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? site.bookPage.calendlyUrl

export default function BookPage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero strip */}
      <section className="py-16 sm:py-20 bg-surface border-b border-bordersoft">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">
              {site.bookPage.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
              {site.bookPage.heading.replace(site.bookPage.accent, '')}
              <span className="text-gradient">{site.bookPage.accent}</span>
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              {site.bookPage.sub}
            </p>
          </div>
        </Container>
      </section>

      {/* Booking area */}
      <section className="flex-1 py-12 sm:py-16">
        <Container>
          {calendlyUrl ? (
            <CalendlyEmbed url={calendlyUrl} />
          ) : (
            <BookingFallback />
          )}
        </Container>
      </section>

      {/* Back link */}
      <section className="py-8 border-t border-bordersoft">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </Container>
      </section>
    </main>
  )
}

function BookingFallback() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-navy-gradient rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
          <CalendarClock className="w-8 h-8 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          {site.bookPage.fallbackHeading}
        </h2>
        <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed">
          {site.bookPage.fallbackBody}
        </p>

        {/* Email CTA */}
        <a
          href={`mailto:${site.contact.email}`}
          className="inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-full px-7 py-3.5 transition-colors shadow-lg hover:shadow-blue-500/40"
        >
          <Mail className="w-4 h-4" />
          {site.contact.email}
        </a>

        {/* Divider */}
        <div className="my-8 border-t border-white/15" />

        {/* What to expect */}
        <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-4">
          What to expect on the call
        </p>
        <ul className="space-y-2 text-left text-white/70 text-sm">
          {site.bookPage.whatToExpect.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-blue-500/30 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

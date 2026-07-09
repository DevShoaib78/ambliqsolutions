import type { Metadata } from 'next'
import { site } from '@/content/site'

/** Production host. Note the `www.` — it must match the canonical domain. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ambliqsolutions.com'

/**
 * Social preview image. Deliberately a PNG: WhatsApp / iMessage / LinkedIn do
 * not reliably render WebP og:images. Regenerate with `npm run og`.
 */
const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Ambliq Solutions: AI Voice Agents that answer every call 24/7, qualify leads, and book appointments.',
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.meta.title,
    template: '%s | Ambliq Solutions',
  },
  description: site.meta.description,
  applicationName: 'Ambliq Solutions',
  authors: [{ name: 'Ambliq Solutions', url: SITE_URL }],
  creator: 'Ambliq Solutions',
  publisher: 'Ambliq Solutions',
  keywords: [
    'AI voice agent',
    'AI receptionist',
    'AI answering service',
    'missed call automation',
    'lead qualification automation',
    'appointment booking automation',
    'AI automation agency',
    'service business automation',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Ambliq Solutions',
    title: site.meta.title,
    description: site.meta.description,
    locale: 'en_GB',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.meta.title,
    description: site.meta.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Ambliq Solutions',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-full.webp`,
    image: `${SITE_URL}/og-image.png`,
    description: site.meta.description,
    email: site.contact.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contact.email,
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/ambliq-solutions/',
      'https://www.linkedin.com/in/umarshoaib30/',
    ],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Ambliq Solutions',
    description: site.meta.description,
    inLanguage: 'en-GB',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Voice Agents',
    description:
      'Human-like AI receptionists that answer calls, qualify callers, and book appointments. Available around the clock without adding to your payroll.',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    serviceType: 'AI Automation',
    url: SITE_URL,
  }
}

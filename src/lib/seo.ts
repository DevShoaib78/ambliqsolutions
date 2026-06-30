import type { Metadata } from 'next'
import { site } from '@/content/site'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ambliqsolutions.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.meta.title,
    template: '%s — Ambliq Solutions',
  },
  description: site.meta.description,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Ambliq Solutions',
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.meta.title,
    description: site.meta.description,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ambliq Solutions',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mini.png`,
    sameAs: [
      'https://www.linkedin.com/company/ambliq-solutions/',
      'https://www.linkedin.com/in/umarshoaib30/',
    ],
  }
}

export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Voice Agents',
    description:
      'Human-like AI receptionists that answer calls, qualify callers, and book appointments — available around the clock without adding to your payroll.',
    provider: {
      '@type': 'Organization',
      name: 'Ambliq Solutions',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    serviceType: 'AI Automation',
  }
}

'use client'

import Script from 'next/script'

interface CalendlyEmbedProps {
  url: string
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  return (
    <>
      <div
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
        data-url={url}
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  )
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ambliq Solutions: AI Automation that Captures. Qualifies. Converts.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #00183C 0%, #0A356E 60%, #0C3C9C 100%)',
          padding: '80px 100px',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {/* Brand pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '44px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#0C60FC',
            }}
          />
          <span
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Ambliq Solutions
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            color: '#ffffff',
            fontSize: '80px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.05,
            margin: '0 0 28px',
            letterSpacing: '-2px',
          }}
        >
          AI Automation that
        </h1>

        {/* Coloured tagline words */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {[
            { text: 'Captures.', color: '#0C60FC' },
            { text: 'Qualifies.', color: '#ffffff' },
            { text: 'Converts.', color: '#ffffff' },
          ].map(({ text, color }) => (
            <span
              key={text}
              style={{
                color,
                fontSize: '60px',
                fontWeight: 800,
                letterSpacing: '-1.5px',
                opacity: color === '#ffffff' ? 0.85 : 1,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '100px',
            right: '100px',
            height: '2px',
            background:
              'linear-gradient(90deg, #0C60FC 0%, rgba(12,96,252,0.2) 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}

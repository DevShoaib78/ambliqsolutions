export default function AlwaysOn() {
  return (
    <div className="flex items-center justify-center w-full h-40 bg-gradient-to-br from-white to-[#dbeafe] rounded-xl overflow-hidden">
      <svg viewBox="0 0 160 140" width="160" height="140" aria-hidden="true">
        {/* Clock face */}
        <circle cx="72" cy="68" r="50" fill="none" stroke="#0C60FC" strokeWidth="4" opacity="0.18" />
        <circle cx="72" cy="68" r="44" fill="#ffffff" stroke="#0C60FC" strokeWidth="2" />
        {/* Hour hand */}
        <line x1="72" y1="68" x2="72" y2="36" stroke="#0B1B33" strokeWidth="3" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1="72" y1="68" x2="98" y2="68" stroke="#0C60FC" strokeWidth="3" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="72" cy="68" r="4" fill="#0C60FC" />
        {/* Tick marks */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
          const r1 = 38, r2 = i % 3 === 0 ? 32 : 35
          const rad = (deg - 90) * Math.PI / 180
          return (
            <line
              key={deg}
              x1={72 + r1 * Math.cos(rad)}
              y1={68 + r1 * Math.sin(rad)}
              x2={72 + r2 * Math.cos(rad)}
              y2={68 + r2 * Math.sin(rad)}
              stroke="#94A3B8"
              strokeWidth={i % 3 === 0 ? 2 : 1}
              opacity={0.75}
            />
          )
        })}
        {/* 24/7 badge */}
        <circle cx="112" cy="100" r="22" fill="#0C60FC" />
        <text x="112" y="104" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">24/7</text>
      </svg>
    </div>
  )
}

export default function Crm() {
  return (
    <div className="flex items-center justify-center w-full h-40 bg-navy-900 rounded-xl overflow-hidden">
      <svg viewBox="0 0 200 120" width="200" height="120" aria-hidden="true">
        {/* Central record box */}
        <rect x="65" y="40" width="70" height="40" rx="8" fill="#0C3C9C" stroke="#0C60FC" strokeWidth="1.5" />
        <text x="100" y="57" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Contact</text>
        <text x="100" y="70" textAnchor="middle" fill="#93C5FD" fontSize="7" fontFamily="sans-serif">Synced ✓</text>

        {/* Left node: CRM */}
        <circle cx="22" cy="60" r="16" fill="#052450" stroke="#0C60FC" strokeWidth="1.5" />
        <text x="22" y="64" textAnchor="middle" fill="#93C5FD" fontSize="7" fontFamily="sans-serif" fontWeight="bold">CRM</text>

        {/* Right node: Calendar */}
        <circle cx="178" cy="60" r="16" fill="#052450" stroke="#0C60FC" strokeWidth="1.5" />
        <text x="178" y="64" textAnchor="middle" fill="#93C5FD" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Cal</text>

        {/* Top node: Phone */}
        <circle cx="100" cy="14" r="12" fill="#052450" stroke="#0C60FC" strokeWidth="1.5" />
        <text x="100" y="18" textAnchor="middle" fill="#93C5FD" fontSize="7" fontFamily="sans-serif" fontWeight="bold">📞</text>

        {/* Bottom node: Notes */}
        <circle cx="100" cy="106" r="12" fill="#052450" stroke="#0C60FC" strokeWidth="1.5" />
        <text x="100" y="110" textAnchor="middle" fill="#93C5FD" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Notes</text>

        {/* Arrows */}
        <line x1="38" y1="60" x2="65" y2="60" stroke="#0C60FC" strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="135" y1="60" x2="162" y2="60" stroke="#0C60FC" strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="100" y1="26" x2="100" y2="40" stroke="#0C60FC" strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="100" y1="80" x2="100" y2="94" stroke="#0C60FC" strokeWidth="1.5" markerEnd="url(#arr)" />

        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#0C60FC" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

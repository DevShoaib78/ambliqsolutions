export default function Natural() {
  const bubbles = [
    { from: 'user', text: 'Hi, I need to book an appointment' },
    { from: 'ai',   text: "Of course! I can help with that. What day works for you?" },
    { from: 'user', text: 'Thursday morning please' },
  ]
  return (
    <div className="flex flex-col gap-2 w-full h-40 bg-gradient-to-br from-white to-[#dbeafe] rounded-xl px-4 py-3 justify-center overflow-hidden">
      {bubbles.map((b, i) => (
        <div key={i} className={`flex ${b.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
          <div
            className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[10px] leading-relaxed ${
              b.from === 'ai'
                ? 'bg-blue-500 text-white rounded-tl-sm'
                : 'bg-white text-ink ring-1 ring-slate-200 rounded-tr-sm'
            }`}
          >
            {b.text}
          </div>
        </div>
      ))}
      {/* Waveform indicator */}
      <div className="flex items-center gap-0.5 mt-1 justify-center" aria-hidden="true">
        {[3,5,8,6,10,7,4,9,5,3,7,10,6,4,8].map((h, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-blue-500 opacity-80"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  )
}

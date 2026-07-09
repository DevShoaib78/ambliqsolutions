export default function Booking() {
  const days = ['Mo','Tu','We','Th','Fr']
  const slots = [
    [false, true,  false, true,  false],
    [true,  false, true,  false, true ],
    [false, true,  true,  false, false],
  ]
  return (
    <div className="flex flex-col w-full h-40 bg-gradient-to-br from-white to-[#dbeafe] rounded-xl px-4 py-3 overflow-hidden justify-center">
      {/* Month header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-ink">July 2025</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-[10px] font-semibold text-blue-600">Booked</span>
        </div>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-5 gap-1 mb-1">
        {days.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-slate-500">{d}</div>
        ))}
      </div>
      {/* Calendar grid */}
      {slots.map((row, ri) => (
        <div key={ri} className="grid grid-cols-5 gap-1 mb-1">
          {row.map((booked, ci) => (
            <div
              key={ci}
              className={`rounded-md py-1.5 text-center text-[10px] font-bold ${
                booked
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/70 ring-1 ring-slate-200'
              }`}
            >
              {booked ? '✓' : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function MultiCall() {
  const calls = [
    { name: 'Sarah M.', time: '0:42', active: true },
    { name: 'James R.', time: '1:15', active: true },
    { name: 'Incoming…', time: '',    active: false },
  ]
  return (
    <div className="flex flex-col gap-2 w-full h-40 bg-gradient-to-br from-white to-[#dbeafe] rounded-xl px-4 py-4 justify-center overflow-hidden">
      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">Live Calls</p>
      {calls.map((c, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            c.active ? 'bg-white border border-blue-200 shadow-sm' : 'bg-white/60 border border-slate-200'
          }`}
        >
          <div className={`h-2 w-2 rounded-full shrink-0 ${c.active ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className="flex-1 text-xs font-semibold text-ink">{c.name}</span>
          {c.time && <span className="text-[10px] text-slate-500 font-mono">{c.time}</span>}
          {!c.active && (
            <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
              <path d="M6.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H9v11H6.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H11V4h2.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7Z" fill="#0C60FC" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Qualify() {
  return (
    <div className="flex flex-col gap-3 w-full h-40 bg-gradient-to-br from-white to-[#dbeafe] rounded-xl px-4 py-4 justify-center overflow-hidden">
      {/* Qualified lead card */}
      <div className="flex items-center gap-3 rounded-lg bg-white border border-blue-200 px-3 py-2.5 shadow-sm">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
            <path d="M4 10l4 4 8-8" stroke="#0C60FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-blue-600">Qualified Lead</p>
          <p className="text-[10px] text-slate-500">High intent · Meets criteria</p>
        </div>
      </div>
      {/* Unqualified lead card */}
      <div className="flex items-center gap-3 rounded-lg bg-white/60 border border-slate-200 px-3 py-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100">
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
            <path d="M6 6l8 8M14 6l-8 8" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-600">Unqualified Lead</p>
          <p className="text-[10px] text-slate-400">Below threshold · Filtered out</p>
        </div>
      </div>
    </div>
  )
}

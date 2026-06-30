export default function Qualify() {
  return (
    <div className="flex flex-col gap-3 w-full h-40 bg-navy-900 rounded-xl px-4 py-4 justify-center overflow-hidden">
      {/* Qualified lead card */}
      <div className="flex items-center gap-3 rounded-lg bg-white/10 border border-blue-500/30 px-3 py-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
            <path d="M4 10l4 4 8-8" stroke="#0C60FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-blue-400">Qualified Lead</p>
          <p className="text-[10px] text-white/60">High intent · Meets criteria</p>
        </div>
      </div>
      {/* Unqualified lead card */}
      <div className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 opacity-70">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/20">
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
            <path d="M6 6l8 8M14 6l-8 8" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-white/50">Unqualified Lead</p>
          <p className="text-[10px] text-white/40">Below threshold · Filtered out</p>
        </div>
      </div>
    </div>
  )
}

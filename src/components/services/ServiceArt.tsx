import type { ReactNode } from 'react'
import { Phone, Workflow, Check, X, Inbox, CalendarDays, RefreshCw, Mail, Bell } from 'lucide-react'

/** Light illustration frame shared by every service card. */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/70 p-4">
      {children}
    </div>
  )
}

function Avatar({ from = 'from-blue-400', to = 'to-blue-600', size = 'h-9 w-9' }: { from?: string; to?: string; size?: string }) {
  return <span className={`inline-block ${size} shrink-0 rounded-full bg-gradient-to-br ${from} ${to} ring-2 ring-white`} />
}

/* 1. AI Voice Agents — a call bubble with a live waveform inside pulse rings */
export function VoiceArt() {
  return (
    <Frame>
      <div className="relative flex items-center justify-center">
        <span className="absolute h-32 w-32 rounded-full border border-blue-200/70" />
        <span className="absolute h-44 w-44 rounded-full border border-blue-200/40" />
        <div className="relative z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-blue-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
            <Phone className="h-5 w-5 text-white" />
          </span>
          <div>
            <p className="text-sm font-bold leading-none text-ink">AI Voice Agent</p>
            <div className="mt-2 flex items-end gap-[3px]">
              {[9, 15, 21, 12, 18, 10, 16, 8].map((h, i) => (
                <span key={i} className="w-1.5 rounded-full bg-blue-500" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* 2. AI Workflow Automation — three connected nodes in a flow */
export function WorkflowArt() {
  const Node = ({ icon, tint }: { icon: ReactNode; tint: string }) => (
    <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-blue-100 ${tint}`}>
      {icon}
    </span>
  )
  const Arrow = () => (
    <svg width="34" height="14" viewBox="0 0 34 14" aria-hidden="true" className="text-blue-300">
      <path d="M0 7h27" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M25 2l7 5-7 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  return (
    <Frame>
      <div className="flex items-center">
        <Node tint="text-indigo-500" icon={<Inbox className="h-7 w-7" />} />
        <Arrow />
        <Node tint="text-blue-500" icon={<Workflow className="h-7 w-7" />} />
        <Arrow />
        <Node tint="text-emerald-500" icon={<Check className="h-7 w-7" />} />
      </div>
    </Frame>
  )
}

/* 3. Lead Qualification — a qualified vs unqualified lead list */
export function QualifyArt() {
  return (
    <Frame>
      <div className="flex w-full max-w-[300px] flex-col gap-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md ring-1 ring-emerald-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-4 w-4 text-emerald-600" />
          </span>
          <Avatar from="from-emerald-400" to="to-teal-500" size="h-8 w-8" />
          <div className="min-w-0">
            <p className="text-[13px] font-bold leading-none text-ink">Qualified Lead</p>
            <p className="mt-1.5 text-[10px] leading-none text-ink-muted">High intent · Meets criteria</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 opacity-85 shadow-md ring-1 ring-rose-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100">
            <X className="h-4 w-4 text-rose-500" />
          </span>
          <Avatar from="from-slate-300" to="to-slate-400" size="h-8 w-8" />
          <div className="min-w-0">
            <p className="text-[13px] font-bold leading-none text-ink">Unqualified</p>
            <p className="mt-1.5 text-[10px] leading-none text-ink-muted">Below threshold · Filtered</p>
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* 4. Appointment-Booking — a mini calendar with a booked slot */
export function BookingArt() {
  const cells = [0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 0, 1, 0]
  return (
    <Frame>
      <div className="w-full max-w-[264px] rounded-2xl bg-white p-4 shadow-lg ring-1 ring-blue-100">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">July 2025</span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-500">
            <CalendarDays className="h-3.5 w-3.5" /> Booked
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {cells.map((c, i) => (
            <span
              key={i}
              className={`flex h-7 items-center justify-center rounded-md text-[11px] font-bold ${
                c === 1 ? 'bg-blue-500 text-white' : c === 2 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100'
              }`}
            >
              {c === 1 ? '✓' : ''}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* 5. CRM & Follow-Up — a contact syncing out with a follow-up sequence */
export function CrmArt() {
  return (
    <Frame>
      <div className="flex w-full max-w-[280px] flex-col items-center gap-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md ring-1 ring-blue-100">
          <Avatar size="h-9 w-9" />
          <div>
            <p className="text-[13px] font-bold leading-none text-ink">Contact synced</p>
            <p className="mt-1.5 flex items-center gap-1 text-[10px] leading-none text-emerald-600">
              <RefreshCw className="h-3 w-3" /> CRM updated
            </p>
          </div>
          <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {[Mail, Bell, Phone].map((Icon, i) => (
            <span key={i} className="flex items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-500 shadow-md ring-1 ring-blue-100">
                <Icon className="h-5 w-5" />
              </span>
              {i < 2 && <span className="mx-1.5 h-px w-5 bg-blue-200" />}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  )
}

export const SERVICE_ART = [VoiceArt, WorkflowArt, QualifyArt, BookingArt, CrmArt]

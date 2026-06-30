// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Feature {
  id: string
  title: string
  body: string
  mockup: 'always-on' | 'qualify' | 'booking' | 'crm' | 'multicall' | 'natural'
}

export interface Service {
  id: string
  title: string
  body: string
  icon: string
}

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export interface Faq {
  q: string
  a: string
}

export interface Integration {
  name: string
  abbr: string
}

export interface RoiDefaults {
  monthlyCalls: number
  missedRate: number
  conversionRate: number
  avgValue: number
}

export interface Cta {
  label: string
  href: string
}

export interface Hero {
  headline: string
  accent: string
  subhead: string
}

export interface Problem {
  heading: string
  accent: string
  painList: string[]
  benefitList: string[]
  traditionalTiles: string[]
  systemTiles: string[]
}

export interface RoiLabels {
  inputs: { monthlyCalls: string; missedRate: string; conversionRate: string; avgValue: string }
  outputs: { recoveredLeads: string; newRevenue: string; annualRevenue: string }
  resultItems: { missedCalls: string; lostConversions: string; monthlyRevenueLost: string }
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface Results {
  stats: Stat[]
  testimonial: Testimonial
}

export interface ProcessStep {
  title: string
  body: string
}

export interface FinalCta {
  heading: string
  accent?: string
  sub: string
}

export interface SocialLink {
  platform: string
  href: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface Footer {
  tagline: string
  socials: SocialLink[]
  links: FooterLink[]
}

export interface Meta {
  title: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SectionHeader {
  eyebrow?: string
  heading: string
  accent?: string
  sub?: string
}

export interface IntegrationsHeader {
  eyebrow: string
  heading: string
  body: string
  cta: string
}

export interface BookPageCopy {
  eyebrow: string
  heading: string
  accent: string
  sub: string
  /** Calendly scheduling URL. When set, /book renders the live calendar; otherwise it shows the fallback card. Overridable via NEXT_PUBLIC_CALENDLY_URL. */
  calendlyUrl: string
  fallbackHeading: string
  fallbackBody: string
  whatToExpect: string[]
}

export interface Contact {
  email: string
}

export interface Site {
  meta: Meta
  nav: NavLink[]
  cta: Cta
  hero: Hero
  problem: Problem
  features: Feature[]
  featuresHeader: SectionHeader
  roiDefaults: RoiDefaults
  roi: RoiLabels
  results: Results
  resultsHeader: SectionHeader
  services: Service[]
  servicesHeader: SectionHeader
  integrations: Integration[]
  integrationsHeader: IntegrationsHeader
  process: ProcessStep[]
  processHeader: SectionHeader
  finalCta: FinalCta
  faq: Faq[]
  faqHeader: SectionHeader
  footer: Footer
  bookPage: BookPageCopy
  contact: Contact
}

// ─── Content ─────────────────────────────────────────────────────────────────

export const site: Site = {

  meta: {
    title: 'Ambliq Solutions — AI Automation for Service Businesses',
    description:
      'Ambliq Solutions helps service-based businesses capture, qualify, and convert more leads using AI automation. Our AI Voice Agents answer calls 24/7, qualify leads, and book appointments — so you never miss an opportunity.',
  },

  nav: [
    { label: 'How It Works', href: '#features' },
    { label: 'Results',      href: '#results' },
    { label: 'Services',     href: '#services' },
    { label: 'ROI',          href: '#roi' },
    { label: 'FAQ',          href: '#faq' },
  ],

  cta: { label: 'Book a Call', href: '/book' },

  // ── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    headline: 'Your AI Receptionist That Never Misses a Call',
    accent:   'Never Misses a Call',
    subhead:
      "Most businesses lose customers before a human ever picks up the phone. Ambliq's AI Voice Agent answers every call, qualifies every lead, and books appointments around the clock — so your team focuses on doing the work, not chasing it.",
  },

  // ── Problem ─────────────────────────────────────────────────────────────────
  problem: {
    heading: 'Speed Wins the Customer. Silence Loses Them.',
    accent:  'Speed Wins',
    painList: [
      'Calls go to voicemail and callers hang up',
      'Staff are too busy to follow up quickly',
      'Manual lead qualification wastes hours each week',
      'After-hours enquiries sit unanswered until morning',
      'The first business to respond usually wins the deal',
    ],
    benefitList: [
      'Every call answered within seconds, day or night',
      'Leads qualified automatically against your criteria',
      'Appointments booked directly into your calendar',
      'Zero additional headcount required',
      'Your team inherits only warm, ready-to-convert leads',
    ],
    traditionalTiles: [
      'Missed calls',
      'Slow follow-up',
      'Manual qualification',
      'Lost after-hours leads',
      'Overwhelmed staff',
    ],
    systemTiles: [
      'Instant answer',
      'Same-minute response',
      'Auto qualification',
      'Captured after-hours',
      'Staff handle warm leads',
    ],
  },

  // ── Features (6 voice-agent capabilities) ───────────────────────────────────
  features: [
    {
      id:      'always-on',
      title:   'Answers Every Call, 24 / 7',
      body:    "Your AI receptionist picks up on the first ring — whether it's 2 pm on a Tuesday or midnight on a Sunday. No more voicemail, no more missed opportunities because your office is closed.",
      mockup:  'always-on',
    },
    {
      id:      'qualify',
      title:   'Qualifies Leads to Your Criteria',
      body:    'The agent asks the right questions and scores each caller against the criteria you define. Only leads that meet your threshold move forward, saving your team from unproductive conversations.',
      mockup:  'qualify',
    },
    {
      id:      'booking',
      title:   'Books Appointments Automatically',
      body:    'Once a lead qualifies, the agent checks your calendar and locks in a time — confirmed and on the books before the caller hangs up. No back-and-forth, no scheduling delays.',
      mockup:  'booking',
    },
    {
      id:      'crm',
      title:   'Syncs with Your Existing Systems',
      body:    'Caller details, qualification notes, and appointment data are pushed straight into your CRM, calendar, or practice management software. Your workflow stays intact; you just get better data in it.',
      mockup:  'crm',
    },
    {
      id:      'multicall',
      title:   'Handles Multiple Calls at Once',
      body:    'A human receptionist can take one call at a time. Your AI agent has no such limit — every caller gets immediate attention, even during peak hours when phones would otherwise ring out.',
      mockup:  'multicall',
    },
    {
      id:      'natural',
      title:   'Sounds Natural, Works Multilingually',
      body:    'The agent holds real conversations — not a phone tree, not a bot. It adapts to how people actually speak, handles interruptions, and can engage callers in multiple languages to serve a broader audience.',
      mockup:  'natural',
    },
  ],

  featuresHeader: {
    eyebrow: 'What It Does',
    heading: 'What Your AI Receptionist Does',
    sub: 'Six core capabilities that work together to capture every lead and never let an enquiry fall through the cracks.',
  },

  // ── ROI Calculator ──────────────────────────────────────────────────────────
  roiDefaults: {
    monthlyCalls:    500,
    missedRate:      30,   // % of calls currently missed
    conversionRate:  20,   // % of qualified leads that convert
    avgValue:        2500, // average client value in $
  },

  roi: {
    inputs: {
      monthlyCalls:    'Monthly inbound calls',
      missedRate:      'Calls currently missed (%)',
      conversionRate:  'Lead-to-client conversion rate (%)',
      avgValue:        'Average client value ($)',
    },
    outputs: {
      recoveredLeads:  'Leads recovered per month',
      newRevenue:      'Estimated new monthly revenue',
      annualRevenue:   'Estimated annual revenue recovered',
    },
    resultItems: {
      missedCalls:        'Calls missed / mo',
      lostConversions:    'Lost conversions / mo',
      monthlyRevenueLost: 'Monthly revenue lost',
    },
  },

  // ── Results ─────────────────────────────────────────────────────────────────
  results: {
    stats: [
      // NOTE: illustrative placeholder figures — replace with Umar's real metrics before launch
      { value: 98,  suffix: '%',  label: 'Call answer rate' },
      { value: 40,  suffix: '%',  label: 'More leads qualified per month' },
      { value: 24,  suffix: '/7', label: 'Hours available' },
      { value: 3,   suffix: 'x',  label: 'Faster first response vs. human team' },
    ],
    testimonial: {
      // NOTE: placeholder testimonial — replace with a real client quote before launch
      quote:   '"Since adding the AI receptionist we haven\'t missed a single after-hours enquiry. Our booking rate improved noticeably within the first month."',
      name:    'Client Name',
      role:    'Owner',
      company: 'Service Business',
    },
  },

  resultsHeader: {
    eyebrow: 'Results',
    heading: 'Numbers That Speak for Themselves',
    accent:  'Speak for Themselves',
    sub:     'Early client results and system benchmarks — real data from businesses using AI voice automation.',
  },

  // ── Services ─────────────────────────────────────────────────────────────────
  services: [
    {
      id:    'voice-agents',
      title: 'AI Voice Agents',
      body:  'Human-like AI receptionists that answer calls, qualify callers, and book appointments — available around the clock without adding to your payroll.',
      icon:  'Phone',
    },
    {
      id:    'workflow-automation',
      title: 'AI Workflow Automation',
      body:  'Eliminate repetitive manual tasks across your operations. We map your workflows and deploy automation that runs reliably in the background, freeing your team for higher-value work.',
      icon:  'Workflow',
    },
    {
      id:    'lead-qualification',
      title: 'Lead Qualification Systems',
      body:  "Stop wasting time on leads that won't convert. We build automated qualification pipelines that score enquiries and surface only the prospects worth pursuing.",
      icon:  'Filter',
    },
    {
      id:    'appointment-booking',
      title: 'Appointment-Booking Automation',
      body:  'Connect your intake process directly to your calendar. Prospects self-schedule after qualification, reducing no-shows and eliminating the back-and-forth of manual scheduling.',
      icon:  'CalendarCheck',
    },
    {
      id:    'crm-integrations',
      title: 'CRM & Follow-Up Automation',
      body:  "Keep your CRM current automatically and trigger follow-up sequences at exactly the right moment. Leads don't fall through the cracks when the process runs itself.",
      icon:  'DatabaseZap',
    },
  ],

  servicesHeader: {
    eyebrow: 'What Else We Automate',
    heading: 'End-to-End Automation for Service Businesses',
    accent:  'End-to-End Automation',
    sub:     'Voice agents are just the start. We automate the entire lead-to-client journey so nothing falls through the cracks.',
  },

  // ── Integrations ─────────────────────────────────────────────────────────────
  integrations: [
    { name: 'HubSpot',       abbr: 'HS'  },
    { name: 'GoHighLevel',   abbr: 'GHL' },
    { name: 'Salesforce',    abbr: 'SF'  },
    { name: 'Calendly',      abbr: 'CAL' },
    { name: 'Twilio',        abbr: 'TW'  },
    { name: 'Make',          abbr: 'MK'  },
    { name: 'Zapier',        abbr: 'ZAP' },
    { name: 'Notion',        abbr: 'NO'  },
  ],

  integrationsHeader: {
    eyebrow: 'Integrations',
    heading: 'Plugs into the tools you already use',
    body:    'Ambliq connects with the platforms your team relies on — CRMs, calendars, scheduling tools, and automation workflows — without disrupting how you work.',
    cta:     'See How It Works',
  },

  // ── Process ──────────────────────────────────────────────────────────────────
  process: [
    {
      title: 'System Audit',
      body:  "We start by mapping how leads currently enter your business, where they're being lost, and which parts of your workflow are best suited to automation. No generic templates — we look at your actual situation.",
    },
    {
      title: 'Build & Integrate',
      body:  'We build your AI Voice Agent and automation flows, then integrate them with your existing tools — your CRM, calendar, phone system, and any other software your team already uses.',
    },
    {
      title: 'Launch & Optimise',
      body:  'Once live, we monitor performance and refine the system based on real call data. The agent improves over time, and you get clear reporting on calls answered, leads qualified, and appointments booked.',
    },
  ],

  processHeader: {
    eyebrow: 'Process',
    heading: 'How It Works',
    sub:     'Three clear steps from discovery call to a running system.',
  },

  // ── Final CTA ────────────────────────────────────────────────────────────────
  finalCta: {
    heading: 'Stop Letting Missed Calls Decide Your Revenue',
    accent:  'Missed Calls',
    sub:     "Book a 30-minute call with our team. We'll walk through your current lead flow, show you where automation fits, and give you a straight answer on what's possible — no hard sell, no obligation.",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'Will the AI voice agent sound robotic to my callers?',
      a: "No. The agent uses natural conversational speech — it holds a proper back-and-forth, handles pauses, and adapts to how the caller communicates. Most callers don't realise they're speaking with an AI until the business tells them. You can also configure the agent to identify itself as an AI upfront if that's your preference.",
    },
    {
      q: 'Does this replace my receptionist or existing staff?',
      a: 'No. The AI agent handles the volume and triage work — answering every call, collecting information, qualifying leads, and booking appointments. Your team handles the relationships, the complex queries, and the work that actually requires a human. Most clients find their staff are less stressed and more productive, not redundant.',
    },
    {
      q: "What happens when a caller asks something the agent can't answer?",
      a: "The agent is designed with clear handoff points. If a caller has a question outside the agent's scope, it can take a message, offer to transfer to a staff member, or schedule a callback — whichever option fits your business. Nothing gets dropped.",
    },
    {
      q: 'How long does it take to get up and running?',
      a: 'Most implementations are live within two to four weeks. The first week covers the system audit and configuration; the second covers integration testing and staff familiarisation. More complex setups involving multiple locations or systems may take slightly longer.',
    },
    {
      q: 'Which tools and systems does it integrate with?',
      a: "We connect with the most common platforms used by service businesses — HubSpot, GoHighLevel, Salesforce, Calendly, Twilio, Zapier, Make, and Notion, among others. If you use something not on that list, get in touch and we'll confirm compatibility before you commit.",
    },
    {
      q: 'How is Ambliq Solutions priced?',
      a: "Pricing depends on call volume, the complexity of your qualification criteria, and the integrations required. We don't publish a fixed price list because every setup is different. Book a discovery call and we'll give you a clear, itemised quote — no surprises.",
    },
  ],

  faqHeader: {
    eyebrow: 'FAQ',
    heading: 'Frequently Asked Questions',
    sub:     'Everything you need to know about getting started with Ambliq.',
  },

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    tagline: 'AI Automation that Captures. Qualifies. Converts.',
    socials: [
      { platform: 'LinkedIn (Company)',  href: 'https://www.linkedin.com/company/ambliq-solutions/' },
      { platform: 'LinkedIn (Founder)', href: 'https://www.linkedin.com/in/umarshoaib30/' },
    ],
    links: [
      { label: 'How It Works', href: '#features' },
      { label: 'Services',     href: '#services' },
      { label: 'FAQ',          href: '#faq' },
      { label: 'Book a Call',  href: '/book' },
      { label: 'Email Us',     href: 'mailto:hello@ambliqsolutions.com' },
    ],
  },

  // ── Book page ─────────────────────────────────────────────────────────────────
  bookPage: {
    eyebrow:         'Free Consultation',
    heading:         'Book your free AI audit call',
    accent:          'AI audit call',
    sub:             'A 30-minute session where we map your current lead flow, identify where calls are being lost, and show you exactly what AI automation can recover. No hard sell — just a straight answer.',
    calendlyUrl:     'https://calendly.com/umarshoaibdev/30min',
    fallbackHeading: 'Booking opens soon',
    fallbackBody:    'Our calendar is almost ready. In the meantime, reach out directly and we will get you scheduled right away.',
    whatToExpect: [
      'We map your current inbound call and lead flow',
      'Identify exactly where leads are slipping through the cracks',
      'Show you what an AI Voice Agent would do differently',
      'Give you a clear, itemised quote — no surprises',
    ],
  },

  // ── Contact ───────────────────────────────────────────────────────────────────
  contact: {
    email: 'hello@ambliqsolutions.com',
  },
}

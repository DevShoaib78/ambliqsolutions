import Hero          from '@/components/sections/Hero'
import Problem       from '@/components/sections/Problem'
import Features      from '@/components/sections/Features'
import RoiCalculator from '@/components/sections/RoiCalculator'
import Results       from '@/components/sections/Results'
import Services      from '@/components/sections/Services'
import Integrations  from '@/components/sections/Integrations'
import Process       from '@/components/sections/Process'
import FinalCta      from '@/components/sections/FinalCta'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Features />
      <RoiCalculator />
      <Results />
      <Services />
      <Integrations />
      <Process />
      <FinalCta />
      {/* FAQ section goes here */}
    </main>
  )
}

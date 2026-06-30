import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      {/* Features, Results, Services, ROI, FAQ, CTA sections go here */}
    </main>
  )
}

import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export default function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-surface">
      <Container>

        <Reveal>
          <SectionHeading
            eyebrow={site.faqHeader.eyebrow}
            heading={site.faqHeader.heading}
            sub={site.faqHeader.sub}
            className="mb-12"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <Accordion
              multiple={false}
              className="divide-y divide-bordersoft rounded-xl border border-bordersoft bg-white overflow-hidden"
            >
              {site.faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={String(i)}
                  className="border-none px-6"
                >
                  <AccordionTrigger className="py-5 text-sm sm:text-base font-semibold text-ink text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-ink-muted pb-5 text-sm leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

      </Container>
    </section>
  )
}

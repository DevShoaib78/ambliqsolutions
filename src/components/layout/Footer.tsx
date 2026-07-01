import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { site } from '@/content/site'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-gradient text-white">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-10 py-14 text-center md:grid-cols-12 md:gap-8 md:py-16 md:text-left">
          {/* Brand */}
          <div className="md:col-span-5 lg:col-span-6">
            <Image
              src="/brand/logo-full.webp"
              alt="Ambliq Solutions"
              width={280}
              height={173}
              className="mx-auto h-auto w-[190px] brightness-0 invert sm:w-[210px] md:mx-0 md:-ml-4 md:w-[250px] lg:w-[270px]"
            />
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-blue-400">
              Quick Links
            </p>
            <ul className="space-y-3">
              {site.footer.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect + CTA */}
          <div className="md:col-span-4 lg:col-span-3">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-blue-400">
              Connect
            </p>
            <ul className="mb-7 space-y-3">
              {site.footer.socials.map(social => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
            <CtaButton variant="gradient" className="px-6 py-3">
              Book a Call
            </CtaButton>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-white">
            &copy; {currentYear} Ambliq Solutions. All rights reserved.
          </p>
          <p className="text-xs text-white">Every missed call is a missed opportunity.</p>
        </div>
      </Container>
    </footer>
  )
}

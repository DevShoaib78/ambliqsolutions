import Link from 'next/link'
import { site } from '@/content/site'
import Container from '@/components/common/Container'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-gradient text-white">
      <Container>
        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="text-xl font-bold mb-2 text-white">Ambliq Solutions</p>
            <p className="text-sm text-blue-400 leading-relaxed max-w-xs">
              {site.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
              Quick Links
            </p>
            <ul className="space-y-3">
              {site.footer.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / socials */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              {site.footer.socials.map(social => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {currentYear} Ambliq Solutions. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

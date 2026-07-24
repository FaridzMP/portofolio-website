import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiHeart } from 'react-icons/fi'
import { OWNER, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ash-faint/15 py-12 bg-ink-soft/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-2xl font-bold text-cream">
              F<span className="text-accent">.</span>MP
            </span>
            <span className="font-mono text-xs text-ash tracking-widest">FULL-STACK DEVELOPER</span>
          </div>

          {/* Nav */}
          <nav className="flex gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-xs text-ash hover:text-accent transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: FiGithub, href: OWNER.github, label: 'GitHub' },
              { icon: FiLinkedin, href: OWNER.linkedin, label: 'LinkedIn' },
              { icon: FiInstagram, href: OWNER.instagram, label: 'Instagram' },
              { icon: FiMail, href: `mailto:${OWNER.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 border border-ash-faint/20 flex items-center justify-center text-ash hover:text-accent hover:border-accent/40 transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-ash-faint/10 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="font-body text-xs text-ash flex items-center justify-center gap-1.5">
            © {year} {OWNER.name}. Built with
            <FiHeart size={11} className="text-accent animate-pulse" />
            using Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

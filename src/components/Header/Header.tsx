'use client'

import { useState, useEffect } from 'react'
import { FiGithub, FiMenu, FiX } from 'react-icons/fi'
import { NAV_LINKS, OWNER } from '@/lib/constants'
import ThemeToggle from '../Toggle/Toggle'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Track active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-ash-faint/20 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-xl font-bold text-cream hover:text-accent transition-colors duration-300 cursor-pointer"
        >
          F<span className="text-accent">.</span>MP
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-body text-sm tracking-wide transition-all duration-300 relative group ${
                  isActive ? 'text-accent' : 'text-ash-light hover:text-cream'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash-light hover:text-accent transition-colors duration-300"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            className="btn-primary text-xs py-2 px-5"
          >
            Hire Me
          </a>
          <ThemeToggle />
        </div>

        

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-ash-light hover:text-cream transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 pt-4 pb-6 gap-4 bg-ink-soft/95 backdrop-blur-md border-t border-ash-faint/20">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left font-body text-sm text-ash-light hover:text-accent transition-colors duration-300 tracking-wide py-2 border-b border-ash-faint/10"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            className="btn-primary text-xs py-2 px-5 w-fit mt-2"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  )
}

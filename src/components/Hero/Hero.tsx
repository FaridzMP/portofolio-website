'use client'

import { useEffect, useState } from 'react'
import { FiArrowDown, FiGithub, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi'
import { OWNER, STATS } from '@/lib/constants'

const ROLES = [
  'Full-Stack Developer',
  'React Enthusiast',
  'Node.js Builder',
  'UI/UX Thinker',
  'Problem Solver',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Typewriter effect
useEffect(() => {
  const currentRole = ROLES[roleIndex]
  const speed = isDeleting ? 50 : 100

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      const nextText = currentRole.slice(0, displayText.length + 1)
      setDisplayText(nextText)
      if (nextText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      const nextText = currentRole.slice(0, Math.max(displayText.length - 1, 0))
      setDisplayText(nextText)
      if (nextText === '') {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % ROLES.length)
      }
    }
  }, speed)

  return () => clearTimeout(timeout)
}, [displayText, isDeleting, roleIndex])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-accent-cool/5 blur-[80px]" />
        
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#F5F0E8 1px, transparent 1px), linear-gradient(90deg, #F5F0E8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div
            className={`transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-mono text-xs text-ash-light tracking-widest uppercase">
                {OWNER.availability}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display font-black text-5xl md:text-7xl text-cream leading-tight mb-4">
              Hi, I&apos;m{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">{OWNER.name}</span>
              </span>
            </h1>

            {/* Role typewriter */}
            <div className="flex items-center gap-2 mb-6 h-8">
              <span className="font-mono text-lg text-accent-cool">
                &lt;
              </span>
              <span className="font-mono text-lg text-ash-light min-w-[220px]">
                {displayText}
                <span className="animate-blink text-accent">|</span>
              </span>
              <span className="font-mono text-lg text-accent-cool">
                /&gt;
              </span>
            </div>

            {/* Bio */}
            <p className="font-body text-ash-light text-lg leading-relaxed max-w-lg mb-10">
              {OWNER.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary"
              >
                View My Work
                <FiArrowDown size={16} />
              </a>
              <a
                href={OWNER.resume}
                download
                className="btn-outline"
              >
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs text-ash tracking-widest">FIND ME ON</span>
              <div className="h-px flex-1 bg-ash-faint max-w-[60px]" />
              <div className="flex gap-4">
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
                    className="group relative w-10 h-10 flex items-center justify-center border border-ash-faint/40 text-ash-light hover:text-accent hover:border-accent transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div
            className={`transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="card group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="font-display text-4xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-ash-light tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack mini preview */}
            <div className="mt-4 card">
              <div className="font-mono text-xs text-ash mb-3 tracking-widest">TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Node.js', 'Javascript', 'PHP', 'PostgreSQL', 'MySQL', 'Laravel', 'React', 'Tailwind', 'HTML', 'Git'].map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Location card */}
            <div className="mt-4 flex items-center gap-3 px-5 py-3 border border-ash-faint/20 bg-ink-muted/50">
              <span className="text-lg">📍</span>
              <div>
                <div className="font-body text-sm text-cream">{OWNER.location}</div>
                <div className="font-mono text-xs text-ash">WIB (UTC+7)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-xs text-ash tracking-widest">SCROLL</span>
          <FiArrowDown size={14} className="text-ash" />
        </div>
      </div>
    </section>
  )
}

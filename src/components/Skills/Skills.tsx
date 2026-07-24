'use client'

import { useEffect, useRef, useState } from 'react'
import { SKILLS } from '@/lib/constants'

function SkillBar({ name, level, category, delay }: { name: string; level: number; category: string; delay: number }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const categoryColor: Record<string, string> = {
    frontend: '#E8C547',
    backend: '#47C5E8',
    tools: '#A8E847',
  }

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-body text-sm text-ash-light group-hover:text-cream transition-colors">{name}</span>
        <span className="font-mono text-xs text-ash">{level}%</span>
      </div>
      <div className="h-1 bg-ash-faint/20 overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${level}%` : '0%',
            backgroundColor: categoryColor[category] || '#E8C547',
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'tools'>('frontend')

  const filteredSkills = SKILLS.filter(s => s.category === activeTab)
  const tabs: Array<{ key: 'frontend' | 'backend' | 'tools'; label: string }> = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'tools', label: 'Tools' },
  ]

  return (
    <section id="skills" className="py-28 relative">
      <div className="absolute left-0 top-0 w-96 h-96 bg-accent-cool/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-accent tracking-widest">02.</span>
          <h2 className="section-title !mb-0">Skills &amp; Expertise</h2>
          <div className="h-px flex-1 bg-ash-faint/20 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: Summary cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card text-center group">
              <div className="font-display text-4xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform inline-block">
                9+
              </div>
              <div className="font-body text-xs text-ash tracking-wide">Months Coding</div>
            </div>
            <div className="card text-center group">
              <div className="font-display text-4xl font-bold text-accent-cool mb-1 group-hover:scale-110 transition-transform inline-block">
                20+
              </div>
              <div className="font-body text-xs text-ash tracking-wide">Tech Stack</div>
            </div>
          </div>

          {/* Right: Skill bars */}
          <div className="lg:col-span-3">
            {/* Tab switcher */}
            <div className="flex gap-0 mb-8 border border-ash-faint/20 w-fit">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2 font-body text-sm transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-accent text-ink'
                      : 'text-ash-light hover:text-cream'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <div className="space-y-5">
              {filteredSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  category={skill.category}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'
import { PROJECTS } from '@/lib/constants'
import { Project } from '@/types'

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  if (featured) {
    return (
      <div className="group relative border border-ash-faint/20 bg-ink-soft hover:border-accent/30 transition-all duration-400 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent to-accent-cool w-0 group-hover:w-full transition-all duration-500" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="font-mono text-xs text-accent tracking-widest">FEATURED PROJECT</span>
              <h3 className="font-display text-2xl font-bold text-cream mt-1 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-3 pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash-light hover:text-accent transition-colors"
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub size={18} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash-light hover:text-accent transition-colors"
                  aria-label="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-ash-light leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group border border-ash-faint/20 bg-ink-soft hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <FiFolder size={28} className="text-accent/60 group-hover:text-accent transition-colors duration-300" />
        <div className="flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="text-ash hover:text-accent transition-colors" aria-label="GitHub">
              <FiGithub size={16} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="text-ash hover:text-accent transition-colors" aria-label="Live">
              <FiExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      <h3 className="font-display text-lg font-bold text-cream mb-2 group-hover:text-accent transition-colors duration-300">
        {project.title}
      </h3>
      <p className="font-body text-sm text-ash-light leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="font-mono text-xs text-ash">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'web' | 'backend'>('all')

  const featured = PROJECTS.filter(p => p.featured)
  const others = PROJECTS.filter(p => !p.featured)
  const filteredOthers = filter === 'all' ? others : others.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute left-0 top-1/2 w-80 h-80 bg-accent-cool/4 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest">03.</span>
          <h2 className="section-title !mb-0">Projects</h2>
          <div className="h-px flex-1 bg-ash-faint/20 max-w-xs" />
        </div>
        <p className="section-subtitle mb-16">
          Beberapa proyek yang telah saya bangun — dari side project hingga aplikasi production-ready.
        </p>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/FaridzMP"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FiGithub size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { FiDownload } from 'react-icons/fi'
import { OWNER } from '@/lib/constants'

export default function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="absolute right-0 top-0 w-96 h-96 bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-accent tracking-widest">01.</span>
          <h2 className="section-title !mb-0">About Me</h2>
          <div className="h-px flex-1 bg-ash-faint/20 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: Avatar */}
          <div className="lg:col-span-2">
            <div className="relative w-48 h-48">
              <div className="w-full h-full bg-ink-muted border border-ash-faint/30 flex items-center justify-center">
                <span className="font-display text-6xl font-bold text-accent/60">FM</span>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/30 -z-10" />
            </div>
          </div>

          {/* Right: Bio + Info */}
          <div className="lg:col-span-3 space-y-6">
            <p className="font-body text-ash-light leading-relaxed">{OWNER.bio}</p>
            <p className="font-body text-ash-light leading-relaxed">
              Ketika tidak coding, saya senang belajar teknologi baru. Dan di samping berkarier di bidang coding, saya memiliki hobi berkegiatan di alam bebas, seperti camping, hiking dan wall climbing.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { label: 'Name', value: OWNER.name },
                { label: 'Location', value: OWNER.location },
                { label: 'Email', value: OWNER.email },
                { label: 'Status', value: OWNER.availability },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="font-mono text-xs text-accent w-20 pt-0.5">{label}</span>
                  <span className="font-body text-sm text-ash-light">{value}</span>
                </div>
              ))}
            </div>

            <a href={OWNER.resume} download className="btn-outline mt-4 w-fit">
              <FiDownload size={15} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiSend, FiMapPin } from 'react-icons/fi'
import { OWNER } from '@/lib/constants'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal mengirim pesan')
      }

      setStatus('sent')
      setForm({ name: '', email: '', message: '', honeypot: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest">04.</span>
          <h2 className="section-title !mb-0">Get In Touch</h2>
          <div className="h-px flex-1 bg-ash-faint/20 max-w-xs" />
        </div>
        <p className="section-subtitle mb-16">
          Punya project menarik? Sedang mencari developer? Atau hanya ingin ngobrol — inbox saya selalu terbuka.
        </p>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-cream mb-3">Mari Terhubung</h3>
              <p className="font-body text-ash-light leading-relaxed text-sm">
                Saya terbuka untuk peluang freelance, posisi full-time, atau sekedar diskusi tentang teknologi.
                Biasanya membalas dalam 24 jam.
              </p>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${OWNER.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-ash-faint/30 flex items-center justify-center text-ash group-hover:border-accent group-hover:text-accent transition-all duration-300">
                  <FiMail size={16} />
                </div>
                <div>
                  <div className="font-mono text-xs text-ash tracking-widest">EMAIL</div>
                  <div className="font-body text-sm text-ash-light group-hover:text-accent transition-colors">{OWNER.email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-ash-faint/30 flex items-center justify-center text-ash">
                  <FiMapPin size={16} />
                </div>
                <div>
                  <div className="font-mono text-xs text-ash tracking-widest">LOCATION</div>
                  <div className="font-body text-sm text-ash-light">{OWNER.location}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-ash tracking-widest mb-4">SOCIAL</div>
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
                    className="w-10 h-10 border border-ash-faint/30 flex items-center justify-center text-ash-light hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot — hidden dari user, kalau terisi berarti bot */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-ash tracking-widest">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Faridz Muhamad Permana"
                    className="w-full bg-ink-soft border border-ash-faint/30 px-4 py-3 font-body text-sm text-cream placeholder:text-ash/40
                             focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-ash tracking-widest">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="faridz@gmail.com"
                    className="w-full bg-ink-soft border border-ash-faint/30 px-4 py-3 font-body text-sm text-cream placeholder:text-ash/40
                             focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-ash tracking-widest">MESSAGE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  rows={6}
                  placeholder="Halo Faridz, saya tertarik untuk..."
                  className="w-full bg-ink-soft border border-ash-faint/30 px-4 py-3 font-body text-sm text-cream placeholder:text-ash/40
                           focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`btn-primary w-full justify-center ${
                  status === 'sent' ? 'bg-green-500 text-white' : ''
                } ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {status === 'idle' && (
                  <>
                    Send Message
                    <FiSend size={15} />
                  </>
                )}
                {status === 'sending' && 'Sending...'}
                {status === 'sent' && '✓ Message Sent!'}
                {status === 'error' && (errorMsg || 'Error — Try Again')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
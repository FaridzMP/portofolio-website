import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'
import Projects from '@/components/Projects/Projects'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-ash-faint/30 to-transparent" />
      </div>

      <About />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-ash-faint/30 to-transparent" />
      </div>

      <Skills />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-ash-faint/30 to-transparent" />
      </div>

      <Projects />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-ash-faint/30 to-transparent" />
      </div>

      <Contact />
      <Footer />
    </main>
  )
}

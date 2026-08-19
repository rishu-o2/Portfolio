import { useState } from 'react'
import Preloader from './Preloader'
import ScrollProgress from './ScrollProgress'
import Cursor from './Cursor'
import Nav from './Nav'
import Hero from './Hero'
import AboutSection from './AboutSection'
import SkillsSection from './SkillsSection'
import Philosophy from './Philosophy'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'
import Grain from './Grain'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <ScrollProgress />
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <Grain />
          <Cursor />
          <Nav />
          <main>
            <Hero />
            <AboutSection />
            <SkillsSection />
            <Philosophy />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

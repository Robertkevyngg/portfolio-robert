import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Internship from './components/Internship'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Certifications from './components/Certifications'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Climber from './components/Climber'
import { useReveal } from './hooks/useReveal'
import { useKonami } from './hooks/useKonami'

export default function App() {
  useReveal()
  useKonami()

  return (
    <>
      <a href="#conteudo" className="skip-link">
        pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo" tabIndex={-1} className="relative outline-none">
        <Hero />
        <About />
        <Internship />
        <Projects />
        <Stack />
        <Certifications />
        <Timeline />
        <Contact />
        <Climber />
      </main>
      <Footer />
      <Toast />
    </>
  )
}

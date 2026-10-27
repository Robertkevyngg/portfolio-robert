import Background from './components/Background'
import Cursor from './components/Cursor'
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
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <a href="#conteudo" className="skip-link">
        pular para o conteúdo
      </a>
      <Background />
      <Cursor />
      <Nav />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Internship />
        <Projects />
        <Stack />
        <Certifications />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <Toast />
    </>
  )
}

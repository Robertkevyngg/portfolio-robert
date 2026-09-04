import Background from './components/Background'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Certifications from './components/Certifications'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal([])

  return (
    <>
      <Background />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Certifications />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

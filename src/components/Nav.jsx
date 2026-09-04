import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { IconGithub, IconLinkedin, IconMenu, IconClose } from './Icons'

const secoes = [
  { id: 'inicio', label: 'início' },
  { id: 'sobre', label: 'sobre' },
  { id: 'projetos', label: 'projetos' },
  { id: 'stack', label: 'stack' },
  { id: 'certificacoes', label: 'certificações' },
  { id: 'trajetoria', label: 'trajetória' },
  { id: 'contato', label: 'contato' },
]

export default function Nav() {
  const [ativa, setAtiva] = useState('inicio')
  const [solido, setSolido] = useState(false)
  const [aberto, setAberto] = useState(false)
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const aoRolar = () => {
      setSolido(window.scrollY > 40)
      const total = document.body.scrollHeight - innerHeight
      setProgresso(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visivel) setAtiva(visivel.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    secoes.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-cyan via-magenta to-lime"
        style={{ transform: `scaleX(${progresso / 100})` }}
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solido
            ? 'border-b border-line bg-void/90 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#inicio"
            className="group flex items-center gap-2.5 font-mono text-sm tracking-widest"
          >
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-lime text-lime" />
            <span className="text-ink transition-colors group-hover:text-cyan">
              {profile.handle}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {secoes.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative px-3 py-2 font-mono text-xs tracking-wider transition-colors ${
                    ativa === s.id ? 'text-cyan' : 'text-muted hover:text-ink'
                  }`}
                >
                  {ativa === s.id && <span className="mr-1 text-magenta">/</span>}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="p-2.5 text-muted transition-colors hover:text-cyan"
            >
              <IconGithub />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="p-2.5 text-muted transition-colors hover:text-cyan"
            >
              <IconLinkedin />
            </a>
            <button
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={aberto}
              className="p-2 text-ink lg:hidden"
            >
              {aberto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* menu mobile */}
      <div
        className={`fixed inset-0 z-30 bg-void/95 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
          aberto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-2">
          {secoes.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setAberto(false)}
                className="block px-6 py-3 font-display text-2xl font-medium text-ink transition-colors hover:text-cyan"
              >
                <span className="mr-3 font-mono text-xs text-magenta">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

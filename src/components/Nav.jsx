import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { IconGithub, IconLinkedin, IconMenu, IconClose, IconMail } from './Icons'

const secoes = [
  { id: 'inicio', label: 'início' },
  { id: 'sobre', label: 'sobre' },
  { id: 'estagio', label: 'estágio' },
  { id: 'projetos', label: 'projetos' },
  { id: 'stack', label: 'stack' },
  { id: 'certificacoes', label: 'certificações' },
  { id: 'trajetoria', label: 'trajetória' },
  { id: 'contato', label: 'contato' },
]

const iconeLink =
  'flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-cyan'

export default function Nav() {
  const [ativa, setAtiva] = useState('inicio')
  const [solido, setSolido] = useState(false)
  const [aberto, setAberto] = useState(false)
  const barra = useRef(null)
  const botaoMenu = useRef(null)
  const menu = useRef(null)

  // barra de progresso atualizada direto no DOM: rolar não re-renderiza a nav
  useEffect(() => {
    let raf = 0
    const aoRolar = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setSolido(window.scrollY > 40)
        const total = document.documentElement.scrollHeight - innerHeight
        if (barra.current) {
          barra.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`
        }
      })
    }
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      cancelAnimationFrame(raf)
    }
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

  // menu mobile: trava o scroll, fecha com Esc e mantém o foco dentro dele
  useEffect(() => {
    if (!aberto) return
    document.body.style.overflow = 'hidden'
    menu.current?.querySelector('a')?.focus()
    const botao = botaoMenu.current

    const aoTeclar = (e) => {
      if (e.key === 'Escape') setAberto(false)
      if (e.key !== 'Tab') return
      const focaveis = [botao, ...menu.current.querySelectorAll('a')]
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', aoTeclar)
      botao?.focus({ preventScroll: true })
    }
  }, [aberto])

  // se a tela crescer até o layout desktop com o menu aberto, fecha
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 80rem)')
    const aoMudar = () => mq.matches && setAberto(false)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  return (
    <>
      <div
        ref={barra}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cyan via-magenta to-lime"
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solido || aberto
            ? 'border-b border-line bg-void/90 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
        >
          <a
            href="#inicio"
            className="group flex items-center gap-2.5 py-2 font-mono text-sm tracking-widest"
          >
            <span
              className="pulse-dot inline-block h-2 w-2 rounded-full bg-lime text-lime"
              aria-hidden="true"
            />
            <span className="text-ink transition-colors group-hover:text-cyan">
              {profile.handle}
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {secoes.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={ativa === s.id ? 'location' : undefined}
                  className={`relative block px-3 py-2 font-mono text-xs tracking-wider transition-colors ${
                    ativa === s.id ? 'text-cyan' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span
                    className={`mr-1 text-magenta transition-opacity ${
                      ativa === s.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  >
                    /
                  </span>
                  {s.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-cyan transition-transform duration-300 ${
                      ativa === s.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub (abre em nova aba)"
              className={iconeLink}
            >
              <IconGithub />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn (abre em nova aba)"
              className={iconeLink}
            >
              <IconLinkedin />
            </a>
            <button
              ref={botaoMenu}
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              className="flex h-11 w-11 items-center justify-center text-ink xl:hidden"
            >
              {aberto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* menu mobile — `inert` quando fechado: some do teclado e do leitor de tela */}
      <div
        id="menu-mobile"
        ref={menu}
        inert={!aberto}
        className={`fixed inset-0 z-30 flex flex-col bg-void/95 backdrop-blur-2xl transition-opacity duration-300 xl:hidden ${
          aberto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-1 flex-col items-center justify-center gap-1">
          {secoes.map((s, i) => (
            <li
              key={s.id}
              className={`transition-all duration-500 ${
                aberto ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              style={{ transitionDelay: aberto ? `${80 + i * 40}ms` : '0ms' }}
            >
              <a
                href={`#${s.id}`}
                onClick={() => setAberto(false)}
                aria-current={ativa === s.id ? 'location' : undefined}
                className={`block px-6 py-3 font-display text-2xl font-medium transition-colors hover:text-cyan ${
                  ativa === s.id ? 'text-cyan' : 'text-ink'
                }`}
              >
                <span className="mr-3 font-mono text-xs text-magenta" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          onClick={() => setAberto(false)}
          className="mx-auto mb-10 flex items-center gap-2 px-4 py-3 font-mono text-xs tracking-wider text-muted hover:text-cyan"
        >
          <IconMail width="14" height="14" /> {profile.email}
        </a>
      </div>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'
import { IconClose, IconMenu } from './Icons'

const secoes = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'estagio', label: 'Estágio' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'stack', label: 'Stack' },
  { id: 'certificacoes', label: 'Certificados' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'contato', label: 'Contato' },
]

export default function Nav() {
  const [ativa, setAtiva] = useState('')
  const [aberto, setAberto] = useState(false)
  const botaoMenu = useRef(null)
  const menu = useRef(null)
  const barra = useRef(null)

  useEffect(() => {
    let raf = 0
    const atualizar = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barra.current)
        barra.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    const aoRolar = () => {
      if (!raf) raf = requestAnimationFrame(atualizar)
    }
    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
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
    ;['inicio', ...secoes.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // menu compacto: trava o scroll, fecha com Esc e mantém o foco dentro dele
  useEffect(() => {
    if (!aberto) return
    document.body.style.overflow = 'hidden'
    menu.current?.querySelector('a')?.focus()
    const botao = botaoMenu.current
    const aoTeclar = (e) => {
      if (e.key === 'Escape') setAberto(false)
      if (e.key !== 'Tab') return
      const foc = [botao, ...menu.current.querySelectorAll('a')]
      const primeiro = foc[0]
      const ultimo = foc[foc.length - 1]
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

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const aoMudar = () => mq.matches && setAberto(false)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-150">
      <nav
        aria-label="Principal"
        className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8"
      >
        <a
          href="#inicio"
          className="pixel flex h-full items-center gap-2 truncate text-[0.7rem] text-text transition-opacity hover:opacity-70"
        >
          <span className="text-neon-2">P1</span> {profile.nome}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {secoes.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={ativa === s.id ? 'location' : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  ativa === s.id ? 'text-text' : 'text-text-2 hover:text-text'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            ref={botaoMenu}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text transition-colors hover:bg-bg-2 lg:hidden"
          >
            {aberto ? <IconClose width="20" height="20" /> : <IconMenu width="20" height="20" />}
          </button>
        </div>
        {/* barra de progresso da "fase": acompanha a rolagem da página */}
        <span
          ref={barra}
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-neon-1),var(--color-neon-2),var(--color-neon-3))]"
        />
      </nav>

      <div
        id="menu-mobile"
        ref={menu}
        inert={!aberto}
        className={`fixed inset-0 top-14 bg-[var(--glass-bg)] backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
          aberto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {secoes.map((s) => (
            <li key={s.id} className="border-b border-line/60">
              <a
                href={`#${s.id}`}
                onClick={() => setAberto(false)}
                aria-current={ativa === s.id ? 'location' : undefined}
                className={`block py-4 text-2xl font-semibold tracking-tight transition-colors ${
                  ativa === s.id ? 'text-accent' : 'text-text'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

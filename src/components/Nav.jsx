import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { IconGithub, IconLinkedin, IconMenu, IconClose, IconMail } from './Icons'

const secoes = [
  { id: 'sobre', label: 'sobre', area: '100' },
  { id: 'estagio', label: 'estágio', area: '200' },
  { id: 'projetos', label: 'projetos', area: '300' },
  { id: 'stack', label: 'stack', area: '400' },
  { id: 'certificacoes', label: 'certificações', area: '500' },
  { id: 'trajetoria', label: 'trajetória', area: '600' },
  { id: 'contato', label: 'contato', area: '700' },
]

const iconeLink =
  'flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-signal'

export default function Nav() {
  const [ativa, setAtiva] = useState('')
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

  // se a tela crescer até o layout com todos os links, fecha o menu
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 80rem)')
    const aoMudar = () => mq.matches && setAberto(false)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b-[1.5px] border-ink bg-paper/92 backdrop-blur-md">
        <nav
          aria-label="Principal"
          className="mx-auto flex h-16 max-w-6xl items-stretch justify-between px-4 sm:px-8"
        >
          <a href="#inicio" className="group flex items-center gap-3">
            <span className="display text-2xl whitespace-nowrap text-ink transition-colors group-hover:text-signal">
              {profile.nome}
            </span>
            <span className="label hidden border-l-[1.5px] border-ink pl-3 whitespace-nowrap text-ink-2 sm:block xl:hidden">
              des. rg-001 · rev. 26
            </span>
          </a>

          <ul className="hidden items-stretch xl:flex">
            {secoes.map((s) => (
              <li key={s.id} className="flex">
                <a
                  href={`#${s.id}`}
                  aria-current={ativa === s.id ? 'location' : undefined}
                  className={`relative flex items-center gap-1.5 px-3 transition-colors ${
                    ativa === s.id ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  <span className="label text-signal">{s.area}</span>
                  <span className="label">{s.label}</span>
                  <span
                    className={`absolute inset-x-3 -bottom-[1.5px] h-[3px] origin-left bg-signal-bg transition-transform duration-300 ${
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
              className="ml-1 flex h-11 w-11 items-center justify-center border-[1.5px] border-ink text-ink xl:hidden"
            >
              {aberto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>
        <div
          ref={barra}
          className="absolute inset-x-0 -bottom-[1.5px] h-[3px] origin-left scale-x-0 bg-signal-bg"
          aria-hidden="true"
        />
      </header>

      {/* menu compacto — `inert` quando fechado: some do teclado e do leitor de tela */}
      <div
        id="menu-mobile"
        ref={menu}
        inert={!aberto}
        className={`fixed inset-0 z-30 flex flex-col bg-paper pt-16 transition-[clip-path] duration-500 ease-[cubic-bezier(.7,0,.2,1)] xl:hidden ${
          aberto ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <ul className="flex flex-1 flex-col justify-center px-6 sm:px-10">
          {secoes.map((s) => (
            <li key={s.id} className="border-b-[1.5px] border-ink first:border-t-[1.5px]">
              <a
                href={`#${s.id}`}
                onClick={() => setAberto(false)}
                aria-current={ativa === s.id ? 'location' : undefined}
                className="group flex items-baseline gap-4 py-3"
              >
                <span className="label w-10 text-signal">{s.area}</span>
                <span
                  className={`display text-[2.6rem] transition-transform group-hover:translate-x-2 ${
                    ativa === s.id ? 'text-signal' : 'text-ink'
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          onClick={() => setAberto(false)}
          className="label mx-auto mb-8 flex items-center gap-2 px-4 py-3 text-ink-2 hover:text-ink"
        >
          <IconMail width="14" height="14" /> {profile.email}
        </a>
      </div>
    </>
  )
}

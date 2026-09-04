import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { IconArrow, IconMail, IconShield } from './Icons'

function useTypewriter(frases, velocidade = 65, pausa = 1900) {
  const [texto, setTexto] = useState('')
  const [i, setI] = useState(0)
  const [apagando, setApagando] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTexto(frases[0])
      return
    }
    const atual = frases[i % frases.length]
    let t

    if (!apagando && texto === atual) {
      t = setTimeout(() => setApagando(true), pausa)
    } else if (apagando && texto === '') {
      setApagando(false)
      setI((v) => v + 1)
    } else {
      t = setTimeout(
        () =>
          setTexto(
            apagando ? atual.slice(0, texto.length - 1) : atual.slice(0, texto.length + 1),
          ),
        apagando ? velocidade / 2 : velocidade,
      )
    }
    return () => clearTimeout(t)
  }, [texto, apagando, i, frases, velocidade, pausa])

  return texto
}

export default function Hero() {
  const digitado = useTypewriter(profile.papeis)

  return (
    <section id="inicio" className="relative z-10 flex min-h-[100svh] items-center px-5 pt-28 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* coluna esquerda */}
          <div>
            <div className="reveal mb-7 inline-flex items-center gap-2.5 border border-line bg-panel/60 px-3.5 py-1.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime text-lime" />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] text-muted uppercase">
                aberto a estágio e projetos
              </span>
            </div>

            <p className="reveal kicker mb-5">{profile.cargo}</p>

            <h1 className="reveal font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
              <span className="glitch text-ink" data-text="Robert">
                Robert
              </span>
              <span className="glitch text-ink" data-text="Gomes">
                Gomes
              </span>
            </h1>

            <p className="reveal mt-6 font-mono text-base text-cyan sm:text-lg">
              <span className="text-magenta">&gt;</span>{' '}
              <span className="caret">{digitado}</span>
            </p>

            <p className="reveal mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.bioCurta}
            </p>

            <div className="reveal mt-10 flex flex-wrap gap-3">
              <a href="#projetos" className="btn">
                <span>ver projetos</span>
                <IconArrow />
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn--ghost">
                <IconMail />
                <span>falar comigo</span>
              </a>
            </div>

            <dl className="reveal mt-14 grid max-w-lg grid-cols-2 gap-y-6 sm:grid-cols-4">
              {profile.destaques.map((d) => (
                <div key={d.label}>
                  <dt className="font-display text-2xl font-bold text-cyan sm:text-3xl">
                    {d.valor}
                  </dt>
                  <dd className="mt-1 font-mono text-[0.65rem] leading-snug tracking-wide text-muted uppercase">
                    {d.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* coluna direita — terminal */}
          <div className="reveal panel bracket hidden p-1 lg:block">
            <div className="sweep" />
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
              <span className="ml-2 font-mono text-[0.68rem] text-muted">
                robert@imt: ~/portfolio
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed text-muted">
              <code>
                <span className="text-lime">$</span> whoami{'\n'}
                <span className="text-ink">{profile.nome}</span>
                {'\n\n'}
                <span className="text-lime">$</span> cat perfil.json{'\n'}
                {'{'}
                {'\n'}
                {'  '}
                <span className="text-cyan">"curso"</span>:{' '}
                <span className="text-amber">"Ciência da Computação — IMT"</span>,{'\n'}
                {'  '}
                <span className="text-cyan">"local"</span>:{' '}
                <span className="text-amber">"Diadema, SP"</span>,{'\n'}
                {'  '}
                <span className="text-cyan">"foco"</span>: [
                <span className="text-amber">"software"</span>,{' '}
                <span className="text-amber">"segurança"</span>,{' '}
                <span className="text-amber">"dados"</span>],{'\n'}
                {'  '}
                <span className="text-cyan">"desde"</span>:{' '}
                <span className="text-magenta">2024</span>
                {'\n'}
                {'}'}
                {'\n\n'}
                <span className="text-lime">$</span> ./status --agora{'\n'}
                <span className="text-ink">construindo um IDS com ML</span>
                <span className="caret" />
              </code>
            </pre>
          </div>
        </div>

        {/* faixa rolante */}
        <div className="marquee-wrap reveal mt-20 overflow-hidden border-y border-line py-3.5">
          <div className="marquee">
            {[0, 1].map((n) => (
              <div key={n} className="flex shrink-0 items-center">
                {[
                  'PYTHON',
                  'JAVA',
                  'REACT',
                  'FASTAPI',
                  'MYSQL',
                  'AWS',
                  'DOCKER',
                  'LINUX',
                  'MACHINE LEARNING',
                  'CIBERSEGURANÇA',
                ].map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-6 px-6 font-mono text-xs tracking-[0.25em] text-muted"
                  >
                    {t}
                    <IconShield className="text-cyan/40" width="12" height="12" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

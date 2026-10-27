import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { reposFallback } from '../data/reposFallback'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { IconArrow, IconMail, IconPause, IconPlay, IconShield } from './Icons'

function useTypewriter(frases, velocidade = 65, pausa = 1900) {
  const reduzido = useReducedMotion()
  const [texto, setTexto] = useState('')
  const [i, setI] = useState(0)
  const [apagando, setApagando] = useState(false)

  useEffect(() => {
    if (reduzido) return
    const atual = frases[i % frases.length]
    let t

    if (!apagando && texto === atual) {
      t = setTimeout(() => setApagando(true), pausa)
    } else if (apagando && texto === '') {
      t = setTimeout(() => {
        setApagando(false)
        setI((v) => v + 1)
      }, velocidade * 4)
    } else {
      t = setTimeout(
        () =>
          setTexto(apagando ? atual.slice(0, texto.length - 1) : atual.slice(0, texto.length + 1)),
        apagando ? velocidade / 2 : velocidade,
      )
    }
    return () => clearTimeout(t)
  }, [texto, apagando, i, frases, velocidade, pausa, reduzido])

  return reduzido ? frases[0] : texto
}

export default function Hero() {
  const digitado = useTypewriter(profile.papeis)
  const { repos, estado } = useGithubRepos(profile.handle)
  const [faixaPausada, setFaixaPausada] = useState(false)

  const totalRepos = estado === 'carregando' ? reposFallback.length : repos.length
  const numeros = profile.destaques.map((d) => ({ ...d, valor: d.valor ?? totalRepos }))

  return (
    <section
      id="inicio"
      aria-label="Apresentação"
      className="relative z-10 flex min-h-[100svh] items-center px-5 pt-28 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* coluna esquerda */}
          <div>
            <div
              className="rise mb-7 inline-flex items-center gap-2.5 border border-line bg-panel/60 px-3.5 py-1.5"
              style={{ '--d': '200ms' }}
            >
              <span
                className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime text-lime"
                aria-hidden="true"
              />
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
                aberto a estágio e projetos
              </span>
            </div>

            <p className="rise kicker mb-5" style={{ '--d': '120ms' }}>
              {profile.cargo}
            </p>

            {/* O nome vai uma vez para o leitor de tela; as camadas do glitch são só visuais */}
            <h1
              className="rise font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-bold tracking-tight"
              style={{ '--d': '0ms' }}
            >
              <span className="sr-only">{profile.nome}</span>
              <span aria-hidden="true">
                {profile.nome.split(' ').map((parte) => (
                  <span key={parte} className="glitch text-ink" data-text={parte}>
                    {parte}
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="rise mt-6 min-h-[1.75em] font-mono text-base text-cyan sm:text-lg"
              style={{ '--d': '260ms' }}
            >
              <span className="sr-only">{profile.papeis.join(', ')}</span>
              <span aria-hidden="true">
                <span className="text-magenta">&gt;</span> <span className="caret">{digitado}</span>
              </span>
            </p>

            <p
              className="rise mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              style={{ '--d': '320ms' }}
            >
              {profile.bioCurta}
            </p>

            <div className="rise mt-10 flex flex-wrap gap-3" style={{ '--d': '380ms' }}>
              <a href="#projetos" className="btn">
                <span>ver projetos</span>
                <IconArrow />
              </a>
              <a href="#contato" className="btn btn--ghost">
                <IconMail />
                <span>falar comigo</span>
              </a>
            </div>

            <dl
              className="rise mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
              style={{ '--d': '440ms' }}
            >
              {numeros.map((d) => (
                <div key={d.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 font-mono text-[0.7rem] leading-snug tracking-wide text-muted uppercase">
                    {d.label}
                  </dt>
                  <dd className="font-display text-2xl font-bold text-cyan tabular-nums sm:text-3xl">
                    {d.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* coluna direita — terminal (decorativo: repete dados que já estão na página) */}
          <div
            className="rise panel bracket hidden p-1 lg:block"
            style={{ '--d': '260ms' }}
            aria-hidden="true"
          >
            <div className="sweep" />
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
              <span className="ml-2 font-mono text-[0.7rem] text-muted">
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
                <span className="text-amber">"{profile.curso}"</span>,{'\n'}
                {'  '}
                <span className="text-cyan">"local"</span>:{' '}
                <span className="text-amber">"{profile.localCurto}"</span>,{'\n'}
                {'  '}
                <span className="text-cyan">"foco"</span>: [
                {profile.foco.map((f, i) => (
                  <span key={f}>
                    {i > 0 && ', '}
                    <span className="text-amber">"{f}"</span>
                  </span>
                ))}
                ],{'\n'}
                {'  '}
                <span className="text-cyan">"desde"</span>:{' '}
                <span className="text-magenta">{profile.desde}</span>
                {'\n'}
                {'}'}
                {'\n\n'}
                <span className="text-lime">$</span> ./status --agora{'\n'}
                <span className="text-ink">{profile.statusAgora}</span>
                <span className="caret" />
              </code>
            </pre>
          </div>
        </div>

        {/* faixa rolante — decorativa (a lista completa está na seção Stack) */}
        <div
          className="marquee-wrap rise relative mt-20 flex items-center border-y border-line"
          data-pausado={faixaPausada}
          style={{ '--d': '500ms' }}
        >
          <div className="mr-11 min-w-0 flex-1 overflow-hidden py-3.5" aria-hidden="true">
            <div className="marquee">
              {[0, 1].map((n) => (
                <div key={n} className="flex shrink-0 items-center">
                  {profile.faixa.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-6 px-6 font-mono text-xs tracking-[0.25em] text-muted uppercase"
                    >
                      {t}
                      <IconShield className="text-cyan/40" width="12" height="12" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFaixaPausada((v) => !v)}
            aria-label={faixaPausada ? 'Retomar animação da faixa' : 'Pausar animação da faixa'}
            aria-pressed={faixaPausada}
            className="absolute right-0 flex h-full w-11 shrink-0 items-center justify-center border-l border-line bg-void/80 text-muted backdrop-blur transition-colors hover:text-cyan"
          >
            {faixaPausada ? <IconPlay /> : <IconPause />}
          </button>
        </div>
      </div>
    </section>
  )
}

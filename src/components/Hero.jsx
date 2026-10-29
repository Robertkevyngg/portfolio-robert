import { useRef } from 'react'
import { certificacoes, profile } from '../data/profile'
import { reposFallback } from '../data/reposFallback'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { gsap, comMovimento, useGSAP } from '../lib/gsap'
import Sprite from './Sprite'

export default function Hero() {
  const raiz = useRef(null)
  const { repos, estado } = useGithubRepos(profile.handle)
  const totalRepos = estado === 'carregando' ? reposFallback.length : repos.length
  const numeros = profile.destaques.map((d) => ({ ...d, valor: d.valor ?? totalRepos }))

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz)
      gsap.set(q('[data-intro]'), { visibility: 'visible' })
      comMovimento(() => {
        gsap
          .timeline({ defaults: { ease: 'steps(6)', duration: 0.6 } })
          .from(q('[data-fade]'), { y: 24, autoAlpha: 0, stagger: 0.12 })
          .from(q('.stat'), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.4 }, '-=0.3')
      })
    },
    { scope: raiz },
  )

  return (
    <section
      id="inicio"
      ref={raiz}
      aria-label="Apresentação"
      className="estrelas relative overflow-hidden px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32"
    >
      <div className="mx-auto max-w-5xl" data-intro>
        {/* placar do topo, como num gabinete */}
        <div
          data-fade
          className="pixel flex flex-wrap justify-between gap-3 text-[0.6rem] text-text-2 sm:text-xs"
        >
          <span>
            <span className="text-neon-2">1UP</span> {profile.handle}
          </span>
          <span>
            <span className="text-neon-3">HI-SCORE</span> {String(totalRepos).padStart(6, '0')}
          </span>
          <span>
            <span className="text-neon-1">CRÉDITOS</span>{' '}
            {String(certificacoes.length).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="text-center md:text-left">
            <p data-fade className="eyebrow text-[0.62rem] sm:text-xs">
              {profile.cargo}
            </p>
            <h1 data-fade className="neon mt-6 text-[clamp(1.9rem,6.4vw,4.2rem)]">
              Robert
              <br />
              Gomes
            </h1>
            <p
              data-fade
              className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-text-2 sm:text-2xl md:mx-0"
            >
              {profile.bioCurta}{' '}
              <span className="text-text">Nas horas vagas: filmes, jogos e mais uma partida.</span>
            </p>

            <div
              data-fade
              className="mt-7 inline-flex items-center gap-2 border-2 border-line bg-bg-2 px-4 py-2 text-sm text-text-2"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping bg-good opacity-60" />
                <span className="relative inline-flex h-2 w-2 bg-good" />
              </span>
              {profile.selo}
            </div>

            <div
              data-fade
              className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
            >
              <a href="#sobre" className="btn">
                ▶ Start
              </a>
              <a href="#contato" className="btn btn--ghost">
                2P · Falar comigo
              </a>
            </div>
          </div>

          {/* o personagem na tela de título */}
          <div data-fade className="flex flex-col items-center" aria-hidden="true">
            <div className="flutuar sprite-hero-wrap">
              <Sprite quadro="parado" escala={9} className="sprite-hero" />
            </div>
            <div className="relative mt-2 h-[18px] w-56">
              <div className="viga top-0!" />
            </div>
            <p className="pixel mt-6 text-[0.6rem] text-text-2 sm:text-xs">P1 · ROBERT</p>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-4 sm:mt-24 sm:grid-cols-4">
          {numeros.map((d) => (
            <div
              key={d.label}
              className="stat card flex flex-col items-center px-4 py-6 text-center"
            >
              <dt className="order-2 mt-3 text-sm leading-snug text-text-2">{d.label}</dt>
              <dd className="pixel order-1 text-xl text-accent tabular-nums sm:text-2xl">
                {d.valor}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href="#sobre"
          className="pixel piscar mx-auto mt-16 block w-fit py-2 text-[0.62rem] text-text sm:text-xs"
        >
          Press start ▼<span className="sr-only"> — ir para a primeira seção</span>
        </a>
      </div>
    </section>
  )
}

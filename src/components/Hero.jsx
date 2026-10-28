import { useRef } from 'react'
import { profile } from '../data/profile'
import { reposFallback } from '../data/reposFallback'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { gsap, comMovimento, useGSAP } from '../lib/gsap'
import { IconArrow } from './Icons'

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
          .timeline({ defaults: { ease: 'power3.out', duration: 1 } })
          .from(q('[data-fade]'), { y: 22, autoAlpha: 0, stagger: 0.09 })
          .from(q('.stat'), { y: 18, autoAlpha: 0, stagger: 0.07, duration: 0.7 }, '-=0.5')
      })
    },
    { scope: raiz },
  )

  return (
    <section
      id="inicio"
      ref={raiz}
      aria-label="Apresentação"
      className="relative px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28"
    >
      <div className="mx-auto max-w-4xl text-center" data-intro>
        <p data-fade className="eyebrow text-base sm:text-lg">
          {profile.cargo}
        </p>
        <h1
          data-fade
          className="headline mx-auto mt-4 max-w-3xl text-[clamp(2.8rem,9vw,5.5rem)] text-text"
        >
          {profile.nome}
          <span className="text-accent">.</span>
        </h1>
        <p
          data-fade
          className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-text-2 sm:text-2xl"
        >
          {profile.bioCurta}
        </p>

        <div
          data-fade
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-bg-2 px-4 py-2 text-sm text-text-2"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
          </span>
          {profile.selo}
        </div>

        <div data-fade className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#projetos" className="btn">
            Ver projetos <IconArrow width="16" height="16" />
          </a>
          <a href="#contato" className="btn btn--ghost">
            Falar comigo
          </a>
        </div>
      </div>

      <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-3 sm:mt-24 sm:grid-cols-4 sm:gap-4">
        {numeros.map((d) => (
          <div key={d.label} className="stat tile flex flex-col items-center px-4 py-7 text-center">
            <dt className="order-2 mt-2 text-sm leading-snug text-text-2">{d.label}</dt>
            <dd className="headline order-1 text-4xl text-text tabular-nums sm:text-5xl">
              {d.valor}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

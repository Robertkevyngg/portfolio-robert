import { useRef } from 'react'
import { profile } from '../data/profile'
import { reposFallback } from '../data/reposFallback'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { gsap, comMovimento, useGSAP } from '../lib/gsap'
import Instrumento from './Instrumento'
import { IconArrow } from './Icons'

export default function Hero() {
  const raiz = useRef(null)
  const { repos, estado } = useGithubRepos(profile.handle)
  const totalRepos = estado === 'carregando' ? reposFallback.length : repos.length
  const leituras = profile.destaques.map((d) => ({ ...d, valor: d.valor ?? totalRepos }))
  const [nome, sobrenome] = profile.nome.toUpperCase().split(' ')

  // entrada: a cota "abre", o nome sobe da linha de base e a malha liga instrumento por instrumento
  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz)
      gsap.set(q('[data-intro]'), { visibility: 'visible' })
      comMovimento(() => {
        gsap
          .timeline({ defaults: { ease: 'expo.out', duration: 1.1 } })
          .from(q('.hero-linha'), { yPercent: 105, stagger: 0.12 })
          .from(q('.hero-cota'), { clipPath: 'inset(0 50% 0 50%)', duration: 0.9 }, 0.15)
          .from(q('.hero-texto'), { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, 0.35)
          .from(q('.malha .instr'), { scale: 0.4, autoAlpha: 0, stagger: 0.12, duration: 0.6 }, 0.5)
          .from(
            q('.malha .flow-line'),
            { clipPath: 'inset(0 100% 0 0)', stagger: 0.12, duration: 0.6, ease: 'power2.inOut' },
            0.6,
          )
          .from(q('.leitura'), { y: 12, autoAlpha: 0, stagger: 0.06, duration: 0.6 }, 0.8)
      })
    },
    { scope: raiz },
  )

  return (
    <section
      id="inicio"
      ref={raiz}
      aria-label="Apresentação"
      className="relative z-10 px-4 pt-16 sm:px-8"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[36px_1fr] gap-x-4 sm:grid-cols-[64px_1fr] sm:gap-x-8">
        {/* início da tubulação: a origem do processo */}
        <div className="relative" aria-hidden="true">
          <div className="pipe top-16! sm:top-[5.5rem]!">
            <div className="pipe-fill scale-y-100!" />
          </div>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-[5.5rem]">
            <Instrumento
              tag="RG"
              numero="000"
              tamanho={56}
              ligado
              className="hidden sm:inline-flex"
            />
            <Instrumento tag="RG" numero="000" tamanho={36} ligado className="sm:hidden" />
          </div>
        </div>

        <div className="min-w-0 pt-14 pb-20 sm:pt-20" data-intro>
          <div className="hero-texto flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink pb-3">
            <p className="label text-ink">planta de competências · des. rg-001</p>
            <p className="label text-ink-2">folha 1/1 · escala 1:1</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_13rem] lg:items-end">
            <div>
              {/* cota sobre o nome */}
              <div className="hero-cota cota max-w-[44rem]">
                <span className="cota-ponta cota-ponta--e" aria-hidden="true" />
                <span className="label shrink-0 text-ink">{profile.cargo}</span>
                <span className="cota-ponta cota-ponta--d" aria-hidden="true" />
              </div>

              <h1 className="display mt-3 text-[clamp(5.2rem,17vw,13rem)] text-ink">
                <span className="sr-only">{profile.nome}</span>
                <span aria-hidden="true">
                  <span className="block overflow-hidden pb-[0.04em]">
                    <span className="hero-linha block">{nome}</span>
                  </span>
                  <span className="block overflow-hidden pb-[0.04em]">
                    <span className="hero-linha block">
                      {sobrenome}
                      <span className="text-signal">.</span>
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* leituras — números como mostradores de instrumento */}
            <dl className="grid grid-cols-2 border-t-[1.5px] border-l-[1.5px] border-ink sm:grid-cols-4 lg:mb-[0.9rem] lg:grid-cols-1">
              {leituras.map((d) => (
                <div
                  key={d.label}
                  className="leitura flex flex-col-reverse justify-end border-r-[1.5px] border-b-[1.5px] border-ink bg-sheet/80 px-4 py-3"
                >
                  <dt className="label mt-1 text-ink-2">{d.label}</dt>
                  <dd className="display text-5xl text-ink tabular-nums">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="hero-texto inline-flex items-center gap-2.5 border-[1.5px] border-ink bg-sheet px-3 py-2">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inset-0 animate-ping rounded-full bg-run opacity-60" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-run" />
                </span>
                <span className="label text-ink">em operação — {profile.selo}</span>
              </p>
              <p className="hero-texto mt-6 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
                {profile.bioCurta}
              </p>
            </div>
            <div className="hero-texto flex flex-wrap gap-4">
              <a href="#projetos" className="btn">
                ver projetos <IconArrow />
              </a>
              <a href="#contato" className="btn btn--outline">
                falar comigo
              </a>
            </div>
          </div>

          {/* malha de competências — diagrama vivo */}
          <figure className="mt-16">
            <figcaption className="label mb-4 flex items-center gap-3 text-ink-2">
              <span className="text-signal">fig. 0</span> malha de competências — do campo aos dados
            </figcaption>
            <ol className="malha sheet flex flex-col gap-0 p-5 sm:p-7 lg:flex-row lg:items-start">
              {profile.malha.map((n, i) => (
                <li key={n.tag} className="flex flex-1 flex-col lg:flex-row lg:items-start">
                  <div className="flex items-center gap-4 lg:w-36 lg:flex-col lg:items-start lg:gap-3">
                    <Instrumento tag={n.tag} numero={n.numero} tamanho={60} ligado={i === 3} />
                    <div>
                      <p className="display text-2xl text-ink">{n.nome}</p>
                      <p className="mt-1 text-[0.9rem] leading-snug text-ink-2">{n.detalhe}</p>
                    </div>
                  </div>
                  {i < profile.malha.length - 1 && (
                    <>
                      <div
                        className="flow-line flow-line--v ml-[29px] h-10 flex-none lg:hidden"
                        aria-hidden="true"
                      >
                        <span className="packet" style={{ '--atraso': `${i * 0.6}s` }} />
                      </div>
                      <div className="flow-line mx-3 mt-[30px] hidden lg:block" aria-hidden="true">
                        <span className="packet" style={{ '--atraso': `${i * 0.6}s` }} />
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>
    </section>
  )
}

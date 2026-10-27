import { useRef } from 'react'
import Instrumento from './Instrumento'
import { gsap, comMovimento, ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * Seção da planta: à esquerda a tubulação que atravessa a página e o instrumento
 * da área; à direita o conteúdo. Ao rolar, o fluxo enche o tubo e "liga" o instrumento.
 */
export default function Section({ id, tag, area, titulo, legenda, children }) {
  const raiz = useRef(null)

  useGSAP(
    () => {
      const fill = raiz.current.querySelector('.pipe-fill')
      const bolhas = raiz.current.querySelectorAll('.instr')
      const ligar = (sim) =>
        bolhas.forEach((b) => (sim ? (b.dataset.on = 'true') : delete b.dataset.on))
      const gatilho = { trigger: raiz.current, start: 'top 65%', end: 'clamp(bottom 65%)' }

      comMovimento(() => {
        gsap.to(fill, { scaleY: 1, ease: 'none', scrollTrigger: { ...gatilho, scrub: 0.4 } })
      })
      ScrollTrigger.create({
        ...gatilho,
        onEnter: () => ligar(true),
        onLeaveBack: () => ligar(false),
      })
    },
    { scope: raiz },
  )

  return (
    <section
      id={id}
      ref={raiz}
      aria-labelledby={`${id}-titulo`}
      className="relative z-10 px-4 sm:px-8"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[36px_1fr] gap-x-4 sm:grid-cols-[64px_1fr] sm:gap-x-8">
        <div className="relative">
          <div className="pipe" aria-hidden="true">
            <div className="pipe-fill" />
          </div>
          <div className="sticky top-24 flex justify-center pt-24 md:pt-32">
            <Instrumento tag={tag} numero={area} tamanho={56} className="hidden sm:inline-flex" />
            <Instrumento tag={tag} numero={area} tamanho={36} className="sm:hidden" />
          </div>
        </div>

        <div className="min-w-0 py-24 md:py-32">
          <header className="reveal mb-12 md:mb-16">
            <p className="label text-signal">
              área {area} · {tag}-{area}
            </p>
            <h2 id={`${id}-titulo`} className="display mt-3 text-[clamp(2.8rem,8vw,6rem)] text-ink">
              {titulo}
            </h2>
            {legenda && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
                {legenda}
              </p>
            )}
          </header>
          {children}
        </div>
      </div>
    </section>
  )
}

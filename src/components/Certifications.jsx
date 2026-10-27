import { useRef } from 'react'
import Section from './Section'
import { certificacoes } from '../data/profile'
import { gsap, comMovimento, useGSAP } from '../lib/gsap'

export default function Certifications() {
  const raiz = useRef(null)

  // o carimbo "bate" no papel quando o certificado aparece
  useGSAP(
    () => {
      comMovimento(() => {
        gsap.utils.toArray('.carimbo', raiz.current).forEach((c, i) => {
          gsap.from(c, {
            scale: 1.6,
            rotate: -24,
            autoAlpha: 0,
            duration: 0.45,
            delay: (i % 3) * 0.12,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: c, start: 'top 88%' },
          })
        })
      })
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz}>
      <Section
        id="certificacoes"
        tag="QC"
        area="500"
        titulo="Certificados"
        legenda="Formação complementar em programação, cloud e desenvolvimento web."
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificacoes.map((c, i) => (
            <li
              key={c.nome}
              className="reveal sheet flex flex-col p-5"
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-3 border-b border-rule pb-3">
                <span className="label text-signal">{c.area}</span>
                <span className="label text-ink-2">qc-{String(501 + i)}</span>
              </div>
              <h3 className="display mt-4 text-[1.7rem] leading-[0.95] text-ink">{c.nome}</h3>
              <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                <p className="label text-ink-2">emissor: {c.emissor}</p>
                {c.status ? (
                  <span className="carimbo shrink-0 text-amber">{c.status}</span>
                ) : (
                  <span className="carimbo shrink-0 text-run">aprovado</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

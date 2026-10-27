import Section from './Section'
import { certificacoes } from '../data/profile'

export default function Certifications() {
  return (
    <Section
      id="certificacoes"
      indice="05 // certificações"
      titulo="Certificações"
      legenda="Formação complementar em programação, cloud e desenvolvimento web."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificacoes.map((c, i) => (
          <article
            key={c.nome}
            className="reveal panel bracket flex flex-col p-6"
            style={{ transitionDelay: `${(i % 3) * 80}ms` }}
          >
            <div className="sweep" />
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-magenta uppercase">
                {c.area}
              </span>
              {c.status && (
                <span className="shrink-0 font-mono text-[0.7rem] tracking-wider text-amber">
                  <span aria-hidden="true">● </span>
                  {c.status}
                </span>
              )}
            </div>
            <h3 className="mt-4 font-display text-base leading-snug font-semibold text-ink">
              {c.nome}
            </h3>
            <p className="mt-auto pt-5 font-mono text-xs text-muted">{c.emissor}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

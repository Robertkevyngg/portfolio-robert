import Section from './Section'
import { certificacoes } from '../data/profile'
import { IconCheck } from './Icons'

export default function Certifications() {
  return (
    <Section
      id="certificacoes"
      fase="05"
      eyebrow="Conquistas"
      titulo="Conquistas desbloqueadas"
      legenda="Cibersegurança, cloud, programação e desenvolvimento web."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificacoes.map((c, i) => (
          <article
            key={c.nome}
            className="reveal card card-hover flex flex-col p-6"
            style={{ transitionDelay: `${(i % 3) * 80}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="eyebrow text-xs">{c.area}</span>
              {c.status ? (
                <span className="pill text-xs">em progresso</span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-good">
                  <IconCheck width="14" height="14" /> desbloqueada
                </span>
              )}
            </div>
            <h3 className="title mt-4 text-lg leading-snug text-text">{c.nome}</h3>
            <p className="mt-auto pt-6 text-sm text-text-2">{c.emissor}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

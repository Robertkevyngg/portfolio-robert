import Section from './Section'
import { trajetoria } from '../data/profile'

export default function Timeline() {
  return (
    <Section
      id="trajetoria"
      indice="05 // trajetória"
      titulo="Linha do tempo"
      legenda="Formação, projetos e trabalho — na ordem em que aconteceram."
    >
      <ol className="relative border-l border-line pl-8 sm:pl-12">
        {trajetoria.map((t, i) => (
          <li
            key={t.titulo}
            className="reveal relative pb-12 last:pb-0"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rotate-45 border border-cyan bg-void sm:-left-[calc(3rem+5px)]" />
            <span className="font-mono text-xs tracking-[0.18em] text-cyan">{t.periodo}</span>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{t.titulo}</h3>
            <p className="mt-1 font-mono text-xs text-magenta">{t.onde}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t.texto}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

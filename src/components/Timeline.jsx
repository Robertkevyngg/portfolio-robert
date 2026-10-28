import Section from './Section'
import { trajetoria } from '../data/profile'

export default function Timeline() {
  return (
    <Section
      id="trajetoria"
      tint
      eyebrow="Trajetória"
      titulo="Linha do tempo"
      legenda="Formação, projetos e trabalho — na ordem em que aconteceram."
    >
      <ol className="mx-auto max-w-3xl">
        {trajetoria.map((t, i) => (
          <li
            key={t.titulo}
            className="reveal grid grid-cols-[auto_1fr] gap-x-5 sm:grid-cols-[8rem_1fr] sm:gap-x-8"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="hidden pt-1 text-right sm:block">
              <span className="text-sm font-semibold text-accent">{t.periodo}</span>
            </div>
            <div className="relative border-l border-line pb-10 pl-6 last:pb-0 sm:pl-8">
              <span
                className="absolute top-1.5 -left-[6.5px] h-3 w-3 rounded-full border-2 border-bg bg-accent sm:-left-[7px]"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-accent sm:hidden">{t.periodo}</span>
              <h3 className="title mt-1 text-xl text-text sm:mt-0">{t.titulo}</h3>
              <p className="mt-1 text-sm font-medium text-text-3">{t.onde}</p>
              <p className="mt-3 leading-relaxed text-text-2">{t.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

import Section from './Section'
import { trajetoria } from '../data/profile'

export default function Timeline() {
  return (
    <Section
      id="trajetoria"
      tag="RV"
      area="600"
      titulo="Histórico de revisões"
      legenda="Formação, projetos e trabalho — do mais recente ao primeiro, como o bloco de revisões de um desenho."
    >
      <div className="reveal overflow-hidden border-[1.5px] border-ink bg-sheet">
        <div
          className="label hidden grid-cols-[4rem_7rem_1fr_14rem] gap-4 bg-ink px-4 py-2.5 text-paper md:grid"
          aria-hidden="true"
        >
          <span>rev.</span>
          <span>período</span>
          <span>descrição</span>
          <span>local</span>
        </div>
        <ol>
          {trajetoria.map((t, i) => (
            <li
              key={t.titulo}
              className="grid grid-cols-[3rem_1fr] gap-x-3 border-b border-rule px-4 py-5 last:border-b-0 md:grid-cols-[4rem_7rem_1fr_14rem] md:gap-4"
            >
              <span className="display row-span-3 text-4xl text-signal md:row-span-1">
                {String.fromCharCode(64 + trajetoria.length - i)}
              </span>
              <span className="label text-ink md:pt-1.5">{t.periodo}</span>
              <div className="col-start-2 md:col-start-auto">
                <h3 className="display mt-1 text-2xl text-ink md:mt-0">{t.titulo}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-2">{t.texto}</p>
              </div>
              <span className="label col-start-2 mt-2 text-ink-2 md:col-start-auto md:mt-0 md:pt-1.5">
                {t.onde}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

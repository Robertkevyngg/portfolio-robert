import Section from './Section'
import { stack } from '../data/profile'

export default function Stack() {
  return (
    <Section
      id="stack"
      tint
      fase="04"
      eyebrow="Inventário"
      titulo="Ferramentas de trabalho"
      legenda="O que uso no dia a dia — nas aulas, no estágio, nos projetos próprios e nos trabalhos para clientes."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {stack.map((g, i) => (
          <div
            key={g.grupo}
            className="reveal card p-7"
            style={{ transitionDelay: `${(i % 2) * 90}ms` }}
          >
            <h3 className="title text-lg text-text">{g.grupo}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.itens.map((it) => (
                <li key={it} className="pill">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

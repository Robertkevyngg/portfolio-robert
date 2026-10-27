import Section from './Section'
import { stack } from '../data/profile'

export default function Stack() {
  return (
    <Section
      id="stack"
      indice="03 // stack"
      titulo="Ferramentas de trabalho"
      legenda="O que uso no dia a dia — nas aulas, nos projetos próprios e nos trabalhos para clientes."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {stack.map((g, i) => (
          <div
            key={g.grupo}
            className="reveal panel bracket p-7"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="sweep" />
            <h3 className="font-mono text-xs tracking-[0.22em] text-cyan uppercase">{g.grupo}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.itens.map((it) => (
                <li key={it} className="chip">
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

import Section from './Section'
import { stack } from '../data/profile'

export default function Stack() {
  return (
    <Section
      id="stack"
      tag="BM"
      area="400"
      titulo="Lista de materiais"
      legenda="O que uso no dia a dia — nas aulas, no estágio, nos projetos próprios e nos trabalhos para clientes."
    >
      <div className="reveal overflow-hidden border-[1.5px] border-ink bg-sheet">
        <div
          className="label hidden grid-cols-[4rem_12rem_1fr_4rem] gap-4 bg-ink px-4 py-2.5 text-paper md:grid"
          aria-hidden="true"
        >
          <span>item</span>
          <span>grupo</span>
          <span>componentes</span>
          <span className="text-right">qtd.</span>
        </div>
        <ul>
          {stack.map((g, i) => (
            <li
              key={g.grupo}
              className="grid grid-cols-[3rem_1fr_3rem] gap-x-3 gap-y-3 border-b border-rule px-4 py-4 last:border-b-0 md:grid-cols-[4rem_12rem_1fr_4rem] md:gap-4"
            >
              <span className="display text-2xl text-signal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display self-center text-2xl text-ink">{g.grupo}</h3>
              <span className="label self-center text-right text-ink-2 md:order-last">
                {String(g.itens.length).padStart(2, '0')}
              </span>
              <ul className="col-span-3 flex flex-wrap gap-1.5 md:col-span-1">
                {g.itens.map((it) => (
                  <li
                    key={it}
                    className="border-[1.5px] border-ink bg-paper px-2.5 py-1 text-[0.92rem] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

import Section from './Section'
import { profile } from '../data/profile'

const placa = [
  ['modelo', profile.nome],
  ['fabricante', 'Instituto Mauá de Tecnologia'],
  ['série', 'Bacharelado em Ciência da Computação'],
  ['ano de fabricação', String(profile.desde)],
  ['local de instalação', profile.localCurto],
  ['aplicação', 'software · segurança · dados · automação'],
]

const notas = [
  {
    titulo: 'Software',
    texto:
      'Do front-end em React à API que serve o modelo. Gosto de projeto que sai do notebook e vira coisa que roda.',
  },
  {
    titulo: 'Cibersegurança',
    texto:
      'Foco em segurança aplicada a ambientes críticos. Laboratório próprio com Kali, Nmap e tráfego capturado na mão.',
  },
  {
    titulo: 'Dados & automação',
    texto:
      'Do registrador Modbus ao gráfico: coletar, guardar com contexto e transformar em decisão — com a métrica certa.',
  },
]

export default function About() {
  return (
    <Section
      id="sobre"
      tag="ID"
      area="100"
      titulo="Quem está por trás do código"
      legenda={profile.bio}
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        {/* placa de identificação, como a de um motor */}
        <div className="reveal placa min-w-0 p-6 sm:p-9">
          <span className="rebite top-3 left-3" aria-hidden="true" />
          <span className="rebite top-3 right-3" aria-hidden="true" />
          <span className="rebite bottom-3 left-3" aria-hidden="true" />
          <span className="rebite right-3 bottom-3" aria-hidden="true" />

          <div className="flex items-end justify-between gap-4 border-b-[1.5px] border-ink pb-3">
            <p className="display text-3xl text-ink">Placa de identificação</p>
            <p className="label text-ink-2">nº rg-2024</p>
          </div>
          <dl className="mt-2">
            {placa.map(([campo, valor]) => (
              <div
                key={campo}
                className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule py-2.5 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="label pt-0.5 text-ink-2">{campo}</dt>
                <dd className="font-mono text-[0.82rem] text-ink [font-variation-settings:'wdth'_87.5]">
                  {valor}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 pt-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="label pt-0.5 text-ink-2">status</dt>
              <dd className="flex items-start gap-2 font-mono text-[0.82rem] font-bold text-run">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-run" aria-hidden="true" />
                em operação · estágio na {profile.estagio.empresa}
              </dd>
            </div>
          </dl>
        </div>

        {/* notas gerais do desenho */}
        <div>
          <p className="reveal label border-b-[1.5px] border-ink pb-3 text-ink">notas gerais</p>
          <ol>
            {notas.map((n, i) => (
              <li
                key={n.titulo}
                className="reveal grid grid-cols-[3rem_1fr] gap-2 border-b border-rule py-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="display text-3xl text-signal">N{i + 1}</span>
                <div>
                  <h3 className="display text-2xl text-ink">{n.titulo}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-2">{n.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

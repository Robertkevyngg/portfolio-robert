import Section from './Section'
import { profile } from '../data/profile'
import { IconShield } from './Icons'

const pilares = [
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
    <Section id="sobre" eyebrow="Sobre" titulo="Quem está por trás do código" legenda={profile.bio}>
      <div className="grid gap-4 sm:grid-cols-3">
        {pilares.map((p, i) => (
          <article
            key={p.titulo}
            className="reveal card card-hover p-8"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span className="icon-circle">
              <IconShield width="22" height="22" />
            </span>
            <h3 className="title mt-6 text-xl text-text">{p.titulo}</h3>
            <p className="mt-3 leading-relaxed text-text-2">{p.texto}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

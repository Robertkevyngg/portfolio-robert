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
      'Foco em segurança aplicada a ambientes de saúde. Laboratório próprio com Kali, Nmap e tráfego capturado na mão.',
  },
  {
    titulo: 'Dados',
    texto:
      'pandas, NumPy e scikit-learn para transformar dado bruto em decisão — com atenção à métrica certa, não à mais bonita.',
  },
]

export default function About() {
  return (
    <Section
      id="sobre"
      indice="01 // sobre"
      titulo="Quem está por trás do código"
      legenda={profile.bio}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {pilares.map((p, i) => (
          <article
            key={p.titulo}
            className="reveal panel bracket p-7"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="sweep" />
            <IconShield className="text-cyan" width="22" height="22" />
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.titulo}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.texto}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

import Section from './Section'
import { profile } from '../data/profile'
import { avisar } from '../lib/toast'
import { IconArrow, IconCopy, IconGithub, IconLinkedin, IconMail, IconWhatsapp } from './Icons'

const linkWhats = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  profile.whatsappMensagem,
)}`

const canais = [
  {
    href: linkWhats,
    label: 'whatsapp',
    valor: profile.whatsappExibicao,
    Icone: IconWhatsapp,
  },
  {
    href: `mailto:${profile.email}`,
    label: 'e-mail',
    valor: profile.email,
    Icone: IconMail,
    copiar: profile.email,
  },
  { href: profile.github, label: 'github', valor: `@${profile.handle}`, Icone: IconGithub },
  {
    href: profile.linkedin,
    label: 'linkedin',
    valor: profile.nome,
    Icone: IconLinkedin,
  },
]

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    avisar('e-mail copiado')
  } catch {
    avisar('não deu para copiar — selecione o endereço manualmente')
  }
}

export default function Contact() {
  return (
    <Section
      id="contato"
      indice="06 // contato"
      titulo="Vamos conversar"
      legenda="Aberto a projetos freelance e a qualquer conversa boa sobre automação industrial, segurança, dados ou front-end."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="reveal panel bracket flex flex-col justify-between p-8 sm:p-12">
          <div className="sweep" />
          <div>
            <p className="font-mono text-sm text-lime" aria-hidden="true">
              <span className="text-muted">$</span> ./contato --iniciar
            </p>
            <p className="mt-6 font-display text-2xl leading-snug font-bold text-ink sm:text-3xl">
              Se você chegou até aqui, provavelmente tem um projeto em mente.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Respondo rápido. Me conta o contexto, o prazo e o que precisa existir no final — a
              gente resolve o resto.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={linkWhats} target="_blank" rel="noreferrer noopener" className="btn">
              <IconWhatsapp width="16" height="16" />
              <span>chamar no whatsapp</span>
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn--ghost">
              <span>mandar e-mail</span>
              <IconArrow />
            </a>
          </div>
        </div>

        <ul className="grid gap-4">
          {canais.map(({ href, label, valor, Icone, copiar: textoCopia }, i) => {
            const externo = !href.startsWith('mailto')
            return (
              <li
                key={label}
                className="reveal relative flex"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <a
                  href={href}
                  target={externo ? '_blank' : undefined}
                  rel={externo ? 'noreferrer noopener' : undefined}
                  className={`panel bracket group flex flex-1 items-center gap-5 p-6 ${
                    textoCopia ? 'pr-20' : ''
                  }`}
                >
                  <div className="sweep" />
                  <span className="text-cyan transition-transform group-hover:scale-110">
                    <Icone width="22" height="22" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.7rem] tracking-[0.22em] text-muted uppercase">
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-sm text-ink transition-colors group-hover:text-cyan">
                      {valor}
                    </span>
                    {externo && <span className="sr-only">(abre em nova aba)</span>}
                  </span>
                  {!textoCopia && (
                    <IconArrow className="ml-auto shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-cyan" />
                  )}
                </a>
                {textoCopia && (
                  <button
                    type="button"
                    onClick={() => copiar(textoCopia)}
                    aria-label="Copiar endereço de e-mail"
                    title="Copiar e-mail"
                    className="absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line text-muted transition-colors hover:border-cyan hover:text-cyan"
                  >
                    <IconCopy />
                  </button>
                )}
              </li>
            )
          })}
          <li className="reveal panel p-6">
            <span className="block font-mono text-[0.7rem] tracking-[0.22em] text-muted uppercase">
              base
            </span>
            <span className="mt-1 block text-sm text-ink">{profile.local}</span>
          </li>
        </ul>
      </div>
    </Section>
  )
}

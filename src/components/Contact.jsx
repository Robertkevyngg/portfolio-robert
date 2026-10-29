import Section from './Section'
import Continue from './Continue'
import { profile } from '../data/profile'
import { avisar } from '../lib/toast'
import { IconArrow, IconCopy, IconGithub, IconLinkedin, IconMail, IconWhatsapp } from './Icons'

const linkWhats = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  profile.whatsappMensagem,
)}`

const canais = [
  { href: linkWhats, label: 'WhatsApp', valor: profile.whatsappExibicao, Icone: IconWhatsapp },
  {
    href: `mailto:${profile.email}`,
    label: 'E-mail',
    valor: profile.email,
    Icone: IconMail,
    copiar: profile.email,
  },
  { href: profile.github, label: 'GitHub', valor: `@${profile.handle}`, Icone: IconGithub },
  { href: profile.linkedin, label: 'LinkedIn', valor: profile.nome, Icone: IconLinkedin },
]

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    avisar('E-mail copiado')
  } catch {
    avisar('Não deu para copiar — selecione o endereço manualmente')
  }
}

export default function Contact() {
  return (
    <Section
      id="contato"
      tint
      fase="FIM"
      eyebrow="Continue?"
      titulo="Player 2, aperte start"
      legenda="Aberto a projetos freelance e a qualquer conversa boa sobre automação industrial, segurança, dados ou front-end. Respondo rápido."
    >
      <div className="mx-auto max-w-3xl">
        <Continue />
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={linkWhats} target="_blank" rel="noreferrer noopener" className="btn">
            <IconWhatsapp width="18" height="18" /> Chamar no WhatsApp
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <a href={`mailto:${profile.email}`} className="btn btn--ghost">
            Mandar e-mail
          </a>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {canais.map(({ href, label, valor, Icone, copiar: textoCopia }, i) => {
            const externo = !href.startsWith('mailto')
            return (
              <li
                key={label}
                className="reveal relative min-w-0"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <a
                  href={href}
                  target={externo ? '_blank' : undefined}
                  rel={externo ? 'noreferrer noopener' : undefined}
                  className={`card card-hover group flex min-w-0 items-center gap-4 p-5 ${
                    textoCopia ? 'pr-16' : ''
                  }`}
                >
                  <span className="icon-circle shrink-0">
                    <Icone width="20" height="20" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-text-3">{label}</span>
                    <span className="mt-0.5 block truncate font-medium text-text">{valor}</span>
                    {externo && <span className="sr-only">(abre em nova aba)</span>}
                  </span>
                  {!textoCopia && (
                    <IconArrow
                      width="18"
                      height="18"
                      className="shrink-0 text-text-3 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    />
                  )}
                </a>
                {textoCopia && (
                  <button
                    type="button"
                    onClick={() => copiar(textoCopia)}
                    aria-label="Copiar endereço de e-mail"
                    title="Copiar e-mail"
                    className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-text-2 transition-colors hover:bg-bg-2 hover:text-accent"
                  >
                    <IconCopy width="16" height="16" />
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        <p className="reveal mt-6 text-center text-sm text-text-3">{profile.local}</p>
      </div>
    </Section>
  )
}

import Section from './Section'
import { profile } from '../data/profile'
import { avisar } from '../lib/toast'
import { IconCopy, IconGithub, IconLinkedin, IconMail, IconWhatsapp } from './Icons'

const linkWhats = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  profile.whatsappMensagem,
)}`

// cada canal é uma botoeira do painel: cor da cabeça do botão + plaqueta de identificação
const botoes = [
  {
    href: linkWhats,
    tag: 'HS-701',
    label: 'WhatsApp',
    valor: profile.whatsappExibicao,
    cor: 'var(--color-run)',
    Icone: IconWhatsapp,
  },
  {
    href: `mailto:${profile.email}`,
    tag: 'HS-702',
    label: 'E-mail',
    valor: profile.email,
    cor: 'var(--color-signal-bg)',
    Icone: IconMail,
  },
  {
    href: profile.github,
    tag: 'HS-703',
    label: 'GitHub',
    valor: `@${profile.handle}`,
    cor: 'var(--color-ink)',
    Icone: IconGithub,
  },
  {
    href: profile.linkedin,
    tag: 'HS-704',
    label: 'LinkedIn',
    valor: profile.nome,
    cor: '#1d4f91',
    Icone: IconLinkedin,
  },
]

async function copiarEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    avisar('e-mail copiado')
  } catch {
    avisar('não deu para copiar — selecione o endereço manualmente')
  }
}

export default function Contact() {
  return (
    <Section
      id="contato"
      tag="HS"
      area="700"
      titulo="Vamos conversar"
      legenda="Aberto a projetos freelance e a qualquer conversa boa sobre automação industrial, segurança, dados ou front-end. Respondo rápido."
    >
      <div className="reveal sheet">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink bg-ink px-5 py-3 text-paper">
          <p className="label">painel de contato · hs-700</p>
          <p className="label flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4ade80]" aria-hidden="true" />
            energizado
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {botoes.map(({ href, tag, label, valor, cor, Icone }) => {
            const externo = !href.startsWith('mailto')
            return (
              <li
                key={tag}
                className="flex min-w-0 flex-col items-center border-r border-b border-rule px-3 py-8 text-center even:border-r-0 lg:border-b-0 lg:last:border-r-0 lg:even:border-r"
              >
                <a
                  href={href}
                  target={externo ? '_blank' : undefined}
                  rel={externo ? 'noreferrer noopener' : undefined}
                  className="group flex max-w-full flex-col items-center"
                >
                  <span className="botoeira" style={{ '--cor': cor }}>
                    <span className="botoeira-cabeca">
                      <Icone width="22" height="22" />
                    </span>
                  </span>
                  <span className="mt-4 border-[1.5px] border-ink bg-paper px-3 py-1.5">
                    <span className="display block text-xl text-ink">{label}</span>
                    <span className="label block text-ink-2">{tag}</span>
                  </span>
                  <span className="mt-3 max-w-full text-[0.9rem] break-all text-ink group-hover:text-signal sm:break-normal">
                    {valor}
                  </span>
                  {externo && <span className="sr-only">(abre em nova aba)</span>}
                </a>
                {label === 'E-mail' && (
                  <button
                    type="button"
                    onClick={copiarEmail}
                    className="label mt-2 flex min-h-9 items-center gap-1.5 px-2 text-ink-2 hover:text-ink"
                  >
                    <IconCopy width="13" height="13" /> copiar
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-ink px-5 py-4">
          <p className="label text-ink-2">local de instalação: {profile.local}</p>
          <a href={linkWhats} target="_blank" rel="noreferrer noopener" className="btn">
            <IconWhatsapp width="16" height="16" /> chamar agora
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </div>
    </Section>
  )
}

import { profile } from '../data/profile'
import { IconGithub, IconLinkedin, IconMail } from './Icons'

const redes = [
  { href: profile.github, label: 'GitHub', Icone: IconGithub, externo: true },
  { href: profile.linkedin, label: 'LinkedIn', Icone: IconLinkedin, externo: true },
  { href: `mailto:${profile.email}`, label: 'E-mail', Icone: IconMail },
]

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-text-3 sm:flex-row">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.nome} ·{' '}
          {profile.localCurto}
        </p>
        <ul className="flex items-center gap-1">
          {redes.map(({ href, label, Icone, externo }) => (
            <li key={label}>
              <a
                href={href}
                target={externo ? '_blank' : undefined}
                rel={externo ? 'noreferrer noopener' : undefined}
                aria-label={externo ? `${label} (abre em nova aba)` : label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-2 transition-colors hover:bg-bg-2 hover:text-text"
              >
                <Icone width="18" height="18" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#inicio" className="link-arrow text-sm">
          Voltar ao topo
        </a>
      </div>
    </footer>
  )
}

import { profile } from '../data/profile'
import { IconGithub, IconLinkedin, IconMail } from './Icons'

const redes = [
  { href: profile.github, label: 'GitHub', Icone: IconGithub, externo: true },
  { href: profile.linkedin, label: 'LinkedIn', Icone: IconLinkedin, externo: true },
  { href: `mailto:${profile.email}`, label: 'E-mail', Icone: IconMail },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 font-mono text-[0.72rem] tracking-wider text-muted sm:flex-row">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.nome} ·{' '}
          {profile.localCurto}
        </p>
        <ul className="flex items-center">
          {redes.map(({ href, label, Icone, externo }) => (
            <li key={label}>
              <a
                href={href}
                target={externo ? '_blank' : undefined}
                rel={externo ? 'noreferrer noopener' : undefined}
                aria-label={externo ? `${label} (abre em nova aba)` : label}
                className="flex h-11 w-11 items-center justify-center transition-colors hover:text-cyan"
              >
                <Icone width="16" height="16" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#inicio" className="link-u py-2 text-cyan">
          voltar ao topo <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}

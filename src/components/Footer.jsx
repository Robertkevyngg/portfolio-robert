import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[0.7rem] tracking-wider text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.nome}
        </p>
        <a href="#inicio" className="link-u text-cyan">
          voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}

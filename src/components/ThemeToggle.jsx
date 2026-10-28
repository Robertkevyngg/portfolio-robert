import { useTema } from '../lib/tema'
import { IconAuto, IconMoon, IconSun } from './Icons'

const opcoes = [
  { id: 'auto', label: 'Tema automático', Icone: IconAuto },
  { id: 'light', label: 'Tema claro', Icone: IconSun },
  { id: 'dark', label: 'Tema escuro', Icone: IconMoon },
]

export default function ThemeToggle() {
  const [tema, mudar] = useTema()
  return (
    <div
      role="radiogroup"
      aria-label="Tema da página"
      className="flex items-center gap-0.5 rounded-full border border-line p-0.5"
    >
      {opcoes.map(({ id, label, Icone }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={tema === id}
          aria-label={label}
          title={label}
          onClick={() => mudar(id)}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            tema === id ? 'bg-text text-bg' : 'text-text-2 hover:text-text'
          }`}
        >
          <Icone width="15" height="15" />
        </button>
      ))}
    </div>
  )
}

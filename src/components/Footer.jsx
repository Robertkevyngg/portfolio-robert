import { profile } from '../data/profile'

// carimbo do desenho técnico — o bloco de título no canto da folha
const campos = [
  ['desenhado por', profile.nome],
  ['desenho', 'RG-001'],
  ['folha', '1 / 1'],
  ['escala', '1 : 1'],
]

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-[36px_1fr] gap-x-4 sm:grid-cols-[64px_1fr] sm:gap-x-8">
        {/* fim da linha: a tubulação termina num flange cego */}
        <div className="relative" aria-hidden="true">
          <div className="pipe bottom-auto! h-10">
            <div className="pipe-fill scale-y-100!" />
          </div>
          <div className="absolute top-10 left-1/2 h-2 w-7 -translate-x-1/2 bg-ink" />
        </div>
        <div className="border-[1.5px] border-ink bg-sheet">
          <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(4,1fr)]">
            <div className="col-span-2 border-b-[1.5px] border-ink p-4 md:col-span-1 md:border-r-[1.5px] md:border-b-0">
              <p className="label text-ink-2">título</p>
              <p className="display mt-1 text-2xl text-ink">Planta de competências</p>
            </div>
            {campos.map(([campo, valor], i) => (
              <div
                key={campo}
                className={`border-ink p-4 ${i % 2 === 0 ? 'border-r-[1.5px]' : ''} ${
                  i < 2 ? 'border-b-[1.5px] md:border-b-0' : ''
                } md:border-r-[1.5px] md:last:border-r-0`}
              >
                <p className="label text-ink-2">{campo}</p>
                <p className="mt-1 font-mono text-[0.8rem] text-ink">
                  {campo === 'desenhado por' ? (
                    <>
                      © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {valor}
                    </>
                  ) : (
                    valor
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-ink px-4 py-3">
            <p className="label text-ink-2">{profile.localCurto} · brasil</p>
            <a href="#inicio" className="label link-u py-2 text-ink">
              voltar ao topo <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

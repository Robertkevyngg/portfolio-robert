export default function Section({ id, indice, titulo, legenda, children, className = '' }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`relative z-10 px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-12 md:mb-16">
          <div className="flex items-center gap-4">
            <span className="kicker">{indice}</span>
            <span
              className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent"
              aria-hidden="true"
            />
          </div>
          <h2
            id={`${id}-titulo`}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            {titulo}
          </h2>
          {legenda && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {legenda}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

export default function Section({
  id,
  fase,
  eyebrow,
  titulo,
  legenda,
  children,
  tint = false,
  className = '',
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 ${tint ? 'bg-bg-2' : ''} ${className}`}
    >
      {/* viga da fase: o personagem anda por ela antes de descer a escada */}
      <div data-girder className="viga" aria-hidden="true" />
      <div className="mx-auto max-w-5xl">
        <header className="reveal mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          {eyebrow && (
            <p className="eyebrow text-[0.62rem] sm:text-xs">
              {fase && <span className="fase">{fase}</span>}
              {eyebrow}
            </p>
          )}
          <h2
            id={`${id}-titulo`}
            className="headline mt-5 text-4xl text-text sm:text-5xl md:text-6xl"
          >
            {titulo}
          </h2>
          {legenda && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-2 sm:text-xl">
              {legenda}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

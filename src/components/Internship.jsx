import Section from './Section'
import { baumier } from '../data/profile'
import { avisar } from '../lib/toast'
import { IconCheck, IconCopy, IconExternal } from './Icons'

const base = import.meta.env.BASE_URL

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    avisar('Comando copiado')
  } catch {
    avisar('Não deu para copiar — selecione o comando manualmente')
  }
}

function Figura({ imagem, legenda }) {
  const src = `${base}${imagem.src}`
  return (
    <figure>
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-line"
      >
        <img
          src={src}
          alt={imagem.alt}
          width={imagem.largura}
          height={imagem.altura}
          loading="lazy"
          decoding="async"
          className="h-auto w-full transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-[var(--glass-bg)] px-3 py-1.5 text-xs font-medium backdrop-blur-md">
          <IconExternal width="14" height="14" /> Ampliar
          <span className="sr-only">(abre em nova aba)</span>
        </span>
      </a>
      {legenda && (
        <figcaption className="mt-3 text-center text-sm text-text-3">{legenda}</figcaption>
      )}
    </figure>
  )
}

export default function Internship() {
  const [datalogger, raspberry, debian] = baumier.projetos

  return (
    <Section
      id="estagio"
      tint
      eyebrow="Estágio · Baumier Automation"
      titulo="Automação industrial na Baumier"
      legenda="O que construí e aprendi no estágio: comunicação Modbus, Linux em campo e a ponte entre TI e o chão de fábrica."
    >
      {/* a empresa */}
      <div className="reveal card grid gap-6 p-7 sm:p-9 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-sm">
            {baumier.empresa} · {baumier.periodo}
          </p>
          <p className="mt-3 leading-relaxed text-text-2">{baumier.sobre}</p>
        </div>
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {baumier.numeros.map((n) => (
            <div key={n.label}>
              <dt className="order-2 text-xs leading-snug text-text-3">{n.label}</dt>
              <dd className="headline text-3xl text-text">{n.valor}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* datalogger */}
      <article className="reveal card mt-4 grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-xs">{datalogger.tipo}</p>
          <h3 className="title mt-2 text-2xl text-text">{datalogger.titulo}</h3>
          <p className="mt-3 leading-relaxed text-text-2">{datalogger.resumo}</p>

          <ol className="mt-6 space-y-3">
            {datalogger.etapas.map((e, i) => (
              <li key={e.rotulo} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-text">{e.rotulo}</p>
                  <p className="text-sm leading-relaxed text-text-2">{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {datalogger.resultados.map((r) => (
              <div key={r.label} className="tile px-3 py-4 text-center">
                <dd className="headline text-2xl text-good tabular-nums">{r.valor}</dd>
                <dt className="mt-1 text-xs leading-snug text-text-3">{r.label}</dt>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2">
            {datalogger.tags.map((t) => (
              <li key={t} className="pill text-xs">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <Figura imagem={datalogger.imagem} legenda="Dashboard do datalogger em operação" />
      </article>

      {/* raspberry + debian */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="reveal card flex flex-col p-7 sm:p-9">
          <p className="eyebrow text-xs">{raspberry.tipo}</p>
          <h3 className="title mt-2 text-2xl text-text">{raspberry.titulo}</h3>
          <p className="mt-3 leading-relaxed text-text-2">{raspberry.resumo}</p>
          <ul className="mt-6 space-y-3">
            {raspberry.itens.map(([t, texto]) => (
              <li key={t} className="flex gap-3">
                <IconCheck width="18" height="18" className="mt-0.5 shrink-0 text-good" />
                <div>
                  <p className="font-semibold text-text">{t}</p>
                  <p className="text-sm leading-relaxed text-text-2">{texto}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {raspberry.tags.map((t) => (
              <li key={t} className="pill text-xs">
                {t}
              </li>
            ))}
          </ul>
        </article>

        <article
          className="reveal card flex flex-col p-7 sm:p-9"
          style={{ transitionDelay: '80ms' }}
        >
          <p className="eyebrow text-xs">{debian.tipo}</p>
          <h3 className="title mt-2 text-2xl text-text">{debian.titulo}</h3>
          <p className="mt-3 leading-relaxed text-text-2">{debian.resumo}</p>
          <div className="mt-6">
            <Figura imagem={debian.imagem} />
          </div>
          <dl className="mt-5 grid gap-x-6 sm:grid-cols-2">
            {debian.itens.map(([t, texto]) => (
              <div key={t} className="border-t border-line py-3">
                <dt className="font-semibold text-text">{t}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-2">{texto}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      {/* comandos */}
      <div className="reveal card mt-4 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
          <h3 className="title text-lg text-text">Comandos usados no Raspberry Pi</h3>
          <span className="pill text-xs">rpi-01</span>
        </div>
        <ul className="divide-y divide-line">
          {baumier.comandos.map((c) => (
            <li
              key={c.tarefa}
              className="flex flex-col gap-2 px-6 py-3.5 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="shrink-0 text-sm font-medium text-text-2 sm:w-40">{c.tarefa}</span>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <code className="min-w-0 flex-1 overflow-x-auto rounded-xl bg-bg-2 px-3 py-2 font-mono text-[0.8rem] whitespace-nowrap text-text">
                  {c.cmd}
                </code>
                <button
                  type="button"
                  onClick={() => copiar(c.cmd)}
                  aria-label={`Copiar comando: ${c.tarefa}`}
                  title="Copiar"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-2 transition-colors hover:bg-bg-2 hover:text-accent"
                >
                  <IconCopy width="15" height="15" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="flex gap-3 border-t border-line px-6 py-4 text-sm leading-relaxed text-text-2">
          <span className="font-semibold text-text">Atenção</span>
          {baumier.avisoComandos}
        </p>
      </div>

      {/* aprendizados */}
      <div className="mt-20">
        <h3 className="reveal title text-center text-2xl text-text sm:text-3xl">O que aprendi</h3>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {baumier.aprendizados.map((a, i) => (
            <article
              key={a.titulo}
              className="reveal card card-hover p-6"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <h4 className="title mt-4 text-lg leading-snug text-text">{a.titulo}</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-2">{a.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

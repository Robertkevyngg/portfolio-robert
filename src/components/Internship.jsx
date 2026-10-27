import Section from './Section'
import { baumier } from '../data/profile'
import { avisar } from '../lib/toast'
import { IconCopy, IconExternal } from './Icons'

const base = import.meta.env.BASE_URL

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    avisar('comando copiado')
  } catch {
    avisar('não deu para copiar — selecione o comando manualmente')
  }
}

function Imagem({ imagem }) {
  const src = `${base}${imagem.src}`
  return (
    <a
      href={src}
      target="_blank"
      rel="noreferrer noopener"
      className="group/img relative block overflow-hidden border border-line"
    >
      <img
        src={src}
        alt={imagem.alt}
        width={imagem.largura}
        height={imagem.altura}
        loading="lazy"
        decoding="async"
        className="h-auto w-full transition-transform duration-500 group-hover/img:scale-[1.02]"
      />
      <span className="absolute right-3 bottom-3 flex items-center gap-1.5 border border-line bg-void/85 px-2.5 py-1.5 font-mono text-[0.7rem] text-ink backdrop-blur">
        <IconExternal /> ampliar
        <span className="sr-only">(abre em nova aba)</span>
      </span>
    </a>
  )
}

function Tags({ tags }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Cabecalho({ p }) {
  return (
    <>
      <span className="font-mono text-[0.7rem] tracking-[0.2em] text-magenta uppercase">
        {p.tipo}
      </span>
      <h3 className="mt-3 font-display text-xl leading-snug font-bold text-ink sm:text-2xl">
        {p.titulo}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.resumo}</p>
    </>
  )
}

function ListaItens({ itens }) {
  return (
    <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {itens.map(([titulo, texto]) => (
        <div key={titulo} className="flex gap-2.5">
          <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-cyan" aria-hidden="true" />
          <div>
            <dt className="text-sm font-semibold text-ink">{titulo}</dt>
            <dd className="text-[0.82rem] leading-relaxed text-muted">{texto}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

export default function Internship() {
  const [datalogger, raspberry, debian] = baumier.projetos

  return (
    <Section
      id="estagio"
      indice="02 // estágio"
      titulo="Automação industrial na Baumier"
      legenda="O que construí e aprendi no estágio: comunicação Modbus, Linux em campo e a ponte entre TI e o chão de fábrica."
    >
      {/* ---------- a empresa ---------- */}
      <div className="reveal panel bracket grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="sweep" />
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase">
            {baumier.empresa} · {baumier.periodo}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{baumier.sobre}</p>
        </div>
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {baumier.numeros.map((n) => (
            <div key={n.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 font-mono text-[0.7rem] leading-snug tracking-wide text-muted uppercase">
                {n.label}
              </dt>
              <dd className="font-display text-2xl font-bold text-cyan sm:text-3xl">{n.valor}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- datalogger ---------- */}
      <article className="reveal panel bracket mt-4 grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.05fr]">
        <div className="sweep" />
        <div className="flex flex-col">
          <Cabecalho p={datalogger} />

          {/* fluxo escravo → mestre → monitoramento */}
          <ol className="mt-6 grid gap-3">
            {datalogger.etapas.map((e, i) => (
              <li key={e.rotulo} className="flex gap-4 border border-line bg-void/40 p-4">
                <span className="font-mono text-xs text-magenta" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-mono text-[0.7rem] tracking-[0.2em] text-cyan uppercase">
                    {e.rotulo}
                  </p>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="mt-6 grid grid-cols-3 gap-4">
            {datalogger.resultados.map((r) => (
              <div key={r.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 font-mono text-[0.7rem] leading-snug text-muted uppercase">
                  {r.label}
                </dt>
                <dd className="font-display text-xl font-bold text-lime tabular-nums sm:text-2xl">
                  {r.valor}
                </dd>
              </div>
            ))}
          </dl>

          <Tags tags={datalogger.tags} />
        </div>
        <div className="lg:self-center">
          <Imagem imagem={datalogger.imagem} />
        </div>
      </article>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* ---------- raspberry ---------- */}
        <article className="reveal panel bracket flex flex-col p-7 sm:p-9">
          <div className="sweep" />
          <Cabecalho p={raspberry} />
          <ListaItens itens={raspberry.itens} />
          <Tags tags={raspberry.tags} />
        </article>

        {/* ---------- debian ---------- */}
        <article
          className="reveal panel bracket flex flex-col p-7 sm:p-9"
          style={{ transitionDelay: '90ms' }}
        >
          <div className="sweep" />
          <Cabecalho p={debian} />
          <div className="mt-6">
            <Imagem imagem={debian.imagem} />
          </div>
          <ListaItens itens={debian.itens} />
          <Tags tags={debian.tags} />
        </article>
      </div>

      {/* ---------- comandos ---------- */}
      <div className="reveal panel mt-4 p-1">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime/70" aria-hidden="true" />
          <h3 className="ml-2 font-mono text-[0.75rem] text-muted">
            principais comandos usados no Raspberry Pi
          </h3>
        </div>
        <ul className="divide-y divide-line">
          {baumier.comandos.map((c) => (
            <li
              key={c.tarefa}
              className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="shrink-0 font-mono text-[0.7rem] tracking-wider text-muted uppercase sm:w-36">
                {c.tarefa}
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[0.8rem] whitespace-nowrap text-ink">
                  <span className="text-lime" aria-hidden="true">
                    ${' '}
                  </span>
                  {c.cmd}
                </code>
                <button
                  type="button"
                  onClick={() => copiar(c.cmd)}
                  aria-label={`Copiar comando: ${c.tarefa}`}
                  title="Copiar"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-cyan hover:text-cyan"
                >
                  <IconCopy width="14" height="14" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="flex gap-2.5 border-t border-line px-5 py-4 font-mono text-[0.75rem] leading-relaxed text-amber">
          <span aria-hidden="true">!</span>
          {baumier.avisoComandos}
        </p>
      </div>

      {/* ---------- aprendizados ---------- */}
      <h3 className="reveal mt-20 font-display text-2xl font-bold text-ink">O que aprendi</h3>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {baumier.aprendizados.map((a, i) => (
          <li
            key={a.titulo}
            className="reveal panel bracket p-6"
            style={{ transitionDelay: `${(i % 3) * 80}ms` }}
          >
            <div className="sweep" />
            <span className="font-mono text-xs text-magenta" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 className="mt-3 font-display text-base leading-snug font-semibold text-ink">
              {a.titulo}
            </h4>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{a.texto}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

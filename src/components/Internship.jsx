import { useRef } from 'react'
import Section from './Section'
import Instrumento from './Instrumento'
import { baumier } from '../data/profile'
import { avisar } from '../lib/toast'
import { gsap, comMovimento, useGSAP } from '../lib/gsap'
import { IconCopy, IconExternal } from './Icons'

const base = import.meta.env.BASE_URL

// fluxograma do datalogger: tag ISA de cada nó e o sinal que corre entre eles
const nos = [
  { tag: 'SE', numero: '201', sinal: 'Modbus TCP · :5020' },
  { tag: 'DL', numero: '202', sinal: 'CSV · 1/min' },
  { tag: 'HMI', numero: '203' },
]

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    avisar('comando copiado')
  } catch {
    avisar('não deu para copiar — selecione o comando manualmente')
  }
}

function Figura({ numero, legenda, imagem }) {
  const src = `${base}${imagem.src}`
  return (
    <figure className="reveal">
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="group relative block overflow-hidden border-[1.5px] border-ink bg-ink"
      >
        <img
          src={src}
          alt={imagem.alt}
          width={imagem.largura}
          height={imagem.altura}
          loading="lazy"
          decoding="async"
          className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="label absolute right-0 bottom-0 flex items-center gap-1.5 bg-ink px-3 py-2 text-paper">
          <IconExternal /> ampliar
          <span className="sr-only">(abre em nova aba)</span>
        </span>
      </a>
      <figcaption className="label mt-3 text-ink-2">
        <span className="text-signal">fig. {numero}</span> — {legenda}
      </figcaption>
    </figure>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" className="shrink-0">
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="check-traco"
        d="M5 10.5 8.5 14 15 6.5"
        fill="none"
        stroke="var(--color-run)"
        strokeWidth="2.2"
        strokeLinecap="square"
        pathLength="1"
        strokeDasharray="1"
      />
    </svg>
  )
}

export default function Internship() {
  const raiz = useRef(null)
  const [datalogger, raspberry, debian] = baumier.projetos

  // os "✓" da lista de comissionamento são riscados um a um quando a lista aparece
  useGSAP(
    () => {
      comMovimento(() => {
        gsap.from('.check-traco', {
          strokeDashoffset: 1,
          duration: 0.35,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.comissionamento', start: 'top 75%' },
        })
      })
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz}>
      <Section
        id="estagio"
        tag="AT"
        area="200"
        titulo="Automação industrial na Baumier"
        legenda="O que construí e aprendi no estágio: comunicação Modbus, Linux em campo e a ponte entre TI e o chão de fábrica."
      >
        {/* ---------- a empresa ---------- */}
        <div className="reveal sheet grid lg:grid-cols-[1.5fr_1fr]">
          <div className="p-6 sm:p-8">
            <p className="label text-signal">{baumier.periodo} · estágio</p>
            <p className="display mt-2 text-4xl text-ink">{baumier.empresa}</p>
            <p className="mt-4 leading-relaxed text-ink-2">{baumier.sobre}</p>
          </div>
          <dl className="grid grid-cols-3 border-t-[1.5px] border-ink lg:grid-cols-1 lg:border-t-0 lg:border-l-[1.5px]">
            {baumier.numeros.map((n) => (
              <div
                key={n.label}
                className="flex flex-col-reverse justify-end border-r-[1.5px] border-ink p-4 last:border-r-0 sm:p-5 lg:border-r-0 lg:border-b-[1.5px] lg:last:border-b-0"
              >
                <dt className="label mt-1 text-ink-2">{n.label}</dt>
                <dd className="display text-4xl text-ink">{n.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- datalogger ---------- */}
        <article className="mt-20">
          <p className="reveal label text-signal">{datalogger.tipo}</p>
          <h3 className="reveal display mt-2 text-[clamp(2.2rem,5vw,3.6rem)] text-ink">
            {datalogger.titulo}
          </h3>
          <p className="reveal mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">
            {datalogger.resumo}
          </p>

          {/* fluxograma com pacotes correndo pela linha */}
          <ol className="reveal sheet mt-8 flex flex-col p-5 sm:p-7 xl:flex-row xl:items-start">
            {datalogger.etapas.map((e, i) => (
              <li key={e.rotulo} className="flex flex-1 flex-col xl:flex-row xl:items-start">
                <div className="flex gap-4 xl:w-44 xl:flex-col xl:gap-3">
                  <Instrumento tag={nos[i].tag} numero={nos[i].numero} tamanho={60} />
                  <div>
                    <p className="display text-2xl text-ink">{e.rotulo}</p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-2">{e.texto}</p>
                  </div>
                </div>
                {nos[i].sinal && (
                  <>
                    <div className="ml-[29px] flex items-center gap-3 py-2 xl:hidden">
                      <div className="flow-line flow-line--v h-12 flex-none" aria-hidden="true">
                        <span className="packet" style={{ '--atraso': `${i * 0.7}s` }} />
                      </div>
                      <span className="label text-signal">{nos[i].sinal}</span>
                    </div>
                    <div className="mx-3 mt-[22px] hidden min-w-[9.5rem] flex-1 flex-col items-center xl:flex">
                      <span className="label mb-1.5 whitespace-nowrap text-signal">
                        {nos[i].sinal}
                      </span>
                      <div className="flow-line w-full" aria-hidden="true">
                        <span className="packet" style={{ '--atraso': `${i * 0.7}s` }} />
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <dl className="reveal grid grid-cols-3 border-t-[1.5px] border-l-[1.5px] border-ink lg:grid-cols-1">
                {datalogger.resultados.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col-reverse justify-end border-r-[1.5px] border-b-[1.5px] border-ink bg-sheet p-4"
                  >
                    <dt className="label mt-1 text-ink-2">{r.label}</dt>
                    <dd className="display text-3xl text-run tabular-nums sm:text-5xl">
                      {r.valor}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="reveal mt-5 flex flex-wrap gap-2">
                {datalogger.tags.map((t) => (
                  <li key={t} className="label border-[1.5px] border-ink px-2.5 py-1.5 text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Figura
              numero="1"
              legenda="dashboard do datalogger em operação"
              imagem={datalogger.imagem}
            />
          </div>
        </article>

        {/* ---------- raspberry + debian ---------- */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <article className="comissionamento">
            <p className="reveal label text-signal">{raspberry.tipo}</p>
            <h3 className="reveal display mt-2 text-4xl text-ink">{raspberry.titulo}</h3>
            <p className="reveal mt-3 leading-relaxed text-ink-2">{raspberry.resumo}</p>
            <div className="reveal sheet mt-6">
              <p className="label border-b-[1.5px] border-ink bg-ink px-4 py-2.5 text-paper">
                lista de comissionamento — rpi-01
              </p>
              <ul>
                {raspberry.itens.map(([titulo, texto]) => (
                  <li
                    key={titulo}
                    className="flex gap-3.5 border-b border-rule px-4 py-3 text-ink last:border-b-0"
                  >
                    <Check />
                    <div>
                      <p className="font-bold">{titulo}</p>
                      <p className="text-[0.9rem] leading-relaxed text-ink-2">{texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article>
            <p className="reveal label text-signal">{debian.tipo}</p>
            <h3 className="reveal display mt-2 text-4xl text-ink">{debian.titulo}</h3>
            <p className="reveal mt-3 leading-relaxed text-ink-2">{debian.resumo}</p>
            <div className="mt-6">
              <Figura
                numero="2"
                legenda="debian 13 com a identidade baumier"
                imagem={debian.imagem}
              />
            </div>
            <dl className="reveal mt-5 grid gap-x-6 sm:grid-cols-2">
              {debian.itens.map(([titulo, texto]) => (
                <div key={titulo} className="border-t border-rule py-3">
                  <dt className="label text-ink">{titulo}</dt>
                  <dd className="mt-1 text-[0.9rem] leading-relaxed text-ink-2">{texto}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        {/* ---------- procedimento operacional ---------- */}
        <div className="reveal mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="display text-4xl text-ink">Procedimento operacional</h3>
            <p className="label text-ink-2">pop-01 · raspberry pi</p>
          </div>
          <ol className="sheet mt-5">
            {baumier.comandos.map((c, i) => (
              <li
                key={c.tarefa}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-x-3 border-b border-rule px-4 py-3 last:border-b-0 sm:grid-cols-[2.5rem_10rem_1fr]"
              >
                <span className="display text-2xl text-signal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="label text-ink">{c.tarefa}</span>
                <div className="col-span-2 mt-2 flex min-w-0 items-center gap-2 sm:col-span-1 sm:mt-0">
                  <code className="min-w-0 flex-1 overflow-x-auto bg-ink px-3 py-2 font-mono text-[0.76rem] whitespace-nowrap text-paper">
                    <span className="text-hazard" aria-hidden="true">
                      ${' '}
                    </span>
                    {c.cmd}
                  </code>
                  <button
                    type="button"
                    onClick={() => copiar(c.cmd)}
                    aria-label={`Copiar comando: ${c.tarefa}`}
                    title="Copiar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <IconCopy width="14" height="14" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <p className="atencao mt-5 flex gap-4 bg-sheet p-4 text-ink">
            <span className="display shrink-0 text-2xl">Atenção</span>
            <span className="leading-relaxed">{baumier.avisoComandos}</span>
          </p>
        </div>

        {/* ---------- aprendizados ---------- */}
        <div className="mt-20">
          <div className="reveal flex flex-wrap items-end justify-between gap-3 border-b-[1.5px] border-ink pb-3">
            <h3 className="display text-4xl text-ink">O que aprendi</h3>
            <p className="label text-ink-2">notas de projeto</p>
          </div>
          <ol className="grid gap-x-10 md:grid-cols-2">
            {baumier.aprendizados.map((a, i) => (
              <li
                key={a.titulo}
                className="reveal grid grid-cols-[3rem_1fr] gap-2 border-b border-rule py-5"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <span className="display text-3xl text-signal">N{i + 1}</span>
                <div>
                  <h4 className="display text-2xl text-ink">{a.titulo}</h4>
                  <p className="mt-1.5 leading-relaxed text-ink-2">{a.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  )
}

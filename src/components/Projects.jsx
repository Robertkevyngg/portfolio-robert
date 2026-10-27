import { useMemo, useState } from 'react'
import Section from './Section'
import Instrumento from './Instrumento'
import { descricoesRepos, destaques, profile } from '../data/profile'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { IconArrow, IconExternal, IconGithub, IconLock, IconStar } from './Icons'

const dataBR = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

// a lista começa com poucas linhas; o resto abre no botão "mostrar todos"
const LIMITE_INICIAL = 8

const titulo = (slug) =>
  slug
    .replace(/[-_]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

function FolhaDeDados({ p, indice, meta, expandido, alternar }) {
  const numero = String(301 + indice)
  return (
    <article
      className="reveal sheet flex min-w-0 flex-col"
      style={{ transitionDelay: `${(indice % 2) * 80}ms` }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b-[1.5px] border-ink p-5">
        <Instrumento tag="PJ" numero={numero} tamanho={52} />
        <div className="min-w-0 flex-1">
          <p className="label text-signal">{p.tipo}</p>
          <p className="label mt-1 text-ink-2">
            folha de dados · pj-{numero} · {p.ano}
          </p>
        </div>
        {p.status ? (
          <span className="carimbo shrink-0 text-amber">{p.status}</span>
        ) : (
          <span className="carimbo shrink-0 text-run">entregue</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-[2rem] leading-[0.92] text-ink">{p.titulo}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{p.resumo}</p>

        <dl className="mt-5 border-t border-rule">
          <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-rule py-2.5">
            <dt className="label pt-1 text-ink-2">sinais</dt>
            <dd className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="label border border-ink/40 px-1.5 py-1 text-ink">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        {p.detalhes?.length > 0 && (
          <>
            <button
              type="button"
              onClick={alternar}
              aria-expanded={expandido}
              aria-controls={`detalhes-${p.id}`}
              className="label mt-3 flex items-center gap-2 self-start py-2 text-ink hover:text-signal"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center border-[1.5px] border-current transition-transform ${
                  expandido ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
              especificação técnica
            </button>
            <div
              id={`detalhes-${p.id}`}
              inert={!expandido}
              className="grid transition-[grid-template-rows] duration-500"
              style={{ gridTemplateRows: expandido ? '1fr' : '0fr' }}
            >
              <ol className="overflow-hidden">
                {p.detalhes.map((d, i) => (
                  <li
                    key={d}
                    className="grid grid-cols-[2rem_1fr] gap-2 border-t border-rule py-2.5 text-[0.92rem] leading-relaxed text-ink-2 first:mt-2"
                  >
                    <span className="label pt-1 text-signal">{String(i + 1).padStart(2, '0')}</span>
                    {d}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
          {meta ? (
            <>
              <a
                href={meta.url}
                target="_blank"
                rel="noreferrer noopener"
                className="label link-u flex items-center gap-2 text-ink"
              >
                <IconGithub width="14" height="14" /> código
                <span className="sr-only"> de {p.titulo} (abre em nova aba)</span>
              </a>
              {meta.site && (
                <a
                  href={meta.site}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-u flex items-center gap-2 text-ink"
                >
                  <IconExternal /> ver ao vivo
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
              {meta.estrelas > 0 && (
                <span className="label flex items-center gap-1.5 text-ink-2">
                  <IconStar /> {meta.estrelas}
                  <span className="sr-only">estrelas</span>
                </span>
              )}
            </>
          ) : (
            <span className="label flex items-center gap-2 text-ink-2">
              <IconLock /> código fechado — posso mostrar em conversa
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { repos, estado } = useGithubRepos(profile.handle)
  const [filtro, setFiltro] = useState('todos')
  const [aberto, setAberto] = useState(null)
  const [todos, setTodos] = useState(false)

  // repositórios já mostrados em destaque não se repetem no índice
  const emDestaque = useMemo(() => new Set(destaques.map((d) => d.repo).filter(Boolean)), [])
  const outros = useMemo(() => repos.filter((r) => !emDestaque.has(r.nome)), [repos, emDestaque])

  // linguagens com a contagem de repositórios de cada uma
  const linguagens = useMemo(() => {
    const contagem = new Map()
    outros.forEach((r) => {
      if (r.linguagem) contagem.set(r.linguagem, (contagem.get(r.linguagem) || 0) + 1)
    })
    return [
      ['todos', outros.length],
      ...[...contagem].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    ]
  }, [outros])

  const visiveis = useMemo(
    () => (filtro === 'todos' ? outros : outros.filter((r) => r.linguagem === filtro)),
    [outros, filtro],
  )
  const exibidos = todos ? visiveis : visiveis.slice(0, LIMITE_INICIAL)
  const escondidos = visiveis.length - exibidos.length
  const metaDoRepo = (nome) => repos.find((r) => r.nome === nome)

  return (
    <Section
      id="projetos"
      tag="PJ"
      area="300"
      titulo="O que eu construí"
      legenda="Projetos em destaque com o contexto por trás, seguidos do índice de todos os repositórios públicos — puxados ao vivo da API do GitHub."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {destaques.map((p, i) => (
          <FolhaDeDados
            key={p.id}
            p={p}
            indice={i}
            meta={p.repo ? metaDoRepo(p.repo) : null}
            expandido={aberto === p.id}
            alternar={() => setAberto(aberto === p.id ? null : p.id)}
          />
        ))}
      </div>

      {/* ---------- índice de instrumentos (todos os repositórios) ---------- */}
      <div className="mt-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] border-ink pb-3">
          <div>
            <h3 className="display text-4xl text-ink">
              Índice de repositórios
              {estado !== 'carregando' && (
                <span className="label ml-3 align-middle text-ink-2">({outros.length})</span>
              )}
            </h3>
            <p className="label mt-2 flex items-center gap-2 text-ink-2" role="status">
              <span
                className={`h-2 w-2 rounded-full ${estado === 'reserva' ? 'bg-amber' : 'bg-run'}`}
                aria-hidden="true"
              />
              {estado === 'carregando'
                ? 'lendo a API do GitHub…'
                : estado === 'reserva'
                  ? 'API indisponível — último snapshot'
                  : 'ao vivo da API do GitHub'}
            </p>
          </div>
        </div>

        {estado !== 'carregando' && linguagens.length > 2 && (
          <div
            className="reveal mt-5 flex flex-wrap border-t-[1.5px] border-l-[1.5px] border-ink"
            role="group"
            aria-label="Filtrar por linguagem"
          >
            {linguagens.map(([l, n]) => (
              <button
                key={l}
                type="button"
                onClick={() => setFiltro(l)}
                aria-pressed={filtro === l}
                className={`label flex min-h-11 items-center gap-2 border-r-[1.5px] border-b-[1.5px] border-ink px-3.5 transition-colors ${
                  filtro === l ? 'bg-ink text-paper' : 'bg-sheet text-ink hover:bg-paper-2'
                }`}
              >
                {l}
                <span className={filtro === l ? 'text-hazard' : 'text-signal'}>{n}</span>
              </button>
            ))}
          </div>
        )}

        {estado === 'carregando' ? (
          <div
            className="mt-6 h-64 animate-pulse border-[1.5px] border-ink/30 bg-sheet/60"
            aria-hidden="true"
          />
        ) : (
          <div className="mt-6 overflow-hidden border-[1.5px] border-ink bg-sheet">
            <div
              className="label hidden grid-cols-[4.5rem_1fr_9rem_7rem_2rem] gap-4 bg-ink px-4 py-2.5 text-paper md:grid"
              aria-hidden="true"
            >
              <span>tag</span>
              <span>repositório</span>
              <span>linguagem</span>
              <span>atualizado</span>
              <span />
            </div>
            <ul>
              {exibidos.map((r, i) => (
                <li key={r.id} className="border-b border-rule last:border-b-0">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group grid grid-cols-[3.5rem_1fr_1.5rem] gap-x-3 px-4 py-3.5 transition-colors hover:bg-paper md:grid-cols-[4.5rem_1fr_9rem_7rem_2rem] md:items-center md:gap-4"
                  >
                    <span className="label pt-1 text-signal md:pt-0">
                      R-{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-ink group-hover:text-signal">
                        {titulo(r.nome)}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[0.88rem] leading-snug text-ink-2">
                        {descricoesRepos[r.nome] || r.descricao || 'Repositório de estudos.'}
                      </span>
                      <span className="label mt-1.5 block text-ink-2 md:hidden">
                        {r.linguagem ?? '—'} · {dataBR(r.atualizado)}
                      </span>
                    </span>
                    <span className="label hidden text-ink md:block">{r.linguagem ?? '—'}</span>
                    <span className="label hidden text-ink-2 md:block">
                      <span className="sr-only">atualizado em </span>
                      {dataBR(r.atualizado)}
                    </span>
                    <span className="flex justify-end pt-1 text-ink transition-transform group-hover:translate-x-1 md:pt-0">
                      <IconArrow />
                      <span className="sr-only">(abre em nova aba)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {estado !== 'carregando' && visiveis.length > LIMITE_INICIAL && (
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={() => setTodos((v) => !v)} className="btn btn--outline">
              {todos ? 'mostrar menos' : `mostrar todos (+${escondidos})`}
            </button>
          </div>
        )}
      </div>
    </Section>
  )
}

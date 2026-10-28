import { useMemo, useState } from 'react'
import Section from './Section'
import { descricoesRepos, destaques, profile } from '../data/profile'
import { useGithubRepos } from '../hooks/useGithubRepos'
import {
  IconArrow,
  IconChevron,
  IconExternal,
  IconGithub,
  IconLock,
  IconPlus,
  IconStar,
} from './Icons'

const dataBR = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

const LIMITE_INICIAL = 6

const titulo = (slug) =>
  slug
    .replace(/[-_]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

function Destaque({ p, meta, expandido, alternar }) {
  return (
    <article className="card card-hover flex flex-col overflow-hidden p-7 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow text-xs">{p.tipo}</span>
        <span className="text-xs text-text-3">· {p.ano}</span>
        {p.status && <span className="pill ml-auto text-xs">{p.status}</span>}
        {p.privado && (
          <span className="ml-auto flex items-center gap-1 text-xs text-text-3">
            <IconLock width="13" height="13" /> privado
          </span>
        )}
      </div>

      <h3 className="title mt-4 text-2xl text-text">{p.titulo}</h3>
      <p className="mt-3 leading-relaxed text-text-2">{p.resumo}</p>

      {p.detalhes?.length > 0 && (
        <>
          <button
            type="button"
            onClick={alternar}
            aria-expanded={expandido}
            aria-controls={`detalhes-${p.id}`}
            className="link-arrow mt-4 inline-flex min-h-[28px] items-center self-start py-1 text-sm"
          >
            <IconPlus
              width="15"
              height="15"
              className={`transition-transform ${expandido ? 'rotate-45' : ''}`}
            />
            {expandido ? 'Menos detalhes' : 'Detalhes técnicos'}
          </button>
          <div
            id={`detalhes-${p.id}`}
            inert={!expandido}
            className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-apple)]"
            style={{ gridTemplateRows: expandido ? '1fr' : '0fr' }}
          >
            <ul className="overflow-hidden">
              {p.detalhes.map((d) => (
                <li
                  key={d}
                  className="mt-3 flex gap-3 text-[0.92rem] leading-relaxed text-text-2 first:mt-4"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="pill text-xs">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
        {meta ? (
          <>
            <a
              href={meta.url}
              target="_blank"
              rel="noreferrer noopener"
              className="link-arrow inline-flex min-h-[28px] items-center py-1 text-sm"
            >
              <IconGithub width="16" height="16" /> Código
              <span className="sr-only"> de {p.titulo} (abre em nova aba)</span>
            </a>
            {meta.site && (
              <a
                href={meta.site}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow inline-flex min-h-[28px] items-center py-1 text-sm"
              >
                <IconExternal width="15" height="15" /> Ver ao vivo
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
            {meta.estrelas > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-text-3">
                <IconStar width="14" height="14" /> {meta.estrelas}
                <span className="sr-only">estrelas</span>
              </span>
            )}
          </>
        ) : (
          <span className="flex items-center gap-2 text-sm text-text-3">
            <IconLock width="14" height="14" /> Código fechado — posso mostrar em conversa
          </span>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const { repos, estado } = useGithubRepos(profile.handle)
  const [filtro, setFiltro] = useState('todos')
  const [aberto, setAberto] = useState(null)
  const [todos, setTodos] = useState(false)

  const emDestaque = useMemo(() => new Set(destaques.map((d) => d.repo).filter(Boolean)), [])
  const outros = useMemo(() => repos.filter((r) => !emDestaque.has(r.nome)), [repos, emDestaque])

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
      eyebrow="Projetos"
      titulo="O que eu construí"
      legenda="Projetos em destaque com o contexto por trás, seguidos de todos os repositórios públicos — puxados ao vivo da API do GitHub."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {destaques.map((p, i) => (
          <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
            <Destaque
              p={p}
              meta={p.repo ? metaDoRepo(p.repo) : null}
              expandido={aberto === p.id}
              alternar={() => setAberto(aberto === p.id ? null : p.id)}
            />
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div className="reveal text-center">
          <h3 className="title text-2xl text-text sm:text-3xl">
            Todos os repositórios
            {estado !== 'carregando' && (
              <span className="ml-2 font-normal text-text-3">({outros.length})</span>
            )}
          </h3>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-text-3" role="status">
            <span
              className={`h-2 w-2 rounded-full ${estado === 'reserva' ? 'bg-text-3' : 'bg-good'}`}
              aria-hidden="true"
            />
            {estado === 'carregando'
              ? 'Lendo a API do GitHub…'
              : estado === 'reserva'
                ? 'API indisponível — último snapshot'
                : 'Ao vivo da API do GitHub'}
          </p>
        </div>

        {estado !== 'carregando' && linguagens.length > 2 && (
          <div
            className="reveal mt-6 flex flex-wrap justify-center gap-2"
            role="group"
            aria-label="Filtrar por linguagem"
          >
            {linguagens.map(([l, n]) => (
              <button
                key={l}
                type="button"
                onClick={() => setFiltro(l)}
                aria-pressed={filtro === l}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
                  filtro === l ? 'bg-text text-bg' : 'bg-bg-2 text-text-2 hover:text-text'
                }`}
              >
                {l}
                <span className={filtro === l ? 'opacity-70' : 'text-text-3'}>{n}</span>
              </button>
            ))}
          </div>
        )}

        {estado === 'carregando' ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="tile h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exibidos.map((r, i) => (
              <li
                key={r.id}
                className="reveal contents"
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="title text-base text-text transition-colors group-hover:text-accent">
                      {titulo(r.nome)}
                    </h4>
                    <IconExternal
                      width="15"
                      height="15"
                      className="mt-1 shrink-0 text-text-3 transition-colors group-hover:text-accent"
                    />
                    <span className="sr-only">(abre em nova aba)</span>
                  </div>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-text-2">
                    {descricoesRepos[r.nome] || r.descricao || 'Repositório de estudos.'}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 text-xs text-text-3">
                    {r.linguagem && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                        {r.linguagem}
                      </span>
                    )}
                    {r.estrelas > 0 && (
                      <span className="flex items-center gap-1">
                        <IconStar width="13" height="13" /> {r.estrelas}
                        <span className="sr-only">estrelas</span>
                      </span>
                    )}
                    <span className="ml-auto">
                      <span className="sr-only">atualizado em </span>
                      {dataBR(r.atualizado)}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {estado !== 'carregando' && visiveis.length > LIMITE_INICIAL && (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setTodos((v) => !v)} className="btn btn--soft">
              {todos ? 'Mostrar menos' : `Mostrar todos (+${escondidos})`}
              <IconChevron
                width="15"
                height="15"
                className={`transition-transform ${todos ? '-rotate-90' : 'rotate-90'}`}
              />
            </button>
          </div>
        )}
      </div>
    </Section>
  )
}

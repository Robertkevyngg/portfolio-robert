import { useMemo, useState } from 'react'
import Section from './Section'
import { descricoesRepos, destaques, profile } from '../data/profile'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { IconExternal, IconFork, IconGithub, IconLock, IconStar } from './Icons'

const CORES = {
  Python: '#3776ab',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#da5b0b',
  Shell: '#89e051',
  'C++': '#f34b7d',
  C: '#555555',
}

const dataBR = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

// grade começa com poucas linhas; o resto abre no botão "mostrar todos"
const LIMITE_INICIAL = 6

const titulo = (slug) =>
  slug
    .replace(/[-_]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

export default function Projects() {
  const { repos, estado } = useGithubRepos(profile.handle)
  const [filtro, setFiltro] = useState('todos')
  const [aberto, setAberto] = useState(null)
  const [todos, setTodos] = useState(false)

  // repositórios já mostrados em destaque não se repetem na grade
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
      indice="02 // projetos"
      titulo="O que eu construí"
      legenda="Projetos em destaque com o contexto por trás, seguidos de todos os repositórios públicos — puxados ao vivo da API do GitHub."
    >
      {/* ---------- destaques ---------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        {destaques.map((p, i) => {
          const meta = p.repo ? metaDoRepo(p.repo) : null
          const expandido = aberto === p.id
          return (
            <article
              key={p.id}
              className="reveal panel bracket flex flex-col p-7"
              style={{ transitionDelay: `${(i % 2) * 90}ms` }}
            >
              <div className="sweep" />

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-magenta uppercase">
                  {p.tipo}
                </span>
                <span className="font-mono text-[0.7rem] text-muted">{p.ano}</span>
                {p.status && (
                  <span className="font-mono text-[0.7rem] text-amber">
                    <span aria-hidden="true">● </span>
                    {p.status}
                  </span>
                )}
                {p.privado && (
                  <span className="ml-auto flex items-center gap-1 font-mono text-[0.7rem] text-muted">
                    <IconLock /> projeto privado
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-xl leading-snug font-bold text-ink sm:text-2xl">
                {p.titulo}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">{p.resumo}</p>

              {p.detalhes?.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setAberto(expandido ? null : p.id)}
                    aria-expanded={expandido}
                    aria-controls={`detalhes-${p.id}`}
                    className="-mx-2 mt-3 self-start px-2 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-cyan uppercase transition-opacity hover:opacity-70"
                  >
                    <span aria-hidden="true">{expandido ? '— ' : '+ '}</span>
                    {expandido ? 'menos detalhes' : 'detalhes técnicos'}
                  </button>
                  <div
                    id={`detalhes-${p.id}`}
                    inert={!expandido}
                    className="grid transition-[grid-template-rows] duration-500"
                    style={{ gridTemplateRows: expandido ? '1fr' : '0fr' }}
                  >
                    <ul className="overflow-hidden">
                      {p.detalhes.map((d) => (
                        <li
                          key={d}
                          className="mt-2.5 flex gap-2.5 text-[0.82rem] leading-relaxed text-muted first:mt-4"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-cyan"
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
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-5 border-t border-line pt-5">
                {meta ? (
                  <>
                    <a
                      href={meta.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-u flex items-center gap-2 font-mono text-xs text-cyan"
                    >
                      <IconGithub width="14" height="14" /> código
                      <span className="sr-only"> de {p.titulo} (abre em nova aba)</span>
                    </a>
                    {meta.site && (
                      <a
                        href={meta.site}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-u flex items-center gap-2 font-mono text-xs text-magenta"
                      >
                        <IconExternal /> ver ao vivo
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    )}
                    {meta.estrelas > 0 && (
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                        <IconStar /> {meta.estrelas}
                        <span className="sr-only">estrelas</span>
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-mono text-xs text-muted">
                    código fechado — posso mostrar em conversa
                  </span>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* ---------- todos os repositórios ---------- */}
      <div className="mt-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-ink">
              Outros repositórios
              {estado !== 'carregando' && (
                <span className="ml-3 align-middle font-mono text-sm font-normal text-muted">
                  ({outros.length})
                </span>
              )}
            </h3>
            <p className="mt-2 font-mono text-xs text-muted" role="status">
              <span
                className={`pulse-dot mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                  estado === 'reserva' ? 'bg-amber text-amber' : 'bg-lime text-lime'
                }`}
                aria-hidden="true"
              />
              {estado === 'carregando'
                ? 'carregando repositórios do GitHub…'
                : estado === 'reserva'
                  ? 'API do GitHub indisponível agora — mostrando o último snapshot'
                  : 'direto da API do GitHub — atualiza sozinho a cada push'}
            </p>
          </div>

          {estado !== 'carregando' && linguagens.length > 2 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por linguagem">
              {linguagens.map(([l, n]) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setFiltro(l)}
                  aria-pressed={filtro === l}
                  className={`flex min-h-9 items-center gap-2 border px-3 py-2 font-mono text-[0.7rem] tracking-wider transition-colors ${
                    filtro === l
                      ? 'border-cyan bg-cyan/10 text-cyan'
                      : 'border-line text-muted hover:border-cyan/40 hover:text-ink'
                  }`}
                >
                  {l.toLowerCase()}
                  <span className={filtro === l ? 'text-cyan/70' : 'text-muted/70'}>{n}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {estado === 'carregando' && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="panel h-40 p-6">
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton mt-4 h-3 w-full" />
                <div className="skeleton mt-2 h-3 w-4/5" />
              </div>
            ))}
          </div>
        )}

        {estado !== 'carregando' && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exibidos.map((r, i) => (
              <li key={r.id} className="contents">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="reveal panel bracket group flex flex-col p-6"
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                >
                  <div className="sweep" />
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display font-semibold text-ink transition-colors group-hover:text-cyan">
                      {titulo(r.nome)}
                    </h4>
                    <IconExternal className="mt-1 shrink-0 text-muted transition-colors group-hover:text-cyan" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </div>

                  <p className="mt-2.5 line-clamp-3 text-[0.82rem] leading-relaxed text-muted">
                    {descricoesRepos[r.nome] || r.descricao || 'Repositório de estudos.'}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 font-mono text-[0.7rem] text-muted">
                    {r.linguagem && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          aria-hidden="true"
                          style={{ background: CORES[r.linguagem] || '#8b949e' }}
                        />
                        {r.linguagem}
                      </span>
                    )}
                    {r.estrelas > 0 && (
                      <span className="flex items-center gap-1">
                        <IconStar /> {r.estrelas}
                        <span className="sr-only">estrelas</span>
                      </span>
                    )}
                    {r.forks > 0 && (
                      <span className="flex items-center gap-1">
                        <IconFork /> {r.forks}
                        <span className="sr-only">forks</span>
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

        {estado !== 'carregando' &&
          (escondidos > 0 || todos) &&
          visiveis.length > LIMITE_INICIAL && (
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={() => setTodos((v) => !v)} className="btn btn--ghost">
                <span>{todos ? 'mostrar menos' : `mostrar todos (+${escondidos})`}</span>
              </button>
            </div>
          )}
      </div>
    </Section>
  )
}

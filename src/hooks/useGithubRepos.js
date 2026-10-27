import { useEffect, useState } from 'react'
import { reposOcultos } from '../data/profile'
import { reposFallback } from '../data/reposFallback'

const CACHE_KEY = 'gh-repos-cache-v2'
const CACHE_TTL = 1000 * 60 * 30 // 30 min

// Uma única requisição por carregamento de página, mesmo com vários componentes
// usando o hook (Hero mostra a contagem, Projects mostra a grade).
let pendente = null

/**
 * Busca os repositórios públicos direto da API do GitHub.
 * Cache no sessionStorage para não estourar o rate limit (60 req/h por IP).
 */
export function useGithubRepos(usuario) {
  const [repos, setRepos] = useState([])
  const [estado, setEstado] = useState('carregando') // carregando | pronto | reserva

  useEffect(() => {
    let vivo = true
    pendente ??= buscar(usuario)
    pendente.then(({ repos, estado }) => {
      if (!vivo) return
      setRepos(repos)
      setEstado(estado)
    })
    return () => {
      vivo = false
    }
  }, [usuario])

  return { repos, estado }
}

async function buscar(usuario) {
  const cacheado = lerCache()
  if (cacheado) return { repos: cacheado, estado: 'pronto' }

  try {
    const r = await fetch(
      `https://api.github.com/users/${usuario}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: 'application/vnd.github+json' },
      },
    )
    if (!r.ok) throw new Error(`GitHub respondeu ${r.status}`)
    const limpos = (await r.json())
      .filter((r) => !r.fork && !r.archived && !reposOcultos.includes(r.name))
      .map((r) => ({
        id: r.id,
        nome: r.name,
        descricao: r.description,
        url: r.html_url,
        site: r.homepage,
        linguagem: r.language,
        estrelas: r.stargazers_count,
        forks: r.forks_count,
        topicos: r.topics || [],
        atualizado: r.pushed_at,
      }))
      .sort((a, b) => new Date(b.atualizado) - new Date(a.atualizado))
    gravarCache(limpos)
    return { repos: limpos, estado: 'pronto' }
  } catch {
    // API fora do ar ou limite de requisições: usa o snapshot local
    return {
      repos: reposFallback.filter((r) => !reposOcultos.includes(r.nome)),
      estado: 'reserva',
    }
  }
}

function lerCache() {
  try {
    const cru = sessionStorage.getItem(CACHE_KEY)
    if (!cru) return null
    const { t, d } = JSON.parse(cru)
    if (Date.now() - t > CACHE_TTL) return null
    return d
  } catch {
    return null
  }
}

function gravarCache(dados) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: dados }))
  } catch {
    /* modo privado / storage bloqueado — segue sem cache */
  }
}

// Atualiza src/data/reposFallback.js com os repositórios públicos atuais.
// Uso: npm run snapshot
import { writeFile } from 'node:fs/promises'

const USUARIO = 'Robertkevyngg'
const destino = new URL('../src/data/reposFallback.js', import.meta.url)

const r = await fetch(`https://api.github.com/users/${USUARIO}/repos?per_page=100&sort=pushed`, {
  headers: { Accept: 'application/vnd.github+json' },
})
if (!r.ok) throw new Error(`GitHub respondeu ${r.status}`)

const repos = (await r.json())
  .filter((repo) => !repo.fork && !repo.archived)
  .map((repo) => ({
    id: repo.id,
    nome: repo.name,
    descricao: repo.description,
    url: repo.html_url,
    site: repo.homepage || null,
    linguagem: repo.language,
    estrelas: repo.stargazers_count,
    forks: repo.forks_count,
    topicos: repo.topics || [],
    atualizado: repo.pushed_at,
  }))

const mes = new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
await writeFile(
  destino,
  `// Snapshot dos repositórios, gerado em ${mes} por \`npm run snapshot\`.
// Só é usado se a API do GitHub não responder (limite de requisições, offline
// ou preview sem rede). Em condições normais os dados vêm ao vivo da API.
export const reposFallback = ${JSON.stringify(repos, null, 2)}
`,
)
console.log(`✓ ${repos.length} repositórios salvos em src/data/reposFallback.js`)

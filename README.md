# Portfólio — Robert Gomes

Portfólio pessoal em React + Vite, com estética cyberpunk e os projetos puxados **ao vivo
da API pública do GitHub**.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
```

Build de produção:

```bash
npm run build    # gera /dist (já com o HTML pré-renderizado)
npm run preview  # serve o /dist para conferir
npm run lint     # ESLint (inclui regras de acessibilidade jsx-a11y)
npm run format   # Prettier
npm run snapshot # atualiza src/data/reposFallback.js com os repos atuais
```

## O que editar

Praticamente tudo o que é conteúdo mora em **um arquivo só**:

```
src/data/profile.js
```

Lá dentro:

| Bloco             | O que controla                                                                          |
| ----------------- | --------------------------------------------------------------------------------------- |
| `profile`         | nome, cargo, contatos, bio, números do topo, frases digitadas, terminal e faixa rolante |
| `stack`           | os grupos de tecnologias da seção Stack                                                 |
| `destaques`       | os projetos em destaque (com `repo` ligando ao repositório real)                        |
| `certificacoes`   | a lista de certificações                                                                |
| `trajetoria`      | a linha do tempo                                                                        |
| `reposOcultos`    | repositórios que não devem aparecer na grade                                            |
| `descricoesRepos` | descrição de reserva para repos sem `description` no GitHub                             |

Os repositórios da grade **não são escritos à mão**: vêm de
`https://api.github.com/users/Robertkevyngg/repos` a cada visita, ordenados pelo push mais
recente, com cache de 30 min no navegador para não bater no limite de requisições.

> Dica: preencher a _description_ e os _topics_ de cada repositório direto no GitHub deixa o
> site melhor sem tocar em uma linha de código.

## Publicar

A URL pública fica em **`.env`** (`VITE_SITE_URL`). Ela alimenta o canonical, as tags
Open Graph / Twitter, o JSON-LD e os `robots.txt` / `sitemap.xml` gerados no build —
troque ali se publicar em outro endereço.

### Vercel (recomendado)

1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → escolha o repositório.
3. O Vercel detecta Vite sozinho (`npm run build`, saída `dist`). Só clicar em Deploy.
4. Domínio próprio depois é um clique em **Settings → Domains**.

### GitHub Pages

O workflow `.github/workflows/deploy.yml` já está pronto. Em todo push e pull request ele roda
lint, checagem de formatação e build; na `main` também publica.

1. Suba para a branch `main`.
2. No repositório: **Settings → Pages → Source → GitHub Actions**.
3. A cada push o site republica em `https://robertkevyngg.github.io/NOME-DO-REPO/`.

O workflow ajusta o `base` do Vite para a subpasta automaticamente.

### Netlify

Build command `npm run build`, publish directory `dist`.

## Arquitetura

```
src/
├── data/profile.js          ← TODO o conteúdo
├── entry-server.jsx         ← usado só no build para pré-renderizar o HTML
├── lib/toast.js             ← avisos rápidos ("e-mail copiado")
├── hooks/
│   ├── useGithubRepos.js    ← fetch + cache da API do GitHub
│   └── useReveal.js         ← animação de entrada (IntersectionObserver + MutationObserver)
├── components/
│   ├── Background.jsx       grid, glows, scanline e ruído
│   ├── Cursor.jsx           cursor customizado (ponto + anel com lerp)
│   ├── Nav.jsx              nav com seção ativa e barra de progresso
│   ├── Hero.jsx             título com glitch, máquina de escrever e terminal
│   ├── Projects.jsx         destaques + grade ao vivo com filtro por linguagem
│   ├── Stack.jsx  Certifications.jsx  Timeline.jsx  About.jsx  Contact.jsx
│   └── Icons.jsx            ícones em SVG inline (zero dependência)
└── index.css                design system (Tailwind v4 + CSS próprio)
```

Sem bibliotecas de animação, sem UI kit: React, Vite e Tailwind. O resto é CSS.
Fontes servidas pelo próprio site (`@fontsource-variable`), sem chamada ao Google Fonts.

`scripts/prerender.js` roda depois do build: renderiza o App em HTML estático dentro de
`dist/index.html`, então buscadores e prévias de link enxergam o conteúdo sem JavaScript.

## Acessibilidade e performance

- Respeita `prefers-reduced-motion` (desliga glitch, cursor, typewriter e reveals)
- Link "pular para o conteúdo", landmarks e títulos de seção ligados por `aria-labelledby`
- Navegação por teclado com `:focus-visible` visível em links, botões e cards
- Menu mobile com `inert` quando fechado, foco preso enquanto aberto e `Esc` para fechar
- Filtros com `aria-pressed`, detalhes recolhíveis com `aria-controls` e status anunciado
- Faixa rolante com botão de pausa; nome e frases digitadas lidos uma vez só
- Cursor customizado some em telas de toque
- `~73 kB` de JS com gzip, sem imagens pesadas

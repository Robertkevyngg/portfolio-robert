# Portfólio — Robert Kevyn Gomes

Portfólio pessoal em React + Vite, com estética cyberpunk e os projetos puxados **ao vivo
da API pública do GitHub**.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
```

Build de produção:

```bash
npm run build    # gera /dist
npm run preview  # serve o /dist para conferir
```

## O que editar

Praticamente tudo o que é conteúdo mora em **um arquivo só**:

```
src/data/profile.js
```

Lá dentro:

| Bloco | O que controla |
|---|---|
| `profile` | nome, cargo, contatos, bio, números do topo e frases que aparecem sendo digitadas |
| `stack` | os grupos de tecnologias da seção Stack |
| `destaques` | os projetos em destaque (com `repo` ligando ao repositório real) |
| `certificacoes` | a lista de certificações |
| `trajetoria` | a linha do tempo |
| `reposOcultos` | repositórios que não devem aparecer na grade |
| `descricoesRepos` | descrição de reserva para repos sem `description` no GitHub |

Os repositórios da grade **não são escritos à mão**: vêm de
`https://api.github.com/users/Robertkevyngg/repos` a cada visita, ordenados pelo push mais
recente, com cache de 30 min no navegador para não bater no limite de requisições.

> Dica: preencher a *description* e os *topics* de cada repositório direto no GitHub deixa o
> site melhor sem tocar em uma linha de código.

## Publicar

### Vercel (recomendado)

1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → escolha o repositório.
3. O Vercel detecta Vite sozinho (`npm run build`, saída `dist`). Só clicar em Deploy.
4. Domínio próprio depois é um clique em **Settings → Domains**.

### GitHub Pages

O workflow `.github/workflows/deploy.yml` já está pronto.

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
├── hooks/
│   ├── useGithubRepos.js    ← fetch + cache da API do GitHub
│   └── useReveal.js         ← animação de entrada por IntersectionObserver
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

## Acessibilidade e performance

- Respeita `prefers-reduced-motion` (desliga glitch, cursor, typewriter e reveals)
- Navegação por teclado com `:focus-visible` visível
- Cursor customizado some em telas de toque
- `~72 kB` de JS com gzip, sem imagens pesadas

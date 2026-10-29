import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Gera robots.txt, sitemap.xml e o manifest no build, a partir de VITE_SITE_URL
// (definida em .env) — assim trocar de domínio é mudar uma linha só.
function arquivosDeSeo(siteUrl) {
  return {
    name: 'arquivos-de-seo',
    apply: 'build',
    generateBundle() {
      const hoje = new Date().toISOString().slice(0, 10)
      const emitir = (fileName, source) => this.emitFile({ type: 'asset', fileName, source })

      emitir('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
      emitir(
        'sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${hoje}</lastmod>
  </url>
</urlset>
`,
      )
      emitir(
        'site.webmanifest',
        JSON.stringify(
          {
            name: 'Robert Gomes — Portfólio',
            short_name: 'Robert Gomes',
            start_url: '.',
            display: 'standalone',
            background_color: '#ffffff',
            theme_color: '#ffffff',
            icons: [
              { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
              { src: 'apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            ],
          },
          null,
          2,
        ),
      )
    },
  }
}

// base '/' serve para Vercel, Netlify e usuario.github.io
// Para publicar em subpasta (ex.: GitHub Pages), defina VITE_BASE=/nome-do-repo/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    base: process.env.VITE_BASE || '/',
    plugins: [react(), tailwindcss(), arquivosDeSeo(env.VITE_SITE_URL)],
    build: { outDir: 'dist', sourcemap: false },
  }
})

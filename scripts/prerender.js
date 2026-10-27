// Pré-renderiza o App em HTML estático dentro de dist/index.html.
// Buscadores e prévias de link (WhatsApp, LinkedIn) passam a ver o conteúdo
// sem precisar executar JavaScript. Roda depois de `vite build` + build SSR.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = fileURLToPath(new URL('..', import.meta.url))
const htmlPath = `${raiz}dist/index.html`
const ssrPath = `${raiz}dist-ssr/entry-server.js`

const { render } = await import(pathToFileURL(ssrPath).href)
const html = await readFile(htmlPath, 'utf8')

if (!html.includes('<!--app-->')) {
  throw new Error('dist/index.html sem o marcador <!--app-->')
}

await writeFile(htmlPath, html.replace('<!--app-->', render()))
await rm(`${raiz}dist-ssr`, { recursive: true, force: true })
console.log('✓ dist/index.html pré-renderizado')

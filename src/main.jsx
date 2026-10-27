import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/big-shoulders-display/wght'
import '@fontsource-variable/martian-mono/standard'
import '@fontsource-variable/atkinson-hyperlegible-next/wght'
import App from './App.jsx'
import './index.css'

const raiz = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build de produção o HTML já vem pré-renderizado (scripts/prerender.js):
// o React só "hidrata". No `npm run dev` a raiz chega vazia e renderiza do zero.
if (raiz.firstElementChild) hydrateRoot(raiz, app)
else createRoot(raiz).render(app)

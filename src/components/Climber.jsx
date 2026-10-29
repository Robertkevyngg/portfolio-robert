import { useEffect, useRef, useState } from 'react'
import Sprite from './Sprite'

// Largura do conteúdo das seções (max-w-5xl + px-8) — as escadas ficam nas margens
const CONTEUDO = 1024
const RECUO = 32
// Meia "zona de caminhada": quantos px de rolagem o boneco passa andando na viga
const ZONA = 150
// Ponto da tela que o boneco acompanha (0 = topo, 1 = base)
const ANCORA = 0.6

const lerp = (a, b, t) => a + (b - a) * t
const limitar = (v, min, max) => Math.min(max, Math.max(min, v))

/**
 * Mede as vigas ([data-girder]) dentro de `main` e monta o percurso:
 * anda pela viga i, desce a escada i pela margem até a viga i+1, e assim por diante.
 */
function medir(main) {
  const topoMain = main.getBoundingClientRect().top
  const largura = main.clientWidth
  const conteudo = Math.min(largura - RECUO * 2, CONTEUDO)
  const margem = (largura - conteudo) / 2
  const esq = margem / 2
  const dir = largura - margem / 2

  const vigas = [...main.querySelectorAll('[data-girder]')].map(
    (el) => el.getBoundingClientRect().top - topoMain,
  )
  const trechos = vigas.map((y, i) => {
    const ultimo = i === vigas.length - 1
    const de = i % 2 === 0 ? esq : dir
    const ate = ultimo ? largura / 2 : i % 2 === 0 ? dir : esq
    return { y, de, ate }
  })
  return { trechos, largura }
}

/** Onde o boneco deve estar para a âncora `a` (px relativos ao topo de main). */
function posicao(a, trechos) {
  const n = trechos.length
  const primeiro = trechos[0]
  if (a < primeiro.y - ZONA) return { x: primeiro.de, y: primeiro.y, modo: 'parado' }

  for (let i = 0; i < n; i++) {
    const t = trechos[i]
    if (a <= t.y + ZONA) {
      const p = limitar((a - (t.y - ZONA)) / (ZONA * 2), 0, 1)
      const fim = i === n - 1 && p >= 1
      return { x: lerp(t.de, t.ate, p), y: t.y, modo: fim ? 'festa' : 'anda' }
    }
    const prox = trechos[i + 1]
    if (prox && a < prox.y - ZONA) {
      const ini = t.y + ZONA
      const p = limitar((a - ini) / Math.max(prox.y - ZONA - ini, 1), 0, 1)
      return { x: t.ate, y: lerp(t.y, prox.y, p), modo: 'sobe' }
    }
  }
  const ult = trechos[n - 1]
  return { x: ult.ate, y: ult.y, modo: 'festa' }
}

/**
 * Camada decorativa sobre o <main>: escadas nas margens e o personagem
 * que desce o site acompanhando a rolagem. Só aparece em telas largas.
 */
export default function Climber() {
  const camada = useRef(null)
  const boneco = useRef(null)
  const mapa = useRef(null)
  const [escadas, setEscadas] = useState([])
  const [quadro, setQuadro] = useState({ nome: 'parado', virado: false })

  useEffect(() => {
    const main = camada.current?.parentElement
    if (!main) return
    const mq = window.matchMedia('(min-width: 1240px)')
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)')

    const remedir = () => {
      if (!mq.matches) return
      const m = medir(main)
      if (m.trechos.length === 0) return
      mapa.current = m
      setEscadas(
        m.trechos.slice(0, -1).map((t, i) => ({ x: t.ate, de: t.y, ate: m.trechos[i + 1].y })),
      )
    }

    const ro = new ResizeObserver(remedir)
    ro.observe(main)
    mq.addEventListener('change', remedir)
    remedir()

    let atual = null
    let ultimoMov = 0
    let estado = { nome: 'parado', virado: false }
    let raf = 0

    const quadro = (nome, virado) => {
      if (nome !== estado.nome || virado !== estado.virado) {
        estado = { nome, virado }
        setQuadro(estado)
      }
    }

    const passo = (agora) => {
      raf = requestAnimationFrame(passo)
      const m = mapa.current
      if (!m || !mq.matches || !boneco.current) return

      const topoMain = main.getBoundingClientRect().top
      const noFim = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 2
      const ancora = noFim ? Infinity : window.innerHeight * ANCORA - topoMain
      const alvo = posicao(ancora, m.trechos)

      if (!atual || calmo.matches) atual = { ...alvo }
      const antes = { ...atual }
      atual.x = lerp(atual.x, alvo.x, 0.22)
      atual.y = lerp(atual.y, alvo.y, 0.22)
      const dx = atual.x - antes.x
      const dy = atual.y - antes.y
      if (Math.abs(dx) + Math.abs(dy) > 0.3) ultimoMov = agora
      const mexendo = agora - ultimoMov < 160

      boneco.current.style.transform = `translate3d(${atual.x - 32}px, ${atual.y - 80}px, 0)`

      if (alvo.modo === 'festa') quadro('festa', false)
      else if (alvo.modo === 'sobe') quadro(Math.floor(atual.y / 22) % 2 ? 'sobeA' : 'sobeB', false)
      else if (alvo.modo === 'anda' && mexendo)
        quadro(
          Math.floor(atual.x / 16) % 2 ? 'andaA' : 'andaB',
          dx < 0 || (dx === 0 && estado.virado),
        )
      else quadro('parado', estado.virado)
    }
    raf = requestAnimationFrame(passo)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mq.removeEventListener('change', remedir)
    }
  }, [])

  return (
    <div
      ref={camada}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden min-[1240px]:block"
    >
      {escadas.map((e, i) => (
        <div
          key={i}
          className="escada absolute"
          style={{ left: e.x - 18, top: e.de, height: e.ate - e.de }}
        />
      ))}
      <div ref={boneco} className="boneco absolute top-0 left-0 will-change-transform">
        <Sprite quadro={quadro.nome} virado={quadro.virado} escala={4} />
      </div>
    </div>
  )
}

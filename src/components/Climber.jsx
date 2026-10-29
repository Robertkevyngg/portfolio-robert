import { useEffect, useRef, useState } from 'react'
import Sprite from './Sprite'

// Largura do conteúdo das seções (max-w-5xl + px-5/sm:px-8) — as escadas ficam nas margens
const CONTEUDO = 1024
// Acima desta largura sobra margem para o boneco grande; abaixo, ele encolhe
const LARGO = 1240
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
  const recuo = largura >= 640 ? 32 : 20
  const conteudo = Math.min(largura - recuo * 2, CONTEUDO)
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
  // tamanho de cada pixel do sprite: no celular a margem tem só 20-32px
  return { trechos, largura, escala: largura >= LARGO ? 4 : 2 }
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
 * que desce o site acompanhando a rolagem. Em telas estreitas fica menor.
 */
export default function Climber() {
  const camada = useRef(null)
  const boneco = useRef(null)
  const mapa = useRef(null)
  const [escadas, setEscadas] = useState([])
  const [escala, setEscala] = useState(4)
  const [quadro, setQuadro] = useState({ nome: 'parado', virado: false })

  useEffect(() => {
    const main = camada.current?.parentElement
    if (!main) return
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)')

    const remedir = () => {
      const m = medir(main)
      if (m.trechos.length === 0) return
      mapa.current = m
      setEscala(m.escala)
      setEscadas(
        m.trechos.slice(0, -1).map((t, i) => ({ x: t.ate, de: t.y, ate: m.trechos[i + 1].y })),
      )
    }

    const ro = new ResizeObserver(remedir)
    ro.observe(main)
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
      if (!m || !boneco.current) return

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

      boneco.current.style.transform = `translate3d(${atual.x - 8 * m.escala}px, ${atual.y - 20 * m.escala}px, 0)`

      if (alvo.modo === 'festa') quadro('festa', false)
      else if (alvo.modo === 'sobe')
        quadro(Math.floor(atual.y / (5.5 * m.escala)) % 2 ? 'sobeA' : 'sobeB', false)
      else if (alvo.modo === 'anda' && mexendo)
        quadro(
          Math.floor(atual.x / (4 * m.escala)) % 2 ? 'andaA' : 'andaB',
          dx < 0 || (dx === 0 && estado.virado),
        )
      else quadro('parado', estado.virado)
    }
    raf = requestAnimationFrame(passo)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={camada}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {escadas.map((e, i) => (
        <div
          key={i}
          className="escada absolute"
          style={{
            left: e.x - 4.5 * escala,
            top: e.de,
            height: e.ate - e.de,
            width: 9 * escala,
            borderInlineWidth: escala,
          }}
        />
      ))}
      <div ref={boneco} className="boneco absolute top-0 left-0 will-change-transform">
        <Sprite quadro={quadro.nome} virado={quadro.virado} escala={escala} />
      </div>
    </div>
  )
}

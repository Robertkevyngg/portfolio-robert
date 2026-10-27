import { useEffect, useRef } from 'react'

/** Cursor customizado: ponto que segue exato + anel com atraso (lerp). */
export default function Cursor() {
  const ponto = useRef(null)
  const anel = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const alvo = { x: innerWidth / 2, y: innerHeight / 2 }
    const suave = { ...alvo }
    let raf = 0

    // o laço só roda enquanto o anel ainda está alcançando o ponteiro
    const laco = () => {
      suave.x += (alvo.x - suave.x) * 0.16
      suave.y += (alvo.y - suave.y) * 0.16
      if (anel.current) {
        anel.current.style.transform = `translate3d(${suave.x}px, ${suave.y}px, 0)`
      }
      const parado = Math.abs(alvo.x - suave.x) < 0.1 && Math.abs(alvo.y - suave.y) < 0.1
      raf = parado ? 0 : requestAnimationFrame(laco)
    }

    const mover = (e) => {
      alvo.x = e.clientX
      alvo.y = e.clientY
      if (ponto.current) {
        ponto.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      const sobre = e.target.closest('a, button, [data-hot]')
      if (anel.current) anel.current.dataset.hot = sobre ? 'true' : 'false'
      mostrar(true)
      if (!raf) raf = requestAnimationFrame(laco)
    }

    const mostrar = (sim) => {
      if (ponto.current) ponto.current.dataset.ativo = sim
      if (anel.current) anel.current.dataset.ativo = sim
    }
    const sair = () => mostrar(false)

    window.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', sair)
    return () => {
      window.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', sair)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={anel} className="cursor-ring" aria-hidden="true" />
      <div ref={ponto} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

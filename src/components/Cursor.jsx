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
    let raf

    const mover = (e) => {
      alvo.x = e.clientX
      alvo.y = e.clientY
      if (ponto.current) {
        ponto.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      const sobre = e.target.closest('a, button, [data-hot]')
      if (anel.current) anel.current.dataset.hot = sobre ? 'true' : 'false'
    }

    const laco = () => {
      suave.x += (alvo.x - suave.x) * 0.16
      suave.y += (alvo.y - suave.y) * 0.16
      if (anel.current) {
        anel.current.style.transform = `translate3d(${suave.x}px, ${suave.y}px, 0)`
      }
      raf = requestAnimationFrame(laco)
    }

    window.addEventListener('pointermove', mover, { passive: true })
    raf = requestAnimationFrame(laco)
    return () => {
      window.removeEventListener('pointermove', mover)
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

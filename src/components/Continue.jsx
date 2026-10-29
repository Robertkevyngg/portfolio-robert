import { useEffect, useRef, useState } from 'react'

// Contagem do "CONTINUE?" de fliperama: só roda enquanto está na tela
export default function Continue() {
  const raiz = useRef(null)
  const [n, setN] = useState(9)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let id = 0
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id)
      if (e.isIntersecting) id = setInterval(() => setN((v) => (v === 0 ? 9 : v - 1)), 1000)
    })
    io.observe(raiz.current)
    return () => {
      clearInterval(id)
      io.disconnect()
    }
  }, [])

  return (
    <div ref={raiz} className="reveal text-center" aria-hidden="true">
      <p className="neon text-[clamp(1.4rem,5vw,2.6rem)]">
        Continue? <span className="tabular-nums">{n}</span>
      </p>
      <p className="pixel piscar mt-5 text-[0.6rem] text-text-2 sm:text-xs">Insira uma mensagem</p>
      {/* plataforma de chegada: o personagem termina a fase aqui */}
      <div className="relative left-1/2 mt-28 h-[18px] w-screen -translate-x-1/2">
        <div data-girder className="viga top-0!" />
      </div>
    </div>
  )
}

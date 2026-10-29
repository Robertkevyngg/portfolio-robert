import { useEffect } from 'react'
import { avisar } from '../lib/toast'

const SEQUENCIA = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/** Easter egg: o código clássico liga/desliga o "modo turbo" (personagem arco-íris). */
export function useKonami() {
  useEffect(() => {
    let pos = 0
    const aoTeclar = (e) => {
      const tecla = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = tecla === SEQUENCIA[pos] ? pos + 1 : tecla === SEQUENCIA[0] ? 1 : 0
      if (pos < SEQUENCIA.length) return
      pos = 0
      const ligado = document.documentElement.classList.toggle('turbo')
      avisar(ligado ? 'Código secreto: modo turbo ligado! +30 vidas' : 'Modo turbo desligado')
    }
    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [])
}

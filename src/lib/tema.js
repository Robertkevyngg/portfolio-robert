import { useState } from 'react'

const CHAVE = 'tema'
const aplicar = (t) => {
  const r = document.documentElement
  if (t === 'auto') r.removeAttribute('data-theme')
  else r.setAttribute('data-theme', t)
}

// o tema salvo já foi aplicado pelo script inline no <head> (sem flash);
// aqui só lemos o estado inicial do DOM, sem setState dentro de efeito
function inicial() {
  if (typeof document === 'undefined') return 'auto'
  return document.documentElement.getAttribute('data-theme') || 'auto'
}

/** Alterna entre automático, claro e escuro; lembra a escolha no navegador. */
export function useTema() {
  const [tema, setTema] = useState(inicial)

  const mudar = (t) => {
    setTema(t)
    aplicar(t)
    try {
      localStorage.setItem(CHAVE, t)
    } catch {
      /* storage bloqueado */
    }
  }

  return [tema, mudar]
}

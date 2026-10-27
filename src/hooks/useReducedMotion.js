import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function assinar(aoMudar) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', aoMudar)
  return () => mq.removeEventListener('change', aoMudar)
}

/** true quando o sistema pede menos animação. No servidor (pré-render) é sempre false. */
export function useReducedMotion() {
  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}

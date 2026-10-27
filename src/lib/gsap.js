import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registro único dos plugins. Só roda no navegador (o pré-render no Node não anima nada).
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Executa `fn` só quando o usuário não pediu menos movimento. */
export function comMovimento(fn) {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', fn)
  return mm
}

export { gsap, ScrollTrigger, useGSAP }

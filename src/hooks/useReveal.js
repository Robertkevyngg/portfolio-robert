import { useEffect } from 'react'

/** Adiciona a classe .is-in nos elementos .reveal quando entram na viewport. */
export function useReveal(deps = []) {
  useEffect(() => {
    const alvos = document.querySelectorAll('.reveal:not(.is-in)')
    if (!alvos.length) return

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    alvos.forEach((a) => io.observe(a))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

import { useEffect } from 'react'

/**
 * Adiciona a classe .is-in nos elementos .reveal quando entram na viewport.
 * Chamado uma vez no App: um MutationObserver pega os .reveal que aparecem
 * depois (ex.: cards que chegam da API do GitHub ou mudam com o filtro).
 */
export function useReveal() {
  useEffect(() => {
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

    const observarNovos = () =>
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el))

    observarNovos()
    const mo = new MutationObserver(observarNovos)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

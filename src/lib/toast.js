/** Mostra uma mensagem curta no <Toast /> (ex.: "e-mail copiado"). */
export function avisar(mensagem) {
  window.dispatchEvent(new CustomEvent('toast', { detail: mensagem }))
}

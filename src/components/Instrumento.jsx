/** Bolha de instrumento no padrão ISA 5.1: função em cima, número da malha embaixo. */
export default function Instrumento({ tag, numero, tamanho = 56, ligado, className = '', ...p }) {
  return (
    <span
      className={`instr ${className}`}
      style={{ '--s': `${tamanho}px` }}
      data-on={ligado ? 'true' : undefined}
      aria-hidden="true"
      {...p}
    >
      <span>{tag}</span>
      <span>{numero}</span>
    </span>
  )
}

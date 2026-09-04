export default function Background() {
  return (
    <div className="bg-layers" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow--cyan" />
      <div className="bg-glow bg-glow--magenta" />
      <div className="bg-beam" />
      <div className="bg-scan" />
      <div className="bg-noise" />
    </div>
  )
}

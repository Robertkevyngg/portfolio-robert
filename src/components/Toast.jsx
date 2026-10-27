import { useEffect, useState } from 'react'
import { IconCheck } from './Icons'

export default function Toast() {
  const [mensagem, setMensagem] = useState('')
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    let t
    const aoAvisar = (e) => {
      setMensagem(e.detail)
      setVisivel(true)
      clearTimeout(t)
      t = setTimeout(() => setVisivel(false), 2400)
    }
    window.addEventListener('toast', aoAvisar)
    return () => {
      window.removeEventListener('toast', aoAvisar)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="toast" data-visivel={visivel} role="status" aria-live="polite">
      {visivel && (
        <>
          <IconCheck className="text-lime" />
          {mensagem}
        </>
      )}
    </div>
  )
}

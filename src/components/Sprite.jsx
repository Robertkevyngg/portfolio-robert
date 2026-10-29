// Personagem em pixel art: cada quadro é uma grade 16×20, uma letra por pixel.
// Paleta: H cabelo · S pele · K contorno/armação · G lente · Y camisa · R detalhe · B calça · W tênis
const PALETA = {
  H: '#2b1a10',
  S: '#ebbd9b',
  K: '#1a1033',
  G: '#a8e4ff',
  Y: '#17171d',
  R: '#ff4f9a',
  B: '#22306b',
  W: '#f4f1ff',
}

const tronco = [
  '....HHHHHH......',
  '...HHHHHHHH.....',
  '...HHHHHHHHH....',
  '...HHHSSKKKK....',
  '...HHSKKKGGKS...',
  '....HSSSSKKKSS..',
  '.....SSSSSS.....',
  '......SSS.......',
  '....YYYYYYY.....',
  '...YYYYYYYYY....',
  '...YYYYYYYYYS...',
  '...YYYRYYYYSS...',
  '...YYYYYYYY.....',
  '....BBBBBBB.....',
]

const sobeA = [
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....HHHHHHHH....',
  '....HHHHHHHH....',
  '..S..HHHHHH.....',
  '..S...SSSS......',
  '..YY.YYYYYY.....',
  '...YYYYYYYYY....',
  '....YYYYYYYYYY..',
  '....YYYYYYYY.YS.',
  '....YYYYYYYY..S.',
  '....YYYYYYYY....',
  '....BBBBBBBB....',
  '....BBB..BBB....',
  '....BBB..BBB....',
  '....BBB..WWW....',
  '....BBB.........',
  '....WWW.........',
  '................',
]

const QUADROS = {
  parado: [
    ...tronco,
    '....BBBBBBB.....',
    '....BBB.BBB.....',
    '....BBB.BBB.....',
    '....BBB.BBB.....',
    '....WWW.WWWW....',
    '...WWWW.WWWW....',
  ],
  andaA: [
    ...tronco,
    '...BBBB.BBBB....',
    '..BBB.....BBB...',
    '.BBB.......BBB..',
    '.BBB.......BBB..',
    '.WWW.......WWWW.',
    'WWWW.......WWWW.',
  ],
  andaB: [
    ...tronco,
    '....BBBBBBB.....',
    '.....BBBBB......',
    '.....BBBBB......',
    '.....BBBBB......',
    '.....WWWWWW.....',
    '....WWWWWWW.....',
  ],
  sobeA,
  // de costas a escalada é simétrica: o segundo quadro é o primeiro espelhado
  sobeB: sobeA.map((l) => [...l].reverse().join('')),
  festa: [
    '..S..........S..',
    '..S..HHHHHH..S..',
    '..YYHHHHHHHHYY..',
    '...YHSSSSSSHY...',
    '...YHKGKKGKHY...',
    '...YYSSSSSSYY...',
    '....YSSKKSSY....',
    '.....YSSSSY.....',
    '....YYYYYYYY....',
    '....YYYYYYYY....',
    '....YYYRRYYY....',
    '....YYYYYYYY....',
    '....YYYYYYYY....',
    '....BBBBBBBB....',
    '....BBB..BBB....',
    '....BBB..BBB....',
    '....BBB..BBB....',
    '....BBB..BBB....',
    '...WWWW..WWWW...',
    '................',
  ],
}

// junta pixels vizinhos da mesma cor num retângulo só (bem menos nós no SVG)
function retangulos(linhas) {
  const rects = []
  linhas.forEach((linha, y) => {
    let x = 0
    while (x < linha.length) {
      const c = linha[x]
      let fim = x
      while (linha[fim + 1] === c) fim++
      if (PALETA[c]) rects.push({ x, y, w: fim - x + 1, cor: PALETA[c] })
      x = fim + 1
    }
  })
  return rects
}

const CACHE = Object.fromEntries(Object.entries(QUADROS).map(([k, v]) => [k, retangulos(v)]))

/** Desenha um quadro do personagem. `escala` = tamanho de cada pixel em px. */
export default function Sprite({ quadro = 'parado', escala = 3, virado = false, className = '' }) {
  return (
    <svg
      width={16 * escala}
      height={20 * escala}
      viewBox="0 0 16 20"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={virado ? { transform: 'scaleX(-1)' } : undefined}
    >
      {CACHE[quadro].map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.cor} />
      ))}
    </svg>
  )
}

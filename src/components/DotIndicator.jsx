// DotIndicator — Figma node 11545:1542
// Sizes: A=active pill (w:12,h:6), L=6px circle, M=4px circle, S=2px circle
const A = 'active'
const L = 6
const M = 4
const S = 2

const PATTERNS = {
  '2': {
    1: [A, M],
    2: [M, A],
  },
  '3': {
    1: [A, M, S],
    2: [M, A, M],
    3: [S, M, A],
  },
  '4': {
    1: [A, L, M, S],
    2: [L, A, M, S],
    3: [S, M, A, M],
    4: [S, M, L, A],
  },
  '5+': {
    1: [A, L, L, M, S],
    2: [L, A, L, M, S],
    3: [S, M, A, M, S],
    4: [S, S, M, A, M],
    5: [S, M, L, L, A],
  },
}

export function DotIndicator({ count = '5+', current = 1 }) {
  const countKey = ['2', '3', '4', '5+'].includes(String(count)) ? String(count) : '5+'
  const maxCurrent = countKey === '5+' ? 5 : parseInt(countKey, 10)
  const cur = Math.min(Math.max(parseInt(current, 10), 1), maxCurrent)
  const pattern = PATTERNS[countKey]?.[cur] ?? PATTERNS['5+'][1]

  return (
    <div
      data-inspect="DotIndicator"
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            'var(--spacing-100)',
        justifyContent: 'center',
      }}
    >
      {pattern.map((size, i) => {
        const isActive = size === A
        return (
          <div
            key={i}
            style={{
              width:           isActive ? '12px' : `${size}px`,
              height:          isActive ? '6px'  : `${size}px`,
              borderRadius:    '9999px',
              backgroundColor: 'var(--text-icon-strong)',
              flexShrink:      0,
              transition:      'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )
      })}
    </div>
  )
}

DotIndicator.counts   = ['2', '3', '4', '5+']
DotIndicator.currents = ['1', '2', '3', '4', '5']

// TemperatureDisplay — Figma node 2094:33358
// type: 'ICED' | 'ICED ONLY' | 'HOT' | 'HOT ONLY'

export function TemperatureDisplay({ type = 'ICED' }) {
  const isHot   = type === 'HOT' || type === 'HOT ONLY'
  const color   = isHot ? 'var(--text-icon-error)' : 'var(--text-icon-info)'

  return (
    <span
      data-inspect="TemperatureDisplay"
      style={{
        fontFamily:    'var(--font-family)',
        fontSize:      '14px',
        fontWeight:    500,
        lineHeight:    1.35,
        letterSpacing: '-0.25px',
        color,
        whiteSpace:    'nowrap',
      }}
    >
      {type}
    </span>
  )
}

TemperatureDisplay.types = ['ICED', 'ICED ONLY', 'HOT', 'HOT ONLY']

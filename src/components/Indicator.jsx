// Indicator — Figma node 10097:10664
export function Indicator({ current = 1, total = 5 }) {
  return (
    <div
      data-inspect="Indicator"
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        height:          '24px',
        padding:         '0 12px',
        borderRadius:    '9999px',
        backgroundColor: 'var(--dimmer-normal)',
        boxSizing:       'border-box',
        flexShrink:      0,
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-family)',
          fontSize:      '13px',
          fontWeight:    500,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         'var(--static-white)',
          whiteSpace:    'nowrap',
        }}
      >
        {current}/{total}
      </span>
    </div>
  )
}

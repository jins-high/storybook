// MembershipChip — 모바일오더 라이브러리 / Figma node 1116:16160
// 메인페이지 멤버십 영역 전용 Chip
// Props: icon, text, number, numberMax, max

export function MembershipChip({
  icon       = null,
  text       = '텍스트',
  number     = '8',
  numberMax  = true,
  max        = '10',
}) {
  return (
    <div
      data-inspect="MembershipChip"
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             'var(--spacing-200)',
        padding:         'var(--spacing-300) var(--spacing-400)',
        borderRadius:    'var(--radius-default-circle)',
        backgroundColor: 'var(--surface-base)',
        boxShadow:       '0px 4px 4px rgba(0,0,0,0.04)',
        flexShrink:      0,
      }}
    >
      {/* Leading icon slot */}
      {icon && (
        <span style={{ flexShrink: 0, display: 'flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </span>
      )}

      {/* Label text */}
      <span style={{
        fontSize:      '14px',
        fontWeight:    400,
        lineHeight:    1.35,
        letterSpacing: '-0.25px',
        color:         'var(--text-icon-normal)',
        whiteSpace:    'nowrap',
      }}>
        {text}
      </span>

      {/* Number area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-100)', flexShrink: 0 }}>
        <span style={{
          fontSize:      '14px',
          fontWeight:    700,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         'var(--text-icon-normal)',
          whiteSpace:    'nowrap',
        }}>
          {number}
        </span>
        {numberMax && (
          <>
            <span style={{
              fontSize:      '14px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-assistive)',
              whiteSpace:    'nowrap',
            }}>
              /
            </span>
            <span style={{
              fontSize:      '14px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-assistive)',
              whiteSpace:    'nowrap',
            }}>
              {max}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

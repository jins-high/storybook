// StoreMarker — Figma node 4426:69468
// 지도에 표시되는 매장 마커 (Default / Selected)

const textBase = {
  fontFamily:    'var(--font-family)',
  lineHeight:    1.35,
  letterSpacing: '-0.25px',
}

function StoreIcon({ color }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1L1 4.5V11H4.5V7.5H7.5V11H11V4.5L6 1Z"
        fill={color}
      />
    </svg>
  )
}

export function StoreMarker({
  state               = 'Default',   // 'Default' | 'Selected'
  storeName           = '신사점',
  hasTakeoutOnly      = false,       // 포장전용 뱃지
  hasDineInUnavailable = false,      // 매장이용불가 뱃지
}) {
  const isSelected = state === 'Selected'
  const pillBg    = isSelected ? 'var(--surface-primary-solid)' : 'var(--surface-base)'
  const pinBg     = isSelected ? 'var(--surface-heavy-solid)' : 'var(--surface-primary-solid)'
  const iconColor = isSelected ? 'var(--surface-primary-solid)' : 'var(--surface-heavy-solid)'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        data-inspect="StoreMarker"
        style={{
          position:        'relative',
          display:         'inline-flex',
          alignItems:      'center',
          gap:             'var(--spacing-100)',
          padding:         'var(--spacing-200)',
          borderRadius:    'var(--radius-default-300)',
          backgroundColor: pillBg,
          filter:          'drop-shadow(0px 1px 1px rgba(0,0,0,0.2))',
        }}
      >
        {/* 말풍선 꼬리 (하단 중앙) */}
        <div style={{
          position:    'absolute',
          bottom:      -8,
          left:        '50%',
          transform:   'translateX(-50%)',
          width:       0,
          height:      0,
          borderLeft:  '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop:   `8px solid ${pillBg}`,
        }} />

        {/* 핀 아이콘 */}
        <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
          <div style={{
            width:           20,
            height:          20,
            borderRadius:    '9999px',
            backgroundColor: pinBg,
          }} />
          <div style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            <StoreIcon color={iconColor} />
          </div>
        </div>

        {/* 매장명 */}
        <span style={{ ...textBase, fontSize: 14, fontWeight: 700, color: 'var(--text-icon-strong)', whiteSpace: 'nowrap' }}>
          {storeName}
        </span>

        {/* 포장전용 뱃지 */}
        {hasTakeoutOnly && (
          <div style={{
            height:          18,
            padding:         '0 var(--spacing-200)',
            borderRadius:    '9999px',
            backgroundColor: 'var(--surface-success-subtle)',
            display:         'flex',
            alignItems:      'center',
            flexShrink:      0,
          }}>
            <span style={{ ...textBase, fontSize: 11, fontWeight: 500, color: 'var(--text-icon-success)', whiteSpace: 'nowrap' }}>
              포장전용
            </span>
          </div>
        )}

        {/* 매장이용불가 뱃지 */}
        {hasDineInUnavailable && (
          <div style={{
            height:          18,
            padding:         '0 var(--spacing-200)',
            borderRadius:    '9999px',
            backgroundColor: 'var(--surface-error-subtle)',
            display:         'flex',
            alignItems:      'center',
            flexShrink:      0,
          }}>
            <span style={{ ...textBase, fontSize: 11, fontWeight: 500, color: 'var(--text-icon-error)', whiteSpace: 'nowrap' }}>
              매장이용불가
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

StoreMarker.states = ['Default', 'Selected']

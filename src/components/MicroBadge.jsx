// MicroBadge — 모바일오더 라이브러리 / Figma node 1688:25019
// Props: style, size, label
// Note: GreenSolid/RedSolid/VioletSolid는 Figma 고정 카테고리 색상 (semantic token 없음)

const STYLE_MAP = {
  YellowSolid:    { bg: 'var(--surface-primary-solid)', text: 'var(--text-icon-strong)',   border: null },
  BlackSolid:     { bg: 'var(--surface-heavy-solid)',   text: 'var(--text-icon-base)',      border: null },
  GreenSolid:     { bg: '#12dd19',                      text: 'var(--text-icon-strong)',   border: null },
  RedSolid:       { bg: '#ed1826',                      text: 'var(--text-icon-base)',      border: null },
  VioletSolid:    { bg: '#6a00ff',                      text: 'var(--text-icon-base)',      border: null },
  BlackLine:      { bg: 'transparent',                  text: 'var(--text-icon-normal)',    border: '1px solid var(--border-heavy)' },
  GarySolid:      { bg: 'var(--surface-normal-subtle)', text: 'var(--text-icon-normal)',    border: null },
  LightGray:      { bg: 'var(--surface-normal-subtle)', text: 'var(--text-icon-disabled)', border: null },
  LightGarySolid: { bg: 'var(--surface-normal-subtle)', text: 'var(--text-icon-disabled)', border: null },
}

const SIZE_MAP = {
  Small:  { h: '20px', px: 'var(--spacing-200)', py: 'var(--spacing-100)', fontSize: '11px', radius: 'var(--radius-default-100)' },
  Medium: { h: '28px', px: 'var(--spacing-300)', py: 'var(--spacing-200)', fontSize: '13px', radius: 'var(--radius-default-200)' },
}

export function MicroBadge({ style = 'YellowSolid', size = 'Small', label = '텍스트' }) {
  const s = STYLE_MAP[style] ?? STYLE_MAP.YellowSolid
  const z = SIZE_MAP[size]   ?? SIZE_MAP.Small

  return (
    <div
      data-inspect="MicroBadge"
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             'var(--spacing-200)',
        height:          z.h,
        padding:         `${z.py} ${z.px}`,
        borderRadius:    z.radius,
        backgroundColor: s.bg,
        border:          s.border ?? 'none',
        flexShrink:      0,
      }}
    >
      <span style={{
        fontSize:      z.fontSize,
        fontWeight:    500,
        lineHeight:    1.35,
        letterSpacing: '-0.25px',
        color:         s.text,
        whiteSpace:    'nowrap',
      }}>
        {label}
      </span>
    </div>
  )
}

MicroBadge.styles = ['YellowSolid', 'GreenSolid', 'VioletSolid', 'RedSolid', 'BlackSolid', 'BlackLine', 'GarySolid', 'LightGray', 'LightGarySolid']
MicroBadge.sizes  = ['Small', 'Medium']

// CouponList — Figma node 2526:16495
import { Checkbox } from './Checkbox.jsx'

const t = (size, weight, color, extra = {}) => ({
  fontFamily: 'var(--font-family)',
  fontSize: `${size}px`,
  fontWeight: weight,
  lineHeight: 1.35,
  letterSpacing: '-0.25px',
  color,
  ...extra,
})

function Badge({ available }) {
  return (
    <span style={{
      display:         'inline-flex',
      alignItems:      'center',
      height:          '20px',
      padding:         '0 4px',
      borderRadius:    'var(--radius-default-100)',
      backgroundColor: available ? 'var(--surface-heavy-solid)' : 'var(--surface-normal-subtle)',
      fontFamily:      'var(--font-family)',
      fontSize:        '11px',
      fontWeight:      500,
      lineHeight:      1,
      letterSpacing:   '-0.25px',
      color:           available ? 'var(--text-icon-base)' : 'var(--text-icon-disabled)',
      flexShrink:      0,
      whiteSpace:      'nowrap',
    }}>
      {available ? '사용가능' : '사용완료'}
    </span>
  )
}

function DashDivider() {
  return (
    <div style={{
      position: 'absolute',
      bottom:   '39px',
      left:     '-1px',
      right:    '-1px',
      height:   '24px',
    }}>
      {/* Left semicircle notch */}
      <div style={{
        position:        'absolute',
        left:            '-12px',
        top:             '0',
        width:           '24px',
        height:          '24px',
        borderRadius:    '9999px',
        backgroundColor: 'var(--surface-base)',
        border:          '1px solid var(--border-light)',
        zIndex:          1,
      }} />

      {/* Right semicircle notch */}
      <div style={{
        position:        'absolute',
        right:           '-12px',
        top:             '0',
        width:           '24px',
        height:          '24px',
        borderRadius:    '9999px',
        backgroundColor: 'var(--surface-base)',
        border:          '1px solid var(--border-light)',
        zIndex:          1,
      }} />

      {/* Dashed line center */}
      <div style={{
        position:  'absolute',
        left:      '12px',
        right:     '12px',
        top:       '50%',
        transform: 'translateY(-50%)',
        borderTop: '1px dashed var(--border-light)',
      }} />
    </div>
  )
}

export function CouponList({
  displayType  = 'ListAvailable',
  value        = '4,000원 할인',
  couponName   = '영상류 단품 쿠폰',
  date         = '2024.11.01 ~ 2025.10.30',
  checked      = false,
  onCheckedChange,
}) {
  const isAvailable   = displayType === 'ListAvailable' || displayType === 'PurchaseUnselected' || displayType === 'PurchaseSelected'
  const isPurchase    = displayType === 'PurchaseUnselected' || displayType === 'PurchaseSelected'
  const isListAvail   = displayType === 'ListAvailable'

  const valueColor   = isAvailable ? 'var(--text-icon-normal)' : 'var(--text-icon-disabled)'
  const nameColor    = isAvailable ? 'var(--text-icon-normal)' : 'var(--text-icon-disabled)'
  const dateColor    = isAvailable ? 'var(--text-icon-assistive)' : 'var(--text-icon-disabled)'

  const checkState   = displayType === 'PurchaseSelected' ? 'Checked' : 'Unchecked'

  return (
    <div
      data-inspect="CouponList"
      style={{
        position:        'relative',
        width:           '327px',
        overflow:        'hidden',
        backgroundColor: 'var(--surface-base)',
        border:          '1px solid var(--border-light)',
        borderRadius:    'var(--radius-default-400)',
        padding:         'var(--spacing-500)',
        display:         'flex',
        flexDirection:   'column',
        gap:             'var(--spacing-800)',
        boxSizing:       'border-box',
      }}
    >
      {/* ── Top area ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)' }}>

        {/* Row 1: value + badge + (detail button | checkbox) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-300)' }}>

          {/* Left: value + badge */}
          <div style={{ flex: '1 0 0', display: 'flex', alignItems: 'center', gap: 'var(--spacing-300)', minWidth: 0 }}>
            <span style={t(24, 700, valueColor, {
              lineHeight:    1.15,
              letterSpacing: '-0.5px',
              whiteSpace:    'nowrap',
            })}>
              {value}
            </span>
            <Badge available={isAvailable} />
          </div>

          {/* Right: 상세보기 button (ListAvailable) | Checkbox (Purchase) */}
          {isListAvail && (
            <button style={{
              height:          '32px',
              padding:         '0 12px',
              borderRadius:    'var(--radius-default-300)',
              border:          '1px solid var(--border-light)',
              backgroundColor: 'transparent',
              cursor:          'pointer',
              fontFamily:      'var(--font-family)',
              fontSize:        '14px',
              fontWeight:      500,
              letterSpacing:   '-0.25px',
              color:           'var(--text-icon-primary)',
              whiteSpace:      'nowrap',
              flexShrink:      0,
            }}>
              상세보기
            </button>
          )}
          {isPurchase && (
            <div style={{ flexShrink: 0 }}>
              <Checkbox
                state={checkState}
                size="Medium"
                style="Default"
                onChange={() => onCheckedChange?.(!checked)}
              />
            </div>
          )}
        </div>

        {/* Row 2: coupon name */}
        <span style={t(16, 500, nameColor)}>
          {couponName}
        </span>
      </div>

      {/* ── Date ── */}
      <span style={t(15, 400, dateColor)}>
        {date}
      </span>

      {/* ── Ticket notch divider ── */}
      <DashDivider />
    </div>
  )
}

CouponList.displayTypes = ['ListAvailable', 'ListUnavailable', 'PurchaseUnselected', 'PurchaseSelected']

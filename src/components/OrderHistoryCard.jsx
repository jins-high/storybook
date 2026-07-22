/**
 * OrderHistoryCard Component — 컴포즈커피
 * Figma: node 21:1693  (symbol "orderHistoryCard")
 *
 * 마지막 주문 이력을 보여주는 카드
 *
 * Props:
 *   menuName  — 메뉴명 (기본: '돌체 세레나데')
 *   storeName — 매장명 (기본: '에이스하이테크시티점')
 *   icon      — 위치 아이콘 (ReactNode, swap 가능 / null 시 기본 LocationIcon)
 *   image     — 메뉴 이미지 (ReactNode, swap 가능 / null 시 기본 americano)
 *
 * Tokens:
 *   background : --surface-normal-subtle
 *   text       : --text-icon-normal
 *   button     : Button primary / outline / sm
 */

import { Button } from './Button.jsx'

// ── Default location icon (20 × 20, colorable via fill prop) ──
function LocationIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z"
        fill={color}
      />
      <circle cx="10" cy="7" r="2.1" fill="var(--surface-normal-subtle)" />
    </svg>
  )
}

// ── Default product image ──────────────────────────────────────
function DefaultImage({ alt }) {
  return (
    <img
      src="/assets/orderHistory/americono.png"
      alt={alt}
      draggable={false}
      style={{
        width:         '87.5px',
        height:        '140px',
        objectFit:     'cover',
        flexShrink:    0,
        pointerEvents: 'none',
        display:       'block',
      }}
    />
  )
}

// ── Component ──────────────────────────────────────────────────
export function OrderHistoryCard({
  menuName  = '돌체 세레나데',
  storeName = '에이스하이테크시티점',
  icon      = null,
  image     = null,
}) {
  const locationIcon   = icon  ?? <LocationIcon color="var(--text-icon-normal)" />
  const productImage   = image ?? <DefaultImage alt={menuName} />

  return (
    <div
      data-inspect="OrderHistoryCard"
      style={{
        display:         'flex',
        gap:             'var(--spacing-300)',
        width:           '280px',
        height:          '120px',
        alignItems:      'flex-end',
        justifyContent:  'flex-end',
        padding:         'var(--spacing-400)',
        borderRadius:    'var(--radius-default-300)',
        backgroundColor: 'var(--surface-normal-subtle)',
        boxSizing:       'border-box',
        overflow:        'hidden',
        position:        'relative',
      }}
    >
      {/* Left: text + button — full height, space-between */}
      <div style={{
        flex:           1,
        display:        'flex',
        flexDirection:  'column',
        height:         '100%',
        alignItems:     'flex-start',
        justifyContent: 'space-between',
        minWidth:       0,
      }}>
        {/* Top group: menu name + store name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <div style={{
            fontSize:     '16px',
            fontWeight:   500,
            lineHeight:   1.35,
            letterSpacing:'-0.25px',
            color:        'var(--text-icon-normal)',
            fontFamily:   'var(--font-family)',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
            width:        '100%',
          }}>
            {menuName}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-200)', width: '100%' }}>
            {locationIcon}
            <span style={{
              flex:          '1 0 0',
              fontSize:      '15px',
              fontWeight:    400,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-normal)',
              fontFamily:    'var(--font-family)',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              whiteSpace:    'nowrap',
              minWidth:      0,
            }}>
              {storeName}
            </span>
          </div>
        </div>

        {/* Button: primary / outline / sm */}
        <Button
          color="primary"
          variant="outline"
          size="sm"
          label="주문하기"
        />
      </div>

      {/* Right: product image (140px tall, overflows card top intentionally) */}
      {productImage}
    </div>
  )
}

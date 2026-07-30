// OrderHistoryList — Figma node 2409:13984
import { OrderStateDisplay } from './OrderStateDisplay.jsx'

const BASE = import.meta.env.BASE_URL

const text = (size, weight, color, extra = {}) => ({
  fontFamily: 'var(--font-family)',
  fontSize: `${size}px`,
  fontWeight: weight,
  lineHeight: 1.35,
  letterSpacing: '-0.25px',
  color,
  ...extra,
})

const Divider = () => (
  <div style={{ width: '1px', height: '8px', backgroundColor: 'var(--border-normal)', flexShrink: 0 }} />
)

export function OrderHistoryList({
  imageSrc    = 'bigpose-americano-decaf-yabangcha.png',
  productName = '아메리카노',
  orderState  = '접수대기',
  storeName   = '문래점',
  price       = '13,500원',
  date        = '2026.11.18 13:12',
  onDetail,
  onReorder,
}) {
  return (
    <div
      data-inspect="OrderHistoryList"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-400)', width: '327px' }}
    >
      {/* ── 상단: 이미지 + 정보 ── */}
      <div style={{ display: 'flex', gap: 'var(--spacing-400)', alignItems: 'flex-start' }}>

        {/* 상품 이미지 64×64 */}
        <div style={{
          width:                  '64px',
          height:                 '64px',
          flexShrink:             0,
          overflow:               'hidden',
          backgroundColor:        'var(--surface-primary-subtle)',
          borderTopLeftRadius:    'var(--radius-default-300)',
          borderTopRightRadius:   'var(--radius-default-100)',
          borderBottomRightRadius:'var(--radius-default-300)',
          borderBottomLeftRadius: 'var(--radius-default-100)',
        }}>
          <img
            src={BASE + 'assets/product/' + imageSrc}
            alt={productName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* 정보 영역 */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-300)', minWidth: 0 }}>

          {/* 상품명 + 상태·매장·가격 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-100)' }}>
            <span style={text(18, 500, 'var(--text-icon-normal)')}>
              {productName}
            </span>

            {/* 주문상태 · 매장 · 가격 한 줄 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-200)' }}>
              <OrderStateDisplay type={orderState} />
              <Divider />
              <span style={text(15, 400, 'var(--text-icon-normal)', { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' })}>
                {storeName}
              </span>
              <Divider />
              <span style={text(15, 400, 'var(--text-icon-normal)', { whiteSpace: 'nowrap', flexShrink: 0 })}>
                {price}
              </span>
            </div>
          </div>

          {/* 날짜 */}
          <span style={text(15, 400, 'var(--text-icon-assistive)', { whiteSpace: 'nowrap' })}>
            {date}
          </span>
        </div>
      </div>

      {/* ── 하단: 버튼 2개 ── */}
      <div style={{ display: 'flex', gap: 'var(--spacing-300)' }}>

        {/* 주문 내역 버튼 */}
        <button
          onClick={onDetail}
          style={{
            flex:            '1 0 0',
            height:          '48px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            border:          '1px solid var(--border-light)',
            borderRadius:    'var(--radius-default-400)',
            backgroundColor: 'transparent',
            cursor:          'pointer',
            fontFamily:      'var(--font-family)',
            fontSize:        '16px',
            fontWeight:      500,
            color:           'var(--text-icon-alternative)',
            letterSpacing:   '-0.25px',
            whiteSpace:      'nowrap',
          }}
        >
          주문 내역
        </button>

        {/* 재주문 버튼 */}
        <button
          onClick={onReorder}
          style={{
            flex:            '1 0 0',
            height:          '48px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            border:          'none',
            borderRadius:    'var(--radius-default-400)',
            backgroundColor: 'var(--surface-primary-solid)',
            cursor:          'pointer',
            fontFamily:      'var(--font-family)',
            fontSize:        '16px',
            fontWeight:      500,
            color:           'var(--text-icon-base)',
            letterSpacing:   '-0.25px',
            whiteSpace:      'nowrap',
          }}
        >
          재주문
        </button>
      </div>
    </div>
  )
}

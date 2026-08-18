// GiftCoupon — Figma node 2858:24073
import { Checkbox } from './Checkbox.jsx'

const BASE = import.meta.env.BASE_URL

const GIFT_CARD_IMAGES = [
  'gift-card-5000.png',
  'gift-card-10000.png',
  'gift-card-20000.png',
  'gift-card-30000.png',
  'gift-card-50000.png',
]

export function GiftCoupon({
  display         = 'ListAvailable',
  couponName      = '빅포즈 아이스 아메리카노',
  couponInfo      = '2026.11.18까지',
  senderName      = '고윤정',
  description     = true,
  descriptionText = '사용가능 금액 4,000원',
  dImmed          = false,
  giftCardSrc     = 'gift-card-5000.png',
}) {
  const isListAvail   = display === 'ListAvailable'
  const isListUnavail = display === 'ListUnavailable'
  const isList        = isListAvail || isListUnavail
  const isPurchaseDef = display === 'PurchaseDefault'
  const isPurchaseDis = display === 'PurchaseDisabled'

  const cardBase = {
    position:        'relative',
    width:           '327px',
    backgroundColor: 'var(--surface-base)',
    border:          '1px solid var(--border-light)',
    borderRadius:    'var(--radius-default-400)',
    boxSizing:       'border-box',
  }

  // ── List states ──────────────────────────────────────────
  if (isList) {
    const senderLabel = isListUnavail
      ? `사용완료 ⋅ ${senderName}님이 보낸 선물`
      : `${senderName}님이 보낸 선물`

    return (
      <div
        data-inspect="GiftCoupon"
        style={{
          ...cardBase,
          display:       'flex',
          flexDirection: 'column',
          gap:           'var(--spacing-300)',
          padding:       'var(--spacing-500)',
        }}
      >
        {/* Row: sender info + 상세보기 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-300)' }}>
          <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '15px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         isListUnavail ? 'var(--text-icon-assistive)' : 'var(--text-icon-primary)',
            }}>
              {senderLabel}
            </span>
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '18px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         isListUnavail ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)',
            }}>
              {couponName}
            </span>
          </div>
          <button style={{
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            height:          '32px',
            padding:         '0 var(--spacing-400)',
            borderRadius:    'var(--radius-default-300)',
            border:          '1px solid var(--border-light)',
            backgroundColor: 'transparent',
            cursor:          'pointer',
            fontFamily:      'var(--font-family)',
            fontSize:        '14px',
            fontWeight:      500,
            lineHeight:      1.35,
            letterSpacing:   '-0.25px',
            color:           'var(--text-icon-alternative)',
            flexShrink:      0,
            whiteSpace:      'nowrap',
          }}>
            상세보기
          </button>
        </div>

        {/* Description (ListAvailable only) */}
        {isListAvail && (
          <span style={{
            fontFamily:    'var(--font-family)',
            fontSize:      '14px',
            fontWeight:    400,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         'var(--text-icon-normal)',
          }}>
            받은 선물은 자동으로 모바일 상품권에 등록됐어요.
          </span>
        )}

        {/* Date */}
        <span style={{
          fontFamily:    'var(--font-family)',
          fontSize:      '14px',
          fontWeight:    400,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         isListUnavail ? 'var(--text-icon-disabled)' : 'var(--text-icon-assistive)',
          whiteSpace:    'nowrap',
        }}>
          {couponInfo}
        </span>
      </div>
    )
  }

  // ── Purchase states ──────────────────────────────────────
  const textColor = isPurchaseDis ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)'
  const dateColor = isPurchaseDef ? 'var(--text-icon-assistive)' : 'var(--text-icon-disabled)'

  return (
    <div
      data-inspect="GiftCoupon"
      style={{
        ...cardBase,
        display:  'flex',
        height:   '128px',
        overflow: 'hidden',
      }}
    >
      {/* Left: text info */}
      <div style={{
        flex:           '1 0 0',
        minWidth:       0,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        padding:        'var(--spacing-500)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-100)' }}>
          <span style={{
            fontFamily:    'var(--font-family)',
            fontSize:      '16px',
            fontWeight:    500,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         textColor,
          }}>
            {couponName}
          </span>
          {description && (
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '14px',
              fontWeight:    400,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         textColor,
            }}>
              {descriptionText}
            </span>
          )}
        </div>
        <span style={{
          fontFamily:    'var(--font-family)',
          fontSize:      '14px',
          fontWeight:    400,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         dateColor,
        }}>
          {couponInfo}
        </span>
      </div>

      {/* Right: gift card image + checkbox */}
      <div style={{
        position:        'relative',
        aspectRatio:     '1 / 1',
        height:          '100%',
        backgroundColor: 'var(--surface-light-subtle)',
        flexShrink:      0,
        padding:         'var(--spacing-500)',
        overflow:        'hidden',
        boxSizing:       'border-box',
      }}>
        {/* Gift card image */}
        <div style={{
          width:        '100%',
          height:       '100%',
          borderRadius: 'var(--radius-default-300)',
          overflow:     'hidden',
        }}>
          <img
            src={BASE + 'assets/product/' + giftCardSrc}
            alt={couponName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Checkbox */}
        <div style={{
          position:   'absolute',
          top:        '8px',
          right:      '8px',
          padding:    '2px',
          display:    'flex',
          alignItems: 'center',
        }}>
          {isPurchaseDef ? (
            <Checkbox state="Checked" size="Medium" style="Default" />
          ) : (
            <div style={{
              width:           '20px',
              height:          '20px',
              borderRadius:    'var(--radius-default-100)',
              border:          '1.5px solid var(--border-light)',
              backgroundColor: 'var(--surface-normal-subtle)',
              boxSizing:       'border-box',
            }} />
          )}
        </div>

        {/* Dimmed overlay (PurchaseDisabled + dImmed) */}
        {isPurchaseDis && dImmed && (
          <div style={{
            position:        'absolute',
            inset:           0,
            backgroundColor: 'var(--dimmer-normal)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}>
            <div style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '16px',
              fontWeight:    700,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-base)',
              textAlign:     'center',
            }}>
              <div>테이크아웃</div>
              <div>전용</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

GiftCoupon.displayTypes   = ['ListAvailable', 'ListUnavailable', 'PurchaseDefault', 'PurchaseDisabled']
GiftCoupon.giftCardImages = GIFT_CARD_IMAGES

// ReorderCard — Figma node 2728:19996
// 홈 화면 최근 주문 재주문 카드
import { IconChevronRight } from '../icons/icons.jsx'

const BASE = import.meta.env.BASE_URL

// 배경 도트 패턴 (48×48, Figma bg-pattern 근사)
const BG_PATTERN = `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f0ede8' fill-rule='evenodd'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3Ccircle cx='12' cy='4' r='1.5'/%3E%3Ccircle cx='20' cy='4' r='1.5'/%3E%3Ccircle cx='28' cy='4' r='1.5'/%3E%3Ccircle cx='36' cy='4' r='1.5'/%3E%3Ccircle cx='44' cy='4' r='1.5'/%3E%3Ccircle cx='4' cy='12' r='1.5'/%3E%3Ccircle cx='12' cy='12' r='1.5'/%3E%3Ccircle cx='20' cy='12' r='1.5'/%3E%3Ccircle cx='28' cy='12' r='1.5'/%3E%3Ccircle cx='36' cy='12' r='1.5'/%3E%3Ccircle cx='44' cy='12' r='1.5'/%3E%3Ccircle cx='4' cy='20' r='1.5'/%3E%3Ccircle cx='12' cy='20' r='1.5'/%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3Ccircle cx='28' cy='20' r='1.5'/%3E%3Ccircle cx='36' cy='20' r='1.5'/%3E%3Ccircle cx='44' cy='20' r='1.5'/%3E%3Ccircle cx='4' cy='28' r='1.5'/%3E%3Ccircle cx='12' cy='28' r='1.5'/%3E%3Ccircle cx='20' cy='28' r='1.5'/%3E%3Ccircle cx='28' cy='28' r='1.5'/%3E%3Ccircle cx='36' cy='28' r='1.5'/%3E%3Ccircle cx='44' cy='28' r='1.5'/%3E%3Ccircle cx='4' cy='36' r='1.5'/%3E%3Ccircle cx='12' cy='36' r='1.5'/%3E%3Ccircle cx='20' cy='36' r='1.5'/%3E%3Ccircle cx='28' cy='36' r='1.5'/%3E%3Ccircle cx='36' cy='36' r='1.5'/%3E%3Ccircle cx='44' cy='36' r='1.5'/%3E%3Ccircle cx='4' cy='44' r='1.5'/%3E%3Ccircle cx='12' cy='44' r='1.5'/%3E%3Ccircle cx='20' cy='44' r='1.5'/%3E%3Ccircle cx='28' cy='44' r='1.5'/%3E%3Ccircle cx='36' cy='44' r='1.5'/%3E%3Ccircle cx='44' cy='44' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`

export function ReorderCard({
  status      = 'Default',
  productName = '리얼 초코 자바칩 프라푸치노',
  storeName   = '문래SK v1점',
  imageSrc    = 'green-tea-frappe.png',
  onClick,
}) {
  const isDefault = status === 'Default'
  const isEmpty   = status === 'Empty'

  const containerStyle = {
    width:        '327px',
    borderRadius: 'var(--radius-default-300)',
    border:       `1px ${isEmpty ? 'dashed' : 'solid'} var(--border-light)`,
    backgroundColor: isEmpty ? 'var(--surface-light-subtle)' : 'var(--surface-base)',
    overflow:     'hidden',
    cursor:       onClick ? 'pointer' : 'default',
  }

  return (
    <div data-inspect="ReorderCard" style={containerStyle} onClick={onClick}>

      {/* ── Default: 최근 주문 표시 ── */}
      {isDefault && (
        <div style={{
          display:     'flex',
          alignItems:  'center',
          gap:         'var(--spacing-300)',
          padding:     'var(--spacing-400) var(--spacing-400) var(--spacing-400) var(--spacing-300)',
        }}>
          {/* 이미지 영역 (72×72) */}
          <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0 }}>
            {/* 배경 도트 패턴 (48×48, offset 12px left / 20px top) */}
            <div style={{
              position:           'absolute',
              left:               '12px',
              top:                '20px',
              width:              '48px',
              height:             '48px',
              backgroundImage:    BG_PATTERN,
              backgroundRepeat:   'no-repeat',
              backgroundSize:     '100% 100%',
            }} />
            {/* 상품 이미지 */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <img
                src={BASE + 'assets/product/' + imageSrc}
                alt={productName}
                style={{
                  position:   'absolute',
                  top:        0,
                  bottom:     0,
                  left:       '13.7%',
                  right:      '13.6%',
                  width:      'auto',
                  height:     '100%',
                  objectFit:  'cover',
                  display:    'block',
                }}
              />
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '13px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-info)',
              whiteSpace:    'nowrap',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
            }}>
              {storeName}
            </span>
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '16px',
              fontWeight:    700,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-normal)',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              display:       '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {productName}
            </span>
          </div>

          {/* 화살표 아이콘 (24×24) */}
          <IconChevronRight
            size={24}
            color="var(--text-icon-normal)"
            style={{ flexShrink: 0 }}
          />
        </div>
      )}

      {/* ── Empty: 최근 주문 없음 ── */}
      {isEmpty && (
        <div style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          padding:        'var(--spacing-400)',
          gap:            'var(--spacing-400)',
        }}>
          <p style={{
            fontFamily:    'var(--font-family)',
            fontSize:      '16px',
            fontWeight:    400,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         'var(--text-icon-alternative)',
            textAlign:     'center',
            margin:        0,
            paddingTop:    'var(--spacing-200)',
            paddingBottom: 'var(--spacing-400)',
          }}>
            최근 주문 메뉴가 없어요.
          </p>

          {/* 주문하기 버튼 */}
          <div
            onClick={onClick}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             'var(--spacing-300)',
              height:          '32px',
              padding:         '0 var(--spacing-400)',
              borderRadius:    'var(--radius-default-300)',
              border:          '1px solid var(--border-light)',
              cursor:          'pointer',
              userSelect:      'none',
            }}
          >
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '14px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-primary)',
              whiteSpace:    'nowrap',
            }}>
              주문하기
            </span>
            <IconChevronRight
              size={16}
              color="var(--text-icon-primary)"
              style={{ flexShrink: 0 }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

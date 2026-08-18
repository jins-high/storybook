// ReorderCard — Figma node 2728:19996
// Props: status ('Default' | 'Empty'), productName, storeName, imageSrc, onClick

import { IconArrowRight } from '../icons/icons.jsx'

const BASE = import.meta.env.BASE_URL


export function ReorderCard({
  status      = 'Default',
  productName = '리얼 초코 자바칩 프라푸치노',
  storeName   = '문래SK v1점',
  imageSrc    = 'green-tea-frappe.png',
  onClick,
}) {
  const isDefault = status === 'Default'
  const isEmpty   = status === 'Empty'

  return (
    <div
      data-inspect="ReorderCard"
      style={{
        width:           '327px',
        borderRadius:    'var(--radius-default-300)',
        border:          `1px ${isEmpty ? 'dashed' : 'solid'} var(--border-light)`,
        backgroundColor: isEmpty ? 'var(--surface-light-subtle)' : 'var(--surface-base)',
        overflow:        'hidden',
        cursor:          onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >

      {/* ── Default: 최근 주문 표시 ── */}
      {isDefault && (
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          'var(--spacing-300)',
          paddingTop:   'var(--spacing-400)',
          paddingBottom:'var(--spacing-400)',
          paddingLeft:  'var(--spacing-300)',
          paddingRight: 'var(--spacing-400)',
        }}>

          {/* 이미지 영역 (72×72) */}
          <div style={{
            position:       'relative',
            width:          '72px',
            height:         '72px',
            flexShrink:     0,
            overflow:       'hidden',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            {/* bg circle — center-aligned, color from design system token */}
            <div style={{
              position:        'absolute',
              inset:           0,
              margin:          'auto',
              width:           '48px',
              height:          '48px',
              borderRadius:    '50%',
              backgroundColor: 'var(--surface-primary-subtle)',
            }} />
            {/* product image — center-aligned on top of bg circle */}
            <img
              src={BASE + 'assets/product/' + imageSrc}
              alt={productName}
              style={{
                position:  'relative',
                zIndex:    1,
                width:     '72.7%',
                height:    '100%',
                objectFit: 'cover',
                display:   'block',
              }}
            />
          </div>

          {/* 텍스트 영역 */}
          <div style={{
            flex:          '1 0 0',
            display:       'flex',
            flexDirection: 'column',
            gap:           'var(--spacing-200)',
            minWidth:      0,
          }}>
            <span style={{
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
              fontSize:      '16px',
              fontWeight:    700,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-normal)',
              wordBreak:     'break-word',
            }}>
              {productName}
            </span>
          </div>

          {/* 화살표 아이콘 (24×24) */}
          <IconArrowRight size={24} color="var(--text-icon-normal)" style={{ flexShrink: 0 }} />
        </div>
      )}

      {/* ── Empty: 최근 주문 없음 ── */}
      {isEmpty && (
        <div style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          paddingLeft:    'var(--spacing-400)',
          paddingRight:   'var(--spacing-400)',
          paddingTop:     'var(--spacing-700)',
          paddingBottom:  'var(--spacing-700)',
        }}>
          {/* PaddingWrap */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          '100%',
            paddingTop:     'var(--spacing-200)',
            paddingBottom:  'var(--spacing-400)',
          }}>
            <p style={{
              margin:        0,
              flex:          '1 0 0',
              fontSize:      '16px',
              fontWeight:    400,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-alternative)',
              textAlign:     'center',
              wordBreak:     'break-word',
            }}>
              최근 주문 메뉴가 없어요.
            </p>
          </div>

          {/* 주문하기 버튼 */}
          <div
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
              flexShrink:      0,
              overflow:        'hidden',
            }}
          >
            <span style={{
              fontSize:      '14px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-primary)',
              whiteSpace:    'nowrap',
            }}>
              주문하기
            </span>
            <IconArrowRight size={16} color="var(--text-icon-primary)" style={{ flexShrink: 0 }} />
          </div>
        </div>
      )}
    </div>
  )
}

ReorderCard.statuses = ['Default', 'Empty']

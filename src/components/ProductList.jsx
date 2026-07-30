// ProductList — Figma node 2811:23291
import { MicroBadge } from './MicroBadge.jsx'

const BASE = import.meta.env.BASE_URL

const IMG_RADIUS = {
  borderTopLeftRadius:     'var(--radius-default-600)',
  borderTopRightRadius:    'var(--radius-default-200)',
  borderBottomRightRadius: 'var(--radius-default-600)',
  borderBottomLeftRadius:  'var(--radius-default-200)',
}

function SoldOut() {
  return (
    <div style={{
      position:        'absolute',
      inset:           0,
      backgroundColor: 'var(--dimmer-normal)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
    }}>
      <span style={{
        fontFamily:    'var(--font-family)',
        fontSize:      '16px',
        fontWeight:    700,
        letterSpacing: '-0.25px',
        color:         'var(--text-icon-base)',
      }}>
        품절
      </span>
    </div>
  )
}

export function ProductList({
  display      = 'Horizontal',
  productName  = '아메리카노',
  price        = '1,800원',
  state        = 'Default',
  hasNewBadge  = false,
  hasBestBadge = false,
  hasHashTag   = true,
  hashtags     = ['#저당', '#저칼로리'],
  imageSrc     = 'bigpose-americano-decaf-yabangcha.png',
}) {
  const disabled   = state === 'Disabled'
  const textColor  = disabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)'
  const hashColor  = disabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-alternative)'
  const isVertical = display === 'Vertical'

  // ── Vertical ─────────────────────────────────────────────
  if (isVertical) {
    return (
      <div
        data-inspect="ProductList"
        style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           'var(--spacing-400)',
          width:         '327px',
          position:      'relative',
        }}
      >
        {/* Full-width square image */}
        <div style={{
          position:        'relative',
          width:           '100%',
          aspectRatio:     '1 / 1',
          overflow:        'hidden',
          backgroundColor: 'var(--surface-primary-subtle)',
          ...IMG_RADIUS,
        }}>
          <img
            src={BASE + 'assets/product/' + imageSrc}
            alt={productName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {disabled && <SoldOut />}
        </div>

        {/* Centered info */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           'var(--spacing-200)',
          width:         '100%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-100)' }}>
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '18px',
              fontWeight:    400,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         textColor,
              textAlign:     'center',
              width:         '100%',
            }}>
              {productName}
            </span>
            {hasHashTag && hashtags.length > 0 && (
              <span style={{
                fontFamily:    'var(--font-family)',
                fontSize:      disabled ? '14px' : '15px',
                fontWeight:    400,
                lineHeight:    1.35,
                letterSpacing: '-0.25px',
                color:         hashColor,
                textAlign:     'center',
                width:         '100%',
              }}>
                {hashtags.join(' · ')}
              </span>
            )}
          </div>
          <span style={{
            fontFamily:    'var(--font-family)',
            fontSize:      '20px',
            fontWeight:    500,
            lineHeight:    1.3,
            letterSpacing: '-0.25px',
            color:         textColor,
            textAlign:     'center',
            width:         '100%',
          }}>
            {price}
          </span>
        </div>

        {/* Badges: absolute top-right of image */}
        {(hasNewBadge || hasBestBadge) && (
          <div style={{
            position:   'absolute',
            top:        0,
            right:      0,
            display:    'flex',
            gap:        'var(--spacing-100)',
            alignItems: 'center',
          }}>
            {hasBestBadge && <MicroBadge style="RedSolid"    size="Small" label="BEST" />}
            {hasNewBadge  && <MicroBadge style="YellowSolid" size="Small" label="NEW" />}
          </div>
        )}
      </div>
    )
  }

  // ── Horizontal ───────────────────────────────────────────
  return (
    <div
      data-inspect="ProductList"
      style={{
        display:       'flex',
        flexDirection: 'row',
        gap:           'var(--spacing-400)',
        width:         '327px',
      }}
    >
      {/* 104×104 image */}
      <div style={{
        position:        'relative',
        width:           '104px',
        height:          '104px',
        flexShrink:      0,
        overflow:        'hidden',
        backgroundColor: 'var(--surface-primary-subtle)',
        ...IMG_RADIUS,
      }}>
        <img
          src={BASE + 'assets/product/' + imageSrc}
          alt={productName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {disabled && <SoldOut />}
      </div>

      {/* Info */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)', minWidth: 0 }}>
        {(hasNewBadge || hasBestBadge) && (
          <div style={{ display: 'flex', gap: 'var(--spacing-100)', alignItems: 'center' }}>
            {hasNewBadge  && <MicroBadge style="YellowSolid" size="Small" label="NEW" />}
            {hasBestBadge && <MicroBadge style="RedSolid"    size="Small" label="BEST" />}
          </div>
        )}
        <div style={{
          display:        'flex',
          flexDirection:  'column',
          gap:            'var(--spacing-200)',
          paddingTop:     'var(--spacing-200)',
          paddingBottom:  'var(--spacing-200)',
        }}>
          <span style={{
            fontFamily:    'var(--font-family)',
            fontSize:      '18px',
            fontWeight:    400,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         textColor,
            overflow:      'hidden',
            textOverflow:  'ellipsis',
            whiteSpace:    'nowrap',
          }}>
            {productName}
          </span>
          {hasHashTag && hashtags.length > 0 && (
            <span style={{
              fontFamily:    'var(--font-family)',
              fontSize:      '14px',
              fontWeight:    400,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         hashColor,
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              whiteSpace:    'nowrap',
            }}>
              {hashtags.join(' · ')}
            </span>
          )}
        </div>
        <span style={{
          fontFamily:    'var(--font-family)',
          fontSize:      '20px',
          fontWeight:    500,
          lineHeight:    1.3,
          letterSpacing: '-0.25px',
          color:         textColor,
        }}>
          {price}
        </span>
      </div>
    </div>
  )
}

ProductList.displays = ['Horizontal', 'Vertical']
ProductList.states   = ['Default', 'Disabled']

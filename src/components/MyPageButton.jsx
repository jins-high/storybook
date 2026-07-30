// MyPageButton — Figma node 2898:26051
import * as GraphicIcons from '../icons/graphicIcons.jsx'

// Decorative background graphic (positioned behind icon, clipped by BgWrap overflow:hidden)
const BG_GRAPHIC_URL = 'https://www.figma.com/api/mcp/asset/e7682e3c-2d0d-45cf-8267-7919ce6e6f5b'

const ICON_NAMES = [
  'ProfileSetting', 'Favorites', 'List1', 'List2',
  'GiftCard',       'Coupon',    'Card',  'Membership',
  'Stamp',          'Gift',      'Event', 'Chart',
  'News',           'Speaker',   'Phone', 'Camera',
  'Picture',        'Hand',      'HeadPhone', 'Talk',
  'OkCashback',     'Order',     'LPoint',
  'Kakao',          'Apple',
  'Facebook',       'Instagram', 'Youtube', 'Compose',
]

export function MyPageButton({
  display    = 'Horizontal',
  buttonName = '계정 설정',
  iconName   = 'ProfileSetting',
}) {
  const isVertical = display === 'Vertical'
  const IconComp   = GraphicIcons[`GraphicIcon${iconName}`] ?? GraphicIcons.GraphicIconProfileSetting
  const iconSize   = isVertical ? 32 : 24

  return (
    <div
      data-inspect="MyPageButton"
      style={{
        display:     'flex',
        alignItems:  'center',
        paddingLeft:  'var(--spacing-200)',
        paddingRight: 'var(--spacing-200)',
        width:        '140px',
        boxSizing:    'border-box',
        ...(isVertical
          ? { flexDirection: 'column', gap: 'var(--spacing-200)', height: '62px' }
          : { flexDirection: 'row',    gap: 'var(--spacing-300)', height: '48px' }
        ),
      }}
    >
      {/* BgWrap: icon + clipped decorative background */}
      <div style={{
        position:     'relative',
        display:      'flex',
        gap:          '7px',
        alignItems:   'center',
        overflow:     'hidden',
        padding:      'var(--spacing-200)',
        borderRadius: 'var(--radius-default-200)',
        flexShrink:   0,
      }}>
        {/* Decorative glow behind icon — absolute, partially clipped */}
        <div style={{
          position: 'absolute',
          width:    '32px',
          height:   '32px',
          ...(isVertical
            ? { left: '4px', top: '22px' }
            : { left: '0',   top: '16px' }
          ),
        }}>
          <img src={BG_GRAPHIC_URL} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>

        {/* Graphic icon */}
        <IconComp size={iconSize} style={{ position: 'relative', flexShrink: 0 }} />
      </div>

      {/* Button label */}
      <span style={{
        fontFamily:    'var(--font-family)',
        fontSize:      isVertical ? '13px' : '16px',
        fontWeight:    isVertical ? 400 : 500,
        lineHeight:    1.35,
        letterSpacing: '-0.25px',
        color:         'var(--text-icon-normal)',
        textAlign:     'center',
        whiteSpace:    'nowrap',
        flexShrink:    0,
      }}>
        {buttonName}
      </span>
    </div>
  )
}

MyPageButton.displayTypes = ['Horizontal', 'Vertical']
MyPageButton.iconNames    = ICON_NAMES

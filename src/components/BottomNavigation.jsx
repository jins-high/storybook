// BottomNavigation — Figma node 2033:22087
import { IconHome, IconHomeFill, IconGift, IconGiftFill, IconMenu, IconFlask, IconFlaskFill } from '../icons/icons.jsx'
import { GraphicIconOrderCup } from '../icons/graphicIcons.jsx'

const textBase = {
  fontFamily:    'var(--font-family)',
  lineHeight:    1.35,
  letterSpacing: '-0.25px',
}

const TABS = [
  { id: 'Home',       label: '홈',      OutlineIcon: IconHome,   FillIcon: IconHomeFill  },
  { id: 'Laboratory', label: '실험실',  OutlineIcon: IconFlask,  FillIcon: IconFlaskFill },
  { id: 'Order',      label: '주문',    OutlineIcon: null,       FillIcon: null          },
  { id: 'GiftShop',   label: '선물하기', OutlineIcon: IconGift,  FillIcon: IconGiftFill  },
  { id: 'More',       label: '더보기',  OutlineIcon: IconMenu,   FillIcon: IconMenu      },
]

function IconSlot({ OutlineIcon, FillIcon, isActive }) {
  return (
    <div style={{ position: 'relative', width: 24, height: 24 }}>
      <div style={{
        position:   'absolute', inset: 0,
        opacity:    isActive ? 0 : 1,
        transform:  isActive ? 'scale(0.75)' : 'scale(1)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}>
        <OutlineIcon size={24} color="var(--text-icon-assistive)" />
      </div>
      <div style={{
        position:   'absolute', inset: 0,
        opacity:    isActive ? 1 : 0,
        transform:  isActive ? 'scale(1)' : 'scale(0.75)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}>
        <FillIcon size={24} color="var(--text-icon-normal)" />
      </div>
    </div>
  )
}

function OrderSlot({ isActive }) {
  return (
    <div style={{ position: 'relative', width: 52, height: 52 }}>
      {/* 비활성: 노란 원형 버블 */}
      <div style={{
        position:        'absolute', inset: 0,
        display:         'flex', alignItems: 'center', justifyContent: 'center',
        opacity:         isActive ? 0 : 1,
        transform:       isActive ? 'scale(0.7)' : 'scale(1)',
        transition:      'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents:   'none',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '9999px',
          backgroundColor: 'var(--surface-base)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '9999px',
            backgroundColor: 'var(--surface-primary-solid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GraphicIconOrderCup size={24} />
          </div>
        </div>
      </div>

      {/* 활성: 아이콘만 */}
      <div style={{
        position:        'absolute', inset: 0,
        display:         'flex', alignItems: 'center', justifyContent: 'center',
        opacity:         isActive ? 1 : 0,
        transform:       isActive ? 'scale(1)' : 'scale(0.7)',
        transition:      'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents:   'none',
      }}>
        <GraphicIconOrderCup size={24} />
      </div>
    </div>
  )
}

export function BottomNavigation({
  page     = 'Home',  // 'Home' | 'Laboratory' | 'Order' | 'GiftShop' | 'More'
  onChange,
}) {
  return (
    <div
      data-inspect="BottomNavigation"
      style={{
        display:         'flex',
        alignItems:      'flex-end',
        justifyContent:  'center',
        gap:             'var(--spacing-200)',
        height:          64,
        padding:         '8px 24px',
        backgroundColor: 'var(--surface-base)',
        filter:          'drop-shadow(0px -1px 2px rgba(0,0,0,0.06))',
        width:           '100%',
        boxSizing:       'border-box',
      }}
    >
      {TABS.map(tab => {
        const isActive  = page === tab.id
        const isOrder   = tab.id === 'Order'

        return (
          <button
            key={tab.id}
            onClick={() => onChange?.(tab.id)}
            style={{
              flex:           '1 0 0',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            'var(--spacing-200)',
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              padding:        0,
              minWidth:       0,
            }}
          >
            {isOrder
              ? <OrderSlot isActive={isActive} />
              : <IconSlot OutlineIcon={tab.OutlineIcon} FillIcon={tab.FillIcon} isActive={isActive} />
            }

            <span style={{
              ...textBase,
              fontSize:   11,
              fontWeight: isActive ? 500 : 400,
              color:      isActive ? 'var(--text-icon-normal)' : 'var(--text-icon-assistive)',
              transition: 'color 0.2s ease, font-weight 0.2s ease',
              whiteSpace: 'nowrap',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

BottomNavigation.pages = ['Home', 'Laboratory', 'Order', 'GiftShop', 'More']

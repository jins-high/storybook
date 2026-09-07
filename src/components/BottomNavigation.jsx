// BottomNavigation — Figma node 2033:22087
import { useRef, useEffect, useState } from 'react'
import lottie from 'lottie-web'
import { IconHome, IconHomeFill, IconGift, IconGiftFill, IconMenu, IconFlask, IconFlaskFill } from '../icons/icons.jsx'
import animationData from '../assets/order-animation.json'

const textBase = {
  fontFamily:    'var(--font-family)',
  lineHeight:    1.35,
  letterSpacing: '-0.25px',
}

const TABS = [
  { id: 'Home',       label: '홈',       OutlineIcon: IconHome,   FillIcon: IconHomeFill  },
  { id: 'Laboratory', label: '실험실',   OutlineIcon: IconFlask,  FillIcon: IconFlaskFill },
  { id: 'Order',      label: '주문',     OutlineIcon: null,       FillIcon: null          },
  { id: 'GiftShop',   label: '선물하기', OutlineIcon: IconGift,   FillIcon: IconGiftFill  },
  { id: 'More',       label: '더보기',   OutlineIcon: IconMenu,   FillIcon: IconMenu      },
]

function IconSlot({ OutlineIcon, FillIcon, isActive }) {
  return (
    <div style={{ position: 'relative', width: 24, height: 24 }}>
      <div style={{
        position:   'absolute', inset: 0,
        opacity:    isActive ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}>
        <OutlineIcon size={24} color="var(--text-icon-assistive)" />
      </div>
      <div style={{
        position:   'absolute', inset: 0,
        opacity:    isActive ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}>
        <FillIcon size={24} color="var(--text-icon-normal)" />
      </div>
    </div>
  )
}

function OrderSlot({ isActive, playCount }) {
  const containerRef = useRef(null)
  const animRef      = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const anim = lottie.loadAnimation({
      container:     containerRef.current,
      renderer:      'svg',
      loop:          false,
      autoplay:      false,
      animationData,
    })
    anim.goToAndStop(0, true)
    animRef.current = anim
    return () => { anim.destroy(); animRef.current = null }
  }, [])

  useEffect(() => {
    if (!isActive && animRef.current) {
      animRef.current.goToAndStop(0, true)
    }
  }, [isActive])

  useEffect(() => {
    if (playCount > 0 && animRef.current) {
      animRef.current.goToAndPlay(0, true)
    }
  }, [playCount])

  return (
    // BgWrap — Figma 구조: 52px 흰 원(4px 패딩) → 44px 노란 원 → Lottie
    <div style={{
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      padding:         4,
      width:           52,
      height:          52,
      borderRadius:    '9999px',
      backgroundColor: 'var(--surface-base)',
      flexShrink:      0,
    }}>
      <div
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          width:           44,
          height:          44,
          borderRadius:    '999px',
          backgroundColor: 'var(--surface-primary-solid)',
          flexShrink:      0,
        }}
      >
        <div ref={containerRef} style={{ width: 44, height: 44 }} />
      </div>
    </div>
  )
}

export function BottomNavigation({
  page           = 'Home',
  onChange,
  orderPlayCount = 0,
}) {
  const [tappedTab, setTappedTab] = useState(null)

  function handleTabClick(tabId) {
    onChange?.(tabId)
  }

  function handleTabPointerDown(tabId) {
    setTappedTab(tabId)
  }

  return (
    <div
      data-inspect="BottomNavigation"
      style={{
        display:         'flex',
        alignItems:      'flex-end',
        justifyContent:  'center',
        gap:             'var(--spacing-200)',
        height:          64,
        padding:         '8px var(--spacing-container-padding)',
        backgroundColor: 'var(--surface-base)',
        filter:          'drop-shadow(0px -1px 2px rgba(0,0,0,0.06))',
        width:           '100%',
        boxSizing:       'border-box',
        overflow:        'visible',
      }}
    >
      {TABS.map(tab => {
        const isActive = page === tab.id
        const isOrder  = tab.id === 'Order'

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            onPointerDown={() => handleTabPointerDown(tab.id)}
            style={{
              flex:          '1 0 0',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           'var(--spacing-200)',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:       0,
              minWidth:      0,
              position:      'relative',
              overflow:      'visible',
              borderRadius:  isOrder ? 0 : 'var(--radius-default-200)',
            }}
          >
            <div
              className={`tab-icon-wrapper${tappedTab === tab.id ? ' tab-icon-tapped' : ''}`}
              onAnimationEnd={() => setTappedTab(null)}
            >
              {isOrder
                ? <OrderSlot isActive={isActive} playCount={orderPlayCount} />
                : <IconSlot OutlineIcon={tab.OutlineIcon} FillIcon={tab.FillIcon} isActive={isActive} />
              }
            </div>

            <span style={{
              ...textBase,
              fontSize:   11,
              fontWeight: isActive ? 500 : 400,
              color:      isActive ? 'var(--text-icon-normal)' : 'var(--text-icon-assistive)',
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap',
            }}>
              {tab.label}
            </span>

            {/* DarkLayer — 별도 overflow:hidden 래퍼로 borderRadius 클리핑 유지 */}
            {!isOrder && (
              <div style={{
                position:     'absolute',
                inset:        0,
                borderRadius: 'var(--radius-default-200)',
                overflow:     'hidden',
                pointerEvents:'none',
              }}>
                <div
                  data-overlay=""
                  style={{
                    position:        'absolute',
                    inset:           0,
                    backgroundColor: 'var(--surface-heavy-solid)',
                    pointerEvents:   'none',
                  }}
                />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

BottomNavigation.pages = ['Home', 'Laboratory', 'Order', 'GiftShop', 'More']

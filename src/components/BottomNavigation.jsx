// BottomNavigation — Figma node 2033:22087
import { useState, useRef, useEffect } from 'react'
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

  // 버튼 클릭 시 재생
  useEffect(() => {
    if (playCount > 0 && animRef.current) {
      animRef.current.goToAndPlay(0, true)
    }
  }, [playCount])

  return (
    <div style={{
      position:       'relative',
      width:          52,
      height:         52,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }}>
      {/* 비활성: 흰 링 + 노란 원 (배경) */}
      <div style={{
        position:        'absolute',
        width:           52, height: 52,
        borderRadius:    '9999px',
        backgroundColor: 'var(--surface-base)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        opacity:         isActive ? 0 : 1,
        transform:       isActive ? 'scale(0.7)' : 'scale(1)',
        transition:      'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents:   'none',
      }}>
        <div style={{
          width:           44,
          height:          44,
          borderRadius:    '9999px',
          backgroundColor: 'var(--surface-primary-solid)',
        }} />
      </div>

      {/* 로띠 — 항상 가운데, 항상 위에 */}
      <div
        ref={containerRef}
        style={{ width: 24, height: 24, position: 'relative', zIndex: 1, flexShrink: 0 }}
      />
    </div>
  )
}

export function BottomNavigation({
  page     = 'Home',  // 'Home' | 'Laboratory' | 'Order' | 'GiftShop' | 'More'
  onChange,
}) {
  const [orderPlayCount, setOrderPlayCount] = useState(0)

  function handleTabClick(tabId) {
    if (tabId === 'Order') setOrderPlayCount(c => c + 1)
    onChange?.(tabId)
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
        padding:         '8px 24px',
        backgroundColor: 'var(--surface-base)',
        filter:          'drop-shadow(0px -1px 2px rgba(0,0,0,0.06))',
        width:           '100%',
        boxSizing:       'border-box',
      }}
    >
      {TABS.map(tab => {
        const isActive = page === tab.id
        const isOrder  = tab.id === 'Order'

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
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
            }}
          >
            {isOrder
              ? <OrderSlot isActive={isActive} playCount={orderPlayCount} />
              : <IconSlot OutlineIcon={tab.OutlineIcon} FillIcon={tab.FillIcon} isActive={isActive} />
            }

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
          </button>
        )
      })}
    </div>
  )
}

BottomNavigation.pages = ['Home', 'Laboratory', 'Order', 'GiftShop', 'More']

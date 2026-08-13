// Tab — 모바일오더 라이브러리 / Figma node 11483:1553
// Props:
//   size        : 'md' | 'sm'    (Medium=18px / Small=16px)
//   tabs        : array of { id, label }
//   activeTab   : string (선택된 탭 id)
//   onTabChange : function
//   disabledTabs: array of string

import { useRef, useState, useEffect } from 'react'

// ── Font size per size prop ────────────────────────────────────
const FONT_SIZE = {
  md: '18px',
  sm: '16px',
}

// ── State tokens ───────────────────────────────────────────────
// Default → text-icon-alternative (not normal)
// Active  → text-icon-normal + bold + border-heavy indicator
const TOKENS = {
  active:   { text: 'var(--text-icon-normal)',      weight: 700 },
  default:  { text: 'var(--text-icon-alternative)', weight: 400 },
  disabled: { text: 'var(--text-icon-disabled)',    weight: 400 },
}

export function Tab({
  size = 'md',
  tabs = [],
  activeTab = null,
  onTabChange = () => {},
  disabledTabs = [],
}) {
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStateRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0, lastX: 0 })
  const animationRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseDown = (e) => {
      dragStateRef.current.isDown = true
      dragStateRef.current.startX = e.pageX - container.offsetLeft
      dragStateRef.current.startScrollLeft = container.scrollLeft
      dragStateRef.current.lastX = dragStateRef.current.startX
      setIsDragging(true)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }

    const handleMouseMove = (e) => {
      if (!dragStateRef.current.isDown) return
      const x = e.pageX - container.offsetLeft
      const walk = (x - dragStateRef.current.startX) * 1.2
      container.scrollLeft = dragStateRef.current.startScrollLeft - walk
      dragStateRef.current.lastX = x
    }

    const handleMouseUp = () => {
      dragStateRef.current.isDown = false
      setIsDragging(false)
      const velocity = dragStateRef.current.lastX - dragStateRef.current.startX
      if (Math.abs(velocity) > 1) {
        let v = velocity
        const animate = () => {
          v *= 0.92
          container.scrollLeft -= v * 1.2
          if (Math.abs(v) > 0.1) animationRef.current = requestAnimationFrame(animate)
        }
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    container.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseUp)

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseUp)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const fontSize = FONT_SIZE[size] ?? FONT_SIZE.md

  return (
    <div
      ref={containerRef}
      style={{
        display:           'flex',
        overflowX:         'auto',
        overflowY:         'hidden',
        borderBottom:      '1px solid var(--border-light)',
        width:             '100%',
        cursor:            isDragging ? 'grabbing' : 'grab',
        userSelect:        'none',
        msUserSelect:      'none',
        WebkitUserSelect:  'none',
        scrollbarWidth:    'none',
        msOverflowStyle:   'none',
      }}
      className="tab-container"
      onMouseLeave={() => setIsDragging(false)}
    >
      <style>{`.tab-container::-webkit-scrollbar { display: none; }`}</style>

      {tabs.map((tab) => {
        const isActive   = tab.id === activeTab
        const isDisabled = disabledTabs.includes(tab.id)
        const state      = isDisabled ? 'disabled' : isActive ? 'active' : 'default'
        const token      = TOKENS[state]

        return (
          <button
            key={tab.id}
            onClick={() => !isDisabled && !isDragging && onTabChange(tab.id)}
            disabled={isDisabled}
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              height:        '48px',
              padding:       '0 var(--spacing-300)',
              minWidth:      'fit-content',
              whiteSpace:    'nowrap',
              color:         token.text,
              backgroundColor: 'transparent',
              border:        'none',
              // Active: 1px solid border-heavy indicator (overlays outer border-light track)
              borderBottom:  isActive
                ? '1px solid var(--border-heavy)'
                : '1px solid transparent',
              fontSize:      fontSize,
              fontWeight:    token.weight,
              letterSpacing: '-0.25px',
              lineHeight:    '1.35',
              fontFamily:    'var(--font-family)',
              cursor:        isDisabled ? 'not-allowed' : isDragging ? 'grabbing' : 'pointer',
              outline:       'none',
              flexShrink:    0,
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

Tab.sizes  = ['md', 'sm']
Tab.states = ['active', 'default', 'disabled']

// Tab — 모바일오더 라이브러리 / Figma node 11483-1553 (아토믹), 11483-1588 (컴포넌트)
// 탭 네비게이션 컴포넌트 (드래그 스크롤 지원)
// Props:
//   tabs        : array of { id, label }
//   activeTab   : string (선택된 탭 id)
//   onTabChange : function (탭 변경 시 호출)
//   disabledTabs: array of string (비활성 탭 id 배열)

import { useRef, useState, useEffect } from 'react'

// ── State colors ────────────────────────────────────────────────
const TOKENS = {
  active: {
    text: 'var(--text-icon-normal)',
    border: 'var(--border-primary)',
  },
  default: {
    text: 'var(--text-icon-normal)',
    border: 'transparent',
  },
  disabled: {
    text: 'var(--text-icon-disabled)',
    border: 'transparent',
  },
}

export function Tab({
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

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
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

      // 관성 스크롤
      const velocity = dragStateRef.current.lastX - dragStateRef.current.startX
      if (Math.abs(velocity) > 1) {
        let v = velocity
        const animate = () => {
          v *= 0.92
          container.scrollLeft -= v * 1.2

          if (Math.abs(v) > 0.1) {
            animationRef.current = requestAnimationFrame(animate)
          }
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        borderBottom: '1px solid var(--border-light)',
        width: '100%',
        maxWidth: '360px',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        msUserSelect: 'none',
        WebkitUserSelect: 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="tab-container"
      onMouseLeave={() => setIsDragging(false)}
    >
      <style>{`
        .tab-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        const isDisabled = disabledTabs.includes(tab.id)
        const state = isDisabled ? 'disabled' : isActive ? 'active' : 'default'
        const token = TOKENS[state]

        return (
          <button
            key={tab.id}
            onClick={() => !isDisabled && onTabChange(tab.id)}
            disabled={isDisabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--spacing-300) var(--spacing-500)',
              minWidth: 'fit-content',
              whiteSpace: 'nowrap',
              color: token.text,
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${isActive ? token.border : 'transparent'}`,
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              fontFamily: 'var(--font-family)',
              cursor: isDisabled ? 'not-allowed' : isDragging ? 'grabbing' : 'pointer',
              opacity: isDisabled ? 0.5 : 1,
              transition: isDragging ? 'none' : 'all 0.2s ease',
              outline: 'none',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Static metadata ────────────────────────────────────────────────
Tab.states = ['active', 'default', 'disabled']

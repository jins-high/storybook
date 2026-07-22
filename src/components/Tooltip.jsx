// Tooltip — 모바일오더 라이브러리 / Figma node 11562-2266 (문서), 9756-17413 (컴포넌트)
// 말풍선 형태의 정보 표시 컴포넌트 (클릭 기반)
// Props:
//   visible      : boolean (표시 여부)
//   placement    : 'top' | 'bottom' | 'left' | 'right' (위치)
//   text         : string (표시할 텍스트)
//   onClose      : function (닫힐 때 호출)
//   targetRef    : ref (앵커 요소)

import { useEffect, useState, useRef } from 'react'

export function Tooltip({
  visible = false,
  placement = 'top',
  text = '',
  onClose = () => {},
  targetRef = null,
}) {
  const [isExiting, setIsExiting] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef(null)

  // 위치 계산
  useEffect(() => {
    if (!visible || !targetRef?.current) return

    const target = targetRef.current
    const tooltip = tooltipRef.current
    const targetRect = target.getBoundingClientRect()

    if (!tooltip) return

    const tooltipRect = tooltip.getBoundingClientRect()
    const gap = 8 // 툴팁과 타겟 사이 거리

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = targetRect.top - tooltipRect.height - gap
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case 'bottom':
        top = targetRect.bottom + gap
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case 'left':
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.left - tooltipRect.width - gap
        break
      case 'right':
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.right + gap
        break
    }

    setPosition({ top, left })
  }, [visible, placement, targetRef])

  // 클릭 외부 감지
  useEffect(() => {
    if (!visible) return

    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target) && targetRef?.current && !targetRef.current.contains(e.target)) {
        setIsExiting(true)
        setTimeout(() => {
          onClose()
          setIsExiting(false)
        }, 200)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [visible, targetRef, onClose])

  if (!visible && !isExiting) return null

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        pointerEvents: 'auto',
        zIndex: 9999,
        animation: isExiting
          ? 'scaleDown 0.2s ease-out forwards'
          : 'scaleUp 0.2s ease-out forwards',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--surface-heavy-solid)',
          color: 'var(--text-icon-base)',
          padding: 'var(--spacing-300) var(--spacing-400)',
          borderRadius: 'var(--radius-default-200)',
          fontSize: '13px',
          fontWeight: 400,
          fontFamily: 'var(--font-family)',
          lineHeight: '1.4',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          maxWidth: '280px',
          position: 'relative',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {text}

        {/* 말풍선 화살표 */}
        <div
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            ...(placement === 'top' && {
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '6px 6px 0 6px',
              borderColor: 'var(--surface-heavy-solid) transparent transparent transparent',
            }),
            ...(placement === 'bottom' && {
              top: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '0 6px 6px 6px',
              borderColor: 'transparent transparent var(--surface-heavy-solid) transparent',
            }),
            ...(placement === 'left' && {
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              borderWidth: '6px 0 6px 6px',
              borderColor: 'transparent transparent transparent var(--surface-heavy-solid)',
            }),
            ...(placement === 'right' && {
              left: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              borderWidth: '6px 6px 6px 0',
              borderColor: 'transparent var(--surface-heavy-solid) transparent transparent',
            }),
          }}
        />
      </div>

      <style>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleDown {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Tooltip — 모바일오더 라이브러리 / Figma node 11562-2266 (문서), 9756-17413 (컴포넌트)
// 말풍선 형태의 정보 표시 컴포넌트 (클릭 기반)
// Props:
//   visible      : boolean (표시 여부)
//   placement    : 'top' | 'bottom' | 'left' | 'right' (위치)
//   align        : 'start' | 'center' | 'end' (화살표 정렬, top/bottom에만 적용)
//   text         : string (표시할 텍스트)
//   onClose      : function (닫힐 때 호출)
//   targetRef    : ref (앵커 요소)

import { useEffect, useState, useRef } from 'react'

export function Tooltip({
  visible = false,
  placement = 'top',
  align = 'center',
  text = '',
  onClose = () => {},
  targetRef = null,
}) {
  const [isExiting, setIsExiting] = useState(false)
  const tooltipRef = useRef(null)

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

  // 화살표 위치 계산
  let arrowPos = '50%'
  if (placement === 'top' || placement === 'bottom') {
    if (align === 'start') arrowPos = '12px'
    else if (align === 'end') arrowPos = 'calc(100% - 12px)'
    else arrowPos = '50%'
  }

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
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
          color: '#FFFFFF',
          padding: 'var(--spacing-300) var(--spacing-400)',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 400,
          fontFamily: 'var(--font-family)',
          lineHeight: '1.4',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          maxWidth: '280px',
          position: 'relative',
        }}
      >
        {text}

        {/* 말풍선 화살표 */}
        <div
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--surface-heavy-solid)',
            ...(placement === 'top' && {
              bottom: '-4px',
              left: arrowPos,
              transform: 'translateX(-50%) rotate(45deg)',
            }),
            ...(placement === 'bottom' && {
              top: '-4px',
              left: arrowPos,
              transform: 'translateX(-50%) rotate(45deg)',
            }),
            ...(placement === 'left' && {
              right: '-4px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
            }),
            ...(placement === 'right' && {
              left: '-4px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
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

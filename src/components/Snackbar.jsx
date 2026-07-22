// Snackbar — 모바일오더 라이브러리 / Figma node 11562-1974 (문서), 9588-4047 (컴포넌트)
// 알림 메시지 컴포넌트 (자동 닫힘, 애니메이션)
// Props:
//   message      : string (표시할 메시지)
//   visible      : boolean (표시 여부)
//   onClose      : function (닫힐 때 호출)
//   duration     : number (표시 시간, 기본값 5000ms)

import { useEffect, useState } from 'react'

export function Snackbar({
  message = '',
  visible = false,
  onClose = () => {},
  duration = 5000,
}) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!visible) {
      setIsExiting(false)
      return
    }

    // 타이머 설정 (5초 후 닫기)
    const timer = setTimeout(() => {
      setIsExiting(true)
      // 애니메이션 완료 후 onClose 호출
      setTimeout(() => {
        onClose()
        setIsExiting(false)
      }, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [visible, duration, onClose])

  if (!visible && !isExiting) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--surface-heavy-solid)',
          color: 'var(--text-icon-base)',
          padding: 'var(--spacing-400) var(--spacing-500)',
          borderRadius: 'var(--radius-default-300)',
          fontSize: '14px',
          fontWeight: 400,
          fontFamily: 'var(--font-family)',
          lineHeight: '1.5',
          maxWidth: '320px',
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
          // Enter animation: slide up from bottom, Exit: slide out upward
          animation: isExiting
            ? 'slideOut 0.3s ease-out forwards'
            : 'slideUp 0.3s ease-out forwards',
        }}
      >
        {message}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

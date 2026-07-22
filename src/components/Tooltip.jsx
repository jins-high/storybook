// Tooltip — 모바일오더 라이브러리 / Figma node 11562-2266 (문서), 9756-17413 (컴포넌트)
// 말풍선 형태의 정보 표시 컴포넌트
// 부모는 position:relative 로 앵커(타겟)를 감싸야 하며, 툴팁은 placement 기준으로 배치된다.
// Props:
//   visible      : boolean (표시 여부 — 부모가 제어)
//   placement    : 'top' | 'bottom' | 'left' | 'right'
//   align        : 'start' | 'center' | 'end' (top/bottom 에서 화살표/정렬 위치)
//   text         : string
//   onClose      : function (호환용 — 현재 미사용)

import { useEffect, useState } from 'react'

const GAP = 8        // 앵커와 말풍선 사이 간격
const ARROW = 8      // 화살표 사각형 크기
const EDGE = 14      // start/end 정렬 시 화살표의 가장자리 오프셋

export function Tooltip({
  visible = false,
  placement = 'top',
  align = 'center',
  text = '',
}) {
  const [render, setRender] = useState(visible)
  const [exiting, setExiting] = useState(false)

  // visible 변화에 따라 등장/퇴장 애니메이션을 구동
  useEffect(() => {
    if (visible) {
      setRender(true)
      setExiting(false)
      return
    }
    // visible=false → 퇴장 애니메이션 후 언마운트
    setExiting(true)
    const t = setTimeout(() => {
      setRender(false)
      setExiting(false)
    }, 160)
    return () => clearTimeout(t)
  }, [visible])

  if (!render) return null

  const isVertical = placement === 'top' || placement === 'bottom'

  // ── 말풍선 위치 (앵커 래퍼 기준 absolute) ──────────────
  const wrapPos = { position: 'absolute', zIndex: 9999 }
  if (placement === 'top')    { wrapPos.bottom = '100%'; wrapPos.marginBottom = `${GAP}px` }
  if (placement === 'bottom') { wrapPos.top = '100%';    wrapPos.marginTop = `${GAP}px` }
  if (placement === 'left')   { wrapPos.right = '100%';  wrapPos.marginRight = `${GAP}px`; wrapPos.top = '50%' }
  if (placement === 'right')  { wrapPos.left = '100%';   wrapPos.marginLeft = `${GAP}px`;  wrapPos.top = '50%' }

  // 정렬(수평/수직 중심)에 따른 translate 정렬값
  let translate = ''
  if (isVertical) {
    if (align === 'start')       { wrapPos.left = 0 }
    else if (align === 'end')    { wrapPos.right = 0 }
    else { wrapPos.left = '50%'; translate = 'translateX(-50%)' }
  } else {
    translate = 'translateY(-50%)'
  }

  // ── 화살표 위치 ─────────────────────────────────────────
  const arrowStyle = {
    position: 'absolute',
    width: `${ARROW}px`,
    height: `${ARROW}px`,
    backgroundColor: 'var(--surface-heavy-solid)',
    transform: 'rotate(45deg)',
  }
  if (placement === 'top')    { arrowStyle.bottom = `-${ARROW / 2}px` }
  if (placement === 'bottom') { arrowStyle.top = `-${ARROW / 2}px` }
  if (isVertical) {
    if (align === 'start')     { arrowStyle.left = `${EDGE}px` }
    else if (align === 'end')  { arrowStyle.right = `${EDGE}px` }
    else { arrowStyle.left = '50%'; arrowStyle.marginLeft = `-${ARROW / 2}px` }
  }
  if (placement === 'left')   { arrowStyle.right = `-${ARROW / 2}px`; arrowStyle.top = '50%'; arrowStyle.marginTop = `-${ARROW / 2}px` }
  if (placement === 'right')  { arrowStyle.left = `-${ARROW / 2}px`;  arrowStyle.top = '50%'; arrowStyle.marginTop = `-${ARROW / 2}px` }

  return (
    <div style={{ ...wrapPos, transform: translate, pointerEvents: 'none' }}>
      <div
        style={{
          transformOrigin: 'center',
          animation: exiting
            ? 'tooltipOut 0.16s ease-in forwards'
            : 'tooltipIn 0.16s ease-out forwards',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--surface-heavy-solid)',
            color: '#FFFFFF',
            padding: 'var(--spacing-300) var(--spacing-400)',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 400,
            fontFamily: 'var(--font-family)',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
            maxWidth: '280px',
            pointerEvents: 'auto',
          }}
        >
          {text}
          <div style={arrowStyle} />
        </div>
      </div>

      <style>{`
        @keyframes tooltipIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes tooltipOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.9); }
        }
      `}</style>
    </div>
  )
}

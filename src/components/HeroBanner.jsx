/**
 * HeroBanner Component — 컴포즈커피
 *
 * 인터랙션 (Figma prototype):
 *   - 스와이프 제스처 (좌/우)
 *   - 앞 카드가 스와이프 방향으로 서서히 사라짐
 *   - 뒷 카드가 앞으로 올라옴
 *
 * 비주얼 (Figma 스크린샷):
 *   - 3장 카드 동시에 보임, 2° 간격으로 겹침
 *   - 앞 카드: 중앙
 *   - 뒷 카드들: 약간 뒤로 물러나 있음
 */

import { useState, useRef } from 'react'

const IMG = {
  dark:   '/assets/heroBanner/v-dark.png',
  yellow: '/assets/heroBanner/v-yellow.png',
  light:  '/assets/heroBanner/v-light.png',
  light2: '/assets/heroBanner/v-light.png',
}

const CARDS = [
  { id: '1', bg: '#1a1a1a', layers: [IMG.dark] },
  { id: '3', bg: '#f5c800', layers: [IMG.yellow] },
  { id: '2', bg: '#ffffff', layers: [IMG.light, IMG.light2] },
]

// stack position 0 = front, 1 = middle-back, 2 = far-back
const STACK = [
  { tx:   0, ty:  0, rot:  2, scale: 1.00, z: 3 },
  { tx: -14, ty: -6, rot: -2, scale: 0.95, z: 2 },
  { tx:  10, ty: -4, rot:  6, scale: 0.92, z: 1 },
]

const SWIPE_THRESHOLD  = 60   // px — 이 거리 이상이면 스와이프 완료
const LOCK_THRESHOLD   = 8    // px — 방향 판정 시작 거리
const EXIT_DISTANCE    = 260  // px — 카드가 날아가는 거리 (짧게)

export function HeroBanner({ page = '1', onPageChange, style = {} }) {
  const [activeIdx, setActiveIdx] = useState(
    Math.max(0, CARDS.findIndex(c => c.id === page))
  )
  const [dragX,    setDragX]    = useState(0)
  const [dragY,    setDragY]    = useState(0)
  const [exitX,    setExitX]    = useState(0)
  const [exitY,    setExitY]    = useState(0)

  const [dragging,    setDragging]    = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isExiting,   setIsExiting]   = useState(false)

  const containerRef    = useRef(null)
  const startX          = useRef(null)
  const startY          = useRef(null)
  const lastDX          = useRef(0)
  const lastDY          = useRef(0)
  // null = 미결정, 'h' = 수평 (스와이프), 'v' = 수직 (스크롤)
  const dirLock         = useRef(null)

  const stackPos = (cardIdx) =>
    (cardIdx - activeIdx + CARDS.length) % CARDS.length

  const dragDist = Math.sqrt(dragX * dragX + dragY * dragY)
  const progress = isAnimating ? 1 : Math.min(dragDist / 160, 1)

  // ── pointer 이벤트 ──────────────────────────────────────────
  const handlePointerDown = (e) => {
    if (isAnimating) return
    // 아직 capture 안 함 — 방향 확인 후 결정
    startX.current  = e.clientX
    startY.current  = e.clientY
    lastDX.current  = 0
    lastDY.current  = 0
    dirLock.current = null
  }

  const handlePointerMove = (e) => {
    if (startX.current === null) return

    const dx = e.clientX - startX.current
    const dy = e.clientY - startY.current

    // 방향 미결정 상태: 충분히 움직였으면 판정
    if (dirLock.current === null) {
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < LOCK_THRESHOLD) return   // 아직 판정 불가

      // |dx| >= |dy| → ±45° 이내 수평 스와이프
      if (Math.abs(dx) >= Math.abs(dy)) {
        dirLock.current = 'h'
        containerRef.current?.setPointerCapture(e.pointerId)
        setDragging(true)
      } else {
        // 수직 → 스크롤에 양보, 이후 이벤트 무시
        dirLock.current = 'v'
        startX.current  = null
        return
      }
    }

    if (dirLock.current !== 'h') return

    lastDX.current = dx
    lastDY.current = dy
    setDragX(dx)
    setDragY(dy)
  }

  const handlePointerUp = () => {
    if (startX.current === null || dirLock.current !== 'h') {
      startX.current  = null
      dirLock.current = null
      return
    }

    startX.current  = null
    dirLock.current = null
    setDragging(false)

    const dx   = lastDX.current
    const dy   = lastDY.current
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist >= SWIPE_THRESHOLD) {
      // 스와이프 방향 벡터를 EXIT_DISTANCE 길이로 정규화
      const scale = EXIT_DISTANCE / dist
      doSwipe(dx, dy, dx * scale, dy * scale)
    } else {
      setDragX(0)
      setDragY(0)
    }
  }

  const doSwipe = (dx, dy, tx, ty) => {
    setExitX(tx)
    setExitY(ty)
    setIsExiting(true)
    setIsAnimating(true)
    setDragX(0)
    setDragY(0)

    setTimeout(() => {
      const next = dx < 0
        ? (activeIdx + 1) % CARDS.length
        : (activeIdx - 1 + CARDS.length) % CARDS.length
      setActiveIdx(next)
      onPageChange?.(CARDS[next].id)
      setIsExiting(false)
      setIsAnimating(false)
    }, 340)
  }

  return (
    <div
      data-inspect="HeroBanner"
      style={{
        position:    'relative',
        width:       '375px',
        height:      '488px',
        flexShrink:  0,
        touchAction: 'pan-y',
        userSelect:  'none',
        cursor:      dragging ? 'grabbing' : 'grab',
        ...style,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {CARDS.map((card, cardIdx) => {
        const pos    = stackPos(cardIdx)
        const base   = STACK[pos]
        const isFront = pos === 0
        const isMid   = pos === 1

        // ── 위치 계산 ───────────────────────────────────────
        let tx    = base.tx
        let ty    = base.ty
        let rot   = base.rot
        let scale = base.scale
        let opacity    = 1
        let transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.38s ease'

        if (isFront) {
          if (isExiting) {
            // 스와이프 완료 → 실제 스와이프 방향으로 날아감 + 투명해짐
            tx         = exitX
            ty         = exitY
            opacity    = 0
            transition = 'transform 0.38s ease-in, opacity 0.32s ease-in'
          } else {
            // 드래그 중 → 손가락/포인터를 그대로 따라감 (X·Y 모두)
            tx         = dragX
            ty         = dragY
            rot        = base.rot + dragX * 0.025   // X 방향 드래그에 따라 살짝 기울어짐
            transition = dragging ? 'none' : 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }
        } else if (isMid) {
          // 뒷 카드: 앞 카드가 드래그될수록 앞으로 올라옴
          tx    = base.tx    * (1 - progress * 0.5)
          ty    = base.ty    * (1 - progress * 0.5)
          scale = base.scale + (STACK[0].scale - base.scale) * progress * 0.7
          rot   = base.rot   + (STACK[0].rot   - base.rot)   * progress * 0.4
          transition = (dragging && !isAnimating)
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }
        // far-back 카드는 위치 고정 (STACK[2] 그대로)

        return (
          <div
            key={card.id}
            style={{
              position:        'absolute',
              top:             '50%',
              left:            '50%',
              width:           '335px',
              height:          '447px',
              transform:       `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${scale})`,
              zIndex:          base.z,
              opacity,
              transition,
              borderRadius:    '12px',
              overflow:        'hidden',
              backgroundColor: card.bg,
              boxShadow:       isFront
                ? '0 16px 40px rgba(0,0,0,0.28)'
                : '0 4px 12px rgba(0,0,0,0.10)',
            }}
          >
            {card.layers.map((src, li) => (
              <img
                key={li}
                src={src}
                alt=""
                draggable={false}
                style={{
                  position:      'absolute',
                  inset:         0,
                  width:         '100%',
                  height:        '100%',
                  objectFit:     'cover',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </div>
        )
      })}

      {/* 하단 dot indicator */}
      <div style={{
        position:  'absolute',
        bottom:    '16px',
        left:      '50%',
        transform: 'translateX(-50%)',
        display:   'flex',
        gap:       '6px',
        zIndex:    10,
        pointerEvents: 'none',
      }}>
        {CARDS.map((card, idx) => {
          const active = stackPos(idx) === 0
          return (
            <div
              key={card.id}
              style={{
                width:           active ? '20px' : '6px',
                height:          '6px',
                borderRadius:    '9999px',
                backgroundColor: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                transition:      'all 0.3s ease',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

HeroBanner.pages      = ['1', '2', '3']
HeroBanner.pageLabels = { '1': 'Dark', '2': 'Light', '3': 'Yellow' }

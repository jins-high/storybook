// Stepper — Figma node 1997:22392
// Props: count, min, max, onChange

import { useState } from 'react'
import { IconPlusFill, IconMinusFill } from '../icons/icons.jsx'

export function Stepper({
  count:    countProp = 1,
  min       = 1,
  max       = 10,
  onChange  = undefined,
}) {
  const [internal, setInternal] = useState(countProp)
  const count    = onChange !== undefined ? countProp : internal
  const isAtMin  = count <= min
  const isAtMax  = count >= max

  const handleMinus = () => {
    if (isAtMin) return
    const next = count - 1
    setInternal(next)
    onChange?.(next)
  }

  const handlePlus = () => {
    if (isAtMax) return
    const next = count + 1
    setInternal(next)
    onChange?.(next)
  }

  return (
    <div
      data-inspect="Stepper"
      style={{
        display:    'flex',
        alignItems: 'center',
      }}
    >
      {/* − button */}
      <button
        onClick={handleMinus}
        disabled={isAtMin}
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          padding:         'var(--spacing-200)',
          border:          'none',
          background:      'transparent',
          cursor:          isAtMin ? 'default' : 'pointer',
          opacity:         isAtMin ? 0.3 : 1,
          flexShrink:      0,
        }}
        aria-label="수량 감소"
      >
        <IconMinusFill size={20} color="var(--text-icon-normal)" />
      </button>

      {/* Count */}
      <div
        style={{
          width:          '32px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '20px',
          fontWeight:     500,
          lineHeight:     1.3,
          letterSpacing:  '-0.25px',
          color:          'var(--text-icon-normal)',
          userSelect:     'none',
        }}
      >
        {count}
      </div>

      {/* + button */}
      <button
        onClick={handlePlus}
        disabled={isAtMax}
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          padding:         'var(--spacing-200)',
          border:          'none',
          background:      'transparent',
          cursor:          isAtMax ? 'default' : 'pointer',
          opacity:         isAtMax ? 0.3 : 1,
          flexShrink:      0,
        }}
        aria-label="수량 증가"
      >
        <IconPlusFill size={20} color="var(--text-icon-normal)" />
      </button>
    </div>
  )
}

// OptionList — Figma node 1997:22815
// Props: optionName, price, hasPrice, hasStepper, selected, count, onSelectedChange, onCountChange

import { useState } from 'react'
import { Checkbox } from './Checkbox.jsx'
import { Stepper } from './Stepper.jsx'

export function OptionList({
  optionName        = '샷 추가',
  price             = '500원',
  hasPrice          = true,
  hasStepper        = false,
  selected:  selProp = true,
  count:     cntProp = 1,
  onSelectedChange,
  onCountChange,
}) {
  const [selInt, setSelInt] = useState(selProp)
  const [cntInt, setCntInt] = useState(cntProp)

  const selected = onSelectedChange !== undefined ? selProp : selInt
  const count    = onCountChange    !== undefined ? cntProp : cntInt

  const toggleSelected = () => {
    const next = !selected
    setSelInt(next)
    onSelectedChange?.(next)
  }

  const handleCountChange = (next) => {
    setCntInt(next)
    onCountChange?.(next)
  }

  const textStyle = {
    fontFamily:    'var(--font-family)',
    fontSize:      '16px',
    fontWeight:    500,
    lineHeight:    1.35,
    letterSpacing: '-0.25px',
    whiteSpace:    'nowrap',
  }

  return (
    <div
      data-inspect="OptionList"
      onClick={toggleSelected}
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        'var(--spacing-300)',
        height:     '28px',
        width:      '327px',
        cursor:     'pointer',
        userSelect: 'none',
      }}
    >
      {/* Checkbox — visible only when selected (Figma: selection=true) */}
      {selected && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ padding: '2px', flexShrink: 0, display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            state="Checked"
            size="Medium"
            style="Default"
            onChange={toggleSelected}
          />
        </div>
      )}

      {/* Option name + Price */}
      <div
        style={{
          display:    'flex',
          flex:       '1 0 0',
          gap:        'var(--spacing-200)',
          alignItems: 'center',
          minWidth:   0,
        }}
      >
        <span style={{ ...textStyle, color: 'var(--text-icon-normal)' }}>
          {optionName}
        </span>
        {hasPrice && (
          <span style={{ ...textStyle, color: 'var(--text-icon-info)' }}>
            {price}
          </span>
        )}
      </div>

      {/* Stepper */}
      {hasStepper && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ flexShrink: 0 }}
        >
          <Stepper
            count={count}
            min={1}
            max={10}
            onChange={handleCountChange}
          />
        </div>
      )}
    </div>
  )
}

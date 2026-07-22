// CheckboxInput — 모바일오더 라이브러리 / Figma node 9890-1580
// 텍스트 레이블이 있는 체크박스 (체크박스 + 라벨)
// Props:
//   state     : 'Checked' | 'Unchecked' | 'Indeterminate' | 'Disabled' | 'UncheckedDisabled'
//   size      : 'Small' | 'Medium'
//   label     : string (레이블 텍스트)
//   onChange  : function (새로운 state)

import { Checkbox } from './Checkbox'

const sizeConfig = {
  Small:  { fontSize: '12px', gap: '6px', lineHeight: '1.4' },
  Medium: { fontSize: '14px', gap: '8px', lineHeight: '1.4' },
}

export function CheckboxInput({
  state = 'Unchecked',
  size = 'Medium',
  label = '텍스트',
  onChange = () => {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.Medium
  const isDisabled = state === 'Disabled' || state === 'UncheckedDisabled'

  const handleChange = (newState) => {
    onChange(newState)
  }

  return (
    <label
      data-inspect="CheckboxInput"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: cfg.gap,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-family)',
        userSelect: 'none',
      }}
    >
      <Checkbox
        state={state}
        size={size}
        onChange={handleChange}
      />
      <span style={{
        fontSize: cfg.fontSize,
        fontWeight: 400,
        lineHeight: cfg.lineHeight,
        color: isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)',
      }}>
        {label}
      </span>
    </label>
  )
}

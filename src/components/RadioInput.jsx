// RadioInput — 모바일오더 라이브러리 / Figma node 10412-17695
// 텍스트 레이블이 있는 라디오 버튼 (라디오 + 라벨)
// Props:
//   state     : 'Selected' | 'Unselected' | 'Disabled' | 'UncheckedDisabled'
//   size      : 'Small' | 'Medium'
//   label     : string (레이블 텍스트)
//   onChange  : function (새로운 state)

import { Radio } from './Radio'

const sizeConfig = {
  Small:  { fontSize: '14px', gap: 'var(--spacing-200)', lineHeight: '1.35', letterSpacing: '-0.25px' },
  Medium: { fontSize: '15px', gap: 'var(--spacing-300)', lineHeight: '1.35', letterSpacing: '-0.25px' },
}

export function RadioInput({
  state = 'Unselected',
  size = 'Medium',
  label = '텍스트',
  onChange = () => {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.Medium
  const isDisabled = state === 'Disabled' || state === 'UncheckedDisabled'

  return (
    <label
      data-inspect="RadioInput"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: cfg.gap,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-family)',
        userSelect: 'none',
      }}
    >
      <Radio
        state={state}
        size={size}
        onChange={onChange}
      />
      <span style={{
        fontSize: cfg.fontSize,
        fontWeight: 400,
        lineHeight: cfg.lineHeight,
        letterSpacing: cfg.letterSpacing,
        color: isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)',
      }}>
        {label}
      </span>
    </label>
  )
}

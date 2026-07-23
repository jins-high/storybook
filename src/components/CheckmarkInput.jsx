// CheckmarkInput — 모바일오더 라이브러리 / Figma node 11549-1642
// 텍스트 레이블이 있는 체크마크 (체크마크 + 라벨)
// Props:
//   state     : 'Checked' | 'Unchecked' | 'Disabled'
//   size      : 'Small' | 'Medium'
//   label     : string (레이블 텍스트)
//   onChange  : function (새로운 state)

import { Checkmark } from './Checkmark'

const sizeConfig = {
  Small:  { fontSize: '14px', gap: 'var(--spacing-200)' },
  Medium: { fontSize: '16px', gap: 'var(--spacing-300)' },
}

export function CheckmarkInput({
  state = 'Checked',
  size = 'Medium',
  label = '텍스트',
  onChange = () => {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.Medium
  const isDisabled = state === 'Disabled'

  return (
    <label
      data-inspect="CheckmarkInput"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: '24px',
        gap: cfg.gap,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-family)',
        userSelect: 'none',
      }}
    >
      <Checkmark
        state={state}
        size="Medium"
        onChange={onChange}
      />
      <span style={{
        fontSize: cfg.fontSize,
        fontWeight: 400,
        lineHeight: 1.35,
        letterSpacing: '-0.25px',
        color: isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)',
      }}>
        {label}
      </span>
    </label>
  )
}

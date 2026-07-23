// Checkmark — 모바일오더 라이브러리 / Figma node 9485-7179
// 체크마크 아이콘 (박스 없이 체크 아이콘만 표시)
// Props:
//   state     : 'Checked' | 'Unchecked' | 'Disabled'
//   size      : 'Small' | 'Medium'
//   style     : 'Default' | 'Thin'
//   onChange  : function (새로운 state)

const sizeConfig = {
  Small:  { box: 16 },
  Medium: { box: 20 },
}

const strokeConfig = {
  Default: { Small: 2, Medium: 2.2 },
  Thin:    { Small: 1.5, Medium: 1.8 },
}

function CheckIcon({ size, strokeWidth, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10.5L8.5 15L16 5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Checkmark({
  state = 'Checked',
  size = 'Medium',
  style = 'Default',
  onChange = () => {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.Medium
  const sw = (strokeConfig[style] ?? strokeConfig.Default)[size] ?? 2

  const isDisabled = state === 'Disabled'

  const handleClick = () => {
    if (isDisabled) return
    const nextState = state === 'Checked' ? 'Unchecked' : 'Checked'
    onChange(nextState)
  }

  const color = state === 'Checked'
    ? 'var(--surface-primary-solid)'
    : state === 'Disabled'
    ? 'var(--text-icon-disabled)'
    : 'var(--text-icon-assistive)'

  return (
    <button
      data-inspect="Checkmark"
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        padding: style === 'Thin' ? '2px 0' : '2px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        lineHeight: 0,
        appearance: 'none',
        WebkitAppearance: 'none',
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label={`Checkmark ${state}`}
    >
      <CheckIcon size={cfg.box} strokeWidth={sw} color={color} />
    </button>
  )
}

// Checkbox — 모바일오더 라이브러리 / Figma node 9476-17111
// 체크박스 컨트롤 (State, Size, Style 지원)
// Props:
//   state     : 'Checked' | 'Unchecked' | 'Indeterminate' | 'Disabled' | 'UncheckedDisabled'
//   size      : 'Small' | 'Medium'
//   style     : 'Default' | 'Thin'
//   onChange  : function (새로운 state)

const sizeConfig = {
  Small:  { box: 16, check: 10, strokeWidth: 1.5 },
  Medium: { box: 20, check: 12, strokeWidth: 2 },
}

function CheckIcon({ size, strokeWidth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DashIcon({ size, strokeWidth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M2 5H8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function Checkbox({
  state = 'Unchecked',
  size = 'Medium',
  style = 'Default',
  onChange = () => {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.Medium
  const strokeWidth = style === 'Thin' ? 1.5 : cfg.strokeWidth

  const isDisabled = state === 'Disabled' || state === 'UncheckedDisabled'
  const isIndeterminate = state === 'Indeterminate'
  const isChecked = state === 'Checked'

  const handleClick = () => {
    if (isDisabled) return
    let nextState
    if (state === 'Unchecked') nextState = 'Checked'
    else if (state === 'Checked') nextState = 'Unchecked'
    else if (state === 'Indeterminate') nextState = 'Unchecked'
    else if (state === 'UncheckedDisabled') nextState = 'UncheckedDisabled'
    else nextState = 'Unchecked'
    onChange(nextState)
  }

  const bgColor = isDisabled
    ? 'var(--surface-disabled)'
    : isChecked || isIndeterminate
    ? 'var(--primary-bgsolid)'
    : 'var(--surface-base)'

  const borderColor = isDisabled
    ? 'var(--border-disabled)'
    : isChecked || isIndeterminate
    ? 'var(--primary-bgsolid)'
    : 'var(--border-normal)'

  const boxStyle = {
    width: `${cfg.box}px`,
    height: `${cfg.box}px`,
    borderRadius: '4px',
    border: `1.5px solid ${borderColor}`,
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s, border-color 0.15s',
    color: isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-base)',
    opacity: isDisabled ? 0.6 : 1,
  }

  return (
    <button
      data-inspect="Checkbox"
      onClick={handleClick}
      disabled={isDisabled}
      style={boxStyle}
      aria-label={`Checkbox ${state}`}
    >
      {isIndeterminate && <DashIcon size={cfg.check} strokeWidth={strokeWidth} />}
      {!isIndeterminate && isChecked && <CheckIcon size={cfg.check} strokeWidth={strokeWidth} />}
    </button>
  )
}

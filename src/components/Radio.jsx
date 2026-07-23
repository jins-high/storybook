// Radio — 모바일오더 라이브러리 / Figma node 9476-17126
// 라디오 버튼 컨트롤 (State, Size, Style 지원)
// Props:
//   state     : 'Selected' | 'Unselected' | 'Disabled' | 'UncheckedDisabled'
//   size      : 'Small' | 'Medium'
//   style     : 'Default' | 'Thin'
//   onChange  : function (새로운 state)

const sizeConfig = {
  Small:  { box: 16, dot: 6, borderWidth: 1 },
  Medium: { box: 20, dot: 8, borderWidth: 1.5 },
}

export function Radio({
  state = 'Unselected',
  size = 'Medium',
  style = 'Default',
  onChange = () => {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.Medium

  const isDisabled = state === 'Disabled' || state === 'UncheckedDisabled'
  const isSelected = state === 'Selected' || state === 'Disabled'

  const handleClick = () => {
    if (isDisabled) return
    const nextState = state === 'Unselected' ? 'Selected' : 'Unselected'
    onChange(nextState)
  }

  const bgColor = state === 'UncheckedDisabled'
    ? 'var(--surface-normal-subtle)'
    : state === 'Disabled'
    ? 'var(--surface-heavy-subtle)'
    : isSelected
    ? 'var(--surface-primary-solid)'
    : 'transparent'

  const hasBorder = state === 'Unselected' || state === 'UncheckedDisabled'
  const borderColor = state === 'UncheckedDisabled'
    ? 'var(--border-light)'
    : 'var(--border-heavy)'

  const boxStyle = {
    width: `${cfg.box}px`,
    height: `${cfg.box}px`,
    borderRadius: '50%',
    border: hasBorder ? `${cfg.borderWidth}px solid ${borderColor}` : 'none',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s, border-color 0.15s',
    boxSizing: 'border-box',
  }

  const wrapperStyle = {
    padding: style === 'Thin' ? '2px 0' : '2px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    lineHeight: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
    fontFamily: 'inherit',
  }

  return (
    <button
      data-inspect="Radio"
      onClick={handleClick}
      disabled={isDisabled}
      style={wrapperStyle}
      aria-label={`Radio ${state}`}
    >
      <div style={boxStyle}>
        {isSelected && (
          <div style={{
            width: `${cfg.dot}px`,
            height: `${cfg.dot}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--text-icon-base)',
            flexShrink: 0,
          }} />
        )}
      </div>
    </button>
  )
}

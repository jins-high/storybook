/**
 * Checkbox Component
 *
 * CSS variable names match Figma exactly:
 *   --primary-bgsolid       → Primary/BgSolid
 *   --text-icon-base      → Text&Icon/Static   (ampersand)
 *   --text-icon-normal      → Text&Icon/Normal
 *   --text-icon-disabled    → Text&Icon/Disabled
 *   --surface-base      → Backcround/White   (Figma typo)
 *   --surface-heavy-subtle       → Backcround/Dark
 *   --border-heavy           → Border/Dark
 *   --border-light          → Border/Light
 *   --radius/surface/*      → Radius/Surface/*
 */

const sizeConfig = {
  lg: { box: 20, check: 12, radius: 'var(--radius-fixed-200)', fontSize: '16px' },
  md: { box: 16, check: 10, radius: 'var(--radius-fixed-100)',  fontSize: '14px' },
  sm: { box: 14, check: 8,  radius: 'var(--radius-fixed-100)',  fontSize: '12px' },
}

function CheckIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DashIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  size = 'md',
  label = '',
  onChange,
  style = {},
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.md
  const isActive = checked || indeterminate

  const boxStyle = {
    width:           `${cfg.box}px`,
    height:          `${cfg.box}px`,
    borderRadius:    cfg.radius,
    border:          isActive && !disabled
      ? 'none'
      : `1.5px solid ${disabled ? 'var(--border-light)' : 'var(--border-heavy)'}`,
    backgroundColor: disabled
      ? 'var(--surface-heavy-subtle)'
      : isActive
      ? 'var(--primary-bgsolid)'
      : 'var(--surface-base)',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
    cursor:          disabled ? 'not-allowed' : 'pointer',
    transition:      'background-color 0.15s, border-color 0.15s',
    color:           disabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-base)',
  }

  return (
    <div
      data-inspect="Checkbox"
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        '8px',
        cursor:     disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-family)',
        userSelect: 'none',
        ...style,
      }}
      onClick={() => !disabled && onChange?.(!checked)}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => e.key === ' ' && !disabled && onChange?.(!checked)}
    >
      <div style={boxStyle}>
        {indeterminate && <DashIcon size={cfg.check} />}
        {!indeterminate && checked && <CheckIcon size={cfg.check} />}
      </div>
      {label && (
        <span style={{
          fontSize:      cfg.fontSize,
          fontWeight:    400,
          letterSpacing: '-0.25px',
          lineHeight:    1.35,
          color:         disabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

Checkbox.tokenUsage = (checked, indeterminate) => {
  const isActive = checked || indeterminate
  return {
    box:    isActive ? 'primary/bgsolid' : 'backcround/white',
    icon:   isActive ? 'text&icon/static' : '—',
    border: isActive ? '—' : 'border/dark',
  }
}

Checkbox.sizes = ['lg', 'md', 'sm']

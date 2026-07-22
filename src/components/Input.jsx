/**
 * Input (Text Field) Component
 *
 * CSS variable names match Figma exactly:
 *   --surface-base      → Backcround/White   (Figma typo)
 *   --surface-heavy-subtle       → Backcround/Dark
 *   --text-icon-normal      → Text&Icon/Normal   (ampersand)
 *   --text-icon-assistive   → Text&Icon/Assistive
 *   --text-icon-disabled    → Text&Icon/Disabled
 *   --border-normal         → Border/Normal
 *   --border-light          → Border/Light
 *   --primary-bdsolid       → Primary/BdSolid
 *   --status/error/*        → Status/Error/*
 *   --status/success/*      → Status/Success/*
 */

import { useState } from 'react'

const sizeConfig = {
  lg: { height: '48px', padding: '0 16px', fontSize: '16px', borderRadius: 'var(--radius-default-400)'  },
  md: { height: '40px', padding: '0 14px', fontSize: '14px', borderRadius: 'var(--radius-default-400)'  },
  sm: { height: '32px', padding: '0 12px', fontSize: '14px', borderRadius: 'var(--radius-fixed-200)' },
}

const stateConfig = {
  default: {
    border:          '1.5px solid var(--border-normal)',
    backgroundColor: 'var(--surface-base)',
    color:           'var(--text-icon-normal)',
    focusBorder:     'var(--primary-bdsolid)',
    labelColor:      'var(--text-icon-assistive)',
    helperColor:     'var(--text-icon-assistive)',
    tokenBorder:     'border/normal',
  },
  error: {
    border:          '1.5px solid var(--status-error-bdsolid)',
    backgroundColor: 'var(--surface-base)',
    color:           'var(--text-icon-normal)',
    focusBorder:     'var(--status-error-bdsolid)',
    labelColor:      'var(--status-error-text-icon)',
    helperColor:     'var(--status-error-text-icon)',
    tokenBorder:     'status/error/bdsolid',
  },
  success: {
    border:          '1.5px solid var(--status-success-bdsolid)',
    backgroundColor: 'var(--surface-base)',
    color:           'var(--text-icon-normal)',
    focusBorder:     'var(--status-success-bdsolid)',
    labelColor:      'var(--text-icon-assistive)',
    helperColor:     'var(--status-success-text-icon)',
    tokenBorder:     'status/success/bdsolid',
  },
}

export function Input({
  size = 'md',
  state = 'default',
  disabled = false,
  label = '',
  placeholder = 'Enter text...',
  helperText = '',
  value: controlledValue,
  defaultValue = '',
  onChange,
  leadingIcon = null,
  trailingIcon = null,
  style = {},
}) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [focused, setFocused] = useState(false)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const sz = sizeConfig[size] ?? sizeConfig.md
  const st = disabled ? {
    border:          '1.5px solid var(--border-light)',
    backgroundColor: 'var(--surface-heavy-subtle)',
    color:           'var(--text-icon-disabled)',
    focusBorder:     null,
    labelColor:      'var(--text-icon-disabled)',
    helperColor:     'var(--text-icon-disabled)',
    tokenBorder:     'border/light',
  } : (stateConfig[state] ?? stateConfig.default)

  const wrapperStyle = {
    position:        'relative',
    display:         'flex',
    alignItems:      'center',
    height:          sz.height,
    borderRadius:    sz.borderRadius,
    border:          focused && !disabled && st.focusBorder
      ? `1.5px solid ${st.focusBorder}`
      : st.border,
    backgroundColor: st.backgroundColor,
    transition:      'border-color 0.15s',
    cursor:          disabled ? 'not-allowed' : 'text',
    overflow:        'hidden',
  }

  const inputStyle = {
    flex:       1,
    border:     'none',
    outline:    'none',
    background: 'transparent',
    color:      disabled ? 'var(--text-icon-disabled)' : st.color,
    fontSize:   sz.fontSize,
    fontFamily: 'inherit',
    padding:    sz.padding,
    lineHeight:    1.35,
    letterSpacing: '-0.25px',
    cursor:     disabled ? 'not-allowed' : 'text',
    width:      '100%',
  }

  return (
    <div data-inspect="Input" style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-family)', ...style }}>
      {label && (
        <label style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '-0.25px', color: st.labelColor }}>
          {label}
        </label>
      )}
      <div style={wrapperStyle}>
        {leadingIcon && (
          <span style={{ paddingLeft: '12px', color: 'var(--text-icon-assistive)', display: 'flex', alignItems: 'center' }}>
            {leadingIcon}
          </span>
        )}
        <input
          style={inputStyle}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => {
            setInternalValue(e.target.value)
            onChange?.(e)
          }}
        />
        {trailingIcon && (
          <span style={{ paddingRight: '12px', color: 'var(--text-icon-assistive)', display: 'flex', alignItems: 'center' }}>
            {trailingIcon}
          </span>
        )}
      </div>
      {helperText && (
        <span style={{ fontSize: '12px', letterSpacing: '-0.25px', color: st.helperColor }}>
          {helperText}
        </span>
      )}
    </div>
  )
}

Input.tokenUsage = (state) => {
  const st = stateConfig[state] ?? stateConfig.default
  return {
    background: 'backcround/white',
    text:       'text&icon/normal',
    border:     st.tokenBorder,
    focus:      state === 'error'   ? 'status/error/bdsolid'
              : state === 'success' ? 'status/success/bdsolid'
              : 'primary/bdsolid',
  }
}

Input.sizes  = Object.keys(sizeConfig)
Input.states = Object.keys(stateConfig)

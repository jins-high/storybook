// TextField — 모바일오더 라이브러리 / Figma node 2763:19745
// Props: state, hasLabel, labelText, hasLeadingIcon, placeholder, value, onChange,
//        hasTrailingIcon, hasTrailingButton, trailingButtonLabel, onTrailingButtonClick,
//        hasCount, maxCount, hasHelperText, helperText, onClear
import { useState } from 'react'
import { IconClose, IconSearch } from '../icons/icons.jsx'

const STATES = ['Default', 'Focused', 'Filled', 'Error', 'Disabled', 'ReadOnly']

function getBorderStyle(state) {
  if (state === 'Focused')  return '1.5px solid var(--border-primary-solid)'
  if (state === 'Error')    return '1px solid var(--border-error-subtle)'
  return '1px solid var(--border-heavy)'
}

function getBgColor(state) {
  if (state === 'Disabled' || state === 'ReadOnly') return 'var(--surface-normal-subtle)'
  return 'transparent'
}

function getLabelColor(state) {
  if (state === 'Error') return 'var(--text-icon-error)'
  return 'var(--text-icon-alternative)'
}

function getHelperColor(state) {
  if (state === 'Error') return 'var(--text-icon-error)'
  return 'var(--text-icon-alternative)'
}

export function TextField({
  state               = 'Default',
  hasLabel            = true,
  labelText           = '레이블',
  hasLeadingIcon      = false,
  hasPlaceholder      = true,
  placeholderText     = '입력해주세요',
  // legacy alias kept for backward compat
  placeholder,
  value               = '',
  onChange            = () => {},
  hasTrailingIcon     = false,
  onClear             = () => {},
  hasTrailingButton   = false,
  trailingButtonLabel = '중복확인',
  onTrailingButtonClick = () => {},
  hasCount            = false,
  maxCount            = 12,
  hasHelperText       = false,
  helperText          = '도움말 텍스트입니다.',
}) {
  // support old `placeholder` prop name
  const resolvedPlaceholder = placeholder ?? placeholderText
  const [localFocused, setLocalFocused] = useState(false)

  const isDisabled = state === 'Disabled'
  const isReadOnly = state === 'ReadOnly'

  const effectiveState = state === 'Default'
    ? (localFocused ? 'Focused' : (value ? 'Filled' : 'Default'))
    : state

  const showLabel = hasLabel
  const showLabelChip = showLabel && (
    effectiveState === 'Default'  ||
    effectiveState === 'Focused'  ||
    effectiveState === 'Filled'   ||
    effectiveState === 'Error'    ||
    effectiveState === 'Disabled' ||
    effectiveState === 'ReadOnly'
  )

  const countText = hasCount ? `${String(value).length}/${maxCount}` : ''

  return (
    <div
      data-inspect="TextField"
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}
    >
      {/* Input row */}
      <div style={{ position: 'relative', paddingTop: showLabelChip ? '8px' : 0 }}>

        {/* Floating label chip */}
        {showLabelChip && (
          <span
            style={{
              position:        'absolute',
              top:             0,
              left:            '12px',
              zIndex:          1,
              backgroundColor: 'var(--surface-normal-subtle)',
              padding:         '2px 4px',
              borderRadius:    '4px',
              fontSize:        '12px',
              fontWeight:      500,
              lineHeight:      1.35,
              letterSpacing:   '-0.25px',
              color:           getLabelColor(effectiveState),
              pointerEvents:   'none',
              whiteSpace:      'nowrap',
            }}
          >
            {labelText}
          </span>
        )}

        {/* In frame */}
        <div
          style={{
            display:         'flex',
            flexDirection:   'row',
            alignItems:      'center',
            gap:             '8px',
            paddingLeft:     '16px',
            paddingRight:    '16px',
            height:          '48px',
            borderRadius:    '12px',
            border:          getBorderStyle(effectiveState),
            backgroundColor: getBgColor(effectiveState),
            boxSizing:       'border-box',
          }}
        >
          {/* Leading icon */}
          {hasLeadingIcon && (
            <span style={{ flexShrink: 0, display: 'flex', color: 'var(--text-icon-assistive)' }}>
              <IconSearch style={{ width: 24, height: 24 }} />
            </span>
          )}

          {/* Input */}
          <input
            type="text"
            placeholder={hasPlaceholder ? (!showLabelChip ? (hasLabel ? labelText : resolvedPlaceholder) : resolvedPlaceholder) : undefined}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setLocalFocused(true)}
            onBlur={() => setLocalFocused(false)}
            disabled={isDisabled}
            readOnly={isReadOnly}
            maxLength={hasCount ? maxCount : undefined}
            style={{
              flex:            1,
              minWidth:        0,
              border:          'none',
              outline:         'none',
              backgroundColor: 'transparent',
              fontSize:        '16px',
              fontWeight:      400,
              lineHeight:      1.35,
              letterSpacing:   '-0.25px',
              fontFamily:      'inherit',
              color:           isDisabled
                ? 'var(--text-icon-disabled)'
                : 'var(--text-icon-normal)',
              cursor:          isReadOnly ? 'default' : isDisabled ? 'not-allowed' : 'text',
            }}
          />

          {/* Count */}
          {hasCount && (
            <span style={{
              flexShrink:    0,
              fontSize:      '14px',
              fontWeight:    400,
              color:         'var(--text-icon-alternative)',
              whiteSpace:    'nowrap',
            }}>
              {countText}
            </span>
          )}

          {/* Trailing clear icon */}
          {hasTrailingIcon && value && !isDisabled && !isReadOnly && (
            <button
              onClick={() => { onChange(''); onClear() }}
              style={{
                flexShrink:      0,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                width:           24,
                height:          24,
                border:          'none',
                backgroundColor: 'transparent',
                cursor:          'pointer',
                padding:         0,
                color:           'var(--text-icon-assistive)',
              }}
            >
              <IconClose style={{ width: 16, height: 16 }} />
            </button>
          )}

          {/* Trailing button */}
          {hasTrailingButton && (
            <button
              onClick={onTrailingButtonClick}
              disabled={isDisabled}
              style={{
                flexShrink:      0,
                border:          'none',
                backgroundColor: 'transparent',
                cursor:          isDisabled ? 'not-allowed' : 'pointer',
                padding:         '0 4px',
                fontSize:        '14px',
                fontWeight:      500,
                letterSpacing:   '-0.25px',
                lineHeight:      1.35,
                fontFamily:      'inherit',
                color:           isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-primary)',
                whiteSpace:      'nowrap',
              }}
            >
              {trailingButtonLabel}
            </button>
          )}
        </div>
      </div>

      {/* Helper / error text */}
      {hasHelperText && (
        <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
          <span style={{
            fontSize:      '14px',
            fontWeight:    400,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         getHelperColor(effectiveState),
          }}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  )
}

TextField.states = STATES

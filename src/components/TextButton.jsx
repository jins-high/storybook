// TextButton — 모바일오더 라이브러리
// Props:
//   size          : 'md' | 'sm'
//   color         : 'primary' | 'assistive'
//   hasLeadingIcon : boolean
//   hasTrailingIcon: boolean
//   state         : 'default' | 'pressed' | 'disabled'
//   label         : string
//   icon          : ReactNode (custom icon)

import { useState } from 'react'
import { typography } from '../tokens/typography.js'

// ── Size specs ────────────────────────────────────
const SIZE = {
  md: { h: '32px', px: '8px', gap: '8px', typo: typography.body.Medium, iconSize: 20, r: 'var(--radius-default-400)' },
  sm: { h: '20px', px: '8px', gap: '4px', typo: typography.label.Medium, iconSize: 16, r: 'var(--radius-default-300)' },
}

// ── Color × State tokens ───────────────────────────
const TOKENS = {
  primary: {
    default:  { color: 'var(--text-icon-primary)' },
    pressed:  { color: 'var(--text-icon-primary)' },
    disabled: { color: 'var(--text-icon-disabled)' },
  },
  assistive: {
    default:  { color: 'var(--text-icon-assistive)' },
    pressed:  { color: 'var(--text-icon-assistive)' },
    disabled: { color: 'var(--text-icon-disabled)' },
  },
}

// ── Token usage for inspector ──────────────────────
const USAGE = {
  primary: {
    default:  { text: 'text-icon-primary' },
    pressed:  { text: 'text-icon-primary' },
    disabled: { text: 'text-icon-disabled' },
  },
  assistive: {
    default:  { text: 'text-icon-assistive' },
    pressed:  { text: 'text-icon-assistive' },
    disabled: { text: 'text-icon-disabled' },
  },
}

// ── Component ──────────────────────────────────────
export function TextButton({
  size            = 'md',
  color           = 'primary',
  hasLeadingIcon  = false,
  hasTrailingIcon = false,
  state           = 'default',
  label           = '버튼명',
  icon            = null,
  onClick,
  style           = {},
}) {
  const [localPressed, setLocalPressed] = useState(false)

  const isDisabled  = state === 'disabled'
  const showPressed = state === 'pressed' || localPressed
  const cfg         = SIZE[size] ?? SIZE.md
  const applied     = TOKENS[color]?.[state] ?? TOKENS.primary.default

  return (
    <button
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={() => !isDisabled && setLocalPressed(true)}
      onMouseUp={() => setLocalPressed(false)}
      onMouseLeave={() => setLocalPressed(false)}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            cfg.gap,
        height:         cfg.h,
        padding:        `0 ${cfg.px}`,
        fontWeight:     cfg.typo.fontWeight,
        fontSize:       `${cfg.typo.fontSize}px`,
        fontFamily:     'var(--font-family)',
        letterSpacing:  `${cfg.typo.letterSpacing}px`,
        lineHeight:     cfg.typo.lineHeight,
        borderRadius:   cfg.r,
        cursor:         isDisabled ? 'not-allowed' : 'pointer',
        whiteSpace:     'nowrap',
        userSelect:     'none',
        outline:        'none',
        border:         'none',
        backgroundColor: 'transparent',
        position:       'relative',
        boxSizing:      'border-box',
        flexShrink:     0,
        color:          applied.color,
        overflow:       'hidden',
        ...style,
      }}
    >
      {/* DarkLayer — Figma Action/DarkLayer: black overlay at 12% opacity on press */}
      <span
        style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: 'var(--surface-heavy-solid)',
          opacity:         showPressed ? 0.12 : 0,
          pointerEvents:   'none',
          zIndex:          0,
        }}
      />

      {hasLeadingIcon && icon && (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 0, position: 'relative', zIndex: 1 }}>
          {icon}
        </span>
      )}
      {label && (
        <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
      )}
      {hasTrailingIcon && icon && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: 0, position: 'relative', zIndex: 1 }}>
          {icon}
        </span>
      )}
    </button>
  )
}

// ── Static metadata ────────────────────────────────
TextButton.tokenUsage = (color, state) => USAGE[color]?.[state] ?? USAGE.primary.default
TextButton.colors     = ['primary', 'assistive']
TextButton.sizes      = ['sm', 'md']
TextButton.states     = ['default', 'pressed', 'disabled']

// Button — 모바일오더 라이브러리 / Figma node 11167:3832
//
// Props:
//   variant        : 'solid' | 'outline'
//   color          : 'primary' | 'assistive'
//   size           : 'lg' | 'md' | 'sm'
//   hasLeadingIcon : boolean
//   hasLabel       : boolean
//   hasTrailingIcon: boolean  (hasLeadingIcon과 동시에 true 불가)
//   state          : 'default' | 'pressed' | 'disabled'
//   label          : string
//   icon           : ReactNode  (custom icon; falls back to GuideIcon)

import { useState } from 'react'
import { typography } from '../tokens/typography.js'

export function GuideIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  )
}

// ── Size specs ────────────────────────────────────────────────
// Large: titleSmall/Medium / Medium: body/Medium / Small: label/Medium
const SIZE = {
  lg: { h: 'var(--dimension-56)', px: 'var(--spacing-600)', gap: 'var(--spacing-400)', typo: typography.titleSmall.Medium, iconSize: 24, r: 'var(--radius-default-500)' },
  md: { h: 'var(--dimension-48)', px: 'var(--spacing-500)', gap: 'var(--spacing-300)', typo: typography.body.Medium,       iconSize: 20, r: 'var(--radius-default-400)'  },
  sm: { h: 'var(--dimension-32)', px: 'var(--spacing-400)', gap: 'var(--spacing-300)', typo: typography.label.Medium,      iconSize: 16, r: 'var(--radius-default-300)' },
}

// ── Color × Variant tokens ─────────────────────────────────────
const TOKENS = {
  solid: {
    primary:  { background: 'var(--surface-primary-solid)',  color: 'var(--text-icon-normal)',      border: 'none' },
    assistive: { background: 'var(--surface-normal-subtle)', color: 'var(--text-icon-alternative)', border: 'none' },
  },
  outline: {
    primary:  { background: 'transparent', color: 'var(--text-icon-primary)',     border: '1px solid var(--border-light)' },
    assistive: { background: 'transparent', color: 'var(--text-icon-alternative)', border: '1px solid var(--border-light)' },
  },
}

const DISABLED = {
  background: 'var(--surface-heavy-subtle)',
  color:      'var(--text-icon-disabled)',
  border:     'none',
}

// ── Token usage for inspector ──────────────────────────────────
const USAGE = {
  solid: {
    primary:  { background: 'surface-primary-solid', text: 'text-icon-normal',      border: '—' },
    assistive: { background: 'surface-normal-subtle', text: 'text-icon-alternative', border: '—' },
  },
  outline: {
    primary:  { background: '—', text: 'text-icon-primary',     border: 'border-light' },
    assistive: { background: '—', text: 'text-icon-alternative', border: 'border-light' },
  },
}

// ── Component ──────────────────────────────────────────────────
export function Button({
  variant         = 'solid',
  color           = 'primary',
  size            = 'md',
  hasLeadingIcon  = false,
  hasLabel        = true,
  hasTrailingIcon = false,
  state           = 'default',
  label           = '버튼명',
  ariaLabel       = undefined,
  icon            = null,
  onClick,
  style           = {},
}) {
  const [localPressed, setLocalPressed] = useState(false)

  const isDisabled  = state === 'disabled'
  const showPressed = state === 'pressed' || localPressed
  const cfg         = SIZE[size] ?? SIZE.md
  const applied     = isDisabled ? DISABLED : (TOKENS[variant]?.[color] ?? TOKENS.solid.primary)
  const isIconOnly  = hasLeadingIcon && !hasLabel
  const iconNode    = icon ?? <GuideIcon size={cfg.iconSize} />

  const sizeStyle = isIconOnly
    ? { width: cfg.h, height: cfg.h, padding: 0 }
    : { height: cfg.h, padding: `0 ${cfg.px}` }

  return (
    <button
      disabled={isDisabled}
      aria-label={isIconOnly ? (ariaLabel ?? label) : ariaLabel}
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={() => !isDisabled && setLocalPressed(true)}
      onMouseUp={() => setLocalPressed(false)}
      onMouseLeave={() => setLocalPressed(false)}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             cfg.gap,
        fontWeight:      cfg.typo.fontWeight,
        fontSize:        `${cfg.typo.fontSize}px`,
        fontFamily:      'var(--font-family)',
        letterSpacing:   `${cfg.typo.letterSpacing}px`,
        lineHeight:      cfg.typo.lineHeight,
        borderRadius:    cfg.r,
        cursor:          isDisabled ? 'not-allowed' : 'pointer',
        whiteSpace:      'nowrap',
        userSelect:      'none',
        outline:         'none',
        overflow:        'hidden',
        position:        'relative',
        boxSizing:       'border-box',
        flexShrink:      0,
        backgroundColor: applied.background,
        color:           applied.color,
        border:          applied.border,
        ...sizeStyle,
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

      {hasLeadingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          {iconNode}
        </span>
      )}
      {hasLabel && (
        <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
      )}
      {hasTrailingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          {iconNode}
        </span>
      )}
    </button>
  )
}

// ── Static metadata ────────────────────────────────────────────
Button.tokenUsage = (variant, color) => USAGE[variant]?.[color] ?? USAGE.solid.primary
Button.variants   = ['solid', 'outline']
Button.colors     = ['primary', 'assistive']
Button.sizes      = ['lg', 'md', 'sm']
Button.states     = ['default', 'pressed', 'disabled']

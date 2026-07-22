// Chip — 모바일오더 라이브러리 / Figma node 11278:12324
// 필터, 태그, 카테고리 선택 등에 사용하는 컴포넌트
// Props:
//   variant        : 'solid' | 'outline'
//   size           : 'lg' | 'md' | 'sm'
//   state          : 'default' | 'active' | 'pressed' | 'disabled'
//   hasLeadingIcon : boolean
//   hasTrailingIcon: boolean
//   label          : string
//   icon           : ReactNode (custom icon)

import { typography } from '../tokens/typography.js'

// ── Size specs ────────────────────────────────────────────────
// Large: 40px / Medium: 32px / Small: 24px
const SIZE = {
  lg: { h: '40px', px: 'var(--spacing-500)', gap: 'var(--spacing-300)', typo: typography.label.Medium, iconSize: 20, r: 'var(--radius-default-400)' },
  md: { h: '32px', px: 'var(--spacing-400)', gap: 'var(--spacing-300)', typo: typography.label.Medium, iconSize: 16, r: 'var(--radius-default-300)' },
  sm: { h: '24px', px: 'var(--spacing-300)', gap: 'var(--spacing-200)', typo: typography.labelSmall.Medium, iconSize: 16, r: 'var(--radius-default-300)' },
}

// ── Color × Variant tokens ─────────────────────────────────────
const TOKENS = {
  solid: {
    default: { bg: 'var(--surface-normal-subtle)', text: 'var(--text-icon-normal)', border: 'none' },
    active:  { bg: 'var(--surface-heavy-solid)', text: 'var(--text-icon-base)', border: 'none' },
    pressed: { bg: 'var(--surface-normal-subtle)', text: 'var(--text-icon-normal)', border: 'none' },
    disabled: { bg: 'var(--surface-heavy-subtle)', text: 'var(--text-icon-disabled)', border: 'none' },
  },
  outline: {
    default: { bg: 'none', text: 'var(--text-icon-normal)', border: '1px solid var(--border-light)' },
    active:  { bg: 'var(--surface-info-subtle)', text: 'var(--text-icon-info)', border: '1px solid var(--border-info-solid)' },
    pressed: { bg: 'none', text: 'var(--text-icon-normal)', border: '1px solid var(--border-light)' },
    disabled: { bg: 'none', text: 'var(--text-icon-disabled)', border: '1px solid var(--border-light)' },
  },
}

export function Chip({
  variant = 'outline',
  size = 'md',
  state = 'default',
  hasLeadingIcon = false,
  hasTrailingIcon = false,
  label = 'Chip',
  icon = null,
  className = '',
}) {
  const sizeSpec = SIZE[size]
  const token = TOKENS[variant][state]

  // Pressed state: DarkLayer overlay (Button과 동일한 구현)
  const darkLayerStyle = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--surface-heavy-solid)',
    opacity: state === 'pressed' ? 0.12 : 0,
    borderRadius: sizeSpec.r,
    pointerEvents: 'none',
  }

  // Disabled state: no pointer events
  const pointerEvents = state === 'disabled' ? 'none' : 'auto'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: sizeSpec.h,
        paddingLeft: sizeSpec.px,
        paddingRight: sizeSpec.px,
        gap: sizeSpec.gap,
        backgroundColor: token.bg,
        color: token.text,
        border: token.border,
        borderRadius: sizeSpec.r,
        fontSize: `${sizeSpec.typo.fontSize}px`,
        fontWeight: sizeSpec.typo.fontWeight,
        lineHeight: sizeSpec.typo.lineHeight,
        letterSpacing: `${sizeSpec.typo.letterSpacing}px`,
        fontFamily: 'var(--font-family)',
        position: 'relative',
        cursor: pointerEvents === 'none' ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: pointerEvents,
      }}
      className={className}
    >
      {/* Leading Icon */}
      {hasLeadingIcon && icon && (
        <span style={{ display: 'flex', flexShrink: 0, width: sizeSpec.iconSize, height: sizeSpec.iconSize }}>
          {icon}
        </span>
      )}

      {/* Label */}
      <span style={{ flex: '0 1 auto', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {label}
      </span>

      {/* Trailing Icon */}
      {hasTrailingIcon && icon && (
        <span style={{ display: 'flex', flexShrink: 0, width: sizeSpec.iconSize, height: sizeSpec.iconSize }}>
          {icon}
        </span>
      )}

      {/* DarkLayer — Figma Action/DarkLayer: black overlay at 12% opacity on press */}
      <div style={darkLayerStyle} />
    </div>
  )
}

// ── Static metadata ────────────────────────────────────────────────
Chip.variants = ['solid', 'outline']
Chip.sizes = ['lg', 'md', 'sm']
Chip.states = ['default', 'active', 'pressed', 'disabled']

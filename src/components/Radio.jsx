/**
 * Radio Component
 * Figma: Control/Radio  (node 9476:17125)
 *        Input/Radio    (node 10412:17696)
 *
 * All 4 states confirmed from Figma MCP:
 *
 *   checked + active   → bg: --primary-bgsolid,   border: none,           dot: --text-icon-base (8px lg / 6px sm)
 *   unchecked + active → bg: transparent,          border: --border-heavy,  dot: none
 *   checked + disabled → bg: --primary-bgsubtle,  border: --border-light, dot: --text-icon-base (8px lg / 6px sm)
 *   unchecked+disabled → bg: --surface-heavy-subtle,   border: --border-heavy,  dot: none
 *
 * Figma token → CSS variable:
 *   --color/primary/bgsolid      → --primary-bgsolid
 *   --color/primary/bgsubtle     → --primary-bgsubtle
 *   --color/text&icon/static     → --text-icon-base
 *   --color/border/heavy  (0.20) → --border-heavy
 *   --color/border/light  (0.12) → --border-light
 *   --color/backcround/heavysubtle (#e3e4e5 = neutral/100) → --surface-heavy-subtle
 *
 * Sizes from Figma (Control/Radio metadata):
 *   lg (size=true):  outer 24×24, circle 20×20, dot 8×8
 *   sm (size=false): outer 20×20, circle 16×16, dot 6×6
 *
 * Label: bodySmall/Regular — 15px / w400 / lh1.35 / ls-0.25px (same for both sizes)
 */

const SIZE = {
  lg: { outer: 24, circle: 20, dot: 8  },
  sm: { outer: 20, circle: 16, dot: 6  },
}

// ─────────────────────────────────────────────────────────
// token helpers — returns [backgroundColor, border, dotColor]
function resolveTokens(checked, disabled) {
  if (checked && !disabled) {
    return {
      bg:     'var(--primary-bgsolid)',
      border: 'none',
      dot:    'var(--text-icon-base)',
    }
  }
  if (!checked && !disabled) {
    return {
      bg:     'transparent',
      border: '1px solid var(--border-heavy)',
      dot:    null,
    }
  }
  if (checked && disabled) {
    return {
      bg:     'var(--primary-bgsubtle)',
      border: '1px solid var(--border-light)',
      dot:    'var(--text-icon-base)',
    }
  }
  // unchecked + disabled
  return {
    bg:     'var(--surface-heavy-subtle)',
    border: '1px solid var(--border-heavy)',
    dot:    null,
  }
}

// ─────────────────────────────────────────────────────────
export function Radio({
  checked  = false,
  disabled = false,
  size     = 'lg',
  label    = '',
  onChange,
  style    = {},
}) {
  const s      = SIZE[size] ?? SIZE.lg
  const tokens = resolveTokens(checked, disabled)

  return (
    <div
      data-inspect="Radio"
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        '6px',
        cursor:     disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-family)',
        userSelect: 'none',
        ...style,
      }}
      onClick={() => !disabled && onChange?.(!checked)}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => e.key === ' ' && !disabled && onChange?.(!checked)}
    >
      {/* Outer wrapper — matches Figma p-[2px] container */}
      <div style={{
        width:          `${s.outer}px`,
        height:         `${s.outer}px`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}>
        {/* Circle — matches Figma "Box" node */}
        <div style={{
          width:           `${s.circle}px`,
          height:          `${s.circle}px`,
          borderRadius:    '50%',
          backgroundColor: tokens.bg,
          border:          tokens.border,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          transition:      'background-color 0.15s, border-color 0.15s',
          flexShrink:      0,
          boxSizing:       'border-box',
        }}>
          {/* Dot — shown only when checked (active or disabled) */}
          {tokens.dot && (
            <div style={{
              width:           `${s.dot}px`,
              height:          `${s.dot}px`,
              borderRadius:    '50%',
              backgroundColor: tokens.dot,
              flexShrink:      0,
            }} />
          )}
        </div>
      </div>

      {/* Label — bodySmall/Regular: 15px / w400 / lh1.35 / ls-0.25px */}
      {label && (
        <span style={{
          fontSize:      '15px',
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

// ─────────────────────────────────────────────────────────
// Token usage for the right-panel inspector
Radio.tokenUsage = (checked, disabled) => {
  if (checked && !disabled) return {
    circle: 'primary-bgsolid',
    border: '—',
    dot:    'text-icon-base',
    label:  'text-icon-normal',
  }
  if (!checked && !disabled) return {
    circle: '—',
    border: 'border-heavy',
    dot:    '—',
    label:  'text-icon-normal',
  }
  if (checked && disabled) return {
    circle: 'primary-bgsubtle',
    border: 'border-light',
    dot:    'text-icon-base',
    label:  'text-icon-disabled',
  }
  // unchecked + disabled
  return {
    circle: 'surface-heavy-subtle',
    border: 'border-heavy',
    dot:    '—',
    label:  'text-icon-disabled',
  }
}

Radio.sizes = ['lg', 'sm']

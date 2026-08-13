// IconButton — Figma node 11206:122035 (Actions/IconButton)
// Props:
//   variant : 'solid' | 'outline' | 'normal'
//   size    : 'md' | 'sm'
//   state   : 'default' | 'pressed' | 'disabled'
//   icon    : ReactNode (falls back to GuideIcon)

import { useState } from 'react'
import { GuideIcon } from './Button.jsx'

const SIZE = {
  md: { box: '40px', iconSize: 24 },
  sm: { box: '32px', iconSize: 16 },
}

const TOKENS = {
  solid:   { background: 'var(--surface-primary-solid)',  color: 'var(--static-black)',           border: 'none' },
  outline: { background: 'transparent',                   color: 'var(--text-icon-normal)',        border: '1px solid var(--border-light)' },
  normal:  { background: 'transparent',                   color: 'var(--text-icon-normal)',        border: 'none' },
}

const DISABLED = {
  background: 'var(--surface-heavy-subtle)',
  color:      'var(--text-icon-disabled)',
  border:     'none',
}

export function IconButton({
  variant = 'solid',
  size    = 'md',
  state   = 'default',
  icon    = null,
  onClick,
  ariaLabel,
  style = {},
}) {
  const [localPressed, setLocalPressed] = useState(false)

  const isDisabled  = state === 'disabled'
  const showPressed = state === 'pressed' || localPressed
  const cfg         = SIZE[size] ?? SIZE.md
  const applied     = isDisabled ? DISABLED : (TOKENS[variant] ?? TOKENS.solid)
  const iconNode    = icon ?? <GuideIcon size={cfg.iconSize} />

  return (
    <button
      disabled={isDisabled}
      aria-label={ariaLabel}
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={() => !isDisabled && setLocalPressed(true)}
      onMouseUp={() => setLocalPressed(false)}
      onMouseLeave={() => setLocalPressed(false)}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           cfg.box,
        height:          cfg.box,
        padding:         0,
        borderRadius:    'var(--radius-default-circle)',
        cursor:          isDisabled ? 'not-allowed' : 'pointer',
        userSelect:      'none',
        outline:         'none',
        overflow:        'hidden',
        position:        'relative',
        boxSizing:       'border-box',
        flexShrink:      0,
        backgroundColor: applied.background,
        color:           applied.color,
        border:          applied.border,
        ...style,
      }}
    >
      {/* ActionDarkLayer/LightLayer — overlay adapts: black in light mode, white in dark mode */}
      <span
        style={{
          position:        'absolute',
          inset:           variant === 'outline' ? '-1px' : 0,
          backgroundColor: 'var(--interactive-press-bg)',
          opacity:         showPressed ? 0.12 : 0,
          pointerEvents:   'none',
          zIndex:          0,
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconNode}
      </span>
    </button>
  )
}

IconButton.variants = ['solid', 'outline', 'normal']
IconButton.sizes    = ['md', 'sm']
IconButton.states   = ['default', 'pressed', 'disabled']

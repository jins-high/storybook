/**
 * Toggle (Switch) Component
 * Figma: Control/Switch  (frame 9476:17148)
 *
 * Confirmed from Figma MCP — exactly 2 sizes, NO disabled state:
 *   lg (size=true):  track 64×29px, thumb 38.4×25px, padding 2px
 *   sm (size=false): track 48×24px, thumb 28.8×21px, padding 1.5px
 *
 * Figma token → CSS variable:
 *   --color/primary/bgsolid        → --primary-bgsolid   (on  track)
 *   --color/backcround/heavysubtle → --surface-heavy-subtle   (off track, neutral-100 #e3e4e5)
 *   --color/text&icon/static       → --text-icon-base  (thumb, white)
 */

const SIZE = {
  lg: { trackW: 64, trackH: 29, thumbW: 38.4, thumbH: 25,  padding: 2   },
  sm: { trackW: 48, trackH: 24, thumbW: 28.8, thumbH: 21,  padding: 1.5 },
}

export function Toggle({
  checked  = false,
  size     = 'lg',
  label    = '',
  onChange,
  style    = {},
}) {
  const cfg    = SIZE[size] ?? SIZE.lg
  const thumbX = checked
    ? cfg.trackW - cfg.thumbW - cfg.padding
    : cfg.padding

  return (
    <div
      data-inspect="Toggle"
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        '10px',
        cursor:     'pointer',
        fontFamily: 'var(--font-family)',
        userSelect: 'none',
        ...style,
      }}
      onClick={() => onChange?.(!checked)}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={e => e.key === ' ' && onChange?.(!checked)}
    >
      <div style={{
        position:        'relative',
        width:           `${cfg.trackW}px`,
        height:          `${cfg.trackH}px`,
        borderRadius:    '9999px',
        backgroundColor: checked ? 'var(--primary-bgsolid)' : 'var(--surface-heavy-subtle)',
        overflow:        'hidden',
        flexShrink:      0,
        transition:      'background-color 0.2s ease',
      }}>
        <div style={{
          position:        'absolute',
          top:             `${cfg.padding}px`,
          left:            `${thumbX}px`,
          width:           `${cfg.thumbW}px`,
          height:          `${cfg.thumbH}px`,
          borderRadius:    '9999px',
          backgroundColor: 'var(--text-icon-base)',
          transition:      'left 0.2s ease',
        }} />
      </div>

      {label && (
        <span style={{
          fontSize:      '15px',
          fontWeight:    400,
          letterSpacing: '-0.25px',
          lineHeight:    1.35,
          color:         'var(--text-icon-normal)',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

Toggle.tokenUsage = (checked) => ({
  track: checked ? 'primary-bgsolid' : 'surface-heavy-subtle',
  thumb: 'text-icon-base',
})

Toggle.sizes = ['lg', 'sm']

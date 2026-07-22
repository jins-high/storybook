/**
 * Switch Component
 * Figma: Control/Switch  (node 9476:17144)
 *
 * Confirmed from Figma MCP (state=true nodes):
 *   track    → rounded-[999px], overflow-hidden, p-[2px]
 *   thumb    → pill shape (h-full, rounded-[999px])
 *   state=on → bg: --primary-bgsolid, thumb at right (justify-end)
 *
 * Sizes confirmed from Figma metadata:
 *   lg (size=true):  track 64×29px, thumb 38×25px
 *   sm (size=false): track 48×24px, thumb 29×20px
 *   (thumb width = track_width × 0.6, rounded; height = track inner height)
 *
 * All 4 states confirmed from Figma MCP (full frame 9476:17148):
 *   state=on,  lg → bg: --primary-bgsolid,   p-[2px],   thumb 38.4×25px, justify-end
 *   state=on,  sm → bg: --primary-bgsolid,   p-[1.5px], thumb 28.8×21px, justify-end
 *   state=off, lg → bg: --surface-heavy-subtle,   p-[2px],   thumb 38.4×25px, justify-start
 *   state=off, sm → bg: --surface-heavy-subtle,   p-[1.5px], thumb 28.8×21px, justify-start
 *
 * Figma token → CSS variable:
 *   --color/primary/bgsolid          → --primary-bgsolid   (on  track bg)
 *   --color/backcround/heavysubtle   → --surface-heavy-subtle   (off track bg, neutral-100 #e3e4e5)
 *   --color/text&icon/static         → --text-icon-base  (thumb, always white)
 *
 * Note: Figma Control/Switch has no disabled state (no disabled variants in frame).
 */

const SIZE = {
  // All values confirmed from Figma MCP (frame 9476:17148)
  //           trackW  trackH  thumbW  thumbH  padding
  //           thumbH = trackH - 2×padding
  lg: { trackW: 64, trackH: 29, thumbW: 38.4, thumbH: 25,  padding: 2   },
  sm: { trackW: 48, trackH: 24, thumbW: 28.8, thumbH: 21,  padding: 1.5 },
}

export function Switch({
  checked  = false,
  size     = 'lg',
  label    = '',
  onChange,
  style    = {},
}) {
  const cfg = SIZE[size] ?? SIZE.lg

  // thumb translateX: off=padding, on=trackW-thumbW-padding
  const thumbX = checked
    ? cfg.trackW - cfg.thumbW - cfg.padding
    : cfg.padding

  const trackStyle = {
    position:        'relative',
    width:           `${cfg.trackW}px`,
    height:          `${cfg.trackH}px`,
    borderRadius:    '9999px',
    backgroundColor: checked ? 'var(--primary-bgsolid)' : 'var(--surface-heavy-subtle)',
    overflow:        'hidden',
    flexShrink:      0,
    cursor:          'pointer',
    transition:      'background-color 0.2s ease',
  }

  const thumbStyle = {
    position:        'absolute',
    top:             `${cfg.padding}px`,
    left:            `${thumbX}px`,
    width:           `${cfg.thumbW}px`,
    height:          `${cfg.thumbH}px`,
    borderRadius:    '9999px',
    backgroundColor: 'var(--text-icon-base)',  // --color/text&icon/static (white)
    transition:      'left 0.2s ease',
    boxSizing:       'border-box',
  }

  return (
    <div
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
      <div style={trackStyle}>
        <div style={thumbStyle} />
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

Switch.tokenUsage = (checked) => ({
  track: checked ? 'primary-bgsolid' : 'surface-heavy-subtle',
  thumb: 'text-icon-base',
})

Switch.sizes = ['lg', 'sm']

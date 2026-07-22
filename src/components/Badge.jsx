// Badge Component
// CSS variable names match Figma exactly:
//   --primary-text-icon     → Primary/Text&Icon  (ampersand)
//   --text-icon-normal      → Text&Icon/Normal
//   --text-icon-assistive   → Text&Icon/Assistive
//   --surface-heavy-subtle       → Backcround/Dark    (Figma typo)
//   --border-normal         → Border/Normal
//   --status/{group}/text   → Status/{Group}/Text
//   --status/{group}/bgsubtle, bdsubtle
//   --radius-fixed-circle   → Radius/Control/Full

const sizeStyles = {
  lg: { height: '24px', padding: '0 10px', fontSize: '14px', fontWeight: 500, borderRadius: 'var(--radius-fixed-circle)', gap: '4px' },
  md: { height: '20px', padding: '0 8px',  fontSize: '12px', fontWeight: 500, borderRadius: 'var(--radius-fixed-circle)', gap: '3px' },
  sm: { height: '16px', padding: '0 6px',  fontSize: '11px', fontWeight: 500, borderRadius: 'var(--radius-fixed-circle)', gap: '2px' },
}

const variantStyles = {
  brand: {
    backgroundColor: 'var(--primary-bgsubtle)',
    color:           'var(--primary-text-icon)',
    border:          '1px solid var(--primary-bdsubtle)',
    dotColor:        'var(--primary-bgsolid)',
    tokenBg:         'primary/bgsubtle',
    tokenText:       'primary/text&icon',
    tokenBorder:     'primary/bdsubtle',
  },
  success: {
    backgroundColor: 'var(--status-success-bgsubtle)',
    color:           'var(--status-success-text-icon)',
    border:          '1px solid var(--status-success-bdsubtle)',
    dotColor:        'var(--status-success-bgsolid)',
    tokenBg:         'status/success/bgsubtle',
    tokenText:       'status/success/text',
    tokenBorder:     'status/success/bdsubtle',
  },
  warning: {
    backgroundColor: 'var(--status-caution-bgsubtle)',
    color:           'var(--status-caution-text-icon)',
    border:          '1px solid var(--status-caution-bdsubtle)',
    dotColor:        'var(--status-caution-bgsolid)',
    tokenBg:         'status/caution/bgsubtle',
    tokenText:       'status/caution/text',
    tokenBorder:     'status/caution/bdsubtle',
  },
  danger: {
    backgroundColor: 'var(--status-error-bgsubtle)',
    color:           'var(--status-error-text-icon)',
    border:          '1px solid var(--status-error-bdsubtle)',
    dotColor:        'var(--status-error-bgsolid)',
    tokenBg:         'status/error/bgsubtle',
    tokenText:       'status/error/text',
    tokenBorder:     'status/error/bdsubtle',
  },
  neutral: {
    backgroundColor: 'var(--surface-heavy-subtle)',
    color:           'var(--text-icon-normal)',
    border:          '1px solid var(--border-normal)',
    dotColor:        'var(--text-icon-assistive)',
    tokenBg:         'backcround/dark',
    tokenText:       'text&icon/normal',
    tokenBorder:     'border/normal',
  },
}

export function Badge({
  variant = 'brand',
  size = 'md',
  dot = false,
  children = 'Badge',
  style = {},
}) {
  const sz = sizeStyles[size] ?? sizeStyles.md
  const vr = variantStyles[variant] ?? variantStyles.brand

  return (
    <span
      data-inspect="Badge"
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        fontFamily:    'var(--font-family)',
        letterSpacing: '-0.25px',
        lineHeight:    1.35,
        whiteSpace:    'nowrap',
        ...sz,
        backgroundColor: vr.backgroundColor,
        color:           vr.color,
        border:          vr.border,
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width:           '6px',
            height:          '6px',
            borderRadius:    '50%',
            backgroundColor: vr.dotColor,
            flexShrink:      0,
            marginRight:     '3px',
          }}
        />
      )}
      {children}
    </span>
  )
}

Badge.tokenUsage = (variant) => {
  const v = variantStyles[variant] ?? variantStyles.brand
  return { background: v.tokenBg, text: v.tokenText, border: v.tokenBorder }
}

Badge.variants = Object.keys(variantStyles)
Badge.sizes    = Object.keys(sizeStyles)

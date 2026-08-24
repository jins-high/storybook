// Modal — Figma node 11548:1618

const t = (size, weight, color) => ({
  fontFamily:    'var(--font-family)',
  fontSize:      `${size}px`,
  fontWeight:    weight,
  lineHeight:    1.35,
  letterSpacing: '-0.25px',
  color,
})

export function Modal({
  layout             = 'Vertical',
  title              = '상태 노출',
  body               = '해당 상태에 대한 설명글 작성란',
  hasBody            = true,
  hasAssistiveButton = true,
  primaryLabel       = '버튼명',
  assistiveLabel     = '버튼명',
}) {
  const isVertical = layout === 'Vertical'

  const btnBase = {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    height:          '56px',
    borderRadius:    'var(--radius-default-500)',
    border:          'none',
    cursor:          'pointer',
    overflow:        'hidden',
    position:        'relative',
    padding:         '0 var(--spacing-600)',
    ...t(18, 500, undefined),
  }

  const primaryBtn = {
    ...btnBase,
    backgroundColor: 'var(--surface-primary-solid)',
    color:           'var(--text-icon-strong)',
    ...(isVertical
      ? { width: '100%', flexShrink: 0 }
      : { flex: '1 0 0', minWidth: 0 }
    ),
  }

  const assistiveBtn = {
    ...btnBase,
    backgroundColor: 'var(--surface-normal-subtle)',
    color:           'var(--text-icon-alternative)',
    ...(isVertical
      ? { width: '100%', flexShrink: 0 }
      : { flex: '1 0 0', minWidth: 0 }
    ),
  }

  return (
    <div
      data-inspect="Modal"
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '327px',
        minHeight:       '200px',
        backgroundColor: 'var(--dimmer-normal)',
        borderRadius:    'var(--radius-default-400)',
        padding:         'var(--spacing-600)',
        boxSizing:       'border-box',
      }}
    >
      {/* Modal card */}
      <div style={{
        backgroundColor: 'var(--surface-base)',
        border:          '1px solid var(--border-normal)',
        borderRadius:    'var(--radius-default-700)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        width:           '100%',
        maxWidth:        '320px',
        maxHeight:       '480px',
        overflow:        'hidden',
        boxSizing:       'border-box',
      }}>

        {/* Content */}
        <div style={{
          display:        'flex',
          flexDirection:  'column',
          gap:            '12px',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '24px',
          textAlign:      'center',
          width:          '100%',
          boxSizing:      'border-box',
        }}>
          <span style={{ ...t(18, 700, 'var(--text-icon-normal)'), width: '100%', display: 'block' }}>
            {title}
          </span>
          {hasBody && (
            <span style={{
              ...t(15, 400, 'var(--text-icon-alternative)'),
              width:        '100%',
              display:      'block',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
            }}>
              {body}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div style={{
          display:       'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap:           '8px',
          padding:       '0 8px 8px',
          width:         '100%',
          boxSizing:     'border-box',
        }}>
          {/* Horizontal: assistive left, primary right */}
          {!isVertical && hasAssistiveButton && (
            <button style={assistiveBtn}>{assistiveLabel}</button>
          )}

          <button style={primaryBtn}>{primaryLabel}</button>

          {/* Vertical: primary top, assistive below */}
          {isVertical && hasAssistiveButton && (
            <button style={assistiveBtn}>{assistiveLabel}</button>
          )}
        </div>
      </div>
    </div>
  )
}

Modal.layouts = ['Vertical', 'Horizontal']

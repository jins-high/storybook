import { useState } from 'react'

const FOUNDATIONS = [
  { id: 'Color',      label: 'Color',       icon: '◑' },
  { id: 'Typography', label: 'Typography',  icon: 'Aa' },
  { id: 'Spacing',    label: 'Spacing',     icon: '↔' },
  { id: 'Font',       label: 'Font',        icon: 'T' },
  { id: 'Icons',      label: 'Icons',       icon: '✦' },
]

const COMPONENTS = [
  { id: 'Button',           label: 'Button',            icon: '⬡' },
  { id: 'TextButton',       label: 'Text Button',       icon: '⊕' },
  { id: 'ActionsActionArea', label: 'Actions Area',      icon: '⧉' },
  { id: 'Chip',             label: 'Chip',              icon: '●' },
  { id: 'Tab',              label: 'Tab',               icon: '≡' },
  { id: 'Snackbar',         label: 'Snackbar',          icon: '⌬' },
  { id: 'Tooltip',          label: 'Tooltip',           icon: '💬' },
  { id: 'Checkbox',         label: 'Checkbox',          icon: '☑' },
  { id: 'CheckboxInput',    label: 'Checkbox Input',    icon: '☑' },
  { id: 'Radio',            label: 'Radio',             icon: '◉' },
  { id: 'RadioInput',       label: 'Radio Input',       icon: '◉' },
  { id: 'Checkmark',         label: 'Checkmark',         icon: '✓' },
  { id: 'CheckmarkInput',    label: 'Checkmark Input',   icon: '✓' },
]

const COMPOSE_COMPONENTS = [
  { id: 'HeroBanner',       label: 'HeroBanner',       icon: '🖼' },
  { id: 'OrderHistoryCard', label: 'OrderHistoryCard', icon: '🧾' },
]

const COMPOSE_GRAPHICS = [
  { ratio: '2.5:4', items: [
    { id: 'americono',   label: 'americono'   },
    { id: 'coldbrew',    label: 'coldbrew'    },
    { id: 'plainyogurt', label: 'plainyogurt' },
    { id: 'strawberry',  label: 'strawberry'  },
  ]},
  { ratio: '1:1', items: [
    { id: 'v-set',               label: 'v-set'               },
    { id: 'bear-a-set',          label: 'bear-a-set'          },
    { id: 'bear-b-set',          label: 'bear-b-set'          },
    { id: 'storeProfile/fallback', label: 'storeProfile/fallback' },
    { id: 'storeProfile/store-1',  label: 'storeProfile/store-1'  },
  ]},
]

export function LeftPanel({ selectedItem, onSelect }) {
  const [composeOpen, setComposeOpen] = useState({ components: true, graphics: false })

  const isSelected = (type, id) =>
    selectedItem?.type === type && selectedItem?.name === id

  const toggle = (key) =>
    setComposeOpen(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <aside style={panelStyle}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Foundations section */}
        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>FOUNDATIONS</div>
          {FOUNDATIONS.map(item => (
            <button
              key={item.id}
              style={navItemStyle(isSelected('foundation', item.id))}
              onClick={() => onSelect({ type: 'foundation', name: item.id })}
            >
              <span style={navIconStyle}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Components section */}
        <div style={sectionStyle}>
          <div style={sectionLabelStyle}>COMPONENTS</div>
          {COMPONENTS.map(item => (
            <button
              key={item.id}
              style={navItemStyle(isSelected('component', item.id))}
              onClick={() => onSelect({ type: 'component', name: item.id })}
            >
              <span style={navIconStyle}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Compose Asset section */}
        <div style={sectionStyle}>
          <div style={{ ...sectionLabelStyle, color: '#92773A' }}>COMPOSE ASSET</div>

          {/* Components accordion */}
          <button style={accordionHeaderStyle} onClick={() => toggle('components')}>
            <span style={{ fontSize: '10px', opacity: 0.6 }}>{composeOpen.components ? '▾' : '▸'}</span>
            <span>Components</span>
          </button>
          {composeOpen.components && (
            <div style={accordionBodyStyle}>
              {COMPOSE_COMPONENTS.map(item => (
                <button
                  key={item.id}
                  style={navItemStyle(isSelected('component', item.id))}
                  onClick={() => onSelect({ type: 'component', name: item.id })}
                >
                  <span style={navIconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Graphics accordion */}
          <button style={accordionHeaderStyle} onClick={() => toggle('graphics')}>
            <span style={{ fontSize: '10px', opacity: 0.6 }}>{composeOpen.graphics ? '▾' : '▸'}</span>
            <span>Graphics</span>
          </button>
          {composeOpen.graphics && (
            <div style={accordionBodyStyle}>
              {COMPOSE_GRAPHICS.map(({ ratio, items }) => (
                <div key={ratio}>
                  <div style={ratioLabelStyle}>{ratio}</div>
                  {items.map(item => (
                    <button
                      key={item.id}
                      style={navItemStyle(isSelected('graphic', item.id))}
                      onClick={() => onSelect({ type: 'graphic', name: item.id })}
                    >
                      <span style={navIconStyle}>▪</span>
                      <span style={{ fontSize: '12px' }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <div style={{ fontSize: '11px', color: '#374151' }}>Figma variable structure</div>
        <div style={{ fontSize: '11px', color: '#1F2937', marginTop: '4px' }}>
          palette → theme → component
        </div>
      </div>
    </aside>
  )
}

// ── Styles ─────────────────────────────────────────────────

const panelStyle = {
  width:           '220px',
  minWidth:        '220px',
  height:          '100%',
  backgroundColor: '#111318',
  display:         'flex',
  flexDirection:   'column',
  borderRight:     '1px solid #1E2028',
  overflow:        'hidden',
}

const headerStyle = {
  display:       'flex',
  alignItems:    'center',
  gap:           '10px',
  padding:       '18px 16px',
  borderBottom:  '1px solid #1E2028',
  flexShrink:    0,
}

const logoStyle = {
  width:           '32px',
  height:          '32px',
  borderRadius:    '8px',
  background:      'linear-gradient(135deg, #6366F1, #4338CA)',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  fontSize:        '12px',
  fontWeight:      700,
  color:           '#FFFFFF',
  flexShrink:      0,
}

const sectionStyle = {
  padding:       '16px 10px 8px',
}

const sectionLabelStyle = {
  fontSize:      '10px',
  fontWeight:    600,
  color:         '#4B5563',
  letterSpacing: '0.08em',
  paddingLeft:   '6px',
  marginBottom:  '6px',
}

const accordionHeaderStyle = {
  display:         'flex',
  alignItems:      'center',
  gap:             '6px',
  width:           '100%',
  padding:         '6px 8px',
  borderRadius:    '6px',
  border:          'none',
  backgroundColor: 'transparent',
  color:           '#6B7280',
  fontSize:        '12px',
  fontWeight:      500,
  cursor:          'pointer',
  textAlign:       'left',
  fontFamily:      'inherit',
  letterSpacing:   '0.02em',
}

const accordionBodyStyle = {
  paddingLeft: '8px',
}

const ratioLabelStyle = {
  fontSize:      '10px',
  fontWeight:    600,
  color:         '#4B5563',
  letterSpacing: '0.06em',
  padding:       '6px 8px 2px',
}

const navIconStyle = {
  width:          '18px',
  fontSize:       '12px',
  textAlign:      'center',
  display:        'inline-block',
  flexShrink:     0,
  color:          'inherit',
  opacity:        0.8,
}

const navItemStyle = (active) => ({
  display:         'flex',
  alignItems:      'center',
  gap:             '8px',
  width:           '100%',
  padding:         '7px 8px',
  borderRadius:    '6px',
  border:          'none',
  backgroundColor: active ? '#1E2340' : 'transparent',
  color:           active ? '#818CF8' : '#9CA3AF',
  fontSize:        '13px',
  fontWeight:      active ? 500 : 400,
  cursor:          'pointer',
  textAlign:       'left',
  transition:      'background-color 0.12s, color 0.12s',
  outline:         'none',
  fontFamily:      'inherit',
  borderLeft:      active ? '2px solid #6366F1' : '2px solid transparent',
})

const footerStyle = {
  flexShrink:    0,
  padding:       '12px 16px',
  borderTop:     '1px solid #1E2028',
}

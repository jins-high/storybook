import { useState } from 'react'
import { LeftPanel }   from './preview/LeftPanel.jsx'
import { CenterPanel } from './preview/CenterPanel.jsx'
import { RightPanel }  from './preview/RightPanel.jsx'
import { modes }       from './tokens/theme.js'

const defaultControls = {
  Button: {
    variant:        'solid',
    color:          'primary',
    size:           'md',
    hasLeadingIcon:  false,
    hasLabel:        true,
    hasTrailingIcon: false,
    state:          'default',
    label:          '버튼명',
    ariaLabel:      '',
    iconName:       'IconChevronRight',
  },
  TextButton: {
    size:           'md',
    color:          'primary',
    hasLeadingIcon:  false,
    hasTrailingIcon: false,
    state:          'default',
    label:          '텍스트버튼',
    iconName:       'IconChevronRight',
  },
  ActionsActionArea: {
    variant:        'Vertical',
    combination:    'MainOnly',
    slot:           false,
  },
  Chip: {
    variant:        'outline',
    size:           'md',
    state:          'default',
    hasLeadingIcon: false,
    hasTrailingIcon: false,
    label:          'Chip',
  },
  Tab: {
    tabs: [
      { id: 'tab-1', label: '탭', enabled: true, state: 'active' },
      { id: 'tab-2', label: '탭', enabled: true, state: 'default' },
      { id: 'tab-3', label: '탭', enabled: true, state: 'default' },
      { id: 'tab-4', label: '탭', enabled: true, state: 'default' },
      { id: 'tab-5', label: '탭', enabled: true, state: 'default' },
      { id: 'tab-6', label: '탭', enabled: true, state: 'default' },
    ],
  },
  Snackbar: {
    message: '스낵바 메시지입니다.',
  },
  Tooltip: {
    placement: 'top',
    text: '도움말 텍스트입니다.',
    visible: false,
  },
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState({ type: 'component', name: 'Button' })
  const [controls, setControls]         = useState(defaultControls)
  const [brandMode, setBrandMode]       = useState('compose-dark')
  const [inspectedEl, setInspectedEl]   = useState(null)

  const activeMode = modes[brandMode]
  const fontMode   = activeMode?.font ?? 'pretendard'

  const handleControlChange = (componentName, newControls) => {
    setControls(prev => ({ ...prev, [componentName]: newControls }))
  }

  return (
    <div
      className="app-shell"
      data-brand-mode={brandMode}
      data-font-mode={fontMode === 'pretendard' ? undefined : fontMode}
    >
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo">📖</div>
          <span className="header-title">Story Book</span>
          <span className="header-badge">Component Library</span>
        </div>

        <div className="header-right">
          {/* Brand mode — 3 modes matching Figma variable collection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500 }}>Brand</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Object.entries(modes).map(([key, mode]) => {
                const isActive = brandMode === key
                return (
                  <button
                    key={key}
                    onClick={() => setBrandMode(key)}
                    style={{
                      padding:         '4px 10px',
                      borderRadius:    '6px',
                      fontSize:        '12px',
                      border:          isActive ? 'none' : '1px solid var(--border-normal)',
                      backgroundColor: isActive ? 'var(--primary-bgsolid)' : 'var(--surface-base)',
                      color:           isActive ? 'var(--text-icon-base)' : 'var(--text-icon-normal)',
                      cursor:          'pointer',
                      fontFamily:      'inherit',
                      fontWeight:      isActive ? 600 : 400,
                      transition:      'all 0.15s',
                    }}
                  >
                    {mode.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Token layer indicator */}
          <div className="header-token-info">
            <span className="token-layer">palette</span>
            <span className="token-arrow">→</span>
            <span className="token-layer">theme</span>
            <span className="token-arrow">→</span>
            <span className="token-layer active">mode</span>
          </div>
        </div>
      </header>

      <div className="panels">
        <LeftPanel
          selectedItem={selectedItem}
          onSelect={setSelectedItem}
        />
        <CenterPanel
          selectedItem={selectedItem}
          controls={controls}
          onInspect={setInspectedEl}
        />
        <RightPanel
          selectedItem={selectedItem}
          controls={controls}
          onChange={handleControlChange}
          inspectedEl={inspectedEl}
          onClearInspect={() => setInspectedEl(null)}
        />
      </div>
    </div>
  )
}

// Filter — Figma node 2056:27726
// FilterSelect trigger button + bottom sheet with selectable options

import { useState } from 'react'
import { IconChevronRight, IconCheck } from '../icons/icons.jsx'

export function Filter({
  label    = '검색기간',
  value    = '최근 1개월',
  hasLabel = true,
  options  = ['최근 1주일', '최근 1개월', '최근 3개월', '최근 6개월', '1년'],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (opt) => {
    onSelect(opt)
    setIsOpen(false)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        data-inspect="Filter"
        onClick={() => setIsOpen(true)}
        style={{
          display:         'flex',
          alignItems:      'center',
          gap:             'var(--spacing-300)',
          height:          '48px',
          padding:         '0 var(--spacing-500)',
          borderRadius:    'var(--radius-default-400)',
          border:          '1px solid var(--border-light)',
          backgroundColor: 'var(--surface-base)',
          cursor:          'pointer',
          width:           '100%',
          boxSizing:       'border-box',
          fontFamily:      'inherit',
        }}
      >
        {hasLabel && (
          <span style={{
            fontSize:      '16px',
            fontWeight:    400,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         'var(--text-icon-assistive)',
            whiteSpace:    'nowrap',
            flexShrink:    0,
          }}>
            {label}
          </span>
        )}
        <span style={{
          flex:         '1 0 0',
          minWidth:     0,
          fontSize:     '16px',
          fontWeight:   500,
          lineHeight:   1.35,
          letterSpacing: '-0.25px',
          color:        'var(--text-icon-normal)',
          textAlign:    'left',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:   'nowrap',
        }}>
          {value}
        </span>
        <IconChevronRight style={{
          width:      20,
          height:     20,
          color:      'var(--text-icon-assistive)',
          flexShrink: 0,
        }} />
      </button>

      {/* Bottom sheet */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position:        'fixed',
            inset:           0,
            backgroundColor: 'var(--dimmer-normal)',
            zIndex:          200,
            display:         'flex',
            alignItems:      'flex-end',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width:           '100%',
              backgroundColor: 'var(--surface-base)',
              borderRadius:    'var(--radius-default-600) var(--radius-default-600) 0 0',
              paddingBottom:   'var(--spacing-700)',
              maxHeight:       '70vh',
              overflowY:       'auto',
            }}
          >
            {/* Handle bar */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-400) 0 var(--spacing-200)' }}>
              <div style={{
                width:           '32px',
                height:          '4px',
                borderRadius:    '2px',
                backgroundColor: 'var(--border-normal)',
              }} />
            </div>

            {/* Option list */}
            {options.map(opt => {
              const selected = opt === value
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  style={{
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'space-between',
                    width:           '100%',
                    height:          '56px',
                    padding:         '0 var(--spacing-700)',
                    border:          'none',
                    borderBottom:    '1px solid var(--border-light)',
                    backgroundColor: 'transparent',
                    cursor:          'pointer',
                    fontFamily:      'inherit',
                    boxSizing:       'border-box',
                  }}
                >
                  <span style={{
                    fontSize:      '16px',
                    fontWeight:    selected ? 500 : 400,
                    lineHeight:    1.35,
                    letterSpacing: '-0.25px',
                    color:         selected ? 'var(--text-icon-primary)' : 'var(--text-icon-normal)',
                  }}>
                    {opt}
                  </span>
                  {selected && (
                    <IconCheck style={{ width: 20, height: 20, color: 'var(--text-icon-primary)', flexShrink: 0 }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

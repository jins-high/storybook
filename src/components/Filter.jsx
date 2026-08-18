// Filter – Figma node 2056:27726
// FilterSelect trigger + bottom sheet (Figma 3571:141063)

import { useState } from 'react'
import { IconChevronRight, IconReturn } from '../icons/icons.jsx'
import { Chip } from './Chip.jsx'
import { Button } from './Button.jsx'

export function Filter({
  label    = '검색기간',
  value    = '최근 1개월',
  hasLabel = true,
  options  = ['최근 1개월', '최근 6개월', '직접입력'],
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen]     = useState(false)
  const [selected, setSelected] = useState(value)

  const handleOpen  = () => { setSelected(value); setIsOpen(true) }
  const handleReset = () => setSelected(options[0])
  const handleApply = () => { onSelect(selected); setIsOpen(false) }

  return (
    <>
      {/* Trigger button */}
      <button
        data-inspect="Filter"
        onClick={handleOpen}
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
          flex:          '1 0 0',
          minWidth:      0,
          fontSize:      '16px',
          fontWeight:    500,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         'var(--text-icon-normal)',
          textAlign:     'left',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          whiteSpace:    'nowrap',
        }}>
          {value}
        </span>
        <IconChevronRight style={{ width: 20, height: 20, color: 'var(--text-icon-assistive)', flexShrink: 0 }} />
      </button>

      <style>{`@keyframes filterSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>

      {/* Bottom sheet overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position:        'fixed',
            top:             0,
            bottom:          0,
            left:            280,
            right:           280,
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
              borderRadius:    'var(--radius-default-700) var(--radius-default-700) 0 0',
              boxShadow:       '0px -2px 4px rgba(253,210,43,0.16)',
              animation:       'filterSlideUp 0.28s ease-out',
              overflow:        'hidden',
            }}
          >
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-400) 0' }}>
              <div style={{
                width:           '48px',
                height:          '4px',
                borderRadius:    '999px',
                backgroundColor: 'var(--text-icon-assistive)',
              }} />
            </div>

            {/* AppBar – title only, no back button */}
            <div style={{
              display:    'flex',
              alignItems: 'center',
              height:     '56px',
              padding:    '0 var(--spacing-700)',
            }}>
              <span style={{
                fontSize:      '18px',
                fontWeight:    500,
                lineHeight:    1.35,
                letterSpacing: '-0.25px',
                color:         'var(--text-icon-normal)',
              }}>
                {label}
              </span>
            </div>

            {/* ChipsSection */}
            <div style={{
              display:  'flex',
              gap:      'var(--spacing-300)',
              padding:  'var(--spacing-300) var(--spacing-700)',
              flexWrap: 'wrap',
            }}>
              {options.map(opt => (
                <Chip
                  key={opt}
                  variant="solid"
                  size="md"
                  state={selected === opt ? 'active' : 'default'}
                  label={opt}
                  onClick={() => setSelected(opt)}
                />
              ))}
            </div>

            {/* FilterSelectSection – always shown per Figma */}
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           'var(--spacing-300)',
              alignItems:    'center',
              padding:       'var(--spacing-400) var(--spacing-700)',
            }}>
              {/* 시작월 */}
              <div style={{
                display:         'flex',
                alignItems:      'center',
                gap:             'var(--spacing-300)',
                height:          '48px',
                padding:         '0 var(--spacing-500)',
                borderRadius:    'var(--radius-default-400)',
                border:          '1px solid var(--border-light)',
                backgroundColor: 'var(--surface-base)',
                boxSizing:       'border-box',
                width:           '100%',
              }}>
                <span style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '-0.25px', color: 'var(--text-icon-assistive)', flexShrink: 0 }}>시작월</span>
                <span style={{ flex: '1 0 0', fontSize: '16px', fontWeight: 500, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)' }}>2026년 10월</span>
                <IconChevronRight style={{ width: 20, height: 20, color: 'var(--text-icon-assistive)', flexShrink: 0 }} />
              </div>
              {/* 종료월 */}
              <div style={{
                display:         'flex',
                alignItems:      'center',
                gap:             'var(--spacing-300)',
                height:          '48px',
                padding:         '0 var(--spacing-500)',
                borderRadius:    'var(--radius-default-400)',
                border:          '1px solid var(--border-light)',
                backgroundColor: 'var(--surface-base)',
                boxSizing:       'border-box',
                width:           '100%',
              }}>
                <span style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '-0.25px', color: 'var(--text-icon-assistive)', flexShrink: 0 }}>종료월</span>
                <span style={{ flex: '1 0 0', fontSize: '16px', fontWeight: 500, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)' }}>2026년 11월</span>
                <IconChevronRight style={{ width: 20, height: 20, color: 'var(--text-icon-assistive)', flexShrink: 0 }} />
              </div>
              {/* Hint text */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-300) 0', width: '100%' }}>
                <span style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '-0.25px', color: 'var(--text-icon-assistive)' }}>최근 1년 주문까지 조회할 수 있어요.</span>
              </div>
            </div>

            {/* ActionAreaSection – Actions/ActionArea pattern */}
            <div style={{
              borderTop: '1px solid var(--border-light)',
              padding:   'var(--spacing-400) var(--spacing-700)',
              display:   'flex',
              gap:       'var(--spacing-400)',
            }}>
              <Button
                variant="outline"
                color="assistive"
                size="lg"
                hasLeadingIcon={true}
                hasLabel={true}
                label="초기화"
                icon={<IconReturn />}
                onClick={handleReset}
                style={{ flex: '2 0 0' }}
              />
              <Button
                variant="solid"
                color="primary"
                size="lg"
                hasLabel={true}
                label="조회하기"
                onClick={handleApply}
                style={{ flex: '3 0 0' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

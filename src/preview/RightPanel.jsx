import { useState } from 'react'
import { themeTokenMap } from '../tokens/theme.js'
import { Button }              from '../components/Button.jsx'
import { TextButton }          from '../components/TextButton.jsx'
import { ActionsActionArea }   from '../components/ActionsActionArea.jsx'
import { Chip }                from '../components/Chip.jsx'
import { Tab }                 from '../components/Tab.jsx'
import { Snackbar }            from '../components/Snackbar.jsx'
import { Tooltip }             from '../components/Tooltip.jsx'
import { Badge }    from '../components/Badge.jsx'
import { Input }    from '../components/Input.jsx'
import { Toggle }   from '../components/Toggle.jsx'
import { Checkbox } from '../components/Checkbox.jsx'
import { Radio }      from '../components/Radio.jsx'
import { HeroBanner }       from '../components/HeroBanner.jsx'
import { OrderHistoryCard } from '../components/OrderHistoryCard.jsx'
import * as Icons      from '../icons/icons.jsx'

// ── All available icon names ────────────────────────────────
const ICON_OPTIONS = [
  { group: 'Direction',       names: ['IconChevronUp','IconChevronDown','IconChevronLeft','IconChevronRight','IconArrowUp','IconArrowDown','IconArrowLeft','IconArrowRight'] },
  { group: 'Actions',         names: ['IconClose','IconCheck','IconPlus','IconMinus','IconSearch','IconDownload','IconRefresh'] },
  { group: 'Status',          names: ['IconCheckCircle','IconPlusCircle','IconMinusCircle','IconAlertCircle','IconAlertCircleFill','IconErrorCircle','IconInfo','IconInfoFill','IconHelp','IconHelpFill'] },
  { group: 'Commerce',        names: ['IconBag','IconBagFill','IconCart','IconCartFill','IconGift','IconCoupon','IconCouponFill','IconCard','IconCardFill'] },
  { group: 'Trash',           names: ['IconTrash','IconTrashFill'] },
  { group: 'User / Social',   names: ['IconPerson','IconPersonFill','IconStar','IconStarOutline','IconStarFill','IconStarRing'] },
  { group: 'System / UI',     names: ['IconMenu','IconBell','IconBellFill','IconStamp'] },
  { group: 'Location / Home', names: ['IconHome','IconHomeFill','IconLocation','IconLocationFill'] },
  { group: 'Food',            names: ['IconCutlery'] },
]
const ALL_ICON_NAMES = ICON_OPTIONS.flatMap(g => g.names)

// ── Token resolution ────────────────────────────────────────
// cssVarKey matches themeTokenMap keys, e.g. 'primary/bgsolid'
function resolveToken(cssVarKey) {
  if (!cssVarKey || cssVarKey === '—') return null
  return themeTokenMap[cssVarKey] ?? null
}

// ═══════════════════════════════════════════════════════════
// MAIN RIGHT PANEL
// ═══════════════════════════════════════════════════════════
export function RightPanel({ selectedItem, controls, onChange, inspectedEl, onClearInspect }) {
  if (!selectedItem) return <div style={panelStyle} />

  const name = selectedItem.name
  const type = selectedItem.type

  // Inspect mode — element selected in center panel
  if (inspectedEl) {
    return (
      <div style={panelStyle}>
        <ElementInspector info={inspectedEl} onClose={onClearInspect} />
      </div>
    )
  }

  return (
    <div style={panelStyle}>
      {/* CONTROLS section */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Controls</div>
        {type === 'foundation' && <FoundationControls name={name} />}
        {type === 'component'  && name === 'Button'     && <ButtonControls     c={controls.Button}     onChange={v => onChange('Button', v)} />}
        {type === 'component'  && name === 'TextButton' && <TextButtonControls c={controls.TextButton} onChange={v => onChange('TextButton', v)} />}
        {type === 'component'  && name === 'ActionsActionArea' && <ActionsActionAreaControls c={controls.ActionsActionArea} onChange={v => onChange('ActionsActionArea', v)} />}
        {type === 'component'  && name === 'Chip' && <ChipControls c={controls.Chip} onChange={v => onChange('Chip', v)} />}
        {type === 'component'  && name === 'Tab' && <TabControls c={controls.Tab} onChange={v => onChange('Tab', v)} />}
        {type === 'component'  && name === 'Snackbar' && <SnackbarControls c={controls.Snackbar} onChange={v => onChange('Snackbar', v)} />}
        {type === 'component'  && name === 'Tooltip' && <TooltipControls c={controls.Tooltip} onChange={v => onChange('Tooltip', v)} />}
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border-normal)' }} />

      {/* CODE section */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...sectionStyle, paddingBottom: '8px' }}>
          <div style={sectionTitleStyle}>Code</div>
        </div>
        {type === 'component' && (name === 'Button' || name === 'TextButton' || name === 'ActionsActionArea' || name === 'Chip' || name === 'Tab' || name === 'Snackbar') && (
          <>
            <ComponentCode  name={name} controls={controls[name]} />
            <TokenUsageTable name={name} controls={controls[name]} />
          </>
        )}
        {type === 'foundation' && <FoundationCode name={name} />}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// ELEMENT INSPECTOR
// ══════════════════════════════════════════════════════════

function toHex(rgb) {
  const m = rgb?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!m) return null
  return '#' + m.slice(1).map(n => (+n).toString(16).padStart(2, '0')).join('')
}

function isTransparent(c) {
  return !c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent'
}

function ColorRow({ label, value, varName }) {
  if (isTransparent(value) && !varName) return null
  const hex = toHex(value)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
      <div style={{
        width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
        backgroundColor: value,
        border: '1px solid rgba(0,0,0,0.12)',
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginRight: '6px' }}>{label}</span>
        {varName
          ? <><ICode>{varName}</ICode><span style={{ fontSize: '10px', color: 'var(--text-icon-disabled)', marginLeft: '4px' }}>{hex}</span></>
          : <ICode>{hex || value}</ICode>
        }
      </div>
    </div>
  )
}

function ICode({ children }) {
  return (
    <span style={{
      fontFamily: '"Geist Mono","SF Mono",Consolas,monospace',
      fontSize: '10px',
      color: 'var(--text-icon-normal)',
      backgroundColor: 'var(--surface-heavy-subtle)',
      padding: '1px 4px',
      borderRadius: '3px',
    }}>
      {children}
    </span>
  )
}

function InspectSection({ title, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-icon-assistive)', letterSpacing: '0.07em', marginBottom: '8px' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function genCode(info) {
  const { tag, text, src, isSvg, styles, cssVars, rect } = info
  const cv = cssVars

  if (tag === 'img') {
    const fname = src?.split('/').pop() ?? 'image'
    const cn = `IMG_${fname.replace(/\.\w+$/, '').toUpperCase().replace(/[-/]/g, '_')}`
    return `const ${cn} = '${src}'\n\n<img\n  src={${cn}}\n  style={{\n    width: '${rect.width}px',\n    height: '${rect.height}px',\n    objectFit: 'contain',\n  }}\n/>`
  }

  if (isSvg) {
    const colorVar = cv['color'] || cv['fill']
    return `<svg\n  width={${rect.width}}\n  height={${rect.height}}${colorVar ? `\n  style={{ color: 'var(${colorVar})' }}` : ''}\n>\n  {/* inline SVG icon */}\n</svg>`
  }

  const lines = []
  const add = (prop, val, varKey) => {
    if (!val || val === 'normal' || val === 'auto' || val === '0px') return
    if (isTransparent(val) && !cv[varKey]) return
    const v = cv[varKey] ? `var(${cv[varKey]})` : val
    lines.push(`    ${prop}: '${v}',`)
  }

  add('color',           styles.color,           'color')
  add('backgroundColor', styles.backgroundColor,  'background-color')
  if (styles.borderWidth !== '0px' && styles.borderStyle !== 'none') {
    lines.push(`    border: '${styles.borderWidth} ${styles.borderStyle} ${cv['border-color'] ? `var(${cv['border-color']})` : styles.borderColor}',`)
  }
  add('borderRadius',  styles.borderRadius,  'border-radius')
  if (styles.fontSize)                  lines.push(`    fontSize: '${styles.fontSize}',`)
  if (styles.fontWeight && styles.fontWeight !== '400') lines.push(`    fontWeight: ${styles.fontWeight},`)
  if (styles.letterSpacing && styles.letterSpacing !== 'normal') lines.push(`    letterSpacing: '${styles.letterSpacing}',`)
  if (styles.padding)                   lines.push(`    padding: '${styles.padding}',`)

  const styleStr = lines.length ? `\n  style={{\n${lines.join('\n')}\n  }}` : ''
  const body     = text ? `\n  ${text}\n` : '\n'
  return `<${tag}${styleStr}>${body}</${tag}>`
}

function ElementInspector({ info, onClose }) {
  const { tag, isSvg, text, src, breadcrumb, rect, cssVars: cv, styles } = info
  const code = genCode(info)

  const hasBorder  = styles.borderWidth !== '0px' && styles.borderStyle !== 'none'
  const hasTypo    = styles.fontSize && (tag === 'span' || tag === 'p' || tag === 'div' || tag === 'button' || tag === 'label' || text)
  const hasSpacing = styles.padding || (styles.borderRadius && styles.borderRadius !== '0px')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 16px', borderBottom: '1px solid var(--border-light)', flexShrink: 0,
      }}>
        <button
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 8px', borderRadius: '5px', border: 'none',
            backgroundColor: 'var(--surface-heavy-subtle)',
            color: 'var(--text-icon-normal)',
            fontSize: '11px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          ← Controls
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)' }}>ESC</span>
      </div>

      {/* Element identity */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-light)', flexShrink: 0 }}>
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', marginBottom: '6px', fontFamily: 'monospace' }}>
            {[...breadcrumb, tag].join(' › ')}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{
            fontFamily: 'monospace', fontSize: '14px', fontWeight: 600,
            color: 'var(--text-icon-strong)',
            backgroundColor: 'var(--surface-heavy-subtle)',
            padding: '2px 6px', borderRadius: '4px',
          }}>
            &lt;{isSvg ? 'svg' : tag}&gt;
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-icon-assistive)' }}>
            {rect.width} × {rect.height}px
          </span>
        </div>
        {text && (
          <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-icon-alternative)', fontStyle: 'italic' }}>
            "{text.slice(0, 40)}"
          </div>
        )}
      </div>

      {/* Properties */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 16px' }}>

        {/* IMAGE */}
        {tag === 'img' && src && (
          <InspectSection title="IMAGE">
            <div style={{ fontSize: '11px', color: 'var(--text-icon-alternative)', marginBottom: '4px', wordBreak: 'break-all' }}>
              <ICode>{src}</ICode>
            </div>
            <img src={src} alt="" style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '8px', borderRadius: '6px', border: '1px solid var(--border-light)' }} />
          </InspectSection>
        )}

        {/* ICON */}
        {isSvg && (
          <InspectSection title="ICON">
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>Inline SVG · {rect.width} × {rect.height}px</div>
            {cv['color'] && (
              <div style={{ marginTop: '6px' }}>
                <ColorRow label="color" value={styles.color} varName={cv['color']} />
              </div>
            )}
          </InspectSection>
        )}

        {/* FILL */}
        {(!isTransparent(styles.backgroundColor) || cv['background-color']) && (
          <InspectSection title="FILL">
            <ColorRow label="bg" value={styles.backgroundColor} varName={cv['background-color']} />
          </InspectSection>
        )}

        {/* TEXT / COLOR */}
        {(!isTransparent(styles.color) || cv['color']) && !isSvg && (
          <InspectSection title="TEXT COLOR">
            <ColorRow label="color" value={styles.color} varName={cv['color']} />
          </InspectSection>
        )}

        {/* TYPOGRAPHY */}
        {hasTypo && (
          <InspectSection title="TYPOGRAPHY">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {styles.fontSize && <ICode>{styles.fontSize}</ICode>}
              {styles.fontWeight && <ICode>w{styles.fontWeight}</ICode>}
              {styles.letterSpacing && styles.letterSpacing !== 'normal' && <ICode>ls {styles.letterSpacing}</ICode>}
              {styles.lineHeight && styles.lineHeight !== 'normal' && <ICode>lh {styles.lineHeight}</ICode>}
            </div>
          </InspectSection>
        )}

        {/* BORDER */}
        {hasBorder && (
          <InspectSection title="BORDER">
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <ICode>{styles.borderWidth}</ICode>
              <ICode>{styles.borderStyle}</ICode>
            </div>
            <ColorRow label="color" value={styles.borderColor} varName={cv['border-color']} />
          </InspectSection>
        )}

        {/* SPACING */}
        {hasSpacing && (
          <InspectSection title="SPACING">
            {styles.padding && (
              <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', width: '48px' }}>padding</span>
                <ICode>{styles.padding}</ICode>
              </div>
            )}
            {styles.borderRadius && styles.borderRadius !== '0px' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', width: '48px' }}>radius</span>
                {cv['border-radius']
                  ? <><ICode>{cv['border-radius']}</ICode><span style={{ fontSize: '10px', color: 'var(--text-icon-disabled)', marginLeft: '4px' }}>{styles.borderRadius}</span></>
                  : <ICode>{styles.borderRadius}</ICode>
                }
              </div>
            )}
          </InspectSection>
        )}

        {/* CODE */}
        <InspectSection title="CODE">
          <pre style={{
            margin: 0, padding: '10px 12px',
            backgroundColor: 'var(--surface-heavy-subtle)',
            borderRadius: '6px',
            fontSize: '10px', lineHeight: 1.6,
            fontFamily: '"Geist Mono","SF Mono",Consolas,monospace',
            color: 'var(--text-icon-normal)',
            overflowX: 'auto', whiteSpace: 'pre',
          }}>
            {code}
          </pre>
        </InspectSection>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// FOUNDATION CONTROLS
// ══════════════════════════════════════════════════════════
function FoundationControls({ name }) {
  const desc = {
    Color:      'Layer 1 (palette) and Layer 2 (semantic) tokens. Layer 3 shows brand mode overrides. Hover swatches for Figma paths.',
    Typography: 'Type scale: display → caption, each with Regular/Medium/Bold weights. Font switches via --font-family mode variable.',
    Spacing:    'Base-4 spacing scale. Used for padding, margin, and gap. CSS var: --spacing/{step}.',
    Font:       '3 font families — Pretendard (default), SUIT, Gmarket Sans. Switched globally via data-font-mode attribute.',
  }
  return (
    <div style={{ padding: '4px 0', fontSize: '12px', color: 'var(--text-icon-alternative)', lineHeight: '1.6' }}>
      {desc[name] ?? ''}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// COMPONENT CONTROLS
// ══════════════════════════════════════════════════════════

function ControlGroup({ label, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '8px', letterSpacing: '0.04em' }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {options.map(opt => {
        const isActive = value === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding:         '5px 10px',
              borderRadius:    '6px',
              border:          isActive ? 'none' : '1px solid var(--border-normal)',
              backgroundColor: isActive ? 'var(--surface-heavy-solid)' : 'var(--surface-base)',
              color:           isActive ? 'var(--text-icon-base)' : 'var(--text-icon-normal)',
              fontSize:        '12px',
              fontWeight:      isActive ? 500 : 400,
              cursor:          'pointer',
              fontFamily:      'inherit',
              transition:      'all 0.12s',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ToggleSwitch({ label, value, onChange }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}
      onClick={() => onChange(!value)}
    >
      <div style={{
        width:           '32px',
        height:          '18px',
        borderRadius:    '9px',
        backgroundColor: value ? 'var(--surface-heavy-solid)' : 'var(--surface-heavy-subtle)',
        position:        'relative',
        transition:      'background-color 0.15s',
        flexShrink:      0,
      }}>
        <div style={{
          width:           '14px',
          height:          '14px',
          borderRadius:    '50%',
          backgroundColor: 'var(--text-icon-base)',
          position:        'absolute',
          top:             '2px',
          left:            value ? '16px' : '2px',
          transition:      'left 0.15s',
          boxShadow:       '0 1px 2px rgba(0,0,0,0.2)',
        }} />
      </div>
      <span style={{ fontSize: '12px', color: 'var(--text-icon-normal)' }}>{label}</span>
    </div>
  )
}

function TextInput({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '4px' }}>{label}</div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width:           '100%',
          padding:         '6px 8px',
          border:          '1px solid var(--border-normal)',
          borderRadius:    '6px',
          fontSize:        '12px',
          color:           'var(--text-icon-normal)',
          background:      'transparent',
          outline:         'none',
          fontFamily:      'inherit',
          boxSizing:       'border-box',
        }}
      />
    </div>
  )
}

// ── Icon picker dropdown ────────────────────────────────────
function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const IconCurrent = Icons[value]

  return (
    <div style={{ position: 'relative', marginTop: '8px' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '8px',
          width:           '100%',
          padding:         '6px 10px',
          border:          '1px solid var(--border-normal)',
          borderRadius:    '8px',
          backgroundColor: 'var(--surface-base)',
          cursor:          'pointer',
          fontFamily:      'inherit',
          outline:         'none',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-icon-normal)', flexShrink: 0 }}>
          {IconCurrent && <IconCurrent size={16} />}
        </span>
        <span style={{ flex: 1, textAlign: 'left', fontSize: '12px', color: 'var(--text-icon-normal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown grid */}
      {open && (
        <div style={{
          position:        'absolute',
          top:             'calc(100% + 4px)',
          left:            0,
          right:           0,
          zIndex:          100,
          backgroundColor: 'var(--surface-base)',
          border:          '1px solid var(--border-normal)',
          borderRadius:    '10px',
          boxShadow:       '0 8px 24px rgba(0,0,0,0.20)',
          maxHeight:       '280px',
          overflowY:       'auto',
          padding:         '8px',
        }}>
          {ICON_OPTIONS.map(({ group, names }) => (
            <div key={group} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-icon-assistive)', letterSpacing: '0.06em', padding: '4px 4px 6px', textTransform: 'uppercase' }}>
                {group}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {names.map(name => {
                  const Ic = Icons[name]
                  if (!Ic) return null
                  const isSelected = name === value
                  return (
                    <button
                      key={name}
                      title={name}
                      onClick={() => { onChange(name); setOpen(false) }}
                      style={{
                        width:           '32px',
                        height:          '32px',
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                        borderRadius:    '6px',
                        border:          isSelected ? '2px solid var(--primary-bdsolid)' : '1px solid var(--border-light)',
                        backgroundColor: isSelected ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                        color:           isSelected ? 'var(--primary-text-icon)' : 'var(--text-icon-normal)',
                        cursor:          'pointer',
                        padding:         0,
                        outline:         'none',
                        flexShrink:      0,
                      }}
                    >
                      <Ic size={18} />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ButtonControls({ c, onChange }) {
  const isIconOnly = c.hasLeadingIcon && !c.hasLabel

  const setHasLeadingIcon = (v) => {
    const next = { ...c, hasLeadingIcon: v }
    if (v && c.hasTrailingIcon) next.hasTrailingIcon = false
    onChange(next)
  }
  const setHasLabel = (v) => {
    const next = { ...c, hasLabel: v }
    if (!v) next.hasTrailingIcon = false
    onChange(next)
  }
  const setHasTrailingIcon = (v) => {
    const next = { ...c, hasTrailingIcon: v }
    if (v && c.hasLeadingIcon) next.hasLeadingIcon = false
    onChange(next)
  }

  return (
    <>
      <ControlGroup label="VARIANT">
        <SegmentedControl
          options={Button.variants}
          value={c.variant}
          onChange={v => onChange({ ...c, variant: v })}
        />
      </ControlGroup>

      <ControlGroup label="COLOR">
        <SegmentedControl
          options={Button.colors}
          value={c.color}
          onChange={v => onChange({ ...c, color: v })}
        />
      </ControlGroup>

      <ControlGroup label="SIZE">
        <SegmentedControl
          options={Button.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>

      <ControlGroup label="CONTENT">
        <ToggleSwitch label="HasLeadingIcon"  value={c.hasLeadingIcon}  onChange={setHasLeadingIcon} />
        <ToggleSwitch label="HasLabel"        value={c.hasLabel}        onChange={setHasLabel} />
        <ToggleSwitch label="HasTrailingIcon" value={c.hasTrailingIcon} onChange={setHasTrailingIcon} />
      </ControlGroup>

      {(c.hasLeadingIcon || c.hasTrailingIcon) && (
        <ControlGroup label="ICON">
          <IconPicker
            value={c.iconName ?? 'IconChevronRight'}
            onChange={v => onChange({ ...c, iconName: v })}
          />
        </ControlGroup>
      )}

      <ControlGroup label="STATE">
        <SegmentedControl
          options={Button.states}
          value={c.state}
          onChange={v => onChange({ ...c, state: v })}
        />
      </ControlGroup>

      {c.hasLabel && (
        <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
      )}

      {isIconOnly && (
        <TextInput
          label="ARIA-LABEL"
          value={c.ariaLabel ?? ''}
          onChange={v => onChange({ ...c, ariaLabel: v })}
        />
      )}
    </>
  )
}

function TextButtonControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="COLOR">
        <SegmentedControl
          options={TextButton.colors}
          value={c.color}
          onChange={v => onChange({ ...c, color: v })}
        />
      </ControlGroup>

      <ControlGroup label="SIZE">
        <SegmentedControl
          options={TextButton.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>

      <ControlGroup label="CONTENT">
        <ToggleSwitch label="HasLeadingIcon"  value={c.hasLeadingIcon}  onChange={v => onChange({ ...c, hasLeadingIcon: v })} />
        <ToggleSwitch label="HasTrailingIcon" value={c.hasTrailingIcon} onChange={v => onChange({ ...c, hasTrailingIcon: v })} />
      </ControlGroup>

      {(c.hasLeadingIcon || c.hasTrailingIcon) && (
        <ControlGroup label="ICON">
          <IconPicker
            value={c.iconName ?? 'IconChevronRight'}
            onChange={v => onChange({ ...c, iconName: v })}
          />
        </ControlGroup>
      )}

      <ControlGroup label="STATE">
        <SegmentedControl
          options={TextButton.states}
          value={c.state}
          onChange={v => onChange({ ...c, state: v })}
        />
      </ControlGroup>

      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function BadgeControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="VARIANT">
        <SegmentedControl
          options={Badge.variants}
          value={c.variant}
          onChange={v => onChange({ ...c, variant: v })}
        />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl
          options={Badge.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="Show dot" value={c.dot} onChange={v => onChange({ ...c, dot: v })} />
      </ControlGroup>
      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function InputControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="SIZE">
        <SegmentedControl
          options={['lg', 'md', 'sm']}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>
      <ControlGroup label="STATE">
        <SegmentedControl
          options={['default', 'error', 'success']}
          value={c.state}
          onChange={v => onChange({ ...c, state: v })}
        />
      </ControlGroup>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="Disabled" value={c.disabled} onChange={v => onChange({ ...c, disabled: v })} />
      </ControlGroup>
      <TextInput label="LABEL"       value={c.label}       onChange={v => onChange({ ...c, label: v })} />
      <TextInput label="PLACEHOLDER" value={c.placeholder} onChange={v => onChange({ ...c, placeholder: v })} />
      <TextInput label="HELPER TEXT" value={c.helperText}  onChange={v => onChange({ ...c, helperText: v })} />
    </>
  )
}

function ToggleControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="SIZE">
        <SegmentedControl
          options={Toggle.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>
      <ControlGroup label="STATE">
        <ToggleSwitch label="On" value={c.checked} onChange={v => onChange({ ...c, checked: v })} />
      </ControlGroup>
    </>
  )
}

function CheckboxControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="SIZE">
        <SegmentedControl
          options={['lg', 'md', 'sm']}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>
      <ControlGroup label="STATE">
        <ToggleSwitch label="Checked"       value={c.checked}       onChange={v => onChange({ ...c, checked: v, indeterminate: false })} />
        <ToggleSwitch label="Indeterminate" value={c.indeterminate} onChange={v => onChange({ ...c, indeterminate: v, checked: false })} />
        <ToggleSwitch label="Disabled"      value={c.disabled}      onChange={v => onChange({ ...c, disabled: v })} />
      </ControlGroup>
    </>
  )
}

function RadioControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="SIZE">
        <SegmentedControl
          options={Radio.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>
      <ControlGroup label="STATE">
        <ToggleSwitch label="Checked"  value={c.checked}  onChange={v => onChange({ ...c, checked: v })} />
        <ToggleSwitch label="Disabled" value={c.disabled} onChange={v => onChange({ ...c, disabled: v })} />
      </ControlGroup>
      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function HeroBannerControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="초기 카드">
        <SegmentedControl
          options={HeroBanner.pages}
          value={c.page}
          onChange={v => onChange({ ...c, page: v })}
        />
      </ControlGroup>
      <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', padding: '4px 0 8px', lineHeight: 1.5 }}>
        3장 스택 카드 · 2° 회전 간격<br/>
        클릭으로 전환 인터랙션
      </div>
    </>
  )
}

const OHC_IMAGE_OPTIONS = ['americano', 'coldbrew', 'plainyogurt', 'strawberry']

function OrderHistoryCardControls({ c, onChange }) {
  return (
    <>
      <TextInput label="MENU NAME"  value={c.menuName}  onChange={v => onChange({ ...c, menuName: v })} />
      <TextInput label="STORE NAME" value={c.storeName} onChange={v => onChange({ ...c, storeName: v })} />
      <ControlGroup label="IMAGE">
        <SegmentedControl
          options={OHC_IMAGE_OPTIONS}
          value={c.image ?? 'americano'}
          onChange={v => onChange({ ...c, image: v })}
        />
      </ControlGroup>
    </>
  )
}

// ══════════════════════════════════════════════════════════
// GRAPHIC INFO & CODE (Compose Asset)
// ══════════════════════════════════════════════════════════
const GRAPHIC_ASSETS = {
  // 2.5:4 — orderHistory
  americono:   { figmaName: 'orderHistory/americono',   url: '/assets/orderHistory/americono.png',   size: '175×280px', ratio: '2.5:4' },
  coldbrew:    { figmaName: 'orderHistory/coldbrew',    url: '/assets/orderHistory/coldbrew.png',    size: '175×280px', ratio: '2.5:4' },
  plainyogurt: { figmaName: 'orderHistory/plainyogurt', url: '/assets/orderHistory/plainyogurt.png', size: '175×280px', ratio: '2.5:4' },
  strawberry:  { figmaName: 'orderHistory/strawberry',  url: '/assets/orderHistory/strawberry.png',  size: '175×280px', ratio: '2.5:4' },
  // 1:1 — recommended
  'v-set':                 { figmaName: 'recommended/v-set',           url: '/assets/recommended/v-set.png',      size: '320×320px', ratio: '1:1' },
  'bear-a-set':            { figmaName: 'recommended/bear-a-set',      url: '/assets/recommended/bear-a-set.png', size: '320×320px', ratio: '1:1' },
  'bear-b-set':            { figmaName: 'recommended/bear-b-set',      url: '/assets/recommended/bear-b-set.png', size: '320×320px', ratio: '1:1' },
  'storeProfile/fallback': { figmaName: 'storeProfile/fallback',       url: '/assets/storeProfile/fallback.png',  size: '160×160px', ratio: '1:1' },
  'storeProfile/store-1':  { figmaName: 'storeProfile/store-1',        url: '/assets/storeProfile/store-1.png',   size: '160×160px', ratio: '1:1' },
}

function GraphicInfo({ name }) {
  const asset = GRAPHIC_ASSETS[name]
  if (!asset) return null
  return (
    <div style={{ padding: '4px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontSize: '12px', color: 'var(--text-icon-alternative)', lineHeight: 1.6 }}>
        <div><span style={{ color: 'var(--text-icon-assistive)' }}>Figma: </span>{asset.figmaName}</div>
        <div><span style={{ color: 'var(--text-icon-assistive)' }}>Size: </span>{asset.size}</div>
        <div><span style={{ color: 'var(--text-icon-assistive)' }}>Format: </span>PNG</div>
      </div>
    </div>
  )
}

function GraphicCode({ name }) {
  const asset = GRAPHIC_ASSETS[name]
  if (!asset) return null
  const varName = `IMG_${name.toUpperCase()}`
  const code = [
    `// ${asset.figmaName}`,
    `const ${varName} = '${asset.url}'`,
    ``,
    `<img src={${varName}} alt="${name}" />`,
  ].join('\n')
  return (
    <div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', padding: '8px 16px 6px', letterSpacing: '0.04em' }}>
        JSX
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// CODE OUTPUT
// ══════════════════════════════════════════════════════════

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      <pre style={{
        margin:          0,
        padding:         '16px',
        backgroundColor: '#0F1117',
        color:           '#E2E8F0',
        fontSize:        '11px',
        lineHeight:      '1.7',
        fontFamily:      '"Geist Mono", "SF Mono", Consolas, monospace',
        overflow:        'auto',
        whiteSpace:      'pre',
      }}>
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        style={{
          position:        'absolute',
          top:             '8px',
          right:           '8px',
          padding:         '3px 8px',
          backgroundColor: copied ? '#22C55E20' : '#FFFFFF15',
          color:           copied ? '#22C55E' : '#9CA3AF',
          border:          '1px solid #FFFFFF20',
          borderRadius:    '4px',
          fontSize:        '10px',
          cursor:          'pointer',
          fontFamily:      'inherit',
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function ComponentCode({ name, controls: c }) {
  if (!c) return null

  const snippets = {
    Button: () => {
      const isIconOnly = c.hasLeadingIcon && !c.hasLabel
      const lines = [
        `import { Button } from '@/components/Button'`,
        ``,
        `<Button`,
        `  variant="${c.variant}"`,
        `  color="${c.color}"`,
        `  size="${c.size}"`,
      ]
      if (c.hasLeadingIcon)  lines.push(`  hasLeadingIcon`)
      if (!c.hasLabel)       lines.push(`  hasLabel={false}`)
      if (c.hasTrailingIcon) lines.push(`  hasTrailingIcon`)
      if (c.state === 'disabled') lines.push(`  disabled`)
      if (c.hasLabel)   lines.push(`  label="${c.label || '버튼명'}"`)
      if (isIconOnly)   lines.push(`  ariaLabel="${c.ariaLabel || c.label || '버튼명'}"`)
      lines.push(`/>`)
      return lines.join('\n')
    },
    TextButton: () => {
      const lines = [
        `import { TextButton } from '@/components/TextButton'`,
        ``,
        `<TextButton`,
        `  size="${c.size}"`,
        `  color="${c.color}"`,
      ]
      if (c.hasLeadingIcon)  lines.push(`  hasLeadingIcon`)
      if (c.hasTrailingIcon) lines.push(`  hasTrailingIcon`)
      if (c.state !== 'default') lines.push(`  state="${c.state}"`)
      lines.push(`  label="${c.label || '텍스트버튼'}"`)
      lines.push(`/>`)
      return lines.join('\n')
    },
    ActionsActionArea: () => {
      const lines = [
        `import { ActionsActionArea } from '@/components/ActionsActionArea'`,
        ``,
        `<ActionsActionArea`,
        `  variant="${c.variant}"`,
        `  combination="${c.combination}"`,
      ]
      if (c.slot) lines.push(`  slot={true}`)
      lines.push(`/>`)
      return lines.join('\n')
    },
  }

  return (
    <div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', padding: '8px 16px 6px', letterSpacing: '0.04em' }}>
        JSX
      </div>
      <CodeBlock code={snippets[name]?.() ?? ''} />
    </div>
  )
}

// Token usage table — shows 3-level resolution: CSS var → Figma path → palette → hex
function TokenUsageTable({ name, controls: c }) {
  if (!c) return null

  let tokenMap = {}
  if (name === 'Button')     tokenMap = Button.tokenUsage(c.variant, c.color)
  if (name === 'TextButton') tokenMap = TextButton.tokenUsage(c.color, c.state)

  const isLight = (hex) => {
    if (!hex || hex.startsWith('rgba')) return false
    const r = parseInt(hex.slice(1,3),16)
    const g = parseInt(hex.slice(3,5),16)
    const b = parseInt(hex.slice(5,7),16)
    return (r * 0.299 + g * 0.587 + b * 0.114) > 200
  }

  const cssVarCode = Object.entries(tokenMap)
    .filter(([, key]) => key !== '—')
    .map(([prop, key]) => {
      const r = resolveToken(key)
      if (!r) return `/* ${prop}: --${key} */`
      return `/* ${prop} */\n/* ${r.figmaPath} → ${r.palettePath} */\nvar(--${key})`
    }).join('\n\n')

  return (
    <div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', padding: '16px 16px 6px', letterSpacing: '0.04em' }}>
        TOKEN USAGE
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        {Object.entries(tokenMap).map(([prop, key]) => {
          const resolved = resolveToken(key)
          return (
            <div key={prop} style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {prop}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {resolved && (
                  <div style={{
                    width:           '12px',
                    height:          '12px',
                    borderRadius:    '3px',
                    backgroundColor: resolved.value,
                    border:          isLight(resolved.value) ? '1px solid #E5E7EB' : 'none',
                    flexShrink:      0,
                  }} />
                )}
                <span style={{ fontSize: '11px', color: 'var(--text-icon-normal)', fontFamily: '"Geist Mono", monospace' }}>
                  {key === '—' ? '—' : `--${key}`}
                </span>
              </div>
              {resolved && (
                <div style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-icon-alternative)', fontFamily: '"Geist Mono", monospace' }}>
                    ↳ {resolved.figmaPath}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', fontFamily: '"Geist Mono", monospace' }}>
                    ↳ {resolved.palettePath}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--primary-text-icon)', fontFamily: '"Geist Mono", monospace', fontWeight: 500 }}>
                    ↳ {resolved.value}
                  </div>
                </div>
              )}
              {key === '—' && (
                <div style={{ fontSize: '10px', color: 'var(--text-icon-subtle)', paddingLeft: '18px' }}>not applied</div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', padding: '8px 16px 6px', letterSpacing: '0.04em' }}>
        CSS VARIABLES
      </div>
      <CodeBlock code={cssVarCode} />
    </div>
  )
}

// Foundation code output
function FoundationCode({ name }) {
  const code = {
    Color: `/* ── Layer 1: Palette (confirmed from Figma) ── */
--neutral-white:   #ffffff;
--neutral-950:     #0b0d0d;
--hasamdong-500:   #ff6d1f;   /* brand primary */
--hasamdong-600:   #f04707;   /* brand text    */
/* NOTE: status palette names are TBD             */
/*       from Figma Foundation page               */

/* ── Layer 2: Theme (Semantic) ── */
/* Variable names match Figma exactly:            */
--primary-text-icon: var(--hasamdong-600);
--primary-bgsolid:   var(--hasamdong-500);
--text-icon-normal:  var(--neutral-950);
--text-icon-base:  var(--neutral-white);
--surface-base:  var(--neutral-white);
--border-normal:     rgba(47,49,51,0.16);

/* ── Layer 3: Brand Mode ── */
[data-brand-mode="hasamdong"] {
  --primary-text-icon: var(--hasamdong-600);
  --primary-bgsolid:   var(--hasamdong-500);
}

/* Usage in components */
.button {
  background:  var(--primary-bgsolid);
  color:       var(--text-icon-base);
  font-family: var(--font-family);
}`,

    Typography: `/* Font/Family is a MODE variable */
--font-family: "Pretendard Variable", Pretendard, sans-serif;

/* Switch font globally via data-font-mode: */
[data-font-mode="suit"] {
  --font-family: "SUIT Variable", SUIT, sans-serif;
}
[data-font-mode="gmarket"] {
  --font-family: "GmarketSans", "Gmarket Sans", sans-serif;
}

/* Type scale — confirmed from Figma MCP */
/* titleSmall/Bold:   18px / w700 / lh1.35 / ls-0.25px */
/* body/Medium:       16px / w500 / lh1.35 / ls-0.25px */
/* bodySmall/Regular: 15px / w400 / lh1.35 / ls-0.25px */
/* label/Medium:      14px / w500 / lh1.35 / ls-0.25px */
/* labelSmall/Bold:   13px / w700 / lh1.35 / ls-0.25px */`,

    Spacing: `/* ── Layer 1: Palette / Dimension ── */
--dimension-2: 2px;  --dimension-4: 4px;
--dimension-6: 6px;  --dimension-8: 8px;
--dimension-10: 10px; --dimension-12: 12px;
--dimension-16: 16px; --dimension-20: 20px;
--dimension-24: 24px; --dimension-32: 32px;
--dimension-40: 40px; --dimension-48: 48px;
--dimension-56: 56px; --dimension-full: 999px;

/* ── Layer 2: Theme / Spacing ── */
--spacing-100: var(--dimension-2);   /* 2px  */
--spacing-200: var(--dimension-4);   /* 4px  */
--spacing-300: var(--dimension-8);   /* 8px  */
--spacing-400: var(--dimension-12);  /* 12px */
--spacing-500: var(--dimension-16);  /* 16px */
--spacing-600: var(--dimension-20);  /* 20px */
--spacing-700: var(--dimension-24);  /* 24px */
--spacing-800: var(--dimension-32);  /* 32px */
--spacing-900: var(--dimension-40);  /* 40px */
--spacing-1000: var(--dimension-48); /* 48px */
--spacing-1100: var(--dimension-56); /* 56px */
--spacing-container-padding: var(--dimension-16); /* 16px (hasamdong) */

/* ── Layer 2: Theme / Radius(Default) ── */
/* Changes per brand mode                 */
--radius-default-100:     var(--dimension-2);  /* hasamdong/tenpersent */
--radius-default-200:      var(--dimension-4);
--radius-default-300:     var(--dimension-6);
--radius-default-400:      var(--dimension-10);
--radius-default-500:     var(--dimension-12);
--radius-default-600:      var(--dimension-16);
--radius-default-circle: var(--dimension-full);

/* ── Layer 2: Theme / Radius(Fixed) ── */
/* Same across all brand modes           */
--radius-fixed-100:      var(--dimension-4);
--radius-fixed-200:     var(--dimension-6);
--radius-fixed-circle: var(--dimension-full);

/* ── Layer 3: Brand Mode overrides ── */
[data-brand-mode="compose-dark"] {
  --spacing-container-padding: var(--dimension-20);
  --radius-default-100:  var(--dimension-4);
  --radius-default-200:   var(--dimension-8);
  --radius-default-300:  var(--dimension-12);
  --radius-default-400:   var(--dimension-16);
  --radius-default-500:  var(--dimension-20);
  --radius-default-600:   var(--dimension-24);
}`,

    Font: `/* Font/Family — switched via data-font-mode */
/* Default: Pretendard */
--font-family: "Pretendard Variable", Pretendard,
               -apple-system, BlinkMacSystemFont, sans-serif;

/* data-font-mode="suit" */
[data-font-mode="suit"] {
  --font-family: "SUIT Variable", SUIT,
                 -apple-system, sans-serif;
}

/* data-font-mode="gmarket" */
[data-font-mode="gmarket"] {
  --font-family: "GmarketSans", "Gmarket Sans",
                 sans-serif;
}

/* Usage — always use the var, never hardcode */
.component {
  font-family: var(--font-family);
}`,
  }

  return (
    <div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', padding: '8px 16px 6px', letterSpacing: '0.04em' }}>
        CSS
      </div>
      <CodeBlock code={code[name] ?? '// No code for this item'} />
    </div>
  )
}

// ── Panel styles ────────────────────────────────────────────
const panelStyle = {
  width:           '280px',
  minWidth:        '280px',
  height:          '100%',
  backgroundColor: 'var(--surface-base)',
  borderLeft:      '1px solid var(--border-light)',
  display:         'flex',
  flexDirection:   'column',
  overflow:        'hidden',
}

const sectionStyle = {
  padding: '16px',
}

const sectionTitleStyle = {
  fontSize:      '11px',
  fontWeight:    700,
  color:         'var(--text-icon-normal)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom:  '14px',
}

function ActionsActionAreaControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="VARIANT">
        <SegmentedControl
          options={ActionsActionArea.variants}
          value={c.variant}
          onChange={v => onChange({ ...c, variant: v })}
        />
      </ControlGroup>

      <ControlGroup label="COMBINATION">
        <SegmentedControl
          options={ActionsActionArea.combinations}
          value={c.combination}
          onChange={v => onChange({ ...c, combination: v })}
        />
      </ControlGroup>

      <ControlGroup label="CONTENT">
        <ToggleSwitch label="Slot Content"  value={c.slot}  onChange={v => onChange({ ...c, slot: v })} />
      </ControlGroup>
    </>
  )
}

function ChipControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="VARIANT">
        <SegmentedControl
          options={Chip.variants}
          value={c.variant}
          onChange={v => onChange({ ...c, variant: v })}
        />
      </ControlGroup>

      <ControlGroup label="SIZE">
        <SegmentedControl
          options={Chip.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>

      <ControlGroup label="STATE">
        <SegmentedControl
          options={Chip.states}
          value={c.state}
          onChange={v => onChange({ ...c, state: v })}
        />
      </ControlGroup>

      <ControlGroup label="CONTENT">
        <ToggleSwitch label="HasLeadingIcon"  value={c.hasLeadingIcon}  onChange={v => onChange({ ...c, hasLeadingIcon: v })} />
        <ToggleSwitch label="HasTrailingIcon" value={c.hasTrailingIcon} onChange={v => onChange({ ...c, hasTrailingIcon: v })} />
      </ControlGroup>

      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function SnackbarControls({ c, onChange }) {
  return (
    <>
      <TextInput
        label="MESSAGE"
        value={c.message}
        onChange={v => onChange({ ...c, message: v })}
      />
    </>
  )
}

function TooltipControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="PLACEMENT">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['top', 'bottom', 'left', 'right'].map(placement => (
            <button
              key={placement}
              onClick={() => onChange({ ...c, placement })}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: c.placement === placement ? 'var(--primary-bgsolid)' : 'var(--surface-light-subtle)',
                color: c.placement === placement ? 'var(--text-icon-base)' : 'var(--text-icon-normal)',
                fontSize: '12px',
                fontWeight: c.placement === placement ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {placement}
            </button>
          ))}
        </div>
      </ControlGroup>
      <TextInput
        label="TEXT"
        value={c.text}
        onChange={v => onChange({ ...c, text: v })}
      />
      <ControlGroup label="VISIBILITY">
        <button
          onClick={() => onChange({ ...c, visible: !c.visible })}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: c.visible ? 'var(--primary-bgsolid)' : 'var(--surface-light-subtle)',
            color: 'var(--text-icon-base)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            width: '100%',
          }}
        >
          {c.visible ? 'Hide' : 'Show'}
        </button>
      </ControlGroup>
    </>
  )
}

function TabControls({ c, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {c.tabs.map((tab, idx) => (
        <div
          key={tab.id}
          style={{
            padding: '12px',
            backgroundColor: 'var(--surface-light-subtle)',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)' }}>
              탭 {idx + 1}
            </span>
            <ToggleSwitch
              label=""
              value={tab.enabled}
              onChange={v => {
                const newTabs = [...c.tabs]
                newTabs[idx] = { ...tab, enabled: v }
                onChange({ ...c, tabs: newTabs })
              }}
            />
          </div>

          {tab.enabled && (
            <>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>상태</label>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  {['default', 'active', 'disabled'].map(state => (
                    <button
                      key={state}
                      onClick={() => {
                        const newTabs = [...c.tabs]
                        newTabs[idx] = { ...tab, state }
                        onChange({ ...c, tabs: newTabs })
                      }}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '11px',
                        borderRadius: '4px',
                        border: tab.state === state ? '1px solid var(--border-primary)' : '1px solid var(--border-light)',
                        backgroundColor: tab.state === state ? 'var(--surface-primary-subtle)' : 'var(--surface-base)',
                        color: tab.state === state ? 'var(--text-icon-primary)' : 'var(--text-icon-normal)',
                        cursor: 'pointer',
                        fontWeight: tab.state === state ? 600 : 400,
                      }}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', display: 'block', marginBottom: '4px' }}>
                  라벨
                </label>
                <input
                  type="text"
                  value={tab.label}
                  onChange={e => {
                    const newTabs = [...c.tabs]
                    newTabs[idx] = { ...tab, label: e.target.value }
                    onChange({ ...c, tabs: newTabs })
                  }}
                  style={{
                    width: '100%',
                    padding: '4px 8px',
                    fontSize: '11px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--surface-base)',
                    color: 'var(--text-icon-normal)',
                    fontFamily: 'var(--font-family)',
                    boxSizing: 'border-box',
                  }}
                  placeholder="탭 라벨"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

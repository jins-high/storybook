import { useState } from 'react'
import { themeTokenMap } from '../tokens/theme.js'
import { Button }              from '../components/Button.jsx'
import { IconButton }          from '../components/IconButton.jsx'
import { TextButton }          from '../components/TextButton.jsx'
import { ActionsActionArea }   from '../components/ActionsActionArea.jsx'
import { Chip }                from '../components/Chip.jsx'
import { Tab }                 from '../components/Tab.jsx'
import { Snackbar }            from '../components/Snackbar.jsx'
import { Tooltip }             from '../components/Tooltip.jsx'
import { Badge }    from '../components/Badge.jsx'
import { Input }     from '../components/Input.jsx'
import { Toggle }    from '../components/Toggle.jsx'
import { TextField } from '../components/TextField.jsx'
import { Checkbox } from '../components/Checkbox.jsx'
import { Radio }      from '../components/Radio.jsx'
import { HeroBanner }       from '../components/HeroBanner.jsx'
import { OrderHistoryCard } from '../components/OrderHistoryCard.jsx'
import * as Icons         from '../icons/icons.jsx'
import * as GraphicIcons  from '../icons/graphicIcons.jsx'

// ── All available icon names ────────────────────────────────
const ICON_OPTIONS = [
  { group: 'Direction',           names: ['IconChevronUp','IconChevronDown','IconChevronLeft','IconChevronRight','IconArrowUp','IconArrowDown','IconArrowLeft','IconArrowRight'] },
  { group: 'Thin Arrows',         names: ['IconArrowLeftThin','IconArrowRightThin'] },
  { group: 'Actions',             names: ['IconClose','IconCheck','IconPlus','IconMinus','IconSearch','IconDownload','IconRefresh','IconPen'] },
  { group: 'Status',              names: ['IconCheckCircle','IconPlusCircle','IconMinusCircle','IconPlusFill','IconMinusFill','IconAlertCircle','IconAlertCircleFill','IconErrorCircle','IconInfo','IconInfoFill','IconHelp','IconHelpFill'] },
  { group: 'Commerce',            names: ['IconBag','IconBagFill','IconCart','IconCartFill','IconGift','IconGiftFill','IconCoupon','IconCouponFill','IconCard','IconCardFill'] },
  { group: 'Trash',               names: ['IconTrash','IconTrashFill'] },
  { group: 'User / Social',       names: ['IconPerson','IconPersonFill','IconStar','IconStarOutline','IconStarFill','IconStarRing'] },
  { group: 'System / UI',         names: ['IconMenu','IconBell','IconBellFill','IconStamp','IconStampFill','IconSetting'] },
  { group: 'Location / Home',     names: ['IconHome','IconHomeFill','IconLocation','IconLocationFill'] },
  { group: 'Document / Content',  names: ['IconNote','IconNoteFill','IconCopy','IconCopyFill','IconReplace'] },
  { group: 'Visibility',          names: ['IconEyeOpen','IconEyeClose'] },
  { group: 'Flash / Time',        names: ['IconFlash','IconFlashFill','IconTime','IconTimeFill'] },
  { group: 'F&B / Store',         names: ['IconCutlery','IconCup','IconPaperCup','IconHandBag','IconBarcode','IconReturn','IconCalendar'] },
  { group: 'Graphic / Commerce',  names: ['GraphicIconStamp','GraphicIconGiftCard','GraphicIconCoupon','GraphicIconCard','GraphicIconMembership','GraphicIconGift','GraphicIconOrder','GraphicIconOkCashback','GraphicIconLPoint','GraphicIconFavorites'] },
  { group: 'Graphic / Social',    names: ['GraphicIconKakao','GraphicIconApple','GraphicIconFacebook','GraphicIconInstagram','GraphicIconYoutube'] },
  { group: 'Graphic / UI',        names: ['GraphicIconProfileSetting','GraphicIconList1','GraphicIconList2','GraphicIconChart','GraphicIconNews','GraphicIconSpeaker','GraphicIconEvent','GraphicIconCamera','GraphicIconPicture','GraphicIconPhone','GraphicIconHand','GraphicIconHeadPhone','GraphicIconTalk','GraphicIconCompose'] },
]
const ALL_ICON_NAMES = ICON_OPTIONS.flatMap(g => g.names)

function resolveIconComp(name) {
  if (!name) return null
  if (name.startsWith('GraphicIcon')) return GraphicIcons[name] ?? null
  return Icons[name] ?? null
}

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

  return (
    <div style={panelStyle}>
      {/* CONTROLS section */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Controls</div>
        {type === 'foundation' && <FoundationControls name={name} />}
        {type === 'component'  && name === 'Button'      && <ButtonControls      c={controls.Button}      onChange={v => onChange('Button',      v)} />}
        {type === 'component'  && name === 'IconButton'  && <IconButtonControls  c={controls.IconButton}  onChange={v => onChange('IconButton',  v)} />}
        {type === 'component'  && name === 'TextButton' && <TextButtonControls c={controls.TextButton} onChange={v => onChange('TextButton', v)} />}
        {type === 'component'  && name === 'ActionsActionArea' && <ActionsActionAreaControls c={controls.ActionsActionArea} onChange={v => onChange('ActionsActionArea', v)} />}
        {type === 'component'  && name === 'Chip' && <ChipControls c={controls.Chip} onChange={v => onChange('Chip', v)} />}
        {type === 'component'  && name === 'Tab' && <TabControls c={controls.Tab} onChange={v => onChange('Tab', v)} />}
        {type === 'component'  && name === 'Snackbar' && <SnackbarControls c={controls.Snackbar} onChange={v => onChange('Snackbar', v)} />}
        {type === 'component'  && name === 'Tooltip' && <TooltipControls c={controls.Tooltip} onChange={v => onChange('Tooltip', v)} />}
        {type === 'component'  && name === 'Checkbox' && <CheckboxControls c={controls.Checkbox} onChange={v => onChange('Checkbox', v)} />}
        {type === 'component'  && name === 'CheckboxInput' && <CheckboxInputControls c={controls.CheckboxInput} onChange={v => onChange('CheckboxInput', v)} />}
        {type === 'component'  && name === 'Radio' && <RadioControls c={controls.Radio} onChange={v => onChange('Radio', v)} />}
        {type === 'component'  && name === 'RadioInput' && <RadioInputControls c={controls.RadioInput} onChange={v => onChange('RadioInput', v)} />}
        {type === 'component'  && name === 'Checkmark' && <CheckmarkControls c={controls.Checkmark} onChange={v => onChange('Checkmark', v)} />}
        {type === 'component'  && name === 'CheckmarkInput' && <CheckmarkInputControls c={controls.CheckmarkInput} onChange={v => onChange('CheckmarkInput', v)} />}
        {type === 'component'  && name === 'EmptyState' && <EmptyStateControls c={controls.EmptyState} onChange={v => onChange('EmptyState', v)} />}
        {type === 'component'  && name === 'TextField'  && <TextFieldControls  c={controls.TextField}  onChange={v => onChange('TextField',  v)} />}
        {type === 'component'  && name === 'Title'      && <TitleControls      c={controls.Title}      onChange={v => onChange('Title',      v)} />}
        {type === 'component'  && name === 'MicroBadge'    && <MicroBadgeControls    c={controls.MicroBadge}    onChange={v => onChange('MicroBadge',    v)} />}
        {type === 'component'  && name === 'MembershipChip' && <MembershipChipControls c={controls.MembershipChip} onChange={v => onChange('MembershipChip', v)} />}
        {type === 'component'  && name === 'Filter'         && <FilterControls         c={controls.Filter}         onChange={v => onChange('Filter',         v)} />}
        {type === 'component'  && name === 'RankLabel'       && <RankLabelControls       c={controls.RankLabel}       onChange={v => onChange('RankLabel',       v)} />}
        {type === 'component'  && name === 'OrderStatusCard' && <OrderStatusCardControls c={controls.OrderStatusCard} onChange={v => onChange('OrderStatusCard', v)} />}
        {type === 'component'  && name === 'StoreList'        && <StoreListControls        c={controls.StoreList}        onChange={v => onChange('StoreList',        v)} />}
        {type === 'component'  && name === 'StoreSelector'   && <StoreSelectorControls    c={controls.StoreSelector}    onChange={v => onChange('StoreSelector',    v)} />}
        {type === 'component'  && name === 'Stepper'         && <StepperControls          c={controls.Stepper}          onChange={v => onChange('Stepper',          v)} />}
        {type === 'component'  && name === 'OptionList'      && <OptionListControls        c={controls.OptionList}        onChange={v => onChange('OptionList',        v)} />}
        {type === 'component'  && name === 'ProductList'     && <ProductListControls       c={controls.ProductList}       onChange={v => onChange('ProductList',       v)} />}
        {type === 'component'  && name === 'ReorderCard'        && <ReorderCardControls        c={controls.ReorderCard}        onChange={v => onChange('ReorderCard',        v)} />}
        {type === 'component'  && name === 'TemperatureDisplay'  && <TemperatureDisplayControls  c={controls.TemperatureDisplay}  onChange={v => onChange('TemperatureDisplay',  v)} />}
        {type === 'component'  && name === 'CartItem'            && <CartItemControls            c={controls.CartItem}            onChange={v => onChange('CartItem',            v)} />}
        {type === 'component'  && name === 'OrderStateDisplay'   && <OrderStateDisplayControls   c={controls.OrderStateDisplay}   onChange={v => onChange('OrderStateDisplay',   v)} />}
        {type === 'component'  && name === 'OrderHistoryList'    && <OrderHistoryListControls    c={controls.OrderHistoryList}    onChange={v => onChange('OrderHistoryList',    v)} />}
        {type === 'component'  && name === 'CouponList'          && <CouponListControls          c={controls.CouponList}          onChange={v => onChange('CouponList',          v)} />}
        {type === 'component'  && name === 'CardList'            && <CardListControls            c={controls.CardList}            onChange={v => onChange('CardList',            v)} />}
        {type === 'component'  && name === 'GiftCoupon'          && <GiftCouponControls          c={controls.GiftCoupon}          onChange={v => onChange('GiftCoupon',          v)} />}
        {type === 'component'  && name === 'MyPageButton'        && <MyPageButtonControls        c={controls.MyPageButton}        onChange={v => onChange('MyPageButton',        v)} />}
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border-normal)' }} />

      {/* CODE section */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {inspectedEl ? (
          <ElementInspector info={inspectedEl} onClose={onClearInspect} />
        ) : (
          <>
            <div style={{ ...sectionStyle, paddingBottom: '8px' }}>
              <div style={sectionTitleStyle}>Code</div>
            </div>
            {type === 'component' && (name === 'Button' || name === 'IconButton' || name === 'TextButton' || name === 'ActionsActionArea' || name === 'Chip' || name === 'Tab' || name === 'Snackbar' || name === 'Title') && (
              <>
                <ComponentCode  name={name} controls={controls[name]} />
                <TokenUsageTable name={name} controls={controls[name]} />
              </>
            )}
            {type === 'foundation' && <FoundationCode name={name} />}
          </>
        )}
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
  const { tag, isSvg, dataInspect, text, src, breadcrumb, rect, cssVars: cv, styles } = info
  const code = genCode(info)

  const hasBorder  = styles.borderWidth !== '0px' && styles.borderStyle !== 'none'
  const hasTypo    = styles.fontSize && (tag === 'span' || tag === 'p' || tag === 'div' || tag === 'button' || tag === 'label' || text)
  const hasSpacing = styles.padding || (styles.borderRadius && styles.borderRadius !== '0px')
  const hasStrokeFill = cv['stroke'] || cv['fill']

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
            color: dataInspect ? 'var(--text-icon-primary)' : 'var(--text-icon-strong)',
            backgroundColor: 'var(--surface-heavy-subtle)',
            padding: '2px 6px', borderRadius: '4px',
          }}>
            {dataInspect || `<${isSvg ? 'svg' : tag}>`}
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

        {/* STROKE / FILL (from child SVG) */}
        {hasStrokeFill && (
          <InspectSection title="TOKEN USAGE">
            {cv['stroke'] && (
              <div style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', width: '40px' }}>stroke</span>
                  <ICode>{cv['stroke']}</ICode>
                </div>
                {resolveToken(cv['stroke'].replace('--', '')) && (
                  <div style={{ marginLeft: '48px', marginTop: '2px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-icon-disabled)' }}>
                      {resolveToken(cv['stroke'].replace('--', ''))?.figmaPath}
                    </span>
                  </div>
                )}
              </div>
            )}
            {cv['fill'] && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', width: '40px' }}>fill</span>
                  <ICode>{cv['fill']}</ICode>
                </div>
                {resolveToken(cv['fill'].replace('--', '')) && (
                  <div style={{ marginLeft: '48px', marginTop: '2px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-icon-disabled)' }}>
                      {resolveToken(cv['fill'].replace('--', ''))?.figmaPath}
                    </span>
                  </div>
                )}
              </div>
            )}
          </InspectSection>
        )}

        {/* TEXT / COLOR */}
        {(!isTransparent(styles.color) || cv['color']) && !isSvg && !hasStrokeFill && (
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
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {options.map(opt => (
        <Chip
          key={opt}
          variant="outline"
          size="sm"
          state={value === opt ? 'active' : 'default'}
          label={opt}
          onClick={() => onChange(opt)}
        />
      ))}
    </div>
  )
}

function ToggleSwitch({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <Toggle size="sm" checked={value} onChange={onChange} label={label} />
    </div>
  )
}

function TextInput({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <TextField
        hasLabel={true}
        labelText={label}
        value={value}
        onChange={onChange}
        placeholder=""
        state="Default"
      />
    </div>
  )
}

// ── Icon picker dropdown ────────────────────────────────────
function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const IconCurrent = resolveIconComp(value)
  const isGraphic   = value?.startsWith('GraphicIcon')

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
          {IconCurrent && (isGraphic ? <IconCurrent size={16} /> : <IconCurrent size={16} />)}
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
          maxHeight:       '320px',
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
                  const Ic = resolveIconComp(name)
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

function IconButtonControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="VARIANT">
        <SegmentedControl
          options={IconButton.variants}
          value={c.variant}
          onChange={v => onChange({ ...c, variant: v })}
        />
      </ControlGroup>

      <ControlGroup label="SIZE">
        <SegmentedControl
          options={IconButton.sizes}
          value={c.size}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>

      <ControlGroup label="STATE">
        <SegmentedControl
          options={IconButton.states}
          value={c.state}
          onChange={v => onChange({ ...c, state: v })}
        />
      </ControlGroup>
    </>
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
      <ControlGroup label="STATE">
        <SegmentedControl options={['Unchecked', 'Checked', 'Indeterminate', 'Disabled', 'UncheckedDisabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <ControlGroup label="STYLE">
        <SegmentedControl options={['Default', 'Thin']} value={c.style} onChange={v => onChange({ ...c, style: v })} />
      </ControlGroup>
    </>
  )
}

function RadioControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Unselected', 'Selected', 'Disabled', 'UncheckedDisabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <ControlGroup label="STYLE">
        <SegmentedControl options={['Default', 'Thin']} value={c.style} onChange={v => onChange({ ...c, style: v })} />
      </ControlGroup>
    </>
  )
}

function RadioInputControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Unselected', 'Selected', 'Disabled', 'UncheckedDisabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function CheckmarkControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Checked', 'Unchecked', 'Disabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <ControlGroup label="STYLE">
        <SegmentedControl options={['Default', 'Thin']} value={c.style} onChange={v => onChange({ ...c, style: v })} />
      </ControlGroup>
    </>
  )
}

function CheckmarkInputControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Checked', 'Unchecked', 'Disabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function EmptyStateControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="IMAGE">
        <SegmentedControl options={['empty-state', 'empty-wallet', 'empty-notification', 'empty-cart', 'empty-document']} value={c.image} onChange={v => onChange({ ...c, image: v })} />
      </ControlGroup>
      <ControlGroup label="COMBINATION">
        <SegmentedControl options={['None', 'MainOnly', 'WithAlternative', 'WithAssistive']} value={c.combination} onChange={v => onChange({ ...c, combination: v })} />
      </ControlGroup>
      <TextInput label="TITLE"          value={c.title}          onChange={v => onChange({ ...c, title: v })} />
      <TextInput label="DESCRIPTION"    value={c.description}    onChange={v => onChange({ ...c, description: v })} />
      {c.combination !== 'None' && (
        <TextInput label="MAIN LABEL"   value={c.mainLabel}      onChange={v => onChange({ ...c, mainLabel: v })} />
      )}
      {(c.combination === 'WithAlternative' || c.combination === 'WithAssistive') && (
        <TextInput label="ALT LABEL"    value={c.altLabel}       onChange={v => onChange({ ...c, altLabel: v })} />
      )}
      {c.combination === 'WithAssistive' && (
        <TextInput label="ASSISTIVE LABEL" value={c.assistiveLabel} onChange={v => onChange({ ...c, assistiveLabel: v })} />
      )}
    </>
  )
}

function TextFieldControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Default', 'Focused', 'Filled', 'Error', 'Disabled', 'ReadOnly']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="Label"            value={!!c.hasLabel}          onChange={v => onChange({ ...c, hasLabel: v })} />
        <ToggleSwitch label="Placeholder"      value={!!c.hasPlaceholder}    onChange={v => onChange({ ...c, hasPlaceholder: v })} />
        <ToggleSwitch label="Leading Icon"     value={!!c.hasLeadingIcon}    onChange={v => onChange({ ...c, hasLeadingIcon: v })} />
        <ToggleSwitch label="Trailing Clear"   value={!!c.hasTrailingIcon}   onChange={v => onChange({ ...c, hasTrailingIcon: v })} />
        <ToggleSwitch label="Trailing Button"  value={!!c.hasTrailingButton} onChange={v => onChange({ ...c, hasTrailingButton: v })} />
        <ToggleSwitch label="Character Count"  value={!!c.hasCount}          onChange={v => onChange({ ...c, hasCount: v })} />
        <ToggleSwitch label="Helper Text"      value={!!c.hasHelperText}     onChange={v => onChange({ ...c, hasHelperText: v })} />
      </ControlGroup>
      <TextInput label="LABEL TEXT"    value={c.labelText}      onChange={v => onChange({ ...c, labelText: v })} />
      {c.hasPlaceholder && (
        <TextInput label="PLACEHOLDER" value={c.placeholderText} onChange={v => onChange({ ...c, placeholderText: v })} />
      )}
      <TextInput label="VALUE"         value={c.value}          onChange={v => onChange({ ...c, value: v })} />
      {c.hasCount && (
        <TextInput label="MAX COUNT"   value={String(c.maxCount)} onChange={v => onChange({ ...c, maxCount: Number(v) || 12 })} />
      )}
      {c.hasHelperText && (
        <TextInput label="HELPER TEXT" value={c.helperText}     onChange={v => onChange({ ...c, helperText: v })} />
      )}
    </>
  )
}

function MembershipChipControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="아이콘 표시"         value={!!c.showIcon}   onChange={v => onChange({ ...c, showIcon: v })} />
        <ToggleSwitch label="최대값 표시 (/max)"  value={!!c.numberMax}  onChange={v => onChange({ ...c, numberMax: v })} />
      </ControlGroup>
      {c.showIcon && (
        <ControlGroup label="ICON">
          <IconPicker
            value={c.iconName ?? 'IconStamp'}
            onChange={v => onChange({ ...c, iconName: v })}
          />
        </ControlGroup>
      )}
      <TextInput label="TEXT"   value={c.text}   onChange={v => onChange({ ...c, text: v })} />
      <TextInput label="NUMBER" value={c.number} onChange={v => onChange({ ...c, number: v })} />
      {c.numberMax && (
        <TextInput label="MAX" value={c.max} onChange={v => onChange({ ...c, max: v })} />
      )}
    </>
  )
}

function MicroBadgeControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STYLE">
        <SegmentedControl options={['YellowSolid', 'GreenSolid', 'VioletSolid', 'RedSolid', 'BlackSolid', 'BlackLine', 'GarySolid', 'Disabled']} value={c.style} onChange={v => onChange({ ...c, style: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function TitleControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="HIERARCHY">
        <SegmentedControl options={['Primary', 'Secondary']} value={c.hierarchy} onChange={v => onChange({ ...c, hierarchy: v })} />
      </ControlGroup>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="필수 표시 (Required)" value={!!c.hasRequired} onChange={v => onChange({ ...c, hasRequired: v })} />
        <ToggleSwitch label="우측 버튼 (Button)"   value={!!c.hasButton}   onChange={v => onChange({ ...c, hasButton: v })} />
      </ControlGroup>
      <TextInput label="TEXT" value={c.text} onChange={v => onChange({ ...c, text: v })} />
      {c.hasButton && (
        <>
          <ControlGroup label="BUTTON">
            <TextInput label="LABEL" value={c.buttonLabel} onChange={v => onChange({ ...c, buttonLabel: v })} />
            <ToggleSwitch label="Leading Icon"  value={!!c.buttonHasLeadingIcon}          onChange={v => onChange({ ...c, buttonHasLeadingIcon: v })} />
            <ToggleSwitch label="Trailing Icon" value={c.buttonHasTrailingIcon !== false} onChange={v => onChange({ ...c, buttonHasTrailingIcon: v })} />
          </ControlGroup>
          {(c.buttonHasLeadingIcon || c.buttonHasTrailingIcon !== false) && (
            <ControlGroup label="BUTTON ICON">
              <IconPicker
                value={c.buttonIconName ?? 'IconArrowRight'}
                onChange={v => onChange({ ...c, buttonIconName: v })}
              />
            </ControlGroup>
          )}
        </>
      )}
    </>
  )
}

function FilterControls({ c, onChange }) {
  const presetOptions = ['최근 1개월', '최근 6개월', '직접입력']
  return (
    <>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="라벨 표시 (hasLabel)" value={!!c.hasLabel} onChange={v => onChange({ ...c, hasLabel: v })} />
      </ControlGroup>
      <TextInput label="LABEL TEXT" value={c.label} onChange={v => onChange({ ...c, label: v })} />
      <ControlGroup label="선택값 (VALUE)">
        <SegmentedControl options={presetOptions} value={c.value} onChange={v => onChange({ ...c, value: v })} />
      </ControlGroup>
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
        backgroundColor: 'var(--static-black)',
        color:           'var(--static-white)',
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
          backgroundColor: copied ? 'var(--surface-success-subtle)' : 'transparent',
          color:           copied ? 'var(--text-icon-success)' : 'var(--static-white)',
          border:          copied ? '1px solid var(--border-success-subtle)' : '1px solid var(--border-heavy)',
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
    IconButton: () => {
      const lines = [
        `import { IconButton } from '@/components/IconButton'`,
        ``,
        `<IconButton`,
        `  variant="${c.variant}"`,
        `  size="${c.size}"`,
      ]
      if (c.state !== 'default') lines.push(`  state="${c.state}"`)
      lines.push(`  icon={<YourIcon />}`)
      lines.push(`/>`)
      return lines.join('\n')
    },
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
    EmptyState: () => {
      const lines = [
        `import { EmptyState } from '@/components/EmptyState'`,
        ``,
        `<EmptyState`,
        `  image="${c.image}"`,
        `  title="${c.title}"`,
      ]
      if (c.description) lines.push(`  description="${c.description}"`)
      if (c.combination !== 'None') {
        lines.push(`  combination="${c.combination}"`)
        lines.push(`  mainLabel="${c.mainLabel}"`)
        if (c.combination === 'WithAlternative' || c.combination === 'WithAssistive')
          lines.push(`  altLabel="${c.altLabel}"`)
        if (c.combination === 'WithAssistive')
          lines.push(`  assistiveLabel="${c.assistiveLabel}"`)
      }
      lines.push(`/>`)
      return lines.join('\n')
    },
    OptionList: () => {
      const lines = [
        `import { OptionList } from '@/components/OptionList'`,
        ``,
        `<OptionList`,
        `  optionName="${c.optionName}"`,
      ]
      if (c.hasPrice)   lines.push(`  price="${c.price}"`)
      if (!c.hasPrice)  lines.push(`  hasPrice={false}`)
      if (c.hasStepper) lines.push(`  hasStepper`)
      lines.push(`  selected={${c.selected}}`)
      if (c.hasStepper) lines.push(`  count={${c.count}}`)
      lines.push(`/>`)
      return lines.join('\n')
    },
    OrderStateDisplay: () => [
      `import { OrderStateDisplay } from '@/components/OrderStateDisplay'`,
      ``,
      `<OrderStateDisplay type="${c.type}" />`,
    ].join('\n'),
    OrderHistoryList: () => [
      `import { OrderHistoryList } from '@/components/OrderHistoryList'`,
      ``,
      `<OrderHistoryList`,
      `  productName="${c.productName}"`,
      `  imageSrc="${c.imageSrc}"`,
      `  orderState="${c.orderState}"`,
      `  storeName="${c.storeName}"`,
      `  price="${c.price}"`,
      `  date="${c.date}"`,
      `/>`,
    ].join('\n'),
    TemperatureDisplay: () => [
      `import { TemperatureDisplay } from '@/components/TemperatureDisplay'`,
      ``,
      `<TemperatureDisplay type="${c.type}" />`,
    ].join('\n'),
    CartItem: () => {
      const lines = [
        `import { CartItem } from '@/components/CartItem'`,
        ``,
        `<CartItem`,
        `  productName="${c.productName}"`,
        `  imageSrc="${c.imageSrc}"`,
        `  temperature="${c.temperature}"`,
        `  basePrice="${c.basePrice}"`,
        `  totalPrice="${c.totalPrice}"`,
        `  count={${c.count}}`,
      ]
      if (!c.checked)    lines.push(`  checked={false}`)
      if (c.state !== 'Default') lines.push(`  state="${c.state}"`)
      if (!c.hasOption1) lines.push(`  hasOption1={false}`)
      else               lines.push(`  option1Name="${c.option1Name}" option1Price="${c.option1Price}"`)
      if (!c.hasOption2) lines.push(`  hasOption2={false}`)
      else               lines.push(`  option2Name="${c.option2Name}" option2Price="${c.option2Price}"`)
      if (!c.hasOption3) lines.push(`  hasOption3={false}`)
      else               lines.push(`  option3Name="${c.option3Name}" option3Price="${c.option3Price}"`)
      if (c.optionSoldOut) lines.push(`  optionSoldOut`)
      lines.push(`/>`)
      return lines.join('\n')
    },
    ReorderCard: () => {
      const lines = [
        `import { ReorderCard } from '@/components/ReorderCard'`,
        ``,
        `<ReorderCard`,
        `  status="${c.status}"`,
      ]
      if (c.status === 'Default') {
        lines.push(`  productName="${c.productName}"`)
        lines.push(`  storeName="${c.storeName}"`)
        lines.push(`  imageSrc="${c.imageSrc}"`)
      }
      lines.push(`/>`)
      return lines.join('\n')
    },
    ProductList: () => {
      const lines = [
        `import { ProductList } from '@/components/ProductList'`,
        ``,
        `<ProductList`,
        `  productName="${c.productName}"`,
        `  price="${c.price}"`,
        `  imageSrc="${c.imageSrc}"`,
      ]
      if (c.state !== 'Default') lines.push(`  state="${c.state}"`)
      if (c.hasNewBadge)         lines.push(`  hasNewBadge`)
      if (c.hasBestBadge)        lines.push(`  hasBestBadge`)
      if (!c.hasHashTag)         lines.push(`  hasHashTag={false}`)
      if (c.hasHashTag && c.hashtags.length)
        lines.push(`  hashtags={${JSON.stringify(c.hashtags)}}`)
      lines.push(`/>`)
      return lines.join('\n')
    },
    Title: () => {
      const lines = [
        `import { Title } from '@/components/Title'`,
        ``,
        `<Title`,
        `  hierarchy="${c.hierarchy}"`,
        `  text="${c.text}"`,
      ]
      if (c.hasRequired) lines.push(`  hasRequired`)
      if (c.hasButton) {
        lines.push(`  hasButton`)
        if (c.buttonLabel && c.buttonLabel !== '버튼명') lines.push(`  buttonLabel="${c.buttonLabel}"`)
        if (c.buttonHasLeadingIcon)          lines.push(`  buttonHasLeadingIcon`)
        if (c.buttonHasTrailingIcon === false) lines.push(`  buttonHasTrailingIcon={false}`)
        if (c.buttonIconName && c.buttonIconName !== 'IconArrowRight') lines.push(`  buttonIconName="${c.buttonIconName}"`)
      }
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
--neutral-white:     #ffffff;
--neutral-950:       #0b0d0d;
--tenpersent-500:    #e35425;   /* brand primary */
--tenpersent-600:    #d04500;   /* brand text    */
/* NOTE: status palette names are TBD             */
/*       from Figma Foundation page               */

/* ── Layer 2: Theme (Semantic) ── */
/* Variable names match Figma exactly:            */
--primary-text-icon: var(--tenpersent-500);
--primary-bgsolid:   var(--tenpersent-500);
--text-icon-normal:  var(--neutral-950);
--text-icon-base:    var(--neutral-white);
--surface-base:      var(--neutral-white);
--border-normal:     rgba(47,49,51,0.16);

/* ── Layer 3: Brand Mode ── */
[data-brand-mode="tenpercent"] {
  --primary-text-icon: var(--tenpersent-500);
  --primary-bgsolid:   var(--tenpersent-500);
  --font-family: "SUIT Variable", SUIT, sans-serif;
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
--spacing-container-padding: var(--dimension-16); /* 16px (tenpercent) */

/* ── Layer 2: Theme / Radius(Default) ── */
/* Changes per brand mode                 */
--radius-default-100:     var(--dimension-2);  /* tenpercent */
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
        <SegmentedControl options={['top', 'bottom', 'left', 'right']} value={c.placement} onChange={v => onChange({ ...c, placement: v })} />
      </ControlGroup>
      <ControlGroup label="ALIGN">
        <SegmentedControl options={['start', 'center', 'end']} value={c.align} onChange={v => onChange({ ...c, align: v })} />
      </ControlGroup>
      <TextInput
        label="TEXT"
        value={c.text}
        onChange={v => onChange({ ...c, text: v })}
      />
      <ControlGroup label="VISIBILITY">
        <Button
          variant={c.visible ? 'solid' : 'outline'}
          color="primary"
          size="sm"
          label={c.visible ? 'Hide' : 'Show'}
          onClick={() => onChange({ ...c, visible: !c.visible })}
          style={{ width: '100%' }}
        />
      </ControlGroup>
    </>
  )
}

function TabControls({ c, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ControlGroup label="SIZE">
        <SegmentedControl
          options={Tab.sizes}
          value={c.size ?? 'md'}
          onChange={v => onChange({ ...c, size: v })}
        />
      </ControlGroup>
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
              <SegmentedControl
                options={['default', 'active', 'disabled']}
                value={tab.state}
                onChange={state => {
                  const newTabs = [...c.tabs]
                  newTabs[idx] = { ...tab, state }
                  onChange({ ...c, tabs: newTabs })
                }}
              />
              <TextField
                hasLabel={true}
                labelText="라벨"
                value={tab.label}
                onChange={label => {
                  const newTabs = [...c.tabs]
                  newTabs[idx] = { ...tab, label }
                  onChange({ ...c, tabs: newTabs })
                }}
                placeholder="탭 라벨"
                state="Default"
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

function CheckboxInputControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Unchecked', 'Checked', 'Indeterminate', 'Disabled', 'UncheckedDisabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="SIZE">
        <SegmentedControl options={['Small', 'Medium']} value={c.size} onChange={v => onChange({ ...c, size: v })} />
      </ControlGroup>
      <TextInput label="LABEL" value={c.label} onChange={v => onChange({ ...c, label: v })} />
    </>
  )
}

function RankLabelControls({ c, onChange }) {
  return (
    <ControlGroup label="TIER">
      <SegmentedControl options={['Bronze', 'Silver', 'Gold', 'Diamond']} value={c.tier} onChange={v => onChange({ ...c, tier: v })} />
    </ControlGroup>
  )
}

function StepperControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="COUNT">
        <SegmentedControl options={['1','2','3','4','5','6','7','8','9','10']} value={String(c.count)} onChange={v => onChange({ ...c, count: Number(v) })} />
      </ControlGroup>
      <div style={{ fontSize: '12px', color: 'var(--text-icon-assistive)', lineHeight: 1.6, paddingTop: '4px' }}>
        min: {c.min} &ensp;/&ensp; max: {c.max}<br/>
        미리보기에서 직접 버튼을 클릭해도 됩니다.
      </div>
    </>
  )
}

function OptionListControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="SELECTED">
        <ToggleSwitch label="Selected" value={!!c.selected} onChange={v => onChange({ ...c, selected: v })} />
      </ControlGroup>
      <ControlGroup label="HAS PRICE">
        <ToggleSwitch label="Has Price" value={!!c.hasPrice} onChange={v => onChange({ ...c, hasPrice: v })} />
      </ControlGroup>
      <ControlGroup label="HAS STEPPER">
        <ToggleSwitch label="Has Stepper" value={!!c.hasStepper} onChange={v => onChange({ ...c, hasStepper: v })} />
      </ControlGroup>
      {c.hasStepper && (
        <ControlGroup label="COUNT">
          <SegmentedControl options={['1','2','3','4','5','6','7','8','9','10']} value={String(c.count)} onChange={v => onChange({ ...c, count: Number(v) })} />
        </ControlGroup>
      )}
      <TextInput label="OPTION NAME" value={c.optionName} onChange={v => onChange({ ...c, optionName: v })} />
      {c.hasPrice && (
        <TextInput label="PRICE" value={c.price} onChange={v => onChange({ ...c, price: v })} />
      )}
    </>
  )
}

function OrderStateDisplayControls({ c, onChange }) {
  return (
    <ControlGroup label="TYPE">
      <SegmentedControl options={['접수대기', '픽업완료', '주문취소']} value={c.type} onChange={v => onChange({ ...c, type: v })} />
    </ControlGroup>
  )
}

function OrderHistoryListControls({ c, onChange }) {
  const PRODUCT_IMAGES = [
    'bigpose-americano-decaf-yabangcha.png',
    'dalgona-latte.png',
    'blueberry-smoothie.png',
    'berry-full-strawberry-juice.png',
    'bigpose-dolce-latte.png',
    'blue-lemonade.png',
    'green-tea-frappe.png',
    'condensed-milk-shaved-ice.png',
  ]
  return (
    <>
      <ControlGroup label="ORDER STATE">
        <SegmentedControl options={['접수대기', '픽업완료', '주문취소']} value={c.orderState} onChange={v => onChange({ ...c, orderState: v })} />
      </ControlGroup>
      <TextInput label="PRODUCT NAME" value={c.productName} onChange={v => onChange({ ...c, productName: v })} />
      <TextInput label="STORE NAME"   value={c.storeName}   onChange={v => onChange({ ...c, storeName: v })} />
      <TextInput label="PRICE"        value={c.price}        onChange={v => onChange({ ...c, price: v })} />
      <TextInput label="DATE"         value={c.date}         onChange={v => onChange({ ...c, date: v })} />
      <ControlGroup label="IMAGE">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PRODUCT_IMAGES.map(img => (
            <button
              key={img}
              onClick={() => onChange({ ...c, imageSrc: img })}
              title={img.replace('.png', '')}
              style={{
                padding: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: c.imageSrc === img ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                outline: c.imageSrc === img ? '2px solid var(--primary-bdsolid)' : 'none',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/product/${img}`}
                alt={img}
                style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
              />
            </button>
          ))}
        </div>
      </ControlGroup>
    </>
  )
}

function TemperatureDisplayControls({ c, onChange }) {
  return (
    <ControlGroup label="TYPE">
      <SegmentedControl options={['ICED', 'ICED ONLY', 'HOT', 'HOT ONLY']} value={c.type} onChange={v => onChange({ ...c, type: v })} />
    </ControlGroup>
  )
}

function CartItemControls({ c, onChange }) {
  const PRODUCT_IMAGES = [
    'berry-full-strawberry-latte.png',
    'bigpose-americano-decaf-yabangcha.png',
    'dalgona-latte.png',
    'blueberry-smoothie.png',
    'berry-full-strawberry-juice.png',
    'bigpose-dolce-latte.png',
    'blue-lemonade.png',
    'green-tea-frappe.png',
  ]
  return (
    <>
      <ControlGroup label="CHECKED">
        <ToggleSwitch label="Checked" value={!!c.checked} onChange={v => onChange({ ...c, checked: v })} />
      </ControlGroup>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Default', 'SoldOut', 'Unavailable']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="TEMPERATURE">
        <SegmentedControl options={['ICED', 'ICED ONLY', 'HOT', 'HOT ONLY']} value={c.temperature} onChange={v => onChange({ ...c, temperature: v })} />
      </ControlGroup>
      <TextInput label="PRODUCT NAME" value={c.productName} onChange={v => onChange({ ...c, productName: v })} />
      <TextInput label="BASE PRICE"   value={c.basePrice}   onChange={v => onChange({ ...c, basePrice: v })} />
      <TextInput label="TOTAL PRICE"  value={c.totalPrice}  onChange={v => onChange({ ...c, totalPrice: v })} />
      <ControlGroup label="COUNT">
        <SegmentedControl options={['1','2','3','4','5']} value={String(c.count)} onChange={v => onChange({ ...c, count: Number(v) })} />
      </ControlGroup>
      <ControlGroup label="OPTION SOLD OUT">
        <ToggleSwitch label="준비된 수량이 부족해요." value={!!c.optionSoldOut} onChange={v => onChange({ ...c, optionSoldOut: v })} />
      </ControlGroup>
      <ControlGroup label="OPTION 1">
        <ToggleSwitch label="Show" value={!!c.hasOption1} onChange={v => onChange({ ...c, hasOption1: v })} />
        {c.hasOption1 && (
          <>
            <TextInput label="옵션명" value={c.option1Name}  onChange={v => onChange({ ...c, option1Name: v })} />
            <TextInput label="가격"   value={c.option1Price} onChange={v => onChange({ ...c, option1Price: v })} />
          </>
        )}
      </ControlGroup>
      <ControlGroup label="OPTION 2">
        <ToggleSwitch label="Show" value={!!c.hasOption2} onChange={v => onChange({ ...c, hasOption2: v })} />
        {c.hasOption2 && (
          <>
            <TextInput label="옵션명" value={c.option2Name}  onChange={v => onChange({ ...c, option2Name: v })} />
            <TextInput label="가격"   value={c.option2Price} onChange={v => onChange({ ...c, option2Price: v })} />
          </>
        )}
      </ControlGroup>
      <ControlGroup label="OPTION 3">
        <ToggleSwitch label="Show" value={!!c.hasOption3} onChange={v => onChange({ ...c, hasOption3: v })} />
        {c.hasOption3 && (
          <>
            <TextInput label="옵션명" value={c.option3Name}  onChange={v => onChange({ ...c, option3Name: v })} />
            <TextInput label="가격"   value={c.option3Price} onChange={v => onChange({ ...c, option3Price: v })} />
          </>
        )}
      </ControlGroup>
      <ControlGroup label="IMAGE">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PRODUCT_IMAGES.map(img => (
            <button
              key={img}
              onClick={() => onChange({ ...c, imageSrc: img })}
              title={img.replace('.png', '')}
              style={{
                padding: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: c.imageSrc === img ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                outline: c.imageSrc === img ? '2px solid var(--primary-bdsolid)' : 'none',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/product/${img}`}
                alt={img}
                style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
              />
            </button>
          ))}
        </div>
      </ControlGroup>
    </>
  )
}

function ReorderCardControls({ c, onChange }) {
  const PRODUCT_IMAGES = [
    'green-tea-frappe.png',
    'bigpose-americano-decaf-yabangcha.png',
    'dalgona-latte.png',
    'blueberry-smoothie.png',
    'berry-full-strawberry-juice.png',
    'bigpose-dolce-latte.png',
    'blue-lemonade.png',
    'condensed-milk-shaved-ice.png',
  ]
  return (
    <>
      <ControlGroup label="STATUS">
        <SegmentedControl options={['Default', 'Empty']} value={c.status} onChange={v => onChange({ ...c, status: v })} />
      </ControlGroup>
      {c.status === 'Default' && (
        <>
          <TextInput label="STORE NAME"   value={c.storeName}   onChange={v => onChange({ ...c, storeName: v })} />
          <TextInput label="PRODUCT NAME" value={c.productName} onChange={v => onChange({ ...c, productName: v })} />
          <ControlGroup label="IMAGE">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {PRODUCT_IMAGES.map(img => (
                <button
                  key={img}
                  onClick={() => onChange({ ...c, imageSrc: img })}
                  title={img.replace('.png', '')}
                  style={{
                    padding: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    backgroundColor: c.imageSrc === img ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                    outline: c.imageSrc === img ? '2px solid var(--primary-bdsolid)' : 'none',
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/product/${img}`}
                    alt={img}
                    style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
                  />
                </button>
              ))}
            </div>
          </ControlGroup>
        </>
      )}
    </>
  )
}

function ProductListControls({ c, onChange }) {
  const PRODUCT_IMAGES = [
    'bigpose-americano-decaf-yabangcha.png',
    'dalgona-latte.png',
    'blueberry-smoothie.png',
    'berry-full-strawberry-juice.png',
    'blue-lemonade.png',
    'bigpose-dolce-latte.png',
    'bigpose-iced-tea.png',
    'condensed-milk-shaved-ice.png',
  ]
  return (
    <>
      <ControlGroup label="DISPLAY">
        <SegmentedControl options={['Horizontal', 'Vertical']} value={c.display} onChange={v => onChange({ ...c, display: v })} />
      </ControlGroup>
      <ControlGroup label="STATE">
        <SegmentedControl options={['Default', 'Disabled']} value={c.state} onChange={v => onChange({ ...c, state: v })} />
      </ControlGroup>
      <ControlGroup label="OPTIONS">
        <ToggleSwitch label="New Badge"  value={!!c.hasNewBadge}  onChange={v => onChange({ ...c, hasNewBadge: v })} />
        <ToggleSwitch label="Best Badge" value={!!c.hasBestBadge} onChange={v => onChange({ ...c, hasBestBadge: v })} />
        <ToggleSwitch label="Hashtag"    value={!!c.hasHashTag}   onChange={v => onChange({ ...c, hasHashTag: v })} />
      </ControlGroup>
      <TextInput label="PRODUCT NAME" value={c.productName} onChange={v => onChange({ ...c, productName: v })} />
      <TextInput label="PRICE"        value={c.price}        onChange={v => onChange({ ...c, price: v })} />
      <ControlGroup label="IMAGE">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PRODUCT_IMAGES.map(img => (
            <button
              key={img}
              onClick={() => onChange({ ...c, imageSrc: img })}
              title={img.replace('.png', '')}
              style={{
                padding: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: c.imageSrc === img ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                outline: c.imageSrc === img ? '2px solid var(--primary-bdsolid)' : 'none',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/product/${img}`}
                alt={img}
                style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
              />
            </button>
          ))}
        </div>
      </ControlGroup>
    </>
  )
}

function StoreSelectorControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="TYPE">
        <SegmentedControl options={['BottomFixed', 'TopContent']} value={c.type} onChange={v => onChange({ ...c, type: v })} />
      </ControlGroup>
      <ControlGroup label="HAS SELECTED STORE">
        <ToggleSwitch label="Has Selected Store" value={!!c.hasSelectedStore} onChange={v => onChange({ ...c, hasSelectedStore: v })} />
      </ControlGroup>
      {c.type === 'BottomFixed' && c.hasSelectedStore && (
        <ControlGroup label="BADGE (준비중)">
          <ToggleSwitch label="Badge" value={!!c.badge} onChange={v => onChange({ ...c, badge: v })} />
        </ControlGroup>
      )}
      {c.hasSelectedStore && (
        <TextInput label="STORE NAME" value={c.storeName} onChange={v => onChange({ ...c, storeName: v })} />
      )}
      <TextInput label="SUBTITLE"   value={c.subtitle}   onChange={v => onChange({ ...c, subtitle: v })} />
    </>
  )
}

function StoreListControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="STYLE">
        <SegmentedControl options={['Default', 'Favorites', 'Preparing', 'ClosedDays', 'Disabled', 'Empty']} value={c.style} onChange={v => onChange({ ...c, style: v })} />
      </ControlGroup>
      {c.style !== 'Empty' && (
        <>
          <TextInput label="STORE NAME"    value={c.storeName}    onChange={v => onChange({ ...c, storeName: v })} />
          <TextInput label="DISTANCE"      value={c.distance}     onChange={v => onChange({ ...c, distance: v })} />
          <TextInput label="ADDRESS"       value={c.address}      onChange={v => onChange({ ...c, address: v })} />
          <TextInput label="BUSINESS HOUR" value={c.businessHour} onChange={v => onChange({ ...c, businessHour: v })} />
        </>
      )}
      {c.style === 'Empty' && (
        <>
          <ControlGroup label="HAS MESSAGE">
            <ToggleSwitch label="Has Empty Message" value={!!c.hasEmptyMessage} onChange={v => onChange({ ...c, hasEmptyMessage: v })} />
          </ControlGroup>
          <TextInput label="EMPTY MESSAGE" value={c.emptyMessage} onChange={v => onChange({ ...c, emptyMessage: v })} />
        </>
      )}
    </>
  )
}

const OSC_PRODUCTS = [
  { key: 'green-tea-frappe',              label: '그린티프라페'   },
  { key: 'iced-honey-americano',          label: '아이스아메리카노' },
  { key: 'dalgona-latte',                 label: '달고나라떼'    },
  { key: 'real-choco-javachip-frappe',    label: '초코자바칩'    },
  { key: 'strawberry-smoothie',           label: '딸기스무디'    },
  { key: 'lemonade',                      label: '레모네이드'    },
]

function OrderStatusCardControls({ c, onChange }) {
  const BASE = import.meta.env.BASE_URL
  return (
    <>
      <ControlGroup label="DISPLAY">
        <SegmentedControl options={['Default', 'Sticky']} value={c.display} onChange={v => onChange({ ...c, display: v })} />
      </ControlGroup>
      <ControlGroup label="STATUS">
        <SegmentedControl options={['Pending', 'Preparing', 'Pickup', 'Rejected']} value={c.status} onChange={v => onChange({ ...c, status: v })} />
      </ControlGroup>
      <ControlGroup label="ORDER TYPE">
        <SegmentedControl options={['테이크아웃', '매장식사']} value={c.orderType} onChange={v => onChange({ ...c, orderType: v })} />
      </ControlGroup>
      <ControlGroup label="PRODUCT IMAGE">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {OSC_PRODUCTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onChange({ ...c, productImage: key })}
              title={label}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                padding: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                backgroundColor: c.productImage === key ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                outline: c.productImage === key ? '2px solid var(--primary-bdsolid)' : 'none',
              }}
            >
              <img
                src={`${BASE}assets/product/${key}.png`}
                alt={label}
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
              />
              <span style={{ fontSize: '9px', color: 'var(--text-icon-assistive)', lineHeight: 1.2, maxWidth: '44px', textAlign: 'center', wordBreak: 'keep-all' }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </ControlGroup>
      <TextInput label="STORE NAME"     value={c.storeName}    onChange={v => onChange({ ...c, storeName: v })} />
      <TextInput label="ITEMS"          value={c.items}        onChange={v => onChange({ ...c, items: v })} />
      {c.status === 'Rejected' && (
        <TextInput label="REJECT REASON" value={c.rejectReason} onChange={v => onChange({ ...c, rejectReason: v })} />
      )}
    </>
  )
}

function CardListControls({ c, onChange }) {
  const BASE = import.meta.env.BASE_URL
  const LOGOS = [
    { file: 'hyudai.png',      label: '현대' },
    { file: 'kb.png',          label: 'KB' },
    { file: 'shinhan.png',     label: '신한' },
    { file: 'samsung.png',     label: '삼성' },
    { file: 'bc.png',          label: 'BC' },
    { file: 'hana.png',        label: '하나' },
    { file: 'lotte.png',       label: '롯데' },
    { file: 'nonghyup.png',    label: '농협' },
    { file: 'wori.png',        label: '우리' },
    { file: 'fallback-card.png', label: '기타' },
  ]
  const isManage  = c.display === 'ManageDefault' || c.display === 'ManageSelected'
  const isPayment = c.display === 'Payment' || c.display === 'PaymentSelected'

  return (
    <>
      <ControlGroup label="DISPLAY">
        <SegmentedControl options={['ManageDefault', 'ManageSelected', 'Payment', 'PaymentSelected']} value={c.display} onChange={v => onChange({ ...c, display: v })} />
      </ControlGroup>

      <ControlGroup label="CARD LOGO">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {LOGOS.map(({ file, label }) => (
            <button
              key={file}
              onClick={() => onChange({ ...c, cardLogoSrc: file })}
              title={label}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                padding: '4px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                backgroundColor: c.cardLogoSrc === file ? 'var(--primary-bgsubtle)' : 'var(--surface-light-subtle)',
                outline: c.cardLogoSrc === file ? '2px solid var(--primary-bdsolid)' : 'none',
              }}
            >
              <img
                src={`${BASE}assets/cardLogo/${file}`}
                alt={label}
                style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px', display: 'block', background: 'white' }}
              />
              <span style={{ fontSize: '9px', color: 'var(--text-icon-assistive)' }}>{label}</span>
            </button>
          ))}
        </div>
      </ControlGroup>

      {isManage && (
        <>
          <TextInput label="BANK NAME"     value={c.bankName}  onChange={v => onChange({ ...c, bankName: v })} />
          <TextInput label="FIRST 4 DIGITS" value={c.firstFour} onChange={v => onChange({ ...c, firstFour: v })} />
          <TextInput label="LAST 4 DIGITS"  value={c.lastFour}  onChange={v => onChange({ ...c, lastFour: v })} />
          {c.display === 'ManageDefault' && (
            <ControlGroup label="REPRESENTATIVE">
              <ToggleSwitch label="대표 카드" value={!!c.representative} onChange={v => onChange({ ...c, representative: v })} />
            </ControlGroup>
          )}
        </>
      )}

      {isPayment && (
        <>
          <TextInput label="BANK SUMMARY" value={c.bankSummary} onChange={v => onChange({ ...c, bankSummary: v })} />
          {c.display === 'Payment' && (
            <ControlGroup label="SELECTED (현재)">
              <ToggleSwitch label="현재 선택" value={!!c.selected} onChange={v => onChange({ ...c, selected: v })} />
            </ControlGroup>
          )}
        </>
      )}
    </>
  )
}

function MyPageButtonControls({ c, onChange }) {
  const ALL_ICONS = [
    'ProfileSetting', 'Favorites', 'List1', 'List2',
    'GiftCard',       'Coupon',    'Card',  'Membership',
    'Stamp',          'Gift',      'Event', 'Chart',
    'News',           'Speaker',   'Phone', 'Camera',
    'Picture',        'Hand',      'HeadPhone', 'Talk',
    'OkCashback',     'Order',     'LPoint',
    'Kakao',          'Apple',
    'Facebook',       'Instagram', 'Youtube', 'Compose',
  ]

  return (
    <>
      <ControlGroup label="DISPLAY">
        <SegmentedControl options={['Horizontal', 'Vertical']} value={c.display} onChange={v => onChange({ ...c, display: v })} />
      </ControlGroup>
      <TextInput label="BUTTON NAME" value={c.buttonName} onChange={v => onChange({ ...c, buttonName: v })} />
      <ControlGroup label="ICON">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {ALL_ICONS.map(name => {
            const IconComp = GraphicIcons[`GraphicIcon${name}`]
            if (!IconComp) return null
            const isActive = c.iconName === name
            return (
              <div
                key={name}
                title={name}
                onClick={() => onChange({ ...c, iconName: name })}
                style={{
                  width: '40px', height: '40px', borderRadius: '6px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: isActive ? '2px solid var(--border-info-solid)' : '2px solid transparent',
                  backgroundColor: isActive ? 'var(--surface-info-subtle)' : 'var(--surface-light-subtle)',
                }}
              >
                <IconComp size={22} />
              </div>
            )
          })}
        </div>
      </ControlGroup>
    </>
  )
}

function GiftCouponControls({ c, onChange }) {
  const BASE = import.meta.env.BASE_URL

  return (
    <>
      <ControlGroup label="DISPLAY TYPE">
        <SegmentedControl options={['ListAvailable', 'ListUnavailable', 'PurchaseDefault', 'PurchaseDisabled']} value={c.display} onChange={v => onChange({ ...c, display: v })} />
      </ControlGroup>
      <TextInput label="COUPON NAME"  value={c.couponName}  onChange={v => onChange({ ...c, couponName: v })} />
      <TextInput label="DATE"         value={c.date}         onChange={v => onChange({ ...c, date: v })} />
      <TextInput label="SENDER NAME"  value={c.senderName}   onChange={v => onChange({ ...c, senderName: v })} />
      {(c.display === 'PurchaseDefault' || c.display === 'PurchaseDisabled') && (
        <>
          <ControlGroup label="DESCRIPTION">
            <ToggleSwitch label="Has Description" value={!!c.description} onChange={v => onChange({ ...c, description: v })} />
          </ControlGroup>
          {c.description && (
            <TextInput label="DESCRIPTION TEXT" value={c.descriptionText} onChange={v => onChange({ ...c, descriptionText: v })} />
          )}
          <ControlGroup label="GIFT CARD IMAGE">
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['gift-card-5000.png', 'gift-card-10000.png', 'gift-card-20000.png', 'gift-card-30000.png', 'gift-card-50000.png'].map(img => (
                <div
                  key={img}
                  onClick={() => onChange({ ...c, giftCardSrc: img })}
                  style={{
                    width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
                    border: c.giftCardSrc === img ? '2px solid var(--border-info-solid)' : '2px solid transparent',
                  }}
                >
                  <img src={BASE + 'assets/product/' + img} alt={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </ControlGroup>
        </>
      )}
      {c.display === 'PurchaseDisabled' && (
        <ControlGroup label="D IMMED">
          <ToggleSwitch label="D Immed" value={!!c.dImmed} onChange={v => onChange({ ...c, dImmed: v })} />
        </ControlGroup>
      )}
    </>
  )
}

function CouponListControls({ c, onChange }) {
  return (
    <>
      <ControlGroup label="DISPLAY TYPE">
        <SegmentedControl options={['ListAvailable', 'ListUnavailable', 'PurchaseUnselected', 'PurchaseSelected']} value={c.displayType} onChange={v => onChange({ ...c, displayType: v })} />
      </ControlGroup>
      <TextInput label="VALUE"       value={c.value}      onChange={v => onChange({ ...c, value: v })} />
      <TextInput label="COUPON NAME" value={c.couponName} onChange={v => onChange({ ...c, couponName: v })} />
      <TextInput label="DATE"        value={c.date}        onChange={v => onChange({ ...c, date: v })} />
    </>
  )
}

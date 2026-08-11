import { useState, useRef, useEffect }      from 'react'
import { palette }                         from '../tokens/palette.js'
import { themeTokenMap, modes }             from '../tokens/theme.js'
import { typography, fontModes }            from '../tokens/typography.js'
import { spacing, radiusDefault, radiusStatic } from '../tokens/spacing.js'
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
import { Checkbox }      from '../components/Checkbox.jsx'
import { CheckboxInput } from '../components/CheckboxInput.jsx'
import { Radio }         from '../components/Radio.jsx'
import { RadioInput }    from '../components/RadioInput.jsx'
import { Checkmark }     from '../components/Checkmark.jsx'
import { CheckmarkInput } from '../components/CheckmarkInput.jsx'
import { EmptyState }    from '../components/EmptyState.jsx'
import { TextField }    from '../components/TextField.jsx'
import { Title }       from '../components/Title.jsx'
import { MicroBadge }      from '../components/MicroBadge.jsx'
import { MembershipChip }  from '../components/MembershipChip.jsx'
import { Filter }          from '../components/Filter.jsx'
import { RankLabel }        from '../components/RankLabel.jsx'
import { OrderStatusCard } from '../components/OrderStatusCard.jsx'
import { StoreList }        from '../components/StoreList.jsx'
import { StoreSelector }    from '../components/StoreSelector.jsx'
import { Stepper }          from '../components/Stepper.jsx'
import { OptionList }       from '../components/OptionList.jsx'
import { ProductList }      from '../components/ProductList.jsx'
import { ReorderCard }         from '../components/ReorderCard.jsx'
import { TemperatureDisplay }  from '../components/TemperatureDisplay.jsx'
import { CartItem }            from '../components/CartItem.jsx'
import { OrderStateDisplay }   from '../components/OrderStateDisplay.jsx'
import { OrderHistoryList }    from '../components/OrderHistoryList.jsx'
import { CouponList }          from '../components/CouponList.jsx'
import { CardList }            from '../components/CardList.jsx'
import { GiftCoupon }          from '../components/GiftCoupon.jsx'
import { MyPageButton }        from '../components/MyPageButton.jsx'
import { HeroBanner }       from '../components/HeroBanner.jsx'
import { OrderHistoryCard } from '../components/OrderHistoryCard.jsx'
import * as Icons        from '../icons/icons.jsx'
import * as GraphicIcons from '../icons/graphicIcons.jsx'

// ══════════════════════════════════════════════════════════
// INSPECTOR LAYER
// ══════════════════════════════════════════════════════════

function rgbToHex(rgb) {
  const m = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!m) return null
  return '#' + m.slice(1).map(n => (+n).toString(16).padStart(2, '0')).join('')
}

function isTransparent(c) {
  return !c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent'
}

function elLabel(el) {
  const tag = el.tagName.toLowerCase()
  if (el.closest('svg') && tag !== 'svg') return null          // SVG internals → skip label, use svg root
  if (el.dataset?.inspect) return el.dataset.inspect
  if (tag === 'img') return `img · ${el.getAttribute('src')?.split('/').pop()}`
  if (tag === 'svg') return 'svg · icon'
  if (tag === 'button') return 'button'
  if (tag === 'input') return `input[${el.type || 'text'}]`
  const txt = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim())
  if (txt) return `${tag} · "${txt.textContent.trim().slice(0, 18)}"`
  return tag
}

function extractElInfo(el, container) {
  const computed = window.getComputedStyle(el)
  const cr = container.getBoundingClientRect()
  const er = el.getBoundingClientRect()

  // Parse CSS var refs from inline style attr: "color: var(--primary-text-icon)"
  const cssVars = {}
  const varRe = /([\w-]+)\s*:\s*var\((--[\w-]+)\)/g
  const styleAttr = el.getAttribute('style') || ''
  let m
  while ((m = varRe.exec(styleAttr)) !== null) cssVars[m[1]] = m[2]

  // Also collect CSS var refs from child elements (SVG stroke/fill, nested styles)
  el.querySelectorAll('*').forEach(child => {
    const childStyle = child.getAttribute('style') || ''
    const re2 = /([\w-]+)\s*:\s*var\((--[\w-]+)\)/g
    let m2
    while ((m2 = re2.exec(childStyle)) !== null) { if (!cssVars[m2[1]]) cssVars[m2[1]] = m2[2] }
    // SVG attributes: stroke, fill
    for (const attr of ['stroke', 'fill', 'color']) {
      const val = child.getAttribute(attr)
      if (val?.startsWith('var(--')) cssVars[attr] = val.slice(4, -1)
    }
  })

  const tag = el.tagName.toLowerCase()

  // Direct text content only
  const textNode = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim())
  const text = textNode?.textContent.trim() ?? null

  // Breadcrumb (up to 5 levels, stopping at container)
  const crumb = []
  let p = el.parentElement
  while (p && p !== container && crumb.length < 5) {
    crumb.unshift(p.tagName.toLowerCase())
    p = p.parentElement
  }

  const pad = [computed.paddingTop, computed.paddingRight, computed.paddingBottom, computed.paddingLeft]
  const hasPad = pad.some(v => v !== '0px')

  return {
    tag,
    isSvg: tag === 'svg',
    dataInspect: el.dataset?.inspect ?? null,
    text,
    src: tag === 'img' ? el.getAttribute('src') : null,
    breadcrumb: crumb,
    rect: { width: Math.round(er.width), height: Math.round(er.height) },
    cssVars,
    styles: {
      color:           computed.color,
      backgroundColor: computed.backgroundColor,
      borderColor:     computed.borderTopColor,
      borderWidth:     computed.borderTopWidth,
      borderStyle:     computed.borderTopStyle,
      borderRadius:    computed.borderRadius,
      fontSize:        computed.fontSize,
      fontWeight:      computed.fontWeight,
      lineHeight:      computed.lineHeight,
      letterSpacing:   computed.letterSpacing,
      padding:         hasPad ? pad.join(' ') : null,
      gap:             computed.gap,
      opacity:         computed.opacity,
    },
  }
}

function InspectorLayer({ children, onInspect }) {
  const containerRef  = useRef(null)
  const captureRef    = useRef(null)
  const selectedElRef = useRef(null)
  const forwardingRef = useRef(false)
  const [hoverRect,    setHoverRect]    = useState(null)
  const [hoverLabel,   setHoverLabel]   = useState(null)
  const [selectRect,   setSelectRect]   = useState(null)
  const [isSelectable, setIsSelectable] = useState(false)

  const relRect = (el) => {
    const cr = containerRef.current.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    return { top: er.top - cr.top, left: er.left - cr.left, width: er.width, height: er.height }
  }

  const realElAt = (e) => {
    captureRef.current.style.pointerEvents = 'none'
    const el = document.elementFromPoint(e.clientX, e.clientY)
    captureRef.current.style.pointerEvents = 'auto'
    return el
  }

  const findMeaningfulEl = (el) => {
    const container = containerRef.current

    // SVG internals → climb to SVG root, but prefer data-inspect ancestor
    const svgRoot = el.closest('svg')
    if (svgRoot && container.contains(svgRoot)) {
      const inspectParent = svgRoot.closest('[data-inspect]')
      if (inspectParent && container.contains(inspectParent)) return inspectParent
      return svgRoot
    }

    const SELECTABLE_TAGS = ['button', 'img', 'input', 'a', 'select', 'textarea', 'label']

    let current = el
    while (current && current !== container) {
      if (current.dataset?.inspect) return current
      const tag = current.tagName.toLowerCase()
      if (SELECTABLE_TAGS.includes(tag)) return current
      current = current.parentElement
    }
    return null
  }

  const handleMove = (e) => {
    const el = realElAt(e)
    if (!el || !containerRef.current.contains(el)) { setHoverRect(null); setIsSelectable(false); return }
    const target = findMeaningfulEl(el)
    setIsSelectable(!!target)
    if (!target || target === selectedElRef.current) { setHoverRect(null); return }
    setHoverRect(relRect(target))
    setHoverLabel(elLabel(target))
  }

  const handleLeave = () => { setHoverRect(null); setHoverLabel(null); setIsSelectable(false) }

  const handleClick = (e) => {
    if (forwardingRef.current) return
    const el = realElAt(e)
    if (!el || !containerRef.current.contains(el)) return
    const target = findMeaningfulEl(el)
    if (!target) {
      selectedElRef.current = null; setSelectRect(null); onInspect(null); return
    }
    // Only allow selection inside the All variants area
    if (!target.closest('[data-variants-area]')) {
      // Propagate clicks to interactive elements — use raw el to bypass data-inspect climbing
      const interactive = el.closest('button, input, a, select')
      if (interactive && !interactive.disabled) {
        forwardingRef.current = true
        interactive.click()
        forwardingRef.current = false
      }
      selectedElRef.current = null; setSelectRect(null); onInspect(null); return
    }
    selectedElRef.current = target
    setSelectRect(relRect(target))
    onInspect(extractElInfo(target, containerRef.current))
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        selectedElRef.current = null; setSelectRect(null); onInspect(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onInspect])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {children}

      {/* Hover highlight */}
      {hoverRect && (
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 10, boxSizing: 'border-box',
          top: hoverRect.top, left: hoverRect.left, width: hoverRect.width, height: hoverRect.height,
          border: '1px solid #4285f4', backgroundColor: 'rgba(66,133,244,0.07)',
        }} />
      )}
      {/* Hover label */}
      {hoverRect && hoverLabel && (
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 12,
          top: hoverRect.top >= 24 ? hoverRect.top - 22 : hoverRect.top + hoverRect.height + 4,
          left: hoverRect.left,
          backgroundColor: '#4285f4', color: '#fff',
          fontSize: '10px', fontFamily: 'monospace',
          padding: '2px 6px', borderRadius: '3px', whiteSpace: 'nowrap',
        }}>
          {hoverLabel}
        </div>
      )}
      {/* Selection highlight */}
      {selectRect && (
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 11, boxSizing: 'border-box',
          top: selectRect.top, left: selectRect.left, width: selectRect.width, height: selectRect.height,
          border: '2px solid #4285f4', backgroundColor: 'rgba(66,133,244,0.1)',
        }} />
      )}
      {/* Full-coverage transparent capture overlay */}
      <div
        ref={captureRef}
        style={{ position: 'absolute', inset: 0, zIndex: 20, cursor: isSelectable ? 'pointer' : 'default' }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      />
    </div>
  )
}

// ══════════════════════════════════════════════════════════

export function CenterPanel({ selectedItem, controls, onInspect }) {
  if (!selectedItem) {
    return (
      <div style={{ ...canvasStyle, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-icon-assistive)' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>◑</div>
          <div style={{ fontSize: '15px', fontWeight: 500 }}>Select an item from the left panel</div>
          <div style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-icon-subtle)' }}>Foundations and Components available</div>
        </div>
      </div>
    )
  }

  return (
    <div style={canvasStyle}>
      <InspectorLayer onInspect={onInspect}>
        {selectedItem.type === 'foundation' && selectedItem.name === 'Color'      && <ColorPreview />}
        {selectedItem.type === 'foundation' && selectedItem.name === 'Typography' && <TypographyPreview />}
        {selectedItem.type === 'foundation' && selectedItem.name === 'Spacing'    && <SpacingPreview />}
        {selectedItem.type === 'foundation' && selectedItem.name === 'Font'       && <FontPreview />}
        {selectedItem.type === 'foundation' && selectedItem.name === 'Icons'         && <IconsPreview />}
        {selectedItem.type === 'foundation' && selectedItem.name === 'GraphicIcons' && <GraphicIconsPreview />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Button'     && <ButtonPreview   c={controls.Button} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'TextButton' && <TextButtonPreview c={controls.TextButton} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'ActionsActionArea' && <ActionsActionAreaPreview c={controls.ActionsActionArea} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Chip' && <ChipPreview c={controls.Chip} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Tab' && <TabPreview c={controls.Tab} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Snackbar' && <SnackbarPreview c={controls.Snackbar} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Tooltip' && <TooltipPreview c={controls.Tooltip} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Checkbox' && <CheckboxPreview c={controls.Checkbox} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'CheckboxInput' && <CheckboxInputPreview c={controls.CheckboxInput} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Radio' && <RadioPreview c={controls.Radio} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'RadioInput' && <RadioInputPreview c={controls.RadioInput} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Checkmark' && <CheckmarkPreview c={controls.Checkmark} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'CheckmarkInput' && <CheckmarkInputPreview c={controls.CheckmarkInput} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'EmptyState'     && <EmptyStatePreview c={controls.EmptyState} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'TextField'      && <TextFieldPreview  c={controls.TextField} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Title'          && <TitlePreview      c={controls.Title} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'MicroBadge'    && <MicroBadgePreview    c={controls.MicroBadge} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'MembershipChip' && <MembershipChipPreview c={controls.MembershipChip} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Filter'         && <FilterPreview         c={controls.Filter} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'RankLabel'       && <RankLabelPreview       c={controls.RankLabel} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'OrderStatusCard' && <OrderStatusCardPreview  c={controls.OrderStatusCard} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'StoreList'        && <StoreListPreview         c={controls.StoreList} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'StoreSelector'   && <StoreSelectorPreview      c={controls.StoreSelector} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Stepper'         && <StepperPreview            c={controls.Stepper} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'OptionList'      && <OptionListPreview          c={controls.OptionList} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'ProductList'     && <ProductListPreview          c={controls.ProductList} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'ReorderCard'        && <ReorderCardPreview        c={controls.ReorderCard} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'TemperatureDisplay' && <TemperatureDisplayPreview  c={controls.TemperatureDisplay} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'CartItem'           && <CartItemPreview            c={controls.CartItem} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'OrderStateDisplay'  && <OrderStateDisplayPreview   c={controls.OrderStateDisplay} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'OrderHistoryList'   && <OrderHistoryListPreview    c={controls.OrderHistoryList} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'CouponList'          && <CouponListPreview           c={controls.CouponList} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'CardList'            && <CardListPreview             c={controls.CardList} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'GiftCoupon'          && <GiftCouponPreview           c={controls.GiftCoupon} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'MyPageButton'        && <MyPageButtonPreview          c={controls.MyPageButton} />}
        {selectedItem.type === 'graphic' && <GraphicPreview name={selectedItem.name} />}
      </InspectorLayer>
    </div>
  )
}

// ── Canvas wrapper ──────────────────────────────────────────
const canvasStyle = {
  flex:            1,
  height:          '100%',
  overflow:        'auto',
  backgroundColor: 'var(--surface-base)',
  display:         'flex',
  flexDirection:   'column',
}

// ── Section helpers ─────────────────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-icon-strong)' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: 'var(--text-icon-assistive)', marginTop: '4px' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  )
}

function Mono({ children, color = 'var(--text-icon-assistive)' }) {
  return (
    <span style={{ fontFamily: '"Geist Mono", "SF Mono", Consolas, monospace', fontSize: '10px', color }}>
      {children}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════
// COLOR PREVIEW
// ═══════════════════════════════════════════════════════════
function ColorPreview() {
  // Group themeTokenMap entries by figmaPath prefix
  const tokenGroups = {}
  Object.entries(themeTokenMap).forEach(([cssKey, token]) => {
    const parts = token.figmaPath.split('/')
    const group = parts[0].toLowerCase() === 'color'
      ? parts[1].toLowerCase()
      : parts[0].toLowerCase()
    if (!tokenGroups[group]) tokenGroups[group] = []
    tokenGroups[group].push({ cssKey, ...token })
  })

  const groupLabels = {
    primary:    'Primary (brand · mode-dependent)',
    'text&icon':  'Text & Icon',
    surface:      'Surface / Background',
    border:       'Border',
    dimmer:       'Dimmer',
    static:       'Static (mode-invariant)',
    status:       'Status (palette TBD)',
  }

  const isLight = (hex) => {
    if (!hex || hex.startsWith('rgba')) return false
    const r = parseInt(hex.slice(1,3),16)
    const g = parseInt(hex.slice(3,5),16)
    const b = parseInt(hex.slice(5,7),16)
    return (r * 0.299 + g * 0.587 + b * 0.114) > 200
  }

  return (
    <div>
      {/* Palette — Layer 1 */}
      <Section title="Layer 1 — Palette (Primitive)" subtitle="Raw color values. Never used directly in components — always referenced through a semantic token.">
        {Object.entries(palette).map(([colorName, steps]) => (
          <div key={colorName} style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', marginBottom: '8px', textTransform: 'capitalize' }}>
              {colorName}
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {Object.entries(steps).map(([step, hex]) => (
                <div key={step} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width:           '48px',
                      height:          '48px',
                      borderRadius:    '8px',
                      backgroundColor: hex,
                      border:          isLight(hex) ? '1px solid #E5E7EB' : 'none',
                    }}
                    title={`--${colorName}/${step.toLowerCase()} = ${hex}`}
                  />
                  <Mono color="var(--text-icon-assistive)">{step}</Mono>
                  <br />
                  <Mono color="var(--text-icon-subtle)">{hex}</Mono>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Theme — Layer 2 */}
      <Section title="Layer 2 — Theme (Semantic)" subtitle="References palette tokens. Carries semantic meaning — same value used differently = different token.">
        {Object.entries(tokenGroups)
          .filter(([g]) => Object.keys(groupLabels).includes(g))
          .map(([group, tokens]) => (
          <div key={group} style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', marginBottom: '10px' }}>
              {groupLabels[group] ?? group}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {tokens.map(({ cssKey, figmaPath, palettePath, value }) => (
                <div
                  key={cssKey}
                  style={{ width: '108px' }}
                  title={`--${cssKey}\nFigma: ${figmaPath}\nPalette: ${palettePath}\nValue: ${value}`}
                >
                  <div style={{
                    width:           '100%',
                    height:          '32px',
                    borderRadius:    '6px',
                    backgroundColor: value,
                    border:          isLight(value) ? '1px solid #E5E7EB' : 'none',
                    marginBottom:    '4px',
                  }} />
                  <div style={{ fontSize: '11px', color: 'var(--text-icon-normal)', fontWeight: 500, lineHeight: 1.3 }}>
                    {figmaPath}
                  </div>
                  <Mono color="var(--text-icon-assistive)">{palettePath}</Mono>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Mode — Layer 3 */}
      <Section title="Layer 3 — Brand Modes" subtitle="Overrides --primary/* tokens per brand. Apply via data-brand-mode attribute on a parent element.">
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {Object.entries(modes).map(([modeKey, mode]) => (
            <div key={modeKey} style={{ minWidth: '200px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-icon-strong)', marginBottom: '8px' }}>
                {mode.name} <Mono color="var(--text-icon-assistive)">data-brand-mode="{modeKey}"</Mono>
              </div>
              {Object.entries(mode.primary).map(([role, token]) => (
                <div key={role} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{
                    width:           '24px',
                    height:          '24px',
                    borderRadius:    '4px',
                    backgroundColor: token.value,
                    flexShrink:      0,
                    border:          isLight(token.value) ? '1px solid #E5E7EB' : 'none',
                  }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-icon-normal)' }}>Primary/{role}</div>
                    <Mono color="var(--text-icon-assistive)">{token.palettePath}</Mono>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// TYPOGRAPHY PREVIEW
// ═══════════════════════════════════════════════════════════
function TypographyPreview() {
  const sampleText = {
    display:      '안녕하세요 Hello World',
    displaySmall: '디자인 시스템 Design System',
    title:        '타이틀 텍스트 Title Text',
    titleSmall:   '서브 타이틀 Subtitle',
    body:         '본문 텍스트입니다. Body text for reading comfort. 디자이너와 개발자가 함께 만드는 일관된 사용자 경험.',
    bodySmall:    '작은 본문 텍스트입니다. Smaller body for secondary content and details.',
    label:        '레이블 텍스트 Label Text',
    labelSmall:   '작은 레이블 Small Label',
    caption:      '캡션 텍스트 Caption',
  }

  const weights = ['Regular', 'Medium', 'Bold']

  return (
    <div>
      {Object.entries(typography).map(([scale, weightMap]) => (
        <Section
          key={scale}
          title={scale}
          subtitle={`Figma: Typography/${scale}  ·  ${weightMap.Regular.fontSize}px / lh${weightMap.Regular.lineHeight} / ls${weightMap.Regular.letterSpacing}px`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {weights.map(weight => {
              const t = weightMap[weight]
              return (
                <div key={weight} style={{ display: 'flex', alignItems: 'baseline', gap: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ width: '80px', flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-normal)' }}>{weight}</div>
                    <Mono color="var(--text-icon-assistive)">w{t.fontWeight}</Mono>
                  </div>
                  <div
                    data-inspect={`${scale} / ${weight}`}
                    style={{
                      fontFamily:    'var(--font-family)',
                      fontSize:      `${t.fontSize}px`,
                      fontWeight:    t.fontWeight,
                      lineHeight:    t.lineHeight,
                      letterSpacing: `${t.letterSpacing}px`,
                      color:         'var(--text-icon-strong)',
                      maxWidth:      '540px',
                      overflow:      'hidden',
                      textOverflow:  'ellipsis',
                      whiteSpace:    t.fontSize >= 20 ? 'nowrap' : 'normal',
                    }}
                  >
                    {sampleText[scale] ?? '안녕하세요 Hello World 1234567890'}
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// SPACING PREVIEW
// ═══════════════════════════════════════════════════════════
function SpacingPreview() {
  return (
    <>
      {/* ── Spacing Scale ── */}
      <Section title="Spacing" subtitle="Figma: Number/Spacing/*  ·  CSS: --spacing-{level}">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {spacing.map(item => (
            <div key={item.level} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Mono color="var(--text-icon-assistive)" style={{ width: '110px', flexShrink: 0 }}>
                {item.cssVar}
              </Mono>
              {item.px !== null ? (
                <>
                  <div style={{
                    width:           `${Math.min(item.px * 3, 360)}px`,
                    minWidth:        '2px',
                    height:          '20px',
                    backgroundColor: 'var(--primary-bgsolid)',
                    borderRadius:    '3px',
                    opacity:         Math.max(0.25, Math.min(0.9, 0.25 + item.px / 96)),
                    flexShrink:      0,
                  }} />
                  <Mono color="var(--text-icon-normal)">{item.px}px</Mono>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '20px', backgroundColor: 'var(--primary-bgsolid)', borderRadius: '3px', opacity: 0.5 }} />
                    <Mono color="var(--text-icon-normal)">16px</Mono>
                    <Mono color="var(--text-icon-assistive)">하삼동</Mono>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '20px', backgroundColor: 'var(--primary-bgsolid)', borderRadius: '3px', opacity: 0.5 }} />
                    <Mono color="var(--text-icon-normal)">20px</Mono>
                    <Mono color="var(--text-icon-assistive)">컴포즈·텐퍼센트</Mono>
                  </div>
                </div>
              )}
              {item.note && (
                <Mono color="var(--text-icon-assistive)" style={{ fontSize: '10px' }}>{item.note}</Mono>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Radius(Default) ── */}
      <Section title="Radius (Default)" subtitle="Figma: Number/Radius(Default)/*  ·  CSS: --radius-default-{size}  ·  브랜드 모드마다 값이 달라집니다">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {radiusDefault.map(item => (
            <div key={item.size} style={{
              padding:         '16px',
              backgroundColor: 'var(--surface-light-subtle)',
              borderRadius:    '8px',
              border:          '1px solid var(--border-light)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Mono color="var(--text-icon-normal)" style={{ fontWeight: 600 }}>{item.size}</Mono>
                <Mono color="var(--text-icon-assistive)" style={{ fontSize: '10px' }}>
                  {item.size === 'Circle' ? '999px' : (
                    `${item.hasamdong}·${item.composeDark}·${item.composeLight}px`
                  )}
                </Mono>
              </div>
              <div style={{
                width:           '100%',
                height:          '48px',
                backgroundColor: 'var(--primary-bgsolid)',
                borderRadius:    item.size === 'Circle' ? '999px' : `var(${item.cssVar})`,
                opacity:         0.7,
              }} />
              <Mono color="var(--text-icon-assistive)" style={{ fontSize: '10px', marginTop: '8px', display: 'block' }}>
                {item.cssVar}
              </Mono>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: 'var(--surface-normal-subtle)', borderRadius: '6px' }}>
          <Mono color="var(--text-icon-assistive)" style={{ fontSize: '11px' }}>
            하삼동 XS/S/SM/M/ML/L = 2·4·6·10·12·16px  ·  컴포즈(dark) = 4·8·12·16·20·24px  ·  텐퍼센트 = 2·4·6·10·12·16px
          </Mono>
        </div>
      </Section>

      {/* ── Radius(Fixed) ── */}
      <Section title="Radius (Fixed)" subtitle="Figma: Number/Radius(Fixed)/*  ·  CSS: --radius-fixed-{size}  ·  모든 브랜드 모드에서 동일">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {radiusStatic.map(item => (
            <div key={item.size} style={{
              padding:         '16px',
              backgroundColor: 'var(--surface-light-subtle)',
              borderRadius:    '8px',
              border:          '1px solid var(--border-light)',
              minWidth:        '160px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Mono color="var(--text-icon-normal)" style={{ fontWeight: 600 }}>{item.size}</Mono>
                <Mono color="var(--text-icon-assistive)">{item.size === 'Circle' ? '999px' : `${item.px}px`}</Mono>
              </div>
              <div style={{
                width:           '100%',
                height:          '48px',
                backgroundColor: 'var(--primary-bgsubtle)',
                border:          '2px solid var(--primary-bdsolid)',
                borderRadius:    item.size === 'Circle' ? '999px' : `${item.px}px`,
              }} />
              <Mono color="var(--text-icon-assistive)" style={{ fontSize: '10px', marginTop: '8px', display: 'block' }}>
                {item.cssVar}
              </Mono>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// FONT PREVIEW
// ═══════════════════════════════════════════════════════════
function FontPreview() {
  const fontModeEntries = [
    { key: 'pretendard', ...fontModes.pretendard, dataAttr: null,         note: 'Default — Korean/Latin. Recommended for all body and UI text.' },
    { key: 'suit',       ...fontModes.suit,       dataAttr: 'suit',       note: 'Korean — Round, friendly. Good for consumer apps.' },
    { key: 'gmarket',   ...fontModes.gmarket,    dataAttr: 'gmarket',    note: 'Korean Display — Distinctive style for headlines and branding.' },
  ]

  return (
    <div>
      {fontModeEntries.map(font => (
        <Section
          key={font.key}
          title={font.name}
          subtitle={`${font.note}${font.dataAttr ? `  ·  data-font-mode="${font.dataAttr}"` : '  ·  default'}`}
        >
          {/* Large specimen */}
          <div style={{ fontFamily: font.value, fontSize: '36px', fontWeight: 700, color: 'var(--text-icon-strong)', marginBottom: '8px', lineHeight: 1.2 }}>
            안녕하세요, 디자인 시스템입니다.
          </div>
          <div style={{ fontFamily: font.value, fontSize: '20px', fontWeight: 400, color: 'var(--text-icon-assistive)', marginBottom: '20px', lineHeight: 1.4 }}>
            가나다라마바사 ABCDEFG abcdefg 0123456789
          </div>
          {/* Weight ramp */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[400, 500, 700].map(w => (
              <div key={w} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <Mono color="var(--text-icon-assistive)" style={{ width: '48px', flexShrink: 0 }}>w{w}</Mono>
                <div style={{ fontFamily: font.value, fontWeight: w, fontSize: '18px', color: 'var(--text-icon-strong)' }}>
                  디자인 시스템 Design System
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '12px' }}>
            <Mono color="var(--text-icon-assistive)">CSS var: --font-family (switched by data-font-mode)</Mono>
          </div>
        </Section>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// COMPONENT PREVIEWS
// ═══════════════════════════════════════════════════════════

function ComponentCanvas({ subtitle, hero, allVariants }) {
  return (
    <div>
      {/* Hero — current state */}
      <div style={{ padding: '32px', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--surface-base)' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-icon-assistive)', marginBottom: '16px' }}>
          {subtitle ?? 'Current state — controlled by right panel'}
        </div>
        <div style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          minHeight:       '80px',
          padding:         '24px',
          width:           '500px',
          backgroundColor: 'var(--surface-base)',
          borderRadius:    '12px',
          border:          '1px solid var(--preview-hero-border)',
        }}>
          {hero}
        </div>
      </div>
      {/* All variants matrix */}
      <div data-variants-area>
        <Section title="All variants" subtitle="Full variant matrix for designer review">
          {allVariants}
        </Section>
      </div>
    </div>
  )
}

// Matrix config for ButtonPreview
const BTN_MATRIX = [
  { variant: 'solid',   color: 'primary'  },
  { variant: 'solid',   color: 'assistive' },
  { variant: 'outline', color: 'primary'  },
  { variant: 'outline', color: 'assistive' },
]

function BtnMatrixRow({ variant, color, hasLeadingIcon = false, hasLabel = true, hasTrailingIcon = false }) {
  const rowLabel = `${variant[0].toUpperCase() + variant.slice(1)} / ${color[0].toUpperCase() + color.slice(1)}`
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>
        {rowLabel}
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {Button.sizes.map(size => (
          <Button
            key={size}
            variant={variant}
            color={color}
            size={size}
            hasLeadingIcon={hasLeadingIcon}
            hasLabel={hasLabel}
            hasTrailingIcon={hasTrailingIcon}
            label={size}
          />
        ))}
        <Button
          variant={variant}
          color={color}
          size="md"
          hasLeadingIcon={hasLeadingIcon}
          hasLabel={hasLabel}
          hasTrailingIcon={hasTrailingIcon}
          state="pressed"
          label="pressed"
        />
        <Button
          variant={variant}
          color={color}
          size="md"
          hasLeadingIcon={hasLeadingIcon}
          hasLabel={hasLabel}
          hasTrailingIcon={hasTrailingIcon}
          state="disabled"
          label="disabled"
        />
      </div>
    </div>
  )
}

function GuideSection({ label, children }) {
  return (
    <div style={{ display: 'flex', gap: '24px', padding: '20px 32px', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ width: '140px', flexShrink: 0, fontSize: '13px', fontWeight: 600, color: 'var(--text-icon-strong)', paddingTop: '2px' }}>
        {label}
      </div>
      <div style={{ flex: 1, fontSize: '13px', color: 'var(--text-icon-normal)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

function ButtonGuide() {
  const SPEC_ROWS = [
    { size: 'Small',  height: '32px (Fixed)', padding: 'Spacing-400',  gap: 'Spacing-300',  radius: 'Radius-300', icon: '16px (Fixed)' },
    { size: 'Medium', height: '48px (Fixed)', padding: 'Spacing-500',  gap: 'Spacing-300',  radius: 'Radius-400', icon: '20px (Fixed)' },
    { size: 'Large',  height: '56px (Fixed)', padding: 'Spacing-600',  gap: 'Spacing-400',  radius: 'Radius-500', icon: '24px (Fixed)' },
  ]
  const CONTENT_PATTERNS = [
    { pattern: 'Label Only',            leading: 'False', label: 'True',  trailing: 'False', desc: '텍스트만 표시' },
    { pattern: 'Leading Icon + Label',  leading: 'True',  label: 'True',  trailing: 'False', desc: '좌측 아이콘과 텍스트 표시' },
    { pattern: 'Label + Trailing Icon', leading: 'False', label: 'True',  trailing: 'True',  desc: '텍스트와 우측 아이콘 표시' },
    { pattern: 'Icon Only',             leading: 'True',  label: 'False', trailing: 'False', desc: '아이콘만 표시' },
  ]
  const thStyle = { fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', padding: '6px 16px 8px 0', textAlign: 'left', borderBottom: '1px solid var(--border-light)', whiteSpace: 'nowrap' }
  const tdStyle = { fontSize: '12px', color: 'var(--text-icon-normal)',    padding: '8px 16px 8px 0', borderBottom: '1px solid var(--border-light)', whiteSpace: 'nowrap' }
  const tdMuted = { fontSize: '12px', color: 'var(--text-icon-assistive)', padding: '8px 16px 8px 0', borderBottom: '1px solid var(--border-light)', whiteSpace: 'nowrap' }

  return (
    <>
      <div style={{ padding: '14px 32px', borderTop: '1px solid var(--border-normal)', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--surface-light-subtle)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-icon-assistive)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Guide Document · Figma 11181:1751
        </div>
      </div>

      <GuideSection label="Purpose">
        Button은 사용자 행동을 실행하거나 화면 전환을 유도하는 컴포넌트입니다. 화이트라벨 환경에서도 일관된 행동 위계를 유지하도록 설계되었습니다.
      </GuideSection>

      <GuideSection label="Structure">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><Mono>Container</Mono> — 버튼의 배경 및 외곽 형태를 정의합니다.</div>
          <div><Mono>Label</Mono> — 텍스트 영역입니다.</div>
          <div><Mono>Icon</Mono> — 아이콘 영역입니다. 버튼의 행동 또는 의미를 보조적으로 표현합니다. Figma에서는 LeadingIcon &amp; TrailingIcon으로 분리하지만, 개발 시 하나의 Icon으로 관리합니다.</div>
          <div><Mono>Interaction Layer</Mono> — Pressed 상태 표현에 사용됩니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="Variant">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><Mono>Solid</Mono> — 채움 기반 스타일입니다. 프로젝트별 Brand Color를 사용합니다. 주요 행동 또는 시각적으로 강조가 필요한 영역에 사용합니다.</div>
          <div><Mono>Outline</Mono> — 경계선 기반 스타일입니다. Information Color 기반 스타일을 사용합니다. 프로젝트 Theme가 변경되어도 동일한 색상 계열을 유지합니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="Color">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>Color는 버튼의 역할 기반 스타일 그룹을 정의합니다.</div>
          <div><Mono>Primary</Mono> — 시각적으로 강조된 행동에 사용합니다. Variant에 따라 서로 다른 색상 계열을 사용할 수 있습니다.</div>
          <div><Mono>Assistive</Mono> — 보조 행동 또는 상대적으로 낮은 강조 수준의 행동에 사용합니다.</div>
          <div style={{ color: 'var(--text-icon-assistive)', marginTop: '2px' }}>* 실제 색상은 Variant 및 프로젝트 Theme에 따라 달라질 수 있습니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="State">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div><Mono>Default</Mono> — 기본 상태입니다.</div>
          <div><Mono>Pressed</Mono> — Interaction Overlay를 사용합니다. 사용자의 터치를 통해 상호작용 상태를 표현합니다.</div>
          <div><Mono>Disabled</Mono> — 상호작용이 발생하지 않습니다. 버튼은 비활성 스타일을 사용하며, 사용자 입력을 받을 수 없습니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="Size">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>사이즈별 Height 값은 고정입니다. Width 값은 커스텀하여 사용 가능합니다.</div>
          <div style={{ color: 'var(--text-icon-assistive)' }}>Fixed / Hug / Fill 모두 사용할 수 있습니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="Content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>Content는 Label과 Icon 조합을 정의합니다.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
            <div><Mono>HasLeadingIcon</Mono> — Leading Icon 표시 여부</div>
            <div><Mono>HasLabel</Mono> — Label 표시 여부</div>
            <div><Mono>HasTrailingIcon</Mono> — Trailing Icon 표시 여부</div>
          </div>
          <div style={{ color: 'var(--text-icon-assistive)', marginTop: '4px' }}>Icon Only는 LeadingIcon 영역을 사용합니다. TrailingIcon 단독 사용은 지원하지 않습니다. HasLeadingIcon과 HasTrailingIcon을 동시에 True로 사용하는 조합은 지원하지 않습니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="Supported Content Patterns">
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {['Pattern', 'HasLeadingIcon', 'HasLabel', 'HasTrailingIcon', 'Description'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONTENT_PATTERNS.map(({ pattern, leading, label, trailing, desc }) => (
              <tr key={pattern}>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{pattern}</td>
                <td style={leading  === 'True' ? tdStyle : tdMuted}>{leading}</td>
                <td style={label    === 'True' ? tdStyle : tdMuted}>{label}</td>
                <td style={trailing === 'True' ? tdStyle : tdMuted}>{trailing}</td>
                <td style={tdMuted}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GuideSection>

      <GuideSection label="Layout Specification">
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {['Size', 'Height', 'Padding', 'Gap', 'Radius', 'Icon'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPEC_ROWS.map(({ size, height, padding, gap, radius, icon }) => (
              <tr key={size}>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{size}</td>
                <td style={tdStyle}>{height}</td>
                <td style={tdStyle}><Mono>{padding}</Mono></td>
                <td style={tdStyle}><Mono>{gap}</Mono></td>
                <td style={tdStyle}><Mono>{radius}</Mono></td>
                <td style={tdStyle}>{icon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GuideSection>

      <GuideSection label="Interaction">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>State는 앱 환경 기준으로 정의합니다.</div>
          <div>Pressed 상태에서는 <Mono>Action/DarkLayer</Mono>를 사용합니다.</div>
          <div>Disabled 상태에서는 상호작용이 발생하지 않습니다.</div>
          <div style={{ color: 'var(--text-icon-assistive)', marginTop: '2px' }}>* Hover 상태는 지원하지 않습니다.</div>
        </div>
      </GuideSection>

      <GuideSection label="Accessibility">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>Icon Only 버튼은 접근성 Label을 포함해야 합니다.</div>
          <div>Disabled 상태에서는 포커스를 받지 않습니다.</div>
        </div>
      </GuideSection>
    </>
  )
}

function ButtonPreview({ c }) {
  const IconComp = Icons[c.iconName ?? 'IconChevronRight']
  const needsIcon = c.hasLeadingIcon || c.hasTrailingIcon
  const iconNode = needsIcon && IconComp ? <IconComp size={24} /> : undefined

  return (
    <div>
      <ComponentCanvas
        subtitle="Button — current controls applied"
        hero={
          <Button
            variant={c.variant}
            color={c.color}
            size={c.size}
            hasLeadingIcon={c.hasLeadingIcon}
            hasLabel={c.hasLabel}
            hasTrailingIcon={c.hasTrailingIcon}
            state={c.state}
            label={c.label || '버튼명'}
            icon={iconNode}
          />
        }
        allVariants={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-icon-normal)', marginBottom: '12px', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Label Only
            </div>
            {BTN_MATRIX.map(({ variant, color }) => (
              <BtnMatrixRow key={`${variant}-${color}`} variant={variant} color={color} />
            ))}

            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-icon-normal)', marginBottom: '12px', marginTop: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Leading Icon + Label
            </div>
            {BTN_MATRIX.map(({ variant, color }) => (
              <BtnMatrixRow key={`lead-${variant}-${color}`} variant={variant} color={color} hasLeadingIcon={true} />
            ))}

            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-icon-normal)', marginBottom: '12px', marginTop: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Label + Trailing Icon
            </div>
            {BTN_MATRIX.map(({ variant, color }) => (
              <BtnMatrixRow key={`trail-${variant}-${color}`} variant={variant} color={color} hasTrailingIcon={true} />
            ))}

            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-icon-normal)', marginBottom: '12px', marginTop: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Icon Only
            </div>
            {BTN_MATRIX.map(({ variant, color }) => (
              <BtnMatrixRow key={`icon-${variant}-${color}`} variant={variant} color={color} hasLeadingIcon={true} hasLabel={false} />
            ))}

          </div>
        }
      />
      <ButtonGuide />
    </div>
  )
}

function BadgePreview({ c }) {
  const variants = Badge.variants
  const sizes    = Badge.sizes

  return (
    <ComponentCanvas
      subtitle="Badge — current controls applied"
      hero={
        <Badge variant={c.variant} size={c.size} dot={c.dot}>
          {c.label || 'Badge'}
        </Badge>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>All variants (size=md)</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {variants.map(v => <Badge key={v} variant={v} size="md">{v}</Badge>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>With dot indicator</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {variants.map(v => <Badge key={v} variant={v} size="md" dot>{v}</Badge>)}
            </div>
          </div>
          {variants.slice(0, 3).map(variant => (
            <div key={variant}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
                variant="{variant}"
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {sizes.map(size => <Badge key={size} variant={variant} size={size}>{size}</Badge>)}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

function InputPreview({ c }) {
  return (
    <ComponentCanvas
      subtitle="Input — current controls applied"
      hero={
        <div style={{ width: '320px' }}>
          <Input
            size={c.size}
            state={c.state}
            disabled={c.disabled}
            label={c.label || 'Label'}
            placeholder={c.placeholder || 'Enter text...'}
            helperText={c.helperText}
          />
        </div>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>States</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
              <Input size="md" state="default" label="Default"  placeholder="Placeholder text" />
              <Input size="md" state="error"   label="Error"    placeholder="Invalid value"     helperText="This field is required" />
              <Input size="md" state="success" label="Success"  placeholder="Valid value"       helperText="Looks good!" />
              <Input size="md" state="default" label="Disabled" placeholder="Not editable"      disabled />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Sizes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
              {['lg', 'md', 'sm'].map(size => (
                <Input key={size} size={size} label={`size=${size}`} placeholder={`${size} input`} />
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

function TogglePreview({ c }) {
  return (
    <ComponentCanvas
      subtitle="Toggle — current controls applied"
      hero={<Toggle checked={c.checked} size={c.size} label={c.checked ? 'On' : 'Off'} />}
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>States</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Toggle checked={false} label="Off" />
              <Toggle checked={true}  label="On" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>
              Sizes — Figma: size=true(lg) 64×29 / size=false(sm) 48×24
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Toggle.sizes.map(size => (
                <div key={size} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <Toggle size={size} checked={false} label={`size=${size} off`} />
                  <Toggle size={size} checked={true}  label={`size=${size} on`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

function CheckboxPreview({ c, onChange = () => {} }) {
  return (
    <ComponentCanvas
      subtitle="Checkbox — Control/CheckBox"
      hero={
        <Checkbox
          state={c.state}
          size={c.size}
          style={c.style}
          onChange={onChange}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>States</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Checkbox state="Unchecked" />
              <Checkbox state="Checked" />
              <Checkbox state="Indeterminate" />
              <Checkbox state="Disabled" />
              <Checkbox state="UncheckedDisabled" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Sizes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Small', 'Medium'].map(size => (
                <div key={size} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <Checkbox size={size} state="Unchecked" />
                  <Checkbox size={size} state="Checked" />
                  <Checkbox size={size} state="Indeterminate" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Styles</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Default', 'Thin'].map(style => (
                <div key={style} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <Checkbox style={style} state="Unchecked" />
                  <Checkbox style={style} state="Checked" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

function CheckboxInputPreview({ c, onChange = () => {} }) {
  return (
    <ComponentCanvas
      subtitle="Checkbox Input — Input/CheckBox"
      hero={
        <CheckboxInput
          state={c.state}
          size={c.size}
          label={c.label}
          onChange={(newState) => onChange({ state: newState, size: c.size, label: c.label })}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>States</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <CheckboxInput state="Unchecked" label="Unchecked" />
              <CheckboxInput state="Checked" label="Checked" />
              <CheckboxInput state="Indeterminate" label="Indeterminate" />
              <CheckboxInput state="Disabled" label="Disabled" />
              <CheckboxInput state="UncheckedDisabled" label="Disabled (unchecked)" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Sizes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Small', 'Medium'].map(size => (
                <div key={size} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <CheckboxInput size={size} state="Unchecked" label="Unchecked" />
                  <CheckboxInput size={size} state="Checked" label="Checked" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

function RadioPreview({ c }) {
  const states = ['Selected', 'Unselected', 'Disabled', 'UncheckedDisabled']
  const sizes = ['Small', 'Medium']
  const styles = ['Default', 'Thin']
  return (
    <ComponentCanvas
      subtitle="Radio — current controls applied"
      hero={
        <Radio
          state={c.state}
          size={c.size}
          style={c.style}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {styles.map(st => (
            <div key={st}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
                {st}
              </div>
              {sizes.map(size => (
                <div key={size} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>
                    {size}
                  </div>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    {states.map(state => (
                      <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <Radio state={state} size={size} style={st} />
                        <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)' }}>{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    />
  )
}

function RadioInputPreview({ c }) {
  const states = ['Selected', 'Unselected', 'Disabled', 'UncheckedDisabled']
  const sizes = ['Small', 'Medium']
  return (
    <ComponentCanvas
      subtitle="RadioInput — current controls applied"
      hero={
        <RadioInput
          state={c.state}
          size={c.size}
          label={c.label}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sizes.map(size => (
            <div key={size}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
                {size}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {states.map(state => (
                  <RadioInput key={state} state={state} size={size} label={`${state}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// CHECKMARK PREVIEW
// ═══════════════════════════════════════════════════════════
function CheckmarkPreview({ c }) {
  const states = ['Checked', 'Unchecked', 'Disabled']
  const sizes = ['Small', 'Medium']
  const styles = ['Default', 'Thin']
  return (
    <ComponentCanvas
      subtitle="Checkmark — current controls applied"
      hero={
        <Checkmark state={c.state} size={c.size} style={c.style} />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {styles.map(st => (
            <div key={st}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
                {st}
              </div>
              {sizes.map(size => (
                <div key={size} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>{size}</div>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    {states.map(state => (
                      <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <Checkmark state={state} size={size} style={st} />
                        <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)' }}>{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// CHECKMARK INPUT PREVIEW
// ═══════════════════════════════════════════════════════════
function CheckmarkInputPreview({ c }) {
  const states = ['Checked', 'Unchecked', 'Disabled']
  const sizes = ['Small', 'Medium']
  return (
    <ComponentCanvas
      subtitle="CheckmarkInput — current controls applied"
      hero={
        <CheckmarkInput state={c.state} size={c.size} label={c.label} />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sizes.map(size => (
            <div key={size}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
                {size}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {states.map(state => (
                  <CheckmarkInput key={state} state={state} size={size} label={`${state}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// EMPTY STATE PREVIEW
// ═══════════════════════════════════════════════════════════
function EmptyStatePreview({ c }) {
  const images = ['empty-state', 'empty-wallet', 'empty-notification']
  const combinations = ['None', 'MainOnly', 'WithAlternative', 'WithAssistive']
  return (
    <ComponentCanvas
      subtitle="EmptyState — current controls applied"
      hero={
        <div style={{ maxWidth: '375px', width: '100%' }}>
          <EmptyState
            image={c.image}
            title={c.title}
            description={c.description}
            combination={c.combination}
            mainLabel={c.mainLabel}
            altLabel={c.altLabel}
            assistiveLabel={c.assistiveLabel}
          />
        </div>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Image variants × None */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Image variants
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {images.map(img => (
                <div key={img} style={{ maxWidth: '260px', flex: '1 1 220px', border: '1px solid var(--border-normal)', borderRadius: '12px', overflow: 'hidden' }}>
                  <EmptyState image={img} title="검색 결과가 없어요." description="다른 키워드로 검색해보세요." combination="None" />
                </div>
              ))}
            </div>
          </div>
          {/* Action combinations */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Action combinations
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {combinations.map(combo => (
                <div key={combo} style={{ maxWidth: '260px', flex: '1 1 220px', border: '1px solid var(--border-normal)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', padding: '8px 12px 0', fontWeight: 500 }}>{combo}</div>
                  <EmptyState image="empty-state" title="검색 결과가 없어요." description="다른 키워드로 검색해보세요." combination={combo} mainLabel="확인" altLabel="취소" assistiveLabel="다음에 하기" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// TEXT FIELD PREVIEW
// ═══════════════════════════════════════════════════════════
function TextFieldPreview({ c }) {
  const states = ['Default', 'Focused', 'Filled', 'Error', 'Disabled', 'ReadOnly']
  return (
    <ComponentCanvas
      subtitle="TextField — current controls applied"
      hero={
        <div style={{ width: '100%', maxWidth: '375px', padding: '0 24px', boxSizing: 'border-box' }}>
          <TextField
            state={c.state}
            hasLabel={c.hasLabel}
            labelText={c.labelText}
            hasLeadingIcon={c.hasLeadingIcon}
            placeholder={c.placeholder}
            value={c.value}
            hasTrailingIcon={c.hasTrailingIcon}
            hasTrailingButton={c.hasTrailingButton}
            trailingButtonLabel={c.trailingButtonLabel}
            hasCount={c.hasCount}
            maxCount={c.maxCount}
            hasHelperText={c.hasHelperText}
            helperText={c.helperText}
          />
        </div>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* All states */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '16px' }}>
              States
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '375px' }}>
              {states.map(state => (
                <div key={state}>
                  <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>{state}</div>
                  <TextField
                    state={state}
                    hasLabel
                    labelText="레이블"
                    placeholder="입력해주세요"
                    value={state === 'Filled' || state === 'Error' || state === 'Disabled' || state === 'ReadOnly' ? '입력된 텍스트' : ''}
                    hasHelperText={state === 'Error'}
                    helperText="오류 메시지입니다."
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Feature variants */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '16px' }}>
              Feature variants
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '375px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Leading icon</div>
                <TextField state="Default" hasLabel labelText="검색" placeholder="검색어를 입력해주세요" hasLeadingIcon value="" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Trailing clear icon (Filled)</div>
                <TextField state="Filled" hasLabel labelText="이름" placeholder="입력해주세요" hasTrailingIcon value="홍길동" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Trailing button</div>
                <TextField state="Default" hasLabel labelText="아이디" placeholder="아이디를 입력해주세요" hasTrailingButton trailingButtonLabel="중복확인" value="" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Count</div>
                <TextField state="Focused" hasLabel labelText="메모" placeholder="메모를 입력해주세요" hasCount maxCount={20} value="안녕하세요" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Helper text</div>
                <TextField state="Default" hasLabel labelText="이메일" placeholder="이메일을 입력해주세요" hasHelperText helperText="도움말 텍스트입니다." value="" />
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// MEMBERSHIP CHIP PREVIEW
// ═══════════════════════════════════════════════════════════
function MembershipChipPreview({ c }) {
  const stampIcon = <Icons.IconStamp style={{ width: 24, height: 24, color: 'var(--text-icon-normal)' }} />

  const variants = [
    { label: 'Icon + text + number/max',  showIcon: true,  text: '스탬프', number: '8',  numberMax: true,  max: '10' },
    { label: 'Icon + text + number only', showIcon: true,  text: '스탬프', number: '8',  numberMax: false, max: '10' },
    { label: 'No icon',                   showIcon: false, text: '스탬프', number: '3',  numberMax: true,  max: '10' },
    { label: 'Full (max reached)',         showIcon: true,  text: '스탬프', number: '10', numberMax: true,  max: '10' },
  ]

  return (
    <ComponentCanvas
      subtitle="MembershipChip — current controls applied"
      hero={
        <MembershipChip
          icon={c.showIcon ? stampIcon : null}
          text={c.text}
          number={c.number}
          numberMax={c.numberMax}
          max={c.max}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {variants.map(v => (
            <div key={v.label}>
              <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>{v.label}</div>
              <div style={{ backgroundColor: 'var(--surface-light-subtle)', padding: '20px', borderRadius: '12px', display: 'inline-flex' }}>
                <MembershipChip
                  icon={v.showIcon ? stampIcon : null}
                  text={v.text}
                  number={v.number}
                  numberMax={v.numberMax}
                  max={v.max}
                />
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// FILTER PREVIEW
// ═══════════════════════════════════════════════════════════

// Standalone wrapper so each allVariants instance has its own value state
function FilterDemo({ initialValue, ...props }) {
  const [val, setVal] = useState(initialValue)
  return <Filter {...props} value={val} onSelect={setVal} />
}

function FilterPreview({ c }) {
  const [localValue, setLocalValue] = useState(c.value)
  useEffect(() => { setLocalValue(c.value) }, [c.value])

  const defaultOptions = ['최근 1주일', '최근 1개월', '최근 3개월', '최근 6개월', '1년']

  return (
    <ComponentCanvas
      subtitle="Filter — 버튼을 클릭하면 바텀시트가 열립니다"
      hero={
        <div style={{ width: '100%', maxWidth: '375px', padding: '0 24px', boxSizing: 'border-box' }}>
          <Filter
            label={c.label}
            value={localValue}
            hasLabel={c.hasLabel}
            options={defaultOptions}
            onSelect={setLocalValue}
          />
        </div>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Label variants */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '16px' }}>
              hasLabel
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '375px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Label + Value</div>
                <FilterDemo initialValue="최근 1개월" label="검색기간" hasLabel options={defaultOptions} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>Value Only</div>
                <FilterDemo initialValue="최근 1개월" label="검색기간" hasLabel={false} options={defaultOptions} />
              </div>
            </div>
          </div>

          {/* Selected values */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '16px' }}>
              Selected State
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '375px' }}>
              {defaultOptions.map(opt => (
                <div key={opt}>
                  <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>{opt}</div>
                  <FilterDemo initialValue={opt} label="검색기간" hasLabel options={defaultOptions} />
                </div>
              ))}
            </div>
          </div>

        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// RANK LABEL PREVIEW
// ═══════════════════════════════════════════════════════════
function RankLabelPreview({ c }) {
  return (
    <div>
      <Section title="Current">
        <RankLabel tier={c.tier} />
      </Section>
      <Section title="All Tiers">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {RankLabel.tiers.map(tier => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', width: '64px', flexShrink: 0 }}>{tier}</span>
              <RankLabel tier={tier} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function OrderStatusCardPreview({ c }) {
  const BASE = import.meta.env.BASE_URL
  const imgSrc = c.productImage ? `${BASE}assets/product/${c.productImage}.png` : undefined

  const cardProps = {
    storeName:    c.storeName,
    orderType:    c.orderType,
    items:        c.items,
    rejectReason: c.rejectReason,
    pendingTime:  c.pendingTime,
    productImage: imgSrc,
  }

  return (
    <div>
      <Section title="Current State" subtitle="Display & Status controlled by right panel">
        <OrderStatusCard display={c.display} status={c.status} {...cardProps} />
      </Section>
      <Section title="All Statuses — Default">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {OrderStatusCard.statuses.map(status => (
            <div key={status}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>{status}</div>
              <OrderStatusCard display="Default" status={status} {...cardProps} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="All Statuses — Sticky">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {OrderStatusCard.statuses.map(status => (
            <div key={status}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>{status}</div>
              <OrderStatusCard display="Sticky" status={status} {...cardProps} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STORE LIST PREVIEW
// ═══════════════════════════════════════════════════════════
function StoreListPreview({ c }) {
  const cardProps = {
    storeName:       c.storeName,
    distance:        c.distance,
    address:         c.address,
    businessHour:    c.businessHour,
    emptyMessage:    c.emptyMessage,
    hasEmptyMessage: c.hasEmptyMessage,
  }

  return (
    <div>
      <Section title="Current State" subtitle="Style controlled by right panel">
        <StoreList style={c.style} {...cardProps} />
      </Section>
      <Section title="All Styles">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {StoreList.styles.map(style => (
            <div key={style}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>{style}</div>
              <StoreList style={style} {...cardProps} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STORE SELECTOR PREVIEW
// ═══════════════════════════════════════════════════════════
function StoreSelectorPreview({ c }) {
  const sharedProps = {
    storeName: c.storeName,
    subtitle:  c.subtitle,
    badge:     c.badge,
  }

  return (
    <div>
      <Section title="Current State" subtitle="Type and hasSelectedStore controlled by right panel">
        <StoreSelector type={c.type} hasSelectedStore={c.hasSelectedStore} {...sharedProps} />
      </Section>
      <Section title="All Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* BottomFixed */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', marginBottom: '12px' }}>BottomFixed</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>hasSelectedStore: false</div>
                <StoreSelector type="BottomFixed" hasSelectedStore={false} {...sharedProps} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>hasSelectedStore: true</div>
                <StoreSelector type="BottomFixed" hasSelectedStore={true} {...sharedProps} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>hasSelectedStore: true + badge</div>
                <StoreSelector type="BottomFixed" hasSelectedStore={true} {...sharedProps} badge={true} />
              </div>
            </div>
          </div>
          {/* TopContent */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', marginBottom: '12px' }}>TopContent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>hasSelectedStore: false</div>
                <StoreSelector type="TopContent" hasSelectedStore={false} {...sharedProps} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>hasSelectedStore: true</div>
                <StoreSelector type="TopContent" hasSelectedStore={true} {...sharedProps} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STEPPER PREVIEW
// ═══════════════════════════════════════════════════════════
function StepperPreview({ c }) {
  const [liveCount, setLiveCount] = useState(c.count)
  useEffect(() => { setLiveCount(c.count) }, [c.count])

  return (
    <div>
      <Section title="Current State" subtitle="수량 버튼을 직접 클릭해볼 수 있습니다">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
          {/* z-index 25 places this above the inspector overlay (z-index 20) so clicks reach the buttons */}
          <div style={{ position: 'relative', zIndex: 25 }}>
          <Stepper
            count={liveCount}
            min={c.min}
            max={c.max}
            onChange={setLiveCount}
          />
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-icon-assistive)' }}>
            현재 수량: <strong style={{ color: 'var(--text-icon-normal)' }}>{liveCount}</strong>
            &ensp;/&ensp;min: {c.min}&ensp;max: {c.max}
          </div>
        </div>
      </Section>
      <Section title="States" subtitle="min(비활성 −) / 중간 / max(비활성 +)">
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>min (count=1)</div>
            <Stepper count={1} min={1} max={10} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>default (count=5)</div>
            <Stepper count={5} min={1} max={10} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>max (count=10)</div>
            <Stepper count={10} min={1} max={10} />
          </div>
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// OPTION LIST PREVIEW
// ═══════════════════════════════════════════════════════════
function OptionListPreview({ c }) {
  const [liveSelected, setLiveSelected] = useState(c.selected)
  const [liveCount, setLiveCount]       = useState(c.count)
  useEffect(() => { setLiveSelected(c.selected) }, [c.selected])
  useEffect(() => { setLiveCount(c.count) },       [c.count])

  return (
    <div>
      <Section title="Current State" subtitle="행을 클릭해 선택/해제, 스태퍼 버튼으로 수량 조절">
        {/* z-index 25: overlay(z-index 20) 위에 배치해 버튼 클릭 통과 */}
        <div style={{ position: 'relative', zIndex: 25 }}>
          <OptionList
            optionName={c.optionName}
            price={c.price}
            hasPrice={c.hasPrice}
            hasStepper={c.hasStepper}
            selected={liveSelected}
            count={liveCount}
            onSelectedChange={setLiveSelected}
            onCountChange={setLiveCount}
          />
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-icon-assistive)' }}>
          selected: <strong style={{ color: 'var(--text-icon-normal)' }}>{String(liveSelected)}</strong>
          {c.hasStepper && <>&ensp;/&ensp;count: <strong style={{ color: 'var(--text-icon-normal)' }}>{liveCount}</strong></>}
        </div>
      </Section>

      <Section title="All Variants" subtitle="selection × hasStepper 조합">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* selected=true */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>selected (체크박스 표시)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <OptionList optionName={c.optionName} price={c.price} hasPrice={c.hasPrice} hasStepper={false} selected={true} />
              <OptionList optionName={c.optionName} price={c.price} hasPrice={c.hasPrice} hasStepper={true}  selected={true} count={1} />
            </div>
          </div>
          {/* selected=false */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>not selected (체크박스 없음)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <OptionList optionName={c.optionName} price={c.price} hasPrice={c.hasPrice} hasStepper={false} selected={false} />
              <OptionList optionName={c.optionName} price={c.price} hasPrice={c.hasPrice} hasStepper={true}  selected={false} count={1} />
            </div>
          </div>
          {/* hasPrice=false */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>hasPrice=false</div>
            <OptionList optionName={c.optionName} price={c.price} hasPrice={false} hasStepper={false} selected={true} />
          </div>
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ORDER STATE DISPLAY PREVIEW
// ═══════════════════════════════════════════════════════════
function OrderStateDisplayPreview({ c }) {
  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 상태를 변경하세요">
        <OrderStateDisplay type={c.type} />
      </Section>
      <Section title="All Variants" subtitle="접수대기 · 픽업완료 · 주문취소">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {OrderStateDisplay.types.map(t => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <OrderStateDisplay type={t} />
              <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)' }}>{t}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ORDER HISTORY LIST PREVIEW
// ═══════════════════════════════════════════════════════════
function OrderHistoryListPreview({ c }) {
  const SAMPLE_PRODUCTS = [
    { imageSrc: 'bigpose-americano-decaf-yabangcha.png', productName: '아메리카노',  price: '13,500원' },
    { imageSrc: 'dalgona-latte.png',                     productName: '달고나 라떼', price: '3,200원'  },
    { imageSrc: 'blueberry-smoothie.png',                productName: '블루베리 스무디', price: '4,500원' },
  ]
  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 속성을 변경하세요">
        <OrderHistoryList
          imageSrc={c.imageSrc}
          productName={c.productName}
          orderState={c.orderState}
          storeName={c.storeName}
          price={c.price}
          date={c.date}
        />
      </Section>

      <Section title="All States" subtitle="접수대기 · 픽업완료 · 주문취소">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {OrderStateDisplay.types.map((state, i) => (
            <div key={state}>
              <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>{state}</div>
              <OrderHistoryList
                imageSrc={SAMPLE_PRODUCTS[i].imageSrc}
                productName={SAMPLE_PRODUCTS[i].productName}
                orderState={state}
                storeName={c.storeName}
                price={SAMPLE_PRODUCTS[i].price}
                date={c.date}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// CARD LIST PREVIEW
// ═══════════════════════════════════════════════════════════
function CardListPreview({ c }) {
  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 속성을 변경하세요">
        <CardList
          display={c.display}
          bankName={c.bankName}
          bankSummary={c.bankSummary}
          cardLogoSrc={c.cardLogoSrc}
          firstFour={c.firstFour}
          lastFour={c.lastFour}
          representative={c.representative}
          selected={c.selected}
        />
      </Section>

      <Section title="All Display Types" subtitle="ManageDefault · ManageSelected · Payment · PaymentSelected">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {CardList.displayTypes.map(dt => (
            <div key={dt}>
              <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>{dt}</div>
              <CardList
                display={dt}
                bankName={c.bankName}
                bankSummary={c.bankSummary}
                cardLogoSrc={c.cardLogoSrc}
                firstFour={c.firstFour}
                lastFour={c.lastFour}
                representative={c.representative}
                selected={dt === 'Payment'}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// COUPON LIST PREVIEW
// ═══════════════════════════════════════════════════════════
function CouponListPreview({ c }) {
  const [liveChecked, setLiveChecked] = useState(c.checked)
  useEffect(() => { setLiveChecked(c.checked) }, [c.checked])

  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 속성을 변경하세요">
        <div style={{ position: 'relative', zIndex: 25 }}>
          <CouponList
            displayType={c.displayType}
            value={c.value}
            couponName={c.couponName}
            date={c.date}
            checked={liveChecked}
            onCheckedChange={setLiveChecked}
          />
        </div>
      </Section>

      <Section title="All Display Types" subtitle="ListAvailable · ListUnavailable · PurchaseUnselected · PurchaseSelected">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {CouponList.displayTypes.map(dt => (
            <div key={dt}>
              <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>{dt}</div>
              <CouponList
                displayType={dt}
                value={c.value}
                couponName={c.couponName}
                date={c.date}
                checked={dt === 'PurchaseSelected'}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// MY PAGE BUTTON PREVIEW
// ═══════════════════════════════════════════════════════════
function MyPageButtonPreview({ c }) {
  const DEMO_BUTTONS = [
    { iconName: 'ProfileSetting', buttonName: '계정 설정' },
    { iconName: 'List1',         buttonName: '주문 내역' },
    { iconName: 'Coupon',        buttonName: '쿠폰함' },
    { iconName: 'Card',          buttonName: '결제 수단' },
  ]

  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 속성을 변경하세요">
        <MyPageButton
          display={c.display}
          buttonName={c.buttonName}
          iconName={c.iconName}
        />
      </Section>

      <Section title="Horizontal" subtitle="h:48px · 아이콘 좌, 텍스트 우">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {DEMO_BUTTONS.map(btn => (
            <MyPageButton key={btn.iconName} display="Horizontal" buttonName={btn.buttonName} iconName={btn.iconName} />
          ))}
        </div>
      </Section>

      <Section title="Vertical" subtitle="h:62px · 아이콘 상, 텍스트 하">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {DEMO_BUTTONS.map(btn => (
            <MyPageButton key={btn.iconName} display="Vertical" buttonName={btn.buttonName} iconName={btn.iconName} />
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// GIFT COUPON PREVIEW
// ═══════════════════════════════════════════════════════════
function GiftCouponPreview({ c }) {
  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 속성을 변경하세요">
        <GiftCoupon
          display={c.display}
          couponName={c.couponName}
          date={c.date}
          senderName={c.senderName}
          description={c.description}
          descriptionText={c.descriptionText}
          dImmed={c.dImmed}
          giftCardSrc={c.giftCardSrc}
        />
      </Section>

      <Section title="All Display Types" subtitle="ListAvailable · ListUnavailable · PurchaseDefault · PurchaseDisabled">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {GiftCoupon.displayTypes.map(dt => (
            <div key={dt}>
              <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>{dt}</div>
              <GiftCoupon
                display={dt}
                couponName={c.couponName}
                date={c.date}
                senderName={c.senderName}
                description={c.description}
                descriptionText={c.descriptionText}
                dImmed={c.dImmed}
                giftCardSrc={c.giftCardSrc}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// TEMPERATURE DISPLAY PREVIEW
// ═══════════════════════════════════════════════════════════
function TemperatureDisplayPreview({ c }) {
  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 온도 타입을 변경하세요">
        <TemperatureDisplay type={c.type} />
      </Section>
      <Section title="All Variants" subtitle="ICED · ICED ONLY · HOT · HOT ONLY">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {TemperatureDisplay.types.map(t => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <TemperatureDisplay type={t} />
              <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)' }}>{t}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// CART ITEM PREVIEW
// ═══════════════════════════════════════════════════════════
function CartItemPreview({ c }) {
  const [liveChecked, setLiveChecked] = useState(c.checked)
  const [liveCount,   setLiveCount]   = useState(c.count)

  // 우측 패널 변경 시 동기화
  useEffect(() => { setLiveChecked(c.checked) }, [c.checked])
  useEffect(() => { setLiveCount(c.count) },     [c.count])

  return (
    <div>
      <Section title="Current State" subtitle="체크박스·스태퍼 직접 조작 가능">
        {/* z-index 25: InspectorLayer(z:20) 위에 배치해 체크박스·스태퍼 클릭 통과 */}
        <div style={{ position: 'relative', zIndex: 25 }}>
          <CartItem
            checked={liveChecked}
            onCheckedChange={setLiveChecked}
            imageSrc={c.imageSrc}
            productName={c.productName}
            state={c.state}
            temperature={c.temperature}
            basePrice={c.basePrice}
            hasOption1={c.hasOption1}
            option1Name={c.option1Name}
            option1Price={c.option1Price}
            hasOption2={c.hasOption2}
            option2Name={c.option2Name}
            option2Price={c.option2Price}
            hasOption3={c.hasOption3}
            option3Name={c.option3Name}
            option3Price={c.option3Price}
            count={liveCount}
            onCountChange={setLiveCount}
            totalPrice={c.totalPrice}
          />
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-icon-assistive)' }}>
          checked: <strong style={{ color: 'var(--text-icon-normal)' }}>{String(liveChecked)}</strong>
          &ensp;/&ensp;count: <strong style={{ color: 'var(--text-icon-normal)' }}>{liveCount}</strong>
        </div>
      </Section>

      <Section title="All States" subtitle="Default · SoldOut(주문불가) · Unavailable(품절)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {['Default', 'SoldOut', 'Unavailable'].map(st => (
            <div key={st}>
              <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
                {st}{st === 'SoldOut' ? ' — 주문불가' : st === 'Unavailable' ? ' — 품절' : ''}
              </div>
              <CartItem
                checked={true}
                imageSrc={c.imageSrc}
                productName={c.productName}
                state={st}
                temperature={c.temperature}
                basePrice={c.basePrice}
                hasOption1={c.hasOption1}
                option1Name={c.option1Name}
                option1Price={c.option1Price}
                hasOption2={c.hasOption2}
                option2Name={c.option2Name}
                option2Price={c.option2Price}
                hasOption3={c.hasOption3}
                option3Name={c.option3Name}
                option3Price={c.option3Price}
                count={1}
                totalPrice={c.totalPrice}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// REORDER CARD PREVIEW
// ═══════════════════════════════════════════════════════════
function ReorderCardPreview({ c }) {
  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 상태와 속성을 변경하세요">
        <ReorderCard
          status={c.status}
          productName={c.productName}
          storeName={c.storeName}
          imageSrc={c.imageSrc}
        />
      </Section>

      <Section title="All Variants" subtitle="Default · Empty">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>Default — 최근 주문 있음</div>
            <ReorderCard
              status="Default"
              productName={c.productName}
              storeName={c.storeName}
              imageSrc={c.imageSrc}
            />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', marginBottom: '8px' }}>Empty — 최근 주문 없음</div>
            <ReorderCard status="Empty" />
          </div>
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// PRODUCT LIST PREVIEW
// ═══════════════════════════════════════════════════════════
function ProductListPreview({ c }) {
  const variantProducts = [
    { imageSrc: 'bigpose-americano-decaf-yabangcha.png', productName: '아메리카노',       price: '1,800원', hashtags: ['#저당', '#저칼로리'] },
    { imageSrc: 'dalgona-latte.png',                     productName: '달고나 라떼',      price: '3,200원', hashtags: ['#달달', '#인기'] },
    { imageSrc: 'blueberry-smoothie.png',                productName: '블루베리 스무디',  price: '4,500원', hashtags: ['#과일', '#비건'] },
  ]

  return (
    <div>
      <Section title="Current State" subtitle="우측 패널에서 상태와 속성을 변경하세요">
        <ProductList
          display={c.display}
          productName={c.productName}
          price={c.price}
          state={c.state}
          hasNewBadge={c.hasNewBadge}
          hasBestBadge={c.hasBestBadge}
          hasHashTag={c.hasHashTag}
          hashtags={c.hashtags}
          imageSrc={c.imageSrc}
        />
      </Section>

      <Section title="Horizontal — Default / Disabled" subtitle="이미지 좌측, 텍스트 우측">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {variantProducts.map((p, i) => (
            <ProductList key={i} {...p} display="Horizontal" state="Default" hasNewBadge={i === 0} hasBestBadge={i === 1} hasHashTag={true} />
          ))}
          {variantProducts.map((p, i) => (
            <ProductList key={'d' + i} {...p} display="Horizontal" state="Disabled" hasNewBadge={false} hasBestBadge={false} hasHashTag={true} />
          ))}
        </div>
      </Section>

      <Section title="Vertical — Default / Disabled" subtitle="이미지 전체 폭, 텍스트 중앙 정렬">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {variantProducts.map((p, i) => (
            <ProductList key={i} {...p} display="Vertical" state="Default" hasNewBadge={i === 0} hasBestBadge={i === 1} hasHashTag={true} />
          ))}
          {variantProducts.map((p, i) => (
            <ProductList key={'d' + i} {...p} display="Vertical" state="Disabled" hasNewBadge={false} hasBestBadge={false} hasHashTag={true} />
          ))}
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// MICRO BADGE PREVIEW
// ═══════════════════════════════════════════════════════════
function MicroBadgePreview({ c }) {
  const styles = MicroBadge.styles
  const sizes  = MicroBadge.sizes

  return (
    <ComponentCanvas
      subtitle="MicroBadge — current controls applied"
      hero={<MicroBadge style={c.style} size={c.size} label={c.label} />}
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {sizes.map(size => (
            <div key={size}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '12px' }}>
                {size}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                {styles.map(style => (
                  <div key={style} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <MicroBadge style={style} size={size} label={c.label} />
                    <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', fontWeight: 500 }}>{style}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// TITLE PREVIEW
// ═══════════════════════════════════════════════════════════
function TitlePreview({ c }) {
  const hierarchies = ['Primary', 'Secondary']
  const combos = [
    { hasRequired: false, hasButton: false, label: 'Text only' },
    { hasRequired: true,  hasButton: false, label: 'Required' },
    { hasRequired: false, hasButton: true,  label: 'Button' },
    { hasRequired: true,  hasButton: true,  label: 'Required + Button' },
  ]

  return (
    <ComponentCanvas
      subtitle="Title — current controls applied"
      hero={
        <div style={{ width: '100%', maxWidth: '375px', padding: '0 24px', boxSizing: 'border-box' }}>
          <Title
            hierarchy={c.hierarchy}
            text={c.text}
            hasRequired={c.hasRequired}
            hasButton={c.hasButton}
            buttonLabel={c.buttonLabel}
          />
        </div>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {hierarchies.map(h => (
            <div key={h}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase', marginBottom: '16px' }}>
                {h}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '375px' }}>
                {combos.map(({ hasRequired, hasButton, label }) => (
                  <div key={label}>
                    <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500, marginBottom: '8px' }}>{label}</div>
                    <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
                      <Title
                        hierarchy={h}
                        text={h === 'Primary' ? '화면 대표 제목입니다' : '섹션 서브 타이틀'}
                        hasRequired={hasRequired}
                        hasButton={hasButton}
                        buttonLabel="전체보기"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// HERO BANNER PREVIEW
// ═══════════════════════════════════════════════════════════
function HeroBannerPreview({ c }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section
        title="HeroBanner — Interactive"
        subtitle="3장 카드 스택 · 2° 간격 회전 · 클릭으로 전환 · 375×488px"
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0 8px' }}>
          <HeroBanner page={c.page} />
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', textAlign: 'center', marginTop: '12px' }}>
          배너를 클릭하면 다음 카드로 전환됩니다
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ORDER HISTORY CARD PREVIEW
// ═══════════════════════════════════════════════════════════
const OHC_IMAGES = {
  americano:   '/assets/orderHistory/americono.png',
  coldbrew:    '/assets/orderHistory/coldbrew.png',
  plainyogurt: '/assets/orderHistory/plainyogurt.png',
  strawberry:  '/assets/orderHistory/strawberry.png',
}

function OhcImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{ width: '87.5px', height: '140px', objectFit: 'cover', flexShrink: 0, pointerEvents: 'none', display: 'block' }}
    />
  )
}

function OrderHistoryCardPreview({ c }) {
  const imgSrc = OHC_IMAGES[c.image] ?? OHC_IMAGES.americano
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section
        title="OrderHistoryCard"
        subtitle="최근 주문 이력 카드 · 280×120px · image 140px 오버플로우"
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <OrderHistoryCard
            menuName={c.menuName}
            storeName={c.storeName}
            image={<OhcImage src={imgSrc} alt={c.menuName} />}
          />
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// GRAPHIC PREVIEW (Compose Asset)
// ═══════════════════════════════════════════════════════════
const BASE = import.meta.env.BASE_URL

const GRAPHIC_ASSETS = {
  // 3:2 — emptyState
  'emptyState/empty-state':        { src: '/assets/emptyState/empty-state.png',        label: 'emptyState/empty-state',        ratio: '3:2', size: '600×400' },
  'emptyState/empty-wallet':       { src: '/assets/emptyState/empty-wallet.png',       label: 'emptyState/empty-wallet',       ratio: '3:2', size: '600×400' },
  'emptyState/empty-notification': { src: '/assets/emptyState/empty-notification.png', label: 'emptyState/empty-notification', ratio: '3:2', size: '600×400' },
  // 1:1 — stampState
  'stampState/stamp-active': { src: '/assets/stampState/stamp-active.png', label: 'stampState/stamp-active', ratio: '1:1', size: '100×100' },
  'stampState/stamp-1':      { src: '/assets/stampState/stamp-1.png',      label: 'stampState/stamp-1',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-2':      { src: '/assets/stampState/stamp-2.png',      label: 'stampState/stamp-2',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-3':      { src: '/assets/stampState/stamp-3.png',      label: 'stampState/stamp-3',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-4':      { src: '/assets/stampState/stamp-4.png',      label: 'stampState/stamp-4',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-5':      { src: '/assets/stampState/stamp-5.png',      label: 'stampState/stamp-5',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-6':      { src: '/assets/stampState/stamp-6.png',      label: 'stampState/stamp-6',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-7':      { src: '/assets/stampState/stamp-7.png',      label: 'stampState/stamp-7',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-8':      { src: '/assets/stampState/stamp-8.png',      label: 'stampState/stamp-8',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-9':      { src: '/assets/stampState/stamp-9.png',      label: 'stampState/stamp-9',      ratio: '1:1', size: '100×100' },
  'stampState/stamp-10':     { src: '/assets/stampState/stamp-10.png',     label: 'stampState/stamp-10',     ratio: '1:1', size: '100×100' },
  // 1:1 — rankBadge
  'rankBadge/bronze-tier':  { src: '/assets/rankBadge/bronze-tier.png',  label: 'rankBadge/bronze-tier',  ratio: '1:1', size: '28×28' },
  'rankBadge/silver-tier':  { src: '/assets/rankBadge/silver-tier.png',  label: 'rankBadge/silver-tier',  ratio: '1:1', size: '28×28' },
  'rankBadge/gold-tier':    { src: '/assets/rankBadge/gold-tier.png',    label: 'rankBadge/gold-tier',    ratio: '1:1', size: '28×28' },
  'rankBadge/diamond-tier': { src: '/assets/rankBadge/diamond-tier.png', label: 'rankBadge/diamond-tier', ratio: '1:1', size: '28×28' },
  // 1:1 — cardLogo
  'cardLogo/fallback-card': { src: '/assets/cardLogo/fallback-card.png', label: 'cardLogo/fallback-card', ratio: '1:1', size: '200×200' },
  'cardLogo/hana':          { src: '/assets/cardLogo/hana.png',          label: 'cardLogo/hana',          ratio: '1:1', size: '200×200' },
  'cardLogo/hyudai':        { src: '/assets/cardLogo/hyudai.png',        label: 'cardLogo/hyudai',        ratio: '1:1', size: '200×200' },
  'cardLogo/samsung':       { src: '/assets/cardLogo/samsung.png',       label: 'cardLogo/samsung',       ratio: '1:1', size: '200×200' },
  'cardLogo/shinhan':       { src: '/assets/cardLogo/shinhan.png',       label: 'cardLogo/shinhan',       ratio: '1:1', size: '200×200' },
  'cardLogo/kb':            { src: '/assets/cardLogo/kb.png',            label: 'cardLogo/kb',            ratio: '1:1', size: '200×200' },
  'cardLogo/bc':            { src: '/assets/cardLogo/bc.png',            label: 'cardLogo/bc',            ratio: '1:1', size: '200×200' },
  'cardLogo/wori':          { src: '/assets/cardLogo/wori.png',          label: 'cardLogo/wori',          ratio: '1:1', size: '200×200' },
  'cardLogo/nonghyup':      { src: '/assets/cardLogo/nonghyup.png',      label: 'cardLogo/nonghyup',      ratio: '1:1', size: '200×200' },
  'cardLogo/lotte':         { src: '/assets/cardLogo/lotte.png',         label: 'cardLogo/lotte',         ratio: '1:1', size: '200×200' },
  // 2.5:4 — orderHistory
  americono:   { src: '/assets/orderHistory/americono.png',   label: 'orderHistory/americono',   ratio: '2.5:4', size: '175×280' },
  coldbrew:    { src: '/assets/orderHistory/coldbrew.png',    label: 'orderHistory/coldbrew',    ratio: '2.5:4', size: '175×280' },
  plainyogurt: { src: '/assets/orderHistory/plainyogurt.png', label: 'orderHistory/plainyogurt', ratio: '2.5:4', size: '175×280' },
  strawberry:  { src: '/assets/orderHistory/strawberry.png',  label: 'orderHistory/strawberry',  ratio: '2.5:4', size: '175×280' },
  // 1:1 — recommended
  'v-set':                 { src: '/assets/recommended/v-set.png',     label: 'recommended/v-set',           ratio: '1:1', size: '320×320' },
  'bear-a-set':            { src: '/assets/recommended/bear-a-set.png', label: 'recommended/bear-a-set',     ratio: '1:1', size: '320×320' },
  'bear-b-set':            { src: '/assets/recommended/bear-b-set.png', label: 'recommended/bear-b-set',     ratio: '1:1', size: '320×320' },
  'storeProfile/fallback': { src: '/assets/storeProfile/fallback.png',  label: 'storeProfile/fallback',      ratio: '1:1', size: '160×160' },
  'storeProfile/store-1':  { src: '/assets/storeProfile/store-1.png',   label: 'storeProfile/store-1',       ratio: '1:1', size: '160×160' },
  // Product (1:1)
  'product/iced-honey-americano':                   { src: '/assets/product/iced-honey-americano.png',                   label: 'product/iced-honey-americano',                   ratio: '1:1', size: '1:1' },
  'product/iced-dolce-latte-decaf':                 { src: '/assets/product/iced-dolce-latte-decaf.png',                 label: 'product/iced-dolce-latte-decaf',                 ratio: '1:1', size: '1:1' },
  'product/dalgona-latte':                          { src: '/assets/product/dalgona-latte.png',                          label: 'product/dalgona-latte',                          ratio: '1:1', size: '1:1' },
  'product/green-tea-frappe':                       { src: '/assets/product/green-tea-frappe.png',                       label: 'product/green-tea-frappe',                       ratio: '1:1', size: '1:1' },
  'product/real-choco-javachip-frappe':             { src: '/assets/product/real-choco-javachip-frappe.png',             label: 'product/real-choco-javachip-frappe',             ratio: '1:1', size: '1:1' },
  'product/mocha-javachip-frappe':                  { src: '/assets/product/mocha-javachip-frappe.png',                  label: 'product/mocha-javachip-frappe',                  ratio: '1:1', size: '1:1' },
  'product/strawberry-salty-caramel-frappe':        { src: '/assets/product/strawberry-salty-caramel-frappe.png',        label: 'product/strawberry-salty-caramel-frappe',        ratio: '1:1', size: '1:1' },
  'product/strawberry-cheesecake-smoothie':         { src: '/assets/product/strawberry-cheesecake-smoothie.png',         label: 'product/strawberry-cheesecake-smoothie',         ratio: '1:1', size: '1:1' },
  'product/strawberry-chocolate-latte':             { src: '/assets/product/strawberry-chocolate-latte.png',             label: 'product/strawberry-chocolate-latte',             ratio: '1:1', size: '1:1' },
  'product/strawberry-smoothie':                    { src: '/assets/product/strawberry-smoothie.png',                    label: 'product/strawberry-smoothie',                    ratio: '1:1', size: '1:1' },
  'product/strawberry-yogurt-smoothie':             { src: '/assets/product/strawberry-yogurt-smoothie.png',             label: 'product/strawberry-yogurt-smoothie',             ratio: '1:1', size: '1:1' },
  'product/strawberry-juice':                       { src: '/assets/product/strawberry-juice.png',                       label: 'product/strawberry-juice',                       ratio: '1:1', size: '1:1' },
  'product/lemonade':                               { src: '/assets/product/lemonade.png',                               label: 'product/lemonade',                               ratio: '1:1', size: '1:1' },
  'product/blue-lemonade':                          { src: '/assets/product/blue-lemonade.png',                          label: 'product/blue-lemonade',                          ratio: '1:1', size: '1:1' },
  'product/mango-smoothie':                         { src: '/assets/product/mango-smoothie.png',                         label: 'product/mango-smoothie',                         ratio: '1:1', size: '1:1' },
  'product/mango-ade':                              { src: '/assets/product/mango-ade.png',                              label: 'product/mango-ade',                              ratio: '1:1', size: '1:1' },
  'product/mango-yogurt-smoothie':                  { src: '/assets/product/mango-yogurt-smoothie.png',                  label: 'product/mango-yogurt-smoothie',                  ratio: '1:1', size: '1:1' },
  'product/peach-juice':                            { src: '/assets/product/peach-juice.png',                            label: 'product/peach-juice',                            ratio: '1:1', size: '1:1' },
  'product/blueberry-smoothie':                     { src: '/assets/product/blueberry-smoothie.png',                     label: 'product/blueberry-smoothie',                     ratio: '1:1', size: '1:1' },
  'product/blueberry-yogurt-smoothie':              { src: '/assets/product/blueberry-yogurt-smoothie.png',              label: 'product/blueberry-yogurt-smoothie',              ratio: '1:1', size: '1:1' },
  'product/berry-full-strawberry-latte':            { src: '/assets/product/berry-full-strawberry-latte.png',            label: 'product/berry-full-strawberry-latte',            ratio: '1:1', size: '1:1' },
  'product/berry-full-strawberry-juice':            { src: '/assets/product/berry-full-strawberry-juice.png',            label: 'product/berry-full-strawberry-juice',            ratio: '1:1', size: '1:1' },
  'product/honey-tomato-juice':                     { src: '/assets/product/honey-tomato-juice.png',                     label: 'product/honey-tomato-juice',                     ratio: '1:1', size: '1:1' },
  'product/shine-muscat-kale-juice':                { src: '/assets/product/shine-muscat-kale-juice.png',                label: 'product/shine-muscat-kale-juice',                ratio: '1:1', size: '1:1' },
  'product/yabangcha':                              { src: '/assets/product/yabangcha.png',                              label: 'product/yabangcha',                              ratio: '1:1', size: '1:1' },
  'product/raw-chocolate-latte':                    { src: '/assets/product/raw-chocolate-latte.png',                    label: 'product/raw-chocolate-latte',                    ratio: '1:1', size: '1:1' },
  'product/bigpose-dolce-latte':                    { src: '/assets/product/bigpose-dolce-latte.png',                    label: 'product/bigpose-dolce-latte',                    ratio: '1:1', size: '1:1' },
  'product/bigpose-yabangcha':                      { src: '/assets/product/bigpose-yabangcha.png',                      label: 'product/bigpose-yabangcha',                      ratio: '1:1', size: '1:1' },
  'product/bigpose-americano-decaf-yabangcha':      { src: '/assets/product/bigpose-americano-decaf-yabangcha.png',      label: 'product/bigpose-americano-decaf-yabangcha',      ratio: '1:1', size: '1:1' },
  'product/bigpose-iced-tea-decaf-zero-sugar':      { src: '/assets/product/bigpose-iced-tea-decaf-zero-sugar.png',      label: 'product/bigpose-iced-tea-decaf-zero-sugar',      ratio: '1:1', size: '1:1' },
  'product/bigpose-iced-tea':                       { src: '/assets/product/bigpose-iced-tea.png',                       label: 'product/bigpose-iced-tea',                       ratio: '1:1', size: '1:1' },
  'product/bigpose-cafe-latte-vanilla-hazelnut-decaf': { src: '/assets/product/bigpose-cafe-latte-vanilla-hazelnut-decaf.png', label: 'product/bigpose-cafe-latte-vanilla-hazelnut-decaf', ratio: '1:1', size: '1:1' },
  'product/bigpose-soltied-cool-lychee':            { src: '/assets/product/bigpose-soltied-cool-lychee.png',            label: 'product/bigpose-soltied-cool-lychee',            ratio: '1:1', size: '1:1' },
  'product/bigpose-soltied-cool-lychee-disposable': { src: '/assets/product/bigpose-soltied-cool-lychee-disposable.png', label: 'product/bigpose-soltied-cool-lychee-disposable', ratio: '1:1', size: '1:1' },
  'product/hot-honey-americano':                    { src: '/assets/product/hot-honey-americano.png',                    label: 'product/hot-honey-americano',                    ratio: '1:1', size: '1:1' },
  'product/hot-grain-latte':                        { src: '/assets/product/hot-grain-latte.png',                        label: 'product/hot-grain-latte',                        ratio: '1:1', size: '1:1' },
  'product/hot-sweet-potato-latte':                 { src: '/assets/product/hot-sweet-potato-latte.png',                 label: 'product/hot-sweet-potato-latte',                 ratio: '1:1', size: '1:1' },
  'product/hot-green-tea-latte':                    { src: '/assets/product/hot-green-tea-latte.png',                    label: 'product/hot-green-tea-latte',                    ratio: '1:1', size: '1:1' },
  'product/hot-all-day-oat':                        { src: '/assets/product/hot-all-day-oat.png',                        label: 'product/hot-all-day-oat',                        ratio: '1:1', size: '1:1' },
  'product/hot-all-day-oat-disposable':             { src: '/assets/product/hot-all-day-oat-disposable.png',             label: 'product/hot-all-day-oat-disposable',             ratio: '1:1', size: '1:1' },
  'product/icecream-latte':                         { src: '/assets/product/icecream-latte.png',                         label: 'product/icecream-latte',                         ratio: '1:1', size: '1:1' },
  'product/icecream-mocha':                         { src: '/assets/product/icecream-mocha.png',                         label: 'product/icecream-mocha',                         ratio: '1:1', size: '1:1' },
  'product/icecream-javachip':                      { src: '/assets/product/icecream-javachip.png',                      label: 'product/icecream-javachip',                      ratio: '1:1', size: '1:1' },
  'product/icecream-choco-strawberry':              { src: '/assets/product/icecream-choco-strawberry.png',              label: 'product/icecream-choco-strawberry',              ratio: '1:1', size: '1:1' },
  'product/condensed-milk-shaved-ice':              { src: '/assets/product/condensed-milk-shaved-ice.png',              label: 'product/condensed-milk-shaved-ice',              ratio: '1:1', size: '1:1' },
  'product/condensed-milk-shaved-ice-disposable':   { src: '/assets/product/condensed-milk-shaved-ice-disposable.png',   label: 'product/condensed-milk-shaved-ice-disposable',   ratio: '1:1', size: '1:1' },
  'product/injeolmi-cup-bing':                      { src: '/assets/product/injeolmi-cup-bing.png',                      label: 'product/injeolmi-cup-bing',                      ratio: '1:1', size: '1:1' },
  'product/dessert-potato-bread':                   { src: '/assets/product/dessert-potato-bread.png',                   label: 'product/dessert-potato-bread',                   ratio: '1:1', size: '1:1' },
  'product/dessert-redvelvet-cake':                 { src: '/assets/product/dessert-redvelvet-cake.png',                 label: 'product/dessert-redvelvet-cake',                 ratio: '1:1', size: '1:1' },
  'product/dessert-blackvelvet-cake':               { src: '/assets/product/dessert-blackvelvet-cake.png',               label: 'product/dessert-blackvelvet-cake',               ratio: '1:1', size: '1:1' },
  'product/dessert-salt-bread':                     { src: '/assets/product/dessert-salt-bread.png',                     label: 'product/dessert-salt-bread',                     ratio: '1:1', size: '1:1' },
  'product/dessert-cream-mini-fishbread':           { src: '/assets/product/dessert-cream-mini-fishbread.png',           label: 'product/dessert-cream-mini-fishbread',           ratio: '1:1', size: '1:1' },
  'product/dessert-cinnamon-cronut':                { src: '/assets/product/dessert-cinnamon-cronut.png',                label: 'product/dessert-cinnamon-cronut',                ratio: '1:1', size: '1:1' },
  'product/gift-card-5000':                         { src: '/assets/product/gift-card-5000.png',                         label: 'product/gift-card-5000',                         ratio: '1:1', size: '1:1' },
  'product/gift-card-10000':                        { src: '/assets/product/gift-card-10000.png',                        label: 'product/gift-card-10000',                        ratio: '1:1', size: '1:1' },
  'product/gift-card-20000':                        { src: '/assets/product/gift-card-20000.png',                        label: 'product/gift-card-20000',                        ratio: '1:1', size: '1:1' },
  'product/gift-card-30000':                        { src: '/assets/product/gift-card-30000.png',                        label: 'product/gift-card-30000',                        ratio: '1:1', size: '1:1' },
  'product/gift-card-50000':                        { src: '/assets/product/gift-card-50000.png',                        label: 'product/gift-card-50000',                        ratio: '1:1', size: '1:1' },
  'product/fallback-product':                       { src: '/assets/product/fallback-product.png',                       label: 'product/fallback-product',                       ratio: '1:1', size: '1:1' },
}

function GraphicPreview({ name }) {
  const asset = GRAPHIC_ASSETS[name]
  if (!asset) return null
  const [rw, rh] = asset.ratio.split(':').map(Number)
  const maxDim = 200
  const previewW = rw >= rh ? maxDim : Math.round(maxDim * rw / rh)
  const previewH = rh >= rw ? maxDim : Math.round(maxDim * rh / rw)
  const src = BASE + asset.src.replace(/^\//, '')
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section title={asset.label} subtitle={`PNG · ${asset.size} · 비율 ${asset.ratio}`}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', padding: '16px 0', flexWrap: 'wrap' }}>
          {/* 원본 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img
              src={src}
              alt={name}
              draggable={false}
              style={{ width: `${previewW}px`, height: `${previewH}px`, objectFit: 'contain' }}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>원본 ({asset.size})</span>
          </div>
          {/* 썸네일 예시 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '88px', height: '88px',
              borderRadius: '12px',
              backgroundColor: 'var(--surface-base)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '8px', boxSizing: 'border-box',
            }}>
              <img src={src} alt={name} draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)' }}>썸네일 (88×88)</span>
          </div>
        </div>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ICONS PREVIEW
// ═══════════════════════════════════════════════════════════

const ICON_GROUPS = [
  { label: 'Direction',       icons: ['IconChevronUp','IconChevronDown','IconChevronLeft','IconChevronRight','IconArrowUp','IconArrowDown','IconArrowLeft','IconArrowRight','IconArrowLeftThin','IconArrowRightThin'] },
  { label: 'Actions',         icons: ['IconClose','IconCheck','IconPlus','IconMinus','IconSearch','IconDownload','IconRefresh','IconReplace','IconEyeOpen','IconEyeClose'] },
  { label: 'Status',          icons: ['IconCheckCircle','IconPlusCircle','IconMinusCircle','IconAlertCircle','IconAlertCircleFill','IconErrorCircle','IconInfo','IconInfoFill','IconHelp','IconHelpFill'] },
  { label: 'Commerce',        icons: ['IconBag','IconBagFill','IconCart','IconCartFill','IconGift','IconGiftFill','IconCoupon','IconCouponFill','IconCard','IconCardFill','IconHandBag','IconBarcode','IconPaperCup','IconCup'] },
  { label: 'Trash',           icons: ['IconTrash','IconTrashFill'] },
  { label: 'User / Social',   icons: ['IconPerson','IconPersonFill','IconStar','IconStarOutline','IconStarFill','IconStarRing'] },
  { label: 'System / UI',     icons: ['IconMenu','IconBell','IconBellFill','IconStamp','IconStampFill','IconFlash','IconFlashFill','IconTime','IconTimeFill'] },
  { label: 'Location / Home', icons: ['IconHome','IconHomeFill','IconLocation','IconLocationFill'] },
  { label: 'Document',        icons: ['IconNote','IconNoteFill','IconCopy','IconCopyFill','IconCalendar','IconReturn'] },
  { label: 'Food',            icons: ['IconCutlery'] },
]

function IconsPreview() {
  return (
    <div>
      {ICON_GROUPS.map(({ label, icons }) => (
        <Section key={label} title={label}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {icons.map(name => {
              const IconComponent = Icons[name]
              if (!IconComponent) return null
              return (
                <div
                  key={name}
                  title={name}
                  style={{
                    display:         'flex',
                    flexDirection:   'column',
                    alignItems:      'center',
                    gap:             '6px',
                    padding:         '12px 8px',
                    borderRadius:    '8px',
                    border:          '1px solid var(--border-light)',
                    backgroundColor: 'var(--surface-base)',
                    width:           '80px',
                  }}
                >
                  <IconComponent size={24} color="var(--text-icon-normal)" />
                  <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all' }}>
                    {name.replace('Icon', '')}
                  </span>
                </div>
              )
            })}
          </div>
        </Section>
      ))}
    </div>
  )
}

const GRAPHIC_ICON_GROUPS = [
  {
    label: 'App / Platform',
    icons: ['GraphicIconApple', 'GraphicIconKakao', 'GraphicIconFacebook', 'GraphicIconInstagram', 'GraphicIconYoutube', 'GraphicIconCompose'],
  },
  {
    label: 'User / Account',
    icons: ['GraphicIconProfileSetting', 'GraphicIconFavorites', 'GraphicIconHand'],
  },
  {
    label: 'Commerce',
    icons: ['GraphicIconGiftCard', 'GraphicIconCoupon', 'GraphicIconCard', 'GraphicIconMembership', 'GraphicIconGift', 'GraphicIconOkCashback', 'GraphicIconLPoint', 'GraphicIconOrder'],
  },
  {
    label: 'Content / UI',
    icons: ['GraphicIconList1', 'GraphicIconList2', 'GraphicIconChart', 'GraphicIconNews', 'GraphicIconEvent', 'GraphicIconStamp', 'GraphicIconSpeaker', 'GraphicIconHeadPhone', 'GraphicIconTalk'],
  },
  {
    label: 'Media',
    icons: ['GraphicIconCamera', 'GraphicIconPicture', 'GraphicIconPhone'],
  },
]

function GraphicIconsPreview() {
  return (
    <div>
      {GRAPHIC_ICON_GROUPS.map(({ label, icons }) => (
        <Section key={label} title={label}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {icons.map(name => {
              const IconComponent = GraphicIcons[name]
              if (!IconComponent) return null
              return (
                <div
                  key={name}
                  title={name}
                  style={{
                    display:         'flex',
                    flexDirection:   'column',
                    alignItems:      'center',
                    gap:             '6px',
                    padding:         '12px 8px',
                    borderRadius:    '8px',
                    border:          '1px solid var(--border-light)',
                    backgroundColor: 'var(--surface-base)',
                    width:           '80px',
                  }}
                >
                  <IconComponent size={24} />
                  <span style={{ fontSize: '10px', color: 'var(--text-icon-assistive)', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all' }}>
                    {name.replace('GraphicIcon', '')}
                  </span>
                </div>
              )
            })}
          </div>
        </Section>
      ))}
    </div>
  )
}

function TextButtonPreview({ c }) {
  const IconComp = Icons[c.iconName ?? 'IconChevronRight']
  const needsIcon = c.hasLeadingIcon || c.hasTrailingIcon
  const iconNode = needsIcon && IconComp ? <IconComp size={c.size === 'md' ? 20 : 16} /> : undefined

  return (
    <ComponentCanvas
      subtitle="Text Button — current controls applied"
      hero={
        <TextButton
          size={c.size}
          color={c.color}
          hasLeadingIcon={c.hasLeadingIcon}
          hasTrailingIcon={c.hasTrailingIcon}
          state={c.state}
          label={c.label || '텍스트버튼'}
          icon={iconNode}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {['primary', 'assistive'].map(color => (
            <div key={color}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['sm', 'md'].map(size => (
                  <div key={size} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextButton size={size} color={color} state="default" label={`${size} default`} />
                    <TextButton size={size} color={color} state="pressed" label={`${size} pressed`} />
                    <TextButton size={size} color={color} state="disabled" label={`${size} disabled`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

function ActionsActionAreaPreview({ c }) {
  return (
    <ComponentCanvas
      subtitle="Actions Area — current controls applied"
      hero={
        <ActionsActionArea
          variant={c.variant}
          combination={c.combination}
          slot={c.slot}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {['Vertical', 'Horizontal'].map(variant => (
            <div key={variant}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
                {variant}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['MainOnly', 'WithAlternative', 'WithAssistive', 'Cancle'].map(combo => (
                  <div key={combo} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-icon-disabled)', marginBottom: '6px' }}>
                      {combo}
                    </div>
                    <ActionsActionArea
                      variant={variant}
                      combination={combo}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

function ChipPreview({ c }) {
  return (
    <ComponentCanvas
      subtitle="Chip — current controls applied"
      hero={
        <Chip
          variant={c.variant}
          size={c.size}
          state={c.state}
          hasLeadingIcon={c.hasLeadingIcon}
          hasTrailingIcon={c.hasTrailingIcon}
          label={c.label}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {['solid', 'outline'].map(variant => (
            <div key={variant}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['lg', 'md', 'sm'].map(size => (
                  <div key={size}>
                    <div style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-icon-disabled)', marginBottom: '8px' }}>
                      {size === 'lg' ? 'Large' : size === 'md' ? 'Medium' : 'Small'}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {['default', 'active', 'pressed', 'disabled'].map(state => (
                        <Chip
                          key={state}
                          variant={variant}
                          size={size}
                          state={state}
                          label={state}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

function TabPreview({ c }) {
  const displayTabs = c.tabs
    .filter(tab => tab.enabled)
    .map(tab => ({ id: tab.id, label: tab.label }))

  const activeTab = c.tabs.find(tab => tab.state === 'active')?.id || c.tabs[0]?.id

  return (
    <ComponentCanvas
      subtitle="Tab — current controls applied"
      hero={
        <Tab
          tabs={displayTabs}
          activeTab={activeTab}
          onTabChange={() => {}}
          disabledTabs={[]}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
              모든 탭 활성화
            </div>
            <Tab
              tabs={c.tabs.filter(t => t.enabled).map(t => ({ id: t.id, label: t.label }))}
              activeTab={c.tabs.find(t => t.state === 'active')?.id || 'tab-1'}
              onTabChange={() => {}}
              disabledTabs={[]}
            />
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
              일부 탭 비활성화
            </div>
            <Tab
              tabs={c.tabs.filter(t => t.enabled).map(t => ({ id: t.id, label: t.label }))}
              activeTab={c.tabs.find(t => t.enabled && t.state === 'active')?.id || displayTabs[0]?.id}
              onTabChange={() => {}}
              disabledTabs={c.tabs.filter(t => !t.enabled).map(t => t.id)}
            />
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '10px' }}>
              탭 상태별 표현
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['default', 'active', 'disabled'].map(state => (
                <div key={state}>
                  <div style={{ fontSize: '10px', color: 'var(--text-icon-disabled)', marginBottom: '6px' }}>
                    {state}
                  </div>
                  <Tab
                    tabs={[
                      { id: `ex-${state}`, label: '탭' },
                      { id: `ex-${state}-2`, label: '탭' },
                      { id: `ex-${state}-3`, label: '탭' },
                    ]}
                    activeTab={state === 'active' ? `ex-${state}` : undefined}
                    onTabChange={() => {}}
                    disabledTabs={state === 'disabled' ? [`ex-${state}`, `ex-${state}-2`] : []}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}

function SnackbarPreview({ c }) {
  // 반복 루프: 서서히 등장 → 5초 유지 → 서서히 사라짐 → 1초 대기 → 반복
  const [visible, setVisible] = useState(true)

  // Snackbar가 스스로 5초 후 slideOut → onClose 호출
  // onClose에서 1초 대기 후 다시 표시
  const handleClose = () => {
    setVisible(false)
    setTimeout(() => setVisible(true), 1000)
  }

  return (
    <ComponentCanvas
      subtitle="Snackbar — 등장 · 5초 유지 · 사라짐 · 1초 대기 반복"
      allVariants={
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-base)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
          <Snackbar
            message={c.message}
            visible={visible}
            onClose={handleClose}
            duration={5000}
          />
        </div>
      }
    />
  )
}

// ═══════════════════════════════════════════════════════════
// TOOLTIP PREVIEW
// ═══════════════════════════════════════════════════════════
function TooltipPreview({ c }) {
  const placements = ['top', 'bottom', 'left', 'right']
  const aligns = ['start', 'center', 'end']

  return (
    <ComponentCanvas
      subtitle="Tooltip — current controls applied"
      hero={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '160px',
          }}
        >
          {/* 앵커 래퍼 — 툴팁은 이 박스를 기준으로 배치된다 */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '80px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-light-subtle)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-icon-normal)' }}>
              Target
            </div>
            <Tooltip
              visible={c.visible}
              placement={c.placement}
              align={c.align}
              text={c.text}
            />
          </div>
        </div>
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', backgroundColor: 'var(--surface-base)', borderRadius: '8px' }}>
          {placements.map(placement => (
            <div key={placement} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-icon-normal)', textTransform: 'uppercase' }}>
                {placement}
              </div>
              <div style={{
                display: 'flex',
                flexDirection: placement === 'left' || placement === 'right' ? 'column' : 'row',
                gap: placement === 'left' || placement === 'right' ? '24px' : '64px',
                alignItems: placement === 'left' || placement === 'right' ? 'flex-start' : 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                padding: '56px 32px',
                backgroundColor: 'var(--surface-light-subtle)',
                borderRadius: '6px',
              }}>
                {aligns.map(align => (
                  <TooltipVariant
                    key={`${placement}-${align}`}
                    placement={placement}
                    align={align}
                    text="툴팁 텍스트"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

function TooltipVariant({ placement, align, text }) {
  const isHorizontal = placement === 'left' || placement === 'right'
  return (
    <div style={{
      position: 'relative',
      marginTop: isHorizontal ? '8px' : '0',
      marginBottom: isHorizontal ? '8px' : '0',
      marginLeft: placement === 'left' ? '100px' : '0',
      marginRight: placement === 'right' ? '100px' : '0',
    }}>
      <div style={{
        width: '56px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--surface-heavy-solid)',
        color: '#FFFFFF',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}>
        {align}
      </div>
      <Tooltip
        visible={true}
        placement={placement}
        align={align}
        text={text}
      />
    </div>
  )
}

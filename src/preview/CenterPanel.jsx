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
import { Checkbox } from '../components/Checkbox.jsx'
import { Radio }    from '../components/Radio.jsx'
import { HeroBanner }       from '../components/HeroBanner.jsx'
import { OrderHistoryCard } from '../components/OrderHistoryCard.jsx'
import * as Icons      from '../icons/icons.jsx'

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
  const styleAttr = el.getAttribute('style') || ''
  const cssVars = {}
  const varRe = /([\w-]+)\s*:\s*var\((--[\w-]+)\)/g
  let m
  while ((m = varRe.exec(styleAttr)) !== null) cssVars[m[1]] = m[2]

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
    // SVG internals → climb to SVG root
    const svgRoot = el.closest('svg')
    if (svgRoot && container.contains(svgRoot)) return svgRoot

    const SELECTABLE_TAGS = ['button', 'img', 'input', 'a', 'select', 'textarea', 'label']

    let current = el
    while (current && current !== container) {
      // data-inspect marked elements (components & typography rows)
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
    const el = realElAt(e)
    if (!el || !containerRef.current.contains(el)) return
    const target = findMeaningfulEl(el)
    if (!target) {
      // wrapper/background click → deselect visually, keep right panel
      selectedElRef.current = null; setSelectRect(null); return
    }
    selectedElRef.current = target
    setSelectRect(relRect(target))
    setHoverRect(null); setHoverLabel(null)
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
        {selectedItem.type === 'foundation' && selectedItem.name === 'Icons'      && <IconsPreview />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Button'     && <ButtonPreview   c={controls.Button} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'TextButton' && <TextButtonPreview c={controls.TextButton} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'ActionsActionArea' && <ActionsActionAreaPreview c={controls.ActionsActionArea} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Chip' && <ChipPreview c={controls.Chip} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Tab' && <TabPreview c={controls.Tab} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Snackbar' && <SnackbarPreview c={controls.Snackbar} />}
        {selectedItem.type === 'component'  && selectedItem.name === 'Tooltip' && <TooltipPreview c={controls.Tooltip} />}
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
  // Group themeTokenMap entries by group prefix
  const tokenGroups = {}
  Object.entries(themeTokenMap).forEach(([cssKey, token]) => {
    const group = cssKey.split('/')[0]
    if (!tokenGroups[group]) tokenGroups[group] = []
    tokenGroups[group].push({ cssKey, ...token })
  })

  const groupLabels = {
    primary:    'Primary (brand · mode-dependent)',
    'text&icon':  'Text & Icon',
    surface:      'Surface / Background',
    border:       'Border',
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
      <Section title="All variants" subtitle="Full variant matrix for designer review">
        {allVariants}
      </Section>
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

function CheckboxPreview({ c }) {
  return (
    <ComponentCanvas
      subtitle="Checkbox — current controls applied"
      hero={
        <Checkbox
          checked={c.checked}
          indeterminate={c.indeterminate}
          disabled={c.disabled}
          size={c.size}
          label={c.indeterminate ? 'Indeterminate' : c.checked ? 'Checked' : 'Unchecked'}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>States</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Checkbox checked={false}                 label="Unchecked" />
              <Checkbox checked={true}                  label="Checked" />
              <Checkbox indeterminate                   label="Indeterminate" />
              <Checkbox checked={false} disabled        label="Disabled (unchecked)" />
              <Checkbox checked={true}  disabled        label="Disabled (checked)" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Sizes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['lg', 'md', 'sm'].map(size => (
                <div key={size} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <Checkbox size={size} checked={false} label={`size=${size}`} />
                  <Checkbox size={size} checked={true} />
                  <Checkbox size={size} indeterminate />
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
  return (
    <ComponentCanvas
      subtitle="Radio — current controls applied"
      hero={
        <Radio
          checked={c.checked}
          disabled={c.disabled}
          size={c.size}
          label={c.label || '라디오'}
        />
      }
      allVariants={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* States */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>States</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Radio checked={false} label="Unchecked" />
              <Radio checked={true}  label="Checked" />
              <Radio checked={false} disabled label="Disabled (unchecked)" />
              <Radio checked={true}  disabled label="Disabled (checked)" />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Sizes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Radio.sizes.map(size => (
                <div key={size} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <Radio size={size} checked={false} label={`size=${size} unchecked`} />
                  <Radio size={size} checked={true}  label={`size=${size} checked`} />
                </div>
              ))}
            </div>
          </div>

          {/* Radio group example */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-icon-assistive)', marginBottom: '12px' }}>Radio group (example)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Radio checked={true}  label="옵션 1" />
              <Radio checked={false} label="옵션 2" />
              <Radio checked={false} label="옵션 3" />
              <Radio checked={false} disabled label="옵션 4 (비활성)" />
            </div>
          </div>

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
const GRAPHIC_ASSETS = {
  // 2.5:4 — orderHistory
  americano:   { src: '/assets/orderHistory/americono.png',   label: 'orderHistory/americono',   ratio: '2.5:4', size: '175×280' },
  coldbrew:    { src: '/assets/orderHistory/coldbrew.png',    label: 'orderHistory/coldbrew',    ratio: '2.5:4', size: '175×280' },
  plainyogurt: { src: '/assets/orderHistory/plainyogurt.png', label: 'orderHistory/plainyogurt', ratio: '2.5:4', size: '175×280' },
  strawberry:  { src: '/assets/orderHistory/strawberry.png',  label: 'orderHistory/strawberry',  ratio: '2.5:4', size: '175×280' },
  // 1:1 — recommended
  'v-set':                 { src: '/assets/recommended/v-set.png',     label: 'recommended/v-set',           ratio: '1:1', size: '320×320' },
  'bear-a-set':            { src: '/assets/recommended/bear-a-set.png', label: 'recommended/bear-a-set',     ratio: '1:1', size: '320×320' },
  'bear-b-set':            { src: '/assets/recommended/bear-b-set.png', label: 'recommended/bear-b-set',     ratio: '1:1', size: '320×320' },
  'storeProfile/fallback': { src: '/assets/storeProfile/fallback.png',  label: 'storeProfile/fallback',      ratio: '1:1', size: '160×160' },
  'storeProfile/store-1':  { src: '/assets/storeProfile/store-1.png',   label: 'storeProfile/store-1',       ratio: '1:1', size: '160×160' },
}

function GraphicPreview({ name }) {
  const asset = GRAPHIC_ASSETS[name]
  if (!asset) return null
  const is1x1 = asset.ratio === '1:1'
  const previewW = is1x1 ? 200 : 140
  const previewH = is1x1 ? 200 : 224
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section title={asset.label} subtitle={`PNG · ${asset.size} · 비율 ${asset.ratio}`}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', padding: '16px 0', flexWrap: 'wrap' }}>
          {/* 원본 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img
              src={asset.src}
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
              <img src={asset.src} alt={name} draggable={false}
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
  { label: 'Direction',       icons: ['IconChevronUp','IconChevronDown','IconChevronLeft','IconChevronRight','IconArrowUp','IconArrowDown','IconArrowLeft','IconArrowRight'] },
  { label: 'Actions',         icons: ['IconClose','IconCheck','IconPlus','IconMinus','IconSearch','IconDownload','IconRefresh'] },
  { label: 'Status',          icons: ['IconCheckCircle','IconPlusCircle','IconMinusCircle','IconAlertCircle','IconAlertCircleFill','IconErrorCircle','IconInfo','IconInfoFill','IconHelp','IconHelpFill'] },
  { label: 'Commerce',        icons: ['IconBag','IconBagFill','IconCart','IconCartFill','IconGift','IconCoupon','IconCouponFill','IconCard','IconCardFill'] },
  { label: 'Trash',           icons: ['IconTrash','IconTrashFill'] },
  { label: 'User / Social',   icons: ['IconPerson','IconPersonFill','IconStar','IconStarOutline','IconStarFill','IconStarRing'] },
  { label: 'System / UI',     icons: ['IconMenu','IconBell','IconBellFill','IconStamp'] },
  { label: 'Location / Home', icons: ['IconHome','IconHomeFill','IconLocation','IconLocationFill'] },
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
  return (
    <ComponentCanvas
      subtitle="Snackbar — current controls applied"
      allVariants={
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-base)', borderRadius: '8px', position: 'relative' }}>
          <Snackbar
            message={c.message}
            visible={true}
            onClose={() => {}}
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
  const targetRef = useRef(null)

  return (
    <ComponentCanvas
      subtitle="Tooltip — click to show/hide"
      allVariants={
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-base)', borderRadius: '8px', position: 'relative', gap: '40px', flexWrap: 'wrap', padding: '40px' }}>
          {['top', 'bottom', 'left', 'right'].map(placement => (
            <TooltipDemo key={placement} placement={placement} text={c.text} />
          ))}
          <Tooltip
            visible={c.visible}
            placement={c.placement}
            text={c.text}
            onClose={() => {}}
            targetRef={targetRef}
          />
        </div>
      }
    />
  )
}

function TooltipDemo({ placement, text }) {
  const [visible, setVisible] = useState(false)
  const targetRef = useRef(null)

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={targetRef}
        onClick={() => setVisible(!visible)}
        style={{
          padding: '8px 12px',
          backgroundColor: 'var(--primary-bgsolid)',
          color: 'var(--text-icon-base)',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        {placement}
      </button>
      <Tooltip
        visible={visible}
        placement={placement}
        text={text}
        onClose={() => setVisible(false)}
        targetRef={targetRef}
      />
    </div>
  )
}

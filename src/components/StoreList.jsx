// StoreList — Figma node 1842:11318
// Props: style ('Default' | 'Preparing' | 'Favorites' | 'Disabled' | 'ClosedDays' | 'Empty')

import { IconStarOutline, IconAlertCircleFill, IconArrowRight } from '../icons/icons.jsx'

const BASE = import.meta.env.BASE_URL

// ── Store image placeholder ─────────────────────────────────
function StorePlaceholder() {
  return (
    <div style={{
      width:           '100%',
      height:          '100%',
      backgroundColor: 'var(--surface-light-subtle)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3.5" stroke="var(--text-icon-subtle)" strokeWidth="1.5"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--text-icon-subtle)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────
export function StoreList({
  style          = 'Default',
  storeName      = '크럭스점',
  distance       = '8.18km',
  address        = '서울 강서구 마곡대로 125번길 88, 1002호',
  businessHour   = '08:00 ~ 21:30',
  storeImage     = null,
  emptyMessage   = '내용을 입력해 주세요.',
  hasEmptyMessage = true,
  onFavorite     = undefined,
}) {
  const isPreparing  = style === 'Preparing'
  const isClosedDays = style === 'ClosedDays'
  const isFavorites  = style === 'Favorites'
  const isDisabled   = style === 'Disabled'
  const isEmpty      = style === 'Empty'
  const isDimmed     = isPreparing || isClosedDays

  // ── Text colors ───────────────────────────────────────────
  const nameColor = isDisabled
    ? 'var(--text-icon-disabled)'
    : isDimmed
      ? 'var(--text-icon-alternative)'
      : 'var(--text-icon-info)'
  const distanceColor = isDisabled
    ? 'var(--text-icon-disabled)'
    : isDimmed
      ? 'var(--text-icon-alternative)'
      : 'var(--text-icon-normal)'
  const metaColor = isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-alternative)'

  // ── Card container ────────────────────────────────────────
  const cardBase = {
    position:     'relative',
    display:      'flex',
    borderRadius: 'var(--radius-default-300)',
    width:        '335px',
    overflow:     'hidden',
    boxSizing:    'border-box',
  }

  const cardLayout = isEmpty
    ? { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-400)' }
    : isDisabled
      ? { flexDirection: 'column', gap: 'var(--spacing-300)', alignItems: 'flex-start', padding: 'var(--spacing-300) var(--spacing-400)' }
      : { gap: 'var(--spacing-500)', alignItems: 'flex-start', padding: 'var(--spacing-300) var(--spacing-400)' }

  // ── Store image box ───────────────────────────────────────
  const storeImgBox = (
    <div style={{
      position:        'relative',
      width:           '64px',
      height:          '64px',
      borderRadius:    'var(--radius-default-300)',
      backgroundColor: 'var(--surface-base)',
      flexShrink:      0,
      overflow:        'hidden',
    }}>
      {storeImage
        ? <img src={storeImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : <StorePlaceholder />
      }
      {isDimmed && (
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: 'var(--dimmer-strong)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}>
          <span style={{
            fontSize:      '16px',
            fontWeight:    700,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         'var(--text-icon-base)',
            whiteSpace:    'nowrap',
          }}>
            {isClosedDays ? '휴무일' : '준비중'}
          </span>
        </div>
      )}
    </div>
  )

  // ── Star button ───────────────────────────────────────────
  const starBtn = (
    <button
      onClick={onFavorite}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '32px',
        height:          '32px',
        borderRadius:    'var(--radius-default-circle)',
        border:          isFavorites ? 'none' : '1px solid var(--border-light)',
        backgroundColor: isFavorites ? 'var(--surface-primary-solid)' : 'transparent',
        flexShrink:      0,
        cursor:          'pointer',
        padding:         0,
      }}
    >
      <IconStarOutline size={16} color={isFavorites ? 'var(--text-icon-base)' : 'var(--text-icon-assistive)'} />
    </button>
  )

  // ── Store info column ─────────────────────────────────────
  const infoCol = (
    <div style={{ display: 'flex', flex: '1 0 0', gap: 'var(--spacing-300)', alignItems: 'flex-start', minWidth: 0 }}>
      <div style={{ display: 'flex', flex: '1 0 0', flexDirection: 'column', gap: 'var(--spacing-200)', alignItems: 'flex-start', minWidth: 0 }}>
        {/* Name + distance row */}
        <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: nameColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {storeName}
          </span>
          <span style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: distanceColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {distance}
          </span>
        </div>
        {/* Address */}
        <p style={{ margin: 0, fontSize: '15px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: metaColor, width: '100%' }}>
          {address}
        </p>
        {/* Business hours */}
        <p style={{ margin: 0, fontSize: '15px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: metaColor, whiteSpace: 'nowrap' }}>
          {businessHour}
        </p>
      </div>
      {starBtn}
    </div>
  )

  // ── DarkLayer overlay (interactive state, opacity 0 by default) ──
  const darkLayer = (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--surface-heavy-solid)', opacity: 0, pointerEvents: 'none' }} />
  )

  // ── Empty ─────────────────────────────────────────────────
  if (isEmpty) {
    return (
      <div data-inspect="StoreList" style={{ ...cardBase, ...cardLayout }}>
        {hasEmptyMessage && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--spacing-200)', paddingBottom: 'var(--spacing-400)', width: '100%' }}>
            <p style={{ margin: 0, flex: '1 0 0', fontSize: '16px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-alternative)', textAlign: 'center' }}>
              {emptyMessage}
            </p>
          </div>
        )}
        <button style={{
          position:        'relative',
          display:         'flex',
          gap:             'var(--spacing-300)',
          alignItems:      'center',
          justifyContent:  'center',
          height:          '32px',
          padding:         '0 var(--spacing-400)',
          borderRadius:    'var(--radius-default-300)',
          border:          '1px solid var(--border-light)',
          backgroundColor: 'transparent',
          cursor:          'pointer',
          flexShrink:      0,
        }}>
          <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-primary)', whiteSpace: 'nowrap' }}>
            버튼명
          </span>
          <IconArrowRight size={16} color="var(--text-icon-primary)" />
        </button>
        {darkLayer}
      </div>
    )
  }

  // ── Disabled ──────────────────────────────────────────────
  if (isDisabled) {
    return (
      <div data-inspect="StoreList" style={{ ...cardBase, ...cardLayout }}>
        {/* Store row */}
        <div style={{ display: 'flex', gap: 'var(--spacing-500)', alignItems: 'flex-start', width: '100%', flexShrink: 0 }}>
          {storeImgBox}
          {infoCol}
        </div>
        {/* Alert box */}
        <div style={{
          display:         'flex',
          gap:             'var(--spacing-300)',
          alignItems:      'flex-start',
          padding:         'var(--spacing-300)',
          backgroundColor: 'var(--surface-light-subtle)',
          borderRadius:    'var(--radius-default-200)',
          width:           '100%',
          boxSizing:       'border-box',
          flexShrink:      0,
        }}>
          <IconAlertCircleFill size={20} color="var(--text-icon-alternative)" style={{ flexShrink: 0 }} />
          <div style={{ flex: '1 0 0', minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-alternative)' }}>
              이 매장은 앱에서 테이크아웃만 지원해요.
            </p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-alternative)' }}>
              매장이용은 매장에서 직접 이용해 주세요.
            </p>
          </div>
        </div>
        {darkLayer}
      </div>
    )
  }

  // ── Default / Favorites / Preparing / ClosedDays ──────────
  return (
    <div data-inspect="StoreList" style={{ ...cardBase, ...cardLayout }}>
      {storeImgBox}
      {infoCol}
      {darkLayer}
    </div>
  )
}

StoreList.styles = ['Default', 'Preparing', 'Favorites', 'Disabled', 'ClosedDays', 'Empty']

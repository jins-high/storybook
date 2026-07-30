// StoreSelector — Figma node 1904:11422
// Props: type ('BottomFixed' | 'TopContent'), hasSelectedStore, storeName, subtitle, badge

import { IconLocation, IconArrowRight, IconRefresh } from '../icons/icons.jsx'

// ── Chip button (white border on dark bg) ───────────────────
function DarkChip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position:        'relative',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        height:          '32px',
        padding:         '0 var(--spacing-400)',
        borderRadius:    'var(--radius-default-200)',
        border:          '1px solid var(--text-icon-base)',
        backgroundColor: 'transparent',
        cursor:          'pointer',
        flexShrink:      0,
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-base)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </button>
  )
}

// ── Inline text button (light bg) ──────────────────────────
function LightTextBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position:        'relative',
        display:         'flex',
        gap:             'var(--spacing-200)',
        height:          '20px',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '0 var(--spacing-300)',
        borderRadius:    'var(--radius-default-200)',
        border:          'none',
        backgroundColor: 'transparent',
        cursor:          'pointer',
        flexShrink:      0,
      }}
    >
      {icon}
      <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-alternative)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </button>
  )
}

// ── Main component ──────────────────────────────────────────
export function StoreSelector({
  type             = 'BottomFixed',
  hasSelectedStore = false,
  storeName        = '신사점',
  subtitle         = '500m, 테이크 아웃',
  badge            = false,
  onSelect         = undefined,
  onChange         = undefined,
}) {
  const isBottomFixed = type === 'BottomFixed'

  // ── BottomFixed: no store ─────────────────────────────────
  if (isBottomFixed && !hasSelectedStore) {
    return (
      <div
        data-inspect="StoreSelector"
        style={{
          display:         'flex',
          gap:             'var(--spacing-300)',
          alignItems:      'center',
          position:        'relative',
          width:           '375px',
          backgroundColor: 'var(--surface-heavy-solid)',
          height:          '72px',
          paddingLeft:     'var(--spacing-container-padding)',
          paddingRight:    'var(--spacing-container-padding)',
          paddingTop:      'var(--spacing-700)',
          paddingBottom:   'var(--spacing-700)',
          boxSizing:       'border-box',
        }}
      >
        <div style={{ flex: '1 0 0', minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-base)', whiteSpace: 'nowrap' }}>
            매장을 선택해주세요.
          </p>
        </div>
        <DarkChip label="매장 선택" onClick={onSelect} />
      </div>
    )
  }

  // ── BottomFixed: store selected ───────────────────────────
  if (isBottomFixed && hasSelectedStore) {
    return (
      <div
        data-inspect="StoreSelector"
        style={{
          display:         'flex',
          gap:             'var(--spacing-300)',
          alignItems:      'center',
          position:        'relative',
          width:           '375px',
          backgroundColor: 'var(--surface-heavy-solid)',
          height:          '72px',
          paddingLeft:     'var(--spacing-container-padding)',
          paddingRight:    'var(--spacing-container-padding)',
          boxSizing:       'border-box',
        }}
      >
        {/* Info column */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-100)', alignItems: 'flex-start', justifyContent: 'center', minWidth: 0 }}>
          {/* Name + badge */}
          <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-base)', whiteSpace: 'nowrap' }}>
              {storeName}
            </span>
            {badge && (
              <div style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             'var(--spacing-200)',
                height:          '20px',
                padding:         'var(--spacing-100) var(--spacing-200)',
                backgroundColor: 'var(--surface-normal-subtle)',
                borderRadius:    'var(--radius-default-100)',
                flexShrink:      0,
              }}>
                <span style={{ fontSize: '11px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-disabled)', whiteSpace: 'nowrap' }}>
                  준비중
                </span>
              </div>
            )}
          </div>
          {/* Subtitle */}
          <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-subtle)', whiteSpace: 'nowrap' }}>
            {subtitle}
          </span>
        </div>
        <DarkChip label="매장 변경" onClick={onChange} />
      </div>
    )
  }

  // ── TopContent: no store ──────────────────────────────────
  if (!hasSelectedStore) {
    return (
      <div
        data-inspect="StoreSelector"
        style={{
          display:         'flex',
          gap:             'var(--spacing-300)',
          alignItems:      'center',
          position:        'relative',
          width:           '375px',
          backgroundColor: 'var(--surface-base)',
          border:          '1px solid var(--border-normal)',
          borderRadius:    'var(--radius-default-400)',
          padding:         'var(--spacing-500)',
          boxSizing:       'border-box',
        }}
      >
        <div style={{ flex: '1 0 0', display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center', minWidth: 0 }}>
          <IconLocation size={24} color="var(--text-icon-normal)" style={{ flexShrink: 0 }} />
          <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-100)', justifyContent: 'center', minWidth: 0 }}>
            <span style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)', width: '100%' }}>
              매장을 선택해주세요.
            </span>
            <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-alternative)', width: '100%' }}>
              {subtitle}
            </span>
          </div>
        </div>
        <LightTextBtn
          icon={null}
          label="선택"
          onClick={onSelect}
        />
      </div>
    )
  }

  // ── TopContent: store selected ────────────────────────────
  return (
    <div
      data-inspect="StoreSelector"
      style={{
        display:         'flex',
        gap:             'var(--spacing-300)',
        alignItems:      'center',
        position:        'relative',
        width:           '375px',
        backgroundColor: 'var(--surface-base)',
        border:          '1px solid var(--border-normal)',
        borderRadius:    'var(--radius-default-400)',
        padding:         'var(--spacing-500)',
        boxSizing:       'border-box',
      }}
    >
      <div style={{ flex: '1 0 0', display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center', minWidth: 0 }}>
        <IconLocation size={24} color="var(--text-icon-normal)" style={{ flexShrink: 0 }} />
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-100)', justifyContent: 'center', minWidth: 0 }}>
          <span style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)', width: '100%' }}>
            {storeName}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-alternative)', width: '100%' }}>
            {subtitle}
          </span>
        </div>
      </div>
      <LightTextBtn
        icon={<IconRefresh size={16} color="var(--text-icon-alternative)" />}
        label="변경"
        onClick={onChange}
      />
    </div>
  )
}

StoreSelector.types = ['BottomFixed', 'TopContent']

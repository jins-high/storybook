// CardList — Figma node 2528:17563
import { IconCheck } from '../icons/icons.jsx'

const BASE = import.meta.env.BASE_URL

const t = (size, weight, color, extra = {}) => ({
  fontFamily: 'var(--font-family)',
  fontSize: `${size}px`,
  fontWeight: weight,
  lineHeight: 1.35,
  letterSpacing: '-0.25px',
  color,
  ...extra,
})

function CardLogo({ src, size = 32 }) {
  return (
    <div style={{
      width:           `${size}px`,
      height:          `${size}px`,
      borderRadius:    'var(--radius-default-200)',
      backgroundColor: 'white',
      overflow:        'hidden',
      flexShrink:      0,
    }}>
      <img
        src={BASE + 'assets/cardLogo/' + src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

const Dots = () => (
  <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flexShrink: 0 }}>
    {[0, 1, 2, 3].map(i => (
      <div
        key={i}
        style={{
          width:           '4px',
          height:          '4px',
          borderRadius:    '9999px',
          backgroundColor: 'var(--text-icon-alternative)',
        }}
      />
    ))}
  </div>
)

function CardNumberRow({ firstFour, lastFour }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center' }}>
      <span style={t(14, 400, 'var(--text-icon-alternative)', { whiteSpace: 'nowrap' })}>{firstFour}</span>
      <Dots />
      <Dots />
      <span style={t(14, 400, 'var(--text-icon-alternative)', { whiteSpace: 'nowrap' })}>{lastFour}</span>
    </div>
  )
}

function ManageCardBody({ bankName, cardLogoSrc, firstFour, lastFour }) {
  return (
    <>
      <CardLogo src={cardLogoSrc} size={32} />
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)', minWidth: 0 }}>
        <span style={t(16, 500, 'var(--text-icon-alternative)')}>{bankName}</span>
        <CardNumberRow firstFour={firstFour} lastFour={lastFour} />
      </div>
    </>
  )
}

export function CardList({
  display       = 'ManageDefault',
  bankName      = '현대',
  bankSummary   = '현대카드 (4852)',
  cardLogoSrc   = 'hyudai.png',
  firstFour     = '1234',
  lastFour      = '1234',
  representative = true,
  selected      = false,
}) {
  if (display === 'ManageDefault') {
    return (
      <div
        data-inspect="CardList"
        style={{
          display:         'flex',
          alignItems:      'center',
          width:           '327px',
          height:          '77px',
          gap:             'var(--spacing-500)',
          padding:         'var(--spacing-500)',
          backgroundColor: 'var(--surface-base)',
          border:          '1px solid var(--border-light)',
          borderRadius:    'var(--radius-default-400)',
          boxSizing:       'border-box',
        }}
      >
        <ManageCardBody bankName={bankName} cardLogoSrc={cardLogoSrc} firstFour={firstFour} lastFour={lastFour} />
        {representative && (
          <span style={t(14, 500, 'var(--text-icon-primary)', { whiteSpace: 'nowrap', flexShrink: 0 })}>
            대표 카드
          </span>
        )}
      </div>
    )
  }

  if (display === 'ManageSelected') {
    return (
      <div
        data-inspect="CardList"
        style={{
          display:     'flex',
          alignItems:  'center',
          width:       '327px',
          height:      '77px',
          gap:         'var(--spacing-300)',
          boxSizing:   'border-box',
        }}
      >
        {/* Blue check icon */}
        <div style={{
          width:           '24px',
          height:          '24px',
          borderRadius:    '9999px',
          backgroundColor: 'var(--text-icon-info)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
          color:           'white',
        }}>
          <IconCheck size={14} />
        </div>

        {/* Inner card with blue border */}
        <div style={{
          flex:            '1 0 0',
          display:         'flex',
          alignItems:      'center',
          gap:             'var(--spacing-500)',
          padding:         'var(--spacing-500)',
          backgroundColor: 'var(--surface-base)',
          border:          '1px solid var(--border-info-solid)',
          borderRadius:    'var(--radius-default-400)',
          height:          '100%',
          boxSizing:       'border-box',
          minWidth:        0,
        }}>
          <ManageCardBody bankName={bankName} cardLogoSrc={cardLogoSrc} firstFour={firstFour} lastFour={lastFour} />
        </div>
      </div>
    )
  }

  if (display === 'Payment') {
    return (
      <div
        data-inspect="CardList"
        style={{
          display:     'flex',
          alignItems:  'center',
          width:       '327px',
          gap:         'var(--spacing-500)',
          padding:     'var(--spacing-500) 0',
          boxSizing:   'border-box',
        }}
      >
        <div style={{ flex: '1 0 0', display: 'flex', alignItems: 'center', gap: 'var(--spacing-300)', minWidth: 0 }}>
          <CardLogo src={cardLogoSrc} size={24} />
          <span style={t(18, 500, 'var(--text-icon-disabled)', { flex: '1 0 0', minWidth: 0 })}>
            {bankSummary}
          </span>
          {selected && (
            <span style={t(16, 500, 'var(--text-icon-disabled)', { whiteSpace: 'nowrap', flexShrink: 0 })}>
              현재
            </span>
          )}
        </div>
      </div>
    )
  }

  // PaymentSelected
  return (
    <div
      data-inspect="CardList"
      style={{
        display:         'flex',
        alignItems:      'center',
        width:           '327px',
        gap:             'var(--spacing-500)',
        padding:         'var(--spacing-500)',
        backgroundColor: 'var(--surface-light-subtle)',
        borderRadius:    'var(--radius-default-400)',
        boxSizing:       'border-box',
      }}
    >
      <div style={{ flex: '1 0 0', display: 'flex', alignItems: 'center', gap: 'var(--spacing-300)', minWidth: 0 }}>
        <CardLogo src={cardLogoSrc} size={24} />
        <span style={t(18, 500, 'var(--text-icon-normal)', { flex: '1 0 0', minWidth: 0 })}>
          {bankSummary}
        </span>
        <span style={t(16, 500, 'var(--text-icon-primary)', { whiteSpace: 'nowrap', flexShrink: 0 })}>
          선택됨
        </span>
      </div>
    </div>
  )
}

CardList.displayTypes = ['ManageDefault', 'ManageSelected', 'Payment', 'PaymentSelected']
CardList.cardLogos = ['hyudai.png', 'kb.png', 'shinhan.png', 'samsung.png', 'bc.png', 'hana.png', 'lotte.png', 'nonghyup.png', 'wori.png', 'fallback-card.png']

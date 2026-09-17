// OptionProduct — Figma node 5745:101038
// 세트상품 상세 페이지의 옵션상품 행
import { Radio }              from './Radio.jsx'
import { TemperatureDisplay } from './TemperatureDisplay.jsx'

const BASE = import.meta.env.BASE_URL

const t = (size, weight, color, extra = {}) => ({
  fontFamily:    'var(--font-family)',
  fontSize:      `${size}px`,
  fontWeight:    weight,
  lineHeight:    1.35,
  letterSpacing: '-0.25px',
  color,
  ...extra,
})

export function OptionProduct({
  state         = 'Default',   // 'Default' | 'Active' | 'Disabled'
  optionName    = '딸기라떼',
  price         = '+4,000원',
  totalPrice    = '4,000원',
  imageSrc      = 'berry-full-strawberry-juice.png',
  hasTemperature = true,
  temperature   = 'ICED',
  option1       = true,
  option1Name   = '얼음 추가',
  option1Price  = '무료',
  option2       = true,
  option2Name   = '휘핑 크림 추가x2',
  option2Price  = '2,000원',
  option3       = true,
  option3Name   = '우유 추가x1',
  option3Price  = '500원',
  onInfoClick,
}) {
  const isActive   = state === 'Active'
  const isDisabled = state === 'Disabled'

  const radioState = isActive ? 'Selected' : isDisabled ? 'UncheckedDisabled' : 'Unselected'
  const nameColor  = isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)'

  return (
    <div
      data-inspect="OptionProduct"
      style={{
        display:  'flex',
        gap:      'var(--spacing-400)',
        alignItems: 'flex-start',
        width:    323,
        boxSizing: 'border-box',
      }}
    >
      {/* Left: radio + image + 정보 보기 */}
      <div style={{ display: 'flex', gap: 'var(--spacing-200)', alignItems: 'flex-start', flexShrink: 0 }}>
        <Radio state={radioState} size="Medium" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)', alignItems: 'center', flexShrink: 0 }}>
          {/* ProductImage */}
          <div style={{
            position:              'relative',
            width:                 72,
            height:                72,
            backgroundColor:       'var(--surface-primary-subtle)',
            borderTopLeftRadius:   'var(--radius-default-300)',
            borderTopRightRadius:  'var(--radius-default-100)',
            borderBottomLeftRadius:'var(--radius-default-100)',
            borderBottomRightRadius:'var(--radius-default-300)',
            overflow:              'hidden',
            flexShrink:            0,
          }}>
            <img
              src={BASE + 'assets/product/' + imageSrc}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {isDisabled && (
              <div style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: 'var(--dimmer-normal)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                padding:         10,
              }}>
                <span style={t(14, 700, 'var(--text-icon-base)', { textAlign: 'center', whiteSpace: 'nowrap' })}>
                  품절
                </span>
              </div>
            )}
          </div>

          {/* 정보 보기 button */}
          <button
            onClick={onInfoClick}
            style={{
              position:        'relative',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              gap:             'var(--spacing-200)',
              height:          20,
              padding:         '0 var(--spacing-300)',
              borderRadius:    'var(--radius-default-200)',
              border:          'none',
              background:      'none',
              cursor:          'pointer',
              overflow:        'hidden',
            }}
          >
            <div
              data-overlay=""
              style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: 'var(--surface-heavy-solid)',
                pointerEvents:   'none',
              }}
            />
            <span style={t(14, 500, 'var(--text-icon-alternative)', { whiteSpace: 'nowrap', position: 'relative' })}>
              정보 보기
            </span>
          </button>
        </div>
      </div>

      {/* Right: info */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)', minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-300)', padding: 'var(--spacing-200) 0' }}>
          {/* Name + price row */}
          <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'flex-start', width: '100%' }}>
            <span style={t(18, 500, nameColor, { flex: '1 0 0', minWidth: 0, wordBreak: 'break-word' })}>
              {optionName}
            </span>
            <span style={t(18, 500, nameColor, { flexShrink: 0, whiteSpace: 'nowrap', textAlign: 'right' })}>
              {price}
            </span>
          </div>

          {/* Active: detail options */}
          {isActive && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)', width: '100%' }}>
              {hasTemperature && <TemperatureDisplay type={temperature} />}

              {option1 && (
                <div style={{ display: 'flex', gap: 'var(--spacing-200)', alignItems: 'center', width: '100%' }}>
                  <span style={t(14, 500, 'var(--text-icon-assistive)', { flex: '1 0 0', minWidth: 0, wordBreak: 'break-word' })}>
                    {option1Name}
                  </span>
                  <span style={t(14, 500, 'var(--text-icon-assistive)', { flexShrink: 0, whiteSpace: 'nowrap' })}>
                    {option1Price}
                  </span>
                </div>
              )}
              {option2 && (
                <div style={{ display: 'flex', gap: 'var(--spacing-200)', alignItems: 'center', width: '100%' }}>
                  <span style={t(14, 500, 'var(--text-icon-assistive)', { flex: '1 0 0', minWidth: 0, wordBreak: 'break-word' })}>
                    {option2Name}
                  </span>
                  <span style={t(14, 500, 'var(--text-icon-assistive)', { flexShrink: 0, whiteSpace: 'nowrap' })}>
                    {option2Price}
                  </span>
                </div>
              )}
              {option3 && (
                <div style={{ display: 'flex', gap: 'var(--spacing-200)', alignItems: 'center', width: '100%' }}>
                  <span style={t(14, 500, 'var(--text-icon-assistive)', { flex: '1 0 0', minWidth: 0, wordBreak: 'break-word' })}>
                    {option3Name}
                  </span>
                  <span style={t(14, 500, 'var(--text-icon-assistive)', { flexShrink: 0, whiteSpace: 'nowrap' })}>
                    {option3Price}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active: total price */}
        {isActive && (
          <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center', width: '100%' }}>
            <span style={t(18, 500, 'var(--text-icon-normal)', { flex: '1 0 0', minWidth: 0, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>
              {totalPrice}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

OptionProduct.states    = ['Default', 'Active', 'Disabled']
OptionProduct.images    = ['berry-full-strawberry-juice.png', 'berry-full-strawberry-latte.png', 'bigpose-americano-decaf-yabangcha.png', 'bigpose-dolce-latte.png', 'dalgona-latte.png']

// CartItem — Figma node 2839:57441
// 장바구니 상품 아이템
import { useState } from 'react'
import { Checkbox }            from './Checkbox.jsx'
import { Stepper }             from './Stepper.jsx'
import { TemperatureDisplay }  from './TemperatureDisplay.jsx'
import { IconClose }           from '../icons/icons.jsx'

const BASE = import.meta.env.BASE_URL

const textBase = {
  fontFamily:    'var(--font-family)',
  lineHeight:    1.35,
  letterSpacing: '-0.25px',
}

const SOLD_OUT_MAX = 4

export function CartItem({
  // 선택
  checked          = true,
  onCheckedChange,

  // 상품
  imageSrc         = 'berry-full-strawberry-latte.png',
  productName      = '딸기라떼',
  state            = 'Default',   // 'Default' | 'SoldOut'(주문불가) | 'Unavailable'(품절)

  // 온도 + 기본가
  temperature      = 'ICED',
  basePrice        = '3,500원',

  // 옵션 1~3
  hasOption1       = true,
  option1Name      = '얼음 추가',
  option1Price     = '무료',
  hasOption2       = true,
  option2Name      = '휘핑 크림 추가x2',
  option2Price     = '2,000원',
  hasOption3       = true,
  option3Name      = '우유 추가x1',
  option3Price     = '500원',

  // 수량
  count            = 1,
  onCountChange,

  // 총 가격
  totalPrice       = '4,000원',

  // 재고 부족 메시지 (외부 제어 또는 count > SOLD_OUT_MAX 시 자동)
  optionSoldOut    = false,

  // X 버튼
  onRemove,
}) {
  const [checkedInt, setCheckedInt] = useState(checked)
  const [countInt,   setCountInt]   = useState(count)

  const isChecked    = onCheckedChange !== undefined ? checked    : checkedInt
  const liveCount    = onCountChange   !== undefined ? count      : countInt

  const handleCheck = () => {
    const next = !isChecked
    setCheckedInt(next)
    onCheckedChange?.(next)
  }

  const handleCount = (n) => {
    setCountInt(n)
    onCountChange?.(n)
  }

  const showSoldOutMsg = (optionSoldOut || liveCount >= SOLD_OUT_MAX) && state === 'Default'

  const isDisabled    = state === 'SoldOut' || state === 'Unavailable'
  const overlayLabel  = state === 'SoldOut' ? '주문불가' : state === 'Unavailable' ? '품절' : null

  const optionTextColor = isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-assistive)'
  const priceColor      = isDisabled ? 'var(--text-icon-disabled)' : 'var(--text-icon-normal)'

  return (
    <div
      data-inspect="CartItem"
      style={{
        display: 'flex',
        gap:     'var(--spacing-500)',
        width:   '327px',
      }}
    >
      {/* ── Left: 체크박스 + 이미지 + 옵션 변경 ── */}
      <div style={{ display: 'flex', gap: 'var(--spacing-200)', alignItems: 'flex-start', flexShrink: 0 }}>

        {/* 체크박스 (padding 2px, height 23px to align with first text line) */}
        <div
          onClick={handleCheck}
          style={{ padding: '2px', height: '23px', display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }}
        >
          <Checkbox state={isChecked ? 'Checked' : 'Unchecked'} size="Medium" style="Default" />
        </div>

        {/* 이미지 + 옵션 변경 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-300)', alignItems: 'center', flexShrink: 0 }}>

          {/* 상품 이미지 80×80 */}
          <div style={{
            position:               'relative',
            width:                  '80px',
            height:                 '80px',
            overflow:               'hidden',
            backgroundColor:        'var(--surface-primary-subtle)',
            borderTopLeftRadius:    'var(--radius-default-600)',
            borderTopRightRadius:   'var(--radius-default-200)',
            borderBottomRightRadius:'var(--radius-default-600)',
            borderBottomLeftRadius: 'var(--radius-default-200)',
            flexShrink:             0,
          }}>
            <img
              src={BASE + 'assets/product/' + imageSrc}
              alt={productName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {overlayLabel && (
              <div style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: 'var(--dimmer-normal)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                padding:         '10px',
              }}>
                <span style={{ ...textBase, fontSize: '16px', fontWeight: 700, color: 'var(--text-icon-base)', whiteSpace: 'nowrap' }}>
                  {overlayLabel}
                </span>
              </div>
            )}
          </div>

          {/* 옵션 변경 버튼 */}
          <div style={{
            height:          '20px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            padding:         '0 var(--spacing-300)',
            borderRadius:    'var(--radius-default-200)',
            cursor:          'pointer',
            userSelect:      'none',
          }}>
            <span style={{ ...textBase, fontSize: '14px', fontWeight: 500, color: 'var(--text-icon-assistive)', whiteSpace: 'nowrap' }}>
              옵션 변경
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: 상품 정보 ── */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)', minWidth: 0 }}>

        {/* 상단 그룹 (상품명 + 옵션) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-300)', paddingTop: 'var(--spacing-200)', paddingBottom: 'var(--spacing-200)' }}>

          {/* 상품명 + X 버튼 */}
          <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'flex-start' }}>
            <span style={{ ...textBase, flex: '1 0 0', fontSize: '18px', fontWeight: 500, color: 'var(--text-icon-normal)', minWidth: 0 }}>
              {productName}
            </span>
            <div
              onClick={onRemove}
              style={{ width: '20px', height: '20px', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <IconClose size={20} color="var(--text-icon-normal)" />
            </div>
          </div>

          {/* 옵션 블록 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)' }}>

            {/* 온도 + 기본가 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TemperatureDisplay type={temperature} />
              <span style={{ ...textBase, fontSize: '14px', fontWeight: 500, color: optionTextColor, whiteSpace: 'nowrap' }}>
                {basePrice}
              </span>
            </div>

            {/* 옵션 1 */}
            {hasOption1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-200)' }}>
                <span style={{ ...textBase, flex: '1 0 0', fontSize: '14px', fontWeight: 500, color: optionTextColor, minWidth: 0 }}>
                  {option1Name}
                </span>
                <span style={{ ...textBase, fontSize: '14px', fontWeight: 500, color: optionTextColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {option1Price}
                </span>
              </div>
            )}

            {/* 옵션 2 */}
            {hasOption2 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-200)' }}>
                <span style={{ ...textBase, flex: '1 0 0', fontSize: '14px', fontWeight: 500, color: optionTextColor, minWidth: 0 }}>
                  {option2Name}
                </span>
                <span style={{ ...textBase, fontSize: '14px', fontWeight: 500, color: optionTextColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {option2Price}
                </span>
              </div>
            )}

            {/* 옵션 3 */}
            {hasOption3 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-200)' }}>
                <span style={{ ...textBase, flex: '1 0 0', fontSize: '14px', fontWeight: 500, color: optionTextColor, minWidth: 0 }}>
                  {option3Name}
                </span>
                <span style={{ ...textBase, fontSize: '14px', fontWeight: 500, color: optionTextColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {option3Price}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 하단: 스태퍼 + 총 가격 */}
        <div style={{ display: 'flex', gap: 'var(--spacing-300)', alignItems: 'center' }}>
          <Stepper count={liveCount} min={1} max={SOLD_OUT_MAX} onChange={handleCount} />
          <span style={{ ...textBase, flex: '1 0 0', fontSize: '18px', fontWeight: 500, color: priceColor, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {totalPrice}
          </span>
        </div>

        {/* 재고 부족 안내 */}
        {showSoldOutMsg && (
          <p style={{ ...textBase, margin: 0, fontSize: '14px', fontWeight: 400, color: 'var(--text-icon-error)' }}>
            준비된 수량이 부족해요.
          </p>
        )}
      </div>
    </div>
  )
}

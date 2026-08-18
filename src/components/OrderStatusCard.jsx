// OrderStatusCard — Figma node 1751:14638
// Props: display ('Default' | 'Sticky'), status ('Pending' | 'Preparing' | 'Pickup' | 'Rejected')
// status labels: 접수대기 / 제조중 / 주문완료 / 주문거절

const BASE = import.meta.env.BASE_URL

// Per-status bar fill logic: how many of 3 columns are orange (or red for Rejected)
const BAR_FILL = { Pending: 1, Preparing: 2, Pickup: 3, Rejected: 3 }

// Timestamp labels row config
function StatusLabels({ status, pendingTime, preparingTime, pickupTime, rejectReason }) {
  if (status === 'Rejected') {
    return (
      <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-assistive)', textAlign: 'center', width: '100%' }}>
        매장에서 {rejectReason}로 인해 주문을 거절하였어요.
      </p>
    )
  }

  const labels = [
    { key: 'pending',   text: '접수대기', time: pendingTime,   active: true },
    { key: 'preparing', text: '제조중',   time: preparingTime, active: status === 'Preparing' || status === 'Pickup' },
    { key: 'pickup',    text: '주문완료', time: pickupTime,    active: status === 'Pickup' },
  ]

  // Which column is the "current" bold one
  const currentIdx = { Pending: 0, Preparing: 1, Pickup: 2 }[status]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', width: '100%', textAlign: 'center' }}>
      {labels.map((col, i) => {
        const isCurrent = i === currentIdx
        return (
          <div key={col.key} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <p style={{ fontSize: '14px', fontWeight: isCurrent ? 500 : 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: isCurrent ? 'var(--text-icon-normal)' : 'var(--text-icon-assistive)', margin: 0 }}>
              {col.text}
            </p>
            {col.time && (
              <p style={{ fontSize: '14px', fontWeight: isCurrent ? 500 : 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: isCurrent ? 'var(--text-icon-normal)' : 'var(--text-icon-assistive)', margin: 0 }}>
                {col.time}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function OrderStatusCard({
  display      = 'Default',
  status       = 'Pending',
  orderNumber  = '808',
  storeName    = '문래힐스테이트점',
  orderType    = '테이크아웃',
  items        = '그린티프라페 외 1종',
  rejectReason = '거절사유',
  pendingTime  = '11:12',
  preparingTime,
  pickupTime,
  productImage,
  onDismiss,
}) {
  const isSticky   = display === 'Sticky'
  const isDefault  = display === 'Default'
  const isRejected = status === 'Rejected'
  const isPickup   = status === 'Pickup'
  const imgSrc     = productImage ?? `${BASE}assets/product/green-tea-frappe.png`

  // Card outer
  const outerStyle = {
    display:         'flex',
    flexDirection:   'column',
    gap:             'var(--spacing-400)',
    width:           '327px',
    backgroundColor: 'var(--surface-base)',
    border:          '1px solid var(--border-primary-solid)',
    borderRadius:    'var(--radius-default-400)',
    padding:         isSticky
      ? 'var(--spacing-300)'
      : (isPickup || isRejected) && isDefault
        ? 'var(--spacing-500)'
        : 'var(--spacing-500)',
    alignItems:      isDefault && (isPickup || isRejected) ? 'center' : 'flex-start',
    boxShadow:       isSticky ? '0px 4px 4px rgba(0,0,0,0.12)' : 'none',
    boxSizing:       'border-box',
    position:        'relative',
  }

  // Thumbnail size
  const thumbSize = isSticky ? 48 : 64

  return (
    <div data-inspect="OrderStatusCard" style={outerStyle}>
      {/* Top row: thumbnail + text */}
      <div style={{ display: 'flex', gap: 'var(--spacing-400)', alignItems: isSticky ? 'center' : 'flex-start', width: '100%' }}>
        {/* Thumbnail */}
        <div style={{
          width:           `${thumbSize}px`,
          height:          `${thumbSize}px`,
          flexShrink:      0,
          borderRadius:    `var(--radius-default-300) var(--radius-default-100) var(--radius-default-300) var(--radius-default-100)`,
          backgroundColor: 'var(--surface-primary-subtle)',
          overflow:        'hidden',
        }}>
          <img
            src={imgSrc}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-200)' }}>
          {/* Order number */}
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-info)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            주문번호 {orderNumber}번
          </p>
          {/* Store name + order type badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-200)' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 1 }}>
              {storeName}
            </span>
            <span style={{
              flexShrink:      0,
              height:          '20px',
              padding:         'var(--spacing-100) var(--spacing-200)',
              borderRadius:    'var(--radius-default-100)',
              backgroundColor: 'var(--surface-normal-subtle)',
              fontSize:        '11px',
              fontWeight:      500,
              lineHeight:      1.35,
              letterSpacing:   '-0.25px',
              color:           'var(--text-icon-normal)',
              whiteSpace:      'nowrap',
              display:         'flex',
              alignItems:      'center',
            }}>
              {orderType}
            </span>
          </div>

          {/* Status message */}
          {!isRejected && (
            <p style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isSticky ? 'nowrap' : 'normal' }}>
              {status === 'Pickup'    && '메뉴가 준비되었어요.'}
              {status === 'Pending'   && '주문을 확인하고 있어요.'}
              {status === 'Preparing' && '00:00에 준비될 예정이에요.'}
            </p>
          )}

          {isRejected && (
            <div style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-normal)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <p style={{ margin: 0, lineHeight: 1.35 }}>매장에서 주문을 거절했어요.</p>
              <p style={{ margin: 0, lineHeight: 1.35 }}>사유: {rejectReason}</p>
            </div>
          )}

          {/* Item description — Default only */}
          {isDefault && (
            <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.25px', color: 'var(--text-icon-assistive)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {items}
            </p>
          )}
        </div>
      </div>

      {/* Status bar + labels — Default only */}
      {isDefault && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-300)', width: '100%' }}>
          {/* Progress bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', width: '100%' }}>
            {isRejected ? (
              /* Rejected: full-width red bar */
              <div style={{ gridColumn: '1 / span 3', height: '6px', borderRadius: 'var(--radius-default-circle)', backgroundColor: 'var(--surface-error-solid)' }} />
            ) : (
              [0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    height:          '6px',
                    borderRadius:    'var(--radius-default-circle)',
                    backgroundColor: i < BAR_FILL[status]
                      ? 'var(--primary-bgsolid)'
                      : 'var(--surface-normal-subtle)',
                  }}
                />
              ))
            )}
          </div>

          {/* Status labels */}
          <StatusLabels
            status={status}
            pendingTime={pendingTime}
            preparingTime={preparingTime}
            pickupTime={pickupTime}
            rejectReason={rejectReason}
          />
        </div>
      )}

      {/* Dismiss button — Pickup and Rejected, Default only */}
      {isDefault && (isPickup || isRejected) && (
        <button
          onClick={onDismiss}
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            justifyContent:  'center',
            gap:             'var(--spacing-300)',
            height:          '32px',
            padding:         '0 var(--spacing-400)',
            border:          '1px solid var(--border-light)',
            borderRadius:    'var(--radius-default-300)',
            backgroundColor: 'transparent',
            fontSize:        '14px',
            fontWeight:      500,
            lineHeight:      1.35,
            letterSpacing:   '-0.25px',
            color:           'var(--text-icon-alternative)',
            cursor:          'pointer',
            fontFamily:      'inherit',
            whiteSpace:      'nowrap',
          }}
        >
          주문내역 지우기
        </button>
      )}
    </div>
  )
}

OrderStatusCard.displays = ['Default', 'Sticky']
OrderStatusCard.statuses = ['Pending', 'Preparing', 'Pickup', 'Rejected']

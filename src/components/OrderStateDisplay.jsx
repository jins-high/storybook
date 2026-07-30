// OrderStateDisplay — Figma node 2406:33793
// type: '접수대기' | '픽업완료' | '주문취소'

const COLOR = {
  '접수대기': 'var(--text-icon-assistive)',
  '픽업완료': 'var(--text-icon-info)',
  '주문취소': 'var(--text-icon-error)',
}

export function OrderStateDisplay({ type = '접수대기' }) {
  return (
    <span
      data-inspect="OrderStateDisplay"
      style={{
        fontFamily:    'var(--font-family)',
        fontSize:      '15px',
        fontWeight:    500,
        lineHeight:    1.35,
        letterSpacing: '-0.25px',
        color:         COLOR[type] ?? COLOR['접수대기'],
        whiteSpace:    'nowrap',
      }}
    >
      {type}
    </span>
  )
}

OrderStateDisplay.types = ['접수대기', '픽업완료', '주문취소']

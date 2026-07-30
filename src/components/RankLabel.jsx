// RankLabel — Figma node 2692:21670
// Props: tier ('Bronze' | 'Silver' | 'Gold' | 'Diamond')
// Fixed 4 tiers, no extension

const BASE = import.meta.env.BASE_URL

const TIER_MAP = {
  Bronze:  { img: 'bronze-tier.png',  label: '브론즈 등급',    color: 'var(--text-icon-caution)' },
  Silver:  { img: 'silver-tier.png',  label: '실버 등급',     color: 'var(--text-icon-assistive)' },
  Gold:    { img: 'gold-tier.png',    label: '골드 등급',     color: 'var(--text-icon-primary-strong)' },
  Diamond: { img: 'diamond-tier.png', label: '다이아몬드 등급', color: 'var(--text-icon-info)' },
}

export function RankLabel({ tier = 'Bronze' }) {
  const t = TIER_MAP[tier] ?? TIER_MAP.Bronze

  return (
    <div
      data-inspect="RankLabel"
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        'var(--spacing-200)',
        flexShrink: 0,
      }}
    >
      <img
        src={`${BASE}assets/rankBadge/${t.img}`}
        width={24}
        height={24}
        style={{ display: 'block', flexShrink: 0 }}
        alt=""
      />
      <span
        style={{
          fontSize:      '14px',
          fontWeight:    700,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         t.color,
          whiteSpace:    'nowrap',
        }}
      >
        {t.label}
      </span>
    </div>
  )
}

RankLabel.tiers = ['Bronze', 'Silver', 'Gold', 'Diamond']

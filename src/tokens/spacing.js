/**
 * Layer 1 — Primitive Tokens (Dimension)
 * Figma collection: "Palette / Dimension"
 *
 * Layer 2 — Semantic (Alias) Tokens
 * Figma collection: "Theme / Number"
 *   Number/Spacing/*         — spacing scale
 *   Number/Radius(Default)/* — changes per brand mode
 *   Number/Radius(Fixed)/*   — same across all modes
 */

// ── Dimension (Palette / primitive) ───────────────────────
export const dimension = {
  0:    0,
  2:    2,
  4:    4,
  6:    6,
  8:    8,
  10:   10,
  12:   12,
  16:   16,
  20:   20,
  24:   24,
  28:   28,
  32:   32,
  36:   36,
  40:   40,
  44:   44,
  48:   48,
  52:   52,
  56:   56,
  Full: 999,
}

// ── Spacing (Theme / Number/Spacing) ──────────────────────
// "Lv 9" duplicate in Figma (space typo, 56px) renamed → lv11
export const spacing = [
  { level: 'Spacing-100',               px: 2,    cssVar: '--spacing-100',               figmaPath: 'Number/Spacing/Spacing-100'               },
  { level: 'Spacing-200',               px: 4,    cssVar: '--spacing-200',               figmaPath: 'Number/Spacing/Spacing-200'               },
  { level: 'Spacing-300',               px: 8,    cssVar: '--spacing-300',               figmaPath: 'Number/Spacing/Spacing-300'               },
  { level: 'Spacing-400',               px: 12,   cssVar: '--spacing-400',               figmaPath: 'Number/Spacing/Spacing-400'               },
  { level: 'Spacing-500',               px: 16,   cssVar: '--spacing-500',               figmaPath: 'Number/Spacing/Spacing-500'               },
  { level: 'Spacing-600',               px: 20,   cssVar: '--spacing-600',               figmaPath: 'Number/Spacing/Spacing-600'               },
  { level: 'Spacing-700',               px: 24,   cssVar: '--spacing-700',               figmaPath: 'Number/Spacing/Spacing-700'               },
  { level: 'Spacing-800',               px: 32,   cssVar: '--spacing-800',               figmaPath: 'Number/Spacing/Spacing-800'               },
  { level: 'Spacing-900',               px: 40,   cssVar: '--spacing-900',               figmaPath: 'Number/Spacing/Spacing-900'               },
  { level: 'Spacing-1000',              px: 48,   cssVar: '--spacing-1000',              figmaPath: 'Number/Spacing/Spacing-1000'              },
  { level: 'Spacing-1100',              px: 56,   cssVar: '--spacing-1100',              figmaPath: 'Number/Spacing/Spacing-1100'              },
  { level: 'container-padding', px: null, cssVar: '--spacing-container-padding', figmaPath: 'Number/Spacing/Container-padding',
    note: 'hasamdong 16px · compose-dark/tenpersent 20px' },
]

// ── Radius(Default) — per brand mode ──────────────────────
// hasamdong & tenpersent: smaller; compose-dark: larger
export const radiusDefault = [
  { size: 'Radius-100', cssVar: '--radius-default-100', figmaPath: 'Number/Radius(Default)/Radius-100',
    hasamdong: 2,   composeDark: 4,   tenpersent: 2   },
  { size: 'Radius-200', cssVar: '--radius-default-200', figmaPath: 'Number/Radius(Default)/Radius-200',
    hasamdong: 4,   composeDark: 8,   tenpersent: 4   },
  { size: 'Radius-300', cssVar: '--radius-default-300', figmaPath: 'Number/Radius(Default)/Radius-300',
    hasamdong: 6,   composeDark: 12,  tenpersent: 6   },
  { size: 'Radius-400', cssVar: '--radius-default-400', figmaPath: 'Number/Radius(Default)/Radius-400',
    hasamdong: 10,  composeDark: 16,  tenpersent: 10  },
  { size: 'Radius-500', cssVar: '--radius-default-500', figmaPath: 'Number/Radius(Default)/Radius-500',
    hasamdong: 12,  composeDark: 20,  tenpersent: 12  },
  { size: 'Radius-600', cssVar: '--radius-default-600', figmaPath: 'Number/Radius(Default)/Radius-600',
    hasamdong: 16,  composeDark: 24,  tenpersent: 16  },
  { size: 'Radius-Circle', cssVar: '--radius-default-circle', figmaPath: 'Number/Radius(Default)/Radius-Circle',
    hasamdong: 999, composeDark: 999, tenpersent: 999 },
]

// ── Radius(Fixed) — same across all modes ─────────────────
export const radiusStatic = [
  { size: 'Radius-100',    px: 4,   cssVar: '--radius-fixed-100',    figmaPath: 'Number/Radius(Fixed)/Radius-100'    },
  { size: 'Radius-200',    px: 6,   cssVar: '--radius-fixed-200',    figmaPath: 'Number/Radius(Fixed)/Radius-200'    },
  { size: 'Radius-Circle', px: 999, cssVar: '--radius-fixed-circle', figmaPath: 'Number/Radius(Fixed)/Radius-Circle' },
]

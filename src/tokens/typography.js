/**
 * Typography Tokens
 * Sourced directly from Figma variable_defs — Foundation page
 *
 * Font/Family is a MODE variable — not hardcoded.
 * Switching font mode updates all components globally via --font/family.
 *
 * Type scale: display > displaySmall > title > titleSmall >
 *             body > bodySmall > label > labelSmall > caption
 * Weights per style: Regular (400) / Medium (500) / Bold (700)
 *
 * Line height is a ratio (e.g. 1.35 means 135% of font size)
 * Letter spacing is in px (negative = tighter)
 */

// ── Font Families (Modes) ─────────────────────────────────
// Figma variable: Font/Family — switches per brand mode
export const fontModes = {
  pretendard: {
    name: 'Pretendard',
    value: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  suit: {
    name: 'SUIT',
    value: '"SUIT Variable", SUIT, -apple-system, sans-serif',
  },
  gmarket: {
    name: 'Gmarket Sans',
    value: '"GmarketSans", "Gmarket Sans", sans-serif',
  },
}

// ── Font Weights ──────────────────────────────────────────
export const fontWeight = {
  Regular: 400,
  Medium:  500,
  Bold:    700,
}

// ── Type Scale ────────────────────────────────────────────
// Sourced from Figma get_variable_defs on Foundation page
// lineHeight values are ratios; letterSpacing in px
export const typography = {
  display: {
    Regular: { fontSize: 28, fontWeight: 400, lineHeight: 1.00, letterSpacing: -0.5 },
    Medium:  { fontSize: 28, fontWeight: 500, lineHeight: 1.00, letterSpacing: -0.5 },
    Bold:    { fontSize: 28, fontWeight: 700, lineHeight: 1.00, letterSpacing: -0.5 },
  },
  displaySmall: {
    Regular: { fontSize: 24, fontWeight: 400, lineHeight: 1.15, letterSpacing: -0.5 },
    Medium:  { fontSize: 24, fontWeight: 500, lineHeight: 1.15, letterSpacing: -0.5 },
    Bold:    { fontSize: 24, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.5 },
  },
  title: {
    Regular: { fontSize: 20, fontWeight: 400, lineHeight: 1.30, letterSpacing: -0.25 },
    Medium:  { fontSize: 20, fontWeight: 500, lineHeight: 1.30, letterSpacing: -0.25 },
    Bold:    { fontSize: 20, fontWeight: 700, lineHeight: 1.30, letterSpacing: -0.25 },
  },
  titleSmall: {
    Regular: { fontSize: 18, fontWeight: 400, lineHeight: 1.35, letterSpacing: -0.25 },
    Medium:  { fontSize: 18, fontWeight: 500, lineHeight: 1.35, letterSpacing: -0.25 },
    Bold:    { fontSize: 18, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.25 },
  },
  body: {
    Regular: { fontSize: 16, fontWeight: 400, lineHeight: 1.35, letterSpacing: -0.25 },
    Medium:  { fontSize: 16, fontWeight: 500, lineHeight: 1.35, letterSpacing: -0.25 },
    Bold:    { fontSize: 16, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.25 },
  },
  bodySmall: {
    Regular: { fontSize: 15, fontWeight: 400, lineHeight: 1.35, letterSpacing: -0.25 },
    Medium:  { fontSize: 15, fontWeight: 500, lineHeight: 1.35, letterSpacing: -0.25 },
    Bold:    { fontSize: 15, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.25 },
  },
  label: {
    Regular: { fontSize: 14, fontWeight: 400, lineHeight: 1.35, letterSpacing: -0.25 },
    Medium:  { fontSize: 14, fontWeight: 500, lineHeight: 1.35, letterSpacing: -0.25 },
    Bold:    { fontSize: 14, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.25 },
  },
  labelSmall: {
    Regular: { fontSize: 13, fontWeight: 400, lineHeight: 1.35, letterSpacing: -0.25 },
    Medium:  { fontSize: 13, fontWeight: 500, lineHeight: 1.35, letterSpacing: -0.25 },
    Bold:    { fontSize: 13, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.25 },
  },
  caption: {
    Regular: { fontSize: 11, fontWeight: 400, lineHeight: 1.35, letterSpacing: -0.25 },
    Medium:  { fontSize: 11, fontWeight: 500, lineHeight: 1.35, letterSpacing: -0.25 },
    Bold:    { fontSize: 11, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.25 },
  },
}

// Helper: convert token to CSS style object (for inline use)
export function typographyStyle(scale, weight = 'Regular') {
  const t = typography[scale]?.[weight]
  if (!t) return {}
  return {
    fontSize:      `${t.fontSize}px`,
    fontWeight:    t.fontWeight,
    lineHeight:    t.lineHeight,
    letterSpacing: `${t.letterSpacing}px`,
    fontFamily:    'var(--font/family)',
  }
}

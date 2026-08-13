/**
 * Layer 1 — Primitive Tokens (Palette)
 * Figma collection: "Palette" (node 265-2169)
 * Source: Figma MCP get_variable_defs — exact hex values
 *
 * Brand palettes:
 *   Brand/Compose    — yellow/gold
 *   Brand/Tenpersent — warm orange-red (Figma typo preserved)
 *
 * Status palettes:
 *   Blue   — Status/Info
 *   Green  — Status/Success
 *   Red    — Status/Error
 *   Orange — Status/Caution
 */

export const palette = {

  // ── Neutral ───────────────────────────────────────────────
  neutral: {
    White: '#ffffff',
    20:    '#f8f8f8',
    50:    '#f2f2f2',
    100:   '#e3e4e5',
    150:   '#d7d8d9',
    200:   '#c8cacc',
    300:   '#adb0b2',
    400:   '#939699',
    500:   '#797d80',
    600:   '#606366',
    700:   '#474a4d',
    800:   '#2f3133',
    900:   '#17181a',
    950:   '#0b0c0d',
    Black: '#000000',
  },

  // ── Overlay-Black ─────────────────────────────────────────
  overlayBlack: {
    10: 'rgba(47,49,51,0.12)',
    20: 'rgba(47,49,51,0.16)',
    30: 'rgba(47,49,51,0.20)',
    40: 'rgba(0,0,0,0.40)',
    80: 'rgba(0,0,0,0.80)',
  },

  // ── Overlay-White ─────────────────────────────────────────
  overlayWhite: {
    10: 'rgba(200,202,204,0.16)',
    20: 'rgba(200,202,204,0.32)',
    50: 'rgba(200,202,204,0.48)',
    40: 'rgba(200,202,204,0.64)',
  },

  // ── Brand/Compose ─────────────────────────────────────────
  compose: {
    20:  '#fffdf5',
    50:  '#fefae8',
    100: '#fff5c2',
    200: '#ffe889',
    300: '#ffce32',
    400: '#ffbb0d',
    500: '#ef9b00',
    600: '#cc7b02',
    700: '#a35505',
    800: '#86430d',
    900: '#723711',
    950: '#431b05',
  },

  // ── Brand/Tenpersent ──────────────────────────────────────
  tenpersent: {
    20:  '#fffcf7',
    50:  '#fff5e5',
    100: '#fadebc',
    200: '#ffbf95',
    300: '#ffa66f',
    400: '#ee7c3a',
    500: '#e35425',
    600: '#d04500',
    700: '#983500',
    800: '#6a2a00',
    900: '#462100',
    950: '#2b1400',
  },

  // ── Blue (Status/Info) ────────────────────────────────────
  blue: {
    20:  '#f7fcff',
    50:  '#edf8ff',
    100: '#d6efff',
    200: '#b5e4ff',
    300: '#83d5ff',
    400: '#48bcff',
    500: '#1e9aff',
    600: '#067aff',
    700: '#0066ff',
    800: '#084ec5',
    900: '#0d469b',
    950: '#0e2b5d',
  },

  // ── Green (Status/Success) ────────────────────────────────
  green: {
    20:  '#f5fff5',
    50:  '#e7ffe6',
    100: '#cbfdca',
    200: '#9bfc9a',
    300: '#60f661',
    400: '#30eb33',
    500: '#12dd19',
    600: '#09a711',
    700: '#0c7f14',
    800: '#106417',
    900: '#125519',
    950: '#042f09',
  },

  // ── Red (Status/Error) ────────────────────────────────────
  red: {
    20:  '#fffafb',
    50:  '#fff0f3',
    100: '#ffdde4',
    200: '#ffc2ce',
    300: '#ff97ac',
    400: '#ff5b7c',
    500: '#ff2955',
    600: '#f9093a',
    700: '#e50331',
    800: '#ad0729',
    900: '#8f0d27',
    950: '#4e0111',
  },

  // ── Orange (Status/Caution) ───────────────────────────────
  orange: {
    20:  '#fffef7',
    50:  '#fef8ec',
    100: '#fbecca',
    200: '#f7d890',
    300: '#f3bf56',
    400: '#f0a82f',
    500: '#e98717',
    600: '#ce6411',
    700: '#ab4512',
    800: '#8b3715',
    900: '#732d14',
    950: '#421506',
  },

}

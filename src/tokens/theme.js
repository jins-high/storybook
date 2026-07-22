/**
 * Layer 2 — Semantic (Alias) Tokens
 * Figma collection: "Theme" (Semantic section, node 10456-10039)
 * Source: Figma Foundation page, row-by-row extraction
 *
 * Figma variable modes (exactly 3):
 *   Hasamdong     — hasamdong brand, light
 *   Compose-dark  — compose brand, dark
 *   Compose-light — compose brand, light
 *
 * Token groups (matching Figma exactly):
 *   Color/Text&Icon/*
 *   Color/Surface/*
 *   Color/Border/*
 *   Color/Dimmer/*
 */

import { palette } from './palette'

const ref = (palettePath, value) => ({ palettePath, value })

// ── Text&Icon ─────────────────────────────────────────────
// Hasamdong (default / light mode) values
export const textIcon = {
  Strong:        ref('Neutral/Black',         palette.neutral.Black),
  Normal:        ref('Neutral/900',           palette.neutral[900]),
  Alternative:   ref('Neutral/700',           palette.neutral[700]),
  Assistive:     ref('Neutral/500',           palette.neutral[500]),
  Disabled:      ref('Neutral/300',           palette.neutral[300]),
  Subtle:        ref('Neutral/200',           palette.neutral[200]),
  Base:          ref('Neutral/White',         palette.neutral.White),
  'Base-sub':    ref('Neutral/100',           palette.neutral[100]),
  Primary:       ref('Brand/Hasamdong/600',   palette.hasamdong[600]),
  PrimaryStrong: ref('Brand/Hasamdong/700',   palette.hasamdong[700]),
  Info:          ref('Blue/700',              palette.blue[700]),
  Success:       ref('Green/600',             palette.green[600]),
  Error:         ref('Red/600',               palette.red[600]),
  Caution:       ref('Orange/600',            palette.orange[600]),
}

// ── Surface ───────────────────────────────────────────────
// Hasamdong (default / light mode) values
export const surface = {
  LightSolid:     ref('Neutral/700',           palette.neutral[700]),
  LightSubtle:    ref('Neutral/20',            palette.neutral[20]),
  NormalSolid:    ref('Neutral/900',           palette.neutral[900]),
  NormalSubtle:   ref('Neutral/50',            palette.neutral[50]),
  HeavySolid:     ref('Neutral/Black',         palette.neutral.Black),
  HeavySubtle:    ref('Neutral/100',           palette.neutral[100]),
  Base:           ref('Neutral/White',         palette.neutral.White),
  PrimarySolid:   ref('Brand/Hasamdong/500',   palette.hasamdong[500]),
  PrimarySubtle:  ref('Brand/Hasamdong/50',    palette.hasamdong[50]),
  InfoSolid:      ref('Blue/500',              palette.blue[500]),
  InfoSubtle:     ref('Blue/50',               palette.blue[50]),
  SuccessSolid:   ref('Green/500',             palette.green[500]),
  SuccessSubtle:  ref('Green/50',              palette.green[50]),
  ErrorSolid:     ref('Red/500',               palette.red[500]),
  ErrorSubtle:    ref('Red/50',                palette.red[50]),
  CautionSolid:   ref('Orange/500',            palette.orange[500]),
  CautionSubtle:  ref('Orange/50',             palette.orange[50]),
}

// ── Border ────────────────────────────────────────────────
// Hasamdong (default / light mode) values
export const border = {
  Light:          ref('Overlay-Black/10',       palette.overlayBlack[10]),
  Normal:         ref('Overlay-Black/20',       palette.overlayBlack[20]),
  Heavy:          ref('Overlay-Black/30',       palette.overlayBlack[30]),
  PrimarySolid:   ref('Brand/Hasamdong/400',    palette.hasamdong[400]),
  PrimarySubtle:  ref('Brand/Hasamdong/100',    palette.hasamdong[100]),
  InfoSolid:      ref('Blue/400',               palette.blue[400]),
  InfoSubtle:     ref('Blue/100',               palette.blue[100]),
  SuccessSolid:   ref('Green/400',              palette.green[400]),
  SuccessSubtle:  ref('Green/100',              palette.green[100]),
  ErrorSolid:     ref('Red/400',                palette.red[400]),
  ErrorSubtle:    ref('Red/100',                palette.red[100]),
  CautionSolid:   ref('Orange/400',             palette.orange[400]),
  CautionSubtle:  ref('Orange/100',             palette.orange[100]),
}

// ── Dimmer ────────────────────────────────────────────────
export const dimmer = {
  Strong: ref('Overlay-Black/100', '#000000cc'),
  Normal: ref('Overlay-Black/40', palette.overlayBlack[40]),
}

// ── Brand modes ───────────────────────────────────────────
export const modes = {
  hasamdong: {
    name:       '하삼동',
    font:       'pretendard',
    fontName:   'Pretendard',
    isDark:     false,
    paletteKey: 'hasamdong',
    primary: {
      TextIcon:      { palettePath: 'Brand/Hasamdong/600', value: palette.hasamdong[600] },
      BgSolid:       { palettePath: 'Brand/Hasamdong/500', value: palette.hasamdong[500] },
      BgSubtle:      { palettePath: 'Brand/Hasamdong/50',  value: palette.hasamdong[50]  },
      BdSolid:       { palettePath: 'Brand/Hasamdong/400', value: palette.hasamdong[400] },
      BdSubtle:      { palettePath: 'Brand/Hasamdong/100', value: palette.hasamdong[100] },
    },
  },
  'compose-dark': {
    name:       '컴포즈 (Dark)',
    font:       'pretendard',
    fontName:   'Pretendard',
    isDark:     true,
    paletteKey: 'compose',
    primary: {
      TextIcon:      { palettePath: 'Blue/400',          value: palette.blue[400]    },
      BgSolid:       { palettePath: 'Brand/Compose/300', value: palette.compose[300] },
      BgSubtle:      { palettePath: 'Brand/Compose/950', value: palette.compose[950] },
      BdSolid:       { palettePath: 'Blue/500',          value: palette.blue[500]    },
      BdSubtle:      { palettePath: 'Brand/Compose/500', value: palette.compose[500] },
    },
  },
  'compose-light': {
    name:       '컴포즈 (Light)',
    font:       'pretendard',
    fontName:   'Pretendard',
    isDark:     false,
    paletteKey: 'compose',
    primary: {
      TextIcon:      { palettePath: 'Blue/700',          value: palette.blue[700]    },
      BgSolid:       { palettePath: 'Brand/Compose/300', value: palette.compose[300] },
      BgSubtle:      { palettePath: 'Brand/Compose/50',  value: palette.compose[50]  },
      BdSolid:       { palettePath: 'Blue/400',          value: palette.blue[400]    },
      BdSubtle:      { palettePath: 'Brand/Compose/400', value: palette.compose[400] },
    },
  },
}

// ── Flat token map for UI inspector ───────────────────────
export const themeTokenMap = {}

const register = (cssVar, figmaPath, palettePath, value) => {
  themeTokenMap[cssVar] = { figmaPath, palettePath, value }
}

// Primary (Hasamdong default)
register('primary-text-icon',  'Primary/Text&Icon', 'Brand/Hasamdong/600', palette.hasamdong[600])
register('primary-bgsolid',    'Primary/BgSolid',   'Brand/Hasamdong/500', palette.hasamdong[500])
register('primary-bgsubtle',   'Primary/BgSubtle',  'Brand/Hasamdong/50',  palette.hasamdong[50])
register('primary-bdsolid',    'Primary/BdSolid',   'Brand/Hasamdong/400', palette.hasamdong[400])
register('primary-bdsubtle',   'Primary/BdSubtle',  'Brand/Hasamdong/100', palette.hasamdong[100])

// Text&Icon
register('text-icon-strong',      'Color/Text&Icon/Strong',      'Neutral/Black',       palette.neutral.Black)
register('text-icon-normal',      'Color/Text&Icon/Normal',      'Neutral/900',         palette.neutral[900])
register('text-icon-alternative', 'Color/Text&Icon/Alternative', 'Neutral/700',         palette.neutral[700])
register('text-icon-assistive',   'Color/Text&Icon/Assistive',   'Neutral/500',         palette.neutral[500])
register('text-icon-disabled',    'Color/Text&Icon/Disabled',    'Neutral/300',         palette.neutral[300])
register('text-icon-subtle',      'Color/Text&Icon/Subtle',      'Neutral/200',         palette.neutral[200])
register('text-icon-base',        'Color/Text&Icon/Base',        'Neutral/White',       palette.neutral.White)
register('text-icon-base-sub',    'Color/Text&Icon/Base-sub',    'Neutral/100',         palette.neutral[100])
register('text-icon-primary',       'Color/Text&Icon/Primary',       'Brand/Hasamdong/600', palette.hasamdong[600])
register('text-icon-primary-strong', 'Color/Text&Icon/PrimaryStrong', 'Brand/Hasamdong/700', palette.hasamdong[700])
register('text-icon-info',          'Color/Text&Icon/Info',          'Blue/700',            palette.blue[700])
register('text-icon-success',     'Color/Text&Icon/Success',     'Green/600',           palette.green[600])
register('text-icon-error',       'Color/Text&Icon/Error',       'Red/600',             palette.red[600])
register('text-icon-caution',     'Color/Text&Icon/Caution',     'Orange/600',          palette.orange[600])

// Surface
register('surface-light-solid',     'Color/Surface/LightSolid',     'Neutral/700',           palette.neutral[700])
register('surface-light-subtle',    'Color/Surface/LightSubtle',    'Neutral/20',            palette.neutral[20])
register('surface-normal-solid',    'Color/Surface/NormalSolid',    'Neutral/900',           palette.neutral[900])
register('surface-normal-subtle',   'Color/Surface/NormalSubtle',   'Neutral/50',            palette.neutral[50])
register('surface-heavy-solid',     'Color/Surface/HeavySolid',     'Neutral/Black',         palette.neutral.Black)
register('surface-heavy-subtle',    'Color/Surface/HeavySubtle',    'Neutral/100',           palette.neutral[100])
register('surface-base',            'Color/Surface/Base',           'Neutral/White',         palette.neutral.White)
register('surface-primary-solid',   'Color/Surface/PrimarySolid',   'Brand/Hasamdong/500',   palette.hasamdong[500])
register('surface-primary-subtle',  'Color/Surface/PrimarySubtle',  'Brand/Hasamdong/50',    palette.hasamdong[50])
register('surface-info-solid',      'Color/Surface/InfoSolid',      'Blue/500',              palette.blue[500])
register('surface-info-subtle',     'Color/Surface/InfoSubtle',     'Blue/50',               palette.blue[50])
register('surface-success-solid',   'Color/Surface/SuccessSolid',   'Green/500',             palette.green[500])
register('surface-success-subtle',  'Color/Surface/SuccessSubtle',  'Green/50',              palette.green[50])
register('surface-error-solid',     'Color/Surface/ErrorSolid',     'Red/500',               palette.red[500])
register('surface-error-subtle',    'Color/Surface/ErrorSubtle',    'Red/50',                palette.red[50])
register('surface-caution-solid',   'Color/Surface/CautionSolid',   'Orange/500',            palette.orange[500])
register('surface-caution-subtle',  'Color/Surface/CautionSubtle',  'Orange/50',             palette.orange[50])

// Border
register('border-light',           'Color/Border/Light',          'Overlay-Black/10',      palette.overlayBlack[10])
register('border-normal',          'Color/Border/Normal',         'Overlay-Black/20',      palette.overlayBlack[20])
register('border-heavy',           'Color/Border/Heavy',          'Overlay-Black/30',      palette.overlayBlack[30])
register('border-primary-solid',   'Color/Border/PrimarySolid',   'Brand/Hasamdong/400',   palette.hasamdong[400])
register('border-primary-subtle',  'Color/Border/PrimarySubtle',  'Brand/Hasamdong/100',   palette.hasamdong[100])
register('border-info-solid',      'Color/Border/InfoSolid',      'Blue/400',              palette.blue[400])
register('border-info-subtle',     'Color/Border/InfoSubtle',     'Blue/100',              palette.blue[100])
register('border-success-solid',   'Color/Border/SuccessSolid',   'Green/400',             palette.green[400])
register('border-success-subtle',  'Color/Border/SuccessSubtle',  'Green/100',             palette.green[100])
register('border-error-solid',     'Color/Border/ErrorSolid',     'Red/400',               palette.red[400])
register('border-error-subtle',    'Color/Border/ErrorSubtle',    'Red/100',               palette.red[100])
register('border-caution-solid',   'Color/Border/CautionSolid',   'Orange/400',            palette.orange[400])
register('border-caution-subtle',  'Color/Border/CautionSubtle',  'Orange/100',            palette.orange[100])

// Dimmer
register('dimmer-strong', 'Color/Dimmer/Strong', 'Overlay-Black/100', '#000000cc')
register('dimmer-normal', 'Color/Dimmer/Normal', 'Overlay-Black/40', palette.overlayBlack[40])

// Status aliases (legacy — map to text-icon / surface / border)
register('status-info-text-icon',     'Color/Text&Icon/Info',        'Blue/700',   palette.blue[700])
register('status-info-bgsolid',       'Color/Surface/InfoSolid',     'Blue/500',   palette.blue[500])
register('status-info-bgsubtle',      'Color/Surface/InfoSubtle',    'Blue/50',    palette.blue[50])
register('status-info-bdsolid',       'Color/Border/InfoSolid',      'Blue/400',   palette.blue[400])
register('status-info-bdsubtle',      'Color/Border/InfoSubtle',     'Blue/100',   palette.blue[100])

register('status-success-text-icon',  'Color/Text&Icon/Success',     'Green/600',  palette.green[600])
register('status-success-bgsolid',    'Color/Surface/SuccessSolid',  'Green/500',  palette.green[500])
register('status-success-bgsubtle',   'Color/Surface/SuccessSubtle', 'Green/50',   palette.green[50])
register('status-success-bdsolid',    'Color/Border/SuccessSolid',   'Green/400',  palette.green[400])
register('status-success-bdsubtle',   'Color/Border/SuccessSubtle',  'Green/100',  palette.green[100])

register('status-error-text-icon',    'Color/Text&Icon/Error',       'Red/600',    palette.red[600])
register('status-error-bgsolid',      'Color/Surface/ErrorSolid',    'Red/500',    palette.red[500])
register('status-error-bgsubtle',     'Color/Surface/ErrorSubtle',   'Red/50',     palette.red[50])
register('status-error-bdsolid',      'Color/Border/ErrorSolid',     'Red/400',    palette.red[400])
register('status-error-bdsubtle',     'Color/Border/ErrorSubtle',    'Red/100',    palette.red[100])

register('status-caution-text-icon',  'Color/Text&Icon/Caution',     'Orange/600', palette.orange[600])
register('status-caution-bgsolid',    'Color/Surface/CautionSolid',  'Orange/500', palette.orange[500])
register('status-caution-bgsubtle',   'Color/Surface/CautionSubtle', 'Orange/50',  palette.orange[50])
register('status-caution-bdsolid',    'Color/Border/CautionSolid',   'Orange/400', palette.orange[400])
register('status-caution-bdsubtle',   'Color/Border/CautionSubtle',  'Orange/100', palette.orange[100])

# Color System

## Overview
This design system uses a 3-layer color structure:

1. Palette (Primitive)
2. Theme (Semantic)
3. Mode (White-label)

Colors must always be resolved through this chain:
Semantic → Palette → Hex

---

## 1. Palette (Primitive)

Palette contains raw hex color values.

### Structure
- Organized by color groups:
  - Neutral
  - Brand
  - Blue, Green, Red, etc.

- Each color has a scale:
  - 20, 50, 100 ... 950

### Example
- Neutral/0 = #FFFFFF
- Neutral/950 = #0B0C0D
- Brand/500 = primary brand color

### Rule
- Palette values are raw data only
- Never use Palette directly in components

---

## 2. Theme (Semantic)

Theme defines the meaning of colors.

### Example groups
- Text&Icon
- Background
- Border
- Status

### Example tokens
- Text&Icon/strong
- Text&Icon/normal
- BgSolid
- BgSubtle
- Border/default

### Mapping example
- Text&Icon/strong → Neutral/Black
- BgSolid → Brand/500
- Border/default → Neutral/200

### Rule
- Components must use Theme tokens
- Do not use Palette values directly
- Same hex value can have different meanings

---

## 3. Mode (White-label)

Modes allow switching brands dynamically.

### Example modes
- 하삼동
- 텐퍼센트
- 컴포즈

Each mode maps Theme tokens to different Palette values.

### Example

Same semantic token:
Text&Icon/strong

- 하삼동 → Neutral/Black
- 텐퍼센트 → Neutral/Black
- 컴포즈 → Neutral/White

### Rule
- Semantic token names must stay the same
- Only underlying Palette values change
- Do not hardcode brand-specific values

---

## Important Principles

### 1. Never flatten tokens
Do NOT convert semantic tokens directly to hex values.

Wrong:
- color: #000000

Correct:
- color: Text&Icon/strong

---

### 2. Same value ≠ same meaning

Example:
- #000000 can be:
  - Text&Icon/strong
  - Border/default

These must remain separate tokens.

---

### 3. Always resolve chain

Every color must follow:

Theme (Semantic)
→ Palette (Primitive)
→ Hex value

---

## Implementation Expectation

- Use semantic tokens in components
- Use CSS variables or token system
- Support mode switching (white-label)
- Avoid hardcoded values in component styles

## 🚨 Critical Enforcement

The following are STRICTLY FORBIDDEN:

- Using HEX values in components
- Using Palette tokens directly
- Skipping semantic tokens

If detected:
- Implementation is invalid
- Must be rejected and fixed

---

## Implementation Rule

All components MUST:

1. Use Theme tokens only
2. Never resolve to hex manually
3. Support mode switching automatically
# Typography System

## Overview
This system separates typography into:

1. Font Family (Mode-based)
2. Text Styles (Figma-defined)

Typography must follow both structure and mode.

---

## 1. Font Family (Mode-based)

This system supports multiple font families:

- Pretendard
- SUIT
- Gmarket Sans

These are NOT fixed values.
They act as modes.

### Example
- mode1 → Pretendard
- mode2 → SUIT
- mode3 → Gmarket Sans

### Rule
- Font family must be switchable
- Do not hardcode a single font
- All components must follow current font mode
- Font must be applied globally (not per component)

---

## 2. Text Styles (Figma-based)

Typography is defined using Figma Text Styles.

Each text style includes:
- font size
- font weight
- line height
- letter spacing (if applicable)

### Example
- Heading/L
- Body/M
- Label/S

### Rule
- Always use defined text styles
- Do not redefine typography inside components
- Do not guess font size or spacing

---

## 3. Structure

Typography must follow:

Text Style (size, weight, line-height)
+ Font Mode (family)

Example:

Body/M
+ mode1 (Pretendard)

---

## Important Principles

### 1. Do not hardcode font

Wrong:
- font-family: Pretendard

Correct:
- font-family: current mode font

---

### 2. Keep consistency

- Same text style must always look identical
- Do not override styles per component

---

### 3. Global control

- Font mode must be applied globally
- Changing mode should update all components

---

## Implementation Expectation

- Use text style tokens
- Apply font via mode system
- Keep typography consistent across components
- Avoid inline font definitions
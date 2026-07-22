# Spacing System

## Overview
This system uses 2 layers:

1. Palette
- raw spacing values
- examples: 0, 2, 4, 8, 12, 16, 20, 24 ...

2. Theme
- semantic spacing levels
- examples: Lv1, Lv2, Lv3 ...

Spacing must follow:
Theme → Palette → actual value

---

## Rule
- Components should use Theme spacing tokens
- Do not use raw spacing values directly in components
- Keep spacing semantic and consistent

---

## Mapping Example
- Lv1 → 4
- Lv2 → 8
- Lv3 → 12
- Lv4 → 16

---

## Special Use
- Global content horizontal padding uses spacing tokens
- Gap, padding, and layout spacing should follow the same spacing system
# Radius System

## Overview
This system uses 2 layers:

1. Palette
- raw radius values
- examples: 0, 2, 4, 8, 12, 16 ...

2. Theme
- semantic radius levels
- xs, s, ms, m, ml, l, xl

Radius must follow:
Theme → Palette → actual value

---

## Rule
- Components must use Theme radius tokens
- Do not use raw radius values directly
- Keep radius consistent across components

---

## Mapping Example
- xs → 2
- s → 4
- ms → 6
- m → 8
- ml → 10
- l → 12
- xl → 16

---

## Important
- Do not hardcode border-radius
- Use unified radius system for all components
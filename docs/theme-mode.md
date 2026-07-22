# Theme Mode System

## Overview
This system supports both light and dark modes using brand-based modes.

Modes are defined using naming convention:

- Light mode: Brand
- Dark mode: Brand (Dark)

Example:
- Hasamdong
- Hasamdong (Dark)
- TenPercent
- TenPercent (Dark)
- Compose
- Compose (Dark)

---

## Core Concept

Dark mode is NOT a separate palette.

It is a transformation of semantic tokens based on rules.

Important:
- Palette (primitive values) remains unchanged
- Only semantic tokens are transformed

---

## Transformation Rules

### Neutral Mapping

Light → Dark

- Text&Icon/Strong : Neutra/Black → Neutral/White
- Text&Icon/Normal : Neutra/950 → Neutral/White
- Text&Icon/Alternative : Neutral/700 → Neutral/200
- Text&Icon/Assistive : Neutral/500 → Neutral/400
- Text&Icon/Disabled : Neutral/300 → Neutral/600
- Text&Icon/Light : Neutral/200 → Neutral/700
- Text&Icon/Static : Neutral/White → Neutral/950
- Text&Icon/Static-sub : Neutral/100 → Neutral/800

---

### Background Mapping

- LightSubtle : Neutral/700 → Neutral/200
- NormalSubtle : Neutral/20 → Neutral/900
- HeavySubtle : Neutral/900 → Neutral/20
- LightSolid : Neutral/50 → Neutral/800
- NormalSolid : Neutral/Black → Neutral/White
- HeavySolid : Neutral/100 → Neutral/700
- Static : Neutral/White → Neutral/Black

---

### Border Mapping

- Text/Icon: 600 → 400
- Background: 50 → 950

---

### Line Mapping

- Light : #2F3133 12% → #C8CACC 16%
- Normal : #2F3133 12% → #C8CACC 32%
- Heavy : #2F3133 12% → #C8CACC 48%

---

### Primary&Error&Info&Success&Caution Mapping

- Text&Icon : {Brand}/600 → {Brand}/500
- BgSolid : {Brand}/500 → {Brand}/600
- BgSubtle : {Brand}/50 → {Brand}/950
- BdSolid : {Brand}/400 → {Brand}/500
- BdSubtle : {Brand}/100 → {Brand}/900

---

## Rules

1. Do NOT create a separate dark palette
2. Do NOT duplicate color tokens for dark mode
3. Always apply transformation rules to semantic tokens
4. Brand switching must also apply mode transformation
5. Semantic tokens can have different values depending on mode
6. 변수에 없는 브랜드 컬러는 생성하지 않는다.(hasamdong은 있으나 hasamdong(dark)가 없다면 미생성)

---

## Example

texticon/normal

- Hasamdong → Text&Icon/Alternative : Neutral/700
- Hasamdong (Dark) → Text&Icon/Alternative : Neutral/200

---

## Critical Rule

This is a transformation rule, not a separate color definition.

---

## Implementation Requirement

Dark mode transformation MUST be applied programmatically.

DO NOT:
- manually assign dark colors
- create separate dark tokens

ALWAYS:
- resolve semantic tokens
- apply transformation logic based on mode
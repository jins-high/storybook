## 🚨 CRITICAL RULES (MUST FOLLOW)

1. NEVER use HEX values in components
2. NEVER use Palette tokens directly
3. ALWAYS use Theme (Semantic tokens)

4. If a rule is violated:
   - The implementation is INVALID
   - Must be rewritten

5. DO NOT infer or invent design decisions
6. ALWAYS follow existing token system

7. If unsure:
   - DO NOT guess
   - ask or fallback to existing tokens

# Design System Guide

## Goal
Figma의 디자인 시스템을 React 코드로 구현해서,
디자이너가 먼저 확인하고 검수한 뒤 개발자에게 전달할 수 있게 한다.

---

## UI Structure

### Left Panel
디자인 시스템 리스트 영역

- 버튼 형태로 구성
- 구조:
  1. Foundations 그룹
     - Typography
     - Spacing
     - Font
     - Color
  2. Components 그룹
     - Figma에 있는 컴포넌트 목록

---

### Center Panel
디자이너 검수용 컨텐츠 영역

- 선택한 항목을 시각적으로 확인하는 영역
- Foundations:
  - 토큰 및 스타일 미리보기
- Components:
  - 실제 컴포넌트 (variant, size, state 포함)

---

### Right Panel
속성 및 코드 확인 영역

#### 상단
- Figma 컴포넌트와 동일한 구조로 제공
- 예:
  - size: large / medium / small
  - variant: primary / secondary
- 토글, 드롭다운 등으로 값 변경 가능
- 선택값이 중앙 패널에 즉시 반영되어야 함

#### 하단
- 현재 상태의 실제 코드 표시

- Components:
  - 해당 상태의 React 코드 출력

- Foundations:
  - 코드만 나열 (스타일 정의)

---

## Important rules
- Figma variables 구조를 유지한다.
- 색상, 폰트, spacing을 코드에 직접 입력하지 않는다.
- semantic token 의미를 유지한다.
- 같은 값이라도 의미가 다르면 다른 token으로 취급한다.
- React 결과물은 디자이너가 검수하기 쉽게 만든다.

---

## Variable structure
예시:
- palette(#000000) = nature/0
- Theme(strong) = Nature/Text&Icon/strong

예시:
- brand(color) = brand/500
- Theme(brand/500) = Primary/Text&Icon/Normal

폰트 예시:
- Pretendard
- SUIT
- Gmarket Sans

---

## Output style
- React 기반 미리보기 형태로 만든다.
- 3패널 구조를 반드시 유지한다.
- 디자이너 검수 중심 UI로 만든다.
- 구현 전 Figma 구조를 먼저 이해한다.

---

## Additional Docs
Read detailed system rules from:

- docs/color-system.md
- docs/component-template.md
- docs/radius.md
- docs/spacing.md
- docs/theme-mode.md
- docs/typography.md
- docs/variant-system.md
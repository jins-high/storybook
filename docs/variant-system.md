# Component Variant System

## Structure (MANDATORY)

All components MUST follow:

- variant: visual style
- size: layout size
- state: interaction state

---

## Allowed values

### variant
- primary
- secondary
- ghost
- destructive (if exists)

### size
- sm
- md
- lg

### state
- default
- hover
- active
- disabled

---

## Rules

1. DO NOT create new prop names
2. DO NOT mix meanings

❌ wrong:
- type
- kind
- appearance

3. variant ≠ state ≠ size

4. All components must follow the same structure

---

## Example

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  state?: 'default' | 'hover' | 'disabled'
}
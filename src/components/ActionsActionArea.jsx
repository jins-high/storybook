// ActionsActionArea — 모바일오더 라이브러리
// 여러 행동(Action)을 우선순위에 따라 배치하는 컴포넌트
// Props:
//   variant       : 'Vertical' | 'Horizontal'
//   combination   : 'MainOnly' | 'WithAlternative' | 'WithAssistive' | 'Cancle'
//   slot          : boolean (슬롯 영역 표시)
//   children      : ReactNode (슬롯 컨텐츠)

import { Button } from './Button.jsx'
import { TextButton } from './TextButton.jsx'

export function ActionsActionArea({
  variant = 'Vertical',
  combination = 'MainOnly',
  slot = false,
  children = null,
  className = '',
}) {
  const isVertical = variant === 'Vertical'

  // ── Container Style ────────────────────────
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-400)',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  }

  // ── Buttons Container Style ────────────────────────
  const buttonsContainerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    gap: 'var(--spacing-400)',
    width: '100%',
    alignItems: isVertical ? 'stretch' : 'center',
  }

  return (
    <div style={containerStyle} className={className}>
      {/* Slot Content */}
      {slot && (
        <div
          style={{
            height: '133px',
            width: '100%',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {children}
        </div>
      )}

      {/* Buttons Container */}
      <div style={buttonsContainerStyle}>
        {/* Combination: MainOnly */}
        {combination === 'MainOnly' && (
          <Button
            variant="solid"
            color="primary"
            size="md"
            hasLabel={true}
            label="Main Action"
          />
        )}

        {/* Combination: WithAlternative */}
        {combination === 'WithAlternative' && (
          <>
            {/* Main Action on top (Vertical) or left (Horizontal) */}
            <Button
              variant="solid"
              color="primary"
              size="md"
              hasLabel={true}
              label="Main Action"
              style={isVertical ? {} : { flex: '1 0 0' }}
            />
            {/* Alternative on bottom (Vertical) or right (Horizontal) */}
            <Button
              variant="outline"
              color="primary"
              size="md"
              hasLabel={true}
              label="Alternative"
              style={isVertical ? {} : { flex: '1 0 0' }}
            />
          </>
        )}

        {/* Combination: WithAssistive */}
        {combination === 'WithAssistive' && (
          <>
            {isVertical ? (
              <>
                <Button
                  variant="solid"
                  color="primary"
                  size="md"
                  hasLabel={true}
                  label="Main Action"
                />
                <TextButton
                  size="sm"
                  color="assistive"
                  hasLeadingIcon={false}
                  hasTrailingIcon={false}
                  state="default"
                  label="Assistive"
                />
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  color="assistive"
                  size="md"
                  hasLabel={true}
                  label="Assistive"
                  style={{ flex: '1 0 0' }}
                />
                <Button
                  variant="solid"
                  color="primary"
                  size="md"
                  hasLabel={true}
                  label="Main Action"
                  style={{ flex: '1 0 0' }}
                />
              </>
            )}
          </>
        )}

        {/* Combination: Cancle */}
        {combination === 'Cancle' && (
          <Button
            variant="outline"
            color="assistive"
            size="md"
            hasLabel={true}
            label="Cancel"
            style={isVertical ? {} : { flex: '1 0 0' }}
          />
        )}
      </div>
    </div>
  )
}

// ── Static metadata ────────────────────────────────
ActionsActionArea.variants = ['Vertical', 'Horizontal']
ActionsActionArea.combinations = ['MainOnly', 'WithAlternative', 'WithAssistive', 'Cancle']

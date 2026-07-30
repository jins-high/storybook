// Title — 모바일오더 라이브러리 / Figma node 100:8282
// 섹션 또는 콘텐츠 영역 제목 컴포넌트
// Props: hierarchy, text, hasRequired, hasButton, buttonLabel, onButtonClick
import { IconArrowRight } from '../icons/icons.jsx'

export function Title({
  hierarchy     = 'Primary',
  text          = '제목',
  hasRequired   = false,
  hasButton     = false,
  buttonLabel   = '버튼명',
  onButtonClick = () => {},
}) {
  const isPrimary = hierarchy === 'Primary'

  return (
    <div
      data-inspect="Title"
      style={{
        display:    'flex',
        alignItems: 'flex-start',
        gap:        'var(--spacing-400)',
        width:      '100%',
      }}
    >
      {/* Text + Required badge */}
      <div style={{
        display:    'flex',
        flex:       '1 0 0',
        gap:        'var(--spacing-300)',
        alignItems: 'center',
        minWidth:   0,
        alignSelf:  'stretch',
      }}>
        <span style={{
          fontSize:      isPrimary ? '20px' : '16px',
          fontWeight:    500,
          lineHeight:    isPrimary ? 1.3 : 1.35,
          letterSpacing: '-0.25px',
          color:         'var(--text-icon-normal)',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          whiteSpace:    'nowrap',
          flexShrink:    0,
        }}>
          {text}
        </span>

        {hasRequired && (
          <div style={{
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            height:          '20px',
            padding:         '0 var(--spacing-300)',
            borderRadius:    'var(--radius-default-circle)',
            backgroundColor: 'var(--surface-error-subtle)',
            flexShrink:      0,
          }}>
            <span style={{
              fontSize:      '11px',
              fontWeight:    500,
              lineHeight:    1.35,
              letterSpacing: '-0.25px',
              color:         'var(--text-icon-error)',
              whiteSpace:    'nowrap',
            }}>
              필수
            </span>
          </div>
        )}
      </div>

      {/* Right button */}
      {hasButton && (
        <button
          onClick={onButtonClick}
          style={{
            display:         'flex',
            alignItems:      'center',
            gap:             'var(--spacing-200)',
            height:          '20px',
            padding:         '0 var(--spacing-300)',
            borderRadius:    'var(--radius-default-200)',
            border:          'none',
            backgroundColor: 'transparent',
            cursor:          'pointer',
            flexShrink:      0,
          }}
        >
          <span style={{
            fontSize:      '14px',
            fontWeight:    500,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         'var(--text-icon-assistive)',
            whiteSpace:    'nowrap',
            fontFamily:    'inherit',
          }}>
            {buttonLabel}
          </span>
          <IconArrowRight style={{ width: 16, height: 16, color: 'var(--text-icon-assistive)', flexShrink: 0 }} />
        </button>
      )}
    </div>
  )
}

Title.hierarchies = ['Primary', 'Secondary']

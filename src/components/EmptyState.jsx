// EmptyState — 모바일오더 라이브러리 / Figma node 2029-6579
// 페이지 main-contents가 empty 상태일 때 노출하는 컴포넌트 (FeedbackContent)
// Props:
//   image         : 'empty-state' | 'empty-wallet' | 'empty-notification'
//   title         : string
//   description   : string (optional)
//   combination   : 'None' | 'MainOnly' | 'WithAlternative' | 'WithAssistive'
//   mainLabel     : string
//   altLabel      : string (WithAlternative / WithAssistive)
//   assistiveLabel: string (WithAssistive)
//   onMainAction / onAltAction / onAssistiveAction : function

import { Button }     from './Button'
import { TextButton } from './TextButton'

const BASE = import.meta.env.BASE_URL

const IMAGE_SRC = {
  'empty-state':        BASE + 'assets/emptyState/empty-state.png',
  'empty-wallet':       BASE + 'assets/emptyState/empty-wallet.png',
  'empty-notification': BASE + 'assets/emptyState/empty-notification.png',
  'empty-cart':         BASE + 'assets/emptyState/empty-cart.png',
  'empty-document':     BASE + 'assets/emptyState/empty-document.png',
}

export function EmptyState({
  image            = 'empty-state',
  title            = '',
  description      = '',
  combination      = 'None',
  mainLabel        = '확인',
  altLabel         = '취소',
  assistiveLabel   = '다음에 하기',
  onMainAction     = () => {},
  onAltAction      = () => {},
  onAssistiveAction = () => {},
}) {
  const src = IMAGE_SRC[image] ?? IMAGE_SRC['empty-state']
  const showActions = combination !== 'None'

  return (
    <div
      data-inspect="EmptyState"
      style={{
        width:          '100%',
        padding:        'var(--spacing-container-padding, 24px)',
        boxSizing:      'border-box',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            'var(--spacing-700, 24px)',
      }}
    >
      {/* Image — 3:2 ratio */}
      <img
        src={src}
        alt={image}
        draggable={false}
        style={{
          width:       '100%',
          maxWidth:    '320px',
          aspectRatio: '3 / 2',
          objectFit:   'contain',
          display:     'block',
        }}
      />

      {/* Text */}
      <div style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            'var(--spacing-300, 8px)',
        width:          '100%',
      }}>
        <p style={{
          margin:        0,
          fontSize:      '18px',
          fontWeight:    500,
          lineHeight:    1.35,
          letterSpacing: '-0.25px',
          color:         'var(--text-icon-normal)',
          textAlign:     'center',
        }}>
          {title}
        </p>
        {description && (
          <p style={{
            margin:        0,
            fontSize:      '15px',
            fontWeight:    400,
            lineHeight:    1.35,
            letterSpacing: '-0.25px',
            color:         'var(--text-icon-alternative)',
            textAlign:     'center',
          }}>
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          width:         '100%',
          gap:           '12px',
        }}>
          <Button
            variant="solid"
            color="primary"
            size="md"
            hasLabel
            label={mainLabel}
            onClick={onMainAction}
            style={{ width: '100%' }}
          />
          {(combination === 'WithAlternative' || combination === 'WithAssistive') && (
            <Button
              variant="outline"
              color="primary"
              size="md"
              hasLabel
              label={altLabel}
              onClick={onAltAction}
              style={{ width: '100%' }}
            />
          )}
          {combination === 'WithAssistive' && (
            <TextButton
              size="md"
              color="primary"
              hasLabel
              label={assistiveLabel}
              onClick={onAssistiveAction}
            />
          )}
        </div>
      )}
    </div>
  )
}

EmptyState.images      = ['empty-state', 'empty-wallet', 'empty-notification', 'empty-cart', 'empty-document']
EmptyState.combinations = ['None', 'MainOnly', 'WithAlternative', 'WithAssistive']

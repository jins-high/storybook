import { useState, useEffect } from 'react'
import { LeftPanel }   from './preview/LeftPanel.jsx'
import { CenterPanel } from './preview/CenterPanel.jsx'
import { RightPanel }  from './preview/RightPanel.jsx'
import { modes }       from './tokens/theme.js'
import { Chip }        from './components/Chip.jsx'

const defaultControls = {
  Button: {
    variant:        'solid',
    color:          'primary',
    size:           'md',
    hasLeadingIcon:  false,
    hasLabel:        true,
    hasTrailingIcon: false,
    state:          'default',
    label:          '버튼명',
    ariaLabel:      '',
    iconName:       'IconChevronRight',
  },
  IconButton: {
    variant:  'solid',
    size:     'md',
    state:    'default',
    iconName: 'IconChevronRight',
  },
  TextButton: {
    size:           'md',
    color:          'primary',
    hasLeadingIcon:  false,
    hasTrailingIcon: false,
    state:          'default',
    label:          '텍스트버튼',
    iconName:       'IconChevronRight',
  },
  ActionsActionArea: {
    variant:        'Vertical',
    combination:    'MainOnly',
    slot:           false,
  },
  Chip: {
    variant:        'outline',
    size:           'md',
    state:          'default',
    hasLeadingIcon: false,
    hasTrailingIcon: false,
    label:          'Chip',
  },
  Tab: {
    size: 'md',
    tabs: [
      { id: 'tab-1',  label: '카테고리 탭', enabled: true, state: 'active' },
      { id: 'tab-2',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-3',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-4',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-5',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-6',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-7',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-8',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-9',  label: '카테고리 탭', enabled: true, state: 'default' },
      { id: 'tab-10', label: '카테고리 탭', enabled: true, state: 'default' },
    ],
  },
  Snackbar: {
    message: '스낵바 메시지입니다.',
  },
  Tooltip: {
    placement: 'top',
    align: 'center',
    text: '도움말 텍스트입니다.',
    visible: false,
  },
  Checkbox: {
    state: 'Unchecked',
    size: 'Medium',
    style: 'Default',
  },
  CheckboxInput: {
    state: 'Unchecked',
    size: 'Medium',
    label: '텍스트',
  },
  Radio: {
    state: 'Unselected',
    size: 'Medium',
    style: 'Default',
  },
  RadioInput: {
    state: 'Unselected',
    size: 'Medium',
    label: '텍스트',
  },
  Checkmark: {
    state: 'Checked',
    size: 'Medium',
    style: 'Default',
  },
  CheckmarkInput: {
    state: 'Checked',
    size: 'Medium',
    label: '텍스트',
  },
  EmptyState: {
    image:          'empty-state',
    title:          '검색 결과가 없어요.',
    description:    '다른 키워드로 검색해보세요.',
    combination:    'None',
    mainLabel:      '확인',
    altLabel:       '취소',
    assistiveLabel: '다음에 하기',
  },
  MembershipChip: {
    showIcon:  true,
    iconName:  'IconStamp',
    text:      '스탬프',
    number:    '8',
    numberMax: true,
    max:       '10',
  },
  MicroBadge: {
    style: 'YellowSolid',
    size:  'Small',
    label: '텍스트',
  },
  Title: {
    hierarchy:             'Primary',
    text:                  '섹션 타이틀',
    hasRequired:           false,
    hasButton:             false,
    buttonLabel:           '버튼명',
    buttonHasLeadingIcon:  false,
    buttonHasTrailingIcon: true,
    buttonIconName:        'IconArrowRight',
  },
  Filter: {
    hasLabel: true,
    label:    '검색기간',
    value:    '최근 1개월',
  },
  RankLabel: {
    tier: 'Bronze',
  },
  Stepper: {
    count: 1,
    min:   1,
    max:   10,
  },
  OptionList: {
    optionName: '샷 추가',
    price:      '500원',
    hasPrice:   true,
    hasStepper: false,
    selected:   true,
    count:      1,
  },
  TemperatureDisplay: {
    type: 'ICED',
  },
  OrderStateDisplay: {
    type: '접수대기',
  },
  OrderHistoryList: {
    imageSrc:    'bigpose-americano-decaf-yabangcha.png',
    productName: '아메리카노',
    orderState:  '접수대기',
    storeName:   '문래점',
    price:       '13,500원',
    date:        '2026.11.18 13:12',
  },
  CartItem: {
    checked:      true,
    imageSrc:     'berry-full-strawberry-latte.png',
    productName:  '딸기라떼',
    state:        'Default',
    temperature:  'ICED',
    basePrice:    '3,500원',
    hasOption1:   true,
    option1Name:  '얼음 추가',
    option1Price: '무료',
    hasOption2:   true,
    option2Name:  '휘핑 크림 추가x2',
    option2Price: '2,000원',
    hasOption3:   true,
    option3Name:  '우유 추가x1',
    option3Price: '500원',
    count:        1,
    totalPrice:   '4,000원',
  },
  ReorderCard: {
    status:      'Default',
    productName: '리얼 초코 자바칩 프라푸치노',
    storeName:   '문래SK v1점',
    imageSrc:    'green-tea-frappe.png',
  },
  CardList: {
    display:        'ManageDefault',
    bankName:       '현대',
    bankSummary:    '현대카드 (4852)',
    cardLogoSrc:    'hyudai.png',
    firstFour:      '1234',
    lastFour:       '1234',
    representative: true,
    selected:       false,
  },
  MyPageButton: {
    display:    'Horizontal',
    buttonName: '계정 설정',
    iconName:   'ProfileSetting',
  },
  GiftCoupon: {
    display:         'ListAvailable',
    couponName:      '빅포즈 아이스 아메리카노',
    date:            '2026.11.18까지',
    senderName:      '고윤정',
    description:     true,
    descriptionText: '사용가능 금액 4,000원',
    dImmed:          false,
    giftCardSrc:     'gift-card-5000.png',
  },
  CouponList: {
    displayType: 'ListAvailable',
    value:       '4,000원 할인',
    couponName:  '영상류 단품 쿠폰',
    date:        '2024.11.01 ~ 2025.10.30',
    checked:     false,
  },
  ProductList: {
    display:      'Horizontal',
    productName:  '아메리카노',
    price:        '1,800원',
    state:        'Default',
    hasNewBadge:  false,
    hasBestBadge: false,
    hasHashTag:   true,
    hashtags:     ['#저당', '#저칼로리'],
    imageSrc:     'bigpose-americano-decaf-yabangcha.png',
  },
  StoreSelector: {
    type:            'BottomFixed',
    hasSelectedStore: false,
    storeName:       '신사점',
    subtitle:        '500m, 테이크 아웃',
    badge:           false,
  },
  StoreList: {
    style:           'Default',
    storeName:       '크럭스점',
    distance:        '8.18km',
    address:         '서울 강서구 마곡대로 125번길 88, 1002호',
    businessHour:    '08:00 ~ 21:30',
    emptyMessage:    '내용을 입력해 주세요.',
    hasEmptyMessage: true,
  },
  OrderStatusCard: {
    display:      'Default',
    status:       'Pending',
    orderNumber:  '808',
    storeName:    '문래힐스테이트점',
    orderType:    '테이크아웃',
    items:        '그린티프라페 외 1종',
    rejectReason: '재료소진',
    pendingTime:  '11:12',
    productImage: 'green-tea-frappe',
  },
  TextField: {
    state:          'Default',
    hasLabel:       true,
    labelText:      '아이디',
    hasLeadingIcon: false,
    hasPlaceholder: true,
    placeholderText:'입력해주세요',
    value:          '',
    hasTrailingIcon:    false,
    hasTrailingButton:  false,
    hasCount:       false,
    maxCount:       12,
    hasHelperText:  false,
    helperText:     '도움말 텍스트입니다.',
  },
}

const STORAGE_PAGE  = 'ds-selected-item'
const STORAGE_BRAND = 'ds-brand-mode'

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState(() => readStorage(STORAGE_PAGE,  { type: 'component', name: 'Button' }))
  const [controls, setControls]         = useState(defaultControls)
  const [brandMode, setBrandMode]       = useState(() => readStorage(STORAGE_BRAND, 'compose-light'))
  const [inspectedEl, setInspectedEl]   = useState(null)

  useEffect(() => { localStorage.setItem(STORAGE_PAGE,  JSON.stringify(selectedItem)) }, [selectedItem])
  useEffect(() => { localStorage.setItem(STORAGE_BRAND, JSON.stringify(brandMode))    }, [brandMode])

  const activeMode = modes[brandMode]
  const fontMode   = activeMode?.font ?? 'pretendard'

  const handleControlChange = (componentName, newControls) => {
    setControls(prev => ({ ...prev, [componentName]: newControls }))
  }

  return (
    <div
      className="app-shell"
      data-brand-mode={brandMode}
      data-font-mode={fontMode === 'pretendard' ? undefined : fontMode}
    >
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo">📖</div>
          <span className="header-title">MOWLB Story Book</span>
        </div>

        <div className="header-right">
          {/* Brand mode — 3 modes matching Figma variable collection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-icon-assistive)', fontWeight: 500 }}>Brand</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['compose-light', 'compose-dark', 'tenpercent'].map(key => (
                <Chip
                  key={key}
                  variant="outline"
                  size="md"
                  state={brandMode === key ? 'active' : 'default'}
                  label={modes[key].name}
                  onClick={() => setBrandMode(key)}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="panels">
        <LeftPanel
          selectedItem={selectedItem}
          onSelect={setSelectedItem}
        />
        <CenterPanel
          selectedItem={selectedItem}
          controls={controls}
          onInspect={setInspectedEl}
        />
        <RightPanel
          selectedItem={selectedItem}
          controls={controls}
          onChange={handleControlChange}
          inspectedEl={inspectedEl}
          onClearInspect={() => setInspectedEl(null)}
        />
      </div>
    </div>
  )
}

import { useState } from 'react'

const FOUNDATIONS = [
  { id: 'Color',      label: 'Color',       icon: '◑' },
  { id: 'Typography', label: 'Typography',  icon: 'Aa' },
  { id: 'Spacing',    label: 'Spacing',     icon: '↔' },
  { id: 'Font',       label: 'Font',        icon: 'T' },
  { id: 'Icons',         label: 'Icons',         icon: '✦' },
  { id: 'GraphicIcons', label: 'Graphic Icons', icon: '🎨' },
]

const COMPONENTS = [
  { id: 'Button',           label: 'Button',            icon: '⬡' },
  { id: 'IconButton',       label: 'Icon Button',       icon: '⊙' },
  { id: 'TextButton',       label: 'Text Button',       icon: '⊕' },
  { id: 'ActionsActionArea', label: 'Actions Area',      icon: '⧉' },
  { id: 'Chip',             label: 'Chip',              icon: '●' },
  { id: 'Tab',              label: 'Tab',               icon: '≡' },
  { id: 'Snackbar',         label: 'Snackbar',          icon: '⌬' },
  { id: 'Tooltip',          label: 'Tooltip',           icon: '💬' },
  { id: 'Checkbox',         label: 'Checkbox',          icon: '☑' },
  { id: 'CheckboxInput',    label: 'Checkbox Input',    icon: '☑' },
  { id: 'Radio',            label: 'Radio',             icon: '◉' },
  { id: 'RadioInput',       label: 'Radio Input',       icon: '◉' },
  { id: 'Checkmark',         label: 'Checkmark',         icon: '✓' },
  { id: 'CheckmarkInput',    label: 'Checkmark Input',   icon: '✓' },
]

const COMPOSE_COMPONENTS = [
  { id: 'EmptyState',        label: 'Empty State',          icon: '◻' },
  { id: 'TextField',         label: 'Text Field',           icon: '⌨' },
  { id: 'Title',             label: 'Title',                icon: 'T₁' },
  { id: 'MicroBadge',        label: 'Micro Badge',          icon: '◈' },
  { id: 'MembershipChip',    label: 'Membership Chip',      icon: '🪪' },
  { id: 'Filter',            label: 'Filter',               icon: '⊟' },
  { id: 'RankLabel',         label: 'Rank Label',           icon: '🏅' },
  { id: 'OrderStatusCard',   label: 'Order Status Card',    icon: '📦' },
  { id: 'StoreList',         label: 'Store List',           icon: '🏪' },
  { id: 'StoreSelector',     label: 'Store Selector',       icon: '📍' },
  { id: 'Stepper',           label: 'Stepper',              icon: '±' },
  { id: 'OptionList',        label: 'Option List',          icon: '☑' },
  { id: 'ProductList',       label: 'Product List',         icon: '🛍' },
  { id: 'ReorderCard',       label: 'Reorder Card',         icon: '🔄' },
  { id: 'TemperatureDisplay', label: 'Temperature Display', icon: '🌡' },
  { id: 'CartItem',          label: 'Cart Item',            icon: '🛒' },
  { id: 'OrderStateDisplay', label: 'Order State Display',  icon: '📋' },
  { id: 'OrderHistoryList',  label: 'Order History List',   icon: '🧾' },
  { id: 'CouponList',        label: 'Coupon List',          icon: '🎟' },
  { id: 'CardList',          label: 'Card List',            icon: '💳' },
  { id: 'GiftCoupon',        label: 'Gift Coupon',          icon: '🎁' },
  { id: 'MyPageButton',      label: 'My Page Button',       icon: '👤' },
]

const COMPOSE_GRAPHICS = [
  { ratio: '2.5:4', items: [
    { id: 'americono',   label: 'americono'   },
    { id: 'coldbrew',    label: 'coldbrew'    },
    { id: 'plainyogurt', label: 'plainyogurt' },
    { id: 'strawberry',  label: 'strawberry'  },
  ]},
  { ratio: '1:1', items: [
    { id: 'v-set',               label: 'v-set'               },
    { id: 'bear-a-set',          label: 'bear-a-set'          },
    { id: 'bear-b-set',          label: 'bear-b-set'          },
    { id: 'storeProfile/fallback', label: 'storeProfile/fallback' },
    { id: 'storeProfile/store-1',  label: 'storeProfile/store-1'  },
  ]},
  { ratio: '3:2 · Empty State', items: [
    { id: 'emptyState/empty-state',        label: 'empty-state'        },
    { id: 'emptyState/empty-wallet',       label: 'empty-wallet'       },
    { id: 'emptyState/empty-notification', label: 'empty-notification' },
  ]},
  { ratio: '1:1 · Stamp', items: [
    { id: 'stampState/stamp-active', label: 'stamp-active' },
    { id: 'stampState/stamp-1',      label: 'stamp-1'      },
    { id: 'stampState/stamp-2',      label: 'stamp-2'      },
    { id: 'stampState/stamp-3',      label: 'stamp-3'      },
    { id: 'stampState/stamp-4',      label: 'stamp-4'      },
    { id: 'stampState/stamp-5',      label: 'stamp-5'      },
    { id: 'stampState/stamp-6',      label: 'stamp-6'      },
    { id: 'stampState/stamp-7',      label: 'stamp-7'      },
    { id: 'stampState/stamp-8',      label: 'stamp-8'      },
    { id: 'stampState/stamp-9',      label: 'stamp-9'      },
    { id: 'stampState/stamp-10',     label: 'stamp-10'     },
  ]},
  { ratio: '1:1 · Rank Badge', items: [
    { id: 'rankBadge/bronze-tier',  label: 'bronze-tier'  },
    { id: 'rankBadge/silver-tier',  label: 'silver-tier'  },
    { id: 'rankBadge/gold-tier',    label: 'gold-tier'    },
    { id: 'rankBadge/diamond-tier', label: 'diamond-tier' },
  ]},
  { ratio: '1:1 · Card Logo', items: [
    { id: 'cardLogo/fallback-card', label: 'fallback-card' },
    { id: 'cardLogo/hana',          label: 'hana'          },
    { id: 'cardLogo/hyudai',        label: 'hyudai'        },
    { id: 'cardLogo/samsung',       label: 'samsung'       },
    { id: 'cardLogo/shinhan',       label: 'shinhan'       },
    { id: 'cardLogo/kb',            label: 'kb'            },
    { id: 'cardLogo/bc',            label: 'bc'            },
    { id: 'cardLogo/wori',          label: 'wori'          },
    { id: 'cardLogo/nonghyup',      label: 'nonghyup'      },
    { id: 'cardLogo/lotte',         label: 'lotte'         },
  ]},
  { ratio: '1:1 · Product', items: [
    { id: 'product/iced-honey-americano',                   label: 'iced-honey-americano'                   },
    { id: 'product/iced-dolce-latte-decaf',                 label: 'iced-dolce-latte-decaf'                 },
    { id: 'product/dalgona-latte',                          label: 'dalgona-latte'                          },
    { id: 'product/green-tea-frappe',                       label: 'green-tea-frappe'                       },
    { id: 'product/real-choco-javachip-frappe',             label: 'real-choco-javachip-frappe'             },
    { id: 'product/mocha-javachip-frappe',                  label: 'mocha-javachip-frappe'                  },
    { id: 'product/strawberry-salty-caramel-frappe',        label: 'strawberry-salty-caramel-frappe'        },
    { id: 'product/strawberry-cheesecake-smoothie',         label: 'strawberry-cheesecake-smoothie'         },
    { id: 'product/strawberry-chocolate-latte',             label: 'strawberry-chocolate-latte'             },
    { id: 'product/strawberry-smoothie',                    label: 'strawberry-smoothie'                    },
    { id: 'product/strawberry-yogurt-smoothie',             label: 'strawberry-yogurt-smoothie'             },
    { id: 'product/strawberry-juice',                       label: 'strawberry-juice'                       },
    { id: 'product/lemonade',                               label: 'lemonade'                               },
    { id: 'product/blue-lemonade',                          label: 'blue-lemonade'                          },
    { id: 'product/mango-smoothie',                         label: 'mango-smoothie'                         },
    { id: 'product/mango-ade',                              label: 'mango-ade'                              },
    { id: 'product/mango-yogurt-smoothie',                  label: 'mango-yogurt-smoothie'                  },
    { id: 'product/peach-juice',                            label: 'peach-juice'                            },
    { id: 'product/blueberry-smoothie',                     label: 'blueberry-smoothie'                     },
    { id: 'product/blueberry-yogurt-smoothie',              label: 'blueberry-yogurt-smoothie'              },
    { id: 'product/berry-full-strawberry-latte',            label: 'berry-full-strawberry-latte'            },
    { id: 'product/berry-full-strawberry-juice',            label: 'berry-full-strawberry-juice'            },
    { id: 'product/honey-tomato-juice',                     label: 'honey-tomato-juice'                     },
    { id: 'product/shine-muscat-kale-juice',                label: 'shine-muscat-kale-juice'                },
    { id: 'product/yabangcha',                              label: 'yabangcha'                              },
    { id: 'product/raw-chocolate-latte',                    label: 'raw-chocolate-latte'                    },
    { id: 'product/bigpose-dolce-latte',                    label: 'bigpose-dolce-latte'                    },
    { id: 'product/bigpose-yabangcha',                      label: 'bigpose-yabangcha'                      },
    { id: 'product/bigpose-americano-decaf-yabangcha',      label: 'bigpose-americano-decaf-yabangcha'      },
    { id: 'product/bigpose-iced-tea-decaf-zero-sugar',      label: 'bigpose-iced-tea-decaf-zero-sugar'      },
    { id: 'product/bigpose-iced-tea',                       label: 'bigpose-iced-tea'                       },
    { id: 'product/bigpose-cafe-latte-vanilla-hazelnut-decaf', label: 'bigpose-cafe-latte-vanilla-hazelnut-decaf' },
    { id: 'product/bigpose-soltied-cool-lychee',            label: 'bigpose-soltied-cool-lychee'            },
    { id: 'product/bigpose-soltied-cool-lychee-disposable', label: 'bigpose-soltied-cool-lychee-disposable' },
    { id: 'product/hot-honey-americano',                    label: 'hot-honey-americano'                    },
    { id: 'product/hot-grain-latte',                        label: 'hot-grain-latte'                        },
    { id: 'product/hot-sweet-potato-latte',                 label: 'hot-sweet-potato-latte'                 },
    { id: 'product/hot-green-tea-latte',                    label: 'hot-green-tea-latte'                    },
    { id: 'product/hot-all-day-oat',                        label: 'hot-all-day-oat'                        },
    { id: 'product/hot-all-day-oat-disposable',             label: 'hot-all-day-oat-disposable'             },
    { id: 'product/icecream-latte',                         label: 'icecream-latte'                         },
    { id: 'product/icecream-mocha',                         label: 'icecream-mocha'                         },
    { id: 'product/icecream-javachip',                      label: 'icecream-javachip'                      },
    { id: 'product/icecream-choco-strawberry',              label: 'icecream-choco-strawberry'              },
    { id: 'product/condensed-milk-shaved-ice',              label: 'condensed-milk-shaved-ice'              },
    { id: 'product/condensed-milk-shaved-ice-disposable',   label: 'condensed-milk-shaved-ice-disposable'   },
    { id: 'product/injeolmi-cup-bing',                      label: 'injeolmi-cup-bing'                      },
    { id: 'product/dessert-potato-bread',                   label: 'dessert-potato-bread'                   },
    { id: 'product/dessert-redvelvet-cake',                 label: 'dessert-redvelvet-cake'                 },
    { id: 'product/dessert-blackvelvet-cake',               label: 'dessert-blackvelvet-cake'               },
    { id: 'product/dessert-salt-bread',                     label: 'dessert-salt-bread'                     },
    { id: 'product/dessert-cream-mini-fishbread',           label: 'dessert-cream-mini-fishbread'           },
    { id: 'product/dessert-cinnamon-cronut',                label: 'dessert-cinnamon-cronut'                },
    { id: 'product/gift-card-5000',                         label: 'gift-card-5000'                         },
    { id: 'product/gift-card-10000',                        label: 'gift-card-10000'                        },
    { id: 'product/gift-card-20000',                        label: 'gift-card-20000'                        },
    { id: 'product/gift-card-30000',                        label: 'gift-card-30000'                        },
    { id: 'product/gift-card-50000',                        label: 'gift-card-50000'                        },
    { id: 'product/fallback-product',                       label: 'fallback-product'                       },
  ]},
]

export function LeftPanel({ selectedItem, onSelect }) {
  const [composeOpen, setComposeOpen] = useState({ foundations: true, wlComponents: true, components: true, graphics: false })

  const isSelected = (type, id) =>
    selectedItem?.type === type && selectedItem?.name === id

  const toggle = (key) =>
    setComposeOpen(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <aside style={panelStyle}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* White Label section */}
        <div style={sectionStyle}>
          <div style={{ ...sectionLabelStyle, color: '#818CF8' }}>WHITE LABEL</div>

          {/* Foundations accordion */}
          <button style={accordionHeaderStyle} onClick={() => toggle('foundations')}>
            <span style={{ fontSize: '10px', opacity: 0.6 }}>{composeOpen.foundations ? '▾' : '▸'}</span>
            <span>Foundations</span>
          </button>
          {composeOpen.foundations && (
            <div style={accordionBodyStyle}>
              {FOUNDATIONS.map(item => (
                <button
                  key={item.id}
                  style={navItemStyle(isSelected('foundation', item.id))}
                  onClick={() => onSelect({ type: 'foundation', name: item.id })}
                >
                  <span style={navIconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Components accordion */}
          <button style={accordionHeaderStyle} onClick={() => toggle('wlComponents')}>
            <span style={{ fontSize: '10px', opacity: 0.6 }}>{composeOpen.wlComponents ? '▾' : '▸'}</span>
            <span>Components</span>
          </button>
          {composeOpen.wlComponents && (
            <div style={accordionBodyStyle}>
              {COMPONENTS.map(item => (
                <button
                  key={item.id}
                  style={navItemStyle(isSelected('component', item.id))}
                  onClick={() => onSelect({ type: 'component', name: item.id })}
                >
                  <span style={navIconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compose section */}
        <div style={sectionStyle}>
          <div style={{ ...sectionLabelStyle, color: '#92773A' }}>COMPOSE</div>

          {/* Components accordion */}
          <button style={accordionHeaderStyle} onClick={() => toggle('components')}>
            <span style={{ fontSize: '10px', opacity: 0.6 }}>{composeOpen.components ? '▾' : '▸'}</span>
            <span>Components</span>
          </button>
          {composeOpen.components && (
            <div style={accordionBodyStyle}>
              {COMPOSE_COMPONENTS.map(item => (
                <button
                  key={item.id}
                  style={navItemStyle(isSelected('component', item.id))}
                  onClick={() => onSelect({ type: 'component', name: item.id })}
                >
                  <span style={navIconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Graphics accordion */}
          <button style={accordionHeaderStyle} onClick={() => toggle('graphics')}>
            <span style={{ fontSize: '10px', opacity: 0.6 }}>{composeOpen.graphics ? '▾' : '▸'}</span>
            <span>Graphics</span>
          </button>
          {composeOpen.graphics && (
            <div style={accordionBodyStyle}>
              {COMPOSE_GRAPHICS.map(({ ratio, items }) => (
                <div key={ratio}>
                  <div style={ratioLabelStyle}>{ratio}</div>
                  {items.map(item => (
                    <button
                      key={item.id}
                      style={navItemStyle(isSelected('graphic', item.id))}
                      onClick={() => onSelect({ type: 'graphic', name: item.id })}
                    >
                      <span style={navIconStyle}>▪</span>
                      <span style={{ fontSize: '12px' }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <div style={{ fontSize: '11px', color: '#374151' }}>Figma variable structure</div>
        <div style={{ fontSize: '11px', color: '#1F2937', marginTop: '4px' }}>
          palette → theme → component
        </div>
      </div>
    </aside>
  )
}

// ── Styles ─────────────────────────────────────────────────

const panelStyle = {
  width:           '220px',
  minWidth:        '220px',
  height:          '100%',
  backgroundColor: '#111318',
  display:         'flex',
  flexDirection:   'column',
  borderRight:     '1px solid #1E2028',
  overflow:        'hidden',
}

const headerStyle = {
  display:       'flex',
  alignItems:    'center',
  gap:           '10px',
  padding:       '18px 16px',
  borderBottom:  '1px solid #1E2028',
  flexShrink:    0,
}

const logoStyle = {
  width:           '32px',
  height:          '32px',
  borderRadius:    '8px',
  background:      'linear-gradient(135deg, #6366F1, #4338CA)',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  fontSize:        '12px',
  fontWeight:      700,
  color:           '#FFFFFF',
  flexShrink:      0,
}

const sectionStyle = {
  padding:       '16px 10px 8px',
}

const sectionLabelStyle = {
  fontSize:      '10px',
  fontWeight:    600,
  color:         '#4B5563',
  letterSpacing: '0.08em',
  paddingLeft:   '6px',
  marginBottom:  '6px',
}

const accordionHeaderStyle = {
  display:         'flex',
  alignItems:      'center',
  gap:             '6px',
  width:           '100%',
  padding:         '6px 8px',
  borderRadius:    '6px',
  border:          'none',
  backgroundColor: 'transparent',
  color:           '#6B7280',
  fontSize:        '12px',
  fontWeight:      500,
  cursor:          'pointer',
  textAlign:       'left',
  fontFamily:      'inherit',
  letterSpacing:   '0.02em',
}

const accordionBodyStyle = {
  paddingLeft: '8px',
}

const ratioLabelStyle = {
  fontSize:      '10px',
  fontWeight:    600,
  color:         '#4B5563',
  letterSpacing: '0.06em',
  padding:       '6px 8px 2px',
}

const navIconStyle = {
  width:          '18px',
  fontSize:       '12px',
  textAlign:      'center',
  display:        'inline-block',
  flexShrink:     0,
  color:          'inherit',
  opacity:        0.8,
}

const navItemStyle = (active) => ({
  display:         'flex',
  alignItems:      'center',
  gap:             '8px',
  width:           '100%',
  padding:         '7px 8px',
  borderRadius:    '6px',
  border:          'none',
  backgroundColor: active ? '#1E2340' : 'transparent',
  color:           active ? '#818CF8' : '#9CA3AF',
  fontSize:        '13px',
  fontWeight:      active ? 500 : 400,
  cursor:          'pointer',
  textAlign:       'left',
  transition:      'background-color 0.12s, color 0.12s',
  outline:         'none',
  fontFamily:      'inherit',
  borderLeft:      active ? '2px solid #6366F1' : '2px solid transparent',
})

const footerStyle = {
  flexShrink:    0,
  padding:       '12px 16px',
  borderTop:     '1px solid #1E2028',
}

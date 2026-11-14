import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function MenuExplorerSection() {
  const { content, openDish } = useCMS();
  const menuExplorer = content?.sections?.menu_explorer || {};
  const categories = content?.categories || [];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('ALL');

  const dietaryOptions = ['ALL', 'GF', 'DF', 'VG', 'V'];

  const currentCategory = categories[activeCategoryIndex] || categories[0] || { items: [] };

  // Filter items in current category
  const filteredItems = useMemo(() => {
    let list = currentCategory.items || [];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          (it.short_description && it.short_description.toLowerCase().includes(q))
      );
    }
    if (activeDietary !== 'ALL') {
      list = list.filter(
        (it) =>
          it.dietary_information &&
          it.dietary_information.some((d) => d.toUpperCase() === activeDietary)
      );
    }
    return list;
  }, [currentCategory, searchQuery, activeDietary]);

  return (
    <section id="menu" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {menuExplorer.eyebrow || 'MENU EXPLORER'}
          </span>
          <h2 className="section-heading">
            {menuExplorer.title || 'A MENU INSPIRED BY THE MOMENT.'}
          </h2>
          <p className="section-lead">
            {menuExplorer.subtitle ||
              'Seasonally harvested botanicals, wood-fired hearth proteins, and coastal delicacies crafted with tropical reverence.'}
          </p>
        </div>

        {/* Tasting Menu Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem 2rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-citrus)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              CHEF SOMA SELECTION
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: 'var(--text-ivory)',
              }}
            >
              The Full Botanical Tasting Repertoire
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-sand)' }}>
              A ten-stage journey traversing pristine coastal waters and sub-tropical fruit groves.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '0.65rem 1.25rem',
                backgroundColor: 'rgba(217, 184, 78, 0.12)',
                border: '1px solid var(--accent-citrus)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--accent-citrus)',
                }}
              >
                {menuExplorer?.custom_content?.tasting_menu_price || '$145 TASTING EXPERIENCE'}
              </span>
            </div>
            <div
              style={{
                padding: '0.65rem 1.25rem',
                backgroundColor: 'rgba(82, 116, 90, 0.2)',
                border: '1px solid var(--botanical-green)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--sage-mist)',
                }}
              >
                {menuExplorer?.custom_content?.pairing_price || '$85 BOTANICAL PAIRINGS'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs Scrollbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => {
                setActiveCategoryIndex(idx);
                setSearchQuery('');
              }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-sm)',
                border: activeCategoryIndex === idx ? '1px solid var(--accent-terracotta)' : '1px solid var(--border-botanical)',
                backgroundColor: activeCategoryIndex === idx ? 'var(--accent-terracotta)' : 'var(--bg-surface)',
                color: activeCategoryIndex === idx ? '#FFFFFF' : 'var(--text-sand)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Dietary Filters Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
            backgroundColor: 'var(--bg-forest)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-botanical)',
          }}
        >
          {/* Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: '240px', flex: '1 1 300px' }}>
            <span style={{ color: 'var(--sage-mist)', fontSize: '0.9rem' }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${currentCategory.name}...`}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-ivory)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Dietary Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--sage-mist)',
                marginRight: '0.25rem',
              }}
            >
              FILTER:
            </span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveDietary(opt)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '3px',
                  border: activeDietary === opt ? '1px solid var(--accent-citrus)' : '1px solid var(--border-botanical)',
                  backgroundColor: activeDietary === opt ? 'rgba(217, 184, 78, 0.2)' : 'transparent',
                  color: activeDietary === opt ? 'var(--accent-citrus)' : 'var(--text-sand)',
                  cursor: 'pointer',
                }}
              >
                {opt === 'ALL' ? 'ALL DIETS' : opt}
              </button>
            ))}
          </div>
        </div>

        {/* Category Description */}
        {currentCategory.description && (
          <div style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: 'var(--sage-mist)',
              }}
            >
              "{currentCategory.description}"
            </p>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-botanical)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-sand)' }}>
              No dishes found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietary('ALL');
              }}
              className="btn-outline-tropical"
              style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id || item.slug}
                className="tropical-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                }}
                onClick={() => openDish(item)}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.4rem',
                        color: 'var(--text-ivory)',
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.15rem',
                        color: 'var(--accent-citrus)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.currency_symbol || '$'}{item.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      color: 'var(--text-sand)',
                      lineHeight: 1.55,
                      marginBottom: '1rem',
                    }}
                  >
                    {item.short_description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-botanical)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {(item.dietary_information || []).map((diet) => (
                      <span key={diet} className="meta-chip">
                        {diet}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--accent-terracotta)',
                    }}
                  >
                    PREVIEW RECIPE →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

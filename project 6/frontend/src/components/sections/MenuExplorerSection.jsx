import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function MenuExplorerSection() {
  const { content, openDish } = useCMS();
  const menuExplorer = content?.sections?.menu_explorer || {};
  const categories = content?.categories || [];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('ALL');

  const dietaryOptions = ['ALL', 'HALAL', 'GF', 'V', 'VG'];

  const currentCategory = categories[activeCategoryIndex] || categories[0] || { items: [] };

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
      <div className="container-diner">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {menuExplorer.eyebrow || 'MENU EXPLORER'}
          </span>
          <h2 className="section-heading">
            {menuExplorer.title || 'PICK YOUR FAVORITE.'}
          </h2>
          <p className="section-lead">
            {menuExplorer.subtitle ||
              'Double-smashed beef patties, atomic spiced sides, and hand-spun malts prepared with fresh ingredients and vintage craft.'}
          </p>
        </div>

        {/* Combo Deal Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.75rem 2rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--cherry-red), var(--neon-cyan))' }} />

          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--atomic-yellow)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              ★ ALL-DAY ATOMIC SPECIAL
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: '#FFFFFF',
              }}
            >
              {menuExplorer?.custom_content?.combo_badge || 'The Cosmic Triad Combo Deal'}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-cream)' }}>
              Pair any signature smash burger with tallow crinkle-cut fries and our malted strawberry shake.
            </p>
          </div>

          <div
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'rgba(216, 58, 69, 0.2)',
              border: '1px solid var(--cherry-red)',
              borderRadius: 'var(--radius-xs)',
              textAlign: 'center',
              boxShadow: '0 0 16px rgba(216, 58, 69, 0.35)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#FFFFFF',
                display: 'block',
              }}
            >
              $22.00
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon-cyan)' }}>
              SAVE $6.00
            </span>
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
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-xs)',
                border: activeCategoryIndex === idx ? '1px solid var(--cherry-red)' : '1px solid var(--border-diner)',
                backgroundColor: activeCategoryIndex === idx ? 'var(--cherry-red)' : 'var(--bg-surface)',
                color: activeCategoryIndex === idx ? '#FFFFFF' : 'var(--text-cream)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
                boxShadow: activeCategoryIndex === idx ? '0 0 16px rgba(216, 58, 69, 0.4)' : 'none',
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
            backgroundColor: 'var(--bg-midnight)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-diner)',
          }}
        >
          {/* Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: '240px', flex: '1 1 300px' }}>
            <span style={{ color: 'var(--neon-cyan)', fontSize: '0.9rem' }}>🔍</span>
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
                color: '#FFFFFF',
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
                color: 'var(--text-muted)',
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
                  borderRadius: '2px',
                  border: activeDietary === opt ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                  backgroundColor: activeDietary === opt ? 'rgba(67, 217, 232, 0.2)' : 'transparent',
                  color: activeDietary === opt ? 'var(--neon-cyan)' : 'var(--text-cream)',
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
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--text-muted)',
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
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border-diner)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-cream)' }}>
              No dishes found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietary('ALL');
              }}
              className="btn-outline-diner"
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
                className="diner-card"
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
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        color: 'var(--neon-cyan)',
                        fontWeight: 700,
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
                      color: 'var(--text-cream)',
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
                    borderTop: '1px solid var(--border-diner)',
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
                      color: 'var(--cherry-red)',
                      fontWeight: 700,
                    }}
                  >
                    VIEW INGREDIENTS →
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

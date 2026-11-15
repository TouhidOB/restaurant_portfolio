import React, { useState, useMemo, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function MenuPage({ onNavigateHome, onNavigatePage }) {
  const { content, openDish, openReservation } = useCMS();
  const menuExplorer = content?.sections?.menu_explorer || {};
  const categories = content?.categories || [];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Dedicated Page Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 4rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.8) 0%, rgba(9, 15, 27, 0.98) 100%)',
        }}
      >
        <div className="container-diner">
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: 'var(--atomic-yellow)' }}>MENU REPERTOIRE</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ {menuExplorer.eyebrow || 'FULL CULINARY CATALOG'}
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(67, 217, 232, 0.25)',
              }}
            >
              {menuExplorer.title || 'THE COMPLETE STARDUST MENU.'}
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2rem',
              }}
            >
              {menuExplorer.subtitle ||
                'Double-smashed beef patties, atomic spiced sides, hand-spun triple malts, and late-night retro desserts prepared from scratch.'}
            </p>

            {/* Shift Availability Indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5rem',
                backgroundColor: 'rgba(9, 15, 27, 0.8)',
                border: '1px solid var(--border-diner)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--atomic-yellow)' }}>☀️ LUNCH SERVICE:</span>
                <span style={{ color: '#FFF' }}>12:00 PM – 3:30 PM</span>
              </div>
              <span style={{ color: 'var(--border-diner)' }}>|</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--neon-cyan)' }}>🌙 DINNER & LATE NIGHT:</span>
                <span style={{ color: '#FFF' }}>5:00 PM – 2:00 AM</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={openReservation} className="btn-cherry">
                <span>RESERVE TABLE FOR TODAY</span>
                <span>★</span>
              </button>
              <button
                onClick={onNavigateHome}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-diner)',
                  color: 'var(--text-cream)',
                  padding: '0.95rem 1.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                ← BACK TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Filtering & Catalog */}
      <section className="section-shell">
        <div className="container-diner">
          {/* Controls Bar: Category Pills + Search + Dietary */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-diner)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem 2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Category Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid rgba(36, 53, 82, 0.7)',
              }}
            >
              {categories.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <button
                    key={cat.id || idx}
                    onClick={() => setActiveCategoryIndex(idx)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      padding: '0.65rem 1.25rem',
                      borderRadius: 'var(--radius-xs)',
                      border: `1px solid ${isActive ? 'var(--cherry-red)' : 'var(--border-diner)'}`,
                      backgroundColor: isActive ? 'var(--cherry-red)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-cream)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 0 14px rgba(216, 58, 69, 0.45)' : 'none',
                    }}
                  >
                    {cat.name.toUpperCase()} ({cat.items ? cat.items.length : 0})
                  </button>
                );
              })}
            </div>

            {/* Search & Dietary Filters */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
              }}
            >
              {/* Search Box */}
              <div style={{ flex: '1 1 280px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search dishes, ingredients, or sides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-midnight-deep)',
                    border: '1px solid var(--border-diner)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.65rem 1rem',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Dietary Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)' }}>
                  DIETARY:
                </span>
                {dietaryOptions.map((opt) => {
                  const isSelected = activeDietary === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setActiveDietary(opt)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '3px',
                        border: `1px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(36, 53, 82, 0.8)'}`,
                        backgroundColor: isSelected ? 'rgba(67, 217, 232, 0.15)' : 'transparent',
                        color: isSelected ? 'var(--neon-cyan)' : 'var(--text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dish Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="diner-card"
                onClick={() => openDish(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--border-diner)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-diner)';
                }}
              >
                {item.image && (
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        right: '0.85rem',
                        backgroundColor: 'var(--cherry-red)',
                        color: '#FFF',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '3px',
                      }}
                    >
                      ${item.price}
                    </div>
                  </div>
                )}

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {item.short_description || item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(36, 53, 82, 0.5)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--neon-cyan)',
                    }}
                  >
                    <span>DETAILS & ALLERGENS</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                No dishes matching your search filter in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

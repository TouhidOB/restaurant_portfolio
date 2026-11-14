import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07Menu() {
  const { content, setSelectedDish } = useCMS();
  const menu = content?.menu || {};
  const categories = menu.categories || [];

  const [activeCat, setActiveCat] = useState(categories[0]?.id || 'starters');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = categories.find((c) => c.id === activeCat) || categories[0];

  const displayedItems = (currentCategory?.items || []).filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      (item.dietary && item.dietary.toLowerCase().includes(q))
    );
  });

  return (
    <section id="menu" className="py-section" style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="section-label">{menu.subtitle || 'Crafted Daily In Our Open Kitchen'}</span>
          <h2 className="section-title">{menu.title || 'Full Menu Explorer'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Dry-aged butcher cuts, artisanal slow-smoked barbecue, and charred wood-fired plates designed for sharing.
          </p>
        </div>

        {/* Live Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search dishes, smoked meats, ingredients..."
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--color-graphite)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              color: 'var(--color-offwhite)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-copper)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
              borderBottom: '2px solid var(--color-brick)',
              paddingBottom: '1.25rem',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  background: activeCat === cat.id ? 'var(--color-copper)' : 'transparent',
                  color: activeCat === cat.id ? 'var(--color-black)' : 'var(--color-concrete)',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '0.65rem 1.4rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {displayedItems.length > 0 ? (
            displayedItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDish(item)}
                style={{
                  backgroundColor: 'var(--color-black-card)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-copper)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-offwhite)', textTransform: 'uppercase' }}>
                    {item.name}
                  </h4>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-copper)', fontWeight: 700, marginLeft: '1rem' }}>
                    {item.price}
                  </span>
                </div>

                <p style={{ color: 'var(--color-concrete)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                  {item.desc}
                </p>

                {item.dietary && (
                  <span
                    style={{
                      display: 'inline-block',
                      color: 'var(--color-copper)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 800,
                    }}
                  >
                    ✦ {item.dietary}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-concrete)', padding: '3rem' }}>
              No dishes found matching "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

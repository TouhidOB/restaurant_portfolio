import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07_MenuExplorer() {
  const { content, openDishModal } = useCMS();
  const menuData = content?.editorial_sections?.s07_menu || {
    badge: "A LA CARTE & TASTING",
    title: "The Riviera Gastronomic Repertoire",
    description: "An evolving seasonal dialogue between the Mediterranean Sea, Provençal mountain herbs, and traditional handmade pasta."
  };

  const categories = content.menu_categories || [];
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all dishes
  const allDishes = useMemo(() => {
    const list = [];
    categories.forEach((cat) => {
      if (cat.items) {
        cat.items.forEach((item) => {
          list.push({ ...item, categoryName: cat.name, categorySlug: cat.slug });
        });
      }
    });
    return list;
  }, [categories]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      const matchCat = activeCategorySlug === 'all' || dish.categorySlug === activeCategorySlug;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        (dish.description && dish.description.toLowerCase().includes(q)) ||
        (dish.subtitle && dish.subtitle.toLowerCase().includes(q)) ||
        (dish.dietary_tags && dish.dietary_tags.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [allDishes, activeCategorySlug, searchQuery]);

  return (
    <section id="menu" className="editorial-section" style={{ backgroundColor: 'var(--c-ivory)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {menuData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {menuData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
            {menuData.description}
          </p>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: '1.5rem',
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveCategorySlug('all')}
              style={{
                background: activeCategorySlug === 'all' ? 'var(--c-navy)' : 'transparent',
                color: activeCategorySlug === 'all' ? '#FFFFFF' : 'var(--c-charcoal)',
                border: '1px solid',
                borderColor: activeCategorySlug === 'all' ? 'var(--c-navy)' : 'var(--c-border)',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              All Selections ({allDishes.length})
            </button>
            {categories.map((cat) => {
              const isSelected = activeCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  style={{
                    background: isSelected ? 'var(--c-navy)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--c-charcoal)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--c-navy)' : 'var(--c-border)',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ minWidth: '240px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              style={{
                width: '100%',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid var(--c-border)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Dishes List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openDishModal(dish)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                padding: '24px 22px',
                border: '1px solid var(--c-border)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--c-terracotta)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(38, 58, 72, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--c-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem',
                      color: 'var(--c-navy)',
                      lineHeight: 1.2,
                    }}
                  >
                    {dish.name}
                  </h4>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--c-terracotta)',
                      marginLeft: '14px',
                    }}
                  >
                    {dish.price}
                  </span>
                </div>

                {dish.subtitle && (
                  <div style={{ fontSize: '0.8rem', color: '#8C847B', marginBottom: '8px' }}>
                    {dish.subtitle}
                  </div>
                )}

                <p style={{ color: '#595752', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' }}>
                  {dish.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--c-border-light)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#596448', fontWeight: 600 }}>
                  {dish.categoryName}
                </span>
                {dish.is_signature && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-terracotta)', fontWeight: 700 }}>
                    ★ Signature
                  </span>
                )}
              </div>
            </div>
          ))}

          {filteredDishes.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#8C847B' }}>
              <p style={{ fontSize: '1.1rem' }}>No culinary creations found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategorySlug('all'); }}
                className="btn-secondary"
                style={{ marginTop: '16px', padding: '8px 18px', fontSize: '0.8rem' }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

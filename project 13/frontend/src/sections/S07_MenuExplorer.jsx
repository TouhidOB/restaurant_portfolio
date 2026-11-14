import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07_MenuExplorer() {
  const { content, openDishModal } = useCMS();
  const menuData = content?.editorial_sections?.s07_menu || {
    badge: "FULL POCHA MENU",
    title: "The Late-Night Culinary Explorer",
    description: "Browse our complete street food repertoire. Filter by category, spice tolerance, or dietary preference."
  };

  const categories = content.menu_categories || [];
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spicyFilter, setSpicyFilter] = useState('all');

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
        (dish.korean_name && dish.korean_name.includes(q)) ||
        (dish.description && dish.description.toLowerCase().includes(q)) ||
        (dish.short_description && dish.short_description.toLowerCase().includes(q)) ||
        (dish.dietary_tags && dish.dietary_tags.toLowerCase().includes(q));
      
      let matchSpicy = true;
      if (spicyFilter === 'mild') matchSpicy = (dish.spicy_level || 0) <= 1;
      if (spicyFilter === 'spicy') matchSpicy = (dish.spicy_level || 0) >= 2;

      return matchCat && matchQuery && matchSpicy;
    });
  }, [allDishes, activeCategorySlug, searchQuery, spicyFilter]);

  return (
    <section id="menu" className="editorial-section" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {menuData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {menuData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
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
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.5rem',
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveCategorySlug('all')}
              style={{
                background: activeCategorySlug === 'all' ? 'var(--color-magenta)' : 'transparent',
                color: activeCategorySlug === 'all' ? '#FFFFFF' : 'var(--color-silver)',
                border: '1px solid',
                borderColor: activeCategorySlug === 'all' ? 'var(--color-magenta)' : 'var(--color-border)',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-condensed)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'all 0.2s ease',
              }}
            >
              All Items ({allDishes.length})
            </button>
            {categories.map((cat) => {
              const isSelected = activeCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  style={{
                    background: isSelected ? 'var(--color-magenta)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--color-silver)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-magenta)' : 'var(--color-border)',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-condensed)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search & Spicy Filter */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={spicyFilter}
              onChange={(e) => setSpicyFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-charcoal)',
                color: 'var(--color-white)',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-condensed)',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              <option value="all">All Spice Levels</option>
              <option value="mild">Mild & Non-Spicy</option>
              <option value="spicy">Hot & Fire Buldak</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              style={{
                minWidth: '220px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-charcoal)',
                color: '#FFFFFF',
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
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '10px',
                padding: '24px 22px',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-cyan)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.3rem',
                        color: '#FFFFFF',
                        lineHeight: 1.2,
                      }}
                    >
                      {dish.name}
                    </h4>
                    {dish.korean_name && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-cyan)', fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}>
                        {dish.korean_name}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--color-amber)',
                      marginLeft: '14px',
                    }}
                  >
                    {dish.price}
                  </span>
                </div>

                <p style={{ color: 'var(--color-silver)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' }}>
                  {dish.short_description || dish.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--color-border)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-concrete)', fontWeight: 700, fontFamily: 'var(--font-condensed)' }}>
                  {dish.categoryName}
                </span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {dish.spicy_level > 0 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-coral)', fontWeight: 700 }}>
                      {dish.spicy_level === 3 ? '🔥🔥🔥 Fire' : dish.spicy_level === 2 ? '🌶️🌶️ Hot' : '🌶️ Mild'}
                    </span>
                  )}
                  {dish.is_featured && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-magenta)', fontWeight: 700 }}>
                      ★ Icon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredDishes.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--color-silver)' }}>
              <p style={{ fontSize: '1.1rem' }}>No Korean street food found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategorySlug('all'); setSpicyFilter('all'); }}
                className="btn-secondary"
                style={{ marginTop: '16px', padding: '8px 18px', fontSize: '0.8rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

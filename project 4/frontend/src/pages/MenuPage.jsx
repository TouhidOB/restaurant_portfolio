import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage({ onNavigateHome, onOpenReservation }) {
  const { content, openDish } = useCMS();
  const categories = content.categories || [];
  const [activeCategory, setActiveCategory] = useState('all');

  const allItems = categories.flatMap(cat => (cat.items || []).map(item => ({ ...item, categoryName: cat.title, categorySlug: cat.slug })));

  const filteredItems = activeCategory === 'all'
    ? allItems
    : allItems.filter(item => item.categorySlug === activeCategory);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>04. MENU REPERTOIRE</span>
        </div>

        {/* Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '2.5rem' }}>
          <span className="section-tag">ARCHITECTURAL DINING &bull; COMPLETE REPERTOIRE</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            THE REPERTOIRE.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Every plate captured in its finished architectural form. Prepared over white oak and Kishu binchotan coals at 900°C.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '0.6rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: activeCategory === 'all' ? 'var(--accent-orange)' : 'var(--bg-surface)',
              color: activeCategory === 'all' ? '#000' : 'var(--text-secondary)',
              border: '1px solid ' + (activeCategory === 'all' ? 'var(--accent-orange)' : 'var(--border-steel)'),
              cursor: 'pointer',
            }}
          >
            ALL DISHES ({allItems.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: '0.6rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: activeCategory === cat.slug ? 'var(--accent-orange)' : 'var(--bg-surface)',
                color: activeCategory === cat.slug ? '#000' : 'var(--text-secondary)',
                border: '1px solid ' + (activeCategory === cat.slug ? 'var(--accent-orange)' : 'var(--border-steel)'),
                cursor: 'pointer',
              }}
            >
              {cat.title} ({(cat.items || []).length})
            </button>
          ))}
        </div>

        {/* Dishes Grid with Full Meal Photography */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {filteredItems.map((dish, idx) => (
            <div
              key={dish.id || idx}
              onClick={() => openDish(dish)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-steel)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-orange)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-steel)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Meal Photo */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#000' }}>
                <img
                  src={dish.image_url || dish.resolved_image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--accent-orange)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem' }}>
                  ${dish.price}
                </div>
                {dish.categoryName && (
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(32,33,31,0.9)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', textTransform: 'uppercase' }}>
                    {dish.categoryName}
                  </div>
                )}
              </div>

              {/* Dish Content */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    {dish.name}
                  </h3>
                  {dish.subtitle && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>
                      {dish.subtitle}
                    </div>
                  )}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {dish.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    TAGS: {dish.dietary_tags || 'GF'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                    VIEW SPEC &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Reservation Bar */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-orange)', padding: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            READY TO TASTE THE CHARCOAL FIRE?
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Reserve a table in the Main Concrete Hall or secure front-row seats at the Hearth Fire Counter.
          </p>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2.5rem' }}>
            RESERVE YOUR TABLE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

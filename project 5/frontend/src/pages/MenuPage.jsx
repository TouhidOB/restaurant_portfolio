import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage({ onNavigateHome, onOpenReservation }) {
  const { content, openDish } = useCMS();
  const categories = content.categories || [];
  const [activeCategory, setActiveCategory] = useState('all');

  const allItems = categories.flatMap(cat =>
    (cat.items || []).map(item => ({
      ...item,
      categoryName: cat.name || cat.title,
      categorySlug: cat.slug,
    }))
  );

  const filteredItems = activeCategory === 'all'
    ? allItems
    : allItems.filter(item => item.categorySlug === activeCategory);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>04. BOTANICAL REPERTOIRE</span>
        </div>

        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '2.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            HAUTE CUISINE &bull; MEAL PHOTOGRAPHY REPERTOIRE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            THE VERDANT MENU.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            Every plate captured in vibrant natural light. Explore cold-cured coastal crudos, wild hearts of palm, and wood-fired citrus-wood hearth dishes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '0.65rem 1.4rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: activeCategory === 'all' ? '#BC7153' : '#243F32',
              color: activeCategory === 'all' ? '#fff' : '#AAB9A0',
              border: '1px solid ' + (activeCategory === 'all' ? '#BC7153' : 'rgba(170, 185, 160, 0.3)'),
              borderRadius: '4px',
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
                padding: '0.65rem 1.4rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: activeCategory === cat.slug ? '#BC7153' : '#243F32',
                color: activeCategory === cat.slug ? '#fff' : '#AAB9A0',
                border: '1px solid ' + (activeCategory === cat.slug ? '#BC7153' : 'rgba(170, 185, 160, 0.3)'),
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {cat.name || cat.title} ({(cat.items || []).length})
            </button>
          ))}
        </div>

        {/* Dishes Grid with Full Meal Photography */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {filteredItems.map((dish, idx) => {
            const dishImg = dish.resolved_image || dish.image_url || dish.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80";
            return (
              <div
                key={dish.id || idx}
                onClick={() => openDish(dish)}
                style={{
                  background: '#243F32',
                  border: '1px solid rgba(170, 185, 160, 0.25)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#BC7153';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(170, 185, 160, 0.25)';
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#14251D' }}>
                  <img
                    src={dishImg}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', background: '#BC7153', color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', fontWeight: 700, padding: '0.3rem 0.65rem', borderRadius: '3px' }}>
                    {dish.currency_symbol || '$'}{dish.price}
                  </div>
                  {dish.categoryName && (
                    <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', background: 'rgba(26, 47, 37, 0.9)', color: '#D9B84E', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', padding: '0.25rem 0.55rem', borderRadius: '3px' }}>
                      {dish.categoryName}
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: '0.85rem', left: '0.85rem', background: 'rgba(26, 47, 37, 0.9)', padding: '0.25rem 0.6rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: '#AAB9A0', borderRadius: '3px' }}>
                    RECIPE DETAILS &rarr;
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.4rem', color: '#F6F2E9' }}>
                      {dish.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.88rem', color: '#AAB9A0', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {dish.short_description || dish.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(170, 185, 160, 0.2)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {(dish.dietary_information || []).map((diet) => (
                        <span key={diet} style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono, monospace)', background: 'rgba(170, 185, 160, 0.15)', color: '#AAB9A0', padding: '2px 6px', borderRadius: '2px' }}>
                          {diet}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', fontWeight: 600 }}>
                      INSPECT →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reservations Banner */}
        <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            TABLE RESERVATIONS
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>
            JOIN US FOR LUNCH OR DINNER SERVICE
          </h2>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
            Tables in the Main Pavilion and Glasshouse Canopy open 30 days in advance. Reserve early to select your preferred dining zone.
          </p>
          <button
            onClick={onOpenReservation}
            style={{
              padding: '0.85rem 2.2rem',
              background: '#BC7153',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            REQUEST A TABLE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage({ onNavigateHome, onOpenReservation }) {
  const { content, openDish } = useCMS();
  const featuredDishes = content.featured_dishes || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>03. SIGNATURE DISHES</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            CURATED HIGHLIGHTS &bull; BOTANICAL REPERTOIRE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            FRESH FROM OUR KITCHEN.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            Explore signature dishes celebrating raw botanical acidity, ember-roasted line-caught fish, and seasonal sub-tropical produce.
          </p>
        </div>

        {/* Signatures Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {featuredDishes.map((dish, idx) => {
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
                {/* Meal Photo */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#14251D' }}>
                  <img
                    src={dishImg}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#BC7153', color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '3px' }}>
                    {dish.currency_symbol || '$'}{dish.price}
                  </div>
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(26, 47, 37, 0.88)', padding: '0.3rem 0.7rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#D9B84E', borderRadius: '3px' }}>
                    CLICK FOR TASTING NOTES
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#BC7153', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      BOTANICAL HIGHLIGHT 0{idx + 1}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F6F2E9' }}>
                      {dish.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.9rem', color: '#AAB9A0', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {dish.short_description || dish.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(170, 185, 160, 0.2)', paddingTop: '1rem', marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {(dish.dietary_information || []).map((diet) => (
                        <span key={diet} style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono, monospace)', background: 'rgba(170, 185, 160, 0.15)', color: '#AAB9A0', padding: '2px 6px', borderRadius: '2px' }}>
                          {diet}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', fontWeight: 600 }}>
                      VIEW DETAILS &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            READY TO TASTE OUR FULL REPERTOIRE?
          </h3>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Browse all starters, mains, plant-based botanicals, and wood-fired hearth selections on our interactive menu.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/menu');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              style={{
                padding: '0.85rem 2rem',
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
              EXPLORE FULL MENU &rarr;
            </button>
            <button
              onClick={onOpenReservation}
              style={{
                padding: '0.85rem 2rem',
                background: 'transparent',
                border: '1px solid rgba(170, 185, 160, 0.4)',
                borderRadius: '4px',
                color: '#F6F2E9',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              BOOK A TABLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

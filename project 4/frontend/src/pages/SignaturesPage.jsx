import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage({ onNavigateHome, onOpenReservation }) {
  const { content, openDish } = useCMS();
  const featuredDishes = content.featured_dishes || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>03. SIGNATURE DISHES</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span className="section-tag">CURATED HIGHLIGHTS &bull; HAUTE REPERTOIRE</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            THE SIGNATURES.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Four defining dishes that encapsulate our tension between raw materiality and refined execution.
          </p>
        </div>

        {/* Signatures Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {featuredDishes.map((dish, idx) => (
            <div
              key={dish.id || idx}
              onClick={() => openDish(dish)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-steel)',
                cursor: 'pointer',
                transition: 'transform 0.2s, border-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent-orange)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-steel)';
              }}
            >
              {/* Meal Photo */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#000' }}>
                <img
                  src={dish.image_url || dish.resolved_image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent-orange)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.6rem' }}>
                  ${dish.price}
                </div>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(32,33,31,0.85)', padding: '0.25rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#fff' }}>
                  CLICK TO VIEW SPEC
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    SIGNATURE SPEC 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    {dish.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {dish.subtitle || dish.short_description}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {dish.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '1rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    TAGS: {dish.dietary_tags || 'GF, Wood-Fired'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                    DISCOVER &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              TASTING MENU EXPERIENCE
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              All signatures are featured within our 12-course wood-fired tasting menu ($185 per guest).
            </p>
          </div>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2rem' }}>
            RESERVE SHIFT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

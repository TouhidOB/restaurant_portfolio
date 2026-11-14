import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function SignatureDishesSection() {
  const { content, openDish } = useCMS();
  const s04 = content.sections?.signatures || {};
  const featured = content.featured_dishes || [];

  return (
    <section id="signatures" className="section-shell">
      <div className="container-brutal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div>
            <div className="section-tag">
              SECTION 04 // {s04.eyebrow || 'CURATED HIGHLIGHTS'}
            </div>
            <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>
              {s04.title || 'THE SIGNATURES.'}
            </h2>
            <p className="section-lead">
              {s04.subtitle || 'Four defining dishes that encapsulate our tension between raw materiality and refined execution.'}
            </p>
          </div>
          <a href="#menu" className="btn-outline-brutal">
            {s04.custom_content?.view_all_cta || 'BROWSE COMPLETE REPERTOIRE'} &rarr;
          </a>
        </div>

        {/* Asymmetrical Brutalist Dishes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {featured.map((dish, idx) => (
            <div
              key={dish.id || idx}
              className="brutalist-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
              }}
              onClick={() => openDish(dish)}
            >
              <div>
                <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '1.25rem', aspectRatio: '4/3', backgroundColor: '#1c1d1a' }}>
                  <img
                    src={dish.resolved_image || dish.image_url}
                    alt={dish.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: 'var(--accent-orange)',
                      color: '#000',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                    }}
                  >
                    {dish.currency_symbol || '$'}{dish.price}
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent-orange)',
                    marginBottom: '0.35rem',
                  }}
                >
                  SIGNATURE 0{idx + 1}
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  {dish.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {dish.short_description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-steel)',
                  paddingTop: '0.85rem',
                  marginTop: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {dish.dietary_information?.map((d) => (
                    <span key={d} className="meta-chip">
                      {d}
                    </span>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                  INSPECT &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

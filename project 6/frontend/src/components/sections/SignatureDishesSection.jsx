import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function SignatureDishesSection() {
  const { content, openDish } = useCMS();
  const signatures = content?.sections?.signatures || {};

  let dishes = content?.featured_dishes || [];
  if (!dishes || dishes.length === 0) {
    const collected = [];
    (content?.categories || []).forEach((cat) => {
      (cat.items || []).forEach((item) => {
        if (item.is_featured) collected.push(item);
      });
    });
    dishes = collected.slice(0, 4);
  }

  return (
    <section id="signatures" className="section-shell">
      <div className="container-diner">
        {/* Header Block with CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <span className="section-tag">
              {signatures.eyebrow || 'CURATED HIGHLIGHTS'}
            </span>
            <h2 className="section-heading">
              {signatures.title || 'THE STARS OF THE MENU.'}
            </h2>
            <p className="section-lead">
              {signatures.subtitle ||
                'Meet the flavors bringing classic comfort and contemporary creativity together on our smoking flat-top plancha.'}
            </p>
          </div>

          <a href="#menu" className="btn-outline-diner" style={{ whiteSpace: 'nowrap' }}>
            <span>EXPLORE FULL MENU</span>
            <span>↓</span>
          </a>
        </div>

        {/* 4 Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {dishes.map((dish) => (
            <div
              key={dish.id || dish.name}
              className="diner-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => openDish(dish)}
            >
              {/* Dish Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  backgroundColor: '#0D1422',
                }}
              >
                <img
                  src={dish.resolved_image || dish.image_url || dish.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'}
                  alt={dish.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'var(--cherry-red)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: '0 0 10px rgba(216, 58, 69, 0.5)',
                  }}
                >
                  ★ DINER STAR
                </span>
              </div>

              {/* Dish Content */}
              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
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
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.45rem',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {dish.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        color: 'var(--neon-cyan)',
                        fontWeight: 700,
                      }}
                    >
                      {dish.currency_symbol || '$'}{dish.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--text-cream)',
                      lineHeight: 1.55,
                      marginBottom: '1rem',
                    }}
                  >
                    {dish.short_description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-diner)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {(dish.dietary_information || []).map((tag) => (
                      <span key={tag} className="meta-chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--cherry-red)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    PREVIEW RECIPE →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

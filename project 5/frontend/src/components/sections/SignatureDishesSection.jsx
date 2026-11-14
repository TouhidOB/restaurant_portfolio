import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function SignatureDishesSection() {
  const { content, openDish } = useCMS();
  const signatures = content?.sections?.signatures || {};
  
  // Extract featured dishes
  let dishes = content?.featured_dishes || [];
  if (!dishes || dishes.length === 0) {
    // Collect from categories if featured_dishes is empty
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
      <div className="container-tropical">
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
              {signatures.title || 'FRESH FROM OUR KITCHEN.'}
            </h2>
            <p className="section-lead">
              {signatures.subtitle ||
                'Explore a selection of dishes that express our approach to flavor, creativity, and presentation.'}
            </p>
          </div>

          <a href="#menu" className="btn-outline-tropical" style={{ whiteSpace: 'nowrap' }}>
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
              className="tropical-card"
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
                  backgroundColor: '#16271E',
                }}
              >
                <img
                  src={dish.resolved_image || dish.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'}
                  alt={dish.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(26, 47, 37, 0.85)',
                    color: 'var(--accent-citrus)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(217, 184, 78, 0.4)',
                  }}
                >
                  FEATURED DISH
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
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.45rem',
                        color: 'var(--text-ivory)',
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {dish.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.15rem',
                        color: 'var(--accent-citrus)',
                        fontWeight: 600,
                      }}
                    >
                      {dish.currency_symbol || '$'}{dish.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--text-sand)',
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
                    borderTop: '1px solid var(--border-botanical)',
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
                      color: 'var(--accent-terracotta)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    VIEW DETAILS →
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

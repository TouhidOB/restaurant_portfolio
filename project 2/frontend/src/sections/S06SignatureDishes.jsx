import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function S06SignatureDishes({ dishes, onSelectDish, onOpenReservation }) {
  if (!dishes || dishes.length === 0) return null;

  return (
    <section
      id="signature"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
          <div>
            <div className="zen-eyebrow">
              FROM OUR KITCHEN
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '6px' }}>
              A Thoughtful Expression of Flavor.
            </h2>
            <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)' }}>
              料理長の厳選逸品
            </p>
          </div>

          <a
            href="#menu"
            style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-charcoal)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>View Complete Menu</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Asymmetric Dish Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}
        >
          {dishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => onSelectDish(dish)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 35px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {dish.image && (
                <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(32, 35, 33, 0.85)',
                      color: 'var(--color-rice-paper)',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {dish.category}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-charcoal)',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '2px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    {dish.price}
                  </div>
                </div>
              )}

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '20px', color: 'var(--color-charcoal)' }}>
                    {dish.name}
                  </h3>
                </div>

                {dish.japaneseName && (
                  <div className="font-jp" style={{ fontSize: '13px', color: 'var(--color-moss)', marginBottom: '10px' }}>
                    {dish.japaneseName}
                  </div>
                )}

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-charcoal)', opacity: 0.85, marginBottom: '16px' }}>
                  {dish.description}
                </p>

                {dish.tastingNote && (
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px dashed var(--color-border)', fontSize: '12px', fontStyle: 'italic', color: 'var(--color-stone)' }}>
                    {dish.tastingNote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

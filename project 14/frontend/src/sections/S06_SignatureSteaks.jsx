import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Award, ArrowRight } from 'lucide-react';

export default function S06_SignatureSteaks() {
  const { data, setSelectedDish } = useCMS();
  const steaks = data?.featured_steaks || [];

  return (
    <section id="signature-steaks" style={{ backgroundColor: 'var(--color-obsidian)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '52px'
        }}>
          <div>
            <div className="section-eyebrow">
              HERITAGE CUTS & DRY-AGED SELECTIONS
            </div>
            <h2 className="section-title">
              Signature Steak Collection
            </h2>
            <p className="section-desc">
              Carved from single-source USDA Prime and Wagyu loins, aged under precision salt microclimates, and kissed by post oak coals.
            </p>
          </div>
          <a href="#menu" className="btn-secondary">
            View Complete Menu &rarr;
          </a>
        </div>

        {/* 4 Featured Steaks Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px'
        }}>
          {steaks.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              style={{
                background: 'var(--color-charcoal)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.85)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Steak Image */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={dish.image || dish.image_url}
                  alt={dish.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(28,27,25,0.95) 0%, transparent 60%)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(16, 16, 16, 0.85)',
                  border: '1px solid var(--color-bronze)',
                  color: 'var(--color-champagne)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Award size={11} />
                  {dish.cut_type ? 'Prime Cut' : 'Signature'}
                </div>
              </div>

              {/* Steak Details */}
              <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      color: 'var(--color-ivory)',
                      lineHeight: 1.2
                    }}>
                      {dish.name}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      color: 'var(--color-champagne)',
                      fontWeight: 600,
                      marginLeft: '10px'
                    }}>
                      {dish.currency || '$'}{dish.price}
                    </span>
                  </div>

                  {dish.cut_type && (
                    <div style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-bronze)',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}>
                      {dish.cut_type}
                    </div>
                  )}

                  <p style={{
                    fontSize: '13px',
                    color: 'var(--color-taupe)',
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}>
                    {dish.short_description || dish.description}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-champagne)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  <span>View Details & Pairings</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

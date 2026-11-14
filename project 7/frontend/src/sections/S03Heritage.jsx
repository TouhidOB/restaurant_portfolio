import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03Heritage() {
  const { content } = useCMS();
  const heritage = content?.heritage || {};

  return (
    <section id="heritage" className="py-section" style={{ backgroundColor: '#202124', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left: Editorial Storytelling */}
          <div>
            <span className="section-label">{heritage.subtitle || 'Notre Héritage'}</span>
            <h2 className="section-title">
              {heritage.title || "L'Art de Vivre Parisien"}
            </h2>

            <p style={{ color: 'var(--color-ivory-dim)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
              {heritage.body_paragraph_1}
            </p>

            <p style={{ color: 'var(--color-taupe)', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              {heritage.body_paragraph_2}
            </p>

            {/* Chef Quote Card */}
            {heritage.quote && (
              <div
                style={{
                  borderLeft: '2px solid var(--color-gold)',
                  paddingLeft: '1.5rem',
                  marginTop: '2rem',
                  marginBottom: '2rem',
                }}
              >
                <blockquote
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    color: 'var(--color-ivory)',
                    lineHeight: '1.6',
                    marginBottom: '0.5rem',
                  }}
                >
                  « {heritage.quote} »
                </blockquote>
                <cite style={{ fontSize: '0.82rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontStyle: 'normal' }}>
                  — {heritage.quote_author || 'Chef Alexandre de Morbihan'}
                </cite>
              </div>
            )}

            {/* 3 Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2.5rem' }}>
              {(heritage.pillars || []).map((pillar, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(197, 164, 109, 0.15)',
                      border: '1px solid var(--color-gold)',
                      color: 'var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      flexShrink: 0,
                      marginTop: '0.2rem',
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-ivory)', marginBottom: '0.25rem' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Asymmetric Editorial Image Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(197, 164, 109, 0.35)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={heritage.image_main || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'}
                alt="Table gastronomique française"
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Overlapping Detail Frame */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2.5rem',
                left: '-2rem',
                width: '260px',
                height: '240px',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '2px solid var(--color-gold)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                display: 'none',
              }}
              className="heritage-floating-img"
            >
              <img
                src={heritage.image_detail || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85'}
                alt="Détail de table et argenterie"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .heritage-floating-img {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}

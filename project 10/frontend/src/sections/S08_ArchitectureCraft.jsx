import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08_ArchitectureCraft() {
  const { content, t, lang } = useCMS();
  const arch = content?.architecture || {};

  const subtitle = t(arch.subtitle) || 'Terracotta, Teak & Jamdani';
  const title = t(arch.title) || 'Architecture, Materials & Craftsmanship';
  const quote = t(arch.quote) || '';
  const author = t(arch.quote_author) || 'Architect Tariq Mahmud';
  const features = arch.features || [];
  const image = arch.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85';

  return (
    <section
      id="architecture"
      aria-label="Bengal Architecture and Craftsmanship"
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--color-bg-ivory, #F4EBDD)',
        color: 'var(--color-charcoal, #242321)',
        position: 'relative',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #A6533B)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}
          >
            {title}
          </h2>
          {quote && (
            <blockquote
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--color-charcoal, #242321)',
                lineHeight: 1.6,
                margin: '0 0 10px 0',
              }}
            >
              "{quote}"
            </blockquote>
          )}
          {author && (
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-brass, #B18A54)',
                fontWeight: 600,
              }}
            >
              — {author}
            </div>
          )}
        </div>

        {/* Grid with Features & Architecture Visual */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Architectural Image */}
          <div
            style={{
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
              border: '1px solid rgba(177, 138, 84, 0.35)',
            }}
          >
            <img
              src={image}
              alt="Terracotta and Teak Architecture"
              style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* 4 Architectural Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '24px 28px',
                  borderRadius: '2px',
                  border: '1px solid rgba(177, 138, 84, 0.25)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(166, 83, 59, 0.12)',
                      color: 'var(--color-terracotta, #A6533B)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--color-indigo, #26344A)',
                      margin: 0,
                    }}
                  >
                    {t(feat.title)}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.65,
                    color: 'rgba(36, 35, 33, 0.78)',
                    margin: '0 0 0 38px',
                  }}
                >
                  {t(feat.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

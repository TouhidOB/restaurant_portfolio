import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BrandSection({ brandData, onOpenReservation }) {
  const handleScrollToMenu = (e) => {
    e.preventDefault();
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="story"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Editorial Content */}
          <div>
            <div className="eyebrow">{brandData.eyebrow}</div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                lineHeight: 1.15,
                color: 'var(--color-pearl)',
                marginBottom: '28px',
              }}
            >
              {brandData.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '22px',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--color-gold)',
                marginBottom: '24px',
              }}
            >
              {brandData.lead}
            </p>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--color-pearl-muted)',
                marginBottom: '32px',
              }}
            >
              {brandData.description}
            </p>

            {/* Secondary statement with decorative quote line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderLeft: '2px solid var(--color-gold)',
                backgroundColor: 'rgba(18, 59, 53, 0.25)',
                marginBottom: '36px',
              }}
            >
              <Sparkles size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  color: 'var(--color-pearl)',
                  letterSpacing: '0.04em',
                }}
              >
                {brandData.secondaryStatement}
              </span>
            </div>

            <button
              onClick={handleScrollToMenu}
              className="btn-primary"
              style={{ padding: '16px 32px' }}
            >
              <span>{brandData.cta}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Image Composition with Art Deco Frame & Marker */}
          <div style={{ position: 'relative' }}>
            <div className="deco-frame" style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={brandData.image}
                alt="Aurelia Grand Dining Hall"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.05) brightness(0.95)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(23, 25, 26, 0.75) 100%)',
                }}
              />
            </div>

            {/* Floating Art Deco Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '-20px',
                backgroundColor: 'var(--color-emerald)',
                border: '1px solid var(--color-gold)',
                padding: '20px 28px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                ESTABLISHED
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-pearl)' }}>
                1926
              </span>
              <span style={{ fontSize: '10px', color: 'var(--color-pearl-muted)', letterSpacing: '0.1em' }}>
                CENTURY OF EXCELLENCE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

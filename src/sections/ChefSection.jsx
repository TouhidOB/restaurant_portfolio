import React from 'react';
import { Award, Quote } from 'lucide-react';

export default function ChefSection({ chefData, onOpenReservation }) {
  return (
    <section
      id="chef"
      className="section-padding"
      style={{
        backgroundColor: '#102B27',
        position: 'relative',
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
          {/* Chef Portrait with Gold Frame */}
          <div style={{ position: 'relative' }}>
            <div className="deco-frame" style={{ overflow: 'hidden' }}>
              <img
                src={chefData.image}
                alt={chefData.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.08) brightness(0.95)',
                }}
              />
            </div>

            {/* Chef Credentials Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-16px',
                backgroundColor: 'var(--color-obsidian)',
                border: '1px solid var(--color-gold)',
                padding: '16px 24px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Award size={16} color="var(--color-gold)" />
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
                  CULINARY MASTERY
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-pearl-muted)', margin: 0 }}>
                {chefData.experienceYears}
              </p>
            </div>
          </div>

          {/* Chef Editorial Narrative */}
          <div>
            <div className="eyebrow">{chefData.eyebrow}</div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                color: 'var(--color-pearl)',
                marginBottom: '10px',
              }}
            >
              {chefData.heading}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: 'var(--color-gold)',
                  display: 'block',
                }}
              >
                {chefData.name}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-jade)',
                }}
              >
                {chefData.title}
              </span>
            </div>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--color-pearl-muted)',
                marginBottom: '28px',
              }}
            >
              {chefData.description}
            </p>

            {/* Chef Quote Card */}
            <div
              style={{
                backgroundColor: 'rgba(23, 25, 26, 0.65)',
                border: '1px solid var(--color-border-gold)',
                padding: '24px 28px',
                position: 'relative',
                marginBottom: '36px',
              }}
            >
              <Quote
                size={36}
                color="var(--color-gold)"
                style={{ position: 'absolute', top: '-14px', left: '20px', opacity: 0.3 }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--color-pearl)',
                  margin: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                "{chefData.quote}"
              </p>
            </div>

            <button
              onClick={onOpenReservation}
              className="btn-primary"
              style={{ padding: '16px 36px' }}
            >
              <span>EXPERIENCE THE CHEF'S TASTING</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

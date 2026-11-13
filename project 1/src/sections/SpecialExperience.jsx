import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SpecialExperience({ experiences, onSelectExperience }) {
  return (
    <section
      id="experiences"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            TAILORED HOSPITALITY
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--color-pearl)',
              marginBottom: '16px',
            }}
          >
            Make Every Occasion Extraordinary.
          </h2>
          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              fontSize: '15px',
              color: 'var(--color-pearl-muted)',
              lineHeight: 1.6,
            }}
          >
            Whether planning an intimate private degustation, celebrating a milestone anniversary, or hosting executive clientele, our salon provides an exquisite backdrop.
          </p>
          <div className="gold-divider">
            <span className="deco-diamond" />
          </div>
        </div>

        {/* 4 Experience Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
          }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="deco-frame"
              style={{
                backgroundColor: 'var(--color-obsidian-soft)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="exp-card-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(18, 59, 53, 0.9)',
                    border: '1px solid var(--color-gold)',
                    color: 'var(--color-gold)',
                    padding: '4px 12px',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {exp.subtitle}
                </div>
              </div>

              <div
                style={{
                  padding: '28px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      color: 'var(--color-pearl)',
                      marginBottom: '12px',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.65,
                      color: 'var(--color-pearl-muted)',
                      marginBottom: '24px',
                    }}
                  >
                    {exp.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectExperience(exp.title)}
                  className="btn-outline-gold"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: '1px solid var(--color-gold)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span>{exp.cta}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .deco-frame:hover .exp-card-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}

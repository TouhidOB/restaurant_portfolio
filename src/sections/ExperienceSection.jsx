import React from 'react';
import { Award, Flame, Gem, HeartHandshake } from 'lucide-react';

export default function ExperienceSection({ pillars }) {
  const icons = [
    <Gem size={26} color="var(--color-gold)" />,
    <Flame size={26} color="var(--color-gold)" />,
    <Award size={26} color="var(--color-gold)" />,
    <HeartHandshake size={26} color="var(--color-gold)" />
  ];

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-emerald)',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            WHY DINE WITH US
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              color: 'var(--color-pearl)',
              marginBottom: '16px',
            }}
          >
            An Experience Beyond the Ordinary.
          </h2>
          <div className="gold-divider">
            <span className="deco-diamond" />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.number}
              style={{
                position: 'relative',
                padding: '36px 28px',
                border: '1px solid var(--color-border-gold-subtle)',
                backgroundColor: 'rgba(11, 37, 33, 0.65)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              className="experience-card"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div style={{ padding: '12px', background: 'rgba(214, 184, 121, 0.1)', border: '1px solid var(--color-gold)' }}>
                  {icons[idx]}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: 'var(--color-gold)',
                    opacity: 0.6,
                  }}
                >
                  {pillar.number}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '22px',
                  color: 'var(--color-pearl)',
                  marginBottom: '14px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {pillar.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--color-pearl-muted)',
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-card:hover {
          border-color: var(--color-gold);
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  );
}

import React from 'react';

export default function S09Chef({ chefData, onOpenReservation }) {
  if (!chefData) return null;

  return (
    <section
      id="chef"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Chef Portrait */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(182, 161, 123, 0.3)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={chefData.image}
                alt={chefData.name}
                style={{
                  width: '100%',
                  height: '560px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Inset Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                backgroundColor: 'rgba(32, 35, 33, 0.92)',
                backdropFilter: 'blur(10px)',
                padding: '14px 20px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-bamboo)' }}>
                {chefData.position}
              </div>
              <div style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: 600 }}>
                {chefData.name}
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div>
            <div className="zen-eyebrow" style={{ color: 'var(--color-bamboo)' }}>
              {chefData.eyebrow || 'MEET THE CULINARY DIRECTOR'}
            </div>

            <h2 style={{ fontSize: 'clamp(34px, 5vw, 54px)', color: '#FFFFFF', marginBottom: '4px' }}>
              {chefData.name}
            </h2>

            {chefData.japaneseName && (
              <div className="font-jp" style={{ fontSize: '18px', color: 'var(--color-bamboo-light)', marginBottom: '24px' }}>
                {chefData.japaneseName}
              </div>
            )}

            {chefData.quote && (
              <blockquote
                style={{
                  fontSize: '20px',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: '#FFFFFF',
                  paddingLeft: '20px',
                  borderLeft: '2px solid var(--color-bamboo)',
                  marginBottom: '28px',
                }}
              >
                "{chefData.quote}"
              </blockquote>
            )}

            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-stone)', marginBottom: '18px' }}>
              {chefData.bio1}
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-stone)', marginBottom: '32px' }}>
              {chefData.bio2}
            </p>

            {chefData.awards && chefData.awards.length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-bamboo)', marginBottom: '12px', fontWeight: 600 }}>
                  Master Credentials
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {chefData.awards.map((award, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#FFFFFF' }}>
                      <span className="zen-seal" style={{ width: '18px', height: '18px', fontSize: '9px' }}>印</span>
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onOpenReservation}
              className="btn-zen btn-zen-primary"
              style={{
                backgroundColor: 'var(--color-bamboo)',
                borderColor: 'var(--color-bamboo)',
                color: '#FFFFFF',
              }}
            >
              Reserve Omakase Counter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

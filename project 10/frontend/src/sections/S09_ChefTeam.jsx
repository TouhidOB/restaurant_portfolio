import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09_ChefTeam() {
  const { content, t, lang } = useCMS();
  const chef = content?.chef || {};

  const name = t(chef.name) || 'Master Chef Ananya Sen';
  const role = t(chef.title) || 'Culinary Director & Heritage Archivist';
  const bio = t(chef.bio) || '';
  const quote = t(chef.quote) || '';
  const accolades = chef.accolades || [];
  const image = chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85';

  return (
    <section
      id="chef"
      aria-label="Culinary Brigade & Chef Profile"
      style={{
        padding: '120px 0',
        backgroundColor: '#26344A',
        color: '#F4EBDD',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Chef Portrait */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(177, 138, 84, 0.4)',
              }}
            >
              <img
                src={image}
                alt={name}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: 'var(--color-terracotta, #A6533B)',
                color: '#FFFFFF',
                padding: '14px 24px',
                borderRadius: '2px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700 }}>
                30+ {lang === 'bn' ? 'বছর' : 'Years'}
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {lang === 'bn' ? 'ঐতিহ্য গবেষণার সাধনা' : 'Heritage Gastronomy'}
              </div>
            </div>
          </div>

          {/* Chef Details */}
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-brass, #B18A54)',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              {lang === 'bn' ? 'রন্ধনশিল্পী ও পরিচালক' : 'Culinary Leadership'}
            </div>
            <h2
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                fontSize: 'clamp(34px, 4.5vw, 48px)',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '6px',
              }}
            >
              {name}
            </h2>
            <div
              style={{
                fontSize: '15px',
                color: 'var(--color-brass, #B18A54)',
                fontWeight: 500,
                marginBottom: '24px',
              }}
            >
              {role}
            </div>

            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.8,
                color: 'rgba(244, 235, 221, 0.85)',
                marginBottom: '28px',
              }}
            >
              {bio}
            </p>

            {/* Chef Quote */}
            {quote && (
              <blockquote
                style={{
                  margin: '0 0 32px 0',
                  padding: '20px 24px',
                  backgroundColor: 'rgba(24, 33, 46, 0.7)',
                  borderLeft: '3px solid var(--color-terracotta, #A6533B)',
                  borderRadius: '2px',
                  fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  color: '#F4EBDD',
                  lineHeight: 1.6,
                }}
              >
                "{quote}"
              </blockquote>
            )}

            {/* Accolades */}
            {accolades.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brass, #B18A54)',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  {lang === 'bn' ? 'স্বীকৃতি ও গ্রন্থসমূহ' : 'Accolades & Heritage Publications'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {accolades.map((acc, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13.5px',
                        color: 'rgba(244, 235, 221, 0.8)',
                      }}
                    >
                      <span style={{ color: 'var(--color-brass, #B18A54)' }}>✦</span>
                      <span>{t(acc)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

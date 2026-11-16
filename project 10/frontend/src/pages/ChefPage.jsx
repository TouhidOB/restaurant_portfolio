import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage() {
  const { content, lang, t, openReservation } = useCMS();
  const chef = content?.chef || {};
  const accolades = chef.accolades || [];

  return (
    <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(166, 83, 59, 0.25) 0%, #1A2536 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#D4AF37',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {t(chef.title) || (lang === 'bn' ? 'রন্ধন পরিচালক ও খাদ্য ঐতিহ্যবিদ' : 'Culinary Director & Heritage Archivist')}
          </span>
          <h1
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4EBDD',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            {t(chef.name) || (lang === 'bn' ? 'মাস্টার শেফ অনন্যা সেন' : 'Master Chef Ananya Sen')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {lang === 'bn'
              ? 'তিন দশকের নিরবচ্ছিন্ন সাধনায় বাংলার হারিয়ে যাওয়া রাজকীয় ও গ্রামীণ রন্ধনরীতির পুনরুজ্জীবন।'
              : 'Three decades devoted to archiving lost royal recipes and rural river-delta folk cooking traditions.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={t(chef.name)}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(26, 37, 54, 0.95), transparent)',
                }}
              >
                <div style={{ fontWeight: 700, color: '#D4AF37', fontSize: '1.1rem' }}>{t(chef.name)}</div>
                <div style={{ color: '#C8B18D', fontSize: '0.85rem' }}>{t(chef.title)}</div>
              </div>
            </div>
          </div>

          <div>
            <span style={{ color: '#D4AF37', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              {lang === 'bn' ? 'রন্ধন দর্শন ও জীবনী' : 'Culinary Philosophy & Pedigree'}
            </span>
            <h2
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                fontSize: '2.4rem',
                color: '#F4EBDD',
                marginBottom: '1.5rem',
              }}
            >
              {lang === 'bn' ? 'ঐতিহ্যের প্রতি নিষ্ঠা ও গভীর মমত্ববোধ' : 'Preserving the Soul of Bengal’s Heritage Kitchen'}
            </h2>
            <p style={{ color: '#C8B18D', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {t(chef.bio)}
            </p>

            {chef.quote && (
              <blockquote
                style={{
                  borderLeft: '3px solid #D4AF37',
                  paddingLeft: '1.5rem',
                  margin: '2rem 0',
                  color: '#D4AF37',
                  fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t(chef.quote)}&rdquo;
              </blockquote>
            )}

            {accolades.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#F4EBDD', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  {lang === 'bn' ? 'স্বীকৃতি ও সম্মাননা' : 'Honors & Distinctions'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {accolades.map((acc, aIdx) => (
                    <div
                      key={aIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#223046',
                        borderRadius: '2px',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                      }}
                    >
                      <span style={{ color: '#D4AF37', fontSize: '1rem' }}>★</span>
                      <span style={{ color: '#F4EBDD', fontSize: '0.9rem' }}>{t(acc)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '3rem' }}>
              <button
                onClick={() => openReservation()}
                style={{
                  backgroundColor: '#A6533B',
                  color: '#F4EBDD',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#8c422e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#A6533B')}
              >
                {lang === 'bn' ? 'টেবিল সংরক্ষণ করুন' : 'Book Chef Table Experience'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

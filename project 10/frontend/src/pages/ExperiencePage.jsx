import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage() {
  const { content, lang, t, openReservation } = useCMS();
  const exp = content?.culturalExperiences || {};
  const experiences = exp.experiences || [];

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
            {t(exp.subtitle) || (lang === 'bn' ? 'বিশেষ ভোজন ও সাংস্কৃতিক উৎসব' : 'Special Dining Occasions')}
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
            {t(exp.title) || (lang === 'bn' ? 'ঐতিহ্যবাহী ভোজন ও উৎসবের আয়োজন' : 'Cultural Dining & Special Experiences')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {lang === 'bn'
              ? 'রাজকীয় জমিন্দারি থালি থেকে বৈঠকি শাস্ত্রীয় সঙ্গীতের সান্ধ্যভোজ—প্রতিটি মুহূর্ত এক অনন্য স্মৃতি।'
              : 'From 12-course Zamindari Royal Thalis to intimate courtyard baithaks with live sitar and sarod.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
          {experiences.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#223046',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '4px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(166, 83, 59, 0.25)',
                    color: '#D4AF37',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  {t(item.time)}
                </span>
                {item.price && (
                  <span style={{ color: '#F4EBDD', fontSize: '0.95rem', fontWeight: 700 }}>
                    {item.price}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                  fontSize: '1.6rem',
                  color: '#F4EBDD',
                  marginBottom: '1rem',
                  lineHeight: 1.3,
                }}
              >
                {t(item.title)}
              </h3>

              <p style={{ color: '#C8B18D', fontSize: '0.92rem', lineHeight: 1.7, flex: 1, marginBottom: '2rem' }}>
                {t(item.desc)}
              </p>

              <button
                onClick={() => openReservation()}
                style={{
                  backgroundColor: '#A6533B',
                  color: '#F4EBDD',
                  border: 'none',
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#8c422e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#A6533B')}
              >
                {lang === 'bn' ? 'এই ভোজ বুকিং করুন' : 'Reserve Experience'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

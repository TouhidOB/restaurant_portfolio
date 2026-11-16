import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SpacePage() {
  const { content, lang, t, openReservation } = useCMS();
  const arch = content?.architecture || {};
  const features = arch.features || [];

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
            {t(arch.subtitle) || (lang === 'bn' ? 'টেরাকোটা, সেগুন ও জামদানির বুনন' : 'Terracotta, Teak & Jamdani')}
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
            {t(arch.title) || (lang === 'bn' ? 'স্থাপত্যশৈলী ও ঐতিহ্যবাহী কারুকাজ' : 'Architecture, Materials & Craft')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {lang === 'bn'
              ? 'ঐতিহাসিক সোনারগাঁ ও কান্তজীউর অনুপ্রেরণায় পোড়ামাটি, সেগুন কাঠ ও ঐতিহ্যবাহী কাঁসার নিখুঁত মেলবন্ধন।'
              : 'Honoring Bengal’s courtyard dwellings with salvaged hundred-year-old timber, terracotta relief murals, and acoustic Jamdani weaves.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Architect Quote */}
        {arch.quote && (
          <div style={{ maxWidth: '800px', margin: '0 auto 5rem', textAlign: 'center' }}>
            <blockquote
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                fontSize: '1.65rem',
                fontStyle: 'italic',
                color: '#D4AF37',
                lineHeight: 1.6,
                margin: '0 0 1rem 0',
              }}
            >
              &ldquo;{t(arch.quote)}&rdquo;
            </blockquote>
            {arch.quote_author && (
              <div style={{ color: '#F4EBDD', fontSize: '0.95rem', fontWeight: 600 }}>
                &mdash; {t(arch.quote_author)}
              </div>
            )}
          </div>
        )}

        {/* Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
          {features.map((feat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#223046',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '4px',
                padding: '2.5rem 2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)')}
            >
              <div
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                  fontSize: '2.5rem',
                  color: 'rgba(212, 175, 55, 0.3)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  fontWeight: 700,
                }}
              >
                0{idx + 1}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#D4AF37', marginBottom: '1rem' }}>
                {t(feat.title)}
              </h3>
              <p style={{ color: '#C8B18D', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {t(feat.desc)}
              </p>
            </div>
          ))}
        </div>

        {/* Hero Visual Archive */}
        <div
          style={{
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            marginBottom: '5rem',
          }}
        >
          <img
            src={arch.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85'}
            alt="Bengal Architectural Sanctuary"
            style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
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
            {lang === 'bn' ? 'স্থাপত্য ভোজনশালায় আসন বুক করুন' : 'Book a Table in our Dining Hall'}
          </button>
        </div>
      </div>
    </div>
  );
}

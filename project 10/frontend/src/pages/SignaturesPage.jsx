import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage() {
  const { content, lang, t, openReservation, setSelectedDish } = useCMS();
  const signatures = content?.signatureDishes || {};
  const dishes = signatures.dishes || [];

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
            {t(signatures.subtitle) || (lang === 'bn' ? 'বাংলার স্বাক্ষর রন্ধনশিল্প' : 'Artisan Recipes of Bengal')}
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
            {t(signatures.title) || (lang === 'bn' ? 'স্বাক্ষর বাঙালি খাবারের সমাহার' : 'Signature Bengali Offerings')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {lang === 'bn'
              ? 'শতবর্ষের রন্ধন ঐতিহ্যের নিখুঁত উপস্থাপন—মাটির চুলার দম, শীল-নোড়ায় বাটা ঝাঁঝালো সরিষা ও তাজা নদীর ফসল।'
              : 'Our culinary masterworks reinterpreting ancestral culinary rituals with uncompromising authenticity and grace.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish, idx) => {
            const name = t(dish.name) || dish.name;
            const desc = t(dish.description) || dish.description;
            const price = dish.price ? (dish.price.includes('BDT') ? dish.price : `BDT ৳${dish.price}`) : '';
            const img = dish.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85';

            return (
              <div
                key={dish.id || idx}
                onClick={() => setSelectedDish(dish)}
                style={{
                  backgroundColor: '#223046',
                  borderRadius: '4px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={img}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {dish.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#A6533B',
                        color: '#F4EBDD',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        borderRadius: '2px',
                      }}
                    >
                      {t(dish.badge)}
                    </span>
                  )}
                  {price && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(26, 37, 54, 0.9)',
                        color: '#D4AF37',
                        padding: '4px 12px',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        borderRadius: '2px',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      {price}
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3
                      style={{
                        fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                        fontSize: '1.45rem',
                        color: '#F4EBDD',
                        fontWeight: 600,
                        lineHeight: 1.25,
                      }}
                    >
                      {name}
                    </h3>
                  </div>

                  <p style={{ color: '#C8B18D', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                    {desc}
                  </p>

                  {dish.ingredients && Array.isArray(dish.ingredients) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      {dish.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.72rem',
                            padding: '2px 8px',
                            backgroundColor: 'rgba(166, 83, 59, 0.2)',
                            color: '#D4AF37',
                            borderRadius: '2px',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                          }}
                        >
                          {t(ing)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            margin: '5rem auto 2rem',
            textAlign: 'center',
            padding: '3rem 2rem',
            backgroundColor: '#223046',
            borderRadius: '4px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}
        >
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '2.2rem',
              color: '#F4EBDD',
              marginBottom: '1rem',
            }}
          >
            {lang === 'bn' ? 'আমাদের সাথে অনন্য স্বাদের আনন্দ উপভোগ করুন' : 'Experience Our Royal Bengal Hospitality'}
          </h2>
          <p style={{ color: '#C8B18D', maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1.02rem', lineHeight: 1.7 }}>
            {lang === 'bn'
              ? 'ব্যক্তিগত জমিন্দারি স্যুইট বা ঐতিহাসিক প্রাঙ্গণে আপনার প্রিয়জনের সাথে বিশেষ স্মৃতি তৈরি করতে আজই টেবিল বুকিং করুন।'
              : 'Reserve your dining table in our Terracotta Hall or Zamindar Private Salon for an unforgettable journey through Bengal’s culinary heritage.'}
          </p>
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
            {lang === 'bn' ? 'টেবিল সংরক্ষণ করুন' : 'Reserve a Table'}
          </button>
        </div>
      </div>
    </div>
  );
}

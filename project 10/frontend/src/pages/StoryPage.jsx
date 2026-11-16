import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage() {
  const { content, lang, t, openReservation } = useCMS();
  const story = content?.brandStory || {};
  const hero = content?.hero || {};
  const pillars = story.pillars || [];

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
            {t(story.subtitle) || (lang === 'bn' ? 'আমাদের ঐতিহ্য ও গল্প' : 'Our Heritage, Our Story')}
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
            {t(story.title) || (lang === 'bn' ? 'প্রতিটি পদে শতবর্ষের ঐতিহ্যবাহী রন্ধনশিল্প' : 'Centuries of Culinary Artistry')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {t(hero.lead_description) || (lang === 'bn' ? 'বাঙালির সমৃদ্ধ স্বাদ, লোকগাঁথা ও আন্তরিক আতিথেয়তার এক অনন্য অভিজ্ঞতা।' : 'Discover the flavors, stories, and warmth of Bengali hospitality in a contemporary dining experience.')}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Narrative & Visual Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <span style={{ color: '#D4AF37', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              {t(story.badge) || 'Bengal Courtyard Architecture • Terracotta & Brass'}
            </span>
            <h2
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                fontSize: '2.4rem',
                marginBottom: '1.5rem',
                color: '#F4EBDD',
              }}
            >
              {lang === 'bn' ? 'বাংলার ঐতিহ্যের সাথে আধুনিক ভোজনের মেলবন্ধন' : 'Where Heritage Meets the Art of Dining'}
            </h2>
            <p style={{ color: '#C8B18D', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {t(story.body_paragraph_1)}
            </p>
            <p style={{ color: '#C8B18D', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {t(story.body_paragraph_2)}
            </p>

            {story.quote && (
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
                &ldquo;{t(story.quote)}&rdquo;
                {story.quote_author && (
                  <footer style={{ fontSize: '0.9rem', color: '#F4EBDD', marginTop: '0.5rem', fontStyle: 'normal', fontWeight: 600 }}>
                    &mdash; {t(story.quote_author)}
                  </footer>
                )}
              </blockquote>
            )}

            <button
              onClick={() => openReservation()}
              style={{
                backgroundColor: '#A6533B',
                color: '#F4EBDD',
                border: 'none',
                padding: '1rem 2.2rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#8c422e')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#A6533B')}
            >
              {lang === 'bn' ? 'টেবিল সংরক্ষণ করুন' : 'Reserve a Table'}
            </button>
          </div>

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
                src={story.image_main || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85'}
                alt="Bengal Heritage Courtyard"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(26, 37, 54, 0.95), transparent)',
                  color: '#F4EBDD',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#D4AF37' }}>Gulshan Heritage Enclave</div>
                <div style={{ color: '#C8B18D', fontSize: '0.8rem' }}>Reclaimed Burma teak &amp; handcrafted terracotta brick masonry</div>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Pillars */}
        {pillars.length > 0 && (
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: '#D4AF37', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {lang === 'bn' ? 'আমাদের ভিত্তি' : 'Core Foundations'}
              </span>
              <h2
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                  fontSize: '2.5rem',
                  marginTop: '0.5rem',
                  color: '#F4EBDD',
                }}
              >
                {lang === 'bn' ? 'রন্ধন ঐতিহ্যের তিন স্তম্ভ' : 'The Three Pillars of Bengal Gastronomy'}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#223046',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    padding: '2.5rem 2rem',
                    borderRadius: '4px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                      fontSize: '3rem',
                      color: 'rgba(212, 175, 55, 0.25)',
                      lineHeight: 1,
                      marginBottom: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#D4AF37', marginBottom: '1rem' }}>
                    {t(pillar.title)}
                  </h3>
                  <p style={{ color: '#C8B18D', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {t(pillar.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

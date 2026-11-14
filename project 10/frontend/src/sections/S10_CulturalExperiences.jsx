import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10_CulturalExperiences() {
  const { content, t, lang, openReservation } = useCMS();
  const exp = content?.culturalExperiences || {};

  const subtitle = t(exp.subtitle) || 'Special Dining Occasions';
  const title = t(exp.title) || 'Cultural Dining & Special Experiences';
  const experiences = exp.experiences || [];

  return (
    <section
      id="experiences"
      aria-label="Cultural Dining Experiences"
      style={{
        padding: '120px 0',
        backgroundColor: '#F4EBDD',
        color: 'var(--color-charcoal, #242321)',
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
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #A6533B)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        {/* 4 Cultural Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {experiences.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                border: '1px solid rgba(177, 138, 84, 0.28)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-terracotta, #A6533B)',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}
              >
                {t(item.time)}
              </div>
              <h3
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-indigo, #26344A)',
                  lineHeight: 1.25,
                  marginBottom: '12px',
                }}
              >
                {t(item.title)}
              </h3>
              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.65,
                  color: 'rgba(36, 35, 33, 0.8)',
                  marginBottom: '20px',
                  flex: 1,
                }}
              >
                {t(item.desc)}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(177, 138, 84, 0.2)',
                  paddingTop: '16px',
                  marginTop: 'auto',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--color-terracotta, #A6533B)',
                  }}
                >
                  {item.price}
                </div>
                <button
                  onClick={() => openReservation(t(item.title))}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(38, 52, 74, 0.08)',
                    color: 'var(--color-indigo, #26344A)',
                    border: '1px solid rgba(38, 52, 74, 0.25)',
                    borderRadius: '2px',
                    fontSize: '11.5px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-indigo, #26344A)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(38, 52, 74, 0.08)';
                    e.currentTarget.style.color = 'var(--color-indigo, #26344A)';
                  }}
                >
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Book Experience'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

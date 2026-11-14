import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10_SeasonalExperiences() {
  const { content, openReservation } = useCMS();
  const se = content?.seasonal_experiences || {};
  const experiences = se.experiences || [];

  return (
    <section
      id="experiences"
      aria-label="Seasonal Experiences and Workshops"
      style={{
        padding: '120px 0',
        backgroundColor: '#FAF7F0',
        color: '#292D29',
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
              color: 'var(--color-copper, #A87958)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {se.subtitle || 'CURATED WORKSHOPS & EVENINGS'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-forest)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {se.title || 'Signature Botanical Experiences'}
          </h2>
        </div>

        {/* 4 Cards Grid */}
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
                border: '1px solid rgba(38, 63, 53, 0.15)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(38, 63, 53, 0.04)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-copper)',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                {item.time}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  lineHeight: 1.25,
                  marginBottom: '12px',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.65,
                  color: 'rgba(41, 45, 41, 0.8)',
                  marginBottom: '20px',
                  flex: 1,
                }}
              >
                {item.desc}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(38, 63, 53, 0.1)',
                  paddingTop: '16px',
                  marginTop: 'auto',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--color-forest)' }}>
                  {item.price}
                </div>
                <button
                  onClick={() => openReservation(item.title)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(38, 63, 53, 0.08)',
                    color: 'var(--color-forest)',
                    border: '1px solid rgba(38, 63, 53, 0.25)',
                    borderRadius: '2px',
                    fontSize: '11.5px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-forest)';
                    e.currentTarget.style.color = '#FAF7F0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(38, 63, 53, 0.08)';
                    e.currentTarget.style.color = 'var(--color-forest)';
                  }}
                >
                  Book Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

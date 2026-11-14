import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_Atmosphere() {
  const { content } = useCMS();
  const atm = content?.atmosphere || {};
  const features = atm.features || [];

  return (
    <section
      id="atmosphere"
      aria-label="Botanical Atmosphere & Daylight Architecture"
      style={{
        padding: '110px 0',
        backgroundColor: 'var(--color-warm-cream, #F4F0E6)',
        color: '#292D29',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
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
            {atm.subtitle || 'LIGHT, SHADOW & FOLIAGE'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-forest)',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            {atm.title || 'The Botanical Daylight Experience'}
          </h2>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(41, 45, 41, 0.8)',
              margin: '0 auto',
            }}
          >
            {atm.description || 'How natural solar cycles, thermal glass, and biophilic acoustics shape your café ritual.'}
          </p>
        </div>

        {/* 3 Atmosphere Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '30px',
          }}
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '38px 30px',
                borderRadius: '3px',
                border: '1px solid rgba(38, 63, 53, 0.15)',
                boxShadow: '0 6px 20px rgba(38, 63, 53, 0.04)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '44px',
                  fontWeight: 700,
                  color: 'rgba(166, 181, 160, 0.45)',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {item.number || `0${idx + 1}`}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  marginBottom: '12px',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.7,
                  color: 'rgba(41, 45, 41, 0.8)',
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

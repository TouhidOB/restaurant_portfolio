import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function CulturePage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;

  const cultureSection = content?.editorial_sections?.s05_culture || {};
  const pillars = cultureSection.pillars || [
    {
      number: "01",
      title: "Bold Korean Flavors",
      korean: "진하고 매콤한 깊은 맛",
      desc: "Rich, multi-layered heat born from artisanal gochujang, toasted sesame oil, minced garlic, and caramelized leeks that awaken the senses."
    },
    {
      number: "02",
      title: "Made Fresh & Sizzling",
      korean: "주문 즉시 조리되는 신선함",
      desc: "No pre-cooked shortcuts. Rice cakes are braised to order, fried chicken hits the wok twice, and bowls arrive sizzling hot at your table."
    },
    {
      number: "03",
      title: "Night Pocha Atmosphere",
      korean: "언제나 활기찬 밤의 에너지",
      desc: "A sensory soundtrack of sizzling oil, clinking glasses, glowing magenta neon, and infectious urban camaraderie that runs until 4:00 AM."
    }
  ];

  return (
    <div style={{ backgroundColor: '#111316', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(27, 29, 34, 0.9) 0%, #111316 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 46, 136, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#FF2E88',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-condensed)',
            }}
          >
            {cultureSection.badge || 'OUR CULINARY MANIFESTO'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#FFFFFF',
              margin: '0.6rem 0 0.5rem',
              fontWeight: 800,
            }}
          >
            {cultureSection.title || 'Three Pillars of Seoul Street Gastronomy'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#FF2E88', margin: '1rem auto' }} />
          <p style={{ color: '#B6BAC2', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {cultureSection.description || 'What makes Korean street food a worldwide addiction? High heat, deep fermented depth, and unpretentious togetherness.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4.5rem auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#1B1D22',
                borderRadius: '8px',
                border: '1px solid rgba(246, 244, 240, 0.1)',
                borderTop: '3px solid #FF2E88',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#21D4E8', fontFamily: 'var(--font-display)' }}>
                  {pillar.number}
                </span>
                {pillar.korean && (
                  <span style={{ fontSize: '0.9rem', color: '#FFA1C9', fontFamily: 'var(--font-korean)', fontWeight: 700 }}>
                    {pillar.korean}
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                {pillar.title}
              </h3>
              <p style={{ color: '#B6BAC2', fontSize: '0.95rem', lineHeight: 1.7, flex: 1 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            backgroundColor: '#1B1D22',
            borderRadius: '8px',
            border: '1px solid rgba(255, 46, 136, 0.35)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
            Experience the Energy in Person
          </h2>
          <p style={{ color: '#B6BAC2', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
            From evening dinner service to 3:00 AM street food feasts with ice-cold soju carafes.
          </p>
          <button
            onClick={triggerReservation}
            style={{
              backgroundColor: '#FF2E88',
              color: '#FFFFFF',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(255, 46, 136, 0.4)',
            }}
          >
            Reserve Your Place
          </button>
        </div>
      </div>
    </div>
  );
}

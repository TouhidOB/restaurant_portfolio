import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08_OpenKitchen() {
  const { content } = useCMS();
  const kitData = content?.editorial_sections?.s08_kitchen || {
    badge: "BEHIND THE COUNTER",
    title: "MADE FRESH. SERVED HOT.",
    korean_title: "불꽃 위에서 완성되는 길거리 요리",
    description: "Our open kitchen is an unfiltered theater of heat, smoke, and speed. Searing wok flames, bubbling red cauldrons, and double-fried perfection in real time.",
    process_steps: [
      { step: "01", name: "Buldak & Gochujang Reduction", desc: "Simmered with Korean radish, kelp, and 3 types of chili flakes" },
      { step: "02", name: "12-Hour Marinade", desc: "Fresh chicken steeped in ginger, Korean pear, and sea salt" },
      { step: "03", name: "High-Heat Flash Wok", desc: "Locking in natural moisture with intense wok hei" }
    ]
  };

  return (
    <section id="kitchen" className="editorial-section" style={{ backgroundColor: '#0A0C0E' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {kitData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '6px',
            }}
          >
            {kitData.title}
          </h2>
          {kitData.korean_title && (
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: '1.2rem', color: 'var(--color-coral)', fontWeight: 700, marginBottom: '16px' }}>
              {kitData.korean_title}
            </div>
          )}
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
            {kitData.description}
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {kitData.process_steps && kitData.process_steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '12px',
                padding: '36px 28px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: 'var(--color-coral)',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {step.step}
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.45rem',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  lineHeight: 1.25,
                }}
              >
                {step.name}
              </h3>

              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_StreetFoodCulture() {
  const { content } = useCMS();
  const culData = content?.editorial_sections?.s05_culture || {
    badge: "OUR CULINARY MANIFESTO",
    title: "Three Pillars of Seoul Street Gastronomy",
    description: "What makes Korean street food a worldwide addiction? High heat, deep fermented depth, and unpretentious togetherness.",
    pillars: [
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
    ]
  };

  return (
    <section id="culture" className="editorial-section" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 4rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {culData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {culData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
            {culData.description}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {culData.pillars && culData.pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '12px',
                padding: '40px 32px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = idx % 2 === 0 ? 'var(--color-magenta)' : 'var(--color-cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  color: idx % 2 === 0 ? 'var(--color-magenta)' : 'var(--color-cyan)',
                  lineHeight: 1,
                  marginBottom: '14px',
                }}
              >
                {pillar.number}
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.6rem',
                  color: '#FFFFFF',
                  marginBottom: '4px',
                  lineHeight: 1.25,
                }}
              >
                {pillar.title}
              </h3>

              {pillar.korean && (
                <div
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '0.95rem',
                    color: 'var(--color-concrete)',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  {pillar.korean}
                </div>
              )}

              <p style={{ color: 'var(--color-silver)', fontSize: '0.94rem', lineHeight: 1.75, flex: 1 }}>
                {pillar.desc}
              </p>

              <div
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: idx % 2 === 0 ? 'var(--color-magenta)' : 'var(--color-cyan)',
                  marginTop: '24px',
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

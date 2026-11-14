import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_DiningPhilosophy() {
  const { content } = useCMS();
  const philData = content?.editorial_sections?.s05_philosophy || {
    badge: "OUR CULINARY MANIFESTO",
    title: "Three Pillars of Mediterranean Harmony",
    description: "True luxury on the Riviera is born from respect for natural rhythm and uncompromised ingredient integrity.",
    pillars: [
      {
        number: "01",
        title: "Dawn Catch & Coastal Terroir",
        desc: "Every morning at 05:30, our brigade meets artisanal skiffs arriving at Villefranche and Sanremo. Only wild, sustainably line-caught fish and shellfish enter our kitchen."
      },
      {
        number: "02",
        title: "The Art of Leisurely Dining",
        desc: "A meal at Villa Riviera cannot be hurried. We invite guests into the Mediterranean cadence of slow dining, where conversations linger beneath scented pine branches."
      },
      {
        number: "03",
        title: "Pure Architectural Balance",
        desc: "Food and atmosphere must resonate with identical grace. From custom hand-turned terracotta plates to linen woven in Lombardy, each detail mirrors our limestone architecture."
      }
    ]
  };

  return (
    <section id="philosophy" className="editorial-section" style={{ backgroundColor: 'var(--c-ivory)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {philData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {philData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
            {philData.description}
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
          {philData.pillars && philData.pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '40px 32px',
                border: '1px solid var(--c-border)',
                boxShadow: '0 8px 30px rgba(38, 58, 72, 0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(38, 58, 72, 0.09)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(38, 58, 72, 0.04)';
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.8rem',
                  fontWeight: 700,
                  color: 'var(--c-terracotta)',
                  lineHeight: 1,
                  marginBottom: '18px',
                }}
              >
                {pillar.number}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.65rem',
                  color: 'var(--c-navy)',
                  marginBottom: '14px',
                  lineHeight: 1.25,
                }}
              >
                {pillar.title}
              </h3>

              <p style={{ color: '#595752', fontSize: '0.94rem', lineHeight: 1.75, flex: 1 }}>
                {pillar.desc}
              </p>

              <div
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: 'var(--c-travertine)',
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

import React from 'react';
import { Layers } from 'lucide-react';

export default function InteriorSection({ interiorData }) {
  return (
    <section
      id="interior"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '720px', marginBottom: '56px' }}>
          <div className="eyebrow">THE ARCHITECTURE OF SPLENDOUR</div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--color-pearl)',
              marginBottom: '20px',
            }}
          >
            {interiorData.heading}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-pearl-muted)',
              lineHeight: 1.7,
            }}
          >
            {interiorData.description}
          </p>
        </div>

        {/* Asymmetrical Architectural Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Main Large Panoramic Image */}
          <div className="deco-frame" style={{ gridColumn: 'span 1', height: '480px', overflow: 'hidden' }}>
            <img
              src={interiorData.mainImage}
              alt="Grand Art Deco Dining Hall"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.92) contrast(1.08)',
              }}
            />
          </div>

          {/* Two Stacked Supporting Images */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="deco-frame" style={{ height: '224px', overflow: 'hidden' }}>
              <img
                src={interiorData.subImage1}
                alt="Intimate Seating & Chandelier"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="deco-frame" style={{ height: '224px', overflow: 'hidden' }}>
              <img
                src={interiorData.subImage2}
                alt="Art Deco Brass Screens"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* 4 Architectural Material Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            borderTop: '1px solid var(--color-border-gold-subtle)',
            paddingTop: '36px',
          }}
        >
          {interiorData.highlights.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="deco-diamond" />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '17px',
                    color: 'var(--color-gold)',
                  }}
                >
                  {item.label}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-pearl-muted)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

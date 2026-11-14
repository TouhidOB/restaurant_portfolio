import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03_Story() {
  const { content } = useCMS();
  const storyData = content?.editorial_sections?.s03_story || {
    chapter: "CHAPTER I — HERITAGE & ARCHITECTURE",
    title: "A Coastal Sanctuary Built from Stone & Light",
    quote: "The spirit of the Riviera is not merely a geography; it is the patient art of slow living, salt-washed stone, and sun-drenched honesty.",
    paragraphs: [
      "Carved into the limestone cliffs of Saint-Jean-Cap-Ferrat in 1928, Villa Riviera was envisioned as a private retreat where classical Mediterranean arches frame the shifting blues of the sea. Over nearly a century, the villa has remained an ode to genuine craftsmanship.",
      "Today, Villa Riviera stands as a living celebration of coastal culture. Here, culinary art and architectural purity intertwine: hand-chiseled stones collect the morning sun, gentle sea breezes move through arched colonnades, and every dish honors the fishermen and olive groves of the coastline."
    ],
    pillars_highlight: [
      { label: "Architectural Limestone", desc: "Sourced from historic Provençal quarries" },
      { label: "Estate Olive Trees", desc: "Centuries-old trees producing cold-pressed nectar" },
      { label: "Private Sea Pier", desc: "Direct tender access for arriving patrons" }
    ]
  };

  return (
    <section id="story" className="editorial-section" style={{ backgroundColor: 'var(--c-ivory)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '10px' }}>
            {storyData.chapter}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              lineHeight: 1.15,
              color: 'var(--c-navy)',
              marginBottom: '1.5rem',
            }}
          >
            {storyData.title}
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              backgroundColor: 'var(--c-terracotta)',
            }}
          />
        </div>

        {/* Narrative Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Editorial Quote */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid var(--c-border)',
              boxShadow: '0 8px 30px rgba(38, 58, 72, 0.05)',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '42px', color: 'var(--c-terracotta)', lineHeight: 1, marginBottom: '16px', fontFamily: "'Cormorant Garamond', serif" }}>
              “
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.45rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--c-navy)',
                marginBottom: '20px',
              }}
            >
              {storyData.quote}
            </p>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-terracotta)', fontWeight: 700 }}>
              Villa Riviera Architectural Chronicle
            </div>
          </div>

          {/* Right Column: Narrative Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {storyData.paragraphs && storyData.paragraphs.map((p, idx) => (
              <p key={idx} style={{ color: '#4A4641', fontSize: '1.02rem', lineHeight: 1.8 }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* 3 Pillars Highlight Card Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            borderTop: '1px solid var(--c-border)',
            paddingTop: '3rem',
          }}
        >
          {storyData.pillars_highlight && storyData.pillars_highlight.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid var(--c-border)',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
                {idx === 0 ? '🏛️' : idx === 1 ? '🌿' : '⚓'}
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--c-navy)', marginBottom: '6px' }}>
                {item.label}
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#6A635B', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

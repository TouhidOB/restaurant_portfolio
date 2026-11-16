import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const story = content?.editorial_sections?.s03_story || {};
  const hero = content?.editorial_sections?.s02_hero || {};
  const pillars = story.pillars_highlight || [
    { label: "Architectural Limestone", desc: "Sourced from historic Provençal quarries" },
    { label: "Estate Olive Trees", desc: "Centuries-old trees producing cold-pressed nectar" },
    { label: "Private Sea Pier", desc: "Direct tender access for arriving patrons" }
  ];

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.6) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {story.chapter || 'CHAPTER I — HERITAGE & ARCHITECTURE'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            {story.title || 'A Coastal Sanctuary Built from Stone & Light'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {story.quote || 'The spirit of the Riviera is not merely a geography; it is the patient art of slow living, salt-washed stone, and sun-drenched honesty.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Heritage Story Narrative */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <span style={{ color: '#B96F4F', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              SAINT-JEAN-CAP-FERRAT &bull; EST. 1928
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '2.5rem',
                lineHeight: 1.25,
                color: '#F7F3EA',
                marginBottom: '1.5rem',
              }}
            >
              Ninety-Eight Years of Coastal Harmony
            </h2>
            {(story.paragraphs || [
              "Carved into the limestone cliffs of Saint-Jean-Cap-Ferrat in 1928, Villa Riviera was envisioned as a private retreat where classical Mediterranean arches frame the shifting blues of the sea. Over nearly a century, the villa has remained an ode to genuine craftsmanship.",
              "Today, Villa Riviera stands as a living celebration of coastal culture. Here, culinary art and architectural purity intertwine: hand-chiseled stones collect the morning sun, gentle sea breezes move through arched colonnades, and every dish honors the fishermen and olive groves of the coastline."
            ]).map((p, idx) => (
              <p key={idx} style={{ color: '#E9DFCF', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                {p}
              </p>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', border: '1px solid rgba(233, 223, 207, 0.25)' }}>
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=85"
                alt="Villa Riviera Colonnade"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '-24px',
                background: '#263A48',
                border: '1px solid rgba(185, 111, 79, 0.4)',
                padding: '1.25rem 1.75rem',
                borderRadius: '4px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ fontWeight: 700, color: '#B96F4F' }}>Cap-Ferrat Coastal Promontory</div>
              <div style={{ color: '#E9DFCF', fontSize: '0.82rem' }}>Classic limestone arches overlooking the azure Mediterranean</div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#B96F4F', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              TIMELESS PILLARS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.4rem', color: '#F7F3EA', marginTop: '0.5rem' }}>
              The Architectural &amp; Gastronomic Foundations
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {pillars.map((pillar, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#1F303C',
                  border: '1px solid rgba(233, 223, 207, 0.2)',
                  borderRadius: '4px',
                  padding: '2.5rem 2rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#B96F4F', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  FOUNDATION 0{i + 1}
                </span>
                <h3 style={{ fontSize: '1.35rem', color: '#F7F3EA', marginBottom: '1rem', fontFamily: 'var(--font-display, "Cormorant Garamond")' }}>
                  {pillar.label}
                </h3>
                <p style={{ color: '#E9DFCF', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div
          style={{
            backgroundColor: '#1F303C',
            border: '1px solid rgba(185, 111, 79, 0.35)',
            borderRadius: '4px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.5rem', color: '#F7F3EA', marginBottom: '1rem' }}>
            Experience Villa Riviera in Daylight or Dusk
          </h2>
          <p style={{ color: '#E9DFCF', maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Join us for Daylight Lunch overlooking the turquoise bay or Twilight Coastal Dining beneath antique lanterns.
          </p>
          <button
            onClick={() => triggerReservation && triggerReservation()}
            style={{
              padding: '14px 34px',
              backgroundColor: '#B96F4F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '3px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Request Table Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

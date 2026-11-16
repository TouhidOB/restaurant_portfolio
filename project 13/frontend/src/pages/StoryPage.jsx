import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const story = content?.editorial_sections?.s03_story || {};

  const highlights = story.highlights || [
    { label: "Direct Gochujang Import", desc: "Sun-dried red peppers from Sunchang" },
    { label: "Double-Fired Crunch", desc: "Secret cornstarch & potato coating" },
    { label: "Late-Night Pocha", desc: "Open until 4:00 AM every single night" }
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
            {story.chapter || 'CHAPTER 01 — STREET CULTURE'}
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
            {story.title || 'The Raw Spirit of Seoul After Dark'}
          </h1>
          {story.korean_subtitle && (
            <div style={{ fontSize: '1.2rem', color: '#21D4E8', fontFamily: 'var(--font-korean)', marginBottom: '1.25rem' }}>
              {story.korean_subtitle}
            </div>
          )}
          <div style={{ width: '80px', height: '2px', background: '#FF2E88', margin: '1rem auto' }} />
          <p style={{ color: '#B6BAC2', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {story.quote || 'Seoul at 2 AM is not asleep; it is sizzling over red-hot charcoal, clinking soju glasses, and laughing amidst aromatic clouds of steam.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Narrative Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <span style={{ color: '#21D4E8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-condensed)' }}>
              AUTHENTIC POCHANGMACHA TRADITIONS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#FFFFFF', margin: '0.75rem 0 1.5rem', lineHeight: 1.2 }}>
              Democratic Vitality on the Streets of Hongdae
            </h2>
            {(story.paragraphs || [
              "Born from the neon-soaked backstreets of Hongdae and Euljiro, Seoul Street reimagines the traditional Korean pojangmacha (street food tent) for a new generation. We celebrate the raw, democratic vitality of Korean night markets where strangers sit elbow-to-elbow sharing steaming plates of spicy tteokbokki and crackling crispy chicken.",
              "Every sauce is fermented according to family traditions, every cut of chicken is double-fried for legendary crunch, and our open woks flash with fire all night long. This isn't fine-dining restraint—it is intense, craveable Korean street comfort."
            ]).map((p, idx) => (
              <p key={idx} style={{ color: '#B6BAC2', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                {p}
              </p>
            ))}

            {story.korean_phrase && (
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#1B1D22',
                  borderLeft: '4px solid #FF2E88',
                  borderRadius: '4px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-korean)', fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '4px' }}>
                  {story.korean_phrase}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#21D4E8', fontStyle: 'italic' }}>
                  {story.english_translation}
                </div>
              </div>
            )}
          </div>

          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 46, 136, 0.4)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)' }}>
            <img
              src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=85"
              alt="Hongdae Night Market Neon Streets"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Street Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {highlights.map((h, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#1B1D22',
                padding: '2rem',
                borderRadius: '6px',
                border: '1px solid rgba(246, 244, 240, 0.1)',
                borderTop: '3px solid #21D4E8',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {h.label}
              </h3>
              <p style={{ color: '#B6BAC2', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            padding: '3.5rem 2rem',
            backgroundColor: '#1B1D22',
            border: '1px solid rgba(255, 46, 136, 0.4)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
            Pull Up a Metal Stool at Seoul Street
          </h2>
          <p style={{ color: '#B6BAC2', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Join us for late-night street food, sizzling wok dishes, and iced soju cocktails under glowing neons until 04:00 AM.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={triggerReservation}
              style={{
                backgroundColor: '#FF2E88',
                color: '#FFFFFF',
                padding: '12px 32px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Reserve a Table
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/menu')}
              style={{
                backgroundColor: 'transparent',
                color: '#21D4E8',
                border: '1px solid rgba(33, 212, 232, 0.4)',
                padding: '12px 26px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Explore Full Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

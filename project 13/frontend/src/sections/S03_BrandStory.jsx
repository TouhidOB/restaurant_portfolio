import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03_BrandStory() {
  const { content } = useCMS();
  const storyData = content?.editorial_sections?.s03_story || {
    chapter: "CHAPTER 01 — STREET CULTURE",
    title: "The Raw Spirit of Seoul After Dark",
    korean_subtitle: "골목길 포장마차의 기억과 현대적인 감각의 만남",
    quote: "Seoul at 2 AM is not asleep; it is sizzling over red-hot charcoal, clinking soju glasses, and laughing amidst aromatic clouds of steam.",
    paragraphs: [
      "Born from the neon-soaked backstreets of Hongdae and Euljiro, Seoul Street reimagines the traditional Korean pojangmacha (street food tent) for a new generation. We celebrate the raw, democratic vitality of Korean night markets where strangers sit elbow-to-elbow sharing steaming plates of spicy tteokbokki and crackling crispy chicken.",
      "Every sauce is fermented according to family traditions, every cut of chicken is double-fried for legendary crunch, and our open woks flash with fire all night long. This isn't fine-dining restraint—it is intense, craveable Korean street comfort."
    ],
    korean_phrase: "맛있게 드세요! 밤은 아직 끝나지 않았다.",
    english_translation: "\"Enjoy your meal! The night is far from over.\"",
    highlights: [
      { label: "Direct Gochujang Import", desc: "Sun-dried red peppers from Sunchang" },
      { label: "Double-Fired Crunch", desc: "Secret cornstarch & potato coating" },
      { label: "Late-Night Pocha", desc: "Open until 4:00 AM every single night" }
    ]
  };

  return (
    <section id="story" className="editorial-section" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '10px' }}>
            {storyData.chapter}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              lineHeight: 1.15,
              color: '#F6F4F0',
              marginBottom: '8px',
            }}
          >
            {storyData.title}
          </h2>
          {storyData.korean_subtitle && (
            <div
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: '1.2rem',
                color: 'var(--color-cyan)',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              {storyData.korean_subtitle}
            </div>
          )}
          <div
            style={{
              width: '60px',
              height: '3px',
              backgroundColor: 'var(--color-magenta)',
              boxShadow: '0 0 10px var(--color-magenta)',
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
          {/* Left Column: Stylized Quote Card */}
          <div
            style={{
              backgroundColor: 'var(--color-charcoal)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '46px', color: 'var(--color-magenta)', lineHeight: 1, marginBottom: '14px', fontFamily: "'Space Grotesk', sans-serif" }}>
              “
            </div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.35rem',
                lineHeight: 1.5,
                color: '#FFFFFF',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              {storyData.quote}
            </p>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.85rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-cyan)', fontWeight: 700 }}>
              Seoul Street Pocha Manifesto
            </div>
          </div>

          {/* Right Column: Narrative Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {storyData.paragraphs && storyData.paragraphs.map((p, idx) => (
              <p key={idx} style={{ color: 'var(--color-silver)', fontSize: '1.02rem', lineHeight: 1.8 }}>
                {p}
              </p>
            ))}

            {/* Korean Phrase Banner */}
            {storyData.korean_phrase && (
              <div
                style={{
                  background: 'rgba(255, 46, 136, 0.12)',
                  borderLeft: '4px solid var(--color-magenta)',
                  padding: '16px 20px',
                  borderRadius: '0 8px 8px 0',
                  marginTop: '10px',
                }}
              >
                <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-white)', marginBottom: '4px' }}>
                  {storyData.korean_phrase}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-silver)', fontStyle: 'italic' }}>
                  {storyData.english_translation}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Highlights Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '3rem',
          }}
        >
          {storyData.highlights && storyData.highlights.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-charcoal)',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
                {idx === 0 ? '🌶️' : idx === 1 ? '🍗' : '🏮'}
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '6px' }}>
                {item.label}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-silver)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

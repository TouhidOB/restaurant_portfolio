import React from 'react';
import { useCMS } from '../context/CMSContext';
import HeroScene from '../components/three/HeroScene';

export default function S02_Hero() {
  const { content, t, lang, openReservation } = useCMS();
  const hero = content?.hero || {};

  const restaurantName = t(hero.restaurant_name) || 'BENGAL HERITAGE DINING';
  const eyebrow = t(hero.eyebrow) || 'A TASTE OF BENGAL';
  const title = t(hero.title) || 'Where Heritage Meets the Art of Dining.';
  const tagline = t(hero.tagline) || 'Traditional Bengal Reinterpreted Through Contemporary Luxury';
  const leadDesc = t(hero.lead_description) || '';
  const ctaPrimary = t(hero.cta_primary_text) || (lang === 'bn' ? 'মেনু দেখুন' : 'Explore Our Menu');
  const ctaSecondary = t(hero.cta_secondary_text) || (lang === 'bn' ? 'আমাদের গল্প' : 'Discover Our Story');
  const stats = hero.stats || [];

  return (
    <section
      id="hero"
      aria-label="Bengal Heritage Dining Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '90px',
        paddingBottom: '60px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #181c24 0%, #26344A 45%, #1d1816 100%)',
        color: '#F4EBDD',
      }}
    >
      {/* 3D Riverine & Terracotta Canvas Background */}
      <HeroScene />

      {/* Hero Content Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        {/* Cultural Eyebrow Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(166, 83, 59, 0.22)',
            border: '1px solid rgba(177, 138, 84, 0.45)',
            padding: '6px 14px',
            borderRadius: '2px',
            marginBottom: '18px',
            backdropFilter: 'blur(6px)',
          }}
        >
          <span style={{ color: 'var(--color-brass, #B18A54)', fontSize: '13px' }}>ঐ</span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--color-bg-ivory, #F4EBDD)',
            }}
          >
            {eyebrow}
          </span>
          <span style={{ color: 'var(--color-brass, #B18A54)', fontSize: '12px' }}>•</span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--color-brass, #B18A54)',
              fontWeight: 500,
            }}
          >
            {tagline}
          </span>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: '#F4EBDD',
            maxWidth: '920px',
            margin: '0 0 16px 0',
            textShadow: '0 4px 18px rgba(0, 0, 0, 0.6)',
          }}
        >
          {title}
        </h1>

        {/* Subtitle / Description */}
        <p
          style={{
            fontFamily: lang === 'bn' ? 'var(--font-bengali-body)' : 'var(--font-body)',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            lineHeight: 1.7,
            color: 'rgba(244, 235, 221, 0.88)',
            maxWidth: '680px',
            margin: '0 0 32px 0',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
          }}
        >
          {leadDesc}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '50px',
          }}
        >
          <a
            href="#menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 28px',
              backgroundColor: 'var(--color-terracotta, #A6533B)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(166, 83, 59, 0.35)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8c422d';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-terracotta, #A6533B)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {ctaPrimary}
          </a>

          <button
            onClick={() => openReservation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 28px',
              backgroundColor: 'rgba(177, 138, 84, 0.2)',
              color: 'var(--color-brass, #B18A54)',
              border: '1px solid rgba(177, 138, 84, 0.55)',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(177, 138, 84, 0.35)';
              e.currentTarget.style.color = '#F4EBDD';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(177, 138, 84, 0.2)';
              e.currentTarget.style.color = 'var(--color-brass, #B18A54)';
            }}
          >
            {lang === 'bn' ? 'টেবিল বুকিং' : 'Book a Table'}
          </button>

          <a
            href="#story"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 24px',
              backgroundColor: 'transparent',
              color: 'rgba(244, 235, 221, 0.8)',
              border: '1px solid rgba(244, 235, 221, 0.2)',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 235, 221, 0.6)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 235, 221, 0.2)';
              e.currentTarget.style.color = 'rgba(244, 235, 221, 0.8)';
            }}
          >
            {ctaSecondary}
          </a>
        </div>

        {/* 4 Architectural & Heritage Stats Cards */}
        {stats.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              width: '100%',
              maxWidth: '1000px',
              borderTop: '1px solid rgba(177, 138, 84, 0.3)',
              paddingTop: '24px',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(24, 28, 36, 0.55)',
                  border: '1px solid rgba(177, 138, 84, 0.25)',
                  padding: '16px 20px',
                  borderRadius: '2px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: 'var(--color-brass, #B18A54)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    color: 'rgba(244, 235, 221, 0.75)',
                    lineHeight: 1.4,
                  }}
                >
                  {t(stat.label)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

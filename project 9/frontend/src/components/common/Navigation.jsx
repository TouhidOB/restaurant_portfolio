import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, openReservation } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#story' },
    { label: '3D Rooftop Tour', href: '#tour' },
    { label: 'Spaces', href: '#spaces' },
    { label: 'Signature Dishes', href: '#dishes' },
    { label: 'Menu', href: '#menu' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Coordinates', href: '#location' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(16, 28, 44, 0.94)' : 'rgba(10, 18, 29, 0.65)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid rgba(255, 255, 255, 0.05)',
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
        {/* Brand Crest & Title */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, var(--color-skyline-blue) 0%, var(--color-midnight-card) 100%)',
              border: '1px solid var(--color-border)',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--color-cloud-ivory)',
                letterSpacing: '0.12em',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {content?.hero?.restaurant_name || 'SKYLINE'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '0.68rem',
                color: 'var(--color-champagne)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '2px',
              }}
            >
              LEVEL 54 &bull; 220M
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--color-cloud-ivory)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-accent)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-cloud-ivory)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs: CMS Studio Quick Pill & Table Booking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(38, 63, 90, 0.45)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.74rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-warm-amber)' }} />
            CMS Studio
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-skyline-primary"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.8rem' }}
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}

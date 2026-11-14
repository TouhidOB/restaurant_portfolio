import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, openReservationModal } = useCMS();
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
    { label: 'Story', href: '#story' },
    { label: '3D Tour', href: '#tour' },
    { label: 'Culture', href: '#culture' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'Full Menu', href: '#menu' },
    { label: 'Kitchen', href: '#kitchen' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(17, 19, 22, 0.95)' : 'rgba(17, 19, 22, 0.55)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(255, 46, 136, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              backgroundColor: '#1B1D22',
              border: '1px solid #FF2E88',
              boxShadow: '0 0 10px rgba(255, 46, 136, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#21D4E8',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: '14px',
              fontWeight: 800,
            }}
          >
            포차
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.25rem',
                letterSpacing: '0.08em',
                fontWeight: 800,
                color: '#F6F4F0',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {content?.restaurant_name || 'SEOUL STREET'}
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'var(--color-cyan)',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '3px',
                fontWeight: 700,
              }}
            >
              Hongdae • Seoul
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav style={{ display: 'none', gap: '22px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: '#F6F4F0',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-magenta)')}
              onMouseLeave={(e) => (e.target.style.color = '#F6F4F0')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* CMS Studio Pill Shortcut */}
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Decoupled CMS Studio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 46, 136, 0.4)',
              color: '#F6F4F0',
              textDecoration: 'none',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 700,
              fontFamily: "'Barlow Condensed', sans-serif",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-magenta)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 46, 136, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#21D4E8', boxShadow: '0 0 6px #21D4E8', display: 'inline-block' }} />
            CMS Studio
          </a>

          {/* Reserve Table CTA */}
          <button
            onClick={openReservationModal}
            className="btn-primary"
            style={{ padding: '0.65rem 1.3rem', fontSize: '0.78rem' }}
          >
            Reserve Table
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              color: '#F6F4F0',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#1B1D22',
            borderBottom: '2px solid #FF2E88',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#F6F4F0',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cms/"
            target="_blank"
            style={{
              color: 'var(--color-cyan)',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#21D4E8' }} />
            Open CMS Studio
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

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
    { label: '3D Villa Tour', href: '#tour' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'Menu', href: '#menu' },
    { label: 'Architecture', href: '#architecture' },
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
        backgroundColor: scrolled ? 'rgba(38, 58, 72, 0.94)' : 'rgba(38, 58, 72, 0.45)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(185, 111, 79, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: scrolled ? '14px 0' : '20px 0',
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
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '1px solid #E9DFCF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F7F3EA',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            VR
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.35rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                color: '#F7F3EA',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {content?.site_config?.site_title || 'VILLA RIVIERA'}
            </span>
            <span
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.18em',
                color: '#A9BDB5',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '3px',
              }}
            >
              Cap-Ferrat
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: '#F7F3EA',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#B96F4F')}
              onMouseLeave={(e) => (e.target.style.color = '#F7F3EA')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(233, 223, 207, 0.3)',
              color: '#F7F3EA',
              textDecoration: 'none',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--c-terracotta)';
              e.currentTarget.style.borderColor = 'var(--c-terracotta)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(233, 223, 207, 0.3)';
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            CMS Studio
          </a>

          {/* Reserve Table CTA */}
          <button
            onClick={openReservationModal}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.75rem' }}
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
              color: '#F7F3EA',
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
            backgroundColor: '#263A48',
            borderBottom: '2px solid #B96F4F',
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
                color: '#F7F3EA',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
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
              color: '#FFD2B8',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
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

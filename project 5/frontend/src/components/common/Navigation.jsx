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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'SIGNATURES', href: '#signatures' },
    { label: 'MENU', href: '#menu' },
    { label: 'ARCHITECTURE', href: '#architecture' },
    { label: '3D TOUR', href: '#tour' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'ARCHIVE', href: '#gallery' },
    { label: 'CONTACT', href: '#location' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          zIndex: 1000,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
          backgroundColor: scrolled ? 'rgba(26, 47, 37, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(61, 97, 78, 0.6)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="container-tropical"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                backgroundColor: 'var(--accent-terracotta)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(188, 113, 83, 0.3)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-ivory)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                VERDANT
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: 'var(--sage-mist)',
                  display: 'block',
                  marginTop: '0.2rem',
                }}
              >
                TROPICAL MODERN
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.6rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-sand)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-terracotta)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-sand)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {/* Direct CMS Studio Link */}
            <a
              href="/cms/"
              target="_blank"
              rel="noopener noreferrer"
              title="Access Decoupled Django CMS Studio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                color: 'var(--accent-citrus)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(217, 184, 78, 0.4)',
                backgroundColor: 'rgba(217, 184, 78, 0.08)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(217, 184, 78, 0.2)';
                e.currentTarget.style.borderColor = 'var(--accent-citrus)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(217, 184, 78, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(217, 184, 78, 0.4)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>CMS STUDIO</span>
            </a>

            {/* Reserve Table Button */}
            <button
              onClick={openReservation}
              className="btn-terracotta"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.85rem',
              }}
            >
              <span>RESERVE TABLE</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '32px',
                height: '32px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                zIndex: 1001,
              }}
            >
              <span
                style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--text-ivory)',
                  transition: 'all 0.3s ease',
                  transform: mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
                }}
              />
              <span
                style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--text-ivory)',
                  transition: 'all 0.3s ease',
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--text-ivory)',
                  transition: 'all 0.3s ease',
                  transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#1A2F25',
          borderLeft: '1px solid var(--border-botanical)',
          zIndex: 999,
          padding: '6rem 2.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: mobileMenuOpen ? '-12px 0 32px rgba(0, 0, 0, 0.45)' : 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--sage-mist)',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}
          >
            NAVIGATION INDEX
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: 'var(--text-ivory)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-botanical)', paddingTop: '2rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}
          >
            {content?.restaurant?.address || '840 Palm Grove Way, Tropical Corridor'}
            <br />
            {content?.restaurant?.opening_hours_summary || 'TUE — SUN / 12:00 — 23:30'}
          </p>
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '0.75rem',
              border: '1px solid var(--accent-citrus)',
              color: 'var(--accent-citrus)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            OPEN CMS STUDIO (DJANGO)
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

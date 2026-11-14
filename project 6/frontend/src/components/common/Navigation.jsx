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
    { label: 'STORY', href: '#story' },
    { label: 'ARCHITECTURE', href: '#architecture' },
    { label: '3D TOUR', href: '#tour' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#location' },
  ];

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
          transition: 'background-color 0.28s ease, backdrop-filter 0.28s ease, border-color 0.28s ease',
          backgroundColor: scrolled ? 'rgba(9, 15, 27, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(36, 53, 82, 0.8)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="container-diner"
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
                backgroundColor: 'var(--cherry-red)',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 14px rgba(216, 58, 69, 0.55)',
                color: '#FFF',
                fontSize: '1.2rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              ★
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  display: 'block',
                  lineHeight: 1,
                  textShadow: '0 0 12px rgba(67, 217, 232, 0.3)',
                }}
              >
                STARDUST
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: 'var(--neon-cyan)',
                  display: 'block',
                  marginTop: '0.2rem',
                }}
              >
                RETRO-FUTURISTIC DINER
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-cream)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-cream)')}
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
                color: 'var(--atomic-yellow)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(242, 201, 76, 0.4)',
                backgroundColor: 'rgba(242, 201, 76, 0.08)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(242, 201, 76, 0.2)';
                e.currentTarget.style.borderColor = 'var(--atomic-yellow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(242, 201, 76, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(242, 201, 76, 0.4)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>CMS STUDIO</span>
            </a>

            {/* Book Table Button */}
            <button
              onClick={openReservation}
              className="btn-cherry"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.85rem',
              }}
            >
              <span>BOOK TABLE</span>
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

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#090F1B',
          borderLeft: '1px solid var(--border-diner)',
          zIndex: 999,
          padding: '6rem 2.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: mobileMenuOpen ? '-12px 0 32px rgba(0, 0, 0, 0.65)' : 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--neon-cyan)',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}
          >
            ATOMIC DINER INDEX
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem',
                color: 'var(--text-ivory)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-diner)', paddingTop: '2rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}
          >
            {content?.restaurant?.address || '550 Neon Boulevard, Atomic District'}
            <br />
            {content?.restaurant?.opening_hours_summary || 'MON — SUN / 08:00 — 02:00'}
          </p>
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '0.75rem',
              border: '1px solid var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-xs)',
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

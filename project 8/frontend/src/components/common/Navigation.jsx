import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, openReservation } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    { label: 'Experience', href: '#experience' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'Menu', href: '#menu' },
    { label: 'Space', href: '#interior' },
    { label: 'The Chef', href: '#chef' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  const brandName = content?.hero?.restaurant_name || 'URBAN TABLE';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(17, 19, 20, 0.96)' : 'rgba(17, 19, 20, 0.65)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '2px solid var(--color-brick)' : '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Crest & Title */}
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
              borderRadius: '2px',
              background: 'linear-gradient(135deg, var(--color-brick) 0%, var(--color-black) 100%)',
              border: '1px solid var(--color-copper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-copper)',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
            }}
          >
            UT
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-offwhite)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {brandName}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'var(--color-copper)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Kitchen • Smokehouse • Fire
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.6rem',
          }}
          className="desktop-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--color-concrete)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-copper)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-concrete)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls (CMS Studio + Reservation CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '2px',
              border: '1px solid var(--color-border)',
              color: 'var(--color-copper)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title="Open Django CMS Studio"
          >
            <span>⚙ CMS Studio</span>
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.78rem',
            }}
          >
            Reserve Table
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-offwhite)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'none',
              padding: '0.4rem',
            }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            width: '100%',
            backgroundColor: '#111314',
            borderBottom: '2px solid var(--color-brick)',
            padding: '1.5rem 2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--color-offwhite)',
                textDecoration: 'none',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-copper)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            ⚙ Open Django CMS Studio
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-links {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

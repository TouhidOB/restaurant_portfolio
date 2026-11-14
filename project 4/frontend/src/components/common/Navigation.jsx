import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, openReservation } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. INTRO', href: '#intro' },
    { label: '02. PHILOSOPHY', href: '#philosophy' },
    { label: '03. SIGNATURES', href: '#signatures' },
    { label: '04. MENU', href: '#menu' },
    { label: '05. SPACE', href: '#architecture' },
    { label: '06. 3D TOUR', href: '#tour' },
    { label: '07. ARCHIVE', href: '#gallery' },
    { label: '08. INQUIRIES', href: '#faq' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-height)',
        backgroundColor: isScrolled ? 'rgba(32, 33, 31, 0.96)' : 'rgba(32, 33, 31, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-steel)',
        transition: 'background-color 0.2s',
      }}
    >
      <div
        className="container-brutal"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '18px',
              height: '24px',
              backgroundColor: 'var(--accent-orange)',
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              MONOLITH
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginTop: '0.2rem',
              }}
            >
              SECTOR 09 // 40.7128° N
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
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
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="/cms/"
            style={{
              display: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-orange)',
              border: '1px solid var(--border-steel)',
              padding: '0.55rem 0.9rem',
              transition: 'border-color var(--transition-fast)',
            }}
            className="cms-link-desktop"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-steel)')}
          >
            CMS STUDIO
          </a>

          <button
            type="button"
            onClick={openReservation}
            className="btn-orange"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.8rem',
            }}
          >
            RESERVE
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '28px',
              height: '18px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            <span style={{ width: '100%', height: '2px', background: 'var(--text-primary)' }} />
            <span style={{ width: '100%', height: '2px', background: 'var(--text-primary)' }} />
            <span style={{ width: '100%', height: '2px', background: 'var(--text-primary)' }} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-dark)',
            borderBottom: '2px solid var(--accent-orange)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cms/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--accent-orange)',
              marginTop: '0.5rem',
            }}
          >
            &rarr; CMS STUDIO
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .cms-link-desktop { display: inline-block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}

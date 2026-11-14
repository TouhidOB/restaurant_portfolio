import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { content, openReservation } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cafeName = content?.cafe_name || 'VERDANT ATRIUM';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Virtual Tour', href: '#tour' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Signature Drinks', href: '#drinks' },
    { label: 'Menu', href: '#menu' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit Us', href: '#location' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        height: 'var(--nav-height, 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        backgroundColor: scrolled ? 'rgba(26, 43, 36, 0.94)' : 'rgba(26, 43, 36, 0.72)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#FAF7F0',
          }}
        >
          <span style={{ fontSize: '22px' }}>🌿</span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                textTransform: 'uppercase',
                lineHeight: 1.1,
              }}
            >
              VERDANT ATRIUM
            </div>
            <div
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-sage)',
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              Botanical Glasshouse Café
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'rgba(250, 247, 240, 0.82)',
                textDecoration: 'none',
                fontSize: '12.5px',
                letterSpacing: '0.06em',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#A6B5A0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250, 247, 240, 0.82)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* CMS Studio Link */}
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '7px 14px',
              backgroundColor: 'rgba(166, 181, 160, 0.15)',
              border: '1px solid rgba(166, 181, 160, 0.35)',
              color: 'var(--color-sage)',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: '11.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-sage)';
              e.currentTarget.style.color = '#1A2B24';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(166, 181, 160, 0.15)';
              e.currentTarget.style.color = 'var(--color-sage)';
            }}
          >
            ⚙ CMS Studio
          </a>

          {/* Book Table */}
          <button
            onClick={() => openReservation()}
            style={{
              padding: '9px 18px',
              backgroundColor: 'var(--color-forest)',
              border: '1px solid var(--color-copper)',
              color: '#FAF7F0',
              borderRadius: '2px',
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(168, 121, 88, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-copper)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-forest)';
              e.currentTarget.style.color = '#FAF7F0';
            }}
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}

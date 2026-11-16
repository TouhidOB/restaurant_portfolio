import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;

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
    { label: 'Story', path: '/story', hash: '#story' },
    { label: 'Signatures', path: '/signatures', hash: '#signatures' },
    { label: 'Menu', path: '/menu', hash: '#menu' },
    { label: '3D Villa Tour', path: '/tour', hash: '#tour' },
    { label: 'Architecture', path: '/architecture', hash: '#architecture' },
    { label: 'Chef & Artisans', path: '/chef', hash: '#chef' },
    { label: 'Experiences', path: '/experiences', hash: '#experiences' },
    { label: 'Gazette', path: '/blog', hash: '/blog' },
    { label: 'Contact', path: '/contact', hash: '#location' },
  ];

  const handleLinkClick = (e, link) => {
    if (onNavigate) {
      e.preventDefault();
      setMobileMenuOpen(false);
      onNavigate(link.path);
    }
  };

  const handleLogoClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/');
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(24, 37, 46, 0.95)' : 'rgba(38, 58, 72, 0.65)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(185, 111, 79, 0.35)' : '1px solid rgba(233, 223, 207, 0.15)',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Brand Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid #E9DFCF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F7F3EA',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '15px',
              fontWeight: 700,
              backgroundColor: 'rgba(185, 111, 79, 0.2)',
            }}
          >
            VR
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.4rem',
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
                letterSpacing: '0.2em',
                color: '#A9BDB5',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '3px',
              }}
            >
              Saint-Jean-Cap-Ferrat
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  color: isActive ? '#B96F4F' : '#F7F3EA',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                  borderBottom: isActive ? '1px solid #B96F4F' : '1px solid transparent',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#B96F4F')}
                onMouseLeave={(e) => (e.target.style.color = isActive ? '#B96F4F' : '#F7F3EA')}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* CMS Studio Shortcut */}
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Decoupled CMS Studio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(233, 223, 207, 0.25)',
              color: '#F7F3EA',
              textDecoration: 'none',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#B96F4F';
              e.currentTarget.style.borderColor = '#B96F4F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(233, 223, 207, 0.25)';
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            CMS Studio
          </a>

          {/* Reserve Table CTA */}
          <button
            onClick={() => triggerReservation && triggerReservation()}
            className="btn-reserve-nav"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.75rem',
              backgroundColor: '#B96F4F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '3px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#9E5B3D')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#B96F4F')}
          >
            Reserve Table
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
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
            backgroundColor: '#18252E',
            borderBottom: '1px solid rgba(185, 111, 79, 0.3)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link)}
              style={{
                color: '#F7F3EA',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: '10px', paddingTop: '14px', borderTop: '1px solid rgba(233, 223, 207, 0.15)', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (triggerReservation) triggerReservation();
              }}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#B96F4F',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '3px',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
              }}
            >
              Reserve Table
            </button>
            <a
              href="/cms/"
              target="_blank"
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#F7F3EA',
                borderRadius: '3px',
                fontSize: '0.8rem',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              CMS
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

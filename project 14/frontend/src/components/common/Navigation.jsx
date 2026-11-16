import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { data, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
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
    { label: '3D Tour', path: '/tour', hash: '#tour' },
    { label: 'Philosophy', path: '/philosophy', hash: '#philosophy' },
    { label: 'Signatures', path: '/signatures', hash: '#signature-steaks' },
    { label: 'Menu Explorer', path: '/menu', hash: '#menu' },
    { label: 'The Hearth', path: '/hearth', hash: '#hearth' },
    { label: 'Private Salons', path: '/private-dining', hash: '#private-dining' },
    { label: 'Gazette', path: '/blog', hash: '/blog' },
    { label: 'Location', path: '/contact', hash: '#location' },
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
        zIndex: 500,
        transition: 'all 0.35s ease',
        backgroundColor: scrolled ? 'rgba(16, 16, 16, 0.94)' : 'rgba(16, 16, 16, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(148, 115, 79, 0.25)' : '1px solid rgba(148, 115, 79, 0.1)',
        padding: scrolled ? '14px 32px' : '20px 32px'
      }}
    >
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <a href="/" onClick={handleLogoClick} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            letterSpacing: '2.5px',
            fontWeight: 600,
            color: 'var(--color-ivory)'
          }}>
            CHARRED <span style={{ color: 'var(--color-bronze)' }}>&</span> PRIME
          </span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '9px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'var(--color-champagne)'
          }}>
            STEAKHOUSE • NEW YORK
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '22px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-champagne)' : 'var(--color-taupe)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                  borderBottom: isActive ? '1px solid var(--color-champagne)' : '1px solid transparent',
                  paddingBottom: '2px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--color-champagne)' : 'var(--color-taupe)')}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="/cms/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              background: 'rgba(148, 115, 79, 0.12)',
              border: '1px solid var(--border-subtle)',
              padding: '8px 14px',
              borderRadius: '2px',
              textDecoration: 'none'
            }}
          >
            <Shield size={13} />
            CMS Studio
          </a>

          <button
            onClick={() => triggerReservation()}
            className="btn-prime btn-reserve-nav"
            style={{
              padding: '9px 20px',
              fontSize: '11px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              background: 'var(--color-bronze)',
              color: '#101010',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            Reserve Table
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              color: 'var(--color-ivory)',
              cursor: 'pointer'
            }}
            className="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(16, 16, 16, 0.98)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: currentPath === link.path ? 'var(--color-champagne)' : 'var(--color-ivory)',
                textDecoration: 'none'
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cms/"
            style={{
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <Shield size={14} /> Open CMS Studio
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { data, openReservation } = useCMS();
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
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Signature Steaks', href: '#signature-steaks' },
    { label: 'Menu Explorer', href: '#menu' },
    { label: 'The Hearth', href: '#hearth' },
    { label: 'Private Salons', href: '#private-dining' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        transition: 'all 0.35s ease',
        backgroundColor: scrolled ? 'rgba(16, 16, 16, 0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(148, 115, 79, 0.2)' : '1px solid transparent',
        padding: scrolled ? '14px 32px' : '22px 32px'
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
        <a href="#" style={{ display: 'flex', flexDirection: 'column' }}>
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
        <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                color: 'var(--color-taupe)',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-taupe)')}
            >
              {link.label}
            </a>
          ))}
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
              borderRadius: '2px'
            }}
          >
            <Shield size={13} />
            CMS Studio
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-prime"
            style={{ padding: '9px 20px', fontSize: '11px' }}
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
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--color-ivory)'
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
              gap: '6px'
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

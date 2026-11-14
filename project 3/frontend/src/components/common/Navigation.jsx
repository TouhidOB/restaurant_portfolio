import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { data, setIsReservationModalOpen } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = data.settings?.brand_name || "AURA MARINA";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Heritage", href: "#story" },
    { label: "3D Tour", href: "#tour" },
    { label: "Spaces", href: "#spaces" },
    { label: "Menu", href: "#menu" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.35s ease',
        padding: scrolled ? '12px 0' : '22px 0',
        backgroundColor: scrolled ? 'rgba(250, 249, 245, 0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200, 182, 155, 0.3)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(23, 74, 99, 0.05)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Monogram & Wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#174A63',
              color: '#FAF9F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif)',
              fontSize: '17px',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(23, 74, 99, 0.15)',
            }}
          >
            AM
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#174A63',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {brandName}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#367E94',
                marginTop: '3px',
                display: 'block',
              }}
            >
              Positano • Amalfi
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
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
                fontSize: '0.82rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#292B29',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#367E94')}
              onMouseLeave={(e) => (e.target.style.color = '#292B29')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: CMS Button + Reserve Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#174A63',
              background: '#F0F6F7',
              border: '1px solid #C9DDE0',
              padding: '8px 14px',
              borderRadius: '20px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#174A63';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F0F6F7';
              e.currentTarget.style.color = '#174A63';
            }}
          >
            <ShieldCheck size={14} />
            <span>CMS Studio</span>
          </a>

          <button
            onClick={() => setIsReservationModalOpen(true)}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.8rem' }}
          >
            <Calendar size={14} />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              padding: '6px',
              color: '#174A63',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FAF9F5',
            borderBottom: '1px solid #C8B69B',
            padding: '24px 28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  color: '#174A63',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '8px 0',
                  borderBottom: '1px solid #F0ECE4',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <a
                href="/cms/"
                target="_blank"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: '#F0F6F7',
                  border: '1px solid #C9DDE0',
                  color: '#174A63',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                }}
              >
                CMS Studio ↗
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationModalOpen(true);
                }}
                className="btn-primary"
                style={{ flex: 1, fontSize: '0.8rem' }}
              >
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

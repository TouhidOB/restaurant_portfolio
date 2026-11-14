import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation() {
  const { data, setIsReservationModalOpen } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = data.settings?.brand_name || "AURA MARINA";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Heritage", href: "#story" },
    { label: "3D Tour", href: "#tour" },
    { label: "Spaces", href: "#spaces" },
    { label: "Menu", href: "#menu" },
    { label: "Provenance", href: "#philosophy" },
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
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled ? '14px 0' : '26px 0',
        backgroundColor: scrolled ? 'rgba(252, 251, 248, 0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.25)' : 'none',
        boxShadow: scrolled ? '0 8px 30px rgba(8, 23, 33, 0.05)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Monogram & Wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)',
              border: '1px solid #C5A059',
              color: '#DFBA73',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.2)',
            }}
          >
            AM
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 600,
                color: '#081721',
                letterSpacing: '0.15em',
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
                fontSize: '9.5px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C5A059',
                marginTop: '4px',
                display: 'block',
                fontWeight: 600,
              }}
            >
              Positano • Amalfi Coast
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#1C2022',
                transition: 'all 0.25s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#C5A059';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#1C2022';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
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
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0D2533',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              padding: '8px 16px',
              borderRadius: '30px',
              transition: 'all 0.25s',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0D2533';
              e.currentTarget.style.color = '#DFBA73';
              e.currentTarget.style.borderColor = '#C5A059';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.color = '#0D2533';
              e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
            }}
          >
            <ShieldCheck size={14} color="#C5A059" />
            <span>CMS Studio</span>
          </a>

          <button
            onClick={() => setIsReservationModalOpen(true)}
            className="btn-gold"
            style={{ padding: '11px 24px', fontSize: '0.78rem' }}
          >
            <Calendar size={13} />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              padding: '6px',
              color: '#081721',
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
            background: '#FCFBF8',
            borderBottom: '1px solid #C5A059',
            padding: '28px 32px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  color: '#081721',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '10px 0',
                  borderBottom: '1px solid #EAE3D6',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a
                href="/cms/"
                target="_blank"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: '#F0F6F8',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  color: '#081721',
                  padding: '12px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                CMS Studio ↗
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationModalOpen(true);
                }}
                className="btn-gold"
                style={{ flex: 1, fontSize: '0.8rem' }}
              >
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
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

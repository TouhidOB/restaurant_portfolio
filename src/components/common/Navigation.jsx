import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Compass } from 'lucide-react';

export default function Navigation({ restaurant, onOpenReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Experience', href: '#tour' },
    { label: 'Signature Dishes', href: '#signature' },
    { label: 'Menu', href: '#menu' },
    { label: 'Architecture', href: '#interior' },
    { label: 'Chef', href: '#chef' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(18, 59, 53, 0.96)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(214, 184, 121, 0.3)' : '1px solid rgba(214, 184, 121, 0.12)',
          transition: 'all 0.35s ease',
          padding: isScrolled ? '16px 0' : '24px 0',
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
          {/* Logo Aligned Left */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Art Deco Diamond Emblem */}
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid var(--color-gold)',
                transform: 'rotate(45deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-emerald)',
              }}
            >
              <span
                style={{
                  transform: 'rotate(-45deg)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                }}
              >
                A
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-pearl)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  letterSpacing: '0.24em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '3px',
                }}
              >
                SALON &amp; GRILL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Centered/Right) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav-menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-pearl)',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-pearl)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Phone Quick Link (Desktop) */}
            <a
              href={`tel:${restaurant.contact.phone}`}
              className="nav-phone-link"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-gold)',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '0.08em',
                fontWeight: 500,
              }}
            >
              <Phone size={14} />
              <span>{restaurant.contact.phoneDisplay}</span>
            </a>

            {/* Reserve CTA */}
            <button
              onClick={onOpenReservation}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '11px',
                letterSpacing: '0.18em',
                display: 'none',
              }}
              id="desktop-reserve-btn"
            >
              <Calendar size={13} />
              <span>RESERVE A TABLE</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border-gold)',
                color: 'var(--color-gold)',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 59, 53, 0.98)',
            backdropFilter: 'blur(16px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '100px 32px 40px',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 5vw, 32px)',
                  color: 'var(--color-pearl)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border-gold-subtle)',
                  paddingBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-body)', color: 'var(--color-gold)', letterSpacing: '0.15em' }}>
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '13px' }}
            >
              <Calendar size={15} />
              <span>RESERVE A TABLE</span>
            </button>

            <a
              href={`tel:${restaurant.contact.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                color: 'var(--color-gold)',
                textDecoration: 'none',
                fontSize: '13px',
                letterSpacing: '0.1em',
                padding: '12px',
                border: '1px solid var(--color-border-gold)',
              }}
            >
              <Phone size={15} />
              <span>{restaurant.contact.phoneDisplay}</span>
            </a>
            
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-jade)', letterSpacing: '0.1em' }}>
              {restaurant.contact.cityArea}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Responsive Media Query CSS */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav-menu {
            display: flex !important;
          }
          .nav-phone-link {
            display: inline-flex !important;
          }
          #desktop-reserve-btn {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Menu, X, ExternalLink, Calendar, Sparkles } from 'lucide-react';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', path: '/story', hash: '#story' },
    { label: '3D Studio', path: '/tour', hash: '#tour' },
    { label: 'Philosophy', path: '/philosophy', hash: '#philosophy' },
    { label: 'Featured', path: '/featured', hash: '#featured' },
    { label: 'Menu', path: '/menu', hash: '#menu' },
    { label: 'The Lab', path: '/kitchen', hash: '#kitchen' },
    { label: 'Team', path: '/team', hash: '#team' },
    { label: 'VIP Loft', path: '/experiences', hash: '#experiences' },
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
    <>
      <nav
        style={{
          position: 'fixed',
          top: isScrolled ? '14px' : '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 36px)',
          maxWidth: '1360px',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(15, 17, 24, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            boxShadow: isScrolled
              ? '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 221, 0, 0.12)'
              : '0 10px 30px rgba(0, 0, 0, 0.4)',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFDD00',
                color: '#000',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.5px',
                boxShadow: '0 0 16px rgba(255, 221, 0, 0.4)'
              }}
            >
              POP!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  color: '#FFFFFF'
                }}
              >
                FOOD STUDIO
              </span>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  color: '#FFDD00',
                  letterSpacing: '1px',
                  fontWeight: 600
                }}
              >
                ARTS DISTRICT • LA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div
            className="nav-desktop-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: isActive ? '#FFDD00' : '#9FA5B7',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    transition: 'all 0.15s ease',
                    letterSpacing: '0.2px',
                    backgroundColor: isActive ? 'rgba(255, 221, 0, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(255, 221, 0, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#9FA5B7';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* CMS Studio Link */}
            <a
              href="/cms/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#FFF',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <span>CMS STUDIO</span>
              <ExternalLink size={12} color="#9FA5B7" />
            </a>

            {/* Book Table Button in Pop Yellow */}
            <button
              onClick={() => triggerReservation()}
              className="btn-reserve-nav"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFDD00',
                color: '#0A0B0E',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                padding: '9px 18px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(255, 221, 0, 0.35)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(255, 221, 0, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 221, 0, 0.35)';
              }}
            >
              <Calendar size={13} color="#0A0B0E" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFF',
                cursor: 'pointer',
                padding: '6px',
                display: 'none',
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 11, 14, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '18px',
            padding: '40px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link)}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                color: currentPath === link.path ? '#FFDD00' : '#FFFFFF',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cms/"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '14px',
              color: '#FFDD00',
              textDecoration: 'none',
              marginTop: '12px'
            }}
          >
            Open CMS Studio &rarr;
          </a>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Menu, X, ExternalLink, Calendar, Sparkles } from 'lucide-react';

export default function Navigation() {
  const { data, setIsReservationModalOpen } = useCMS();
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
    { label: 'Story', href: '#story' },
    { label: '3D Studio', href: '#tour' },
    { label: 'Menu', href: '#menu' },
    { label: 'The Lab', href: '#kitchen' },
    { label: 'Happenings', href: '#experiences' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: isScrolled ? '14px' : '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 36px)',
          maxWidth: '1280px',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(15, 17, 24, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            boxShadow: isScrolled
              ? '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 51, 102, 0.08)'
              : '0 10px 30px rgba(0, 0, 0, 0.4)',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                backgroundColor: '#FF3366',
                color: '#FFF',
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.5px',
                boxShadow: '0 0 16px rgba(255, 51, 102, 0.4)'
              }}
            >
              POP!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: '#CCFF00',
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
              gap: '6px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#9FA5B7',
                  textDecoration: 'none',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9FA5B7';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
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
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
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

            {/* Book Table Button in Cyber Lime */}
            <button
              onClick={() => setIsReservationModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#CCFF00',
                color: '#0A0B0E',
                fontFamily: 'var(--font-display)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.3px',
                padding: '9px 18px',
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(204, 255, 0, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.backgroundColor = '#d8ff33';
                e.currentTarget.style.boxShadow = '0 0 26px rgba(204, 255, 0, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#CCFF00';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.35)';
              }}
            >
              <Calendar size={14} />
              <span>RESERVE TABLE</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="nav-mobile-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                color: '#FFF',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(9, 10, 14, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#12141D',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '32px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                color: '#FF3366',
                fontWeight: 700,
                letterSpacing: '1px'
              }}
            >
              POP! DIRECTORY
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  color: '#FFF',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationModalOpen(true);
              }}
              style={{
                backgroundColor: '#CCFF00',
                color: '#0A0B0E',
                borderRadius: '12px',
                padding: '14px',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 700,
                marginTop: '10px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(204, 255, 0, 0.35)'
              }}
            >
              BOOK A TABLE NOW
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-mobile-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

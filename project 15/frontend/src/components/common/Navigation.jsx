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
    { label: '3D Studio Tour', href: '#tour' },
    { label: 'Menu', href: '#menu' },
    { label: 'The Lab', href: '#kitchen' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit', href: '#location' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: isScrolled ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '1360px',
          zIndex: 1000,
          transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFF5E6',
            border: '3px solid #171717',
            borderRadius: '18px',
            boxShadow: isScrolled ? '6px 6px 0px #171717' : '8px 8px 0px #171717',
            padding: '10px 20px',
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
              color: '#171717',
            }}
          >
            <div
              style={{
                backgroundColor: '#F04438',
                color: '#FFF',
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '2px solid #171717',
                transform: 'rotate(-4deg)',
                boxShadow: '2px 2px 0px #171717',
                letterSpacing: '1px'
              }}
            >
              POP!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  letterSpacing: '1px',
                  lineHeight: 1.1,
                  color: '#171717'
                }}
              >
                FOOD STUDIO
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#2455D6',
                  fontWeight: 800,
                  letterSpacing: '1px'
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
              gap: '20px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  color: '#171717',
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFD928';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
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
              gap: '12px',
            }}
          >
            {/* CMS Portal Link */}
            <a
              href="/cms/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#2455D6',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '8px 14px',
                borderRadius: '8px',
                border: '2px solid #171717',
                boxShadow: '3px 3px 0 #171717',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d44ac';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0 #171717';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2455D6';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '3px 3px 0 #171717';
              }}
            >
              <span>CMS STUDIO</span>
              <ExternalLink size={13} />
            </a>

            {/* Book Table Button */}
            <button
              onClick={() => setIsReservationModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFD928',
                color: '#171717',
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                padding: '9px 18px',
                borderRadius: '8px',
                border: '2px solid #171717',
                boxShadow: '3px 3px 0 #171717',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0 #171717';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '3px 3px 0 #171717';
              }}
            >
              <Calendar size={16} />
              <span>BOOK A TABLE</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="nav-mobile-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                backgroundColor: '#FFD928',
                border: '2px solid #171717',
                borderRadius: '8px',
                boxShadow: '3px 3px 0 #171717',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            backgroundColor: 'rgba(23, 23, 23, 0.85)',
            backdropFilter: 'blur(8px)',
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
              backgroundColor: '#FFF5E6',
              border: '4px solid #171717',
              borderRadius: '20px',
              boxShadow: '8px 8px 0 #171717',
              padding: '32px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: '#F04438',
                marginBottom: '8px'
              }}
            >
              MENU DIRECTORY
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.25rem',
                  textTransform: 'uppercase',
                  color: '#171717',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#FFF',
                  border: '2px solid #171717',
                  boxShadow: '3px 3px 0 #171717',
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
                backgroundColor: '#FFD928',
                border: '3px solid #171717',
                borderRadius: '8px',
                padding: '12px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                boxShadow: '4px 4px 0 #171717',
                marginTop: '10px',
                cursor: 'pointer'
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

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Compass, ChevronDown, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ restaurant, currentPath = '/', onNavigate, onNavigateHome, onOpenReservation }) {
  const { customPages, openReservation: cmsOpenReservation } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customPagesDropdown, setCustomPagesDropdown] = useState(false);

  const handleOpenRes = onOpenReservation || cmsOpenReservation;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', path: '/story' },
    { label: 'Signatures', path: '/signatures' },
    { label: 'Menu', path: '/menu' },
    { label: 'Architecture', path: '/interior' },
    { label: '3D Tour', path: '/tour' },
    { label: 'Experiences', path: '/experience' },
    { label: 'Chef', path: '/chef' },
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setCustomPagesDropdown(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const navCustomPages = (customPages || []).filter((p) => p.is_published && p.show_in_navigation);

  const isLinkActive = (path) => {
    if (path === '/blog') {
      return currentPath === '/blog' || currentPath.startsWith('/blog/');
    }
    return currentPath === path;
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
          backgroundColor: isScrolled ? 'rgba(20, 23, 21, 0.96)' : 'rgba(20, 23, 21, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid rgba(182, 161, 123, 0.35)' : '1px solid rgba(182, 161, 123, 0.15)',
          transition: 'all 0.3s ease',
          padding: isScrolled ? '12px 28px' : '18px 28px',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Crest */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
            title="ENSO 圓相 — Return to Homepage (All Sections)"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #B6A17B',
                borderTopColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B6A17B',
                fontSize: '13px',
                fontFamily: 'Noto Serif JP, serif',
                boxShadow: '0 0 10px rgba(182, 161, 123, 0.25)',
              }}
            >
              円
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display, Cormorant Garamond)',
                  fontSize: '21px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#F2EFE6',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant.name || 'ENSO 圓相'}
              </span>
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  color: '#B6A17B',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '3px',
                }}
              >
                ZEN DINING SANCTUARY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  style={{
                    textDecoration: 'none',
                    fontSize: '11px',
                    fontWeight: active ? '700' : '500',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: active ? '#B6A17B' : '#F2EFE6',
                    padding: '6px 4px',
                    borderBottom: active ? '2px solid #B6A17B' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    opacity: active ? 1 : 0.85,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B6A17B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = active ? '#B6A17B' : '#F2EFE6')}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Custom Standalone Pages Dropdown */}
            {navCustomPages.length > 0 && (
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setCustomPagesDropdown(true)}
                onMouseLeave={() => setCustomPagesDropdown(false)}
              >
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentPath.startsWith('/page/') ? '#B6A17B' : '#F2EFE6',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 4px',
                  }}
                >
                  <span>Pages</span>
                  <ChevronDown size={13} />
                </button>

                {customPagesDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#1A1E1B',
                      border: '1px solid rgba(182, 161, 123, 0.35)',
                      borderRadius: '2px',
                      padding: '8px 0',
                      minWidth: '220px',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                      zIndex: 100,
                    }}
                  >
                    {navCustomPages.map((page) => (
                      <a
                        key={page.slug}
                        href={`/page/${page.slug}`}
                        onClick={(e) => handleLinkClick(e, `/page/${page.slug}`)}
                        style={{
                          display: 'block',
                          padding: '8px 16px',
                          color: '#F2EFE6',
                          textDecoration: 'none',
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(182, 161, 123, 0.15)';
                          e.currentTarget.style.color = '#B6A17B';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#F2EFE6';
                        }}
                      >
                        {page.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={handleOpenRes}
              style={{
                padding: '9px 18px',
                backgroundColor: '#B6A17B',
                color: '#141715',
                border: 'none',
                borderRadius: '2px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              <Calendar size={13} />
              <span>RESERVE TABLE</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="mobile-hamburger"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#B6A17B',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(20, 23, 21, 0.98)',
            padding: '80px 24px 30px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#B6A17B',
                fontSize: '16px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Home (All Sections)
            </button>

            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                style={{
                  color: '#F2EFE6',
                  textDecoration: 'none',
                  fontSize: '15px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '6px 0',
                }}
              >
                {link.label}
              </a>
            ))}

            {navCustomPages.map((page) => (
              <a
                key={page.slug}
                href={`/page/${page.slug}`}
                onClick={(e) => handleLinkClick(e, `/page/${page.slug}`)}
                style={{
                  color: '#C9B896',
                  textDecoration: 'none',
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  padding: '4px 0',
                }}
              >
                📄 {page.title}
              </a>
            ))}
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(182, 161, 123, 0.2)' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (handleOpenRes) handleOpenRes();
              }}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#B6A17B',
                color: '#141715',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Reserve Sanctuary Seating
            </button>
          </div>
        </div>
      )}

      {/* Responsive CSS for desktop vs mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

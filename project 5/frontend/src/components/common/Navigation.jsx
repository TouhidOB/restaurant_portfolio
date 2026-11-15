import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate, onNavigateHome, onOpenReservation }) {
  const { content, openReservation, customPages } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. MANIFESTO', path: '/story' },
    { label: '02. SIGNATURES', path: '/signatures' },
    { label: '03. MENU', path: '/menu' },
    { label: '04. PROCESS', path: '/process' },
    { label: '05. ARCHITECTURE', path: '/architecture' },
    { label: '06. 3D TOUR', path: '/tour' },
    { label: '07. EXPERIENCE', path: '/experience' },
    { label: '08. JOURNAL', path: '/blog' },
    { label: '09. CONTACT', path: '/contact' },
  ];

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleReserveClick = () => {
    setMobileMenuOpen(false);
    if (onOpenReservation) {
      onOpenReservation();
    } else if (openReservation) {
      openReservation();
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
          height: 'var(--header-height, 80px)',
          zIndex: 1000,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
          backgroundColor: scrolled ? 'rgba(26, 47, 37, 0.96)' : 'rgba(26, 47, 37, 0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(61, 97, 78, 0.6)' : '1px solid rgba(61, 97, 78, 0.3)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="container-tropical"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Brand Logo */}
          <a
            href="/"
            onClick={handleBrandClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                backgroundColor: '#BC7153',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(188, 113, 83, 0.3)',
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#F6F2E9',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                VERDANT
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  color: '#AAB9A0',
                  marginTop: '0.2rem',
                  display: 'block',
                }}
              >
                TROPICAL MODERN &bull; PALM GROVE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.04em',
                    color: isActive ? '#D9B84E' : '#C8B99F',
                    textDecoration: 'none',
                    borderBottom: isActive ? '2px solid #D9B84E' : '2px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D9B84E')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? '#D9B84E' : '#C8B99F')}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Dynamic Custom Pages Dropdown */}
            {customPages && customPages.length > 0 && (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.04em',
                    color: currentPath.startsWith('/page/') ? '#D9B84E' : '#C8B99F',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: 0,
                  }}
                >
                  10. PAGES <span style={{ fontSize: '0.6rem' }}>▼</span>
                </button>
                {pagesDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      background: '#1A2F25',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderTop: '2px solid #BC7153',
                      borderRadius: '4px',
                      padding: '0.5rem 0',
                      minWidth: '220px',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                      zIndex: 200,
                    }}
                  >
                    {customPages.map((cp) => (
                      <a
                        key={cp.slug}
                        href={`/page/${cp.slug}`}
                        onClick={(e) => handleLinkClick(e, `/page/${cp.slug}`)}
                        style={{
                          display: 'block',
                          padding: '0.5rem 1rem',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.75rem',
                          color: currentPath === `/page/${cp.slug}` ? '#D9B84E' : '#F6F2E9',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#243F32')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {cp.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <a
              href="/cms/"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                color: '#D9B84E',
                border: '1px solid rgba(170, 185, 160, 0.3)',
                borderRadius: '4px',
                padding: '0.5rem 0.85rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="cms-link-desktop"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D9B84E')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(170, 185, 160, 0.3)')}
            >
              CMS STUDIO
            </a>

            <button
              type="button"
              onClick={handleReserveClick}
              style={{
                padding: '0.55rem 1.25rem',
                background: '#BC7153',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              RESERVE TABLE
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '28px',
                height: '18px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              <span style={{ width: '100%', height: '2px', background: '#F6F2E9' }} />
              <span style={{ width: '100%', height: '2px', background: '#F6F2E9' }} />
              <span style={{ width: '100%', height: '2px', background: '#F6F2E9' }} />
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
            zIndex: 999,
            background: 'rgba(26, 47, 37, 0.98)',
            paddingTop: 'var(--header-height, 80px)',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingBottom: '3rem',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2rem' }}>
            <a
              href="/"
              onClick={handleBrandClick}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '1rem',
                color: currentPath === '/' ? '#D9B84E' : '#F6F2E9',
                textDecoration: 'none',
              }}
            >
              00. INDEX LANDING
            </a>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '1rem',
                  color: currentPath === link.path ? '#D9B84E' : '#F6F2E9',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}

            {customPages && customPages.map((cp) => (
              <a
                key={cp.slug}
                href={`/page/${cp.slug}`}
                onClick={(e) => handleLinkClick(e, `/page/${cp.slug}`)}
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '1rem',
                  color: currentPath === `/page/${cp.slug}` ? '#D9B84E' : '#AAB9A0',
                  textDecoration: 'none',
                }}
              >
                PAGE &bull; {cp.title}
              </a>
            ))}

            <a
              href="/cms/"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '1rem',
                color: '#D9B84E',
                textDecoration: 'none',
                marginTop: '1rem',
              }}
            >
              ⚙ CMS STUDIO BACKEND
            </a>

            <button
              type="button"
              onClick={handleReserveClick}
              style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                background: '#BC7153',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              RESERVE TABLE &rarr;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

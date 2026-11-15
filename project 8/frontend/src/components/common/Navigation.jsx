import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { content, openReservation, customPages } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Story', path: '/story' },
    { label: 'Signatures', path: '/signatures' },
    { label: 'Menu', path: '/menu' },
    { label: '3D Tour', path: '/tour' },
    { label: 'The Chef', path: '/chef' },
    { label: 'Space', path: '/space' },
    { label: 'Experience', path: '/experience' },
    { label: 'Journal', path: '/blog' },
    { label: 'Location', path: '/contact' },
  ];

  const brandName = content?.hero?.restaurant_name || 'URBAN TABLE';

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMobileOpen(false);
    setPagesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const isCurrentActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: 'var(--nav-height, 80px)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(17, 19, 20, 0.96)' : 'rgba(17, 19, 20, 0.75)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '2px solid var(--color-brick, #914D37)' : '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Crest & Title */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
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
              borderRadius: '2px',
              background: 'linear-gradient(135deg, var(--color-brick, #914D37) 0%, var(--color-black, #111314) 100%)',
              border: '1px solid var(--color-copper, #B87345)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-copper, #B87345)',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-display, Oswald)',
              fontWeight: 700,
            }}
          >
            UT
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display, Oswald)',
                fontSize: '1.35rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-offwhite, #F1EEE7)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {brandName}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body, Manrope)',
                fontSize: '0.72rem',
                color: 'var(--color-copper, #B87345)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Kitchen • Smokehouse • Fire
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.35rem',
          }}
          className="desktop-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              style={{
                color: isCurrentActive(link.path) ? 'var(--color-copper, #B87345)' : 'var(--color-concrete, #B7B4AC)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'color 0.2s',
                borderBottom: isCurrentActive(link.path) ? '2px solid var(--color-copper, #B87345)' : '2px solid transparent',
                paddingBottom: '0.2rem',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-copper, #B87345)')}
              onMouseLeave={(e) => {
                if (!isCurrentActive(link.path)) e.target.style.color = 'var(--color-concrete, #B7B4AC)';
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Custom Pages Dropdown */}
          {customPages && customPages.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: currentPath.startsWith('/page/') ? 'var(--color-copper, #B87345)' : 'var(--color-concrete, #B7B4AC)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  paddingBottom: '0.2rem',
                }}
              >
                <span>Pages</span>
                <span style={{ fontSize: '0.65rem' }}>▼</span>
              </button>

              {pagesDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: 0,
                    backgroundColor: '#181A1C',
                    border: '1px solid var(--color-brick, #914D37)',
                    borderRadius: '2px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                    minWidth: '220px',
                    padding: '0.5rem 0',
                    zIndex: 1100,
                  }}
                >
                  {customPages.map((cp) => (
                    <a
                      key={cp.slug}
                      href={`/page/${cp.slug}`}
                      onClick={(e) => handleNavClick(e, `/page/${cp.slug}`)}
                      style={{
                        display: 'block',
                        padding: '0.65rem 1.25rem',
                        color: 'var(--color-offwhite, #F1EEE7)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--color-graphite, #252729)';
                        e.target.style.color = 'var(--color-copper, #B87345)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--color-offwhite, #F1EEE7)';
                      }}
                    >
                      {cp.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls (CMS Studio + Reservation CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '2px',
              border: '1px solid var(--color-border, #3a3d40)',
              color: 'var(--color-copper, #B87345)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title="Open Django CMS Studio"
          >
            <span>⚙ CMS Studio</span>
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-primary btn-reserve-nav"
            style={{
              padding: '0.65rem 1.3rem',
              fontSize: '0.78rem',
            }}
          >
            Reserve Table
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-offwhite, #F1EEE7)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'none',
              padding: '0.4rem',
            }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height, 80px)',
            left: 0,
            width: '100%',
            backgroundColor: '#111314',
            borderBottom: '2px solid var(--color-brick, #914D37)',
            padding: '1.5rem 2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              style={{
                color: isCurrentActive(link.path) ? 'var(--color-copper, #B87345)' : 'var(--color-offwhite, #F1EEE7)',
                textDecoration: 'none',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
              }}
            >
              {link.label}
            </a>
          ))}
          {customPages && customPages.map((cp) => (
            <a
              key={cp.slug}
              href={`/page/${cp.slug}`}
              onClick={(e) => handleNavClick(e, `/page/${cp.slug}`)}
              style={{
                color: 'var(--color-copper, #B87345)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
              }}
            >
              📄 {cp.title}
            </a>
          ))}
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-copper, #B87345)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            ⚙ Open Django CMS Studio
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-links {
            display: flex !important;
          }
        }
        @media (max-width: 1023px) {
          .mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

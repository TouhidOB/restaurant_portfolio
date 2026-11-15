import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate, onNavigateHome, onOpenReservation }) {
  const { content, openReservation, customPages } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. MANIFESTO', path: '/story' },
    { label: '02. SIGNATURES', path: '/signatures' },
    { label: '03. MENU', path: '/menu' },
    { label: '04. PROCESS', path: '/process' },
    { label: '05. SPACE', path: '/architecture' },
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
      window.location.href = path;
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = '/';
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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-height)',
        backgroundColor: isScrolled ? 'rgba(32, 33, 31, 0.98)' : 'rgba(32, 33, 31, 0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-steel)',
        transition: 'background-color 0.2s',
      }}
    >
      <div
        className="container-brutal"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <a
          href="/"
          onClick={handleBrandClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
            color: '#fff',
          }}
        >
          <div
            style={{
              width: '18px',
              height: '24px',
              backgroundColor: 'var(--accent-orange)',
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              MONOLITH
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginTop: '0.2rem',
              }}
            >
              SECTOR 09 // 40.7128° N
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.15rem',
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.05em',
                  color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid var(--accent-orange)' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--accent-orange)' : 'var(--text-secondary)')}
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.05em',
                  color: currentPath.startsWith('/page/') ? 'var(--accent-orange)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
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
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-steel)',
                    borderTop: '2px solid var(--accent-orange)',
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
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: currentPath === `/page/${cp.slug}` ? 'var(--accent-orange)' : '#fff',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-dark)')}
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
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-orange)',
              border: '1px solid var(--border-steel)',
              padding: '0.5rem 0.85rem',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
            }}
            className="cms-link-desktop"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-steel)')}
          >
            CMS STUDIO
          </a>

          <button
            type="button"
            onClick={handleReserveClick}
            className="btn-orange"
            style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.75rem',
            }}
          >
            RESERVE SHIFT
          </button>

          {/* Mobile Menu Toggle */}
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
            <span style={{ width: '100%', height: '2px', background: 'var(--text-primary)' }} />
            <span style={{ width: '100%', height: '2px', background: 'var(--text-primary)' }} />
            <span style={{ width: '100%', height: '2px', background: 'var(--text-primary)' }} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-dark)',
            borderBottom: '2px solid var(--accent-orange)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: currentPath === link.path ? 'var(--accent-orange)' : 'var(--text-primary)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          {customPages && customPages.map(cp => (
            <a
              key={cp.slug}
              href={`/page/${cp.slug}`}
              onClick={(e) => handleLinkClick(e, `/page/${cp.slug}`)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-orange)',
                textDecoration: 'none',
              }}
            >
              &bull; {cp.title}
            </a>
          ))}
          <a
            href="/cms/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--accent-orange)',
              textDecoration: 'none',
              borderTop: '1px solid var(--border-steel)',
              paddingTop: '0.75rem',
            }}
          >
            &rarr; CMS STUDIO TERMINAL
          </a>
        </div>
      )}
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { content, openReservation, customPages } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { label: 'Chef', path: '/chef' },
    { label: 'Spaces', path: '/space' },
    { label: 'Experience', path: '/experience' },
    { label: 'Journal', path: '/blog' },
    { label: 'Coordinates', path: '/contact' },
  ];

  const handleNavClick = (e, path) => {
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

  const isCurrentActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(16, 28, 44, 0.96)' : 'rgba(10, 18, 29, 0.8)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--color-champagne)' : '1px solid rgba(255, 255, 255, 0.08)',
        height: 'var(--nav-height, 80px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', width: '100%' }}>
        {/* Brand Crest & Title */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--color-skyline-blue) 0%, var(--color-midnight-card) 100%)',
              border: '1px solid var(--color-champagne)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                color: 'var(--color-cloud-ivory)',
                letterSpacing: '0.12em',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {content?.hero?.restaurant_name || 'SKYLINE'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '0.68rem',
                color: 'var(--color-champagne)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginTop: '3px',
              }}
            >
              LEVEL 54 &bull; 220M
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const active = isCurrentActive(link.path);
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                style={{
                  color: active ? 'var(--color-champagne)' : 'var(--color-cloud-ivory)',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: active ? 800 : 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                  borderBottom: active ? '2px solid var(--color-champagne)' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-champagne)')}
                onMouseLeave={(e) => (e.target.style.color = active ? 'var(--color-champagne)' : 'var(--color-cloud-ivory)')}
              >
                {link.label}
              </a>
            );
          })}

          {/* Custom Pages Dropdown if any */}
          {customPages && customPages.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-cloud-ivory)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                Pages ▾
              </button>
              {pagesDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'var(--color-midnight-card)',
                    border: '1px solid var(--color-champagne)',
                    borderRadius: '4px',
                    padding: '0.5rem 0',
                    minWidth: '220px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    zIndex: 100,
                  }}
                >
                  {customPages.map((cp) => (
                    <a
                      key={cp.slug}
                      href={`/page/${cp.slug}`}
                      onClick={(e) => handleNavClick(e, `/page/${cp.slug}`)}
                      style={{
                        display: 'block',
                        padding: '0.6rem 1rem',
                        color: 'var(--color-cloud-ivory)',
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-accent)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(38, 63, 90, 0.4)';
                        e.target.style.color = 'var(--color-champagne)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--color-cloud-ivory)';
                      }}
                    >
                      {cp.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* CTAs: CMS Studio Quick Pill & Table Booking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(38, 63, 90, 0.45)',
              border: '1px solid var(--color-champagne)',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.74rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-warm-amber)' }} />
            CMS Studio
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-reserve-nav btn-skyline-primary"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.8rem' }}
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}

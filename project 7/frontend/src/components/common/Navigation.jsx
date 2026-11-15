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
    { label: 'Accueil', path: '/' },
    { label: 'Héritage', path: '/story' },
    { label: 'Signatures', path: '/signatures' },
    { label: 'La Carte', path: '/menu' },
    { label: 'Visite 3D', path: '/tour' },
    { label: 'Le Chef', path: '/chef' },
    { label: 'Architecture', path: '/architecture' },
    { label: 'Expériences', path: '/experience' },
    { label: 'Journal', path: '/blog' },
    { label: 'Accès', path: '/contact' },
  ];

  const brandName = content?.hero?.restaurant_name || "L'ÉTOILE ROYALE";

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
        transition: 'all 0.35s ease',
        backgroundColor: scrolled ? 'rgba(32, 33, 36, 0.96)' : 'rgba(32, 33, 36, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(197, 164, 109, 0.3)' : '1px solid rgba(197, 164, 109, 0.15)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 1.5rem',
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
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-burgundy) 100%)',
              border: '1px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-ivory)',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)',
            }}
          >
            ✦
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ivory)',
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {brandName}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.72rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Place Vendôme • Paris
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.15rem',
          }}
          className="desktop-links"
        >
          {navLinks.map((link) => {
            const active = isCurrentActive(link.path);
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                style={{
                  color: active ? 'var(--color-gold)' : 'var(--color-taupe)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: active ? 600 : 500,
                  transition: 'color 0.2s',
                  position: 'relative',
                  padding: '0.4rem 0',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
                onMouseLeave={(e) => {
                  if (!active) e.target.style.color = 'var(--color-taupe)';
                }}
              >
                {link.label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--color-gold)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </a>
            );
          })}

          {/* Custom Pages dropdown if available */}
          {customPages && customPages.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-gold-light)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0',
                }}
              >
                Salons ▾
              </button>
              {pagesDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    backgroundColor: '#1E1F22',
                    border: '1px solid rgba(197, 164, 109, 0.4)',
                    borderRadius: '6px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    padding: '0.5rem 0',
                    minWidth: '220px',
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
                        padding: '0.65rem 1.25rem',
                        color: 'var(--color-ivory)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.background = 'rgba(84, 37, 47, 0.5)')}
                      onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    >
                      {cp.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions (CMS Studio + Reservation CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '4px',
              border: '1px solid rgba(197, 164, 109, 0.4)',
              color: 'var(--color-gold)',
              fontSize: '0.76rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title="Accéder au Studio CMS Django"
          >
            <span>⚙ Studio CMS</span>
          </a>

          <button
            onClick={() => openReservation()}
            className="btn-primary btn-reserve-nav"
            style={{
              padding: '0.55rem 1.25rem',
              fontSize: '0.78rem',
            }}
          >
            Réserver
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-ivory)',
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
            backgroundColor: '#202124',
            borderBottom: '1px solid rgba(197, 164, 109, 0.3)',
            padding: '1.5rem 2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              style={{
                color: isCurrentActive(link.path) ? 'var(--color-gold)' : 'var(--color-ivory)',
                textDecoration: 'none',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
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
                color: 'var(--color-gold-light)',
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              ✦ {cp.title}
            </a>
          ))}
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-gold)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              fontWeight: 600,
            }}
          >
            ⚙ Ouvrir le Studio CMS Django
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-links {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

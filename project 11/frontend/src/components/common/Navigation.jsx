import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ currentPath = '/', onNavigate }) {
  const { content, openReservation, customPages } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const cafeName = content?.cafe_name || 'VERDANT ATRIUM';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Story', path: '/story' },
    { label: 'Signatures', path: '/signatures' },
    { label: 'Menu', path: '/menu' },
    { label: '3D Tour', path: '/tour' },
    { label: 'Atmosphere', path: '/space' },
    { label: 'Gatherings', path: '/experience' },
    { label: 'Gazette', path: '/blog' },
    { label: 'Visit', path: '/contact' },
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
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
        zIndex: 500,
        height: 'var(--nav-height, 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        backgroundColor: scrolled ? 'rgba(26, 43, 36, 0.95)' : 'rgba(26, 43, 36, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        transition: 'all 0.3s ease',
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
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#FAF7F0',
          }}
        >
          <span style={{ fontSize: '22px' }}>🌿</span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '18px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                textTransform: 'uppercase',
                lineHeight: 1.1,
              }}
            >
              VERDANT ATRIUM
            </div>
            <div
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#A6B5A0',
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              Botanical Glasshouse Café
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
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
                  color: active ? '#A87958' : 'rgba(250, 247, 240, 0.85)',
                  textDecoration: 'none',
                  fontSize: '12.5px',
                  letterSpacing: '0.06em',
                  fontWeight: active ? 700 : 500,
                  transition: 'color 0.2s ease',
                  borderBottom: active ? '2px solid #A87958' : '2px solid transparent',
                  paddingBottom: '3px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#A87958')}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? '#A87958' : 'rgba(250, 247, 240, 0.85)')}
              >
                {link.label}
              </a>
            );
          })}

          {/* Custom Pages Dropdown */}
          {customPages && customPages.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPath.startsWith('/page/') ? '#A87958' : 'rgba(250, 247, 240, 0.85)',
                  fontSize: '12.5px',
                  letterSpacing: '0.06em',
                  fontWeight: currentPath.startsWith('/page/') ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  paddingBottom: '3px',
                }}
              >
                Special Pages ▾
              </button>
              {pagesDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: '#1E332B',
                    border: '1px solid #A6B5A0',
                    borderRadius: '4px',
                    padding: '0.5rem 0',
                    minWidth: '220px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    zIndex: 100,
                  }}
                >
                  {customPages.map((cp) => (
                    <a
                      key={cp.id || cp.slug}
                      href={`/page/${cp.slug}`}
                      onClick={(e) => handleNavClick(e, `/page/${cp.slug}`)}
                      style={{
                        display: 'block',
                        padding: '0.6rem 1rem',
                        color: '#F4F0E6',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(166, 181, 160, 0.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* CMS Studio Link */}
          <a
            href="http://127.0.0.1:8001/cms/"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '7px 14px',
              backgroundColor: 'rgba(166, 181, 160, 0.15)',
              border: '1px solid rgba(166, 181, 160, 0.35)',
              color: '#A6B5A0',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: '11.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#A6B5A0';
              e.currentTarget.style.color = '#1A2B24';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(166, 181, 160, 0.15)';
              e.currentTarget.style.color = '#A6B5A0';
            }}
          >
            ⚙ CMS Studio
          </a>

          {/* Book Table Button */}
          <button
            onClick={() => openReservation()}
            className="btn-reserve-nav"
            style={{
              padding: '9px 18px',
              backgroundColor: '#A87958',
              border: 'none',
              color: '#FAF7F0',
              borderRadius: '2px',
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(168, 121, 88, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8f6445';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#A87958';
            }}
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}

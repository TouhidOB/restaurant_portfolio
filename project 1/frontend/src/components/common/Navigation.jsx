import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Compass, ChevronDown, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Navigation({ restaurant, currentPath = '/', onNavigate, onNavigateHome, onOpenReservation }) {
  const { customPages } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customPagesDropdown, setCustomPagesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', path: '/story' },
    { label: 'Signatures', path: '/signatures' },
    { label: 'Menu', path: '/menu' },
    { label: 'Architecture', path: '/interior' },
    { label: '3D Tour', path: '/tour' },
    { label: 'Experience', path: '/experience' },
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
          backgroundColor: isScrolled ? 'rgba(18, 59, 53, 0.96)' : 'rgba(13, 15, 16, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid rgba(214, 184, 121, 0.35)' : '1px solid rgba(214, 184, 121, 0.15)',
          transition: 'all 0.3s ease',
          padding: isScrolled ? '14px 0' : '20px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo Aligned Left - Click goes to Home (All Sections) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
            title="Aurelia Grand Salon — Return to Homepage (All Sections)"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            {/* Art Deco Diamond Emblem */}
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid var(--color-gold, #D6B879)',
                transform: 'rotate(45deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-emerald, #123B35)',
              }}
            >
              <span
                style={{
                  transform: 'rotate(-45deg)',
                  fontFamily: 'var(--font-display, Bodoni Moda)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-gold, #D6B879)',
                }}
              >
                A
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display, Bodoni Moda)',
                  fontSize: '22px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-pearl, #F3EDE1)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant?.name || 'AURELIA'}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body, Montserrat)',
                  fontSize: '9px',
                  letterSpacing: '0.24em',
                  color: 'var(--color-gold, #D6B879)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '3px',
                }}
              >
                GRAND SALON &amp; PARLOUR
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '22px',
            }}
            className="desktop-nav-menu"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  style={{
                    fontFamily: 'var(--font-body, Montserrat)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: active ? '#D6B879' : 'var(--color-pearl, #F3EDE1)',
                    textDecoration: 'none',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color 0.2s ease',
                    borderBottom: active ? '2px solid #D6B879' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#D6B879';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--color-pearl, #F3EDE1)';
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Custom Pages Dropdown */}
            {navCustomPages.length > 0 && (
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setCustomPagesDropdown(true)}
                onMouseLeave={() => setCustomPagesDropdown(false)}
              >
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-body, Montserrat)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: currentPath.startsWith('/page/') ? '#D6B879' : 'var(--color-pearl, #F3EDE1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '6px 0',
                  }}
                >
                  SALONS <ChevronDown size={12} />
                </button>

                {customPagesDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: 'rgba(18, 59, 53, 0.98)',
                      border: '1px solid #D6B879',
                      borderRadius: '2px',
                      padding: '8px 0',
                      minWidth: '220px',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {navCustomPages.map((cp) => (
                      <a
                        key={cp.id}
                        href={`/page/${cp.slug}`}
                        onClick={(e) => handleLinkClick(e, `/page/${cp.slug}`)}
                        style={{
                          display: 'block',
                          padding: '8px 16px',
                          color: '#F3EDE1',
                          textDecoration: 'none',
                          fontSize: '12px',
                          fontFamily: 'var(--font-display, Bodoni Moda)',
                          letterSpacing: '0.05em',
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(214, 184, 121, 0.2)';
                          e.currentTarget.style.color = '#D6B879';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#F3EDE1';
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

          {/* Right Action Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Phone Quick Link (Desktop) */}
            {restaurant?.contact?.phone && (
              <a
                href={`tel:${restaurant.contact.phone}`}
                className="nav-phone-link"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-gold, #D6B879)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                }}
              >
                <Phone size={13} />
                <span>{restaurant.contact.phoneDisplay || restaurant.contact.phone}</span>
              </a>
            )}

            {/* Reserve CTA */}
            <button
              onClick={onOpenReservation}
              style={{
                padding: '10px 20px',
                fontSize: '11px',
                letterSpacing: '0.15em',
                backgroundColor: '#123B35',
                border: '1px solid #D6B879',
                color: '#D6B879',
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              id="desktop-reserve-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D6B879';
                e.currentTarget.style.color = '#123B35';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#123B35';
                e.currentTarget.style.color = '#D6B879';
              }}
            >
              <Calendar size={13} />
              <span>RESERVE A TABLE</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              style={{
                background: 'transparent',
                border: '1px solid #D6B879',
                color: '#D6B879',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 59, 53, 0.98)',
            backdropFilter: 'blur(16px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '90px 28px 40px',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Home Link */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: '22px',
                color: currentPath === '/' ? '#D6B879' : '#F3EDE1',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(214, 184, 121, 0.2)',
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Home (All Sections)</span>
              <span style={{ fontSize: '11px', color: '#D6B879' }}>00</span>
            </a>

            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                style={{
                  fontFamily: 'var(--font-display, Bodoni Moda)',
                  fontSize: '22px',
                  color: isLinkActive(link.path) ? '#D6B879' : '#F3EDE1',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(214, 184, 121, 0.2)',
                  paddingBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '11px', color: '#D6B879' }}>0{idx + 1}</span>
              </a>
            ))}

            {/* Custom Pages in Mobile Menu */}
            {navCustomPages.map((cp) => (
              <a
                key={cp.id}
                href={`/page/${cp.slug}`}
                onClick={(e) => handleLinkClick(e, `/page/${cp.slug}`)}
                style={{
                  fontFamily: 'var(--font-display, Bodoni Moda)',
                  fontSize: '18px',
                  color: currentPath === `/page/${cp.slug}` ? '#D6B879' : '#E8D3A2',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(214, 184, 121, 0.2)',
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                }}
              >
                ✦ {cp.title}
              </a>
            ))}
          </div>

          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '12px',
                letterSpacing: '0.15em',
                backgroundColor: '#123B35',
                border: '1px solid #D6B879',
                color: '#D6B879',
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              RESERVE A TABLE
            </button>
          </div>
        </div>
      )}

      {/* Media Query CSS */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav-menu {
            display: flex !important;
          }
          .nav-phone-link {
            display: inline-flex !important;
          }
          #desktop-reserve-btn {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
